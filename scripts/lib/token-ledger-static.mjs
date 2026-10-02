import { readFileSync } from 'node:fs';
import { ts, files, recursiveFiles, hash, read, parseTS, visit, location, declarations, cssDeclarations, fingerprint, stylePaths, tokenDefinitions, exists } from './ui-facts.mjs';

export const COMPONENTS = files('packages/ui/src/components', /\.tsx?$/).map((path) => path.split('/').pop().replace(/\.tsx?$/, ''));
const nameOf = (node, source) => node?.name && (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) ? node.name.text : node?.name?.getText(source);
function slotsIn(node) {
  const slots = new Set();
  visit(node, (child) => {
    if (ts.isJsxAttribute(child) && child.name.getText() === 'data-slot' && child.initializer && ts.isStringLiteral(child.initializer)) slots.add(child.initializer.text);
    if (ts.isPropertyAssignment(child) && nameOf(child) === 'data-slot' && ts.isStringLiteral(child.initializer)) slots.add(child.initializer.text);
  });
  return [...slots];
}
function enclosing(node, predicate) { for (let parent = node.parent; parent; parent = parent.parent) if (predicate(parent)) return parent; }
function ownSlot(attributesOrObject) {
  const children = ts.isJsxAttributes(attributesOrObject) ? attributesOrObject.properties : attributesOrObject.properties || [];
  for (const child of children) {
    if (ts.isJsxAttribute(child) && child.name.getText() === 'data-slot' && child.initializer && ts.isStringLiteral(child.initializer)) return child.initializer.text;
    if (ts.isPropertyAssignment(child) && nameOf(child) === 'data-slot' && ts.isStringLiteral(child.initializer)) return child.initializer.text;
  }
  return null;
}
function classBinding(node, source) {
  for (let parent = node.parent; parent; parent = parent.parent) {
    if (ts.isJsxAttribute(parent) && nameOf(parent, source) === 'className') {
      const attributes = parent.parent;
      const slot = ownSlot(attributes);
      if (slot) return [{ part: slot, selector: `[data-slot="${slot}"]`, precision: 'EXACT_SLOT' }];
      const opening = attributes.parent;
      // Native slotless direct children such as SelectPopup's surface can be
      // measured by a structural selector. Other cases stay unresolved.
      const tag = opening.tagName.getText(source);
      if (/^[a-z][a-z0-9-]*$/.test(tag)) {
        const self = opening.parent;
        const outer = self?.parent;
        if (outer && ts.isJsxElement(outer)) {
          const ancestorSlot = ownSlot(outer.openingElement.attributes);
          if (ancestorSlot) return [{ part: ancestorSlot, selector: `[data-slot="${ancestorSlot}"] > ${tag}`, precision: 'EXACT_DESCENDANT' }];
        }
      }
      return [];
    }
    if (ts.isPropertyAssignment(parent) && nameOf(parent, source) === 'className') {
      const slot = ownSlot(parent.parent);
      return slot ? [{ part: slot, selector: `[data-slot="${slot}"]`, precision: 'EXACT_SLOT' }] : [];
    }
    if (ts.isFunctionDeclaration(parent) || ts.isVariableDeclaration(parent)) return null;
  }
  return null;
}
export function splitOutside(value, delimiter) {
  const result = []; let start = 0, depth = 0, quote = '';
  for (let index = 0; index < value.length; index++) {
    const char = value[index];
    if (quote) { if (char === quote && value[index - 1] !== '\\') quote = ''; continue; }
    if (char === '"' || char === "'") { quote = char; continue; }
    if ('[('.includes(char)) depth++;
    if ('])'.includes(char)) depth--;
    if (depth === 0 && (delimiter === ' ' ? /\s/.test(char) : char === delimiter)) { if (index > start) result.push(value.slice(start, index)); start = index + 1; }
  }
  if (start < value.length) result.push(value.slice(start));
  return result;
}
function classStrings(source) {
  const found = [];
  visit(source, (node) => {
    if (!ts.isStringLiteral(node) && !ts.isNoSubstitutionTemplateLiteral(node)) return;
    const fn = enclosing(node, ts.isFunctionDeclaration);
    let bindings = classBinding(node, source);
    if (bindings === null) {
      const variable = enclosing(node, ts.isVariableDeclaration);
      bindings = [];
      if (variable && ts.isIdentifier(variable.name)) visit(source, (candidate) => {
        if (candidate !== variable.name && ts.isIdentifier(candidate) && candidate.text === variable.name.text && !enclosing(candidate, (p) => p === variable)) bindings.push(...(classBinding(candidate, source) || []));
      });
    }
    if (!bindings.length && !/--(?:qy|card|table|color|radius)-/.test(node.text)) return;
    const conditions = [];
    for (let parent = node.parent; parent && parent !== fn; parent = parent.parent) {
      if (ts.isPropertyAssignment(parent) && ts.isObjectLiteralExpression(parent.parent)) {
        const grand = parent.parent.parent;
        if (ts.isPropertyAssignment(grand) && ['variant', 'size'].includes(nameOf(grand, source))) conditions.push(`${nameOf(grand, source)}=${nameOf(parent, source)}`);
      }
      if (ts.isBinaryExpression(parent) && parent.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) conditions.push(parent.left.getText(source));
    }
    const unique = new Map(bindings.map((binding) => [binding.selector, binding]));
    found.push({ text: node.text, bindings: [...unique.values()], slots: [...new Set(bindings.map((binding) => binding.part))], conditions, source: location(source, node), owner: fn?.name?.text || null });
  });
  return found;
}
function utilityInfo(utility, themeNames) {
  const raw = utility.replace(/!$/, '');
  if (raw.startsWith('text-')) {
    const role = raw.slice(5).split('/')[0];
    if (themeNames.has(`--text-${role}`)) {
      const mappings = [['font-size', `--text-${role}`], ['line-height', `--text-${role}--line-height`], ['letter-spacing', `--text-${role}--letter-spacing`], ['font-weight', `--text-${role}--font-weight`]].filter(([, variable]) => themeNames.has(variable)).map(([property, variable]) => ({ property, references: [variable], supported: true }));
      return { ...mappings[0], extraMappings: mappings.slice(1) };
    }
  }
  if (/^font-/.test(raw) && themeNames.has(`--font-weight-${raw.slice(5)}`)) return { property: 'font-weight', references: [`--font-weight-${raw.slice(5)}`], supported: true };
  const families = [['bg-', 'background-color', '--color-'], ['text-', 'color', '--color-'], ['border-', 'border-color', '--color-'], ['ring-offset-', 'box-shadow', '--color-'], ['ring-', 'box-shadow', '--color-'], ['rounded-', 'border-radius', '--radius-'], ['shadow-', 'box-shadow', '--shadow-'], ['inset-shadow-', 'box-shadow', '--inset-shadow-'], ['duration-', 'transition-duration', null], ['ease-', 'transition-timing-function', '--ease-'], ['min-h-', 'min-height', null], ['h-', 'height', null], ['w-', 'width', null], ['gap-', 'gap', null], ['p-', 'padding', null], ['px-', 'padding-inline', null], ['py-', 'padding-block', null], ['pt-', 'padding-top', null], ['pb-', 'padding-bottom', null], ['ps-', 'padding-inline-start', null], ['pe-', 'padding-inline-end', null], ['leading-', 'line-height', null], ['font-', 'font-family', '--font-']];
  const match = families.find(([prefix]) => raw.startsWith(prefix));
  if (!match) return null;
  const [prefix, property, alias] = match;
  const suffix = raw.slice(prefix.length).split('/')[0];
  const references = [...new Set(raw.match(/--[a-zA-Z0-9_-]+/g) || [])];
  const named = alias && `${alias}${suffix}`;
  if (named && themeNames.has(named)) references.push(named);
  return { property, references, supported: references.length > 0 };
}
export function generateStaticLedger() {
  const styles = declarations();
  const globalGraph = new Map();
  for (const item of styles) { if (!globalGraph.has(item.name)) globalGraph.set(item.name, []); globalGraph.get(item.name).push(item); }
  const themeNames = new Set(globalGraph.keys());
  const records = [], unresolved = [];
  for (const component of COMPONENTS) {
    const source = parseTS(`packages/ui/src/components/${component}.tsx`);
    const strings = classStrings(source);
    const publicBySlot = new Map();
    visit(source, (node) => { if (ts.isFunctionDeclaration(node) && node.name) for (const slot of slotsIn(node)) { if (!publicBySlot.has(slot)) publicBySlot.set(slot, []); publicBySlot.get(slot).push(node.name.text); } });
    const localGraph = new Map(globalGraph);
    for (const entry of strings) for (const part of splitOutside(entry.text, ' ')) {
      const segments = splitOutside(part, ':');
      const utility = segments.pop();
      const declaration = /^\[(--[\w-]+):(.*)\]$/.exec(utility);
      if (declaration) {
        const item = { name: declaration[1], references: declaration[2].match(/--[\w-]+/g) || [], source: entry.source, context: [...entry.conditions, ...segments].join(' & ') };
        if (!localGraph.has(item.name)) localGraph.set(item.name, []);
        localGraph.get(item.name).push(item);
      }
    }
    function resolveReference(name, chain = [], seen = new Set()) {
      if (seen.has(name)) return [];
      const next = new Set([...seen, name]);
      const output = name.startsWith('--qy-') ? [{ token: name, chain: [...chain, name] }] : [];
      for (const declaration of localGraph.get(name) || []) for (const reference of declaration.references) output.push(...resolveReference(reference, [...chain, { variable: name, source: declaration.source, condition: declaration.context }], next));
      return output;
    }
    for (const entry of strings) for (const className of splitOutside(entry.text, ' ')) {
      const segments = splitOutside(className, ':');
      const utility = segments.pop();
      if (/^\[--/.test(utility)) continue;
      const info = utilityInfo(utility, themeNames);
      if (!info || !info.supported) {
        if (/--qy-|--card-spacing|--table-row/.test(utility)) unresolved.push({ sourceComponent: component, className, source: entry.source, reason: 'Unsupported class/property mapping; no runtime claim' });
        continue;
      }
      for (const mapped of [info, ...(info.extraMappings || [])]) {
      const paths = mapped.references.flatMap((reference) => resolveReference(reference));
      if (!entry.bindings.length && paths.length) unresolved.push({ sourceComponent: component, className, source: entry.source, reason: 'No exact className/slot binding; candidate only, excluded from consumer records' });
      for (const path of paths) for (const binding of entry.bindings) {
        const childSlot = segments.join(':').match(/\*:?data-\[slot=([\w-]+)\]/)?.[1];
        const part = childSlot || binding.part;
        const pseudo = segments.includes('before') ? '::before' : segments.includes('after') ? '::after' : null;
        records.push({ ...path, component: component === 'card' ? 'panel' : component, sourceComponent: component, publicNames: entry.owner ? [entry.owner] : publicBySlot.get(part) || [], part, selector: childSlot ? `[data-slot="${childSlot}"]` : binding.selector, precision: childSlot ? 'EXACT_SLOT' : binding.precision, pseudo, property: mapped.property, conditions: [...entry.conditions, ...segments], className, source: entry.source, mapping: 'AST class literal + bounded utility and custom-property forwarding; cascade not established' });
      }
      }
    }
    // Global motion rules use explicit slots or a class present in the component.
    for (const declaration of cssDeclarations(read('packages/ui/motion.css'), 'packages/ui/motion.css', { customOnly: false })) {
      const classUseSlots = declaration.context.includes('.qy-pressable') ? strings.filter((entry) => splitOutside(entry.text, ' ').includes('qy-pressable')).flatMap((entry) => entry.bindings.map((binding) => binding.part)) : [];
      const mentioned = [...declaration.context.matchAll(/data-slot\s*=\s*"([\w-]+)"/g)].map((m) => m[1]);
      const slots = [...new Set(strings.flatMap((entry) => entry.slots))].filter((slot) => classUseSlots.includes(slot) || mentioned.includes(slot));
      const property = ['transition-timing-function', 'transition-duration'].includes(declaration.name) ? declaration.name : null;
      if (!property) continue;
      for (const path of declaration.references.flatMap((reference) => resolveReference(reference))) for (const part of slots) records.push({ ...path, component: component === 'card' ? 'panel' : component, sourceComponent: component, publicNames: publicBySlot.get(part) || [], part, selector: `[data-slot="${part}"]`, precision: 'EXACT_SLOT', pseudo: null, property, conditions: [declaration.context], source: declaration.source, mapping: 'Global CSS selector and source class/slot' });
    }
  }
  const unique = new Map(records.map((record) => [JSON.stringify(record), record]));
  const runtimeConfigPaths = ['pnpm-lock.yaml', 'apps/docs/index.html', 'apps/docs/vite.config.ts'].filter(exists);
  const paths = [...recursiveFiles('packages/ui/src', /\.[cm]?[jt]sx?$/), ...recursiveFiles('apps/docs/src', /\.(tsx?|css)$/), ...stylePaths(), 'packages/ui/package.json', 'apps/docs/package.json', ...runtimeConfigPaths];
  const toolPaths = ['scripts/lib/ui-facts.mjs', 'scripts/lib/token-ledger-static.mjs', 'scripts/lib/token-ledger-probes.mjs', 'scripts/token-ledger.mjs', 'scripts/token-ledger-runtime.mjs'];
  const tools = toolPaths.map((path) => ({ path, sha256: hash(readFileSync(new URL(path.replace(/^scripts\//, '../'), import.meta.url), 'utf8')) }));
  return { fingerprint: fingerprint(paths, tools), coveredComponents: COMPONENTS.map((name) => ({ component: name === 'card' ? 'panel' : name, sourceComponent: name, publicName: name === 'card' ? ['Card', 'CardPanel'] : [name[0].toUpperCase() + name.slice(1)], route: `/playground/${name}` })), tokens: tokenDefinitions(), records: [...unique.values()], unresolved, limitations: ['Only statically readable class literals and known utility families are mapped.', 'Conditions and forwarding branches are retained; CSS cascade and actual state applicability require runtime evidence.', 'Unknown utilities/dynamic expressions are not treated as unsupported runtime behavior.', 'Computed inheritance through Portal must be probed in the actual document.'] };
}

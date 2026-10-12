// Resolve the public props of every component from the TypeScript type checker.
//
// Why this exists: the props tables on the documentation site and in catalog.json are
// written by hand in apps/docs/src/content/<name>/meta.ts. Nothing used to tie them to
// the types the component actually exports ("名实相符"). This module reads the real
// types, so that the documented names can be checked against them.
//
// It uses the Program / TypeChecker of packages/ui/tsconfig.json, never a text scan of
// the TSX. It can be imported by gen-catalog.mjs or run on its own:
//
//   node scripts/api-resolver.mjs [component …]      print the resolved parts as JSON
//   node scripts/check-api-drift.mjs                 compare with the tables, gate on new drift
//
// Definitions
//   own        a property with at least one declaration inside packages/ui/src. Redeclaring an
//              inherited property (for example narrowing `className`) makes it own.
//   inherited  every other property (DOM attributes, Base UI, React). Only counted, with
//              the package it came from; never expanded.
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { loadData } from "./meta-loader.mjs";

const here = dirname(fileURLToPath(import.meta.url));
export const uiRoot = resolve(here, "..");
export const repoRoot = resolve(uiRoot, "../..");
const srcRoot = join(uiRoot, "src") + "/";
const posix = (path) => path.replaceAll("\\", "/");
const repoRelative = (path) => posix(relative(repoRoot, path));

/** Type text longer than this is cut and marked `typeTruncated`. */
export const TYPE_TEXT_LIMIT = 240;

export function createApiProgram() {
  const configPath = join(uiRoot, "tsconfig.json");
  const config = ts.readConfigFile(configPath, ts.sys.readFile);
  if (config.error) throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, "\n"));
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, uiRoot);
  const program = ts.createProgram({ rootNames: parsed.fileNames, options: { ...parsed.options, noEmit: true } });
  return { program, checker: program.getTypeChecker() };
}

function inheritedFrom(fileName) {
  const normalized = posix(fileName);
  const marker = "/node_modules/";
  const at = normalized.lastIndexOf(marker);
  if (at < 0) return "other";
  const rest = normalized.slice(at + marker.length).split("/");
  return rest[0].startsWith("@") ? `${rest[0]}/${rest[1]}` : rest[0];
}

const isOwnFile = (fileName) => posix(fileName).startsWith(srcRoot);

/** Own if any declaration lives in packages/ui/src. Returns the first such declaration. */
function ownDeclaration(symbol) {
  return (symbol.declarations ?? []).find((declaration) => isOwnFile(declaration.getSourceFile().fileName));
}

function originOf(symbol) {
  // Mapped and intersected members keep the origin on internal links; use it when the
  // synthetic symbol carries no declarations of its own.
  const links = symbol.links ?? symbol;
  return links.syntheticOrigin ?? links.target ?? undefined;
}

function declarationsOf(symbol, depth = 0) {
  if (symbol.declarations?.length) return symbol.declarations;
  const origin = originOf(symbol);
  return origin && depth < 4 ? declarationsOf(origin, depth + 1) : [];
}

const LITERAL_UNION_LIMIT = 480;
const cleanTypeText = (text) => text.replace(/import\("[^"]*"\)\./g, "").replace(/\s+/g, " ").trim();

/**
 * Readable type text. A union of literals is expanded member by member so the reader sees the
 * values, not an alias. Any other type is shown as the library wrote it (`React.ReactNode`,
 * `DialogBackdropProps`) when it has a written annotation, because the checker would expand
 * aliases such as ReactNode into a dozen members; without one, the checker's own text.
 * The checker spells types it cannot reach from the location as import("/abs/path").Name;
 * that machine path is dropped.
 */
function typeText(checker, type, location, writtenNode) {
  const flags = ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.WriteArrowStyleSignature | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope;
  const printable = (item) => checker.typeToString(item, location, flags);
  const literalLike = ts.TypeFlags.StringLiteral | ts.TypeFlags.NumberLiteral | ts.TypeFlags.BooleanLiteral | ts.TypeFlags.Undefined | ts.TypeFlags.Null;
  let text, limit = TYPE_TEXT_LIMIT;
  if (type.isUnion() && type.types.every((member) => member.flags & literalLike)) {
    const members = [];
    let sawTrue = false, sawFalse = false;
    for (const member of type.types) {
      if (member.flags & ts.TypeFlags.BooleanLiteral) { if (member.intrinsicName === "true") sawTrue = true; else sawFalse = true; continue; }
      members.push(printable(member));
    }
    if (sawTrue && sawFalse) members.push("boolean"); else if (sawTrue) members.push("true"); else if (sawFalse) members.push("false");
    text = members.join(" | "); limit = LITERAL_UNION_LIMIT;
  } else if (writtenNode) text = writtenNode.getText(writtenNode.getSourceFile());
  else text = printable(type);
  text = cleanTypeText(text);
  return text.length > limit ? { text: `${text.slice(0, limit - 1)}…`, truncated: true } : { text, truncated: false };
}

function docComment(checker, symbol) {
  const own = ownDeclaration(symbol);
  const target = own ? symbol : symbol;
  const text = ts.displayPartsToString(target.getDocumentationComment(checker)).trim();
  const tags = target.getJsDocTags(checker).map((tag) => ({ name: tag.name, text: ts.displayPartsToString(tag.text ?? []).trim() }));
  return { text, tags };
}

function describeProperty(checker, symbol, location) {
  const own = ownDeclaration(symbol);
  const declaration = own ?? declarationsOf(symbol)[0];
  const optional = Boolean(symbol.flags & ts.SymbolFlags.Optional);
  let type = checker.getTypeOfSymbolAtLocation(symbol, declaration ?? location);
  if (optional) type = checker.getNonNullableType(type);
  const written = declaration && (ts.isPropertySignature(declaration) || ts.isPropertyDeclaration(declaration)) ? declaration.type : undefined;
  const { text, truncated } = typeText(checker, type, declaration ?? location, written);
  const doc = docComment(checker, symbol);
  const where = own && (() => {
    const file = own.getSourceFile();
    const { line } = file.getLineAndCharacterOfPosition(own.getStart(file));
    return `${repoRelative(file.fileName)}:${line + 1}`;
  })();
  const defaultTag = doc.tags.find((tag) => tag.name === "default");
  return {
    name: symbol.getName(), optional, type: text, ...(truncated ? { typeTruncated: true } : {}),
    ...(doc.text ? { doc: doc.text } : {}), ...(defaultTag?.text ? { default: defaultTag.text } : {}),
    ...(where ? { declaredAt: where } : {}),
  };
}

/** First parameter of the first call signature: the props of a component. */
function propsOf(checker, symbol, location) {
  const type = checker.getTypeOfSymbolAtLocation(symbol, location);
  const signatures = type.getCallSignatures();
  if (!signatures.length) return { kind: "not-callable" };
  const parameter = signatures[0].parameters[0];
  if (!parameter) return { kind: "no-props", signature: signatures[0] };
  const propsType = checker.getTypeOfSymbolAtLocation(parameter, parameter.valueDeclaration ?? location);
  return { kind: "props", propsType, signature: signatures[0] };
}

function resolveExport(checker, symbol, moduleFile) {
  const target = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
  const name = symbol.getName();
  if (!(target.flags & (ts.SymbolFlags.Function | ts.SymbolFlags.Variable | ts.SymbolFlags.Class | ts.SymbolFlags.ValueModule))) return null;
  const result = propsOf(checker, target, moduleFile);
  if (result.kind === "not-callable") return { name, status: "not-applicable", reason: "export is not a function (a Base UI / DayPicker namespace re-export or a plain value)" };
  if (result.kind === "no-props") return { name, status: "no-props", ownProps: [], inheritedCount: 0, inheritedFrom: [], allPropNames: [] };
  const { propsType } = result;
  if (propsType.flags & (ts.TypeFlags.Any | ts.TypeFlags.Unknown)) return { name, status: "unresolved", reason: "props type resolves to any/unknown" };
  const apparent = checker.getApparentType(checker.getNonNullableType(propsType));
  // A discriminated union (Calendar's `mode`) has properties that exist in only some members; the
  // documentation may name any of them, so every member contributes.
  const members = apparent.isUnion() ? apparent.types : [apparent];
  const bySymbolName = new Map();
  for (const member of members) for (const property of checker.getPropertiesOfType(member)) {
    const entry = bySymbolName.get(property.getName()) ?? { symbols: [], members: 0 };
    entry.symbols.push(property); entry.members += 1;
    bySymbolName.set(property.getName(), entry);
  }
  const ownProps = [];
  const inherited = new Map();
  const allPropNames = [];
  for (const [propName, entry] of bySymbolName) {
    allPropNames.push(propName);
    const ownSymbol = entry.symbols.find((property) => declarationsOf(property).some((declaration) => isOwnFile(declaration.getSourceFile().fileName)));
    if (ownSymbol) {
      ownProps.push({ ...describeProperty(checker, ownSymbol, moduleFile), ...(entry.members < members.length ? { onlyInSomeUnionMembers: true } : {}) });
    } else {
      const file = declarationsOf(entry.symbols[0])[0]?.getSourceFile().fileName;
      const source = file ? inheritedFrom(file) : "synthetic";
      inherited.set(source, (inherited.get(source) ?? 0) + 1);
    }
  }
  ownProps.sort((a, b) => a.name.localeCompare(b.name));
  return {
    name, status: "resolved", ownProps,
    inheritedCount: [...inherited.values()].reduce((sum, count) => sum + count, 0),
    inheritedFrom: [...inherited.entries()].sort((a, b) => b[1] - a[1]).map(([source, count]) => ({ source, count })),
    allPropNames,
  };
}

const componentLike = (name) => /^[A-Z]/.test(name);

/**
 * Resolve every export of `src/components/<slug>.tsx`.
 * `documented` is the set of part names the docs table names, resolved even when lowercase.
 */
export function resolveComponentFile({ program, checker }, slug, documented = new Set()) {
  const file = join(uiRoot, "src/components", `${slug}.tsx`);
  const source = program.getSourceFile(file);
  if (!source) return { status: "failed", reason: `source file not in the program: ${repoRelative(file)}`, parts: [] };
  const moduleSymbol = checker.getSymbolAtLocation(source);
  if (!moduleSymbol) return { status: "failed", reason: "file has no module symbol", parts: [] };
  const parts = [];
  for (const symbol of checker.getExportsOfModule(moduleSymbol)) {
    const name = symbol.getName();
    if (!componentLike(name) && !documented.has(name)) continue;
    try {
      const part = resolveExport(checker, symbol, source);
      if (part) parts.push(part);
    } catch (error) {
      parts.push({ name, status: "failed", reason: String(error?.message ?? error) });
    }
  }
  parts.sort((a, b) => a.name.localeCompare(b.name));
  return { status: "resolved", parts };
}

// --- reading the written API -------------------------------------------------------------

// Words that stand for "the rest of the native props" rather than for a property.
const GENERIC_WORD = /^(?:native props|ARIA|events|原生属性|primitive props|choice props|[A-Z][A-Za-z]*Props|[A-Z][A-Za-z]* props)$/;
const GENERIC_PHRASE = /^(?:其余|除|同)/;
const IDENTIFIER = /^[A-Za-z_$][\w$-]*$/;

/**
 * Turn one written name such as "side / align / sideOffset", "SidebarSub：open / defaultOpen",
 * "Image src / alt" or "label (ComboboxChip)" into checkable names.
 * Returns { names: [{ name, part? , path? }], generic: [text], unparsed: [text] }.
 */
export function parseWrittenName(written) {
  const names = [];
  const generic = [];
  const unparsed = [];
  let text = written.trim();
  let part;
  // "SidebarSub：open / defaultOpen" — a part prefix with a colon.
  const colon = text.match(/^([A-Z][A-Za-z0-9]*)\s*[：:]\s*(.+)$/);
  if (colon) { part = colon[1]; text = colon[2]; }
  // "Image src / alt" — a capitalised part followed by a space and a lowercase property.
  else {
    const spaced = text.match(/^([A-Z][A-Za-z0-9]*)\s+([a-z][\w$-]*(?:\s*\/.*)?)$/);
    if (spaced && !GENERIC_WORD.test(text)) { part = spaced[1]; text = spaced[2]; }
  }
  // A slash inside a parenthetical ("InputProps（除 size / unstyled）") belongs to that note.
  const guarded = text.replace(/[（(][^）)]*[）)]/g, (note) => note.replaceAll("/", "\u0001"));
  for (let token of guarded.split("/").map((item) => item.replaceAll("\u0001", "/"))) {
    token = token.trim();
    if (!token) continue;
    let tokenPart = part;
    // Trailing annotation: "label (ComboboxChip)", "description（NavigationMenuLink，面板内使用）".
    const annotated = token.match(/^(.*?)\s*[（(]([^）)]*)[）)]\s*$/);
    if (annotated) {
      const inner = annotated[2].trim();
      const head = annotated[1].trim();
      if (!head) { generic.push(token); continue; }
      if (GENERIC_PHRASE.test(inner) || /^除/.test(inner)) { generic.push(token); continue; }
      const partName = inner.split(/[,，\s]/)[0];
      if (/^[A-Z][A-Za-z0-9]*$/.test(partName)) tokenPart = partName;
      token = head;
    }
    if (GENERIC_WORD.test(token) || GENERIC_PHRASE.test(token) || /^(?:其余|除)/.test(token)) { generic.push(token); continue; }
    if (token.includes(".")) {
      const path = token.split(".");
      if (path.every((segment) => IDENTIFIER.test(segment))) { names.push({ name: path[0], path, ...(tokenPart ? { part: tokenPart } : {}) }); continue; }
    }
    if (/^data-/.test(token)) { generic.push(token); continue; }
    if (IDENTIFIER.test(token)) { names.push({ name: token, ...(tokenPart ? { part: tokenPart } : {}) }); continue; }
    unparsed.push(token);
  }
  return { names, generic, unparsed };
}

/**
 * A written part name may name several exports ("AccordionHeader / AccordionTrigger"), carry a
 * call signature ("toastManager.add(options)") or a generic ("VirtualList<Item>").
 * Returns the export names it stands for.
 */
export function partNamesOf(written) {
  return written.split("/").map((token) => token.replace(/\(.*$/, "").replace(/<.*$/, "").split(".")[0].trim()).filter(Boolean);
}

/**
 * Compare one component's written API with the resolved parts.
 *
 * documented-but-missing
 *   part-not-exported  a part name the component file does not export
 *   not-in-type        a property name the part's props type does not have at all (own or inherited;
 *                      union members all count)
 * undocumented         an own property that no props table of the group names. Parts written as one
 *                      merged entry ("A / B / C") form a group sharing one table.
 * unchecked            written names that are not claims about a property of this type: generic
 *                      phrases, text that is not an identifier, dotted paths into another type,
 *                      prefixes that are not exports, parts that cannot be resolved.
 */
/** A property declared in another component's file (Button's `size` reaching FilterBarApply). */
function viaComponent(declaredAt, slug) {
  const match = declaredAt?.match(/src\/components\/([^/:]+)\.tsx:/);
  return match && match[1] !== slug ? { viaComponent: match[1] } : {};
}

export function compareApi(slug, resolvedParts, writtenApi, metaPath) {
  const byName = new Map(resolvedParts.map((part) => [part.name, part]));
  const documentedButMissing = [];
  const undocumented = [];
  const noPropsTable = [];
  const unchecked = [];
  const documentedParts = new Set();
  const note = (list, item) => list.push({ component: slug, ...item });
  for (const written of writtenApi ?? []) {
    const groupNames = partNamesOf(written.name);
    for (const partName of groupNames) documentedParts.add(partName);
    const group = [];
    for (const partName of groupNames) {
      const resolved = byName.get(partName);
      if (!resolved) note(documentedButMissing, { part: partName, prop: null, written: written.name, reason: "part-not-exported", metaPath });
      else group.push(resolved);
    }
    const checkable = group.filter((part) => part.status === "resolved");
    for (const part of group) if (part.status !== "resolved" && part.status !== "no-props") note(unchecked, { part: part.name, written: written.name, token: "(whole part)", reason: `part-${part.status}` });
    const mentioned = new Set();
    for (const entry of written.props ?? []) {
      const { names, generic, unparsed } = parseWrittenName(entry.name);
      for (const token of generic) note(unchecked, { part: written.name, written: entry.name, token, reason: "generic" });
      for (const token of unparsed) note(unchecked, { part: written.name, written: entry.name, token, reason: "unparsed" });
      for (const { name, part, path } of names) {
        if (path && path.length > 1) { note(unchecked, { part: written.name, written: entry.name, token: path.join("."), reason: "dotted-path-into-another-type" }); mentioned.add(name); continue; }
        let targets = checkable;
        if (part) {
          // "Image src" under Avatar names AvatarImage: the prefix is a suffix of the part name.
          const prefixed = byName.get(part) ?? byName.get(`${groupNames[0]}${part}`);
          if (!prefixed || prefixed.status !== "resolved") { note(unchecked, { part: written.name, written: entry.name, token: name, reason: `prefix-not-resolved:${part}` }); continue; }
          targets = [prefixed];
        }
        if (!targets.length) { if (group.length) note(unchecked, { part: written.name, written: entry.name, token: name, reason: "no-resolved-part-in-group" }); continue; }
        mentioned.add(name);
        // A merged table is true when at least one of its parts has the property.
        if (!targets.some((target) => target.allPropNames.includes(name))) note(documentedButMissing, { part: targets.map((target) => target.name).join(" / "), prop: name, written: entry.name, reason: "not-in-type", metaPath });
      }
    }
    for (const part of checkable) {
      if (!written.props?.length) { if (part.ownProps.length) note(noPropsTable, { part: part.name, ownProps: part.ownProps.map((prop) => prop.name) }); continue; }
      for (const prop of part.ownProps) if (!mentioned.has(prop.name)) note(undocumented, { part: part.name, prop: prop.name, declaredAt: prop.declaredAt, ...viaComponent(prop.declaredAt, slug) });
    }
  }
  const undocumentedParts = resolvedParts.filter((part) => part.status === "resolved" && part.ownProps.length && !documentedParts.has(part.name)).map((part) => ({ component: slug, part: part.name, ownProps: part.ownProps.map((prop) => prop.name) }));
  return { documentedButMissing, undocumented, noPropsTable, undocumentedParts, unchecked };
}

// --- providers -----------------------------------------------------------------------------

/**
 * What a component needs from the app, read from the AST:
 *
 *   contexts  React contexts created in this component's file (and the non-component helper files it
 *             imports), whether a reader throws when no provider is above, and which export renders
 *             the provider.
 *   required  app-level providers (exports named *Provider) whose absence makes a reader throw.
 *   usesLocale / usesTheme  transitive calls of useUILocale / useTheme through every local import
 *             (other components included). useUILocale has a default value, so it never requires
 *             a provider; useTheme throws without ThemeProvider.
 *   baseUi    @base-ui/react entry points imported by the closure. Their own Root/Provider contexts
 *             are inside that package and are not resolved here.
 *
 * Absence of a Provider that is only detectable at run time (a toast that never shows because no
 * ToastProvider is mounted) cannot be seen from context reads, so a file that exports a Provider
 * together with other components or a *Manager is reported UNVERIFIED rather than PASS.
 */
export function resolveProviders({ program }, slug) {
  const entry = program.getSourceFile(join(uiRoot, "src/components", `${slug}.tsx`));
  if (!entry) return null;
  const resolveLocal = (from, specifier) => {
    const base = resolve(dirname(from), specifier);
    return [`${base}.tsx`, `${base}.ts`, join(base, "index.ts"), join(base, "index.tsx")].find((path) => existsSync(path));
  };
  const textOf = (node) => node.getText(node.getSourceFile());
  const localImports = (file) => file.statements
    .filter((statement) => (ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement)) && statement.moduleSpecifier && ts.isStringLiteral(statement.moduleSpecifier) && statement.moduleSpecifier.text.startsWith("."))
    .map((statement) => resolveLocal(file.fileName, statement.moduleSpecifier.text)).filter(Boolean)
    .map((path) => program.getSourceFile(path)).filter((file) => file && isOwnFile(file.fileName));
  const closure = (accept) => {
    const seen = new Set(); const files = [];
    const walk = (file, isEntry) => {
      if (seen.has(file.fileName) || (!isEntry && !accept(file))) return;
      seen.add(file.fileName); files.push(file);
      for (const target of localImports(file)) walk(target, false);
    };
    walk(entry, true);
    return files;
  };
  const isComponentFile = (file) => /\/src\/components\//.test(posix(file.fileName));
  const contextFiles = closure((file) => !isComponentFile(file));
  const everything = closure(() => true);

  const created = new Map(); const reads = []; const providedBy = new Map();
  const enclosingName = (node) => {
    for (let at = node.parent; at; at = at.parent) {
      if (ts.isFunctionDeclaration(at) && at.name) return at.name.text;
      if (ts.isVariableDeclaration(at) && ts.isIdentifier(at.name)) return at.name.text;
    }
    return undefined;
  };
  for (const file of contextFiles) {
    const visit = (node) => {
      if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer && ts.isCallExpression(node.initializer) && /(^|\.)createContext$/.test(textOf(node.initializer.expression))) {
        const argument = node.initializer.arguments[0];
        const def = argument ? textOf(argument) : "undefined";
        const line = file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
        created.set(node.name.text, { name: node.name.text, defaultValue: def.length > 60 ? `${def.slice(0, 59)}…` : def, declaredAt: `${repoRelative(file.fileName)}:${line}`, throwsWithout: false });
      }
      if (ts.isCallExpression(node)) {
        const callee = textOf(node.expression);
        const argument = node.arguments[0];
        if ((/(^|\.)useContext$/.test(callee) || /(^|\.)use$/.test(callee)) && argument && ts.isIdentifier(argument)) {
          let fn = node.parent; while (fn && !ts.isFunctionLike(fn)) fn = fn.parent;
          reads.push({ name: argument.text, throws: Boolean(fn) && textOf(fn).includes("throw new Error") });
        }
      }
      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const tag = textOf(node.tagName).replace(/\.Provider$/, "");
        if (/^[A-Z]/.test(tag)) providedBy.set(tag, [...(providedBy.get(tag) ?? []), enclosingName(node)].filter(Boolean));
      }
      ts.forEachChild(node, visit);
    };
    visit(file);
  }
  const contexts = new Map();
  for (const read of reads) {
    const info = created.get(read.name);
    if (!info) continue;
    const previous = contexts.get(read.name) ?? { ...info };
    previous.throwsWithout = previous.throwsWithout || (read.throws && /^(null|undefined)$/.test(info.defaultValue));
    contexts.set(read.name, previous);
  }
  const contextList = [...contexts.values()].map((context) => ({
    name: context.name, declaredAt: context.declaredAt, defaultValue: context.defaultValue,
    withoutProvider: context.throwsWithout ? "throws" : /^(null|undefined)$/.test(context.defaultValue) ? "nullable" : "default-value",
    ...(providedBy.get(context.name)?.length ? { providedBy: [...new Set(providedBy.get(context.name))].sort() } : {}),
  })).sort((a, b) => a.name.localeCompare(b.name));
  const calls = (name) => everything.some((file) => {
    let found = false;
    const visit = (node) => { if (found) return; if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === name) found = true; else ts.forEachChild(node, visit); };
    visit(file); return found;
  });
  const baseUi = [...new Set(everything.flatMap((file) => file.statements.filter(ts.isImportDeclaration).map((statement) => statement.moduleSpecifier.text).filter((value) => value.startsWith("@base-ui/react"))))].sort();
  const required = [...new Set([
    ...contextList.filter((context) => context.withoutProvider === "throws").flatMap((context) => (context.providedBy ?? []).filter((name) => /Provider$/.test(name))),
    ...(calls("useTheme") && slug !== "theme-provider" ? ["ThemeProvider"] : []),
  ])].sort();
  // Exports that are Providers, and other exports that could silently depend on them.
  const moduleSymbol = program.getTypeChecker().getSymbolAtLocation(entry);
  const checker = program.getTypeChecker();
  const valueOf = (symbol) => (symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol).flags & ts.SymbolFlags.Value;
  const exportNames = moduleSymbol ? checker.getExportsOfModule(moduleSymbol).filter(valueOf).map((symbol) => symbol.getName()) : [];
  const providerExports = exportNames.filter((name) => /Provider$/.test(name));
  const dependsSilently = providerExports.length > 0 && exportNames.some((name) => (/^[A-Z]/.test(name) && !/Provider$/.test(name)) || /Manager$/.test(name));
  return {
    usesLocale: calls("useUILocale"), usesTheme: calls("useTheme"), required, contexts: contextList, baseUi,
    status: dependsSilently ? "UNVERIFIED" : "PASS",
    ...(dependsSilently ? { unverified: `${slug}.tsx exports ${providerExports.join(", ")} next to other exports; whether those work without the provider is run-time behaviour that context reads cannot show.` } : {}),
    scope: "Static: React context reads and useUILocale/useTheme calls in the local import closure. useUILocale has a default locale, so a missing UILocaleProvider is tolerated.",
  };
}

// --- one component, as written into catalog.json -------------------------------------------------

const metaLines = new Map();
/** Line of the first `name: "<written>"` in a meta.ts, found with the AST. */
function metaLineOf(metaFile, written) {
  if (!metaLines.has(metaFile)) {
    const source = ts.createSourceFile(metaFile, readFileSync(metaFile, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const lines = new Map();
    const visit = (node) => {
      if (ts.isPropertyAssignment(node) && (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) && node.name.text === "name" && ts.isStringLiteralLike(node.initializer) && !lines.has(node.initializer.text)) {
        lines.set(node.initializer.text, source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1);
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
    metaLines.set(metaFile, lines);
  }
  return metaLines.get(metaFile).get(written);
}

/** Derive the catalog's `typeApi`, `apiStatus` and `providers` facts for one component, and its drift. */
export function analyzeComponent(programs, slug, meta, metaPath) {
  const documented = new Set((meta.api ?? []).flatMap((part) => partNamesOf(part.name)));
  let file;
  try { file = resolveComponentFile(programs, slug, documented); }
  catch (error) { file = { status: "failed", reason: String(error?.message ?? error), parts: [] }; }
  const strip = ({ allPropNames, ...part }) => part;
  const comparison = file.status === "resolved" ? compareApi(slug, file.parts, meta.api, metaPath) : { documentedButMissing: [], undocumented: [], noPropsTable: [], undocumentedParts: [], unchecked: [] };
  const absoluteMeta = join(repoRoot, metaPath);
  for (const item of comparison.documentedButMissing) {
    const line = metaLineOf(absoluteMeta, item.written ?? item.part);
    if (line) item.metaLine = line;
  }
  // A documented part that failed to resolve (as opposed to one that is a namespace re-export,
  // which is "not-applicable") means the table could not be checked.
  const unresolvedDocumented = file.parts.filter((part) => documented.has(part.name) && ["unresolved", "failed"].includes(part.status));
  let apiStatus, failure;
  if (file.status !== "resolved") { apiStatus = "curated-not-type-resolved"; failure = file.reason; }
  else if (unresolvedDocumented.length) { apiStatus = "curated-not-type-resolved"; failure = `documented parts not resolved: ${unresolvedDocumented.map((part) => `${part.name} (${part.status})`).join(", ")}`; }
  else apiStatus = comparison.documentedButMissing.length ? "type-resolved-with-drift" : "type-resolved";
  let providers = null, providersError;
  try { providers = resolveProviders(programs, slug); } catch (error) { providersError = String(error?.message ?? error); }
  const typeApi = {
    status: apiStatus === "curated-not-type-resolved" ? "FAIL" : "PASS",
    checker: `typescript@${ts.version}`,
    ...(failure ? { reason: failure } : {}),
    ownRule: "A property is own when at least one declaration is inside packages/ui/src; everything else is counted by origin package and not expanded.",
    parts: file.parts.map(strip),
    drift: {
      documentedButMissing: comparison.documentedButMissing.map(({ component: _c, ...item }) => item),
      undocumented: comparison.undocumented.map(({ component: _c, ...item }) => item),
    },
  };
  return { apiStatus, typeApi, comparison, providers, providersError };
}

// --- the drift report and its gate -----------------------------------------------------------

const missingKey = (item) => [item.component, item.part, item.prop ?? "", item.reason].join("|");
const unresolvedKey = (item) => `${item.component}|${item.reason}`;

/** Machine-readable report of every component's drift. Deterministic: no timestamps. */
export function buildDriftReport(results) {
  const missing = results.flatMap((result) => result.comparison.documentedButMissing).map(({ metaPath, ...item }) => ({ ...item, meta: `${metaPath}${item.metaLine ? `:${item.metaLine}` : ""}` }));
  missing.forEach((item) => delete item.metaLine);
  const undocumented = results.flatMap((result) => result.comparison.undocumented);
  const unresolved = results.filter((result) => result.apiStatus === "curated-not-type-resolved").map((result) => ({ component: result.name, reason: result.typeApi.reason }));
  const byStatus = {};
  for (const result of results) byStatus[result.apiStatus] = (byStatus[result.apiStatus] ?? 0) + 1;
  const unchecked = results.flatMap((result) => result.comparison.unchecked);
  const uncheckedByReason = {};
  for (const item of unchecked) { const reason = item.reason.replace(/:.*/, ""); uncheckedByReason[reason] = (uncheckedByReason[reason] ?? 0) + 1; }
  return {
    schemaVersion: 1,
    generatedBy: "packages/ui/scripts/gen-catalog.mjs (api-resolver.mjs)",
    checker: `typescript@${ts.version}`,
    scope: "Hand-written api tables in apps/docs/src/content/*/meta.ts against props types resolved by the TypeScript checker. Names only: types and defaults written in the tables are not compared.",
    rules: {
      own: "A property is own when at least one declaration is inside packages/ui/src; others are only counted.",
      mergedNames: "\"a / b / c\" names several properties; a merged part entry \"A / B\" is one table for a group of exports, so a property is documented if any table of the group names it and exists if any part of the group has it.",
      generic: "native props, ARIA, events, 原生属性, XProps and similar phrases stand for the inherited remainder and are not claims about a property.",
      union: "Props that are a union (Calendar mode) contribute the properties of every member.",
    },
    summary: {
      components: results.length, byStatus,
      documentedButMissing: missing.length, undocumented: undocumented.length,
      undocumentedDeclaredInThisComponentsFile: undocumented.filter((item) => !item.viaComponent).length,
      unresolved: unresolved.length, uncheckedWrittenNames: unchecked.length, uncheckedByReason,
    },
    gate: "documented-but-missing and unresolved must not exceed docs/api-drift.baseline.json; undocumented is report-only.",
    documentedButMissing: missing,
    unresolved,
    undocumented,
    undocumentedParts: results.flatMap((result) => result.comparison.undocumentedParts),
    noPropsTable: results.flatMap((result) => result.comparison.noPropsTable),
    unchecked,
  };
}

/** New = not in the baseline. Fixed = in the baseline but gone, reported so the baseline can shrink. */
export function gateDrift(report, baseline) {
  const known = new Set([...(baseline?.documentedButMissing ?? []).map(missingKey), ...(baseline?.unresolved ?? []).map(unresolvedKey)]);
  const current = new Set([...report.documentedButMissing.map(missingKey), ...report.unresolved.map(unresolvedKey)]);
  const added = [
    ...report.documentedButMissing.filter((item) => !known.has(missingKey(item))).map((item) => ({ kind: "documented-but-missing", ...item })),
    ...report.unresolved.filter((item) => !known.has(unresolvedKey(item))).map((item) => ({ kind: "unresolved", ...item })),
  ];
  const fixed = [...known].filter((key) => !current.has(key));
  return { added, fixed };
}

export function analyzeAll(programs = createApiProgram()) {
  const names = readdirSync(join(uiRoot, "src/components")).filter((file) => file.endsWith(".tsx")).map((file) => file.replace(/\.tsx$/, "")).sort();
  return names.map((name) => {
    const metaPath = `apps/docs/src/content/${name}/meta.ts`;
    const meta = loadData(join(repoRoot, metaPath)).default;
    return { name, ...analyzeComponent(programs, name, meta, metaPath) };
  });
}

// --- CLI -------------------------------------------------------------------------------------

async function main() {
  const only = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));
  const programs = createApiProgram();
  const names = readdirSync(join(uiRoot, "src/components")).filter((file) => file.endsWith(".tsx")).map((file) => file.replace(/\.tsx$/, "")).sort();
  const selected = only.length ? names.filter((name) => only.includes(name)) : names;
  const out = selected.map((name) => ({ name, ...resolveComponentFile(programs, name) }));
  console.log(JSON.stringify(out.map((item) => ({ name: item.name, status: item.status, parts: item.parts.map((part) => ({ name: part.name, status: part.status, own: part.ownProps?.map((prop) => prop.name), inherited: part.inheritedCount })) })), null, 1));
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();

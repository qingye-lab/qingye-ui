import postcss from "postcss";
import ts from "typescript";

export type Appearance = "light" | "dark";
export type RGBA = [number, number, number, number]; // encoded sRGB, 0..1
export type ContrastResult = {
  status: "PASS" | "FAIL" | "UNVERIFIED";
  pair: string;
  minimum: number;
  ratio?: number;
  reason?: string;
};
export type ContrastPair = { pair: string; foreground: string; background: string[]; minimum: number };

// Split CSS function arguments, never commas inside a nested function.
function split(value: string, separator: string): string[] {
  let depth = 0, start = 0;
  const parts: string[] = [];
  for (let i = 0; i < value.length; i++) {
    if (value[i] === "(") depth++;
    if (value[i] === ")") depth--;
    if (!depth && value[i] === separator) { parts.push(value.slice(start, i).trim()); start = i + 1; }
  }
  parts.push(value.slice(start).trim());
  return parts;
}
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const number = (value: string): number => {
  if (!/^[+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?%?$/i.test(value)) throw new Error(`Unsupported channel: ${value}`);
  return parseFloat(value) / (value.endsWith("%") ? 100 : 1);
};
const encode = (c: number) => c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055;
const linear = (c: number) => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;

/** Default library cascade only. Project brands and runtime overrides are outside this scope. */
export function tokenValues(sources: string[], appearance: Appearance): Map<string, string> {
  const values = new Map<string, string>();
  for (const source of sources) {
    postcss.parse(source).walkRules((rule) => {
      const selectors = postcss.list.comma(rule.selector);
      const applies = selectors.some((s) => s === ":root" || s === `.${appearance}` || s === `[data-theme="${appearance}"]` || s === "[data-theme]");
      if (!applies) return;
      let conditional: string | undefined;
      for (let parent: postcss.AnyNode | undefined = rule.parent; parent; parent = parent.parent) {
        if (parent.type === "atrule" && parent.name !== "layer") conditional = `Conditional token cascade needs runtime verification: @${parent.name}`;
      }
      rule.each((node) => { if (node.type === "decl" && node.prop.startsWith("--")) values.set(node.prop, conditional ? `UNVERIFIED(${conditional})` : node.value); });
    });
  }
  return values;
}

/**
 * Resolve var() aliases/fallbacks and premultiplied color-mix(in srgb).
 * OKLCH -> Oklab -> linear sRGB uses CSS Color 4's matrices. The target is
 * the default sRGB rendering surface; out-of-gamut channels clip to sRGB.
 * https://www.w3.org/TR/css-color-4/#color-conversion-code
 */
export function resolveColor(value: string, tokens: Map<string, string>, visiting = new Set<string>()): RGBA {
  value = value.trim();
  if (value.startsWith("var(") && value.endsWith(")")) {
    const [name, fallback] = split(value.slice(4, -1), ",");
    if (!name || visiting.has(name)) throw new Error(`Cyclic token: ${name}`);
    const binding = tokens.get(name) ?? fallback;
    if (!binding) throw new Error(`Unknown token: ${name}`);
    return resolveColor(binding, tokens, new Set([...visiting, name]));
  }
  if (value === "transparent") return [0, 0, 0, 0];
  if (value === "white") return [1, 1, 1, 1];
  if (value === "black") return [0, 0, 0, 1];
  if (/^#[\da-f]{3,8}$/i.test(value)) {
    let hex = value.slice(1);
    if (hex.length === 3 || hex.length === 4) hex = [...hex].map((c) => c + c).join("");
    if (hex.length !== 6 && hex.length !== 8) throw new Error(`Invalid hex color: ${value}`);
    return [parseInt(hex.slice(0, 2), 16) / 255, parseInt(hex.slice(2, 4), 16) / 255, parseInt(hex.slice(4, 6), 16) / 255, hex.length === 8 ? parseInt(hex.slice(6), 16) / 255 : 1];
  }
  if (value.startsWith("color-mix(") && value.endsWith(")")) {
    const args = split(value.slice(10, -1), ",");
    if (args.length !== 3 || args[0] !== "in srgb") throw new Error(`Unsupported interpolation: ${value}`);
    const entries = args.slice(1).map((arg) => {
      const match = /^(.*)\s+([\d.]+%)$/.exec(arg);
      return { color: resolveColor(match ? match[1]! : arg, tokens, visiting), weight: match ? number(match[2]!) : undefined };
    });
    const [a, b] = entries;
    const wa = a!.weight ?? (b!.weight === undefined ? 0.5 : 1 - b!.weight);
    const wb = b!.weight ?? 1 - wa;
    const total = wa + wb;
    if (wa < 0 || wb < 0 || !total) throw new Error(`Invalid mix weights: ${value}`);
    const alpha = (a!.color[3] * wa + b!.color[3] * wb) / total;
    if (!alpha) return [0, 0, 0, 0];
    return [0, 1, 2].map((i) => (a!.color[i]! * a!.color[3] * wa + b!.color[i]! * b!.color[3] * wb) / (alpha * total)).concat(alpha * Math.min(1, total)) as RGBA;
  }
  const fn = /^(oklch|rgb|rgba|color)\((.*)\)$/.exec(value);
  if (!fn) throw new Error(`Unsupported or runtime color: ${value}`);
  const [channels, alpha = "1"] = split(fn[2]!, "/");
  let parts = channels!.trim().split(/[\s,]+/);
  if (fn[1] === "color") {
    if (parts.shift() !== "srgb") throw new Error(`Unsupported color space: ${value}`);
    if (parts.length !== 3) throw new Error(`Invalid color: ${value}`);
    return [...parts.map((x) => clamp(number(x))), clamp(number(alpha))] as RGBA;
  }
  if (fn[1] === "rgb" || fn[1] === "rgba") {
    const a = parts.length === 4 ? parts.pop()! : alpha;
    if (parts.length !== 3) throw new Error(`Invalid color: ${value}`);
    return [...parts.map((x) => clamp(number(x) / (x.endsWith("%") ? 1 : 255))), clamp(number(a))] as RGBA;
  }
  if (parts.length !== 3) throw new Error(`Invalid OKLCH: ${value}`);
  const l = number(parts[0]!), c = number(parts[1]!), h = number(parts[2]!.replace(/deg$/, "")) * Math.PI / 180;
  const a = c * Math.cos(h), b = c * Math.sin(h);
  const x = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const y = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const z = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [4.0767416621 * x - 3.3077115913 * y + 0.2309699292 * z, -1.2684380046 * x + 2.6097574011 * y - 0.3413193965 * z, -0.0041960863 * x - 0.7034186147 * y + 1.707614701 * z].map((v) => clamp(encode(v))).concat(clamp(number(alpha))) as RGBA;
}

export function composite(f: RGBA, b: RGBA): RGBA {
  const alpha = f[3] + b[3] * (1 - f[3]);
  return alpha ? [0, 1, 2].map((i) => (f[i]! * f[3] + b[i]! * b[3] * (1 - f[3])) / alpha).concat(alpha) as RGBA : [0, 0, 0, 0];
}
export function contrast(f: RGBA, b: RGBA): number {
  const luminance = (color: RGBA) => color.slice(0, 3).map(linear).reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i]!, 0);
  const a = luminance(f), z = luminance(b);
  return (Math.max(a, z) + 0.05) / (Math.min(a, z) + 0.05);
}
export function checkPair(pair: ContrastPair, tokens: Map<string, string>): ContrastResult {
  try {
    let background: RGBA = [0, 0, 0, 0];
    for (const layer of pair.background) background = composite(resolveColor(layer, tokens), background);
    if (background[3] < 1 - 1e-9) throw new Error("Alpha background over an unknown backdrop");
    const foreground = composite(resolveColor(pair.foreground, tokens), background);
    const ratio = contrast(foreground, background);
    // Do not round before comparison or forgive a near-threshold failure.
    return { pair: pair.pair, minimum: pair.minimum, ratio, status: ratio >= pair.minimum ? "PASS" : "FAIL" };
  } catch (error) {
    return { pair: pair.pair, minimum: pair.minimum, status: "UNVERIFIED", reason: (error as Error).message };
  }
}

/**
 * Explicit library contracts for actual semantic roles and supported surfaces.
 * Arrays paint bottom -> top. This checks defaults, not arbitrary consumers.
 * Input/Select/Button: boundary around inset/hover/active control fills.
 * Popover/Menu/Chart: secondary text on raised surfaces and selected rows.
 * StatusDot/Alert/ProgressCircle/Chart: marks, not small text at 3:1.
 * Badge/Timeline: status text over the real translucent status fill.
 */
export function libraryPairs(appearance: Appearance): ContrastPair[] {
  const pairs: ContrastPair[] = [];
  const add = (pair: string, foreground: string, background: string[], minimum: number) => pairs.push({ pair, foreground, background, minimum });
  const token = (name: string) => `var(--qy-${name})`;
  const alpha = (name: string, percent: number) => `color-mix(in srgb, ${token(name)} ${percent}%, transparent)`;
  for (const surface of ["background", "surface", "surface-raised", "surface-subtle"]) {
    const bases = [[token(surface)], ...["surface-inset", "surface-hover", "surface-active", "accent"].map((fill) => [token(surface), token(fill)])];
    for (const background of bases) {
      const label = background.join(" -> ");
      for (const text of ["foreground", "foreground-muted", "foreground-subtle"]) add(`${text} on ${label}`, token(text), background, 4.5);
      for (const line of ["border-input", "border-strong"]) add(`${line} on ${label}`, token(line), background, 3);
    }
    for (const mark of ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5", "warning", "success", "info", "danger"]) add(`${mark} on ${surface}`, token(mark), [token(surface)], 3);
    for (const state of ["danger", "warning", "success", "info"]) {
      add(`${state} Alert icon on 4% fill over ${surface}`, token(state), [token(surface), alpha(state, 4)], 3);
      add(`${state} Badge text on status fill over ${surface}`, token(`${state}-foreground`), [token(surface), alpha(state, appearance === "dark" ? 16 : 8)], 4.5);
    }
    add(`StatusDot muted indicator on ${surface}`, token("foreground-muted"), [token(surface)], 3);
    add(`Calendar disabled/outside date on ${surface}`, token("foreground-muted"), [token(surface)], 4.5);
    add(`Calendar selected range-middle date on ${surface}`, token("foreground"), [token(surface), token("accent")], 4.5);
    add(`ring/50 on ${surface}`, alpha("ring", 50), [token(surface)], 3);
  }
  add("sidebar focus on sidebar", token("sidebar-ring"), [token("sidebar")], 3);
  add("sidebar focus on active row", token("sidebar-ring"), [token("sidebar"), token("sidebar-accent")], 3);
  add("sidebar text", token("sidebar-foreground"), [token("sidebar")], 4.5);
  add("primary button text", token("primary-foreground"), [token("primary")], 4.5);
  add("Calendar selected date, including disabled/outside", token("primary-foreground"), [token("primary")], 4.5);
  add("destructive button text", token("danger-on-fill"), [token("danger-fill")], 4.5);
  return pairs;
}

/** Bounded AST check for literal same-element JSX pairs; never infer an inherited backdrop. */
export function inspectSourceContrast(source: string, tokens: Map<string, string>, fileName = "component.tsx"): ContrastResult[] {
  const file = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const results: ContrastResult[] = [];
  const utility = (value: string): string | undefined => {
    const match = /^(?:text|bg)-([\w-]+)(?:\/(\d+(?:\.\d+)?))?$/.exec(value);
    if (!match) return undefined;
    const name = match[1] === "muted-foreground" ? "foreground-muted" : match[1] === "card" ? "surface" : match[1] === "popover" ? "surface-raised" : match[1];
    const token = `var(--qy-${name})`;
    return match[2] ? `color-mix(in srgb, ${token} ${match[2]}%, transparent)` : token;
  };
  function walk(node: ts.Node) {
    if (ts.isJsxAttribute(node) && ["className", "style", "color", "fill", "stroke"].includes(node.name.getText(file))) {
      const pair = `${fileName}:${file.getLineAndCharacterOfPosition(node.getStart()).line + 1}`;
      if (node.name.getText(file) !== "className" || !node.initializer || !ts.isStringLiteral(node.initializer)) {
        results.push({ pair, minimum: 4.5, status: "UNVERIFIED", reason: "Runtime class/style expression or spread requires rendered verification" });
      } else {
        const classes = node.initializer.text.split(/\s+/);
        const paint = classes.filter((c) => /^(text|bg)-/.test(c) && (utility(c) && tokens.has(`--qy-${c.replace(/^(text|bg)-/, "").split("/")[0]}`) || /^(text-muted-foreground|bg-card|bg-popover)/.test(c)));
        if (paint.length) {
          const foreground = paint.find((c) => c.startsWith("text-"));
          const background = paint.find((c) => c.startsWith("bg-"));
          const element = node.parent.parent;
          const tag = ts.isJsxOpeningElement(element) || ts.isJsxSelfClosingElement(element) ? element.tagName.getText(file) : "";
          const overridden = node.parent.properties.some((attribute) => ts.isJsxSpreadAttribute(attribute) || ts.isJsxAttribute(attribute) && attribute.name.getText(file) === "style");
          let uncertainAncestor = false;
          for (let ancestor = element.parent; ancestor; ancestor = ancestor.parent) {
            if (!ts.isJsxElement(ancestor) || ancestor.openingElement === element) continue;
            const opening = ancestor.openingElement;
            if (!/^[a-z]/.test(opening.tagName.getText(file)) || opening.attributes.properties.some((attribute) => ts.isJsxSpreadAttribute(attribute) || ts.isJsxAttribute(attribute) && (attribute.name.getText(file) === "style" || attribute.name.getText(file) === "className" && (!attribute.initializer || !ts.isStringLiteral(attribute.initializer) || /(?:opacity-|mix-blend-)/.test(attribute.initializer.text))))) uncertainAncestor = true;
          }
          // Component children, pseudo/variant overrides, images and opacity
          // require CSS cascade/group compositing, not a convenient white base.
          if (!foreground || !background || overridden || uncertainAncestor || paint.filter((c) => c.startsWith("text-")).length !== 1 || paint.filter((c) => c.startsWith("bg-")).length !== 1 || !/^[a-z][\w-]*$/.test(tag) || classes.some((c) => c.includes(":") || /^(opacity-|bg-\[|text-\[|bg-(?:gradient|linear|radial|conic)|from-|via-|to-|mix-blend-|backdrop-)/.test(c))) {
            results.push({ pair, minimum: 4.5, status: "UNVERIFIED", reason: "Inherited/currentColor paint, component composition, state, image or opacity needs a rendered pair" });
          } else results.push(checkPair({ pair, foreground: utility(foreground)!, background: [utility(background)!], minimum: 4.5 }, tokens));
        } else if (classes.some((c) => /(?:^|:)(?:text|bg|fill|stroke)-/.test(c))) {
          // Do not silently discard currentColor, arbitrary paint or unknown
          // utilities merely because neither side resolves to a known token.
          results.push({ pair, minimum: 4.5, status: "UNVERIFIED", reason: "No statically resolved semantic paint pair; inherited, arbitrary or unknown utility needs rendered verification" });
        }
      }
    }
    if (ts.isJsxSpreadAttribute(node)) results.push({ pair: `${fileName}:${file.getLineAndCharacterOfPosition(node.getStart()).line + 1}`, minimum: 4.5, status: "UNVERIFIED", reason: "Spread props can override paint at runtime" });
    ts.forEachChild(node, walk);
  }
  walk(file);
  return results;
}

/** Required boundaries keep their contrast independently of control fills and error paint. */
export function boundaryFillCouplings(source: string, fileName = "component.tsx"): string[] {
  const file = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const hits: string[] = [];
  function walk(node: ts.Node) {
    if (ts.isStringLiteralLike(node)) {
      let owner: ts.Node | undefined = node.parent;
      let paintContext = false;
      while (owner && !ts.isSourceFile(owner)) {
        if (ts.isJsxAttribute(owner) && owner.name.getText(file) === "className" || ts.isPropertyAssignment(owner) && owner.name.getText(file) === "className" || ts.isCallExpression(owner) && ["cn", "cva", "clsx"].includes(owner.expression.getText(file))) { paintContext = true; break; }
        owner = owner.parent;
      }
      if (paintContext) {
        const classes = node.text.split(/\s+/);
        if (classes.includes("border-input") && classes.some((c) => /(?:^|:)bg-input(?:\/|$)/.test(c))) hits.push(`${fileName}:${file.getLineAndCharacterOfPosition(node.getStart()).line + 1}`);
        if (classes.includes("border-input") && classes.some((c) => /(?:^|:)border-destructive\//.test(c))) hits.push(`${fileName}:${file.getLineAndCharacterOfPosition(node.getStart()).line + 1} (required error boundary reduced with alpha)`);
      }
    }
    ts.forEachChild(node, walk);
  }
  walk(file);
  return hits;
}

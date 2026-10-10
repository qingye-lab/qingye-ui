import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";
import ts from "typescript";
import { inspectColors } from "./color-check";

/**
 * Convention checks over every component source file. STANDARDS.md is prose;
 * these are the parts of it a machine can hold us to, so a component cannot
 * quietly drift away from the system.
 */
const dir = join(__dirname, "..", "src", "components");
const files = readdirSync(dir).filter((f) => /\.tsx?$/.test(f));

function read(file: string) {
  return readFileSync(join(dir, file), "utf8");
}

/** Strips comments so prose does not trip the class checks. */
function code(file: string) {
  return read(file)
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
}

const table = files.map((file) => [file, code(file)] as const);

const HAN = /[一-鿿]/;

/**
 * String literals the module actually emits, read from the AST. Comments are not
 * AST nodes, so prose about the code can never be reported as user-visible copy;
 * a literal in a type position (`"xs" | "sm"`) is a type, not text on screen.
 */
function literalStrings(source: string, filename = "fixture.tsx"): string[] {
  const ast = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const found: string[] = [];
  const visit = (node: ts.Node) => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const parent = node.parent as ts.Node;
      if (!ts.isLiteralTypeNode(parent) && !ts.isTypeNode(parent)) found.push(node.text);
    }
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(ast, visit);
  return found;
}

/** Follow emitted JSX/useRender props; comments and unrelated objects are not hooks. */
function inspectSlotHook(source: string, filename = "fixture.tsx") {
  const ast = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let interactive = false;
  let hooked = false;
  const nativeControls = new Set(["button", "input", "select", "textarea", "a"]);
  const primitiveParts = new Set(["Root", "Trigger", "Popup", "Item", "Tab", "Panel", "Handle", "DayPicker"]);
  const keyOf = (name: ts.PropertyName) => ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : undefined;
  const unwrap = (value: ts.Expression): ts.Expression => ts.isParenthesizedExpression(value) || ts.isAsExpression(value) || ts.isSatisfiesExpression(value) ? unwrap(value.expression) : value;
  function initializer(reference: ts.Identifier): ts.Expression | undefined {
    for (let scope: ts.Node | undefined = reference.parent; scope; scope = scope.parent) {
      if (!ts.isBlock(scope) && !ts.isSourceFile(scope)) continue;
      for (const statement of scope.statements) if (ts.isVariableStatement(statement)) {
        for (const declaration of statement.declarationList.declarations) {
          if (ts.isIdentifier(declaration.name) && declaration.name.text === reference.text) return declaration.initializer;
        }
      }
    }
    return undefined;
  }
  function hasSlot(expression: ts.Expression, seen = new Set<ts.Node>()): boolean {
    const value = unwrap(expression);
    if (seen.has(value)) return false;
    seen.add(value);
    if (ts.isIdentifier(value)) {
      const definition = initializer(value);
      return Boolean(definition && hasSlot(definition, seen));
    }
    if (ts.isCallExpression(value) && ts.isIdentifier(value.expression) && value.expression.text === "mergeProps") return value.arguments.some(argument => hasSlot(argument, seen));
    if (!ts.isObjectLiteralExpression(value)) return false;
    return value.properties.some(property => {
      if (ts.isSpreadAssignment(property)) return hasSlot(property.expression, seen);
      if (!ts.isPropertyAssignment(property) || keyOf(property.name) !== "data-slot") return false;
      const slot = unwrap(property.initializer);
      return !(ts.isIdentifier(slot) && slot.text === "undefined") && slot.kind !== ts.SyntaxKind.NullKeyword && (!ts.isStringLiteral(slot) || Boolean(slot.text.trim()));
    });
  }
  function visit(node: ts.Node) {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName;
      if (ts.isIdentifier(tag) && nativeControls.has(tag.text) || ts.isPropertyAccessExpression(tag) && tag.expression.getText(ast).endsWith("Primitive") && primitiveParts.has(tag.name.text)) interactive = true;
      for (const attribute of node.attributes.properties) {
        if (ts.isJsxAttribute(attribute) && attribute.name.getText(ast) === "data-slot") hooked = true;
        if (ts.isJsxSpreadAttribute(attribute) && hasSlot(attribute.expression)) hooked = true;
      }
    }
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "useRender") {
      const options = node.arguments[0];
      if (options && ts.isObjectLiteralExpression(options)) for (const property of options.properties) {
        if (!ts.isPropertyAssignment(property)) continue;
        const key = keyOf(property.name);
        if (key === "defaultTagName" && ts.isStringLiteral(property.initializer) && nativeControls.has(property.initializer.text)) interactive = true;
        if ((key === "props" || key === "defaultProps") && hasSlot(property.initializer)) hooked = true;
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  return { interactive, hooked };
}

describe("component conventions", () => {

  test("no hard-coded greys: colours come from semantic tokens or utilities", () => {
    const offenders: string[] = [];
    for (const file of files) {
      // Parse original TSX, not the regex comment-stripped source. Selector
      // literals stay separate from paint values, including arbitrary values.
      const result = inspectColors(read(file), file);
      for (const hit of result.violations) {
        offenders.push(`${file}:${hit.line} (${hit.context}): ${hit.value}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  test("focus is styled with focus-visible, never bare focus:", () => {
    // A bare `focus:` ring appears on mouse clicks, which reads as a glitch.
    const offenders: string[] = [];
    for (const [file, source] of table) {
      const hits = source.match(/(?<!-)\bfocus:(?:ring|border)/g);
      if (hits) offenders.push(`${file}: ${hits.length}`);
    }
    expect(offenders).toEqual([]);
  });

  test("direction-sensitive spacing uses logical properties", () => {
    // ml-/mr-/pl-/pr- break under RTL; ms-/me-/ps-/pe- do not.
    const offenders: string[] = [];
    for (const [file, source] of table) {
      const hits = source.match(/(?<![\w:-])(?:ml|mr|pl|pr)-[\w[\]().-]+/g);
      if (hits) offenders.push(`${file}: ${[...new Set(hits)].join(", ")}`);
    }
    expect(offenders).toEqual([]);
  });

  test("user-visible strings go through the locale layer", () => {
    // A literal Chinese string in a component is a string that cannot be
    // translated or overridden; demo and docs copy lives outside this folder.
    const offenders: string[] = [];
    for (const file of files) {
      if (file === "locale.tsx") continue;
      // 用 AST 取真正的字符串字面量，不用正则扫全文：正则分不清「字符串里的中文」
      // 和「注释里的中文」，而且字符类允许跨行，会把一行注释和邻近的属性文本粘成
      // 一个假命中（2026-10-05 打磨时，新增的中文说明注释曾被误报为界面文案）。
      const hits = literalStrings(read(file), file).filter((text) => HAN.test(text));
      if (hits.length) offenders.push(`${file}: ${hits.slice(0, 3).join(" ")}`);
    }
    expect(offenders).toEqual([]);
  });

  test("interactive parts carry a data-slot hook", () => {
    const missing: string[] = [];
    for (const file of files) {
      const { interactive, hooked } = inspectSlotHook(read(file), file);
      if (interactive && !hooked) missing.push(file);
    }
    expect(missing).toEqual([]);
  });

  test("slot hook AST follows JSX and emitted props without accepting prose or unused objects", () => {
    for (const source of [
      'return <button data-slot="action" />;',
      'return useRender({ defaultTagName: "input", props: { "data-slot": "input" } });',
      'const defaults = { "data-slot": "action" }; return useRender({ defaultTagName: "button", props: mergeProps(defaults, props) });',
      'const defaults = { "data-slot": "action" }; return <button {...defaults} />;',
    ]) expect(inspectSlotHook(source)).toEqual({ interactive: true, hooked: true });
    for (const source of [
      '/* data-slot="action" */ return <button />;',
      'const prose = "data-slot=action"; return <button />;',
      'const unused = { "data-slot": "action" }; return <button />;',
      'return useRender({ defaultTagName: "input", props: { "data-slot": undefined } });',
      'const defaults = { "data-slot": "unused" }; function Action() { const defaults = {}; return useRender({ defaultTagName: "button", props: defaults }); }',
      'return <ActionPrimitive.Trigger />;',
    ]) expect(inspectSlotHook(source)).toEqual({ interactive: true, hooked: false });
  });

  test("straight durations are on Tailwind's scale or a deliberate exception", () => {
    /*
     * Components may use a raw duration class, but it should be a step that
     * belongs to a scale. The existing per-file exception register below stays
     * unchanged; it grants no exception to any other component or duration.
     * New motion should prefer the `--qy-*` duration tokens instead.
     */
    const scale = new Set(["75", "100", "150", "200", "300", "500", "700", "1000"]);
    const inherited = new Map([
      ["drawer.tsx", new Set(["450"])],
      ["toast.tsx", new Set(["250"])],
    ]);
    const offenders: string[] = [];
    for (const [file, source] of table) {
      for (const hit of source.matchAll(/\bduration-(\d{3,}|75)\b/g)) {
        const value = hit[1]!;
        if (scale.has(value)) continue;
        if (inherited.get(file)?.has(value)) continue;
        offenders.push(`${file}: duration-${value}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});

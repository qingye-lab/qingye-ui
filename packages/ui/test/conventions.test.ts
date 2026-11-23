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

type FocusViolation = { line: number; reason: string; token: string };

const RING_TRIGGER = /(?:^|:)focus-visible:ring(?:$|-(?!inset$|0$|none$))/;
const RING_INSET = /(?:^|:)focus-visible:ring-inset$/;
const RING_ZERO = /(?:^|:)focus-visible:ring-(?:0|none)$/;
const OUTWARD_OUTLINE_OFFSET = /(?:^|:)focus-visible:outline-offset-(?!0$)\S+/;

/** Collect literal class fragments from an expression, separating unconditional tokens from conditional branches. */
function collectClassStrings(node: ts.Node, ast: ts.SourceFile): { line: number; text: string }[] {
  const out: { line: number; text: string }[] = [];
  const visit = (current: ts.Node) => {
    if (ts.isStringLiteral(current) || ts.isNoSubstitutionTemplateLiteral(current)) {
      const parent = current.parent;
      if (!ts.isLiteralTypeNode(parent) && !ts.isTypeNode(parent) && !(ts.isPropertyAssignment(parent) && parent.name === current)) {
        out.push({ line: ast.getLineAndCharacterOfPosition(current.getStart(ast)).line + 1, text: current.text });
      }
      return;
    }
    if (ts.isTemplateHead(current) || ts.isTemplateMiddle(current) || ts.isTemplateTail(current)) {
      out.push({ line: ast.getLineAndCharacterOfPosition(current.getStart(ast)).line + 1, text: current.text });
      return;
    }
    ts.forEachChild(current, visit);
  };
  visit(node);
  return out;
}

/** Collect tokens that are unconditionally applied by an expression (plain string, template literal, or nested cn()). */
function unconditionalTokens(expr: ts.Expression): string[] {
  if (ts.isParenthesizedExpression(expr) || ts.isAsExpression(expr) || ts.isSatisfiesExpression(expr)) return unconditionalTokens(expr.expression);
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) return expr.text.split(/\s+/).filter(Boolean);
  if (ts.isTemplateExpression(expr)) {
    const parts = [expr.head.text, ...expr.templateSpans.map((span) => span.literal.text)];
    return parts.join(" ").split(/\s+/).filter(Boolean);
  }
  if (ts.isCallExpression(expr) && ts.isIdentifier(expr.expression) && expr.expression.text === "cn") {
    return expr.arguments.flatMap(unconditionalTokens);
  }
  return [];
}

/**
 * NG9 AST guard: focus rings must stay inward (`focus-visible:ring-inset`) and
 * never use positive `focus-visible:outline-offset-*`. Parses original TSX so
 * comments and non-style literals cannot trigger false positives.
 */
function inspectFocusOutward(source: string, filename = "fixture.tsx"): FocusViolation[] {
  const ast = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const violations: FocusViolation[] = [];
  const keyOf = (name: ts.PropertyName) => (ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : undefined);

  function checkOutwardOffsets(node: ts.Node) {
    for (const item of collectClassStrings(node, ast)) {
      for (const token of item.text.split(/\s+/).filter(Boolean)) {
        if (OUTWARD_OUTLINE_OFFSET.test(token)) {
          violations.push({ line: item.line, reason: "positive focus-visible:outline-offset", token });
        }
      }
    }
  }

  function checkCnArg(expr: ts.Expression, parentHasInset: boolean) {
    if (ts.isParenthesizedExpression(expr) || ts.isAsExpression(expr) || ts.isSatisfiesExpression(expr)) {
      checkCnArg(expr.expression, parentHasInset);
      return;
    }
    if (ts.isConditionalExpression(expr)) {
      checkCnArg(expr.whenTrue, parentHasInset);
      checkCnArg(expr.whenFalse, parentHasInset);
      return;
    }
    if (ts.isBinaryExpression(expr) && (expr.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken || expr.operatorToken.kind === ts.SyntaxKind.BarBarToken || expr.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken)) {
      checkCnArg(expr.right, parentHasInset);
      return;
    }
    if (ts.isCallExpression(expr) && ts.isIdentifier(expr.expression) && expr.expression.text === "cn") {
      const localInset = parentHasInset || expr.arguments.flatMap(unconditionalTokens).some((t) => RING_INSET.test(t));
      for (const arg of expr.arguments) checkCnArg(arg, localInset);
      return;
    }
    if (ts.isArrayLiteralExpression(expr)) {
      for (const el of expr.elements) if (ts.isExpression(el)) checkCnArg(el, parentHasInset);
      return;
    }
    const strings = collectClassStrings(expr, ast);
    const tokens = strings.flatMap((s) => s.text.split(/\s+/).filter(Boolean));
    const hasInset = parentHasInset || tokens.some((t) => RING_INSET.test(t));
    const hasZero = tokens.some((t) => RING_ZERO.test(t));
    if (!hasInset && !hasZero) {
      for (const item of strings) {
        const hit = item.text.split(/\s+/).find((t) => RING_TRIGGER.test(t));
        if (hit) violations.push({ line: item.line, reason: "focus-visible:ring without ring-inset", token: hit });
      }
    }
  }

  function checkCva(call: ts.CallExpression) {
    checkOutwardOffsets(call);
    const [baseArg, configArg] = call.arguments;
    const baseTokens = baseArg ? unconditionalTokens(baseArg) : [];
    const baseHasInset = baseTokens.some((t) => RING_INSET.test(t));
    const baseHasRing = baseTokens.some((t) => RING_TRIGGER.test(t));

    // Check whether a variant group guarantees ring-inset or ring-0 across all of its values.
    let closedByVariant = false;
    if (configArg && ts.isObjectLiteralExpression(configArg)) {
      for (const prop of configArg.properties) {
        if (!ts.isPropertyAssignment(prop)) continue;
        const propName = keyOf(prop.name);
        if (propName === "variants" && ts.isObjectLiteralExpression(prop.initializer)) {
          for (const group of prop.initializer.properties) {
            if (!ts.isPropertyAssignment(group) || !ts.isObjectLiteralExpression(group.initializer)) continue;
            const values = group.initializer.properties.filter(ts.isPropertyAssignment);
            if (values.length > 0 && values.every((v) => {
              const toks = collectClassStrings(v.initializer, ast).flatMap((s) => s.text.split(/\s+/).filter(Boolean));
              return toks.some((t) => RING_INSET.test(t) || RING_ZERO.test(t));
            })) {
              closedByVariant = true;
            }
            for (const v of values) {
              const items = collectClassStrings(v.initializer, ast);
              const toks = items.flatMap((s) => s.text.split(/\s+/).filter(Boolean));
              if (!baseHasInset && !toks.some((t) => RING_INSET.test(t) || RING_ZERO.test(t))) {
                for (const item of items) {
                  const hit = item.text.split(/\s+/).find((t) => RING_TRIGGER.test(t));
                  if (hit) violations.push({ line: item.line, reason: "focus-visible:ring without ring-inset", token: hit });
                }
              }
            }
          }
        }
        if (propName === "compoundVariants" && ts.isArrayLiteralExpression(prop.initializer)) {
          for (const entry of prop.initializer.elements) {
            if (!ts.isObjectLiteralExpression(entry)) continue;
            for (const field of entry.properties) {
              if (!ts.isPropertyAssignment(field)) continue;
              const name = keyOf(field.name);
              if (name !== "class" && name !== "className") continue;
              const items = collectClassStrings(field.initializer, ast);
              const toks = items.flatMap((s) => s.text.split(/\s+/).filter(Boolean));
              if (!baseHasInset && !closedByVariant && !toks.some((t) => RING_INSET.test(t) || RING_ZERO.test(t))) {
                for (const item of items) {
                  const hit = item.text.split(/\s+/).find((t) => RING_TRIGGER.test(t));
                  if (hit) violations.push({ line: item.line, reason: "focus-visible:ring without ring-inset", token: hit });
                }
              }
            }
          }
        }
      }
    }
    if (baseArg && baseHasRing && !baseHasInset && !closedByVariant) {
      for (const item of collectClassStrings(baseArg, ast)) {
        const hit = item.text.split(/\s+/).find((t) => RING_TRIGGER.test(t));
        if (hit) violations.push({ line: item.line, reason: "focus-visible:ring without ring-inset", token: hit });
      }
    }
  }

  function visit(node: ts.Node) {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
      if (node.expression.text === "cva") {
        checkCva(node);
        return;
      }
      if (node.expression.text === "cn") {
        checkOutwardOffsets(node);
        const topHasInset = node.arguments.flatMap(unconditionalTokens).some((t) => RING_INSET.test(t));
        for (const arg of node.arguments) checkCnArg(arg, topHasInset);
        return;
      }
    }
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const parent = node.parent;
      if (!ts.isLiteralTypeNode(parent) && !ts.isTypeNode(parent) && !ts.isImportDeclaration(parent) && !ts.isExportDeclaration(parent) && !(ts.isPropertyAssignment(parent) && parent.name === node)) {
        const tokens = node.text.split(/\s+/).filter(Boolean);
        const line = ast.getLineAndCharacterOfPosition(node.getStart(ast)).line + 1;
        for (const token of tokens) {
          if (OUTWARD_OUTLINE_OFFSET.test(token)) {
            violations.push({ line, reason: "positive focus-visible:outline-offset", token });
          }
        }
        const ringHit = tokens.find((t) => RING_TRIGGER.test(t));
        if (ringHit && !tokens.some((t) => RING_INSET.test(t) || RING_ZERO.test(t))) {
          violations.push({ line, reason: "focus-visible:ring without ring-inset", token: ringHit });
        }
      }
      return;
    }
    if (ts.isTemplateExpression(node)) {
      const items = collectClassStrings(node, ast);
      const tokens = items.flatMap((s) => s.text.split(/\s+/).filter(Boolean));
      for (const item of items) {
        for (const token of item.text.split(/\s+/).filter(Boolean)) {
          if (OUTWARD_OUTLINE_OFFSET.test(token)) {
            violations.push({ line: item.line, reason: "positive focus-visible:outline-offset", token });
          }
        }
      }
      const ringHit = tokens.find((t) => RING_TRIGGER.test(t));
      if (ringHit && !tokens.some((t) => RING_INSET.test(t) || RING_ZERO.test(t))) {
        const line = items[0]?.line ?? ast.getLineAndCharacterOfPosition(node.getStart(ast)).line + 1;
        violations.push({ line, reason: "focus-visible:ring without ring-inset", token: ringHit });
      }
      return;
    }
    ts.forEachChild(node, visit);
  }

  visit(ast);
  return violations;
}

const PHYSICAL_DIRECTION_TOKEN = /^(?:[\w-[\]]+:)*-?(?:ml|mr|pl|pr|left|right)-[\w[\]().-]+$|^(?:[\w-[\]]+:)*(?:border-l|border-r|rounded-l|rounded-r)(?:$|-[\w[\]().-]+)$|^(?:[\w-[\]]+:)*(?:text-left|text-right)$/;

/**
 * AST check for physical directional Tailwind classes in component TSX.
 * Ignores comments, type literals, import/export paths, object property names,
 * and JSX `style` attributes so JS geometry (`rect.left`) and CSS gradients
 * (`linear-gradient(to right, ...)`) are never misclassified as utility classes.
 */
function inspectPhysicalDirections(source: string, filename = "fixture.tsx"): string[] {
  const ast = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const hits = new Set<string>();
  const visit = (node: ts.Node) => {
    if (ts.isJsxAttribute(node) && node.name.getText(ast) === "style") return;
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) return;
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const parent = node.parent;
      if (!ts.isLiteralTypeNode(parent) && !ts.isTypeNode(parent) && !(ts.isPropertyAssignment(parent) && parent.name === node)) {
        for (const token of node.text.split(/\s+/).filter(Boolean)) {
          if (PHYSICAL_DIRECTION_TOKEN.test(token)) hits.add(token);
        }
      }
      return;
    }
    if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      for (const token of node.text.split(/\s+/).filter(Boolean)) {
        if (PHYSICAL_DIRECTION_TOKEN.test(token)) hits.add(token);
      }
      return;
    }
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(ast, visit);
  return [...hits];
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

  test("NG9: focus rings stay inset and never expand outward via positive outline-offset", () => {
    /*
     * 物理例外登记（同步记录于 STANDARDS.md §5）：
     * - color-picker.tsx：色板抓手覆盖任意色面，无法保证内侧反色对比，必须使用外侧 outline-offset。
     * - resizable.tsx：1px 分隔条无向内收拢的几何空间，焦点环须居中/外扩表达。
     */
    const physicalExceptions = new Set(["color-picker.tsx", "resizable.tsx"]);
    const offenders: string[] = [];
    for (const file of files) {
      if (physicalExceptions.has(file)) continue;
      for (const hit of inspectFocusOutward(read(file), file)) {
        offenders.push(`${file}:${hit.line} (${hit.reason}): ${hit.token}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  test("NG9 focus AST catches outward rings and positive outline-offset without false positives", () => {
    expect(inspectFocusOutward('return <button className="focus-visible:ring-2 focus-visible:ring-ring" />;')).toHaveLength(1);
    expect(inspectFocusOutward('return <button className={cn("outline-none", active && "focus-visible:ring-[length:var(--qy-focus-ring-width)]")} />;')).toHaveLength(1);
    expect(inspectFocusOutward('return <button className="focus-visible:outline-2 focus-visible:outline-offset-2" />;')).toHaveLength(1);
    expect(inspectFocusOutward('return <button className="focus-visible:outline-offset-(--qy-focus-ring-width)" />;')).toHaveLength(1);
    expect(inspectFocusOutward('/* focus-visible:ring-2 focus-visible:outline-offset-2 */ return <button className="focus-visible:ring-inset focus-visible:ring-ring" />;')).toEqual([]);
    expect(inspectFocusOutward('return <button className={cn("focus-visible:ring-inset focus-visible:ring-2", active ? "focus-visible:ring-primary" : "focus-visible:ring-ring")} />;')).toEqual([]);
    expect(inspectFocusOutward('return <button className="focus-visible:outline-offset-0 focus-visible:-outline-offset-1 focus-visible:ring-0" />;')).toEqual([]);
    expect(inspectFocusOutward('const v = cva("focus-visible:ring-2", { variants: { variant: { solid: "focus-visible:ring-inset", bordered: "focus-visible:ring-0" } } });')).toEqual([]);
  });

  test("direction-sensitive layout, spacing, borders, radii, and alignment use logical properties", () => {
    /*
     * 物理方向类（ml-/mr-/pl-/pr-/left-/right-/border-l/border-r/rounded-l/rounded-r/text-left/text-right）
     * 在 RTL 下会错位，须改用逻辑属性（ms-/me-/ps-/pe-/start-/end-/border-s/border-e/rounded-s/rounded-e/text-start/text-end）。
     * 下表仅登记确有物理视口方向任务理由的具体类；同一文件里新增其他物理类仍会被拦截。
     */
    const physicalDirectionExceptions = new Map<string, { allowed: Set<string>; reason: string }>([
      [
        "drawer.tsx",
        {
          allowed: new Set([
            "left-0", "right-0", "left-(--qy-space-2)", "right-(--qy-space-2)",
            "rounded-l-none", "border-l-0", "rounded-r-none", "border-r-0",
          ]),
          reason: 'Drawer swipeDirection="left" | "right" anchors to physical viewport edges and drops the outer radius/border on that physical edge.',
        },
      ],
      [
        "toast.tsx",
        {
          allowed: new Set(["left-(--qy-space-6)", "left-1/2", "right-(--qy-space-6)"]),
          reason: 'Toast position ("top-left", "bottom-right", "*-center") anchors explicitly to physical viewport coordinates.',
        },
      ],
    ]);
    const offenders: string[] = [];
    for (const file of files) {
      const allowed = physicalDirectionExceptions.get(file)?.allowed;
      const hits = inspectPhysicalDirections(read(file), file).filter((token) => !allowed?.has(token));
      if (hits.length) offenders.push(`${file}: ${hits.join(", ")}`);
    }
    expect(offenders).toEqual([]);
  });

  test("physical direction AST catches physical classes without misclassifying JS geometry or comments", () => {
    expect(inspectPhysicalDirections('return <div className="ml-2 mr-4 pl-1 pr-3 left-0 sm:right-2 border-l border-r-2 rounded-l-md rounded-r text-left text-right" />;')).toEqual([
      "ml-2", "mr-4", "pl-1", "pr-3", "left-0", "sm:right-2", "border-l", "border-r-2", "rounded-l-md", "rounded-r", "text-left", "text-right",
    ]);
    expect(inspectPhysicalDirections('/* ml-2 left-0 text-left */ const x = rect.left; const g = "linear-gradient(to right, #fff, #000)"; return <div style={{ left: x }} className="ms-2 pe-3 start-0 border-s rounded-e-md text-start transition-[top,left]" />;')).toEqual([]);
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
     * belongs to a scale. The inherited exception register has been emptied
     * after all components migrated to `--qy-duration-*` tokens; no new raw
     * off-scale durations are allowed.
     */
    const scale = new Set(["75", "100", "150", "200", "300", "500", "700", "1000"]);
    const inherited = new Map<string, Set<string>>();
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

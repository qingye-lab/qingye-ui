import ts from "typescript";

export type ColorViolation = { line: number; value: string; context: "class" | "style" };
export type ColorInspection = { violations: ColorViolation[]; unresolved: string[] };

const palette = /^(?:bg|text|border(?:-[xystblre])?|ring(?:-offset)?|outline|decoration|fill|stroke|from|to|via|accent|caret|divide)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}(?:\/.*)?$/;
const colorUtility = /^(?:bg|text|border(?:-[xystblre])?|ring(?:-offset)?|outline|decoration|fill|stroke|from|to|via|accent|caret|divide|shadow|inset-shadow|drop-shadow)-\[(.*)\](?:\/.*)?$/;
const colorProperty = /^(?:color|background(?:Color)?|border(?:Top|Right|Bottom|Left|Inline|Block)?(?:Color)?|outline(?:Color)?|textDecorationColor|caretColor|accentColor|fill|stroke|boxShadow|textShadow)$/;
const cssColorProperty = /^(?:color|background(?:-color)?|border(?:-(?:top|right|bottom|inline|block))?(?:-color)?|outline(?:-color)?|text-decoration-color|caret-color|accent-color|fill|stroke|box-shadow|text-shadow):/;
const rawColor = /(?<![\w-])#(?:[\da-f]{8}|[\da-f]{6}|[\da-f]{4}|[\da-f]{3})(?![\w-])|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\s*\(/i;

/** Split Tailwind classes/variants without interpreting selector contents as values. */
function splitTopLevel(value: string, separator: (char: string) => boolean): string[] {
  const result: string[] = [];
  let start = 0;
  let brackets = 0;
  let parens = 0;
  let quote = "";
  for (let i = 0; i < value.length; i++) {
    const char = value[i]!;
    if (char === "\\") { i++; continue; }
    if (quote) { if (char === quote) quote = ""; continue; }
    if (char === "'" || char === '"') { quote = char; continue; }
    if (char === "[") brackets++;
    else if (char === "]") brackets--;
    else if (char === "(") parens++;
    else if (char === ")") parens--;
    else if (!brackets && !parens && separator(char)) {
      if (i > start) result.push(value.slice(start, i));
      start = i + 1;
    }
  }
  if (start < value.length) result.push(value.slice(start));
  return result;
}

function containsRawColor(value: string): boolean {
  // URL fragments are references, not paint values. Respect nested parentheses.
  let withoutUrls = "";
  for (let i = 0; i < value.length;) {
    const match = /^url\s*\(/i.exec(value.slice(i));
    if (!match) { withoutUrls += value[i++]; continue; }
    i += match[0].length;
    let depth = 1;
    let quote = "";
    while (i < value.length && depth) {
      const char = value[i++]!;
      if (char === "\\") { i++; continue; }
      if (quote) { if (char === quote) quote = ""; continue; }
      if (char === "'" || char === '"') quote = char;
      else if (char === "(") depth++;
      else if (char === ")") depth--;
    }
  }
  return rawColor.test(withoutUrls);
}

function classViolations(value: string): string[] {
  return splitTopLevel(value, (char) => /\s/.test(char)).filter((token) => {
    const utility = splitTopLevel(token, (char) => char === ":").at(-1)?.replace(/^!|!$/g, "") ?? "";
    if (palette.test(utility)) return true;
    const arbitrary = colorUtility.exec(utility)?.[1];
    if (arbitrary !== undefined) return containsRawColor(arbitrary.replace(/(?<!\\)_/g, " "));
    if (utility.startsWith("[") && utility.endsWith("]")) {
      const declaration = utility.slice(1, -1);
      return cssColorProperty.test(declaration) && containsRawColor(declaration.replace(/(?<!\\)_/g, " "));
    }
    return false;
  });
}

/**
 * Inspect paint values in syntax-owned class/style contexts. This does not
 * execute component code, resolve imports or infer runtime-created classes.
 * Those expressions are retained in `unresolved`, never described as checked.
 */
export function inspectColors(source: string, fileName = "component.tsx"): ColorInspection {
  const file = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const declarations = new Map<ts.Node, Map<string, ts.Expression | null>>();
  const violations: ColorViolation[] = [];
  const unresolved = new Set<string>();
  const seen = new Set<string>();

  function boundNames(name: ts.BindingName): string[] {
    if (ts.isIdentifier(name)) return [name.text];
    return name.elements.flatMap((element) => ts.isBindingElement(element) ? boundNames(element.name) : []);
  }

  function index(node: ts.Node) {
    if (ts.isVariableDeclaration(node) || ts.isParameter(node)) {
      let scope: ts.Node = node.parent;
      if (ts.isVariableDeclaration(node)) while (!ts.isBlock(scope) && !ts.isSourceFile(scope)) scope = scope.parent;
      const bindings = declarations.get(scope) ?? new Map<string, ts.Expression | null>();
      for (const name of boundNames(node.name)) {
        // Destructuring and parameters shadow outer constants, but their runtime
        // values cannot be inferred by this deliberately bounded checker.
        bindings.set(name, ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) ? node.initializer ?? null : null);
      }
      declarations.set(scope, bindings);
    }
    ts.forEachChild(node, index);
  }
  index(file);

  function binding(node: ts.Identifier): ts.Expression | undefined {
    for (let scope: ts.Node | undefined = node.parent; scope; scope = scope.parent) {
      const bindings = declarations.get(scope);
      if (bindings?.has(node.text)) return bindings.get(node.text) ?? undefined;
    }
    return undefined;
  }

  function strings(node: ts.Expression, stack = new Set<string>()): string[] {
    if (ts.isStringLiteralLike(node)) return [node.text];
    if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isNonNullExpression(node)) return strings(node.expression, stack);
    if (ts.isIdentifier(node)) {
      const initializer = binding(node);
      if (initializer && !stack.has(node.text)) return strings(initializer, new Set([...stack, node.text]));
    } else if (ts.isConditionalExpression(node)) {
      return [...strings(node.whenTrue, stack), ...strings(node.whenFalse, stack)];
    } else if (ts.isBinaryExpression(node)) {
      if (node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) return strings(node.right, stack);
      if ([ts.SyntaxKind.BarBarToken, ts.SyntaxKind.QuestionQuestionToken].includes(node.operatorToken.kind)) return [...strings(node.left, stack), ...strings(node.right, stack)];
      if (node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
        const left = strings(node.left, stack);
        const right = strings(node.right, stack);
        return left.flatMap((a) => right.map((b) => a + b));
      }
    } else if (ts.isTemplateExpression(node)) {
      let values = [node.head.text];
      for (const span of node.templateSpans) {
        const inserts = strings(span.expression, stack);
        if (!inserts.length) {
          // A sentinel prevents falsely joining values across unknown runtime data.
          values = values.map((value) => value + " __dynamic__ " + span.literal.text);
        } else values = values.flatMap((value) => inserts.map((insert) => value + insert + span.literal.text));
      }
      return values;
    } else if (ts.isArrayLiteralExpression(node)) {
      return node.elements.flatMap((element) => ts.isSpreadElement(element) ? strings(element.expression, stack) : strings(element, stack));
    } else if (ts.isObjectLiteralExpression(node)) {
      // clsx/cn object keys are class lists; values are enablement conditions.
      return node.properties.flatMap((property) => {
        if (!ts.isPropertyAssignment(property)) return [];
        if (ts.isComputedPropertyName(property.name)) return strings(property.name.expression, stack);
        return [ts.isStringLiteral(property.name) ? property.name.text : property.name.getText(file)];
      });
    } else if (ts.isCallExpression(node)) {
      const name = node.expression.getText(file);
      if (name === "cn" || name === "clsx") return node.arguments.flatMap((argument) => strings(argument, stack));
      if (name === "cva") {
        const base = node.arguments[0];
        const config = node.arguments[1];
        const values = base ? strings(base, stack) : [];
        if (config && ts.isObjectLiteralExpression(config)) {
          for (const property of config.properties) {
            if (!ts.isPropertyAssignment(property)) continue;
            const key = property.name.getText(file).replace(/^['"]|['"]$/g, "");
            if (key === "variants" && ts.isObjectLiteralExpression(property.initializer)) {
              for (const axis of property.initializer.properties) {
                if (!ts.isPropertyAssignment(axis) || !ts.isObjectLiteralExpression(axis.initializer)) continue;
                for (const variant of axis.initializer.properties) {
                  if (ts.isPropertyAssignment(variant)) values.push(...strings(variant.initializer, stack));
                }
              }
            }
            if (key === "compoundVariants" && ts.isArrayLiteralExpression(property.initializer)) {
              for (const entry of property.initializer.elements) {
                if (!ts.isObjectLiteralExpression(entry)) continue;
                for (const item of entry.properties) {
                  if (ts.isPropertyAssignment(item) && /^(class|className)$/.test(item.name.getText(file))) values.push(...strings(item.initializer, stack));
                }
              }
            }
          }
        }
        return values;
      }
    }
    if (node.kind !== ts.SyntaxKind.FalseKeyword && node.kind !== ts.SyntaxKind.TrueKeyword && node.kind !== ts.SyntaxKind.NullKeyword && !ts.isNumericLiteral(node)) unresolved.add(node.getText(file));
    return [];
  }

  function record(node: ts.Node, value: string, context: "class" | "style") {
    const line = file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
    const key = `${line}:${context}:${value}`;
    if (!seen.has(key)) { violations.push({ line, value, context }); seen.add(key); }
  }
  function inspectClass(node: ts.Expression) {
    for (const value of strings(node)) for (const hit of classViolations(value)) record(node, hit, "class");
  }
  function inspectStyle(node: ts.Expression, stack = new Set<string>()) {
    if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) { inspectStyle(node.expression, stack); return; }
    if (ts.isIdentifier(node) && binding(node) && !stack.has(node.text)) { inspectStyle(binding(node)!, new Set([...stack, node.text])); return; }
    if (ts.isConditionalExpression(node)) { inspectStyle(node.whenTrue, stack); inspectStyle(node.whenFalse, stack); return; }
    if (!ts.isObjectLiteralExpression(node)) { unresolved.add(node.getText(file)); return; }
    for (const property of node.properties) {
      if (ts.isSpreadAssignment(property)) { inspectStyle(property.expression, stack); continue; }
      if (!ts.isPropertyAssignment(property)) continue;
      const name = property.name.getText(file).replace(/^['"]|['"]$/g, "");
      if (colorProperty.test(name)) for (const value of strings(property.initializer)) if (containsRawColor(value)) record(property, value, "style");
    }
  }
  function walk(node: ts.Node) {
    if (ts.isJsxAttribute(node) && node.initializer) {
      if (node.name.getText(file) === "className") {
        if (ts.isStringLiteral(node.initializer)) inspectClass(node.initializer);
        else if (ts.isJsxExpression(node.initializer) && node.initializer.expression) inspectClass(node.initializer.expression);
      }
      if (node.name.getText(file) === "style" && ts.isJsxExpression(node.initializer) && node.initializer.expression) inspectStyle(node.initializer.expression);
    }
    if (ts.isPropertyAssignment(node)) {
      const name = node.name.getText(file).replace(/^['"]|['"]$/g, "");
      if (name === "className") inspectClass(node.initializer);
      if (name === "style") inspectStyle(node.initializer);
    }
    // Shared variants need checking even when consumed outside their defining file.
    if (ts.isCallExpression(node) && /^(cn|clsx|cva)$/.test(node.expression.getText(file))) inspectClass(node);
    ts.forEachChild(node, walk);
  }
  walk(file);
  return { violations, unresolved: [...unresolved] };
}

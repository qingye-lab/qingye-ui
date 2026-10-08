import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

// This checks authored JSX, not rendered DOM or code examples stored in strings.
// Native layout, links and semantics remain available; shared controls use the library.
const controls = new Map([
  ["button", "Button"], ["input", "Input / Checkbox / Switch"],
  ["select", "NativeSelect / Select"], ["textarea", "Textarea"],
  ["option", "native option inside NativeSelect"], ["optgroup", "native optgroup inside NativeSelect"],
  ["label", "Label / FieldLabel"], ["progress", "Progress"], ["meter", "Meter"],
  ["details", "Collapsible"], ["summary", "CollapsibleTrigger"], ["dialog", "Dialog"],
]);
const isLibrary = (module) => module === "@qingye_lab/ui" || module.startsWith("@qingye_lab/ui/");
const openingOf = (node) => ts.isJsxElement(node) ? node.openingElement : ts.isJsxSelfClosingElement(node) ? node : undefined;
const hasAttribute = (node, name) => node.attributes.properties.some((attribute) => ts.isJsxAttribute(attribute) && attribute.name.getText() === name);

function renderOwner(node) {
  let root = ts.isJsxOpeningElement(node) ? node.parent : node;
  while (root.parent) {
    const parent = root.parent;
    if (ts.isParenthesizedExpression(parent) || ts.isAsExpression(parent)) root = parent;
    else if (ts.isConditionalExpression(parent) && (parent.whenTrue === root || parent.whenFalse === root)) root = parent;
    else if (ts.isArrowFunction(parent) && parent.body === root) root = parent;
    else if (ts.isReturnStatement(parent) && parent.expression === root && ts.isBlock(parent.parent) && (ts.isArrowFunction(parent.parent.parent) || ts.isFunctionExpression(parent.parent.parent))) root = parent.parent.parent;
    else if (ts.isJsxExpression(parent) && parent.expression === root && ts.isJsxAttribute(parent.parent) && parent.parent.name.getText() === "render") return parent.parent.parent.parent;
    else return undefined;
  }
}

export function inspectLibraryControls(source, file = "source.tsx") {
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const libraryNames = new Set();
  const libraryNamespaces = new Set();
  const buttonNames = new Set();
  const nativeSelectNames = new Set(); const proseNames = new Set();
  const routeLinks = new Set();
  for (const node of ast.statements) {
    if (!ts.isImportDeclaration(node) || !ts.isStringLiteral(node.moduleSpecifier) || node.importClause?.isTypeOnly) continue;
    const module = node.moduleSpecifier.text;
    const bindings = node.importClause?.namedBindings;
    if (!bindings) continue;
    if (isLibrary(module) && ts.isNamespaceImport(bindings)) libraryNamespaces.add(bindings.name.text);
    if (!ts.isNamedImports(bindings)) continue;
    for (const binding of bindings.elements) {
      if (binding.isTypeOnly) continue;
      const exported = (binding.propertyName ?? binding.name).text;
      if (isLibrary(module)) {
        libraryNames.add(binding.name.text);
        if (exported === "Button") buttonNames.add(binding.name.text);
        if (exported === "NativeSelect") nativeSelectNames.add(binding.name.text);
        if (exported === "Prose") proseNames.add(binding.name.text);
      }
      if ((module === "react-router-dom" || module === "react-router") && exported === "Link") routeLinks.add(binding.name.text);
    }
  }
  const isLibraryTag = (name) => libraryNames.has(name) || libraryNamespaces.has(name.split(".")[0]);
  const isNativeSelect = name => nativeSelectNames.has(name) || (libraryNamespaces.has(name.split(".")[0]) && name.split(".").slice(1).join(".") === "NativeSelect");
  // 长文里的任务勾选框与折叠块是 Markdown 渲染出的内容，不是网站另造的控件：只在 Prose 之内、只这几种标签（input、details 与其 summary）豁免。
  function inProse(node) {
    for (let parent = node.parent; parent; parent = parent.parent) if (ts.isJsxElement(parent) && proseNames.has(parent.openingElement.tagName.getText(ast))) return true;
    return false;
  }
  function inNativeSelect(node) {
    for (let parent = node.parent; parent; parent = parent.parent) {
      if (!ts.isJsxElement(parent)) continue;
      const tag = parent.openingElement.tagName.getText(ast);
      if (isNativeSelect(tag)) return true;
      if (tag === "select") {
        const owner = renderOwner(parent.openingElement);
        return Boolean(owner && isNativeSelect(owner.tagName.getText(ast)));
      }
    }
    return false;
  }
  const violations = ast.parseDiagnostics.map((diagnostic) => ({ file, line: ast.getLineAndCharacterOfPosition(diagnostic.start ?? 0).line + 1, message: ts.flattenDiagnosticMessageText(diagnostic.messageText, " ") }));
  let renderPrimitives = 0;
  function visit(node) {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName.getText(ast);
      const replacement = controls.get(tag);
      if (replacement && !((tag === "option" || tag === "optgroup") && inNativeSelect(node)) && !((tag === "input" || tag === "details" || tag === "summary") && inProse(node))) {
        const owner = renderOwner(node);
        if (owner && isLibraryTag(owner.tagName.getText(ast))) renderPrimitives += 1;
        else violations.push({ file, line: ast.getLineAndCharacterOfPosition(node.getStart(ast)).line + 1, message: `Use ${replacement} for <${tag}>; native controls are allowed only as a library render root.` });
      }
      if (buttonNames.has(tag)) {
        const render = node.attributes.properties.find((attribute) => ts.isJsxAttribute(attribute) && attribute.name.getText(ast) === "render");
        const element = render?.initializer && ts.isJsxExpression(render.initializer) && render.initializer.expression ? openingOf(render.initializer.expression) : undefined;
        if (element) {
          const renderedTag = element.tagName.getText(ast);
          if ((renderedTag === "a" && hasAttribute(element, "href")) || (routeLinks.has(renderedTag) && hasAttribute(element, "to"))) violations.push({ file, line: ast.getLineAndCharacterOfPosition(node.getStart(ast)).line + 1, message: "Navigation keeps its link role: use a / Link with buttonVariants instead of Button render." });
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  return { violations, renderPrimitives };
}

export function inspectDocsControls(root = resolve(dirname(fileURLToPath(import.meta.url)), "../src")) {
  const files = [];
  function walk(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (entry.name.endsWith(".tsx")) files.push(path);
    }
  }
  walk(root);
  const results = files.sort().map((path) => inspectLibraryControls(readFileSync(path, "utf8"), relative(root, path)));
  return { files: files.length, violations: results.flatMap((result) => result.violations), renderPrimitives: results.reduce((sum, result) => sum + result.renderPrimitives, 0) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const result = inspectDocsControls();
  for (const violation of result.violations) console.error(`${violation.file}:${violation.line} ${violation.message}`);
  console.log(`${result.violations.length ? "FAIL" : "PASS"}: ${result.files} docs TSX files; ${result.renderPrimitives} library render primitives; ${result.violations.length} control violations.`);
  if (result.violations.length) process.exitCode = 1;
}

// Generate package facts and public resources from source and documentation.
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync, unlinkSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import { generateResourceFixtures } from "../../../apps/docs/scripts/generate-fixtures.mjs";
import { renderPatternGuidance } from "./pattern-guidance.mjs";
import { embeddedTranslation, standaloneTranslation, projectImplementationLinks, projectPackagePhilosophy } from "./resource-translations.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const repo = resolve(root, "../..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const docs = join(repo, "apps/docs");
const content = join(docs, "src/content");
const names = readdirSync(join(root, "src/components")).filter((file) => /\.tsx?$/.test(file)).map((file) => file.replace(/\.tsx?$/, "")).sort();
const read = (path) => readFileSync(path, "utf8");
const hash = (text) => createHash("sha256").update(text).digest("hex");
const write = (path, text) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, text); };
const json = (path, value) => write(path, `${JSON.stringify(value, null, 2)}\n`);
const publicPath = (path) => path.replaceAll("\\", "/");
const designGuide = read(join(repo, "design.md"));
const guideTranslation = embeddedTranslation(designGuide, "design.md");
const designGuideEn = guideTranslation.english;
const adoptionStart = "<!-- qingye:project-adoption:start -->";
const adoptionEnd = "<!-- qingye:project-adoption:end -->";
const adoptionFrom = designGuide.indexOf(adoptionStart);
const adoptionTo = designGuide.indexOf(adoptionEnd);
if (adoptionFrom < 0 || adoptionTo <= adoptionFrom || designGuide.indexOf(adoptionStart, adoptionFrom + adoptionStart.length) >= 0 || designGuide.indexOf(adoptionEnd, adoptionTo + adoptionEnd.length) >= 0) {
  throw new Error("design.md must contain exactly one complete Qingye project-adoption block");
}
const projectAdoption = designGuide.slice(adoptionFrom + adoptionStart.length, adoptionTo).trim();
const adoptionStartEn = "<!-- qingye:project-adoption:en:start -->";
const adoptionEndEn = "<!-- qingye:project-adoption:en:end -->";
function sectionBetween(source, start, end, label) {
  const from = source.indexOf(start);
  const to = source.indexOf(end, from + start.length);
  if (from < 0 || to <= from || source.indexOf(start, from + start.length) >= 0) throw new Error(`Missing or repeated ${label}`);
  return source.slice(from + start.length, to).trim();
}
const projectAdoptionEn = sectionBetween(designGuideEn, adoptionStartEn, adoptionEndEn, "English project adoption");

// The style contract is the 设计契约 section of the same guide, given to an AI
// without the surrounding argument. Extracted rather than restated so the two
// cannot disagree: editing design.md changes both the published guide and the
// file an implementing agent reads.
const contractStart = designGuide.indexOf("## 设计契约");
const contractEnd = designGuide.indexOf("\n## ", contractStart + 1);
if (contractStart < 0 || contractEnd <= contractStart) {
  throw new Error("design.md must contain a 设计契约 section followed by another section");
}
const designContract = designGuide.slice(contractStart, contractEnd).trim();
const deliveryStart = designGuide.indexOf("## 人和 AI 的交付检查");
const deliveryEnd = designGuide.indexOf(adoptionStart, deliveryStart);
if (deliveryStart < 0 || deliveryEnd <= deliveryStart) throw new Error("design.md must contain the delivery checks before project adoption");
const deliveryChecks = designGuide.slice(deliveryStart, deliveryEnd).trim();
const standards = read(join(repo, "STANDARDS.md"));
const standardsTranslation = embeddedTranslation(standards, "STANDARDS.md");
const philosophy = read(join(docs, "src/public-content/philosophy.md"));
const philosophyEnSource = read(join(docs, "src/public-content/philosophy.en.md"));
const philosophyEn = standaloneTranslation(philosophy, philosophyEnSource, "philosophy.md");
const packagedPhilosophy = projectPackagePhilosophy(philosophy);
const packagedPhilosophyEn = projectPackagePhilosophy(philosophyEn, "en");
// The public guide owns design rules; STANDARDS owns implementation details.
// Resolve their cross-references inside the existing AI delivery file.
const implementationStandards = projectImplementationLinks(standardsTranslation.canonical)
  .replace(/^# 组件规范\n\n/, "").replace(/^## /gm, "### ");

// The skill carries the same ban list, extracted rather than retyped: a
// hand-written English summary drifts from the Chinese table it summarises.
const banTable = designContract.split("### 禁止")[1]?.split("\n###")[0] ?? "";
const banSummary = [...banTable.matchAll(/^\|\s*(NG\d)\s*\|\s*([^|]+?)\s*\|/gm)]
  .map((match) => `${match[1]}. ${match[2]}`)
  .join("\n");
if (!banSummary) throw new Error("design.md 设计契约 must list bans as NG1..NGn rows");
const designContractEn = sectionBetween(designGuideEn, "## Design contract\n", "\n## Assigning changes", "English design contract");
const deliveryChecksEn = sectionBetween(designGuideEn, "## Delivery checks for people and AI\n", adoptionStartEn, "English delivery checks");
const banTableEn = designContractEn.split("### Bans")[1]?.split("\n###")[0] ?? "";
const banSummaryEn = [...banTableEn.matchAll(/^\|\s*(NG\d)\s*\|\s*([^|]+?)\s*\|/gm)].map(match => `${match[1]}. ${match[2]}`).join("\n");
if (!banSummaryEn) throw new Error("English design contract must retain the NG ban rows.");
const implementationStandardsEn = projectImplementationLinks(standardsTranslation.english, "en")
  .replace(/^# Component Standards\n\n/, "").replace(/^## /gm, "### ");
// Pattern 层由多个原语组合而成；其原语尚未重写时整层在仓库外归档
// （见 docs/decisions/2026-10-03-archive-pending-rewrite.md）。缺席时不生成夹具。
const patternMetadata = join(docs, "src/patterns/metadata.ts");
const hasPatterns = existsSync(patternMetadata);
if (hasPatterns) generateResourceFixtures();
const dataCache = new Map();
function loadData(path) {
  if (dataCache.has(path)) return dataCache.get(path);
  const { outputText } = ts.transpileModule(read(path), { fileName: path, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
  const context = { exports: {}, require(specifier) {
    const target = specifier.startsWith(".") && localPath(path, specifier);
    if (!target) throw new Error(`Data module ${path} has an unsupported import: ${specifier}`);
    return loadData(target);
  } };
  dataCache.set(path, context.exports);
  try {
    runInNewContext(outputText, context, { filename: path, timeout: 1000 });
  } catch (error) {
    dataCache.delete(path);
    throw error;
  }
  return context.exports;
}
const { designFor } = loadData(join(docs, "src/lib/design-guidance.ts"));
const { localizedMeta } = loadData(join(docs, "src/lib/localized-meta.ts"));
const { patterns } = hasPatterns ? loadData(patternMetadata) : { patterns: [] };
const astCache = new Map();
function sourceFile(path) {
  if (!astCache.has(path)) astCache.set(path, ts.createSourceFile(path, read(path), ts.ScriptTarget.Latest, true, path.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS));
  return astCache.get(path);
}
const exported = (node) => node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);
function localPath(from, specifier) {
  const base = resolve(dirname(from), specifier);
  return [`${base}.tsx`, `${base}.ts`, join(base, "index.ts")].find((path) => existsSync(path));
}
function exportsOf(path, ancestors = new Set()) {
  if (ancestors.has(path)) return [];
  const seen = new Set([...ancestors, path]);
  const ast = sourceFile(path);
  const owner = path.includes("/src/components/") ? path.split("/").pop().replace(/\.tsx?$/, "") : null;
  const declarations = new Map();
  for (const node of ast.statements) {
    if ((ts.isFunctionDeclaration(node) || ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isModuleDeclaration(node)) && node.name) declarations.set(node.name.text, node);
    if (ts.isVariableStatement(node)) for (const item of node.declarationList.declarations) if (ts.isIdentifier(item.name)) declarations.set(item.name.text, item);
  }
  function fact(name, node, aliasOf) {
    let kind = "reexport", propsType, signature;
    if (node) {
      kind = ts.isFunctionDeclaration(node) ? "function" : ts.isTypeAliasDeclaration(node) ? "type" : ts.isInterfaceDeclaration(node) ? "interface" : ts.isModuleDeclaration(node) ? "namespace" : "const";
      if (ts.isFunctionDeclaration(node)) {
        propsType = node.parameters[0]?.type?.getText(ast);
        signature = `${name}(${node.parameters.map((parameter) => parameter.getText(ast)).join(", ")})${node.type ? `: ${node.type.getText(ast)}` : ""}`;
      } else if (node.type) signature = node.type.getText(ast);
    }
    return { name, kind, owner, module: owner ? `${pkg.name}/components/${owner}` : pkg.name, ...(aliasOf && aliasOf !== name ? { aliasOf } : {}), ...(propsType ? { propsType } : {}), ...(signature ? { signature } : {}), status: node && (signature || kind === "type" || kind === "interface" || kind === "namespace") ? "PASS" : "UNVERIFIED", declarationStatus: node ? "PASS" : "UNVERIFIED", typeResolution: "UNVERIFIED" };
  }
  const result = [];
  for (const node of ast.statements) {
    if (exported(node) && node.name && ts.isIdentifier(node.name)) result.push(fact(node.name.text, node));
    if (exported(node) && ts.isVariableStatement(node)) for (const item of node.declarationList.declarations) if (ts.isIdentifier(item.name)) result.push(fact(item.name.text, item));
    if (ts.isExportDeclaration(node)) {
      const specifier = node.moduleSpecifier?.text;
      const target = specifier?.startsWith(".") ? localPath(path, specifier) : null;
      const imported = target ? exportsOf(target, seen) : [];
      if (!node.exportClause) result.push(...imported);
      else if (ts.isNamedExports(node.exportClause)) for (const item of node.exportClause.elements) {
        const original = item.propertyName?.text ?? item.name.text;
        const found = imported.find((candidate) => candidate.name === original);
        result.push(found ? { ...found, name: item.name.text, ...(original !== item.name.text ? { aliasOf: original } : {}) } : fact(item.name.text, declarations.get(original), original));
      }
    }
  }
  return [...new Map(result.map((item) => [item.name, item])).values()].sort((a, b) => a.name.localeCompare(b.name));
}
function importsOf(path, recursive = false, seen = new Set()) {
  if (seen.has(path)) return [];
  seen.add(path);
  const imports = [];
  for (const node of sourceFile(path).statements) {
    if (!ts.isImportDeclaration(node) && !ts.isExportDeclaration(node)) continue;
    const value = node.moduleSpecifier?.text;
    if (!value) continue;
    if (value.startsWith(".")) { if (recursive) { const target = localPath(path, value); if (target) imports.push(...importsOf(target, true, seen)); } }
    else imports.push(value);
  }
  return [...new Set(imports)].sort();
}
function providersIn(path) {
  const providers = new Set();
  function visit(node) {
    if ((ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) && /Provider$/.test(node.tagName.getText())) providers.add(node.tagName.getText());
    ts.forEachChild(node, visit);
  }
  visit(sourceFile(path));
  return [...providers].sort();
}
function demoTitle(path) {
  const ast = sourceFile(path);
  for (const node of ast.statements) if (ts.isVariableStatement(node)) for (const declaration of node.declarationList.declarations) {
    if (declaration.name.getText(ast) !== "meta") continue;
    let value = declaration.initializer;
    while (value && (ts.isSatisfiesExpression(value) || ts.isAsExpression(value))) value = value.expression;
    if (!value || !ts.isObjectLiteralExpression(value)) continue;
    const title = value.properties.find((property) => ts.isPropertyAssignment(property) && property.name.getText(ast) === "title");
    if (title && ts.isStringLiteral(title.initializer)) return title.initializer.text;
  }
  return path.split("/").pop().replace(/\.tsx$/, "");
}
const packageOf = (value) => value.startsWith("@") ? value.split("/").slice(0, 2).join("/") : value.split("/")[0];
const categoryLabelsEn = { "通用": "General", "表单": "Forms", "日期与时间": "Date and time", "数据展示": "Data display", "反馈": "Feedback", "浮层": "Overlays", "导航": "Navigation", "布局": "Layout", "排版": "Typography", "工具": "Utilities" };
const publicExports = exportsOf(join(root, "src/index.ts"));
const components = names.map((name) => {
  const metaPath = join(content, name, "meta.ts");
  const meta = loadData(metaPath).default;
  if (!meta?.title || !meta.description || !Array.isArray(meta.exports) || !meta.exports.length) throw new Error(`Missing component metadata: ${name}`);
  if (meta.source !== "local") throw new Error(`Invalid component authorship classification: ${name}`);
  const path = join(root, "src/components", `${name}.tsx`);
  const actualExports = exportsOf(path);
  const usageImports = meta.exports.map((item) => {
    const value = item.replace(/^type\s+/, "");
    const own = actualExports.find((fact) => fact.name === value);
    const fact = own ?? publicExports.find((candidate) => candidate.name === value);
    if (!fact) throw new Error(`Metadata names a missing public export: ${name}.${item}`);
    return { name: item, import: own ? `${pkg.name}/components/${name}` : fact.module, owner: fact.owner, status: fact.status };
  });
  const imports = [...new Set(importsOf(path, true).map(packageOf))];
  const demosPath = join(content, name, "demos");
  const examples = existsSync(demosPath) ? readdirSync(demosPath).filter((file) => file.endsWith(".tsx")).sort().map((file) => {
    const path = join(demosPath, file);
    return { id: file.replace(/\.tsx$/, "").replace(/^\d+-/, ""), title: demoTitle(path), source: publicPath(relative(repo, path)), imports: importsOf(path), providers: providersIn(path), code: read(path), sha256: hash(read(path)) };
  }) : [];
  const types = sourceFile(path).statements.filter((node) => exported(node) && (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node))).map((node) => ({ name: node.name.text, definition: node.getText(sourceFile(path)) }));
  const englishMeta = localizedMeta(meta, "en");
  const providerNoteIndices = (meta.notes ?? []).map((note, index) => /Provider|上下文/.test(note) ? index : -1).filter(index => index >= 0);
  return {
    name, title: meta.title, description: meta.description, category: meta.category, source: meta.source,
    ...(meta.layer ? { layer: meta.layer } : {}),
    import: `${pkg.name}/components/${name}`, exports: meta.exports, docs: `/docs/components/${name}`,
    ...(meta.notes?.length ? { notes: meta.notes } : {}), ...(meta.keywords?.length ? { keywords: meta.keywords } : {}),
    api: meta.api, apiStatus: "curated-not-type-resolved", keyboard: meta.keyboard ?? [], actualExports, types, usageImports,
    dependencies: { runtime: imports.filter((item) => pkg.dependencies?.[item] || (pkg.peerDependencies?.[item] && !pkg.peerDependenciesMeta?.[item]?.optional)), optionalPeers: imports.filter((item) => pkg.peerDependenciesMeta?.[item]?.optional) },
    providers: { exports: actualExports.filter((item) => /Provider$/.test(item.name)).map((item) => item.name), guidance: (meta.notes ?? []).filter((note) => /Provider|上下文/.test(note)).map((text) => ({ text, source: publicPath(relative(repo, metaPath)), certainty: "documented" })), required: [], status: "UNVERIFIED" },
    examples, design: designFor(meta, name), sourceFacts: { file: publicPath(relative(repo, path)), sha256: hash(read(path)), extraction: "TypeScript AST; signatures are source declarations, not a full resolved type graph. Missing signatures remain UNVERIFIED." },
    ...(meta.decisions ? { decisions: meta.decisions } : {}),
    localized: { en: {
      title: englishMeta.title, description: englishMeta.description, category: categoryLabelsEn[meta.category] ?? meta.category,
      ...(englishMeta.decisions ? { decisions: englishMeta.decisions } : {}), notes: englishMeta.notes ?? [], api: englishMeta.api, keyboard: englishMeta.keyboard ?? [], design: designFor(meta, name, "en"),
      providerGuidance: providerNoteIndices.map(index => ({ text: englishMeta.notes[index], source: publicPath(relative(repo, metaPath)), certainty: "documented" })),
    } },
  };
});
const versionPath = `v${pkg.version}`;
const catalog = {
  schemaVersion: 2, name: "Qingye UI", nameZh: "青野 UI", package: pkg.name, version: pkg.version,
  generatedBy: "scripts/gen-catalog.mjs", scope: "Current entry points, source declarations and public guidance; browser and backend behavior are not inferred.",
  components, extras: components.filter((component) => component.source === "local").map((component) => component.name), patterns,
  designGuide: {
    file: "design.md", sha256: hash(designGuide),
    styleContract: { file: "ai/style.md", section: "设计契约", implementation: { source: "STANDARDS.md", sha256: hash(standards), section: "公共组件实现" } },
    philosophy: {
      file: "ai/design-philosophy.md", sha256: hash(packagedPhilosophy),
      source: "apps/docs/src/public-content/philosophy.md", sourceSha256: hash(philosophy),
      projections: { website: { file: "ai/design-philosophy.md", sha256: hash(philosophy) } },
      localized: { en: {
        file: "ai/design-philosophy.en.md", sha256: hash(packagedPhilosophyEn),
        source: "apps/docs/src/public-content/philosophy.en.md", sourceSha256: hash(philosophyEnSource),
        projections: { website: { file: "ai/design-philosophy.en.md", sha256: hash(philosophyEn) } },
      } },
    },
  },
  ai: { skill: "ai/SKILL.md", index: `ai/${versionPath}/llms.txt`, components: `ai/${versionPath}/components`, ...(patterns.length ? { patterns: `ai/${versionPath}/patterns` } : {}) },
  localized: { en: { designGuide: "design.en.md", styleContract: "ai/style.en.md", philosophy: "ai/design-philosophy.en.md", skill: "ai/SKILL.en.md", index: `ai/${versionPath}/en/llms.txt`, components: `ai/${versionPath}/en/components` } },
  registry: { index: "registry/registry.json", items: "registry/r" },
};
json(join(root, "catalog.json"), catalog);
json(join(docs, "public/catalog.json"), catalog);
write(join(root, "design.md"), designGuide);
write(join(docs, "public/design.md"), designGuide);
write(join(root, "design.en.md"), designGuideEn);
write(join(docs, "public/design.en.md"), designGuideEn);
write(join(docs, "public/design-philosophy.md"), philosophy);
write(join(docs, "public/design-philosophy.en.md"), philosophyEn);
const aiRoot = join(root, "ai");
const siteAi = join(docs, "public/ai");
const bothAi = (path, text) => { write(join(aiRoot, path), text); write(join(siteAi, path), text); };
write(join(aiRoot, "design-philosophy.md"), packagedPhilosophy);
write(join(aiRoot, "design-philosophy.en.md"), packagedPhilosophyEn);
write(join(siteAi, "design-philosophy.md"), philosophy);
write(join(siteAi, "design-philosophy.en.md"), philosophyEn);
const skill = `---
name: qingye-ui
description: Build complete React tasks using the installed Qingye UI version, public methods and verified facts.
---

# Qingye UI

This file accompanies ${pkg.name} ${pkg.version}. Read the installed version first; a website or upstream namesake may describe another API.

${projectAdoption}

## Style contract

Read [style.md](style.md) before implementing UI. It contains the 设计契约 from
../design.md and the component implementation rules from STANDARDS.md.

These are bans, not preferences:

${banSummary}

Also binding: prose length and text size must never change the structure;
density tightens spacing and never shrinks type; sizes come from the named type
steps, never a one-off value.

## Task workflow

1. Read project instructions, the UI entry point, installed package.json, catalog.json and design.md. Check the project's persistent references described above when completing onboarding. Preserve unrelated work.
2. State the object, action, scope, current status and work to retain. Use relevant methods; cultural terms are not HTML roles or API names.
3. Load related resources from ai/v<installed-version>/components${patterns.length ? " and patterns" : ""}. actualExports and local declarations are authority. api is curated guidance. Missing signatures and provider requirements remain UNVERIFIED. Inspect example imports and optionalPeers.
4. Reuse current props and combinations. The library owns shared UI behavior, the project owns recipes/theme, the application owns permissions/drafts/requests/versions, and tooling owns facts/diagnostics. Do not copy foundation controls.
5. Implement normal, waiting, relevant failure/unknown, cancellation and return paths. Timeout does not prove a write failed. Confirm current objects and revisions. Cancellation requested differs from cancellation complete.
6. Run existing checks. Separate source, computed styles, interactions, accessibility and human visual judgment. Report PASS, FAIL, UNVERIFIED, NOT_RUN or justified N/A. Never relax tests or invent success.

Read [design-philosophy.md](design-philosophy.md) for methods and their sources; [the public guide](../design.md) for project adoption; [installation](${versionPath}/installation.md) for styles and dependencies; [the resource index](${versionPath}/llms.txt) for ${patterns.length ? "component and pattern" : "component"} constraints. Examples use synthetic local application state and do not prove backend permissions, persistence, idempotency or cancellation.

Registry templates reference this exact package version. Check configured package access; never silently substitute latest. This skill grants no external-action authority and creates no runtime model service.
`;
bothAi("style.md", [
  "# Qingye UI 风格契约",
  "",
  "本文件由根 `design.md` 的设计契约与交付检查、`STANDARDS.md` 的组件实现规则生成。改规则时修改对应源文件。",
  "",
  `方法来源见[设计理念](design-philosophy.md)；组件使用限制与 API 见[同版本索引](${versionPath}/llms.txt)。项目接入见[公开指南](../design.md)。`,
  "",
  "## 使用方式",
  "",
  "1. 实现前读一遍「禁止」表，记住判据。",
  "2. 完成后逐条自查。**判据是观察，不是感受** —— 每条都给出可在产物上验证的结果。",
  "3. 一条禁令若与项目的已确认取舍冲突，先指出具体差异再决定，不静默覆盖。",
  "4. 交付时用 `PASS` / `FAIL` / `UNVERIFIED` / `NOT_RUN` 报告；未运行不记作通过。",
  "",
  designContract,
  "",
  deliveryChecks,
  "",
  "## 公共组件实现",
  "",
  "下文的基础层与逐值裁决路径是仓库内部取证来源，不随包分发。公开可执行准则见[指南交付检查](../design.md#人和-ai-的交付检查)与[本文件焦点章节](#5-状态与焦点)。当前值与预设分类见下文正文，组件决定与 API 见 [catalog.json](../catalog.json)。",
  "",
  implementationStandards.trim(),
  "",
  "---",
  "",
  "本文件由 `packages/ui/scripts/gen-catalog.mjs` 生成，随包分发；不手工维护。手改会在下次生成时被覆盖。",
  "",
].join("\n"));
bothAi("SKILL.md", skill);
const skillEn = skill.replace(projectAdoption, projectAdoptionEn).replace(banSummary, banSummaryEn)
  .replace("Read [style.md](style.md) before implementing UI. It contains the 设计契约 from\n../design.md and the component implementation rules from STANDARDS.md.", "Read [style.en.md](style.en.md) before implementing UI. It contains the translated design contract from ../design.en.md and implementation rules from STANDARDS.md; Chinese source criteria remain canonical.")
  .replaceAll("[design-philosophy.md](design-philosophy.md)", "[design-philosophy.en.md](design-philosophy.en.md)")
  .replaceAll("[the public guide](../design.md)", "[the public guide](../design.en.md)")
  .replace("installed package.json, catalog.json and design.md", "installed package.json, catalog.json and design.en.md")
  .replace(`ai/v<installed-version>/components${patterns.length ? " and patterns" : ""}`, "ai/v<installed-version>/en/components")
  .replace(`(${versionPath}/llms.txt)`, `(${versionPath}/en/llms.txt)`)
  .replace("Also binding: prose length and text size must never change the structure;\ndensity tightens spacing and never shrinks type; sizes come from the named type\nsteps, never a one-off value.", "Preserve grouping, hierarchy, and action reachability when text grows. Density may tighten relationship spacing without shrinking text or targets. Reuse named control/text profiles; actual data dimensions retain their task-defined values.")
  .replace("Examples use synthetic local application state and do not prove backend permissions, persistence, idempotency or cancellation.", "Examples retain their authored language and local component state; they do not prove backend permissions, persistence, idempotency or cancellation.");
bothAi("SKILL.en.md", skillEn);
bothAi("style.en.md", [
  "# Qingye UI Style Contract", "",
  "Generated from the English source blocks in root design.md and STANDARDS.md. The Chinese criteria remain canonical; source hashes prevent silent translation drift.", "",
  `Read [design philosophy](design-philosophy.en.md) for method sources, [the matching resource index](${versionPath}/en/llms.txt) for component contracts, and [the public guide](../design.en.md) for project adoption.`, "",
  "## Use", "",
  "1. Read the bans before implementing.",
  "2. Check each observable criterion in the actual result.",
  "3. Identify conflicts with confirmed project choices before deciding; do not silently override them.",
  "4. Report PASS, FAIL, UNVERIFIED, or NOT_RUN. Unrun checks are never passes.", "",
  "## Design contract", "", designContractEn, "", "## Delivery checks for people and AI", "", deliveryChecksEn, "",
  "## Public component implementation", "",
  "Foundation and value-adjudication paths below identify repository evidence, which is not distributed in the package. Public criteria are in [Delivery checks](../design.en.md#delivery-checks-for-people-and-ai) and [this file's focus section](#5-states-and-focus). Current values and preset classifications are stated below; component decisions and APIs are in [catalog.json](../catalog.json).", "",
  implementationStandardsEn.trim(), "",
  "Generated by packages/ui/scripts/gen-catalog.mjs. Edit canonical source translation blocks; manual edits to this file are overwritten.", "",
].join("\n"));
// 当前版本的组件与模式资源跟随真实入口删除；其他版本的历史分发资料不在此处清理。
const patternSlugs = patterns.map((pattern) => pattern.slug);
for (const base of [aiRoot, join(docs, "public/ai")]) {
  for (const [kind, kept] of [["components", names], ["patterns", patternSlugs], ["en/components", names]]) {
    const directory = join(base, versionPath, kind);
    if (!existsSync(directory)) continue;
    for (const file of readdirSync(directory)) {
      if (file.endsWith(".md") && !kept.includes(file.slice(0, -3))) unlinkSync(join(directory, file));
    }
  }
}

function resourceIndex(target, locale = "zh") {
  const en = locale === "en";
  const language = en ? ".en" : "";
  const componentDirectory = en ? "en/components" : "components";
  return [`# Qingye UI ${pkg.version}`, "", `> Facts for ${pkg.name}@${pkg.version}. Runtime acceptance is separate.`, "", "## Start", `- [Design guide](${target(`design${language}.md`)})`, `- [Style contract](${target(`ai/style${language}.md`)}): bans, observable criteria and component implementation rules`, `- [Design philosophy](${target(`ai/design-philosophy${language}.md`)}): method sources`, `- [Installation](${target(`ai/${versionPath}/installation.md`)})`, `- [Main skill](${target(`ai/SKILL${language}.md`)})`, "", "## Components", ...components.map(component => {
    const entry = en ? component.localized.en : component;
    return `- [${entry.title}](${target(`ai/${versionPath}/${componentDirectory}/${component.name}.md`)}): ${entry.description}`;
  }), ...(patterns.length && !en ? ["", "## Patterns", ...patterns.map(pattern => `- [${pattern.title}](${target(`ai/${versionPath}/patterns/${pattern.slug}.md`)}): ${pattern.description}`)] : []), ""].join("\n");
}
// Relative links work in an unpacked package and at the versioned website URL.
bothAi(`${versionPath}/llms.txt`, resourceIndex((path) => publicPath(relative(join(aiRoot, versionPath), join(root, path)))));
const index = resourceIndex((path) => `/${path}`);
write(join(docs, "public/llms.txt"), index);
bothAi(`${versionPath}/en/llms.txt`, resourceIndex(path => publicPath(relative(join(aiRoot, versionPath, "en"), join(root, path))), "en"));
write(join(docs, "public/llms.en.txt"), resourceIndex(path => `/${path}`, "en"));
bothAi(`${versionPath}/installation.md`, `# Install ${pkg.name} ${pkg.version}\n\nUse this exact package version when the configured registry supplies it, or the corresponding release tarball. Check the project before installing.\n\nRequired peers: ${Object.entries(pkg.peerDependencies).filter(([name]) => !pkg.peerDependenciesMeta?.[name]?.optional).map(([name, range]) => `${name} ${range}`).join(", ")}.\n\nOptional peers: ${Object.entries(pkg.peerDependencies).filter(([name]) => pkg.peerDependenciesMeta?.[name]?.optional).map(([name, range]) => `${name} ${range}`).join(", ")}; install only for relevant components.\n\nTailwind CSS 4: import @qingye_lab/ui/styles.css after tailwindcss and scan the package source as documented in /docs/installation. Precompiled path: import @qingye_lab/ui/ui.css once. Choose one path.\n\nThemeProvider is document scoped. Brand: html[data-brand]; appearance: .light/.dark by default or explicit data-theme mode; density: data-density. Check provider guidance and current types.\n\nExamples retain state locally. Reload persistence, permissions, backend writes and cancellation are host responsibilities.\n`);
for (const baseComponent of components) for (const locale of ["zh", "en"]) {
  const component = locale === "en" ? { ...baseComponent, ...baseComponent.localized.en, providers: { ...baseComponent.providers, guidance: baseComponent.localized.en.providerGuidance } } : baseComponent;
  const markdown = [`# ${component.title}`, "", `Package: ${pkg.name}@${pkg.version}`, `Import: ${component.import}`, `Source: ${component.sourceFacts.file}`, `Source SHA-256: ${component.sourceFacts.sha256}`, "", component.description, "", ...(component.decisions ? ["## Decision", component.decisions, ""] : []), ...(component.notes?.length ? ["## Notes", ...component.notes.map(note => `- ${note}`), ""] : []), "## Use and ownership", ...component.design.whenToUse.map((item) => `- ${item}`), ...component.design.avoid.map((item) => `- Avoid: ${item}`), ...component.design.stateOwner.library.map((item) => `- Library: ${item}`), ...component.design.stateOwner.application.map((item) => `- Application: ${item}`), "", "## Composition", ...component.design.composition.map((item) => `- ${item}`), "", "## Responsive behavior", ...component.design.responsive.map((item) => `- ${item}`), "", "## Customization", ...component.design.customization.map((item) => `- ${item}`), "", "## Current exports", ...component.actualExports.map((item) => `- ${item.name}: ${item.kind}; owner ${item.owner ?? "external"}${item.aliasOf ? `; alias of ${item.aliasOf}` : ""}; ${item.status}${item.propsType ? `; props: ${item.propsType}` : ""}`), "", "Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.", "", "## Dependencies and providers", `- Runtime: ${component.dependencies.runtime.join(", ") || "none recorded"}`, `- Optional peers: ${component.dependencies.optionalPeers.join(", ") || "none recorded"}`, ...component.providers.guidance.map((item) => `- ${item.text}`), "- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.", "", "## Curated API", ...component.api.flatMap((part) => [`### ${part.name}`, part.description, ...(part.props ?? []).map((prop) => `- ${prop.name}: ${prop.type}${prop.default ? `; default ${prop.default}` : ""}. ${prop.description}`), ""]), "## Keyboard", ...component.keyboard.map((row) => `- ${row.keys}: ${row.description}`), "", "## Source examples", ...component.examples.flatMap((example) => [`### ${example.title}`, `Source: ${example.source}`, "```tsx", example.code.trim(), "```", ""]), ""].join("\n").trimEnd() + "\n";
  bothAi(`${versionPath}/${locale === "en" ? "en/" : ""}components/${component.name}.md`, markdown);
}
for (const pattern of patterns) {
  const files = [pattern.source, ...(pattern.slug === "read" ? ["apps/docs/src/patterns/metadata.ts"] : []), "apps/docs/src/patterns/shared.tsx", "apps/docs/src/patterns/state.ts", "apps/docs/src/patterns/patterns.css", "apps/docs/src/patterns/authorized-resources.json"].filter((path) => existsSync(join(repo, path)));
  bothAi(`${versionPath}/patterns/${pattern.slug}.md`, [`# ${pattern.title}`, "", `Package: ${pkg.name}@${pkg.version}`, pattern.description, "", `Components: ${pattern.components.join(", ")}`, `Methods: ${pattern.methods.join(", ")}`, `States: ${pattern.states.join(", ")}`, "", "Synthetic local application fixture. The application owns objects, drafts, selection, versions and outcomes. This does not verify backend protocols.", "", ...renderPatternGuidance(pattern), ...files.flatMap((path) => [`## ${path}`, "```" + (path.endsWith(".css") ? "css" : "tsx"), read(join(repo, path)).trim(), "```", ""]), ""].join("\n"));
}
const provider = `import type { ReactNode } from "react";\nimport { ThemeProvider } from "@qingye_lab/ui/components/theme-provider";\nimport { UILocaleProvider } from "@qingye_lab/ui/locale";\n\n/** Include one documented CSS path in the app entry. */\nexport function QingyeProvider({ children }: { children: ReactNode }) {\n  return <ThemeProvider><UILocaleProvider>{children}</UILocaleProvider></ThemeProvider>;\n}\n`;
const theme = `/* Project-owned theme. Shared foundation components stay in @qingye_lab/ui. */\nhtml[data-brand="project"] {\n  /* Override paired roles after checking foreground/background contrast. */\n}\n/* Appearance uses ThemeProvider; density uses data-density. */\n`;
const editor = `import { Button } from "@qingye_lab/ui/components/button";\nimport { Field, FieldLabel, FieldError } from "@qingye_lab/ui/components/field";\nimport { Input } from "@qingye_lab/ui/components/input";\n\n/** Project composition. The application owns the draft and save result. */\nexport function ResourceEditor({ title, onTitleChange, onSave, saving = false, error }: { title: string; onTitleChange: (value: string) => void; onSave: () => void; saving?: boolean; error?: string }) {\n  return <form onSubmit={(event) => { event.preventDefault(); onSave(); }}><Field><FieldLabel>Resource name</FieldLabel><Input value={title} onValueChange={onTitleChange} aria-invalid={Boolean(error)} />{error && <FieldError>{error}</FieldError>}</Field><Button type="submit" loading={saving}>Save draft</Button></form>;\n}\n`;
const registryItems = [
  { name: "qingye-provider", type: "registry:block", title: "Qingye shared package entry", description: `Project provider template referencing ${pkg.name}@${pkg.version}; choose a CSS path separately.`, files: [{ path: "registry/qingye-provider.tsx", type: "registry:component", target: "components/qingye-provider.tsx", content: provider }] },
  { name: "qingye-editor", type: "registry:block", title: "Qingye project editor", description: `Project-owned composition sourced from ${pkg.name}@${pkg.version}; draft and save callbacks belong to the application.`, files: [{ path: "registry/resource-editor.tsx", type: "registry:component", target: "components/resource-editor.tsx", content: editor }] },
  { name: "qingye-theme", type: "registry:theme", title: "Qingye project theme", description: "Project-owned theme entry; appearance and density remain independent.", files: [{ path: "registry/qingye.theme.css", type: "registry:file", target: "styles/qingye.theme.css", content: theme }] },
].map((item) => ({ $schema: "https://ui.shadcn.com/schema/registry-item.json", ...item, dependencies: [`${pkg.name}@${pkg.version}`] }));
for (const item of registryItems) { json(join(root, "registry/r", `${item.name}.json`), item); json(join(docs, "public/r", `${item.name}.json`), item); }
const registryIndex = { $schema: "https://ui.shadcn.com/schema/registry.json", name: "qingye-ui", homepage: "https://github.com/qingye-lab/qingye-ui", items: registryItems };
json(join(root, "registry/registry.json"), registryIndex);
json(join(docs, "public/registry.json"), registryIndex);
console.log(`catalog.json: ${components.length} components; ${patterns.length} patterns; AI and Registry generated`);

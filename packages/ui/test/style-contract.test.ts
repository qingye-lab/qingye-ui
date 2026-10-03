import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { createHash } from "node:crypto";
import { expect, test } from "vitest";
import { extractPublicTranslation } from "../../../apps/docs/src/lib/public-translations.mjs";
import { projectImplementationLinks, projectPackagePhilosophy } from "../scripts/resource-translations.mjs";

const root = resolve(__dirname, "../../..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");
const source = read("design.md");
const pkg = JSON.parse(read("packages/ui/package.json"));
const ai = resolve(root, "packages/ui/ai");
const version = `v${pkg.version}`;
const links = (markdown: string) => [...markdown.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => match[1]);

/**
 * An implementing agent may read only the package's ai/ files, never the
 * repository. Two facts have to survive that: the bans are stated, and the
 * full criteria are reachable. Both are generated from design.md, so this
 * checks the generation actually happened and stayed in step.
 */
test("the style contract is the design guide's 设计契约 section, not a second copy", () => {
  const contract = source.split("## 设计契约")[1]?.split("\n## ")[0];
  expect(contract, "design.md must contain a 设计契约 section").toBeTruthy();

  // Every line of the generated file's contract body must come from design.md.
  const style = read("packages/ui/ai/style.md");
  for (const line of contract!.split("\n").filter((l) => l.trim().length > 40)) {
    expect(style, `ai/style.md has drifted from design.md: missing "${line.slice(0, 60)}…"`).toContain(line.trim());
  }
  expect(read("apps/docs/public/ai/style.md")).toBe(style);
});

test("the eight bans appear by name in the main skill", () => {
  const skill = read("packages/ui/ai/SKILL.md");
  const bans = source.split("### 禁止")[1]?.split("###")[0] ?? "";
  const ids = [...bans.matchAll(/\|\s*(NG\d)\s*\|/g)].map((match) => match[1]);
  expect(ids.length, "design.md 设计契约 must list the bans as NG1..NGn").toBeGreaterThanOrEqual(8);

  // SKILL.md carries the short form: the ban statements themselves.
  const statements = [...bans.matchAll(/\|\s*NG\d\s*\|([^|]+)\|/g)].map((match) => match[1].trim());
  const missing = statements.filter((statement) => {
    const head = statement.slice(0, 18);
    return !skill.includes(head);
  });
  expect(missing, `SKILL.md must name each ban. Missing: ${missing.join(" / ")}`).toEqual([]);
});

test("the package index resolves locally and the philosophy ships inside ai", () => {
  const index = read(`packages/ui/ai/${version}/llms.txt`);
  for (const target of ["../../design.md", "../style.md", "../design-philosophy.md"]) {
    expect(index, `llms.txt must link ${target}`).toContain(`(${target})`);
  }
  for (const target of links(index)) expect(existsSync(resolve(ai, version, target)), `missing index target: ${target}`).toBe(true);
  const philosophy = read("apps/docs/src/public-content/philosophy.md");
  expect(read("packages/ui/ai/design-philosophy.md")).toBe(projectPackagePhilosophy(philosophy));
  for (const target of ["apps/docs/public/ai/design-philosophy.md", "apps/docs/public/design-philosophy.md"]) expect(read(target)).toBe(philosophy);
  const philosophyFacts = JSON.parse(read("packages/ui/catalog.json")).designGuide.philosophy;
  for (const [facts, packagePath, sitePath, sourcePath] of [
    [philosophyFacts, "packages/ui/ai/design-philosophy.md", "apps/docs/public/ai/design-philosophy.md", "apps/docs/src/public-content/philosophy.md"],
    [philosophyFacts.localized.en, "packages/ui/ai/design-philosophy.en.md", "apps/docs/public/ai/design-philosophy.en.md", "apps/docs/src/public-content/philosophy.en.md"],
  ]) {
    const checksum = (path: string) => createHash("sha256").update(read(path)).digest("hex");
    expect(facts.sha256).toBe(checksum(packagePath));
    expect(facts.sourceSha256).toBe(checksum(sourcePath));
    expect(facts.projections.website.sha256).toBe(checksum(sitePath));
  }
  const skill = read("packages/ui/ai/SKILL.md");
  for (const target of ["style.md", "design-philosophy.md", `${version}/llms.txt`]) {
    expect(links(skill)).toContain(target);
    expect(existsSync(resolve(ai, target))).toBe(true);
  }
  for (const target of links(read("apps/docs/public/llms.txt"))) expect(existsSync(resolve(root, "apps/docs/public", target.slice(1)))).toBe(true);
});

test("the style contract ships and is reachable in a consuming project", () => {
  const pkg = JSON.parse(read("packages/ui/package.json"));
  expect(pkg.files).toContain("ai");
  expect(pkg.exports["./ai/*"]).toBe("./ai/*");

  const catalog = JSON.parse(read("packages/ui/catalog.json"));
  expect(catalog.designGuide.file).toBe("design.md");
  expect(catalog.designGuide.sha256).toBe(createHash("sha256").update(source).digest("hex"));
  // A machine reader should not have to guess where the criteria live.
  expect(catalog.designGuide.styleContract?.file).toBe("ai/style.md");
});

test("component implementation rules have one source and reach the existing shipped style file", () => {
  const standards = read("STANDARDS.md");
  const { canonical, english } = extractPublicTranslation(standards);
  const style = read("packages/ui/ai/style.md");
  const styleEn = read("packages/ui/ai/style.en.md");
  expect(english, "STANDARDS.md must contain its authored English translation").toBeTruthy();
  // Every actual clause reaches its language's style resource. Only link targets
  // change for the distributed location; translation bookkeeping is not a clause.
  for (const [locale, body, projected] of [["zh", canonical, style], ["en", english!, styleEn]] as const) {
    for (const clause of body.split("\n").filter(line => line.trim() && !line.startsWith("#"))) {
      const expected = projectImplementationLinks(clause, locale);
      expect(projected, `${locale} implementation clause missing: ${clause}`).toContain(expected);
    }
  }
  expect(style).toContain("## 公共组件实现");
  expect(styleEn).toContain("## Public component implementation");
  expect(read("apps/docs/public/ai/style.en.md")).toBe(styleEn);
  const catalog = JSON.parse(read("packages/ui/catalog.json"));
  expect(catalog.designGuide.styleContract.implementation.sha256).toBe(createHash("sha256").update(standards).digest("hex"));
  // Overlapping contrast rules are referenced, rather than maintained twice.
  expect(standards).not.toContain("4.5:1");
  expect(style).toContain("4.5:1");
});

test("public prose projections keep criteria and resolve package links without shipping internal evidence", () => {
  const standards = extractPublicTranslation(read("STANDARDS.md"));
  const zh = projectImplementationLinks(standards.canonical);
  const en = projectImplementationLinks(standards.english!, "en");
  expect(zh).toContain("[design.md「名称与状态」](../design.md#名称与状态)");
  expect(en).toContain("[Delivery checks](../design.en.md#delivery-checks-for-people-and-ai)");
  expect(zh).toContain("基础层（仓库内部取证：`docs/decisions/2026-10-03-foundation.md`）");
  expect(en).toContain("foundation (repository evidence: `docs/decisions/2026-10-03-foundation.md`)");
  for (const body of [zh, en]) {
    expect(body).not.toMatch(/\]\(docs\/decisions\//);
    for (const target of links(body)) {
      const [path, fragment] = target.split("#");
      if (/^https?:/.test(path)) continue;
      const file = resolve(ai, path);
      expect(existsSync(file), `projected public target missing: ${target}`).toBe(true);
      if (fragment) {
        const headings = [...readFileSync(file, "utf8").matchAll(/^#{1,6}\s+(.+)$/gm)].map(match => match[1].toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, "").replace(/ /g, "-"));
        expect(headings, `projected heading missing: ${target}`).toContain(fragment);
      }
    }
  }
  // Round-tripping only relocated link syntax retains every authored criterion.
  let restored = zh.replace(/\]\(\.\.\/(design\.md[^)]*)\)/g, "]($1)");
  for (const original of standards.canonical.matchAll(/\[([^\]]+)\]\((docs\/decisions\/2026-10-03-(?:foundation|value-adjudication)\.md(?:#[^)]*)?)\)/g)) {
    restored = restored.replaceAll(`${original[1]}（仓库内部取证：\`${original[2]}\`）`, original[0]);
  }
  expect(restored).toBe(standards.canonical);
  const philosophy = read("apps/docs/src/public-content/philosophy.md");
  const packagePhilosophy = projectPackagePhilosophy(philosophy);
  expect(links(packagePhilosophy)).toContain("../design.md");
  expect(links(packagePhilosophy)).toContain("https://ui.xflux.cc/docs/ai#project-rules");
  const philosophyEn = read("apps/docs/src/public-content/philosophy.en.md");
  const packagePhilosophyEn = projectPackagePhilosophy(philosophyEn, "en");
  expect(links(packagePhilosophyEn)).toContain("../design.en.md");
  expect(links(packagePhilosophyEn)).toContain("https://ui.xflux.cc/en/docs/ai#project-rules");
  expect(packagePhilosophyEn.replace("](../design.en.md)", "](/design.en.md)").replace("](https://ui.xflux.cc/en/docs/ai#project-rules)", "](/docs/ai#project-rules)"))
    .toBe(philosophyEn);
});

test("an agent restricted to ai can follow the design asset routes", () => {
  const skill = read("packages/ui/ai/SKILL.md");
  const index = read(`packages/ui/ai/${version}/llms.txt`);
  expect(links(skill)).toContain(`${version}/llms.txt`);
  // Pattern 路径随 Pattern 层归档，其断言见归档中的 pattern-contract.test.ts。
  for (const target of ["../style.md", "../design-philosophy.md", "components/button.md"]) {
    expect(links(index)).toContain(target);
    const path = resolve(ai, version, target);
    expect(path.startsWith(`${ai}/`)).toBe(true);
    expect(existsSync(path)).toBe(true);
  }
  expect(read("packages/ui/ai/style.md")).toContain("删掉该句后，读者做错事或找不到东西的概率不变");
  expect(read("packages/ui/ai/design-philosophy.md")).toContain("正名");
  const button = read(`packages/ui/ai/${version}/components/button.md`).split("```")[0];
  expect(button).toContain("- Avoid:");
  expect(button).toContain("- Application:");
});

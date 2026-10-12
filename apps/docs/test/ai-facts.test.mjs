// The facts handed to people and AI tools about each component: the props tables are checked against
// the types, the catalog is current with the source, and the Markdown entries are exactly what the
// generator renders from the catalog (so no second, hand-kept copy can disagree).
import test, { before } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { analyzeAll, buildDriftReport, compareApi, createApiProgram, gateDrift, resolveComponentFile } from "../../../packages/ui/scripts/api-resolver.mjs";
import { localizedComponent, renderComponent } from "../../../packages/ui/scripts/component-markdown.mjs";
import { renderLlmsFull } from "../../../packages/ui/scripts/llms-full.mjs";

const repo = fileURLToPath(new URL("../../../", import.meta.url));
const pub = join(repo, "apps/docs/public");
const read = (path) => readFileSync(join(repo, path), "utf8");
const catalog = JSON.parse(read("apps/docs/public/catalog.json"));
let fresh;
before(() => { fresh = analyzeAll(createApiProgram()); });

test("every component's props are resolved from its types, and the catalog is current with the source", () => {
  assert.deepEqual(catalog.components.map((component) => component.name), fresh.map((result) => result.name), "catalog lists a different set of components than packages/ui/src/components; run pnpm --filter @qingye_lab/ui gen:catalog");
  for (const component of catalog.components) {
    const result = fresh.find((item) => item.name === component.name);
    assert.notEqual(component.apiStatus, "curated-not-type-resolved", `${component.name}: ${component.typeApi?.reason}`);
    assert.equal(component.apiStatus, result.apiStatus, `${component.name}: catalog apiStatus is stale; run gen:catalog`);
    assert.deepEqual(component.typeApi.parts.map(({ name, ownProps }) => [name, ownProps?.map((prop) => prop.name)]), result.typeApi.parts.map(({ name, ownProps }) => [name, ownProps?.map((prop) => prop.name)]), `${component.name}: resolved props differ from the source; run gen:catalog`);
    assert.deepEqual(component.providers.required, result.providers.required, `${component.name}: provider facts are stale; run gen:catalog`);
  }
});

test("documented properties that the types do not have are only the ones the baseline already lists", () => {
  const baseline = JSON.parse(read("docs/api-drift.baseline.json"));
  const { added } = gateDrift(buildDriftReport(fresh), baseline);
  assert.deepEqual(added, [], "meta.ts documents a property or part that the component does not have; fix the table (node packages/ui/scripts/check-api-drift.mjs --list)");
});

test("the comparison finds a name the type lacks, reads merged and generic names, and ignores inherited ones", () => {
  const parts = resolveComponentFile(createApiProgram(), "button", new Set()).parts;
  const compare = (props) => compareApi("button", parts, [{ name: "Button", description: "", props: props.map((name) => ({ name, type: "", description: "" })) }], "meta.ts");
  assert.deepEqual(compare(["variant / tone / size"]).documentedButMissing, []);
  assert.deepEqual(compare(["render / ref / native props"]).documentedButMissing, []);
  assert.deepEqual(compare(["disabled"]).documentedButMissing, [], "an inherited property is a real property");
  const drift = compare(["variant / flavour", "noSuchProp"]).documentedButMissing;
  assert.deepEqual(drift.map((item) => item.prop), ["flavour", "noSuchProp"]);
  const undocumented = compare(["variant"]).undocumented.map((item) => item.prop);
  assert.ok(undocumented.includes("tone") && undocumented.includes("loading") && !undocumented.includes("variant"));
});

test("llms-full.txt carries every component with its resolved props, in both languages", () => {
  for (const locale of ["zh", "en"]) {
    const file = locale === "en" ? "llms-full.en.txt" : "llms-full.txt";
    const text = readFileSync(join(pub, file), "utf8");
    const installation = read(`apps/docs/public/ai/v${catalog.version}/installation.md`);
    assert.equal(text, renderLlmsFull({ catalog, locale, guide: read(locale === "en" ? "apps/docs/public/design.en.md" : "apps/docs/public/design.md"), installation }), `${file} is not what the generator renders; run gen:catalog`);
    const bodyStart = text.search(/\n# (Part 3\.|第三部分)/);
    assert.ok(bodyStart > 0);
    const sections = text.slice(bodyStart).split(/\n## (?=\S)/).slice(1);
    for (const component of catalog.components) {
      const item = localizedComponent(component, locale);
      const section = sections.find((block) => block.startsWith(`${item.title}\n`));
      assert.ok(section, `${file} has no section for ${component.name}`);
      for (const part of component.typeApi.parts) for (const prop of part.ownProps ?? []) assert.ok(section.includes(`\`${prop.name}${prop.optional ? "?" : ""}\``), `${file}: ${component.name} lacks own prop ${prop.name}`);
      if (component.examples[0]) assert.ok(section.includes(component.examples[0].code.trim()), `${file}: ${component.name} lacks its first example`);
    }
  }
});

test("every component page has a Markdown twin equal to the packaged file, and llms.txt links resolve", () => {
  for (const locale of ["zh", "en"]) {
    const prefix = locale === "en" ? "en/" : "";
    for (const component of catalog.components) {
      const twin = join(pub, prefix, "docs/components", `${component.name}.md`);
      assert.ok(existsSync(twin), `missing ${prefix}docs/components/${component.name}.md; run gen:catalog`);
      const packaged = join(pub, "ai", `v${catalog.version}`, prefix, "components", `${component.name}.md`);
      assert.equal(readFileSync(twin, "utf8"), readFileSync(packaged, "utf8"));
      assert.equal(readFileSync(twin, "utf8"), renderComponent(localizedComponent(component, locale), { pkgName: catalog.package, pkgVersion: catalog.version, examples: "all" }));
    }
    const orphans = readdirSync(join(pub, prefix, "docs/components")).filter((file) => !catalog.components.some((component) => `${component.name}.md` === file));
    assert.deepEqual(orphans, []);
    const index = readFileSync(join(pub, locale === "en" ? "llms.en.txt" : "llms.txt"), "utf8");
    const targets = [...index.matchAll(/\]\((\/[^)\s#]+)\)/g)].map((match) => match[1]);
    assert.ok(targets.includes(locale === "en" ? "/llms-full.en.txt" : "/llms-full.txt"));
    for (const component of catalog.components) assert.ok(targets.includes(`/${prefix}docs/components/${component.name}.md`), `${locale} llms.txt does not link ${component.name}`);
    for (const target of targets) assert.ok(existsSync(join(pub, target.slice(1))), `llms.txt links a file that does not exist: ${target}`);
  }
});

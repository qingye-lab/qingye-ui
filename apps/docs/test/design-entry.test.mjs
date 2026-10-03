import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import { embeddedTranslation, standaloneTranslation } from "../../../packages/ui/scripts/resource-translations.mjs";

let server, entry;
before(async () => {
  server = await createServer({ root: fileURLToPath(new URL("..", import.meta.url)), server: { middlewareMode: true, hmr: false }, appType: "custom", logLevel: "error" });
  entry = await server.ssrLoadModule("/src/lib/design-entry.ts");
});
after(async () => { await server?.close(); });

test("English guide and adoption outlets use the authored source block while Chinese constants remain Chinese", () => {
  const en = entry.designEntryFor("en");
  const zh = entry.designEntryFor("zh");
  assert.equal(zh.guide, entry.DESIGN_GUIDE);
  assert.equal(zh.agents, entry.PROJECT_AGENTS);
  assert.match(zh.guide, /^# Qingye UI 设计指南/);
  assert.doesNotMatch(zh.guide, /# Qingye UI Design Guide/);
  assert.match(en.guide, /^# Qingye UI Design Guide/);
  assert.match(en.agents, /Before interface work/);
  assert.match(en.agents, /node_modules\/@qingye\/ui\/design\.en\.md/);
  assert.match(en.design, /The Chinese method names remain canonical/);
  assert.match(en.task, /actual evidence, and unverified areas/);
  assert.doesNotMatch(en.agents, /界面设计先读/);
  assert.doesNotMatch(en.guide, /source-sha256=/);
});

test("source hash drift refuses English guide, implementation, and philosophy projection", () => {
  const guide = readFileSync(new URL("../../../design.md", import.meta.url), "utf8");
  const standards = readFileSync(new URL("../../../STANDARDS.md", import.meta.url), "utf8");
  const philosophy = readFileSync(new URL("../src/public-content/philosophy.md", import.meta.url), "utf8");
  const translated = readFileSync(new URL("../src/public-content/philosophy.en.md", import.meta.url), "utf8");
  assert.match(embeddedTranslation(guide, "design.md").english, /## Design contract/);
  assert.match(embeddedTranslation(standards, "STANDARDS.md").english, /## 2. Dimensions/);
  assert.ok(standaloneTranslation(philosophy, translated, "philosophy.md").length > 1000);
  assert.throws(() => embeddedTranslation(guide.replace("# Qingye UI 设计指南", "# 更新的设计指南"), "design.md"), /stale/);
  assert.throws(() => embeddedTranslation(standards.replace("# 组件规范", "# 新规范"), "STANDARDS.md"), /stale/);
  assert.throws(() => standaloneTranslation(`${philosophy}\n源内容变更`, translated, "philosophy.md"), /source hash changed/);
  assert.throws(() => entry.extractDesignEntry(`${guide}\n<!-- qingye:translation:en:end -->`), /exactly one/);
});

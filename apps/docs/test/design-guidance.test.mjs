import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

let server, designFor, pageDecisionsFor, methodsFor, localizedMeta;
before(async () => {
  server = await createServer({ root: fileURLToPath(new URL("..", import.meta.url)), server: { middlewareMode: true, hmr: false }, appType: "custom", logLevel: "error" });
  ({ designFor, pageDecisionsFor, methodsFor } = await server.ssrLoadModule("/src/lib/design-guidance.ts"));
  ({ localizedMeta } = await server.ssrLoadModule("/src/lib/localized-meta.ts"));
});
after(async () => { await server?.close(); });
const meta = { description: "A task-specific component", category: "通用", api: [] };

test("component decisions survive legacy slug defaults in the site and catalog projection", () => {
  for (const slug of ["button", "table", "data-table", "toast", "theme-provider"]) {
    const explicit = {
      whenToUse: ["A specific supported task"],
      avoid: ["A specific unsupported interaction"],
      stateOwner: { library: ["Interaction state"], application: ["Confirmed result"] },
    };
    const actual = designFor({ ...meta, design: explicit }, slug);
    assert.equal(actual.whenToUse, explicit.whenToUse);
    assert.equal(actual.avoid, explicit.avoid);
    assert.equal(actual.stateOwner, explicit.stateOwner);
    assert.ok(actual.responsive.length > 0);
  }
});

test("a component with partial guidance retains defaults for omitted sections", () => {
  const explicit = ["Keep comparison columns reachable"];
  const actual = designFor({ ...meta, design: { responsive: explicit } }, "table");
  assert.equal(actual.responsive, explicit);
  assert.match(actual.avoid[0], /比较/);
  assert.ok(actual.stateOwner.application.length > 0);
});

test("English public outlets preserve component decisions with independent section and entry fallbacks", () => {
  const source = {
    ...meta, title: "候选输入", titleEn: "Candidate input", description: "查询和确认值分开", descriptionEn: "Query and confirmed value stay separate.",
    api: [{ name: "CandidateInput", description: "输入入口", descriptionEn: "Input entry", props: [{ name: "原生属性", nameEn: "Native props", type: "原生输入属性", typeEn: "Native input props", default: "无", defaultEn: "None", description: "保留真实名称", descriptionEn: "Preserve the actual name." }] }],
    keyboard: [{ keys: "字符输入", keysEn: "Typing", description: "编辑查询", descriptionEn: "Edit the query." }, { keys: "Escape", description: "返回当前入口" }],
    notes: ["不得提交查询", "中文回退"], notesEn: ["Never submit the query.", " "],
    design: { whenToUse: ["从候选确认一个值"], avoid: ["不得把草稿当确认", "原文第二项"], stateOwner: { library: ["候选焦点"], application: ["真实候选", "受控值"] } },
    designEn: { whenToUse: ["Confirm one candidate value."], avoid: ["A draft is not a confirmed value.", ""], stateOwner: { application: ["Actual candidates."] } },
  };
  const original = structuredClone(source);
  const entry = localizedMeta(source, "en");
  assert.equal(entry.api[0].props[0].name, "Native props");
  assert.equal(entry.api[0].props[0].type, "Native input props");
  assert.equal(entry.api[0].props[0].default, "None");
  assert.equal(entry.keyboard[0].keys, "Typing");
  assert.equal(entry.keyboard[1], source.keyboard[1]);
  assert.deepEqual(entry.notes, ["Never submit the query.", "中文回退"]);
  const design = designFor(source, "candidate-input", "en");
  assert.deepEqual(design.whenToUse, ["Confirm one candidate value."]);
  assert.deepEqual(design.avoid, ["A draft is not a confirmed value.", "原文第二项"]);
  assert.deepEqual(design.stateOwner, { library: ["候选焦点"], application: ["Actual candidates.", "受控值"] });
  assert.match(design.composition[0], /Input entry/);
  assert.equal(pageDecisionsFor(source, "en"), "A draft is not a confirmed value. 原文第二项 Actual candidates. 受控值");
  assert.equal(pageDecisionsFor({ ...source, decisions: "确认条件", decisionsEn: "Confirmation conditions." }, "en"), "Confirmation conditions.");
  assert.deepEqual(methodsFor("en").map(method => method.href), Array.from({ length: 6 }, (_, index) => `/docs/design-philosophy#method-${index + 1}`));
  assert.deepEqual(source, original);
  assert.equal(localizedMeta(source, "zh"), source);
});

import test from "node:test";
import assert from "node:assert/strict";
import { findNameIssues, parseAriaSnapshot, splitSpecimens } from "./name-check.mjs";

const issues = (text) => findNameIssues(parseAriaSnapshot(text));
const rules = (text, rule) => issues(text).filter((i) => i.rule === rule);

test("parser reads roles, names, attributes, inline text, children and drops property lines", () => {
  const tree = parseAriaSnapshot([
    "- main:",
    "  - 'link \"Go: home\"':",
    "    - /url: /x",
    "  - button \"say \\\"hi\\\"\": x",
    "  - 'button \"it''s: ok\"': \"y\"",
    "  - checkbox \"c\" [checked]",
    "  - text: loose",
    "  - heading \"H\" [level=2]",
    "  - list:",
    "    - listitem:",
    "      - link \"two\":",
    "        - /url: /y",
  ].join("\n"));
  const [main] = tree.children;
  assert.equal(main.role, "main");
  assert.deepEqual(main.children.map((n) => [n.role, n.name]), [
    ["link", "Go: home"], ["button", 'say "hi"'], ["button", "it's: ok"],
    ["checkbox", "c"], ["heading", "H"], ["list", ""],
  ]);
  assert.equal(main.children[0].children.length, 0);
  assert.equal(main.children[5].children[0].children[0].name, "two");
});

test("R2 reports the same operable role and name twice in unnamed blocks", () => {
  const found = rules('- generic:\n  - combobox "负责人": 张三\n- generic:\n  - combobox "负责人": 李四', "R2");
  assert.equal(found.length, 1);
  assert.deepEqual([found[0].role, found[0].name, found[0].count, found[0].scope], ["combobox", "负责人", 2, "(root)"]);
});

test("R2 does not report the same control inside separately named regions", () => {
  const text = [
    '- region "甲":', '  - combobox "负责人": 张三',
    '- region "乙":', '  - combobox "负责人": 李四',
  ].join("\n");
  assert.deepEqual(rules(text, "R2"), []);
});

test("R2 does not report one field name in two named groups (fieldsets)", () => {
  const text = [
    '- group "寄件人":', '  - textbox "城市": 上海',
    '- group "收件人":', '  - textbox "城市": 北京',
  ].join("\n");
  assert.deepEqual(rules(text, "R2"), []);
});

test("R2 reports repeated names inside one named group, with the scope path", () => {
  const found = rules('- region "R":\n  - group "G":\n    - button "保存"\n    - button "保存"', "R2");
  assert.equal(found.length, 1);
  assert.equal(found[0].scope, 'region "R" > group "G"');
});

test("R2 reports per-row actions: listitem is not a scope", () => {
  const text = [
    "- list:",
    "  - listitem:", '    - button "删除"',
    "  - listitem:", '    - button "删除"',
    "  - listitem:", '    - button "删除"',
  ].join("\n");
  const found = rules(text, "R2");
  assert.equal(found.length, 1);
  assert.equal(found[0].count, 3);
});

test("R2 does not report different roles with one name, nor different names", () => {
  assert.deepEqual(rules('- button "搜索"\n- link "搜索"\n- button "清除"', "R2"), []);
});

test("R2 ignores repeated empty names (axe owns those)", () => {
  assert.deepEqual(rules("- button\n- button\n- button []", "R2"), []);
});

test("R3 reports two unnamed navigations", () => {
  const found = rules('- navigation:\n  - link "a"\n- navigation:\n  - link "b"', "R3");
  assert.equal(found.length, 1);
  assert.deepEqual([found[0].role, found[0].name, found[0].count], ["navigation", "", 2]);
});

test("R3 reports two navigations with the same name", () => {
  assert.equal(rules('- navigation "主导航"\n- navigation "主导航"', "R3").length, 1);
});

test("R3 does not report distinct names, a single landmark, or non-landmarks", () => {
  assert.deepEqual(rules('- navigation "主导航"\n- navigation "页脚"', "R3"), []);
  assert.deepEqual(rules("- navigation:\n  - link \"a\"", "R3"), []);
  assert.deepEqual(rules("- group:\n- group:", "R3"), []);
});

test("R2 treats same-name links to the same /url as one object, but reports different targets", () => {
  const same = ["- main:", "  - link \"Button\":", "    - /url: /components/button", "  - paragraph:", "    - link \"Button\":", "      - /url: /components/button"].join("\n");
  assert.deepEqual(rules(same, "R2"), []);
  const footnotes = ["- main:", "  - link \"11\":", "    - /url: \"#note-11\"", "  - link \"11\":", "    - /url: \"#cite-11\""].join("\n");
  assert.equal(rules(footnotes, "R2").length, 1);
  const noUrl = ["- main:", "  - link \"Open\"", "  - link \"Open\""].join("\n");
  assert.equal(rules(noUrl, "R2").length, 1);
});

test("specimens: R2 moves to its own list only when every match is inside a marked region", () => {
  const r2 = { rule: "R2", role: "button", name: "保存", scope: "(root)", count: 2 };
  const r3 = { rule: "R3", role: "navigation", name: "", scope: "(root)", count: 2 };
  assert.deepEqual(splitSpecimens([r2], [[true, true]]), { issues: [], specimens: [r2] });
  // one match outside the specimen: a real repeat, stays a finding
  assert.deepEqual(splitSpecimens([r2], [[true, false]]), { issues: [r2], specimens: [] });
  // nothing located: stays a finding rather than being hidden
  assert.deepEqual(splitSpecimens([r2], [[]]), { issues: [r2], specimens: [] });
  assert.deepEqual(splitSpecimens([r2], []), { issues: [r2], specimens: [] });
  // landmarks are never specimens
  assert.deepEqual(splitSpecimens([r3], [[true, true]]), { issues: [r3], specimens: [] });
});

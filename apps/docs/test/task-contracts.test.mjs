import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { runInNewContext } from "node:vm";
import ts from "typescript";
const dir = dirname(fileURLToPath(import.meta.url));
const repo = resolve(dir, "../../..");
const read = (path) => readFileSync(resolve(repo, path), "utf8");
const context = { exports: {}, require: (path) => { if (path === "./authorized-resources.json") return JSON.parse(read("apps/docs/src/patterns/authorized-resources.json")); throw new Error(`Unexpected state import: ${path}`); } };
runInNewContext(ts.transpileModule(read("apps/docs/src/patterns/state.ts"), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText, context);
const { editReducer, initialEdit, resumeEditState, batchResults, retryFailed, scopeKey, queueTransition } = context.exports;
const plain = (value) => JSON.parse(JSON.stringify(value));
function draft() { return editReducer(editReducer(initialEdit, { type: "change", key: "title", value: "观察" }), { type: "change", key: "body", value: "用户的正文" }); }

test("save failure keeps user input; an unknown write cannot be resubmitted before verification", () => {
  const started = editReducer(draft(), { type: "submit", id: 1, action: "save" });
  const failed = editReducer(started, { type: "result", id: 1, outcome: "failure" });
  assert.equal(failed.draft.body, "用户的正文");
  assert.equal(failed.saved.body, "");
  const unknown = editReducer(started, { type: "result", id: 1, outcome: "unknown" });
  assert.equal(editReducer(unknown, { type: "submit", id: 2, action: "save" }).request.id, 1);
  const verified = editReducer(unknown, { type: "verify" });
  assert.equal(verified.status, "success");
  assert.equal(verified.saved.body, "用户的正文");
  assert.equal(editReducer(verified, { type: "verify" }), verified);
});
test("in-flight save keeps request identity while input advances; completion saves its snapshot and keeps later draft", () => {
  const started = editReducer(draft(), { type: "submit", id: 10, action: "save" });
  const newer = editReducer(started, { type: "change", key: "body", value: "更晚的输入" });
  assert.equal(newer.status, "saving");
  assert.equal(newer.request.id, 10);
  assert.equal(newer.request.revision, started.revision);
  assert.equal(newer.request.draft.body, "用户的正文");
  assert.ok(newer.revision > newer.request.revision);
  assert.equal(editReducer(newer, { type: "submit", id: 11, action: "save" }), newer);
  assert.equal(editReducer(newer, { type: "discard" }), newer);
  assert.equal(editReducer(newer, { type: "restore", draft: initialEdit.draft }), newer);
  const stale = editReducer(newer, { type: "result", id: 9, outcome: "success" });
  assert.equal(stale.saved.body, ""); assert.equal(stale.request.id, 10); assert.equal(stale.ignoredResponses, 1);
  const completed = editReducer(newer, { type: "result", id: 10, outcome: "success" });
  assert.equal(completed.draft.body, "更晚的输入");
  assert.equal(completed.saved.body, "用户的正文");
  assert.equal(completed.ignoredResponses, 0);
  assert.equal(completed.status, "success");
  assert.equal(completed.request, null);
  const wrongObject = editReducer({ ...started, objectId: "another" }, { type: "result", id: 10, outcome: "success" });
  assert.equal(wrongObject.saved.body, "");
});
test("save failure and unknown preserve edits made during the same pending request", () => {
  const started = editReducer(draft(), { type: "submit", id: 12, action: "save" });
  const newer = editReducer(started, { type: "change", key: "body", value: "请求之后的新正文" });
  const failed = editReducer(newer, { type: "result", id: 12, outcome: "failure" });
  assert.equal(failed.status, "failure"); assert.equal(failed.request, null);
  assert.equal(failed.draft.body, "请求之后的新正文"); assert.equal(failed.saved.body, "");
  const unknown = editReducer(newer, { type: "result", id: 12, outcome: "unknown" });
  assert.equal(unknown.status, "unknown"); assert.equal(unknown.request.id, 12);
  assert.equal(editReducer(unknown, { type: "submit", id: 13, action: "save" }), unknown);
  const verified = editReducer(unknown, { type: "verify" });
  assert.equal(verified.saved.body, "用户的正文"); assert.equal(verified.draft.body, "请求之后的新正文");
});
test("an empty title typed during saving cannot demote the pending request on another submit intent", () => {
  const started = editReducer(draft(), { type: "submit", id: 14, action: "save" });
  const empty = editReducer(started, { type: "change", key: "title", value: "" });
  const repeated = editReducer(empty, { type: "submit", id: 15, action: "save" });
  assert.equal(repeated.status, "saving"); assert.equal(repeated.request.id, 14);
  assert.equal(repeated, empty);
  const completed = editReducer(repeated, { type: "result", id: 14, outcome: "success" });
  assert.equal(completed.saved.title, "观察"); assert.equal(completed.draft.title, "");
});
test("discard restores the saved snapshot and recovery remains explicitly unsaved", () => {
  const written = draft();
  const discarded = editReducer(written, { type: "discard" });
  assert.equal(discarded.draft.body, "");
  const restored = editReducer(discarded, { type: "restore", draft: written.draft });
  assert.equal(restored.draft.body, "用户的正文");
  assert.equal(restored.saved.body, "");
  assert.equal(restored.status, "restored");
});
test("a batch distinguishes failure and unknown; retry scope excludes completed and unknown objects", () => {
  const result = batchResults(["a", "b", "c", "d", "e"]);
  assert.deepEqual(plain(result), { a: "success", b: "success", c: "success", d: "failure", e: "unknown" });
  const retry = retryFailed(result);
  assert.deepEqual(plain(retry.ids), ["d"]);
  assert.equal(retry.results.e, "unknown");
});
test("confirmation binds revision and exact selected IDs", () => {
  assert.equal(scopeKey(1, ["a", "b"]), scopeKey(1, ["b", "a"]));
  assert.notEqual(scopeKey(1, ["a"]), scopeKey(1, ["a", "b"]));
  assert.notEqual(scopeKey(1, ["a"]), scopeKey(2, ["a"]));
});
test("cancellation is a separate pending state with confirmed and too-late outcomes", () => {
  const item = { id: "a", name: "example", stage: "processing", progress: 100, attempt: 1 };
  const pending = queueTransition(item, "cancelling");
  assert.equal(pending.stage, "cancelling");
  assert.equal(queueTransition(pending, "cancelled").stage, "cancelled");
  assert.equal(queueTransition(pending, "too-late").stage, "too-late");
  assert.equal(queueTransition(item, "cancelled").stage, "processing");
});
test("public facts resolve aliases, optional peers and documented import owners without inventing providers", () => {
  const catalog = JSON.parse(read("packages/ui/catalog.json"));
  assert.equal(catalog.schemaVersion, 2);
  assert.equal(catalog.components.length, 88);
  assert.equal(catalog.patterns.length, 6);
  const find = (name) => catalog.components.find((component) => component.name === name);
  assert.equal(find("button-group").actualExports.find((item) => item.name === "ButtonGroup").owner, "group");
  assert.equal(find("hover-card").actualExports.find((item) => item.name === "HoverCard").owner, "preview-card");
  assert.ok(find("chart").dependencies.optionalPeers.includes("recharts"));
  assert.ok(find("data-table").dependencies.optionalPeers.includes("@tanstack/react-table"));
  assert.equal(find("checkbox-group").usageImports.find((item) => item.name === "Checkbox").import, "@qingye/ui/components/checkbox");
  assert.equal(find("copy-button").usageImports.find((item) => item.name === "useCopyToClipboard").import, "@qingye/ui");
  assert.ok(catalog.components.every((component) => component.providers.status === "UNVERIFIED"));
});
test("published guide copies match the sole source and public resources exclude private implementation ledgers", () => {
  const guide = read("design.md");
  assert.equal(read("packages/ui/design.md"), guide);
  assert.equal(read("apps/docs/public/design.md"), guide);
  const catalog = read("apps/docs/public/catalog.json");
  assert.doesNotMatch(catalog, /\/Users\/|\/Volumes\/|\bC\d{3}\b|\bV\d{2}\b|\bW\d{2}\b|非公开内部/);
  const registry = JSON.parse(read("apps/docs/public/registry.json"));
  assert.equal(registry.items.length, 3);
  for (const item of registry.items) {
    assert.ok(item.dependencies.every((dependency) => dependency === `@qingye/ui@${JSON.parse(read("packages/ui/package.json")).version}`));
    assert.ok(item.files.every((file) => !file.path.includes("src/components/")));
  }
});

test("new navigation uses native links while command controls keep button semantics", async () => {
  const { createElement } = await import("react");
  const { renderToStaticMarkup } = await import("react-dom/server");
  const { Link, MemoryRouter } = await import("react-router-dom");
  const html = renderToStaticMarkup(createElement(MemoryRouter, null, createElement(Link, { to: "/docs/patterns/collection" }, "返回资料集合")));
  assert.match(html, /<a[^>]+href="\/docs\/patterns\/collection"/);
  assert.doesNotMatch(html, /role="button"/);
  for (const path of ["edit", "collection", "detail"]) {
    const file = `apps/docs/src/patterns/${path}.tsx`;
    const ast = ts.createSourceFile(file, read(file), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    function visit(node) {
      if ((ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) && node.tagName.getText(ast) === "Button") {
        assert.ok(!node.attributes.properties.some((attribute) => ts.isJsxAttribute(attribute) && attribute.name.getText(ast) === "render"), "Navigation must retain its link role; Button render is a command role by default.");
      }
      ts.forEachChild(node, visit);
    }
    visit(ast);
  }
});

test("late object A completion cannot overwrite object B or its saved result", () => {
  const a = editReducer(draft(), { type: "submit", id: 101, action: "save" });
  let b = editReducer(a, { type: "switch", objectId: "field-note-02" });
  b = editReducer(b, { type: "change", key: "title", value: "B 资料" });
  b = editReducer(b, { type: "change", key: "body", value: "B 的新输入" });
  b = editReducer(b, { type: "submit", id: 102, action: "save" });
  b = editReducer(b, { type: "result", id: 102, outcome: "success", at: 1000 });
  b = editReducer(b, { type: "result", id: 101, outcome: "success", at: 2000 });
  assert.equal(b.objectId, "field-note-02");
  assert.equal(b.draft.body, "B 的新输入");
  assert.equal(b.saved.body, "B 的新输入");
  assert.equal(b.ignoredResponses, 1);
  const aAgain = editReducer(b, { type: "switch", objectId: "field-note-01" });
  assert.equal(aAgain.draft.body, "用户的正文");
  assert.equal(aAgain.status, "unknown");
  assert.equal(aAgain.request.id, 101);
  assert.equal(editReducer(aAgain, { type: "submit", id: 103, action: "save" }), aAgain);
  const verifiedA = editReducer(aAgain, { type: "verify" });
  assert.equal(verifiedA.saved.body, "用户的正文");
  assert.equal(verifiedA.objectDrafts["field-note-02"].saved.body, "B 的新输入");
});
test("switching away from an unknown A request and returning cannot bypass verification", () => {
  let a = editReducer(draft(), { type: "submit", id: 111, action: "save" });
  a = editReducer(a, { type: "result", id: 111, outcome: "unknown" });
  let b = editReducer(a, { type: "switch", objectId: "field-note-02" });
  assert.equal(b.status, "editing"); assert.equal(b.request, null);
  assert.equal(b.objectDrafts["field-note-01"].status, "unknown");
  assert.equal(b.objectDrafts["field-note-01"].request.id, 111);
  b = editReducer(b, { type: "change", key: "title", value: "B 的草稿" });
  const returned = editReducer(b, { type: "switch", objectId: "field-note-01" });
  assert.equal(returned.status, "unknown"); assert.equal(returned.request.id, 111);
  assert.equal(editReducer(returned, { type: "submit", id: 112, action: "save" }), returned);
  assert.equal(editReducer(returned, { type: "discard" }), returned);
  assert.equal(editReducer(returned, { type: "change", key: "body", value: "绕过" }), returned);
  assert.equal(returned.objectDrafts["field-note-02"].draft.title, "B 的草稿");
  const verified = editReducer(returned, { type: "verify" });
  assert.equal(verified.saved.body, "用户的正文"); assert.equal(verified.request, null);
});
test("saved-action undo has a separate request/result and preserves later unsaved work", () => {
  let state = editReducer(draft(), { type: "submit", id: 201, action: "save" });
  state = editReducer(state, { type: "result", id: 201, outcome: "success", at: 1000 });
  assert.equal(state.saved.body, "用户的正文");
  state = editReducer(state, { type: "change", key: "body", value: "保存之后的新草稿" });
  const cancelledDraft = editReducer(state, { type: "discard" });
  assert.equal(cancelledDraft.saved.body, "用户的正文");
  state = editReducer(state, { type: "undo-request", at: 2000 });
  assert.equal(state.undoStatus, "pending");
  assert.equal(state.saved.body, "用户的正文");
  state = editReducer(state, { type: "undo-result", requestId: 201, attempt: 1, outcome: "success" });
  assert.equal(state.saved.body, "");
  assert.equal(state.draft.body, "保存之后的新草稿");
  assert.equal(state.undoStatus, "success");
});
test("pending undo cannot lose its result through object switch or draft replacement", () => {
  let state = editReducer(draft(), { type: "submit", id: 211, action: "save" });
  state = editReducer(state, { type: "result", id: 211, outcome: "success", at: 1000 });
  state = editReducer(state, { type: "undo-request", at: 2000 });
  assert.equal(editReducer(state, { type: "switch", objectId: "field-note-02" }), state);
  assert.equal(editReducer(state, { type: "discard" }), state);
  assert.equal(editReducer(state, { type: "restore", draft: initialEdit.draft }), state);
  assert.equal(editReducer(state, { type: "change", key: "body", value: "覆盖" }), state);
  assert.equal(editReducer(state, { type: "submit", id: 212, action: "save" }), state);
  const completed = editReducer(state, { type: "undo-result", requestId: 211, attempt: 1, outcome: "success" });
  assert.equal(completed.saved.body, ""); assert.equal(completed.undoStatus, "success");
});
test("undo failure and deadline expiry never claim a successful rollback", () => {
  let state = editReducer(draft(), { type: "submit", id: 301, action: "save" });
  state = editReducer(state, { type: "result", id: 301, outcome: "success", at: 1000 });
  const pending = editReducer(state, { type: "undo-request", at: 2000 });
  const failed = editReducer(pending, { type: "undo-result", requestId: 301, attempt: 1, outcome: "failure", at: 3000 });
  assert.equal(failed.undoStatus, "failure");
  assert.equal(failed.saved.body, "用户的正文");
  const expired = editReducer(state, { type: "undo-request", at: 16000 });
  assert.equal(expired.undoStatus, "expired");
  assert.equal(editReducer(expired, { type: "undo-result", requestId: 301, attempt: 1, outcome: "success" }).saved.body, "用户的正文");
});
function interruptedUndo() {
  let state = editReducer(draft(), { type: "submit", id: 401, action: "save" });
  state = editReducer(state, { type: "result", id: 401, outcome: "success", at: 1000 });
  state = editReducer(state, { type: "change", key: "body", value: "第二个已保存版本" });
  state = editReducer(state, { type: "submit", id: 402, action: "publish" });
  state = editReducer(state, { type: "result", id: 402, outcome: "success", at: 2000 });
  state = editReducer(state, { type: "change", key: "body", value: "等待撤销时保留的草稿" });
  return editReducer(state, { type: "undo-request", at: 3000 });
}
test("re-entering a pending undo preserves both versions and remains unknown until its exact request is verified", () => {
  const pending = interruptedUndo();
  const resumed = resumeEditState(plain(pending));
  assert.equal(resumed.undoStatus, "unknown");
  assert.deepEqual(plain(resumed.draft), plain(pending.draft));
  assert.deepEqual(plain(resumed.saved), plain(pending.saved));
  assert.deepEqual(plain(resumed.undo), plain(pending.undo));
  assert.equal(resumeEditState(plain(resumed)).undoStatus, "unknown");
  assert.equal(editReducer(resumed, { type: "undo-expire" }), resumed);
  assert.equal(editReducer(resumed, { type: "submit", id: 403, action: "save" }), resumed);
  assert.equal(editReducer(resumed, { type: "change", key: "body", value: "绕过核实" }), resumed);
  assert.equal(editReducer(resumed, { type: "undo-request", at: 4000 }), resumed);
  const oldTimer = editReducer(resumed, { type: "undo-result", requestId: 402, attempt: 1, outcome: "success" });
  assert.equal(oldTimer.undoStatus, "unknown");
  assert.equal(oldTimer.saved.body, "第二个已保存版本");
  assert.equal(oldTimer.ignoredResponses, 1);
  // A timely undo request can be confirmed after the submission deadline.
  const verified = editReducer(resumed, { type: "undo-verify", requestId: 402, attempt: 1, outcome: "success", at: 20000 });
  assert.equal(verified.undoStatus, "success");
  assert.equal(verified.saved.body, "用户的正文");
  assert.equal(verified.draft.body, "等待撤销时保留的草稿");
  const continued = editReducer(verified, { type: "change", key: "body", value: "核实后继续编辑" });
  const savedAgain = editReducer(continued, { type: "submit", id: 403, action: "save" });
  assert.equal(savedAgain.status, "saving");
  assert.equal(savedAgain.request.draft.body, "核实后继续编辑");
  const repeated = editReducer(savedAgain, { type: "undo-verify", requestId: 402, attempt: 1, outcome: "success", at: 21000 });
  assert.equal(repeated.saved.body, "用户的正文");
  assert.equal(repeated.request.id, 403);
});
test("unknown undo survives object switching and session recovery without blocking unrelated work", () => {
  const resumed = resumeEditState(plain(interruptedUndo()));
  let other = editReducer(resumed, { type: "switch", objectId: "field-note-02" });
  other = editReducer(other, { type: "change", key: "title", value: "B 的新草稿" });
  other = resumeEditState(plain(other));
  assert.equal(other.objectDrafts["field-note-01"].undoStatus, "unknown");
  const returned = editReducer(other, { type: "switch", objectId: "field-note-01" });
  assert.equal(returned.undoStatus, "unknown");
  assert.equal(returned.saved.body, "第二个已保存版本");
  assert.equal(returned.draft.body, "等待撤销时保留的草稿");
  assert.equal(returned.objectDrafts["field-note-02"].draft.title, "B 的新草稿");
  const wrongRequest = editReducer(returned, { type: "undo-verify", requestId: 401, attempt: 1, outcome: "success", at: 4000 });
  assert.equal(wrongRequest.undoStatus, "unknown");
  assert.equal(wrongRequest.saved.body, "第二个已保存版本");
});
test("already retained sessions without an undo-attempt field remain recoverable", () => {
  const retained = plain(interruptedUndo());
  delete retained.undo.attempt;
  const resumed = resumeEditState(retained);
  assert.equal(resumed.undoStatus, "unknown");
  assert.equal(resumed.undo.attempt, 0);
  const verified = editReducer(resumed, { type: "undo-verify", requestId: 402, attempt: 0, outcome: "success", at: 4000 });
  assert.equal(verified.saved.body, "用户的正文");
  assert.equal(verified.draft.body, "等待撤销时保留的草稿");
});
test("verified failed undo can be retried before expiry while a late first-attempt result cannot own the retry", () => {
  const resumed = resumeEditState(plain(interruptedUndo()));
  const failed = editReducer(resumed, { type: "undo-verify", requestId: 402, attempt: 1, outcome: "failure", at: 4000 });
  assert.equal(failed.undoStatus, "failure");
  assert.equal(failed.saved.body, "第二个已保存版本");
  assert.equal(failed.draft.body, "等待撤销时保留的草稿");
  const retry = editReducer(failed, { type: "undo-request", at: 5000 });
  assert.equal(retry.undo.attempt, 2);
  const old = editReducer(retry, { type: "undo-result", requestId: 402, attempt: 1, outcome: "success", at: 6000 });
  assert.equal(old.undoStatus, "pending");
  assert.equal(old.saved.body, "第二个已保存版本");
  assert.equal(old.ignoredResponses, 1);
  const resolved = editReducer(old, { type: "undo-result", requestId: 402, attempt: 2, outcome: "success", at: 7000 });
  assert.equal(resolved.undoStatus, "success");
  assert.equal(resolved.saved.body, "用户的正文");
  assert.equal(resolved.draft.body, "等待撤销时保留的草稿");
});
test("verification of a failed undo after expiry releases editing while retaining the completed save", () => {
  const resumed = resumeEditState(plain(interruptedUndo()));
  const expired = editReducer(resumed, { type: "undo-verify", requestId: 402, attempt: 1, outcome: "failure", at: 17000 });
  assert.equal(expired.undoStatus, "expired");
  assert.equal(expired.saved.body, "第二个已保存版本");
  assert.equal(expired.draft.body, "等待撤销时保留的草稿");
  assert.equal(editReducer(expired, { type: "undo-request", at: 18000 }), expired);
  const continued = editReducer(expired, { type: "change", key: "body", value: "过期后继续编辑" });
  assert.equal(continued.draft.body, "过期后继续编辑");
  assert.equal(editReducer(continued, { type: "submit", id: 403, action: "save" }).status, "saving");
});
test("Node-only permission fixture projects one allowed DTO and no restricted field reaches public payload", async () => {
  const { projectResources, fixtureSecretMarkers } = await import("./fixtures/permissions.mjs");
  const dto = projectResources();
  assert.ok(dto.every((row) => !Object.hasOwn(row, "privateReview")));
  assert.deepEqual(projectResources("none"), []);
  assert.deepEqual(JSON.parse(read("apps/docs/src/patterns/authorized-resources.json")).rows, dto);
  const publicPayload = read("apps/docs/public/authorized-resources.json") + read("apps/docs/public/catalog.json");
  for (const marker of fixtureSecretMarkers()) assert.ok(!publicPayload.includes(marker));
  for (const name of ["collection", "detail"]) {
    const source = read(`apps/docs/src/patterns/${name}.tsx`);
    assert.ok(source.includes('from "./state"'));
    assert.ok(!source.includes("permissions.mjs"));
  }
});

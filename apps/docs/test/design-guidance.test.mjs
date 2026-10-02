import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../src/lib/design-guidance.ts", import.meta.url), "utf8");
const context = { exports: {} };
runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, context);
const { designFor } = context.exports;
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

import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

let server, designFor;
before(async () => {
  server = await createServer({ root: fileURLToPath(new URL("..", import.meta.url)), server: { middlewareMode: true, hmr: false }, appType: "custom", logLevel: "error" });
  ({ designFor } = await server.ssrLoadModule("/src/lib/design-guidance.ts"));
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

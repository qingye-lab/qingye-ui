import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "vite";
import { fileURLToPath } from "node:url";
let server,fixture;
before(async () => { server = await createServer({ root:fileURLToPath(new URL("..",import.meta.url)),server:{middlewareMode:true,hmr:false,ws:false},appType:"custom",logLevel:"error" }); fixture = await server.ssrLoadModule("/test/fixtures/website-contracts.tsx"); });
after(async () => { await server?.close(); });
test("current guides and registry components resolve in both route trees; removed business paths recover through not-found",() => {
  for (const prefix of ["","/en"]) for (const path of ["/",...fixture.GUIDES.map(page => page.path),...fixture.components.map(item => `/docs/components/${item.slug}`),"/examples","/examples/filter-bar"]) {
    const matches = fixture.routeMatches(prefix + (prefix && path === "/" ? "" : path));
    assert.ok(matches,path); assert.notEqual(matches.at(-1).route.path,"*",path);
  }
  for (const path of ["/docs/patterns/edit","/docs/patterns/detail/r1","/en/docs/missing"]) assert.equal(fixture.routeMatches(path).at(-1).route.path,"*");
});
test("search uses actual content identities, ranks component names, and requires every query term",() => {
  const zh = fixture.searchEntries(); const en = fixture.searchEntries("en");
  assert.deepEqual(en.map(entry => entry.id),zh.map(entry => entry.id));
  assert.ok(en.every(entry => entry.value.startsWith("/en/")));
  assert.equal(en.filter(entry => entry.id.includes("/patterns/")).length,0);
  const ranked = en.map(entry => ({ entry,rank:fixture.score(entry,"input group") })).filter(item => item.rank > 0).sort((a,b) => b.rank-a.rank);
  assert.equal(ranked[0].entry.id,"/docs/components/input-group");
  assert.equal(fixture.score(ranked[0].entry,"input qqzznonexistent"),0);
});
test("homepage exposes one destination per current component without mounting a fake control gallery",() => {
  const markup = fixture.homeMarkup("en");
  assert.equal([...markup.matchAll(/data-component="/g)].length,fixture.components.length);
  for (const item of fixture.components) assert.ok(markup.includes(`href="/en/docs/components/${item.slug}"`),item.slug);
  assert.doesNotMatch(markup,/<input|<select|<textarea|aria-label="发送邀请"/);
});
test("English philosophy has six stable method anchors and translated body, without displaying provenance metadata",() => {
  const markup = fixture.methodsMarkup("en");
  for (let index=1;index<=6;index++) assert.equal([...markup.matchAll(new RegExp(`id="method-${index}"`,"g"))].length,1);
  assert.match(markup,/Begin with use/); assert.match(markup,/Nanjing University of Chinese Medicine Museum/);
  assert.doesNotMatch(markup,/qingye:translation-source|怎样让数字界面/);
  const zh = fixture.methodsMarkup("zh"); assert.match(zh,/从使用出发/);
});

test("English AI adoption consumes the authored English guide and keeps localized resource destinations", () => {
  const entry = fixture.designEntryFor("en");
  assert.match(entry.agents,/AGENTS|Qingye|qingye/); assert.match(entry.guide,/Semantic fidelity/);
  assert.doesNotMatch(entry.agents,/界面任务|设计指南/);
  const markup = fixture.aiMarkup();
  assert.match(markup,/Bring methods and facts to AI/); assert.match(markup,/href="\/design.en.md"/); assert.match(markup,/href="\/ai\/SKILL.en.md"/); assert.match(markup,/href="\/en\/docs\/installation"/);
  assert.match(markup,/Make project guidance persistent/); assert.doesNotMatch(markup,/让项目引用持续生效|把方法与事实交给 AI/);
});

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
test("homepage: three things only (motto and positioning, the fifteen method names linked to their anchors, installation), no component specimens",async () => {
  const { readFileSync } = await import("node:fs");
  const guide = readFileSync(new URL("../../../design.md",import.meta.url),"utf8").replaceAll("*","");
  for (const locale of ["en","zh"]) {
    const markup = fixture.homeMarkup(locale); const prefix = locale === "en" ? "/en" : "";
    const unescape = text => text.replaceAll("&quot;","\"").replaceAll("&#x27;","'");
    assert.equal([...markup.matchAll(/<h1[ >]/g)].length,1);
    // 三件事：总纲与定位、两组名录、开始使用，各是一个有名字的区块。
    assert.equal([...markup.matchAll(/<section[ >]/g)].length,4);
    for (const path of ["/docs/installation","/docs/design-philosophy","/docs/ai"]) assert.ok(markup.includes(`href="${prefix}${path}"`),path);
    // 十五法：一个真正的列表里恰好十五个链接，依次指向理念页里各自的锚点，法名取自同一份名录。
    const anchors = [...markup.matchAll(/href="[^"]*\/docs\/design-philosophy#method-(\d+)"/g)].map(match => Number(match[1]));
    assert.deepEqual(anchors,Array.from({ length:15 },(_,index) => index + 1));
    const lists = [...markup.matchAll(/<ul[ >][\s\S]*?<\/ul>/g)].map(match => match[0]);
    assert.deepEqual(lists.map(list => [...list.matchAll(/<li[ >]/g)].length),[6,9]);
    const names = [...markup.matchAll(/<a [^>]*design-philosophy#method-\d+"[^>]*>([^<]+)</g)].map(match => unescape(match[1]));
    assert.equal(names.length,15); assert.equal(new Set(names).size,15);
    // 首页不再带每法的设计决定与出处，也没有安装方式的切换。
    assert.doesNotMatch(markup,/home-method-(source|decision)/); assert.doesNotMatch(markup,/role="tab"/);
    // 项目定位的第一句是 design.md 开篇第一句（取法来源），不另写。
    const lede = unescape(markup.match(/class="[^"]*\bhome-intro-lede\b[^"]*">([^<]+)</)?.[1] ?? ""); assert.ok(lede && guide.includes(lede.replace(/[。.]$/,"")),`positioning must quote design.md: ${lede}`);
    for (const slot of ["checkbox","input","select-trigger","switch","card"]) assert.doesNotMatch(markup,new RegExp(`data-slot="${slot}"`),slot);
    assert.doesNotMatch(markup,/type="search"/);
    assert.match(markup,/pnpm add @qingye_lab\/ui</); assert.doesNotMatch(markup,/gh release download|Tarball|tgz/);
  }
  assert.match(fixture.homeMarkup("zh"),/<h1[^>]*>[\s\S]*器用为本[\s\S]*关系为法[\s\S]*合宜为度[\s\S]*<\/h1>/);
  assert.match(fixture.homeMarkup("en"),/<h1[^>]*>[\s\S]*Purpose first\.[\s\S]*Relations as method\.[\s\S]*Fitness as measure\.[\s\S]*<\/h1>/);
});
test("philosophy keeps fifteen stable method anchors, links every citation to its note in the source list, and shows no provenance metadata",() => {
  const markup = fixture.methodsMarkup("en");
  assert.match(markup,/Begin with use/); assert.match(markup,/Nanjing University of Chinese Medicine Museum/);
  assert.doesNotMatch(markup,/qingye:translation-source|怎样让数字界面/);
  const zh = fixture.methodsMarkup("zh"); assert.match(zh,/从使用出发/);
  for (const page of [markup,zh]) {
    for (let index=1;index<=15;index++) assert.equal([...page.matchAll(new RegExp(`id="method-${index}"`,"g"))].length,1,`method-${index}`);
    for (let index=1;index<=13;index++) {
      assert.equal([...page.matchAll(new RegExp(`id="note-${index}"`,"g"))].length,1,`note ${index}`);
      assert.match(page,new RegExp(`href="#note-${index}"[^>]*>${index}<`),`citation ${index}`);
    }
    assert.match(page,/id="sources"/);
    assert.doesNotMatch(page,/〔\d+〕/);
  }
});

test("English AI adoption consumes the authored English guide and keeps localized resource destinations", () => {
  const entry = fixture.designEntryFor("en");
  assert.match(entry.agents,/AGENTS|Qingye|qingye/); assert.match(entry.guide,/Semantic fidelity/);
  assert.doesNotMatch(entry.agents,/界面任务|设计指南/);
  const markup = fixture.aiMarkup();
  assert.match(markup,/Using AI/); assert.match(markup,/href="\/design.en.md"/); assert.match(markup,/href="\/ai\/SKILL.en.md"/); assert.match(markup,/href="\/en\/docs\/installation"/);
  assert.match(markup,/Add to a project/); assert.doesNotMatch(markup,/接入项目|AI 使用/);
});

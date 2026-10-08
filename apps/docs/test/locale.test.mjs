import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

let server;
let fixture;
before(async () => {
  server = await createServer({ root: fileURLToPath(new URL("..", import.meta.url)), server: { middlewareMode: true, hmr: false, ws: false }, appType: "custom", logLevel: "error" });
  fixture = await server.ssrLoadModule("/test/fixtures/locale-render.tsx");
});
after(async () => { await server?.close(); });

test("both route trees match every guide and all current components, aliases and simple compositions", () => {
  for (const locale of ["zh", "en"]) for (const path of fixture.knownPaths) {
    const url = fixture.paths.localePath(path, locale);
    const matches = fixture.routeMatches(url);
    assert.ok(matches, url);
    assert.notEqual(matches.at(-1).route.path, "*", url);
  }
  const missing = fixture.routeMatches("/en/docs/missing");
  assert.equal(missing[0].route.path, "/en");
  assert.equal(missing.at(-1).route.path, "*");
  assert.equal(fixture.thirdLanguage.code, "fr-CA");
});

test("locale URLs retain the existing Chinese tree and preserve page, query, and fragment", () => {
  const { paths: p } = fixture;
  assert.equal(p.componentPath("button", "en"), "/en/docs/components/button");
  assert.equal(fixture.siteUrl("/docs/components/button", "en"), "https://ui.xflux.cc/en/docs/components/button");
  assert.equal(p.localePath("/docs/installation?mode=test#providers", "en"), "/en/docs/installation?mode=test#providers");
  assert.equal(p.localePath("/en/docs/components/button", "en"), "/en/docs/components/button");
  assert.equal(p.languageSwitchTarget({ pathname: "/en/components/button", search: "?view=code", hash: "#usage" }, "zh"), "/components/button?view=code#usage");
  assert.equal(p.languageSwitchTarget({ pathname: "/missing", search: "", hash: "" }, "en"), "/en/missing");
  assert.equal(p.routeIdentity("/en/components/button/?q=x#usage"), "/docs/components/button");
  assert.equal(p.splitLocalePath("/english").locale, "zh");
  assert.equal(p.splitLocalePath("/en/").locale, "en");
  for (const href of ["/design.md", "/ai/SKILL.md", "/examples/mail.jpg", "https://example.com/docs", "//example.com/docs", "#usage", "../mail"]) {
    assert.equal(p.localePath(href, "en"), href);
  }
});

test("metadata falls back per field, including a demo with no Chinese description", () => {
  const { localizedMeta, mixed } = fixture;
  assert.equal(localizedMeta(mixed[0], "zh").title, "按钮 Button");
  assert.equal(localizedMeta(mixed[0], "en").description, "[W4.2 fixture] Button description");
  assert.equal(localizedMeta(mixed[1], "en").title, "输入框 Input");
  assert.equal(localizedMeta(mixed[2], "en").description, "选择中文说明");
  assert.equal(localizedMeta(mixed[3], "en").title, "文本域 Textarea");
  assert.equal(localizedMeta(mixed[3], "en").description, "[W4.3 fixture] Textarea description");
  assert.equal(localizedMeta({ title: "演示", descriptionEn: "[W4.2 fixture] Demo description" }, "en").description, "[W4.2 fixture] Demo description");
  assert.equal(localizedMeta({ title: "演示" }, "en").description, undefined);
  assert.equal(mixed[0].title, "按钮 Button");
});

test("reference metadata projects partial English coverage without mutating the source", () => {
  const { localizedMeta, referenceMeta: source } = fixture;
  const before = structuredClone(source);
  const en = localizedMeta(source, "en");
  assert.equal(en.api[0].description, "根部件中文", "blank part translation falls back alongside a translated sibling");
  assert.equal(en.api[1].description, "Trigger description", "a translated API part must reach the projection");
  assert.equal(en.api[0].props[0].description, "Controlled `value`");
  assert.equal(en.api[0].props[1], source.api[0].props[1]);
  assert.equal(en.api[0].props[2].description, "渲染中文");
  assert.equal(en.api[2], source.api[2], "untranslated parts and their props retain identity");
  assert.equal(en.keyboard[0].description, "Activate the trigger");
  assert.equal(en.keyboard[1], source.keyboard[1]);
  assert.equal(en.keyboard[3].description, "关闭中文");
  assert.notEqual(en.api, source.api);
  assert.notEqual(en.keyboard, source.keyboard);
  assert.equal(Object.hasOwn(en.api[1], "props"), false);
  assert.deepEqual(source, before);
  assert.equal(localizedMeta(source, "zh"), source, "Chinese must return the same source object");
});

test("notesEn stays parallel through a blank middle entry, a short tail, and missing slots", () => {
  const { localizedMeta, referenceMeta: source } = fixture;
  const en = localizedMeta(source, "en");
  assert.deepEqual(en.notes, ["First note", "中间中文", "Third `note`", "第四条中文", "末条中文"]);
  assert.equal(en.notes.length, source.notes.length, "partial translation must never drop or shift a note");
  for (const notesEn of [[], ["First note"], ["First note", , "Third note"], ["First note", "", "Third note", "Fourth note", "Last note", "Extra note"]]) {
    const projected = localizedMeta({ ...source, notesEn }, "en").notes;
    assert.equal(projected.length, source.notes.length);
    source.notes.forEach((note, index) => assert.equal(projected[index], notesEn[index]?.trim() ? notesEn[index] : note));
  }
  const { notesEn, ...untranslated } = source;
  assert.equal(localizedMeta(untranslated, "en").notes, source.notes);
  const { notes, ...noNotes } = source;
  assert.equal(Object.hasOwn(localizedMeta(noNotes, "en"), "notes"), false);
});

test("all blank English fields fall back and untranslated reference arrays retain identity", () => {
  const { localizedMeta, referenceMeta } = fixture;
  for (const blank of ["", " \n\t"]) {
    const source = {
      ...referenceMeta, titleEn: blank, descriptionEn: blank, decisionsEn: blank,
      api: referenceMeta.api.map(part => ({ ...part, descriptionEn: blank,
        ...(part.props ? { props: part.props.map(prop => ({ ...prop, descriptionEn: blank })) } : {}),
      })),
      keyboard: referenceMeta.keyboard.map(row => ({ ...row, descriptionEn: blank })),
      notesEn: referenceMeta.notes.map(() => blank),
    };
    const en = localizedMeta(source, "en");
    assert.equal(en.title, source.title);
    assert.equal(en.description, source.description);
    assert.equal(en.decisions, source.decisions);
    assert.equal(en.api, source.api);
    assert.equal(en.keyboard, source.keyboard);
    assert.deepEqual(en.notes, source.notes);
    assert.equal(en.notes.length, source.notes.length);
    assert.deepEqual(fixture.componentLabel({ ...referenceMeta, titleEn: blank }, "en"), { title: "参考夹具", hint: "ReferenceFixture" });
  }
  const source = { title: "标题", api: [{ name: "Root", description: "说明" }], keyboard: [{ keys: "Enter", description: "行为" }] };
  const en = localizedMeta(source, "en");
  assert.equal(en.api, source.api);
  assert.equal(en.keyboard, source.keyboard);
  assert.equal(Object.hasOwn(en.api[0], "props"), false);
  const sparse = localizedMeta({ title: "演示", descriptionEn: " ", decisionsEn: " " }, "en");
  for (const key of ["description", "decisions", "api", "keyboard", "notes"]) assert.equal(Object.hasOwn(sparse, key), false, key);
  const unchanged = { ...source, api: [{ ...source.api[0], descriptionEn: source.api[0].description }] };
  assert.equal(localizedMeta(unchanged, "en").api, unchanged.api);
});

test("English component reference renders translated content, labels, and the section order", async () => {
  const en = await fixture.renderDecisionPage("en", fixture.referenceMeta.slug);
  const headings = [...en.matchAll(/<h2\b[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)];
  assert.deepEqual(headings.map(match => match[1]), ["examples", "decisions", "import", "api", "keyboard", "notes"]);
  ["Examples", "Decisions", "Import", "API", "Keyboard interactions", "Usage notes"].forEach((label, index) => assert.ok(headings[index][2].includes(`>${label}</span>`), label));
  // Synthesized category defaults stay in the catalog; the page shows authored sections and stated facts only.
  assert.doesNotMatch(en, /Do not substitute styling for semantics|id="when"|id="state"|<dt>Layer<\/dt>|<dt>Methods<\/dt>/);
  assert.match(en, /<dt>Exports<\/dt><dd[^>]*>1<\/dd>/);
  for (const header of ["Prop", "Type", "Default", "Description", "Key", "Action"]) assert.match(en, new RegExp(`<th\\b[^>]*>${header}</th>`));
  assert.match(en, /aria-label="None"[^>]*>—<\/span>/);
  assert.match(en, /Import from the component entry to bundle just this file:/);
  assert.match(en, /href="\/en\/docs\/installation#per-component"[^>]*>Installation<\/a>/);
  for (const text of ["Trigger description", "根部件中文", "禁用中文", "First note", "中间中文", "第四条中文", "末条中文", "Activate the trigger", "前一个中文", "关闭中文"]) assert.ok(en.includes(text), text);
  assert.match(en, /Controlled <code\b[^>]*>value<\/code>/);
  assert.match(en, /Third <code\b[^>]*>note<\/code>/);
  const keyboard = en.slice(en.indexOf('id="keyboard"'), en.indexOf('id="notes"'));
  assert.deepEqual([...keyboard.matchAll(/<kbd\b[^>]*>([^<]+)<\/kbd>/g)].map(match => match[1]), ["Enter", "Space", "Shift", "Tab", "ArrowUp", "ArrowDown", "Escape"]);
  assert.equal([...keyboard.matchAll(/>or<\/span>/g)].length, 2);
  assert.equal([...keyboard.matchAll(/>\+<\/span>/g)].length, 1);
  assert.doesNotMatch(keyboard, />或<\/span>/);
  assert.match(en, /No examples yet/);
  assert.match(en, /href="\/en\/docs\/components"[^>]*>Browse other components<\/a>/);

  const zh = await fixture.renderDecisionPage("zh", fixture.referenceMeta.slug);
  for (const header of ["属性", "类型", "默认值", "说明", "按键", "行为"]) assert.match(zh, new RegExp(`<th\\b[^>]*>${header}</th>`));
  assert.match(zh, /aria-label="无"[^>]*>—<\/span>/);
  assert.match(zh, />或<\/span>/);
  assert.match(zh, /暂无示例/);
  assert.match(zh, /触发部件中文/);
  assert.doesNotMatch(zh, /Trigger description|First note/);
});

test("component not-found details and failed-demo titles follow the route locale", async () => {
  assert.match(await fixture.renderDecisionPage("en", "missing-fixture"), /No component documentation found for “missing-fixture”\./);
  assert.match(await fixture.renderDecisionPage("zh", "missing-fixture"), /没有名为 “missing-fixture” 的组件文档。/);
  assert.match(await fixture.renderFailedDemoPage("en"), /Examples could not be loaded/);
  assert.match(await fixture.renderFailedDemoPage("zh"), /示例暂时无法加载/);
});

test("design methods and synthesized guidance select English while the catalog default stays Chinese", () => {
  const { designFor, methodsFor, METHODS, referenceMeta } = fixture;
  const names = ["Name matches substance （名实相符）", "Complementary roles and safeguards （相成相制）", "Space supports the task （布白有用）", "Adapt to context （随境取度）", "Purposeful progressive disclosure （展开有据）", "Continuity through change （进退相承）"];
  assert.equal(methodsFor(), METHODS);
  assert.equal(methodsFor("zh"), METHODS);
  assert.deepEqual(methodsFor("en").map(method => method.name), names);
  const page = fixture.renderMethodsPage("en");
  const pageText = page.replace(/<[^>]*>/g, "");
  const philosophy = readFileSync(new URL("../src/public-content/philosophy.en.md", import.meta.url), "utf8");
  const headings = [...philosophy.matchAll(/^## (\d{2})\s+(.+)$/gm)];
  assert.equal(headings.length, 15);
  for (const [, number, heading] of headings) {
    assert.ok(pageText.includes(heading), heading);
    assert.ok(page.includes(`id="method-${Number(number)}"`), `method-${Number(number)}`);
  }
  assert.match(page, /Download design\.md/);
  for (const category of ["通用", "表单", "浮层"]) {
    const meta = { ...referenceMeta, category };
    const en = designFor(meta, meta.slug, "en");
    assert.deepEqual(en.whenToUse, ["Reference description"]);
    assert.deepEqual(en.composition, ["FixtureRoot: 根部件中文", "FixtureTrigger: Trigger description", "FixtureContent: 内容部件中文"]);
    for (const sentences of [en.avoid, en.stateOwner.library, en.stateOwner.application, en.responsive, en.customization]) {
      assert.ok(sentences.length > 0);
      for (const sentence of sentences) assert.doesNotMatch(sentence, /[\u3400-\u9fff]/);
    }
    assert.deepEqual(designFor(meta, meta.slug), designFor(meta, meta.slug, "zh"));
    assert.deepEqual(designFor({ ...meta, descriptionEn: " " }, meta.slug, "en").whenToUse, [meta.description]);
  }
  assert.deepEqual(designFor(referenceMeta, referenceMeta.slug).methods, ["名实相符", "相成相制", "随境取度"]);
  assert.match(designFor(referenceMeta, referenceMeta.slug).responsive[0], /窄容器/);
  for (const slug of ["button", "table", "data-table", "toast", "theme-provider"]) {
    const en = designFor(referenceMeta, slug, "en");
    for (const sentence of [...en.whenToUse, ...en.avoid, ...en.stateOwner.application]) assert.doesNotMatch(sentence, /[\u3400-\u9fff]/);
    const explicit = { avoid: ["组件专属判断"], methods: ["展开有据"], stateOwner: { library: ["库状态"], application: ["业务结果"] } };
    const actual = designFor({ ...referenceMeta, design: explicit }, slug, "en");
    assert.equal(actual.avoid, explicit.avoid);
    assert.equal(actual.stateOwner, explicit.stateOwner);
    assert.deepEqual(actual.methods, [names[4]]);
  }
});

test("translated decisions reach the English component page without changing Chinese metadata", async () => {
  const { localizedMeta, pageDecisionsFor, mixed, renderDecisionPage } = fixture;
  assert.equal(localizedMeta(mixed[0], "en").decisions, "[W4.3 fixture] Button decision");
  assert.equal(pageDecisionsFor(mixed[0], "en"), "[W4.3 fixture] Button decision");
  assert.equal(pageDecisionsFor(localizedMeta(mixed[0], "en")), "[W4.3 fixture] Button decision");
  assert.equal(localizedMeta(mixed[0], "zh"), mixed[0]);
  assert.equal(mixed[0].decisions, "按钮中文判断");
  const en = await renderDecisionPage("en", "button");
  assert.match(en, /id="decisions"/);
  assert.match(en, /\[W4\.3 fixture\] Button decision/);
  assert.doesNotMatch(en, /按钮中文判断/);
  const zh = await renderDecisionPage("zh", "button");
  assert.match(zh, /按钮中文判断/);
  assert.doesNotMatch(zh, /\[W4\.3 fixture\] Button decision/);
});

test("absent decisionsEn preserves Chinese decisions and leaves an absent decisions key absent", async () => {
  const { localizedMeta, pageDecisionsFor, mixed, renderDecisionPage } = fixture;
  assert.equal(localizedMeta(mixed[1], "en").decisions, "输入框中文判断");
  assert.equal(pageDecisionsFor(mixed[1], "en"), "输入框中文判断");
  assert.equal(pageDecisionsFor(mixed[2], "en"), "选择中文判断");
  assert.equal(Object.hasOwn(localizedMeta({ title: "演示" }, "en"), "decisions"), false);
  for (const slug of ["input", "select"]) {
    const html = await renderDecisionPage("en", slug);
    assert.match(html, /id="decisions"/);
    assert.ok(html.includes(slug === "input" ? "输入框中文判断" : "选择中文判断"));
  }
});

test("empty or whitespace-only decisionsEn cannot hide a Chinese decision", async () => {
  const { localizedMeta, pageDecisionsFor, mixed, renderDecisionPage } = fixture;
  assert.equal(localizedMeta(mixed[3], "en").decisions, "文本域中文判断");
  assert.equal(pageDecisionsFor(mixed[3], "en"), "文本域中文判断");
  assert.equal(localizedMeta({ ...mixed[3], decisionsEn: " \n\t" }, "en").decisions, "文本域中文判断");
  assert.equal(Object.hasOwn(localizedMeta({ title: "演示", decisionsEn: "" }, "en"), "decisions"), false);
  const html = await renderDecisionPage("en", "textarea");
  assert.match(html, /id="decisions"/);
  assert.match(html, /文本域中文判断/);
  assert.match(html, /\[W4\.3 fixture\] Textarea description/);
});

test("nav, search, breadcrumbs and neighbours share translated metadata and content identity", () => {
  const { navSections, searchEntries, neighbours, breadcrumbs, score } = fixture;
  const nav = navSections("en").flatMap((section) => section.items);
  assert.equal(nav.find((item) => item.path.endsWith("/button")).title, "[W4.2 fixture] Button");
  assert.equal(nav.find((item) => item.path.endsWith("/input")).title, "输入框");
  assert.ok(nav.every((item) => item.path.startsWith("/en/")));
  const en = searchEntries("en");
  const zh = searchEntries("zh");
  const button = en.find((item) => item.id.endsWith("/button"));
  assert.equal(button.title, "[W4.2 fixture] Button");
  assert.ok(score(button, "Button description") > 0);
  assert.ok(en.every((item) => item.value.startsWith("/en/")));
  assert.deepEqual(en.map((item) => item.id), zh.map((item) => item.id));
  const crumbs = breadcrumbs("/en/components/button");
  assert.equal(crumbs[0].title, "[W4.2 fixture] Introduction");
  assert.equal(crumbs.at(-1).title, "[W4.2 fixture] Button");
  const { prev, next } = neighbours("/en/components/input");
  assert.equal(prev.title, "[W4.2 fixture] Button");
  assert.equal(next.title, "[W4.2 fixture] Select");
  assert.equal(prev.path, "/en/docs/components/button");
  assert.equal(next.path, "/en/docs/components/select");
  assert.deepEqual(neighbours("/en/docs/missing"), {});
});

test("a half-translated site actually renders the mixed catalog, nav, breadcrumb, pager, and demos", () => {
  const en = fixture.renderMixed("en", "/en/components/input");
  assert.match(en, /\[W4\.2 fixture\] Button/);
  assert.match(en, /\[W4\.2 fixture\] General/);
  assert.match(en, /输入框中文说明/);
  assert.match(en, /选择中文说明/);
  assert.match(en, /文本域/);
  assert.match(en, /\[W4\.3 fixture\] Textarea description/);
  assert.match(en, /\[W4\.2 fixture\] Demo description/);
  assert.match(en, /未翻译演示说明/);
  assert.match(en, /aria-current="page"[^>]*href="\/en\/components\/input"/);
  assert.match(en, /rel="prev"[^>]*href="\/en\/docs\/components\/button"/);
  assert.match(en, /href="\/en\/docs\/installation\?mode=test#providers"/);
  assert.match(en, /apps\/docs\/src\/content\/input\/meta.ts/);
  const zh = fixture.renderMixed("zh");
  assert.match(zh, /按钮中文说明/);
  assert.match(zh, /演示中文标题/);
  assert.doesNotMatch(zh, /\[W4\.2 fixture\]/);
});

test("scroll visit identity includes locale and history entry while aliases refer to the same content", () => {
  const { paths: p } = fixture;
  assert.equal(p.routeVisitKey("/en/components/button"), p.routeVisitKey("/en/docs/components/button"));
  assert.notEqual(p.scrollPositionKey("same", "/en/components/button"), p.scrollPositionKey("same", "/components/button"));
  assert.notEqual(p.scrollPositionKey("a", "/en/components/button"), p.scrollPositionKey("b", "/en/components/button"));
});

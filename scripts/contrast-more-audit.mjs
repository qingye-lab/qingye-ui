// `prefers-contrast: more` evidence: the ink ladder moves up one step, nothing else moves.
//
//   DOCS_URL=http://localhost:5180 node scripts/contrast-more-audit.mjs [--only light,dark] [--report file.json]
//   (--slugs a,b limits the --snapshot / --normal-compare / --forced-compare modes to those playgrounds)
//   DOCS_URL=... node scripts/contrast-more-audit.mjs --snapshot dir        # ordinary mode, one PNG per playground x theme
//   DOCS_URL=... node scripts/contrast-more-audit.mjs --normal-compare dir  # ordinary mode vs a snapshot taken before the change,
//                                                                           # and vs the same page with the contrast rules deleted
//   DOCS_URL=... node scripts/contrast-more-audit.mjs --forced-compare      # forced-colors: active, with and without contrast: more
//
// Default run (the matrix): for a set of representative parts it reads computed colours in two contexts of the
// same browser, `contrast: 'no-preference'` and `contrast: 'more'` (Playwright's emulation of the
// `prefers-contrast` media feature, supported since playwright-core 1.51; 1.63 here), composites them over the
// real backdrop, and prints the WCAG ratio before and after. Computed styles are the measurement, not source
// tokens: a role that is in the cascade but does not change a computed colour is a FAIL.
//
// Three more checks run with the matrix: the three theme axes still compose (a brand's `--qy-primary` override
// survives; `.dark` and `data-theme` give the same colours), and the ladder atoms read what the stylesheet says.
//
// Every cell is PASS / FAIL / UNVERIFIED. Exit code 1 on any FAIL or on a run failure. This measures Chromium's
// emulation of the media feature, not an operating-system "increase contrast" setting; the stylesheet only reads
// the media feature, so the emulation exercises the same branch.
import { mkdirSync, readdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const args = process.argv.slice(2);
const valueFlags = new Set(["--only", "--report", "--snapshot", "--normal-compare", "--slugs"]);
const boolFlags = new Set(["--forced-compare"]);
for (let i = 0; i < args.length; i++) {
  if (!args[i].startsWith("--")) throw new Error(`unexpected argument: ${args[i]}`);
  if (boolFlags.has(args[i])) continue;
  if (!valueFlags.has(args[i])) throw new Error(`unknown flag: ${args[i]}`);
  if (!args[i + 1] || args[i + 1].startsWith("--")) throw new Error(`missing value for ${args[i]}`);
  i++;
}
const flag = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const hasFlag = (name) => args.includes(name);
const base = process.env.DOCS_URL ?? "http://localhost:5180";
const themes = (flag("--only") ?? "light,dark").split(",");
if (themes.some((t) => !["light", "dark"].includes(t))) throw new Error(`unknown theme: ${flag("--only")}`);
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
const launch = () => chromium.launch(executablePath ? { executablePath } : {});
const viewport = { width: 1100, height: 900 };
const contentDir = fileURLToPath(new URL("../apps/docs/src/content", import.meta.url));
const allSlugs = () => (flag("--slugs")?.split(",") ?? readdirSync(contentDir, { withFileTypes: true }).filter((d) => d.isDirectory() && !d.name.startsWith(".")).map((d) => d.name).sort());

// ---------------------------------------------------------------- pixels ----
async function decode(decoder, png) {
  const raw = await decoder.evaluate(async (b64) => {
    const image = new Image();
    image.src = `data:image/png;base64,${b64}`;
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = image.width; canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    const { data } = ctx.getImageData(0, 0, image.width, image.height);
    let bin = ""; for (let i = 0; i < data.length; i += 0x8000) bin += String.fromCharCode(...data.subarray(i, i + 0x8000));
    return { w: image.width, h: image.height, b64: btoa(bin) };
  }, png.toString("base64"));
  return { w: raw.w, h: raw.h, data: Buffer.from(raw.b64, "base64") };
}
async function diffPixels(decoder, a, b) {
  if (a.equals(b)) return 0;
  const [sa, sb] = [await decode(decoder, a), await decode(decoder, b)];
  if (sa.w !== sb.w || sa.h !== sb.h) return -1;
  let diff = 0;
  for (let i = 0; i < sa.data.length; i += 4) if (sa.data[i] !== sb.data[i] || sa.data[i + 1] !== sb.data[i + 1] || sa.data[i + 2] !== sb.data[i + 2]) diff++;
  return diff;
}

async function openPlayground(page, slug, theme) {
  await page.goto(`${base}/playground/${slug}?theme=${theme}`, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForFunction(() => document.querySelector("[data-playground] [data-demo]") || document.querySelector('[data-slot="empty"][data-state="empty"]'), undefined, { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(350);
}

/** Serialized into the page: removes every `prefers-contrast` media rule (the library's whole contribution). */
function stripContrastRules() {
  let removed = 0;
  const walk = (parent) => {
    const list = parent.cssRules;
    for (let i = list.length - 1; i >= 0; i--) {
      const rule = list[i];
      if (rule instanceof CSSMediaRule && /prefers-contrast/.test(rule.conditionText)) { parent.deleteRule(i); removed++; }
      else if (rule.cssRules) walk(rule);
    }
  };
  for (const sheet of document.styleSheets) { try { walk(sheet); } catch { /* cross-origin sheet */ } }
  return removed;
}
/** Serialized into the page: how many `prefers-contrast` media rules the loaded stylesheets hold. */
function countContrastRules() {
  let n = 0;
  const walk = (list) => { for (const rule of list) { if (rule instanceof CSSMediaRule && /prefers-contrast/.test(rule.conditionText)) n++; else if (rule.cssRules) walk(rule.cssRules); } };
  for (const sheet of document.styleSheets) { try { walk(sheet.cssRules); } catch { /* cross-origin */ } }
  return n;
}

// ---------------------------------------------------------- snapshot modes ---
async function snapshot(dir) {
  mkdirSync(dir, { recursive: true });
  const browser = await launch();
  let pages = 0;
  try {
    for (const theme of themes) {
      const context = await browser.newContext({ viewport, colorScheme: theme, reducedMotion: "reduce", deviceScaleFactor: 1, contrast: "no-preference", forcedColors: "none" });
      for (const slug of allSlugs()) {
        const page = await context.newPage();
        try {
          await openPlayground(page, slug, theme);
          writeFileSync(join(dir, `${slug}-${theme}.png`), await page.screenshot({ fullPage: true, animations: "disabled" }));
          pages++;
        } catch (error) { console.log(`ERR ${slug} ${theme}: ${error.message.split("\n")[0]}`); }
        await page.close();
      }
      await context.close();
    }
  } finally { await browser.close(); }
  console.log(`snapshot: ${pages} pages written to ${dir}`);
}

async function normalCompare(dir) {
  const browser = await launch();
  let pages = 0, vsSnapshot = 0, vsStripped = 0, errors = 0, noSnapshot = 0, rules = 0;
  try {
    for (const theme of themes) {
      const context = await browser.newContext({ viewport, colorScheme: theme, reducedMotion: "reduce", deviceScaleFactor: 1, contrast: "no-preference", forcedColors: "none" });
      const decoder = await context.newPage();
      await decoder.goto("about:blank");
      for (const slug of allSlugs()) {
        const page = await context.newPage();
        try {
          await openPlayground(page, slug, theme);
          const a = await page.screenshot({ fullPage: true, animations: "disabled" });
          rules = Math.max(rules, await page.evaluate(countContrastRules));
          const file = join(dir, `${slug}-${theme}.png`);
          if (existsSync(file)) {
            const d = await diffPixels(decoder, a, readFileSync(file));
            if (d !== 0) { vsSnapshot++; console.log(`DIFF vs snapshot ${slug} ${theme}: ${d} px`); }
          } else noSnapshot++;
          await page.evaluate(stripContrastRules);
          await page.waitForTimeout(150);
          const b = await page.screenshot({ fullPage: true, animations: "disabled" });
          const d2 = await diffPixels(decoder, a, b);
          if (d2 !== 0) { vsStripped++; console.log(`DIFF vs rules-deleted ${slug} ${theme}: ${d2} px`); }
          pages++;
        } catch (error) { console.log(`ERR ${slug} ${theme}: ${error.message.split("\n")[0]}`); errors++; }
        await page.close();
      }
      await context.close();
    }
  } finally { await browser.close(); }
  console.log(`normal mode: ${pages} pages; ${vsSnapshot} differ from the snapshot taken before the change (${noSnapshot} without a snapshot); ${vsStripped} differ from the same page with the contrast rules deleted; ${errors} errors; ${rules} prefers-contrast rule(s) loaded`);
  process.exit(vsSnapshot > 0 || vsStripped > 0 || errors > 0 || rules === 0 ? 1 : 0);
}

async function forcedCompare() {
  const browser = await launch();
  let pages = 0, differing = 0, errors = 0, noisy = 0;
  try {
    for (const theme of themes) {
      const shared = { viewport, colorScheme: theme, reducedMotion: "reduce", deviceScaleFactor: 1, forcedColors: "active" };
      const plain = await browser.newContext({ ...shared, contrast: "no-preference" });
      const control = await browser.newContext({ ...shared, contrast: "no-preference" });
      const more = await browser.newContext({ ...shared, contrast: "more" });
      const decoder = await plain.newPage();
      await decoder.goto("about:blank");
      for (const slug of allSlugs()) {
        const trio = [await plain.newPage(), await control.newPage(), await more.newPage()];
        try {
          const shots = [];
          for (const page of trio) { await openPlayground(page, slug, theme); shots.push(await page.screenshot({ fullPage: true, animations: "disabled" })); }
          if (!(await trio[2].evaluate(() => matchMedia("(forced-colors: active)").matches))) throw new Error("forced-colors not active");
          const d = await diffPixels(decoder, shots[0], shots[2]);
          // A page that differs between two identical contexts is nondeterministic (random widths, timers): not evidence either way.
          const noise = d !== 0 ? await diffPixels(decoder, shots[0], shots[1]) : 0;
          pages++;
          if (d !== 0 && noise !== 0) { noisy++; console.log(`NOISE ${slug} ${theme}: ${d} px vs preference, ${noise} px between two identical contexts`); }
          else if (d !== 0) { differing++; console.log(`DIFF ${slug} ${theme}: ${d} px`); }
        } catch (error) { console.log(`ERR ${slug} ${theme}: ${error.message.split("\n")[0]}`); errors++; }
        for (const page of trio) await page.close();
      }
      await plain.close(); await control.close(); await more.close();
    }
  } finally { await browser.close(); }
  console.log(`forced colors: ${pages} pages compared with and without contrast: more, ${differing} differ, ${noisy} nondeterministic (identical contexts differ too), ${errors} errors`);
  process.exit(differing > 0 || errors > 0 ? 1 : 0);
}

if (flag("--snapshot")) { await snapshot(flag("--snapshot")); process.exit(0); }
if (flag("--normal-compare")) await normalCompare(flag("--normal-compare"));
if (hasFlag("--forced-compare")) await forcedCompare();

// ---------------------------------------------------------------- matrix ----
/** Serialized into the page. Colours are read as 8-bit RGBA through a canvas so any CSS colour syntax is accepted. */
function measureInPage(spec) {
  const canvas = document.createElement("canvas"); canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const rgba = (value) => { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = "#000"; ctx.fillStyle = value; ctx.fillRect(0, 0, 1, 1); const d = ctx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
  const over = (f, b) => { const a = f[3] + b[3] * (1 - f[3]); return a ? [0, 1, 2].map((i) => (f[i] * f[3] + b[i] * b[3] * (1 - f[3])) / a).concat(a) : [0, 0, 0, 0]; };
  const effBg = (el) => {
    const chain = [];
    for (let n = el; n; n = n.parentElement) chain.push(getComputedStyle(n).backgroundColor);
    let color = [255, 255, 255, 1];
    for (let i = chain.length - 1; i >= 0; i--) { const c = rgba(chain[i]); if (c[3] > 0) color = over(c, color); }
    return color;
  };
  const find = (sel) => { const list = [...document.querySelectorAll(sel)].filter((el) => el.getClientRects().length); return list[0]; };
  const pixel = (d) => {
    const el = find(d.sel);
    if (!el) return { missing: d.sel };
    const cs = getComputedStyle(el);
    if (d.kind === "border") {
      const side = ["Top", "Bottom", "Left", "Right"].find((k) => parseFloat(cs[`border${k}Width`]) > 0) ?? "Top";
      return { color: over(rgba(cs[`border${side}Color`]), effBg(el.parentElement ?? el)), raw: cs[`border${side}Color`] };
    }
    if (d.kind === "text") return { color: over(rgba(cs.color), effBg(el)), raw: cs.color };
    if (d.kind === "placeholder") { const ph = getComputedStyle(el, "::placeholder"); return { color: over(rgba(ph.color), effBg(el)), raw: ph.color }; }
    if (d.kind === "rule") return { color: over(rgba(cs.backgroundColor), effBg(el.parentElement ?? el)), raw: cs.backgroundColor };
    if (d.kind === "fill") return { color: effBg(el), raw: cs.backgroundColor };
    if (d.kind === "behind") return { color: effBg(el.parentElement), raw: "behind" };
    return { missing: `kind ${d.kind}` };
  };
  const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  return spec.pairs.map((p) => {
    const a = pixel(p.a), b = pixel(p.b);
    if (a.missing || b.missing) return { label: p.label, missing: a.missing ?? b.missing };
    return { label: p.label, a: a.color.slice(0, 3).map(Math.round), b: b.color.slice(0, 3).map(Math.round), ratio: ratio(a.color, b.color) };
  });
}

const hex = (c) => `#${c.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
const P = (label, a, b, o = {}) => ({ label, a, b, ...o });
const behind = (sel) => ({ sel, kind: "behind" });
const border = (sel) => ({ sel, kind: "border" });
const text = (sel) => ({ sel, kind: "text" });
const fill = (sel) => ({ sel, kind: "fill" });
const EDITABLE = "[data-slot=input-control]:not([data-readonly]):not(:has(input:disabled))";
const UNCHECKED = "[data-slot=checkbox][aria-checked=false]:not([data-disabled]):not([data-readonly])";

/**
 * expect "up": the ratio must not fall, and must reach `min` when one is given.
 * expect "floor": the part may move either way (a text on a face that deepens on purpose) but must stay above `min`.
 * expect "same": the part is deliberately held (data encoding, groove) and must not move.
 * `min` 3 = non-text boundary (WCAG 1.4.11), 4.5 = text (1.4.3).
 */
const PROBES = [
  { id: "input", slug: "input", pairs: [
    P("Input 线（重，可编辑）对纸", border(EDITABLE), behind(EDITABLE), { expect: "up", min: 3 }),
    P("Input 值文字对底", text(`${EDITABLE} input`), fill(EDITABLE), { expect: "up", min: 4.5 }),
  ] },
  { id: "input-states", slug: "input", pairs: [
    P("禁用 Input 的线（清）对纸", border("[data-slot=input-control]:has(input:disabled)"), behind("[data-slot=input-control]:has(input:disabled)"), { expect: "up" }),
    P("只读 Input 的线（清）对纸", border("[data-slot=input-control][data-readonly]"), behind("[data-slot=input-control][data-readonly]"), { expect: "up" }),
    P("辅助文字（只读说明）对底", text("[data-slot=input-readonly]"), fill("[data-slot=input-control][data-readonly]"), { expect: "up", min: 4.5 }),
    P("禁用 Input 的文字对其底", text("[data-slot=input-control]:has(input:disabled) input"), fill("[data-slot=input-control]:has(input:disabled)"), { expect: "up", min: 4.5 }),
  ] },
  { id: "placeholder", slug: "search-input", pairs: [
    P("占位字（辅助）对底", { sel: "input[placeholder]", kind: "placeholder" }, fill("[data-slot=input-control]"), { expect: "up", min: 4.5 }),
  ] },
  { id: "button-bordered", slug: "button", pairs: [
    P("bordered 按钮线（淡）对纸", border("button[data-variant=bordered]:not([data-disabled])"), behind("button[data-variant=bordered]:not([data-disabled])"), { expect: "up" }),
    P("bordered 按钮字对底", text("button[data-variant=bordered]:not([data-disabled])"), fill("button[data-variant=bordered]:not([data-disabled])"), { expect: "up", min: 4.5 }),
  ] },
  { id: "button-solid", slug: "button", pairs: [
    P("实心按钮字对填充", text("button[data-variant=solid]:not([data-disabled])"), fill("button[data-variant=solid]:not([data-disabled])"), { expect: "up", min: 4.5 }),
  ] },
  { id: "checkbox", slug: "checkbox", pairs: [
    P("Checkbox 未选边（重）对纸", border(UNCHECKED), behind(UNCHECKED), { expect: "up", min: 3 }),
  ] },
  { id: "segmented-control", slug: "segmented-control", pairs: [
    P("SegmentedControl 选中段面（淡染）对轨道", fill("[data-slot=segmented-control-item][aria-checked=true]"), fill("[data-slot=segmented-control]"), { expect: "up" }),
    P("选中段字对选中面", text("[data-slot=segmented-control-item][aria-checked=true]"), fill("[data-slot=segmented-control-item][aria-checked=true]"), { expect: "floor", min: 4.5 }),
    P("未选段字（辅助）对轨道", text("[data-slot=segmented-control-item][aria-checked=false]:not([data-disabled])"), fill("[data-slot=segmented-control]"), { expect: "up", min: 4.5 }),
    P("轨道线（清）对纸", border("[data-slot=segmented-control]"), behind("[data-slot=segmented-control]"), { expect: "up" }),
  ] },
  { id: "pagination", slug: "pagination", pairs: [
    P("Pagination 当前页面（淡染）对相邻页", fill("[data-slot=pagination-link][aria-current=page]"), behind("[data-slot=pagination-link][aria-current=page]"), { expect: "up" }),
    P("当前页字对其面", text("[data-slot=pagination-link][aria-current=page]"), fill("[data-slot=pagination-link][aria-current=page]"), { expect: "floor", min: 4.5 }),
  ] },
  { id: "progress", slug: "progress", pairs: [
    P("Progress 填充（焦墨）对凹槽", fill("[data-slot=progress-indicator]"), fill("[data-slot=progress-track]"), { expect: "up", min: 3 }),
    P("Progress 凹槽对纸（held）", fill("[data-slot=progress-track]"), behind("[data-slot=progress-track]"), { expect: "same" }),
  ] },
  { id: "meter", slug: "meter", pairs: [
    P("Meter 凹槽对纸（held）", fill("[data-slot=meter-track]"), behind("[data-slot=meter-track]"), { expect: "same" }),
    P("Meter 状态色指示对凹槽（held，状态色是数据编码）", fill("[data-slot=meter][data-tone=warning] [data-slot=meter-indicator]"), fill("[data-slot=meter][data-tone=warning] [data-slot=meter-track]"), { expect: "same", min: 3 }),
  ] },
  { id: "separator", slug: "separator", pairs: [
    P("Separator（清）对纸", border("[data-slot=separator][data-orientation=horizontal]:not([aria-hidden])"), behind("[data-slot=separator][data-orientation=horizontal]:not([aria-hidden])"), { expect: "up" }),
  ] },
  { id: "card", slug: "card", pairs: [
    P("Card 容器线（清）对纸", border("[data-slot=card]"), behind("[data-slot=card]"), { expect: "up" }),
  ] },
  { id: "alert", slug: "alert", pairs: [
    P("Alert 描述（辅助）对柔底", text("[data-slot=alert-description]"), fill("[data-slot=alert]"), { expect: "up", min: 4.5 }),
  ] },
];

const sameNow = (r) => r;
async function readMatrix(context, theme) {
  const page = await context.newPage();
  const out = {};
  for (const probe of PROBES) {
    await openPlayground(page, probe.slug, theme);
    out[probe.id] = await page.evaluate(measureInPage, probe);
  }
  // the ink ladder, as the cascade computed it
  await openPlayground(page, "button", theme);
  out.__atoms = await page.evaluate(() => {
    const cs = getComputedStyle(document.documentElement);
    const o = {};
    for (const k of ["jiao", "nong", "zhong", "dan", "qing"]) o[`ink-${k}`] = cs.getPropertyValue(`--qy-ink-${k}`).trim();
    for (const k of ["qing", "dan"]) o[`wash-${k}`] = cs.getPropertyValue(`--qy-wash-${k}`).trim();
    return o;
  });
  out.__media = await page.evaluate(() => matchMedia("(prefers-contrast: more)").matches);
  await page.close();
  return out;
}

/** Input focus: the border before and after a real Tab, composited over the paper behind the control. */
async function focusDelta(context, theme) {
  const page = await context.newPage();
  await openPlayground(page, "input", theme);
  const selector = EDITABLE;
  const read = () => page.evaluate((sel) => {
    const el = [...document.querySelectorAll(sel)].find((e) => e.getClientRects().length);
    const canvas = document.createElement("canvas"); canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    // paper behind the control: stack every ancestor's background over white
    const chain = []; for (let n = el.parentElement; n; n = n.parentElement) chain.push(getComputedStyle(n).backgroundColor);
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, 1, 1);
    for (let i = chain.length - 1; i >= 0; i--) { ctx.fillStyle = chain[i]; ctx.fillRect(0, 0, 1, 1); }
    ctx.fillStyle = getComputedStyle(el).borderTopColor; ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2]];
  }, selector);
  const rest = await read();
  const input = page.locator(`${selector} input`).first();
  await page.keyboard.press("Shift");
  await input.evaluate((el) => el.focus({ focusVisible: true }));
  await page.waitForTimeout(600);
  const focused = await read();
  await page.close();
  return { rest, focused };
}

/** Brand override under contrast: more, written the way docs/decisions/theme-axes.md prescribes (html[data-brand]). */
async function axes(context, theme) {
  const page = await context.newPage();
  await openPlayground(page, "button", theme);
  const solid = () => page.evaluate(() => {
    const canvas = document.createElement("canvas"); canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.fillStyle = getComputedStyle([...document.querySelectorAll("button[data-variant=solid]")].find((e) => e.getClientRects().length)).backgroundColor; ctx.fillRect(0, 0, 1, 1);
    return Array.from(ctx.getImageData(0, 0, 1, 1).data.slice(0, 3)).join(",");
  });
  const before = await solid();
  await page.evaluate(() => {
    const style = document.createElement("style");
    // The same shape a project writes: the brand rule is unlayered, after the library's layered base.
    style.textContent = 'html[data-brand="audit"]{--qy-primary: rgb(200, 10, 20);}';
    document.head.append(style);
    document.documentElement.setAttribute("data-brand", "audit");
  });
  await page.waitForTimeout(700); // the button's background transitions
  const branded = await solid();
  await page.close();
  return { before, branded };
}

async function axisThemeAttribute(context, theme) {
  const page = await context.newPage();
  await openPlayground(page, "input", theme);
  const read = () => page.evaluate(() => { const el = [...document.querySelectorAll("[data-slot=input-control]")].find((e) => e.getClientRects().length); return getComputedStyle(el).borderTopColor; });
  const byClass = await read();
  const attr = await page.evaluate((t) => { const h = document.documentElement; h.classList.remove("light", "dark"); h.setAttribute("data-theme", t); }, theme);
  void attr;
  await page.waitForTimeout(300);
  const byAttribute = await read();
  await page.close();
  return { byClass, byAttribute };
}

const results = []; // {theme, id, label, normal, more, min, expect, verdict, note}
const failures = [];
let atomsReport = {};
const problems = [];
const browser = await launch();
const version = browser.version();
try {
  for (const theme of themes) {
    const normalContext = await browser.newContext({ viewport, colorScheme: theme, reducedMotion: "reduce", deviceScaleFactor: 1, contrast: "no-preference", forcedColors: "none" });
    const moreContext = await browser.newContext({ viewport, colorScheme: theme, reducedMotion: "reduce", deviceScaleFactor: 1, contrast: "more", forcedColors: "none" });
    const [normal, more] = [await readMatrix(normalContext, theme), await readMatrix(moreContext, theme)];
    atomsReport[theme] = { normal: normal.__atoms, more: more.__atoms };
    if (normal.__media) problems.push(`${theme}: the no-preference context reports prefers-contrast: more`);
    if (!more.__media) problems.push(`${theme}: the contrast: more context does not match (prefers-contrast: more)`);
    for (const probe of PROBES) {
      probe.pairs.forEach((pair, i) => {
        const n = normal[probe.id][i], m = more[probe.id][i];
        const row = { theme, id: probe.id, label: pair.label, min: pair.min ?? null, expect: pair.expect };
        if (n.missing || m.missing) { Object.assign(row, { verdict: "UNVERIFIED", note: `找不到 ${n.missing ?? m.missing}` }); }
        else {
          Object.assign(row, { normal: { a: hex(n.a), b: hex(n.b), ratio: n.ratio }, more: { a: hex(m.a), b: hex(m.b), ratio: m.ratio } });
          const moved = Math.abs(m.ratio - n.ratio) >= 0.005;
          let ok;
          if (pair.expect === "same") ok = !moved && (pair.min === undefined || m.ratio >= pair.min);
          else if (pair.expect === "floor") ok = m.ratio >= pair.min;
          else ok = m.ratio >= n.ratio - 0.005 && (pair.min === undefined || m.ratio >= pair.min) && (moved || n.ratio >= 20);
          row.verdict = ok ? "PASS" : "FAIL";
          if (!ok) row.note = pair.expect === "same" ? (moved ? "held part moved" : `below ${pair.min}:1`) : pair.expect === "floor" ? `below ${pair.min}:1` : (m.ratio < n.ratio ? "contrast fell" : pair.min !== undefined && m.ratio < pair.min ? `below ${pair.min}:1` : "did not move");
        }
        results.push(row);
      });
    }

    // focus signal survives: the border still goes to a different ink on focus (>= 2:1 apart, preset)
    const [fn, fm] = [await focusDelta(normalContext, theme), await focusDelta(moreContext, theme)];
    const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
    const delta = { n: ratio(fn.rest, fn.focused), m: ratio(fm.rest, fm.focused) };
    results.push({ theme, id: "input-focus", label: "Input 聚焦前后的线互相区分（预设 ≥ 2:1）", min: 2, expect: "up", normal: { a: hex(fn.rest), b: hex(fn.focused), ratio: delta.n }, more: { a: hex(fm.rest), b: hex(fm.focused), ratio: delta.m }, verdict: delta.m >= 2 ? "PASS" : "FAIL", note: delta.m >= 2 ? undefined : "focus border indistinguishable from rest border" });

    // theme axes
    const ax = await axes(moreContext, theme);
    results.push({ theme, id: "axis-brand", label: "品牌覆写 --qy-primary 在高对比下仍生效（html[data-brand]）", expect: "same", verdict: ax.branded === "200,10,20" && ax.before !== ax.branded ? "PASS" : "FAIL", note: `${ax.before} -> ${ax.branded}` });
    const at = await axisThemeAttribute(moreContext, theme);
    results.push({ theme, id: "axis-theme-attr", label: "data-theme 属性与 class 给出同一条线色", expect: "same", verdict: at.byClass === at.byAttribute ? "PASS" : "FAIL", note: `${at.byClass} / ${at.byAttribute}` });
    await normalContext.close(); await moreContext.close();
  }
} finally { await browser.close(); }

// ---------------------------------------------------------------- report ----
const fmt = (v) => (v ? `${v.a}/${v.b} ${v.ratio.toFixed(2)}` : "-");
console.log(`Chromium ${version}; contrast: 'no-preference' vs 'more' (emulated prefers-contrast)`);
console.log("\nink ladder (computed on <html>):");
for (const t of themes) console.log(`  ${t}: ${Object.entries(atomsReport[t].normal).map(([k, v]) => `${k} ${v}->${atomsReport[t].more[k]}`).join("  ")}`);
console.log("\ntheme\tpart\tpair\tnormal (fg/bg ratio)\tmore (fg/bg ratio)\tmin\tverdict");
const totals = { PASS: 0, FAIL: 0, UNVERIFIED: 0 };
for (const r of results) {
  totals[r.verdict]++;
  console.log(`${r.theme}\t${r.id}\t${r.label}\t${fmt(r.normal)}\t${fmt(r.more)}\t${r.min ?? "-"}\t${r.verdict}${r.note ? `  (${r.note})` : ""}`);
  if (r.verdict !== "PASS") failures.push(`${r.verdict} ${r.theme} ${r.id} ${r.label} ${r.note ?? ""}`);
}
console.log(`\nPASS ${totals.PASS}  FAIL ${totals.FAIL}  UNVERIFIED ${totals.UNVERIFIED}`);
if (failures.length) console.log(failures.join("\n"));
if (problems.length) console.log(`\nproblems:\n${problems.join("\n")}`);
if (flag("--report")) writeFileSync(flag("--report"), JSON.stringify({ chromium: version, atoms: atomsReport, totals, results }, null, 2));
void sameNow; void tmpdir;
process.exit(totals.FAIL > 0 || problems.length > 0 ? 1 : 0);

// Forced-colors (Windows high contrast) matrix: part x {light, dark} x
// {boundary visible, state distinguishable, focus visible}.
//
//   DOCS_URL=http://localhost:5180 node scripts/forced-colors-audit.mjs \
//     [--out dir] [--only light,dark] [--parts id,id] [--shots] [--report file.json] [--compare before.json]
//     [--without-fixes] [--normal-compare]
//
//   --without-fixes   deletes the library's forced-colors rules from the loaded stylesheet (keeping only the
//                     original `:focus-visible` outline rule), which reproduces the pre-fix state on today's
//                     components: the "before" matrix of the same code.
//   --normal-compare  does not run the matrix. In ordinary colour mode it screenshots every playground, deletes the
//                     forced-colors rules from the page, screenshots again and reports differing pixels, and lists
//                     any system-colour keyword that is declared outside a forced-colors media query.
//
// It drives Chromium with `forcedColors: 'active'`. That is an emulation of the
// forced-colors media feature and the system-color palette Chromium ships for
// it (white-on-black / black-on-white); it is NOT a real
// Windows contrast theme. Real themes pick their own Highlight/GrayText pairs,
// so a PASS here proves the signal exists and is drawn with system colors, not
// that every Windows theme was seen. Needs the docs dev server (pnpm dev).
//
// Every cell is PASS / FAIL / UNVERIFIED, or `-` when the dimension does not
// apply to that part. Measurements are pixels of real screenshots (computed
// styles are only quoted as evidence): a signal that is in the cascade but does
// not change a pixel is a FAIL. Exit code 1 when any cell FAILs or the run
// itself fails; UNVERIFIED does not count as a pass but does not fail the gate.
import { mkdirSync, readdirSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const args = process.argv.slice(2);
const valueFlags = new Set(["--out", "--only", "--parts", "--report", "--compare"]);
const boolFlags = new Set(["--shots", "--without-fixes", "--normal-compare"]);
for (let i = 0; i < args.length; i++) {
  if (!args[i].startsWith("--")) throw new Error(`unexpected argument: ${args[i]}`);
  if (boolFlags.has(args[i])) continue;
  if (!valueFlags.has(args[i])) throw new Error(`unknown flag: ${args[i]}`);
  if (!args[i + 1] || args[i + 1].startsWith("--")) throw new Error(`missing value for ${args[i]}`);
  i++;
}
const flag = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const base = process.env.DOCS_URL ?? "http://localhost:5180";
const out = flag("--out") ?? join(tmpdir(), "yq-forced-colors");
const themes = (flag("--only") ?? "light,dark").split(",");
if (themes.some((t) => !["light", "dark"].includes(t))) throw new Error(`unknown theme: ${flag("--only")}`);
const onlyParts = flag("--parts")?.split(",");
const reportPath = flag("--report");
const comparePath = flag("--compare");
mkdirSync(out, { recursive: true });

// ---------------------------------------------------------------- pixels ----
const lum = ([r, g, b]) => {
  const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
/** Two paints are told apart when they differ by 3:1 in luminance (WCAG 1.4.11's bar). */
const apart = (a, b) => contrast(a, b) >= 3;

class Shot {
  constructor(w, h, data) { this.w = w; this.h = h; this.data = data; }
  at(x, y) {
    if (x < 0 || y < 0 || x >= this.w || y >= this.h) return null;
    const i = (y * this.w + x) * 4;
    return [this.data[i], this.data[i + 1], this.data[i + 2]];
  }
}

// PNG -> RGBA through the browser's own decoder: no image dependency in the repo.
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
  return new Shot(raw.w, raw.h, Buffer.from(raw.b64, "base64"));
}

const MARGIN = 6;
/** Scrolls the element to the middle, screenshots it with a margin, returns pixels and the integer rect inside. */
async function grab(ctx, locator, margin = MARGIN) {
  await locator.scrollIntoViewIfNeeded();
  await locator.evaluate((el) => el.scrollIntoView({ block: "center", inline: "center" }));
  let box = await locator.boundingBox();
  if (!box || (box.width < 1 && box.height < 1)) return null;
  if (box.height < 6) box = { ...box, y: box.y - (6 - box.height) / 2, height: 6 };
  if (box.width < 6) box = { ...box, x: box.x - (6 - box.width) / 2, width: 6 };
  const vp = ctx.page.viewportSize();
  const rx = Math.round(box.x), ry = Math.round(box.y);
  const rw = Math.max(1, Math.round(box.width)), rh = Math.max(1, Math.round(box.height));
  const x0 = Math.max(0, rx - margin), y0 = Math.max(0, ry - margin);
  const x1 = Math.min(vp.width, rx + rw + margin), y1 = Math.min(vp.height, ry + rh + margin);
  const png = await ctx.page.screenshot({ clip: { x: x0, y: y0, width: x1 - x0, height: y1 - y0 }, animations: "disabled" });
  const shot = await decode(ctx.decoder, png);
  return { shot, rect: { x: rx - x0, y: ry - y0, w: Math.min(rw, vp.width), h: Math.min(rh, vp.height) } };
}

/** How many of the four sides of `rect` show a line or a fill edge against what lies just outside. */
function visibleSides(shot, rect) {
  const sides = [];
  const probe = (name, along, inside, outside) => {
    let hit = 0, total = 0;
    for (const t of along) {
      total++;
      const out = outside(t, 3);
      if (!out) continue;
      const candidates = [inside(t, 0), inside(t, 1), outside(t, 1), outside(t, 2)].filter(Boolean);
      if (candidates.some((c) => apart(c, out))) hit++;
    }
    sides.push({ name, visible: total > 0 && hit / total >= 0.6 });
  };
  const span = (len) => {
    const n = Math.max(3, Math.min(12, Math.floor(len * 0.6)));
    return Array.from({ length: n }, (_, i) => Math.round(len * 0.2 + (len * 0.6 * i) / Math.max(1, n - 1)));
  };
  const { x, y, w, h } = rect;
  probe("top", span(w), (t, d) => shot.at(x + t, y + d), (t, d) => shot.at(x + t, y - d));
  probe("bottom", span(w), (t, d) => shot.at(x + t, y + h - 1 - d), (t, d) => shot.at(x + t, y + h - 1 + d));
  probe("left", span(h), (t, d) => shot.at(x + d, y + t), (t, d) => shot.at(x - d, y + t));
  probe("right", span(h), (t, d) => shot.at(x + w - 1 - d, y + t), (t, d) => shot.at(x + w - 1 + d, y + t));
  return sides;
}

/** Most common colour inside the rect (the element's own surface), and the share of pixels that are not it. */
function surface(shot, rect) {
  const counts = new Map();
  let n = 0;
  for (let j = Math.max(0, rect.y); j < Math.min(shot.h, rect.y + rect.h); j++) {
    for (let i = Math.max(0, rect.x); i < Math.min(shot.w, rect.x + rect.w); i++) {
      const c = shot.at(i, j); const k = c.join(","); counts.set(k, (counts.get(k) ?? 0) + 1); n++;
    }
  }
  let best = "0,0,0", top = -1;
  for (const [k, v] of counts) if (v > top) { top = v; best = k; }
  const dominant = best.split(",").map(Number);
  let ink = 0;
  for (const [k, v] of counts) if (dist(k.split(",").map(Number), dominant) >= 60) ink += v;
  return { dominant, ink: n ? ink / n : 0 };
}

/** Mean colour of the outermost two pixels of the rect. */
function ring(shot, rect) {
  const sum = [0, 0, 0]; let n = 0;
  const add = (c) => { if (c) { sum[0] += c[0]; sum[1] += c[1]; sum[2] += c[2]; n++; } };
  for (let i = 0; i < rect.w; i++) for (const d of [0, 1]) { add(shot.at(rect.x + i, rect.y + d)); add(shot.at(rect.x + i, rect.y + rect.h - 1 - d)); }
  for (let j = 0; j < rect.h; j++) for (const d of [0, 1]) { add(shot.at(rect.x + d, rect.y + j)); add(shot.at(rect.x + rect.w - 1 - d, rect.y + j)); }
  return n ? sum.map((v) => Math.round(v / n)) : [0, 0, 0];
}

/** Share of the rect that is ink against the canvas colour; `px` is the absolute count. */
function inkOver(shot, rect, canvas, minContrast = 3) {
  let px = 0, n = 0;
  for (let j = Math.max(0, rect.y); j < Math.min(shot.h, rect.y + rect.h); j++) {
    for (let i = Math.max(0, rect.x); i < Math.min(shot.w, rect.x + rect.w); i++) {
      n++; if (contrast(shot.at(i, j), canvas) >= minContrast) px++;
    }
  }
  return { px, share: n ? px / n : 0 };
}

// ------------------------------------------------------------- locating -----
/** `selector@n` picks the n-th visible match (default first). */
function locate(page, spec, raw = false) {
  const [selector, nth] = spec.split(/@(\d+)$/);
  // `raw` skips Playwright's visibility rule, which drops zero-height hairlines (reference lines).
  return page.locator(raw ? selector : `${selector} >> visible=true`).nth(Number(nth ?? 0));
}
const exists = async (page, spec) => (await locate(page, spec).count()) > 0;

const STYLE_PROPS = ["backgroundColor", "color", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor",
  "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "outlineStyle", "outlineWidth", "outlineColor",
  "textDecorationLine", "fontWeight", "boxShadow", "forcedColorAdjust", "opacity"];
const styleOf = (locator) => locator.evaluate((el, props) => {
  const cs = getComputedStyle(el); const o = {};
  for (const p of props) o[p] = cs[p];
  o.bgImage = cs.backgroundImage !== "none";
  return o;
}, STYLE_PROPS);

// ---------------------------------------------------------------- checks ----
const R = (r, note = "") => ({ r, note });
const PASS = (note) => R("PASS", note), FAIL = (note) => R("FAIL", note), UNV = (note) => R("UNVERIFIED", note);
const rgb = (c) => `rgb(${c.join(",")})`;

async function checkBox(ctx, spec) {
  const loc = locate(ctx.page, spec.box);
  if (!(await loc.count())) return UNV(`找不到 ${spec.box}`);
  const g = await grab(ctx, loc);
  if (!g) return UNV("元素无尺寸");
  const sides = visibleSides(g.shot, g.rect);
  const seen = sides.filter((s) => s.visible).map((s) => s.name);
  const need = spec.edges ?? 4;
  if (seen.length >= need) return PASS(`${seen.length}/4 边`);
  return FAIL(`仅 ${seen.length}/4 边可见（${seen.join("/") || "无"}）`);
}

async function checkInk(ctx, spec) {
  const { sel, minPx = 20, minContrast = 3 } = spec.ink;
  const loc = locate(ctx.page, sel, spec.ink.raw);
  if (!(await loc.count())) return UNV(`找不到 ${sel}`);
  const g = await grab(ctx, loc);
  if (!g) return UNV("元素无尺寸");
  const { px, share } = inkOver(g.shot, g.rect, ctx.canvas, minContrast);
  return px >= minPx ? PASS(`${px}px 有墨`) : FAIL(`只有 ${px}px 与底色拉开 ${minContrast}:1（占 ${(share * 100).toFixed(1)}%）`);
}

/**
 * Chromium paints a Canvas-coloured backplate under text it still adjusts. A selected item that sets its own
 * Highlight fill then shows a white box behind its label. Returns a message when the first text run sits on a
 * colour that is not the element's own surface, else null.
 */
async function textPlate(locator, grabbed, surf) {
  const box = await locator.evaluate((el) => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      if (!n.textContent.trim()) continue;
      const range = document.createRange(); range.selectNodeContents(n);
      const r = range.getClientRects()[0];
      if (r && r.width > 2 && r.height > 2) { const host = el.getBoundingClientRect(); return { x: r.x - host.x, y: r.y - host.y, w: r.width, h: r.height }; }
    }
    return null;
  });
  if (!box) return null;
  const { shot, rect } = grabbed;
  // Sample the top-left corner of the text box: a plate shows there, glyph ink does not.
  const c = shot.at(Math.round(rect.x + box.x + 1), Math.round(rect.y + box.y + 1));
  return c && apart(c, surf.dominant) && surf.ink < 0.5 ? `文字下垫了一块与表面不同的底板（${rgb(c)} 对 ${rgb(surf.dominant)}）` : null;
}

/** Compares a state-bearing element with its counterpart: surface, outer ring, ink share, paint-relevant style. */
async function checkState(ctx, spec) {
  const { on, off } = spec.state;
  const a = locate(ctx.page, on), b = locate(ctx.page, off);
  if (!(await a.count())) return UNV(`找不到 ${on}`);
  if (!(await b.count())) return UNV(`找不到 ${off}`);
  if (spec.state.grayText) {
    // Disabled: the signal that survives is the GrayText role itself (the system decides how it looks).
    const gray = await ctx.page.evaluate((k) => { const d = document.createElement("div"); d.style.color = k; document.body.append(d); const c = getComputedStyle(d).color; d.remove(); return c; }, "GrayText");
    const [ta, tb] = [await styleOf(a), await styleOf(b)];
    const onGray = [ta.color, ta.borderTopColor].includes(gray), offGray = [tb.color, tb.borderTopColor].includes(gray);
    return onGray && !offGray ? PASS(`字/线用 GrayText（${gray}）`) : FAIL(`禁用项没有用 GrayText：字 ${ta.color}，线 ${ta.borderTopColor}`);
  }
  const ga = await grab(ctx, a), gb = await grab(ctx, b);
  if (!ga || !gb) return UNV("元素无尺寸");
  if (spec.state.pixels) {
    // Glyph-only marks (tick, dot, thumb position): same box, so compare pixel by pixel.
    if (ga.rect.w !== gb.rect.w || ga.rect.h !== gb.rect.h) return UNV("两个对照盒子尺寸不同，无法逐像素比较");
    let diff = 0;
    for (let j = 0; j < ga.rect.h; j++) for (let i = 0; i < ga.rect.w; i++) {
      if (dist(ga.shot.at(ga.rect.x + i, ga.rect.y + j), gb.shot.at(gb.rect.x + i, gb.rect.y + j)) >= 90) diff++;
    }
    const share = diff / (ga.rect.w * ga.rect.h);
    return share >= 0.02 ? PASS(`${(share * 100).toFixed(0)}% 像素不同`) : FAIL(`仅 ${(share * 100).toFixed(1)}% 像素不同`);
  }
  const sa = surface(ga.shot, ga.rect), sb = surface(gb.shot, gb.rect);
  const plate = await textPlate(a, ga, sa);
  if (plate) return FAIL(plate);
  const ra = ring(ga.shot, ga.rect), rb = ring(gb.shot, gb.rect);
  const [ta, tb] = [await styleOf(a), await styleOf(b)];
  const reasons = [];
  if (apart(sa.dominant, sb.dominant)) reasons.push("底面不同");
  else if (spec.state.minDist !== undefined && dist(sa.dominant, sb.dominant) >= spec.state.minDist) reasons.push("底面色相不同");
  if (apart(ra, rb)) reasons.push("外缘不同");
  if (Math.abs(sa.ink - sb.ink) >= 0.05 && Math.abs(ga.rect.w - gb.rect.w) <= 4) reasons.push(`墨量差 ${(Math.abs(sa.ink - sb.ink) * 100).toFixed(0)}%`);
  for (const p of ["borderTopWidth", "outlineWidth", "textDecorationLine", "fontWeight"]) if (ta[p] !== tb[p]) reasons.push(`${p} ${tb[p]}→${ta[p]}`);
  if (apart(ra, rb) === false && apart(sa.dominant, sb.dominant) === false && ta.color !== tb.color) {
    const ca = ta.color.match(/\d+/g).slice(0, 3).map(Number), cb = tb.color.match(/\d+/g).slice(0, 3).map(Number);
    if (apart(ca, cb)) reasons.push("字色不同");
  }
  if (reasons.length) return PASS(reasons.join("；"));
  return FAIL(`与对照无差别（底 ${rgb(sa.dominant)}/${rgb(sb.dominant)}，边 ${rgb(ra)}/${rgb(rb)}，墨 ${(sa.ink * 100).toFixed(0)}%/${(sb.ink * 100).toFixed(0)}%）`);
}

/** Two points that must be told apart: a fill against its track, one tier against another. */
async function checkPair(ctx, spec) {
  const [A, B] = spec.pair;
  const pt = async (p) => {
    if (p === "canvas") return { color: ctx.canvas };
    const spec2 = typeof p === "string" ? { sel: p } : p;
    let loc = locate(ctx.page, spec2.sel);
    if (spec2.pick) {
      // Choose the darkest / lightest of all matches by the colour the page itself computed.
      const index = await ctx.page.locator(`${spec2.sel} >> visible=true`).evaluateAll((els, [mode, canvasLum]) => {
        const c = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
        const l = els.map((el) => { c.clearRect(0, 0, 1, 1); c.fillStyle = "#000"; c.fillStyle = getComputedStyle(el).backgroundColor; c.fillRect(0, 0, 1, 1); const [r, g, b] = c.getImageData(0, 0, 1, 1).data; return 0.2126 * r + 0.7152 * g + 0.0722 * b; });
        // farthest / nearest: by distance in luminance from the canvas, so "strongest" means the same in both themes.
        const d = l.map((v) => Math.abs(v - canvasLum));
        return d.indexOf(mode === "farthest" ? Math.max(...d) : Math.min(...d));
      }, [spec2.pick, 0.2126 * ctx.canvas[0] + 0.7152 * ctx.canvas[1] + 0.0722 * ctx.canvas[2]]);
      loc = ctx.page.locator(`${spec2.sel} >> visible=true`).nth(Math.max(0, index));
    }
    if (!(await loc.count())) return { missing: spec2.sel };
    const g = await grab(ctx, loc, 2);
    if (!g) return { missing: spec2.sel };
    const fx = spec2.fx ?? 0.5, fy = spec2.fy ?? 0.5;
    const x = Math.min(g.rect.x + g.rect.w - 1, g.rect.x + Math.floor(g.rect.w * fx));
    const y = Math.min(g.rect.y + g.rect.h - 1, g.rect.y + Math.floor(g.rect.h * fy));
    return { color: g.shot.at(x, y) };
  };
  const a = await pt(A), b = await pt(B);
  if (a.missing || b.missing) return UNV(`找不到 ${a.missing ?? b.missing}`);
  const c = contrast(a.color, b.color);
  const hueApart = spec.minDist !== undefined && dist(a.color, b.color) >= spec.minDist;
  return c >= (spec.minContrast ?? 3) || hueApart ? PASS(`${rgb(a.color)} 对 ${rgb(b.color)} ${c.toFixed(1)}:1`) : FAIL(`${rgb(a.color)} 对 ${rgb(b.color)} 仅 ${c.toFixed(1)}:1`);
}

async function checkFocus(ctx, spec) {
  const loc = locate(ctx.page, spec.focus);
  if (!(await loc.count())) return UNV(`找不到 ${spec.focus}`);
  const { page } = ctx;
  await page.evaluate(() => document.activeElement?.blur?.());
  await loc.scrollIntoViewIfNeeded();
  const before = await grab(ctx, loc, 8);
  if (!before) return UNV("元素无尺寸");
  const ringLoc = spec.focusRing ? locate(page, spec.focusRing) : null;
  const ringBefore = ringLoc ? await grab(ctx, ringLoc, 4) : null;
  // A key press first, so focus() below is treated as keyboard focus (:focus-visible).
  await page.keyboard.press("Shift");
  await page.keyboard.press("Tab");
  // The part may wrap the focusable control (Slider thumb wraps a hidden input).
  await loc.evaluate((el) => (el.matches("input,button,a,select,textarea,[tabindex]") ? el : el.querySelector("input,button,a,select,textarea,[tabindex]") ?? el).focus({ focusVisible: true }));
  await page.waitForTimeout(600);
  const visible = await loc.evaluate((el) => document.activeElement && (el === document.activeElement || el.contains(document.activeElement)) && document.activeElement.matches(":focus-visible"));
  const outline = await loc.evaluate((el) => { const cs = getComputedStyle(document.activeElement ?? el); return `${cs.outlineStyle} ${cs.outlineWidth}`; });
  const after = await grab(ctx, loc, 8);
  const ringAfter = ringLoc ? await grab(ctx, ringLoc, 4) : null;
  await page.evaluate(() => document.activeElement?.blur?.());
  if (!visible) return UNV("无法让该元素进入 :focus-visible");
  if (!after || after.shot.w !== before.shot.w || after.shot.h !== before.shot.h) return UNV("聚焦前后截图尺寸不同");
  let changed = 0;
  for (let j = 0; j < before.shot.h; j++) for (let i = 0; i < before.shot.w; i++) {
    if (apart(before.shot.at(i, j), after.shot.at(i, j))) changed++;
  }
  const perimeter = 2 * (before.rect.w + before.rect.h);
  const rectChanged = before.rect.w === after.rect.w && before.rect.h === after.rect.h;
  const need = Math.max(12, Math.round(perimeter * 0.5));
  if (!rectChanged) return FAIL("聚焦改变了盒子尺寸");
  if (ringLoc) {
    if (!ringBefore || !ringAfter || ringBefore.shot.w !== ringAfter.shot.w || ringBefore.shot.h !== ringAfter.shot.h) return UNV(`找不到或无法对照 ${spec.focusRing}`);
    // 每一边取内侧 2px 的带，沿边采样；≥60% 的采样点聚焦前后不同才算这条边画出来了。
    const { rect } = ringBefore; const missing = [];
    const sides = { top: (t, d) => [rect.x + t, rect.y + d], bottom: (t, d) => [rect.x + t, rect.y + rect.h - 1 - d], left: (t, d) => [rect.x + d, rect.y + t], right: (t, d) => [rect.x + rect.w - 1 - d, rect.y + t] };
    for (const [name, at] of Object.entries(sides)) {
      const len = name === "top" || name === "bottom" ? rect.w : rect.h;
      let hit = 0, total = 0;
      for (let k = 2; k < len - 2; k += Math.max(1, Math.floor(len / 24))) {
        total++;
        if ([0, 1].some((d) => { const [x, y] = at(k, d); return apart(ringBefore.shot.at(x, y), ringAfter.shot.at(x, y)); })) hit++;
      }
      if (!total || hit / total < 0.6) missing.push(name);
    }
    if (missing.length) return FAIL(`${spec.focusRing} 的焦点线缺 ${missing.join("/")} 边，outline ${outline}`);
  }
  return changed >= need ? PASS(`${changed}px 变化，outline ${outline}`) : FAIL(`仅 ${changed}px 变化（需 ≥ ${need}），outline ${outline}`);
}

// ----------------------------------------------------------------- parts ----
const click = (sel, nth = 0) => async (page) => { await locate(page, `${sel}${nth ? `@${nth}` : ""}`).click(); await page.mouse.move(0, 0); await page.waitForTimeout(400); };
const open = (sel) => async (page) => { await locate(page, sel).click(); await page.waitForTimeout(500); };
const hoverOpen = (sel) => async (page) => { await locate(page, sel).hover(); await page.waitForTimeout(900); };
const keys = (...ks) => async (page) => { for (const k of ks) { await page.keyboard.press(k); await page.waitForTimeout(200); } };
const seq = (...fns) => async (page) => { for (const f of fns) await f(page); };

/** Fill-vs-track pair: first point is the fill's middle, second the track where it is still empty. */
const fillPair = (fill, track, fx = 0.9) => [{ sel: fill, fx: 0.25 }, { sel: track, fx }];

const PARTS = [
  // --- 焦点与按钮
  { id: "button-solid", group: "控件", slug: "button", box: "button[data-variant=solid]:not([data-disabled])", focus: "button[data-variant=solid]:not([data-disabled])" },
  { id: "button-bordered", group: "控件", slug: "button", box: "button[data-variant=bordered]:not([data-disabled])", focus: "button[data-variant=bordered]:not([data-disabled])" },
  { id: "button-quiet", group: "控件", slug: "button", focus: "button[data-variant=quiet]:not([data-disabled])" },
  { id: "button-disabled", group: "禁用", slug: "button", state: { grayText: true, on: "button[data-variant=solid][data-disabled]", off: "button[data-variant=solid]:not([data-disabled])" } },
  { id: "input", group: "控件", slug: "input", box: "[data-slot=input-control]", focus: "[data-slot=input]:not([data-disabled])" },
  { id: "input-disabled", group: "禁用", slug: "input", state: { grayText: true, on: "[data-slot=input][data-disabled]", off: "[data-slot=input]:not([data-disabled]):not([data-invalid])" } },
  { id: "checkbox", group: "二态", slug: "checkbox", box: "[data-slot=checkbox][aria-checked=false]:not([data-disabled]):not([data-readonly])", state: { pixels: true, on: "[data-slot=checkbox][aria-checked=true]:not([data-disabled]):not([data-readonly])", off: "[data-slot=checkbox][aria-checked=false]:not([data-disabled]):not([data-readonly])" }, focus: "[data-slot=checkbox][aria-checked=true]:not([data-disabled]):not([data-readonly])" },
  { id: "checkbox-unchecked-focus", group: "二态", slug: "checkbox", focus: "[data-slot=checkbox][aria-checked=false]:not([data-disabled]):not([data-readonly])" },
  { id: "checkbox-mixed", group: "二态", slug: "checkbox", state: { pixels: true, on: "[data-slot=checkbox][aria-checked=mixed]", off: "[data-slot=checkbox][aria-checked=false]:not([data-disabled]):not([data-readonly])" } },
  { id: "checkbox-disabled", group: "禁用", slug: "checkbox", state: { grayText: true, on: "[data-slot=checkbox][data-disabled]", off: "[data-slot=checkbox][aria-checked=false]:not([data-disabled]):not([data-readonly])" } },
  // 禁用压过选中：禁用且已选的项不能铺满 Highlight（否则与可用的已选项无从区分），且已选本身仍要读得出。
  { id: "checkbox-disabled-checked", group: "禁用", slug: "checkbox", state: { grayText: true, on: "[data-slot=checkbox][data-disabled][aria-checked=true]", off: "[data-slot=checkbox][aria-checked=false]:not([data-disabled]):not([data-readonly])" } },
  { id: "checkbox-disabled-checked-mark", group: "禁用", slug: "checkbox", state: { pixels: true, on: "[data-slot=checkbox][data-disabled][aria-checked=true]", off: "[data-slot=checkbox][data-disabled][aria-checked=false]" } },
  { id: "radio", group: "二态", slug: "radio-group", box: "[data-slot=radio-group-item][aria-checked=false]:not([data-disabled])", state: { pixels: true, on: "[data-slot=radio-group-item][aria-checked=true]:not([data-disabled])", off: "[data-slot=radio-group-item][aria-checked=false]:not([data-disabled])" }, focus: "[data-slot=radio-group-item][aria-checked=true]:not([data-disabled])" },
  { id: "switch", group: "二态", slug: "switch", box: "[data-slot=switch][aria-checked=false]:not([data-disabled])", state: { pixels: true, on: "[data-slot=switch][aria-checked=true]:not([data-disabled])", off: "[data-slot=switch][aria-checked=false]:not([data-disabled])" }, focus: "[data-slot=switch]:not([data-disabled])" },
  { id: "switch-disabled-checked", group: "禁用", slug: "switch", state: { grayText: true, on: "[data-slot=switch][aria-checked=true][data-disabled]", off: "[data-slot=switch][aria-checked=false]:not([data-disabled])" } },
  { id: "switch-checked-focus", group: "二态", slug: "switch", focus: "[data-slot=switch][aria-checked=true]:not([data-disabled])" },
  { id: "switch-thumb", group: "二态", slug: "switch", box: "[data-slot=switch-thumb][data-checked]", edges: 3, pair: [{ sel: "[data-slot=switch-thumb][data-checked]" }, { sel: "[data-slot=switch][aria-checked=true]:not([data-disabled])", fx: 0.04, fy: 0.5 }], pairIsState: true },
  { id: "slider-track", group: "二态", slug: "slider", box: "[data-slot=slider-track]", pair: fillPair("[data-slot=slider-indicator]", "[data-slot=slider-track]", 0.97), pairIsState: true },
  { id: "slider-thumb", group: "二态", slug: "slider", box: "[data-slot=slider-thumb]", focus: "[data-slot=slider-thumb]" },

  // --- 选中 / 当前
  { id: "segmented-control", group: "选中", slug: "segmented-control", box: "[data-slot=segmented-control]", state: { on: "[data-slot=segmented-control-item][aria-checked=true]", off: "[data-slot=segmented-control-item][aria-checked=false]" }, focus: "[data-slot=segmented-control-item][aria-checked=true]" },
  { id: "segmented-control-unselected-focus", group: "选中", slug: "segmented-control", focus: "[data-slot=segmented-control-item][aria-checked=false]:not([data-disabled])" },
  { id: "toggle-pressed-focus", group: "选中", slug: "toggle", focus: "[data-slot=toggle][aria-pressed=true]" },
  { id: "toggle-group-pressed-focus", group: "选中", slug: "toggle-group", focus: "[data-slot=toggle-group-item][aria-pressed=true]" },
  { id: "toggle-group", group: "选中", slug: "toggle-group", box: "[data-slot=toggle-group]", state: { on: "[data-slot=toggle-group-item][aria-pressed=true]", off: "[data-slot=toggle-group-item][aria-pressed=false]:not([data-disabled])" }, focus: "[data-slot=toggle-group-item][aria-pressed=false]:not([data-disabled])" },
  { id: "toggle", group: "选中", slug: "toggle", state: { on: "[data-slot=toggle][aria-pressed=true][data-shape=label]", off: "[data-slot=toggle][aria-pressed=false][data-shape=label]:not([data-disabled])" }, focus: "[data-slot=toggle][aria-pressed=false]:not([data-disabled])" },
  { id: "toggle-disabled-pressed", group: "禁用", slug: "toggle", state: { grayText: true, on: "[data-slot=toggle][aria-pressed=true][data-disabled]", off: "[data-slot=toggle][aria-pressed=false]:not([data-disabled])" } },
  { id: "tabs", group: "选中", slug: "tabs", state: { on: "[data-slot=tabs-tab][aria-selected=true]", off: "[data-slot=tabs-tab][aria-selected=false]:not([aria-disabled=true])" }, focus: "[data-slot=tabs-tab][aria-selected=true]" },
  { id: "pagination", group: "选中", slug: "pagination", state: { on: "[data-slot=pagination-link][aria-current=page]", off: "[data-slot=pagination-link]:not([aria-current])" }, focus: "[data-slot=pagination-link]:not([aria-current])" },
  { id: "pagination-current-focus", group: "选中", slug: "pagination", focus: "[data-slot=pagination-link][aria-current=page]" },
  { id: "sidebar", group: "选中", slug: "sidebar", state: { on: "[data-slot=sidebar-link][aria-current=page]", off: "[data-slot=sidebar-link]:not([aria-current])" }, focus: "[data-slot=sidebar-link]:not([aria-current])" },
  { id: "sidebar-current-focus", group: "选中", slug: "sidebar", focus: "[data-slot=sidebar-link][aria-current=page]" },
  { id: "navigation-menu", group: "选中", slug: "navigation-menu", state: { on: "[data-slot=navigation-menu-link][aria-current=page]", off: "[data-slot=navigation-menu-link]:not([aria-current])" }, focus: "[data-slot=navigation-menu-link]:not([aria-current])" },
  { id: "navigation-menu-current-focus", group: "选中", slug: "navigation-menu", focus: "[data-slot=navigation-menu-link][aria-current=page]" },
  { id: "tabs-unselected-focus", group: "选中", slug: "tabs", focus: "[data-slot=tabs-tab][aria-selected=false]:not([aria-disabled=true])" },
  { id: "calendar-selected", group: "选中", slug: "calendar", state: { on: "[data-mode=single] td[aria-selected=true] button", off: "[data-mode=single] td:not([aria-selected=true]):not([data-outside]) button" }, focus: "[data-mode=single] td[aria-selected=true] button" },
  { id: "calendar-range", group: "选中", slug: "calendar", state: { on: "[data-mode=range] td[aria-selected=true]:not([data-range-start]):not([data-range-end])@1", off: "[data-mode=range] td:not([aria-selected=true]):not([data-outside])" } },
  { id: "tree-selected", group: "选中", slug: "tree", prep: click("[data-slot=tree-label]", 1), state: { on: "[data-slot=tree-item][aria-selected=true] > [data-slot=tree-row]", off: "[data-slot=tree-item][aria-selected=false]:not([aria-disabled=true]) > [data-slot=tree-row]" }, focus: "[data-slot=tree-item][aria-selected=false]:not([aria-disabled=true])" },
  { id: "table-row-selected", group: "选中", slug: "data-table", prep: click("[data-slot=data-table-selection-cell]", 1), state: { on: "tr[data-row-id]:has([data-slot=data-table-selection-cell][aria-checked=true])", off: "tr[data-row-id]:has([data-slot=data-table-selection-cell][aria-checked=false])" }, focus: "[data-slot=data-table-selection-cell]" },
  // 展开的选中项：li 包着整个子组，焦点线必须画在自身那一行上、四边都在（不能只剩行顶与两侧）。
  { id: "tree-selected-expanded-focus", group: "选中", slug: "tree", prep: click("[data-slot=tree-label]", 0), focus: "[data-slot=tree-item][aria-expanded=true][aria-selected=true]", focusRing: "[data-slot=tree-item][aria-expanded=true][aria-selected=true] > [data-slot=tree-row]" },
  { id: "select-item", group: "选中", slug: "select", prep: seq(open("[data-slot=select-trigger]:not([data-disabled]):not([data-readonly])"), keys("ArrowDown")), box: "[data-slot=select-popup]", state: { on: "[data-slot=select-item][data-highlighted]", off: "[data-slot=select-item]:not([data-highlighted]):not([data-selected])" }, focus: "[data-slot=select-trigger]" },
  { id: "select-item-selected", group: "选中", slug: "select", prep: seq(open("[data-slot=select-trigger][data-filled]:not([data-disabled]):not([data-readonly])"), keys("Home")), ink: { sel: "[data-slot=select-item][data-selected] [data-slot=select-item-indicator]", minPx: 8 }, inkIsState: true },
  { id: "combobox-item-selected", group: "选中", slug: "combobox", prep: seq(open("[data-slot=combobox-trigger]"), keys("ArrowDown")), ink: { sel: "[data-slot=combobox-item][data-selected] [data-slot=combobox-item-indicator]", minPx: 8 }, inkIsState: true },
  { id: "menu-item", group: "选中", slug: "menu", prep: seq(open("[data-slot=menu-trigger]"), keys("ArrowDown")), box: "[data-slot=menu-popup]", state: { on: "[data-slot=menu-item][data-highlighted]", off: "[data-slot=menu-item]:not([data-highlighted])" } },
  { id: "combobox-item", group: "选中", slug: "combobox", prep: seq(open("[data-slot=combobox-trigger]"), keys("ArrowDown")), box: "[data-slot=combobox-popup]", state: { on: "[data-slot=combobox-item][data-highlighted]", off: "[data-slot=combobox-item]:not([data-highlighted]):not([data-selected])" }, focus: "[data-slot=combobox-input]" },

  // --- 读数
  { id: "progress", group: "读数", slug: "progress", box: "[data-slot=progress-track]", pair: fillPair("[data-slot=progress-indicator]@1", "[data-slot=progress-track]@1"), pairIsState: true },
  { id: "progress-indeterminate", group: "读数", slug: "progress", ink: { sel: "[data-slot=progress-indicator][data-indeterminate]", minPx: 30 } },
  { id: "progress-segments", group: "读数", slug: "progress", box: "[data-slot=progress][data-segments] [data-slot=progress-track]", pair: [{ sel: "[data-slot=progress][data-segments] [data-slot=progress-indicator]@1", fx: 0.03 }, "canvas"], pairIsState: true },
  { id: "meter", group: "读数", slug: "meter", box: "[data-slot=meter-track]", pair: fillPair("[data-slot=meter-indicator]@1", "[data-slot=meter-track]@1"), pairIsState: true },
  { id: "meter-tone", group: "读数", slug: "meter", pair: [{ sel: "[data-slot=meter][data-tone=danger] [data-slot=meter-indicator]", fx: 0.05 }, "canvas"], pairIsState: true },
  { id: "meter-segments", group: "读数", slug: "meter", box: "[data-slot=meter][data-segments] [data-slot=meter-track]", pair: [{ sel: "[data-slot=meter][data-segments] [data-slot=meter-indicator]", fx: 0.03 }, "canvas"], pairIsState: true },
  { id: "proportion", group: "读数", slug: "proportion", box: "[data-slot=proportion-track]", edges: 1, pair: [{ sel: "[data-slot=proportion-segment]@0" }, "canvas"], pairIsState: true },
  { id: "proportion-segments-differ", group: "读数", slug: "proportion", pair: [{ sel: "[data-slot=proportion-segment]@0" }, { sel: "[data-slot=proportion-segment]@1" }], minContrast: 1.5, minDist: 100, pairIsState: true },
  { id: "proportion-legend", group: "读数", slug: "proportion", ink: { sel: "[data-slot=proportion-legend] li span:first-child", minPx: 10 } },
  { id: "sparkline", group: "读数", slug: "sparkline", ink: { sel: "[data-slot=sparkline]", minPx: 40 } },
  { id: "sparkline-band", group: "读数", slug: "sparkline", pair: [{ sel: "[data-slot=sparkline-band]" }, "canvas"], minContrast: 1.1, pairIsState: true },
  { id: "skeleton", group: "读数", slug: "skeleton", ink: { sel: "[data-slot=skeleton-line]", minPx: 30 } },

  // --- 图
  { id: "chart-bar", group: "图", slug: "chart", ink: { sel: ".recharts-bar-rectangle path, .recharts-bar-rectangle rect", minPx: 30 } },
  { id: "chart-line", group: "图", slug: "chart", ink: { sel: "[data-slot=chart-plot] .recharts-line-curve", minPx: 40 } },
  { id: "chart-area", group: "图", slug: "chart", ink: { sel: ".recharts-area-area", minPx: 40, minContrast: 1.15 } },
  { id: "chart-reference-band", group: "图", slug: "chart", ink: { sel: ".recharts-reference-area-rect", minPx: 40, minContrast: 1.1 } },
  { id: "chart-reference-line", group: "图", slug: "chart", ink: { sel: ".recharts-reference-line-line", minPx: 6, raw: true } },
  { id: "chart-legend-key", group: "图", slug: "chart", ink: { sel: "[data-slot=chart-legend] li span:first-child, [data-slot=chart-legend] svg", minPx: 8 } },
  { id: "chart-bar-share", group: "图", slug: "chart", ink: { sel: "[data-type=bar-share] .recharts-bar-rectangle path", minPx: 30 } },
  { id: "chart-area-share", group: "图", slug: "chart", ink: { sel: "[data-type=area-share] .recharts-area-area", minPx: 40, minContrast: 1.15 } },
  { id: "chart-event-point", group: "图", slug: "chart", ink: { sel: ".recharts-reference-dot", minPx: 6, raw: true } },
  { id: "chart-background-series", group: "图", slug: "chart", ink: { sel: "[data-type=line]:has(.recharts-reference-dot) .recharts-line-curve@1", minPx: 20, minContrast: 1.1 } },
  { id: "chart-bar-series-differ", group: "图", slug: "chart", pair: [{ sel: "[data-type=bar-stacked] .recharts-bar-rectangle path@0" }, { sel: "[data-type=bar-stacked] .recharts-bar-rectangle path@4" }], minContrast: 1.5, minDist: 100, pairIsState: true },
  { id: "scatter-chart", group: "图", slug: "scatter-chart", ink: { sel: "[data-slot=chart-plot] .recharts-scatter-symbol, [data-slot=chart-plot] circle", minPx: 8 } },
  { id: "heatmap-cell", group: "图", slug: "heatmap", pair: [{ sel: "[data-slot=heatmap] [role=gridcell][data-state=known]", pick: "farthest" }, "canvas"], pairIsState: true, focus: "[data-slot=heatmap] [role=gridcell][data-state=known]" },
  { id: "heatmap-scale-differ", group: "图", slug: "heatmap", pair: [{ sel: "[data-slot=heatmap] [role=gridcell][data-state=known]", pick: "farthest" }, { sel: "[data-slot=heatmap] [role=gridcell][data-state=known]", pick: "nearest" }], minContrast: 1.5, pairIsState: true },
  { id: "heatmap-levels", group: "图", slug: "heatmap", pair: [{ sel: "[role=gridcell][data-level=\"0\"]" }, { sel: "[role=gridcell][data-level=\"3\"]" }], minContrast: 1.5, pairIsState: true },
  { id: "heatmap-unknown", group: "图", slug: "heatmap", ink: { sel: "[role=gridcell]:not([data-state=known]):not([data-slot=heatmap-summary])", minPx: 10, minContrast: 1.1 }, inkIsState: true },
  { id: "heatmap-legend", group: "图", slug: "heatmap", ink: { sel: "[data-slot=heatmap-legend] li span:first-child", minPx: 10, minContrast: 1.1 } },
  { id: "heatmap-scale-key", group: "图", slug: "heatmap", ink: { sel: "[data-slot=heatmap] [aria-hidden=true] > span[style*=gradient]", minPx: 10, minContrast: 1.1 } },

  // --- 标记与反馈
  { id: "badge", group: "标记", slug: "badge", ink: { sel: "[data-slot=badge][data-variant=tone]", minPx: 20 } },
  { id: "status-dot", group: "标记", slug: "status-dot", ink: { sel: "[data-slot=status-dot-indicator]", minPx: 6 } },
  { id: "status-dot-differ", group: "标记", slug: "status-dot", state: { on: "[data-slot=status-dot][data-status=online] [data-slot=status-dot-indicator]", off: "[data-slot=status-dot][data-status=offline] [data-slot=status-dot-indicator]", minDist: 80 } },
  { id: "alert", group: "标记", slug: "alert", box: "[data-slot=alert]", edges: 3 },
  { id: "toast", group: "标记", slug: "toast", prep: seq(open("button"), async (page) => page.waitForTimeout(800)), box: "[data-slot=toast-root]", edges: 3 },
  { id: "tooltip", group: "标记", slug: "tooltip", prep: hoverOpen("[data-slot=tooltip-trigger]"), box: "[data-slot=tooltip-popup]", edges: 3 },
  { id: "popover", group: "标记", slug: "popover", prep: open("[data-slot=popover-trigger]"), box: "[data-slot=popover-popup]", edges: 3 },
  { id: "dialog", group: "标记", slug: "dialog", prep: open("[data-slot=dialog-trigger]"), box: "[data-slot=dialog-popup]", edges: 3 },
  { id: "kbd", group: "标记", slug: "kbd", box: "[data-slot=kbd]", edges: 3 },
  { id: "separator", group: "标记", slug: "separator", ink: { sel: "[data-slot=separator][data-orientation=horizontal]", minPx: 20 } },
  { id: "card", group: "标记", slug: "card", box: "[data-slot=card]", edges: 3 },
];

// ------------------------------------------------------------------ run -----
const sym = { PASS: "P", FAIL: "F", UNVERIFIED: "U", "-": "-" };

async function runPart(ctx, spec) {
  const cell = { B: R("-"), S: R("-"), F: R("-") };
  const guard = async (fn) => { try { return await fn(); } catch (error) { return UNV(`脚本异常：${error.message.split("\n")[0].slice(0, 100)}`); } };
  if (spec.box) cell.B = await guard(() => checkBox(ctx, spec));
  if (spec.ink) { const r = await guard(() => checkInk(ctx, spec)); if (spec.inkIsState) cell.S = r; else cell.B = r; }
  if (spec.state) cell.S = await guard(() => checkState(ctx, spec));
  if (spec.pair) { const r = await guard(() => checkPair(ctx, spec)); if (spec.pairIsState) cell.S = r; else cell.B = r; }
  if (spec.focus) cell.F = await guard(() => checkFocus(ctx, spec));
  return cell;
}

/** Serialized into the page. keepFocus keeps the one rule the library had before the matrix was measured. */
function stripForcedColorRules(keepFocus) {
  const walk = (parent, inLayer) => {
    const list = parent.cssRules;
    for (let i = list.length - 1; i >= 0; i--) {
      const rule = list[i];
      if (rule instanceof CSSMediaRule && /forced-colors:\s*active/.test(rule.conditionText)) {
        if (inLayer && keepFocus) {
          for (let j = rule.cssRules.length - 1; j >= 0; j--) if (rule.cssRules[j].selectorText !== ":focus-visible") rule.deleteRule(j);
        } else parent.deleteRule(i);
      } else if (rule.cssRules) walk(rule, inLayer || rule instanceof CSSLayerBlockRule);
    }
  };
  let touched = 0;
  for (const sheet of document.styleSheets) { try { walk(sheet, false); touched++; } catch { /* cross-origin sheet */ } }
  return touched;
}

/** System-colour keywords declared outside any forced-colors media rule. */
function systemColorLeaks() {
  const found = [];
  const re = /\b(Highlight|HighlightText|GrayText|ButtonBorder|ButtonFace|ButtonText|CanvasText)\b/;
  const walk = (list, forced) => {
    for (const rule of list) {
      if (rule instanceof CSSMediaRule && /forced-colors/.test(rule.conditionText)) continue;
      if (rule.cssRules) { walk(rule.cssRules, forced); continue; }
      if (rule.style && re.test(rule.style.cssText)) found.push(rule.cssText.slice(0, 120));
    }
  };
  for (const sheet of document.styleSheets) { try { walk(sheet.cssRules, false); } catch { /* cross-origin */ } }
  return found;
}

async function normalCompare() {
  const slugs = readdirSync(fileURLToPath(new URL("../apps/docs/src/content", import.meta.url)), { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith(".")).map((d) => d.name).sort();
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
  const browser = await chromium.launch(executablePath ? { executablePath } : {});
  let pages = 0, differing = 0, deleted = 0;
  const leaks = new Set();
  try {
    for (const theme of themes) {
      const context = await browser.newContext({ viewport: { width: 1100, height: 900 }, forcedColors: "none", colorScheme: theme, reducedMotion: "reduce", deviceScaleFactor: 1 });
      const decoder = await context.newPage();
      await decoder.goto("about:blank");
      for (const slug of slugs) {
        const page = await context.newPage();
        try {
          await page.goto(`${base}/playground/${slug}?theme=${theme}`, { waitUntil: "networkidle", timeout: 30000 });
          await page.waitForFunction(() => document.querySelector("[data-playground] [data-demo]") || document.querySelector('[data-slot="empty"][data-state="empty"]'), undefined, { timeout: 15000 });
          await page.waitForTimeout(350);
          const a = await page.screenshot({ fullPage: true, animations: "disabled" });
          (await page.evaluate(systemColorLeaks)).forEach((l) => leaks.add(l));
          await page.evaluate(stripForcedColorRules, false);
          await page.waitForTimeout(150);
          const b = await page.screenshot({ fullPage: true, animations: "disabled" });
          pages++;
          if (!a.equals(b)) {
            const [sa, sb] = [await decode(decoder, a), await decode(decoder, b)];
            let diff = sa.w !== sb.w || sa.h !== sb.h ? -1 : 0;
            if (diff === 0) for (let i = 0; i < sa.data.length; i += 4) if (sa.data[i] !== sb.data[i] || sa.data[i + 1] !== sb.data[i + 1] || sa.data[i + 2] !== sb.data[i + 2]) diff++;
            if (diff !== 0) { differing++; console.log(`DIFF ${slug} ${theme}: ${diff} px`); }
          }
        } catch (error) { console.log(`ERR ${slug} ${theme}: ${error.message.split("\n")[0]}`); differing++; }
        await page.close();
      }
      await context.close();
    }
  } finally { await browser.close(); }
  console.log(`normal mode: ${pages} pages compared, ${differing} differ, ${leaks.size} system-colour declarations outside forced-colors media`);
  for (const l of leaks) console.log(`  leak: ${l}`);
  process.exit(differing > 0 || leaks.size > 0 ? 1 : 0);
}
if (hasFlag("--normal-compare")) await normalCompare();

async function main() {
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
  const browser = await chromium.launch(executablePath ? { executablePath } : {});
  const results = {};
  const problems = [];
  try {
    const palette = {};
    for (const theme of themes) {
      const context = await browser.newContext({ viewport: { width: 1100, height: 900 }, forcedColors: "active", colorScheme: theme, reducedMotion: "reduce", deviceScaleFactor: 1 });
      const decoder = await context.newPage();
      await decoder.goto("about:blank");
      palette[theme] = await decoder.evaluate(() => {
        const o = {};
        for (const k of ["Canvas", "CanvasText", "Highlight", "HighlightText", "GrayText", "ButtonBorder"]) {
          const d = document.createElement("div"); d.style.color = k; document.body.append(d); o[k] = getComputedStyle(d).color;
        }
        return o;
      });
      const canvas = theme === "light" ? [255, 255, 255] : [0, 0, 0];
      const page = await context.newPage();
      page.on("pageerror", (e) => problems.push(`${theme}: pageerror ${e.message.slice(0, 100)}`));
      const ctx = { page, decoder, canvas, theme };
      let loaded = null, dirty = true;
      for (const spec of PARTS) {
        if (onlyParts && !onlyParts.includes(spec.id)) continue;
        if (loaded !== spec.slug || dirty || spec.prep) {
          await page.goto(`${base}/playground/${spec.slug}?theme=${theme}`, { waitUntil: "networkidle", timeout: 30000 });
          await page.waitForFunction(() => document.querySelector("[data-playground] [data-demo]"), undefined, { timeout: 15000 }).catch(() => {});
          await page.waitForTimeout(350);
          if (hasFlag("--without-fixes")) await page.evaluate(stripForcedColorRules, true);
          loaded = spec.slug; dirty = false;
        }
        if (spec.prep) {
          try { await spec.prep(page); } catch (error) { results[spec.id] ??= { spec, cells: {} }; results[spec.id].cells[theme] = { B: UNV(`prep 失败：${error.message.split("\n")[0].slice(0, 80)}`), S: R("-"), F: R("-") }; dirty = true; continue; }
          dirty = true;
        }
        results[spec.id] ??= { spec, cells: {} };
        results[spec.id].cells[theme] = await runPart(ctx, spec);
        if (spec.focus) dirty = true;
      }
      if (hasFlag("--shots")) {
        const slugs = readdirSync(fileURLToPath(new URL("../apps/docs/src/content", import.meta.url)), { withFileTypes: true })
          .filter((d) => d.isDirectory() && !d.name.startsWith(".")).map((d) => d.name).sort();
        for (const slug of slugs) {
          await page.goto(`${base}/playground/${slug}?theme=${theme}`, { waitUntil: "networkidle", timeout: 30000 });
          await page.waitForTimeout(300);
          await page.screenshot({ path: join(out, `${slug}-${theme}.png`), fullPage: true });
        }
      }
      await context.close();
    }
    results.__palette = palette;
    results.__version = browser.version();
  } finally {
    await browser.close();
  }
  return { results, problems };
}
function hasFlag(name) { return args.includes(name); }

const { results, problems } = await main();
const palette = results.__palette, version = results.__version;
delete results.__palette; delete results.__version;

const totals = { PASS: 0, FAIL: 0, UNVERIFIED: 0, "-": 0 };
const lines = [];
const header = ["part", ...themes.flatMap((t) => ["B", "S", "F"].map((k) => `${t[0]}${k}`))];
lines.push(header.join("\t"));
const failures = [];
const flat = {};
for (const [id, { spec, cells }] of Object.entries(results)) {
  const row = [id.padEnd(34)];
  for (const t of themes) {
    const c = cells[t];
    for (const k of ["B", "S", "F"]) {
      const cell = c?.[k] ?? R("-");
      row.push(sym[cell.r]);
      totals[cell.r]++;
      if (cell.r !== "-") flat[`${id}|${t}|${k}`] = { r: cell.r, note: cell.note };
      if (cell.r === "FAIL" || cell.r === "UNVERIFIED") failures.push(`${cell.r.padEnd(10)} ${id} ${t} ${k}  ${cell.note}`);
    }
  }
  lines.push(row.join("\t"));
}
console.log(`Chromium ${version}, forcedColors: 'active' (emulated, not a real Windows contrast theme)`);
console.log(`palette ${JSON.stringify(palette)}`);
console.log(lines.join("\n"));
console.log("\n" + failures.join("\n"));
console.log(`\nPASS ${totals.PASS}  FAIL ${totals.FAIL}  UNVERIFIED ${totals.UNVERIFIED}  (not applicable ${totals["-"]})`);
if (problems.length) console.log(`\npage problems:\n${problems.join("\n")}`);

if (reportPath) {
  const parts = Object.entries(results).map(([id, { spec, cells }]) => ({ id, group: spec.group, slug: spec.slug, cells }));
  writeFileSync(reportPath, JSON.stringify({ chromium: version, palette, totals, parts }, null, 2));
}
if (comparePath) {
  const before = JSON.parse(readFileSync(comparePath, "utf8"));
  const prev = {};
  for (const p of before.parts) for (const [t, cell] of Object.entries(p.cells)) for (const k of ["B", "S", "F"]) if (cell[k].r !== "-") prev[`${p.id}|${t}|${k}`] = cell[k].r;
  console.log("\nchanges since " + comparePath);
  for (const [key, cell] of Object.entries(flat)) if (prev[key] && prev[key] !== cell.r) console.log(`${key}: ${prev[key]} -> ${cell.r}`);
}
process.exit(totals.FAIL > 0 || problems.length > 0 ? 1 : 0);

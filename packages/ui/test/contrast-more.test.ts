import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import postcss from "postcss";
import { describe, expect, test } from "vitest";
import { checkPair, inspectSourceContrast, libraryPairs, resolveColor, tokenValues } from "./contrast-check";

// `prefers-contrast: more`（tokens/contrast.css）：墨阶上移一档后，基础层 §16 的对比底线仍然成立。
// contrast-check 把条件块里的 token 记为 UNVERIFIED（它不知道媒体查询是否成立），所以这里取出
// `prefers-contrast: more` 块里的规则、去掉媒体壳，作为偏好开启时的声明叠在默认值之后求值。
const root = join(__dirname, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");
const base = ["tokens/primitives.css", "tokens/semantic.css", "tokens/components.css"].map(read);
const contrast = read("tokens/contrast.css");

function preferenceRules(): string {
  const rules: string[] = [];
  postcss.parse(contrast).walkAtRules("media", (media) => {
    if (/prefers-contrast:\s*more/.test(media.params) && /forced-colors:\s*none/.test(media.params)) media.each((node) => { if (node.type === "rule") rules.push(node.toString()); });
  });
  return rules.join("\n");
}
const more = [...base, preferenceRules()];
const rungs = ["jiao", "nong", "zhong", "dan", "qing"] as const;

describe("prefers-contrast: more", () => {
  test("墨阶每一阶取原阶梯的上一阶，顶端取墨的满值", () => {
    const original = tokenValues(base, "light");
    const shifted = tokenValues(more, "light");
    const ladder = rungs.map((rung) => original.get(`--qy-ink-${rung}`));
    expect(ladder).toEqual(["88%", "66%", "50%", "24%", "8%"]);
    // 焦 -> 满值；浓 -> 原焦；重 -> 原浓；淡 -> 原重；清 -> 原淡
    expect(rungs.map((rung) => shifted.get(`--qy-ink-${rung}`))).toEqual(["100%", ladder[0], ladder[1], ladder[2], ladder[3]]);
  });

  test("只在 prefers-contrast: more 一个条件里，且不触碰尺寸、圆角、线宽、间距与数据编码色", () => {
    const touched = new Set<string>();
    postcss.parse(contrast).walkDecls((decl) => { touched.add(decl.prop); });
    expect([...touched].sort()).toEqual(["--qy-danger-soft", "--qy-groove-surface", "--qy-info-soft", "--qy-ink-dan", "--qy-ink-jiao", "--qy-ink-nong", "--qy-ink-qing", "--qy-ink-zhong", "--qy-success-soft", "--qy-surface-hover", "--qy-warning-soft", "--qy-wash-qing"]);
    const media: string[] = [];
    postcss.parse(contrast).walkAtRules("media", (rule) => { media.push(rule.params.replace(/\s+/g, " ")); });
    expect(media).toEqual(["(prefers-contrast: more) and (forced-colors: none)"]);
    // 不是属性开关：规则只落在明暗的根上，没有 data-contrast 之类的第四轴
    const selectors = new Set<string>();
    postcss.parse(contrast).walkRules((rule) => { postcss.list.comma(rule.selector).forEach((s) => selectors.add(s)); });
    expect([...selectors].sort()).toEqual([".dark", ".light", ":root", "[data-theme]"]);
  });

  test.each(["light", "dark"] as const)("%s: 地与数据不动：凹槽、底纸、subtle 面、内嵌面、柔底、悬停面（图系列色与状态色压在它们上面，须 ≥ 3:1）", (appearance) => {
    const original = tokenValues(base, appearance);
    const shifted = tokenValues(more, appearance);
    for (const role of ["groove-surface", "background", "surface-subtle", "surface-inset", "neutral-soft", "danger-soft", "warning-soft", "success-soft", "info-soft", "surface-hover"]) {
      const a = resolveColor(`var(--qy-${role})`, original);
      const b = resolveColor(`var(--qy-${role})`, shifted);
      a.forEach((channel, i) => expect(b[i], role).toBeCloseTo(channel, 10));
    }
  });

  test.each(["light", "dark"] as const)("%s: 反馈三级（清染 < 悬停 < 淡染）在两种偏好下都逐级加深", (appearance) => {
    const level = (tokens: Map<string, string>, name: string) => resolveColor(`var(--qy-${name})`, tokens)[3];
    for (const tokens of [tokenValues(base, appearance), tokenValues(more, appearance)]) {
      expect(level(tokens, "surface-inset")).toBeLessThan(level(tokens, "surface-hover"));
      expect(level(tokens, "surface-hover")).toBeLessThan(level(tokens, "surface-active"));
    }
  });

  test.each(["light", "dark"] as const)("%s: 全部库内角色组合在偏好开启时仍满足各自的底线", (appearance) => {
    const tokens = tokenValues(more, appearance);
    const results = libraryPairs(appearance).map((pair) => checkPair(pair, tokens));
    expect(results.filter((r) => r.status !== "PASS")).toEqual([]);
    const dir = join(root, "src/components");
    const sourceResults = readdirSync(dir).filter((name) => name.endsWith(".tsx")).flatMap((name) => inspectSourceContrast(read(`src/components/${name}`), tokens, name));
    expect(sourceResults.filter((r) => r.status === "FAIL")).toEqual([]);
  });

  test.each(["light", "dark"] as const)("%s: 偏好开启后，每条线与每个字都不比默认更淡", (appearance) => {
    const original = tokenValues(base, appearance);
    const shifted = tokenValues(more, appearance);
    const ratio = (tokens: Map<string, string>, role: string) => checkPair({ pair: role, foreground: `var(--qy-${role})`, background: ["var(--qy-surface)"], minimum: 0 }, tokens).ratio!;
    for (const role of ["foreground", "foreground-muted", "border", "border-input", "border-strong", "button-bordered-border", "surface-active"]) {
      expect(ratio(shifted, role), role).toBeGreaterThanOrEqual(ratio(original, role));
    }
  });
});

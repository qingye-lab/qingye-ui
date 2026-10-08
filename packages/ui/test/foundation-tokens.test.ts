import { readFileSync } from "node:fs";
import { compile } from "tailwindcss";
import { expect, test } from "vitest";
import { TEXT_STEPS } from "../src/text-steps";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");
const tokens = read("../tokens/components.css");
const declaration = (name: string) => {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return tokens.match(new RegExp(`${escaped}:\\s*([^;]+);`))?.[1];
};

// 以材为祖（基础层 §1–2）：几何由材与分推出。断言的是关系而不是逐个预设：
// 改材或分，下面每一条都应当仍然成立。px 由一个只认 var/calc/rem/px 的小求值器算出。
const px = (expression: string, depth = 0): number => {
  if (depth > 20) throw new Error(`unresolvable: ${expression}`);
  const resolved = expression.replace(/var\((--[a-z0-9-]+)\)/g, (_m, name: string) => {
    const value = declaration(name);
    if (value === undefined) throw new Error(`missing ${name}`);
    return `(${px(value, depth + 1)})`;
  });
  const arithmetic = resolved.replace(/calc\(/g, "(").replace(/(-?[0-9.]+)rem/g, (_m, n: string) => String(Number(n) * 16)).replace(/(-?[0-9.]+)px/g, "$1");
  if (!/^(?:[0-9.+\-*/(), ]|round)+$/.test(arithmetic)) throw new Error(`not arithmetic: ${arithmetic}`);
  // CSS round(值, 步长)：取最近的步长倍数，正数恰在中点时向上。
  return Function("round", `return (${arithmetic});`)((value: number, step: number) => Math.round(value / step) * step) as number;
};

test("材与分是唯一的两个尺度锚点：材 20px，分 = 材 / 5", () => {
  expect(px("var(--qy-cai)")).toBe(20);
  expect(declaration("--qy-fen")).toBe("calc(var(--qy-cai) / 5)");
  expect(px("var(--qy-fen)")).toBe(4);
});

test.each([["xs", 1], ["sm", 2], ["md", 3], ["lg", 4], ["xl", 5]] as const)(
  "%s 控件外高 = 材 + %i 分，留白与圆角由外高推出", (size, grade) => {
  const height = px(`var(--qy-control-${size})`);
  expect(height).toBe(20 + grade * 4);
  // 窄屏升一等。
  expect(px(`var(--qy-control-${size}-narrow)`)).toBe(height + 4);
  // 横向留白 = (外高 − 分) / 2 = 纵向余量 + 2 分。
  expect(px(`var(--qy-control-${size}-padding)`)).toBe((height - 4) / 2);
  expect(px(`var(--qy-control-${size}-padding)`)).toBe((height - 20) / 2 + 8);
  expect(declaration(`--qy-control-${size}-padding-bordered`)).toBe(`calc(var(--qy-control-${size}-padding) - 1px)`);
  // 图标为偶数且整像素居中。
  const icon = px(`var(--qy-control-${size}-icon)`);
  expect(icon % 2).toBe(0);
  expect((height - icon) % 2).toBe(0);
  // 几何不读间距阶梯：调全局间距不会顺带改控件。
  expect(declaration(`--qy-control-${size}`)).not.toContain("--qy-space-");
});

test("圆角与外高成比例 r = round(外高 × 5/16)；浮层内项与控件同角且同心；面板 4 分", () => {
  for (const size of ["xs", "sm", "md", "lg", "xl"]) expect(px(`var(--qy-radius-${size})`), size).toBe(Math.round(px(`var(--qy-control-${size})`) * 5 / 16));
  expect([8, 9, 10, 11, 13]).toEqual(["xs", "sm", "md", "lg", "xl"].map(size => px(`var(--qy-radius-${size})`)));
  expect(px("var(--qy-radius-control)")).toBe(px("var(--qy-radius-md)"));
  expect(px("var(--qy-radius-overlay)") - px("var(--qy-overlay-inset)")).toBe(px("var(--qy-radius-control)"));
  expect(px("var(--qy-radius-marker)")).toBe(Math.round(px("var(--qy-marker-size)") * 5 / 16));
  expect(px("var(--qy-radius-panel)")).toBe(4 * px("var(--qy-fen)"));
});

test("文字行高都在分格上", () => {
  for (const role of TEXT_STEPS) expect(px(`var(--qy-text-${role}-leading)`) % 4, role).toBe(0);
  expect(px("var(--qy-text-body-leading)")).toBe(px("var(--qy-cai)"));
});

test.each([
  ["xs", 12, 14], ["sm", 13, 14], ["md", 14, 15], ["lg", 16, 17],
] as const)("control-%s has independent desktop/narrow typography with all four properties", (size, desktop, narrow) => {
  expect(px(`var(--qy-text-control-${size}-size)`)).toBe(desktop);
  expect(px(`var(--qy-text-control-${size}-mobile-size)`)).toBe(narrow);
  for (const suffix of ["", "-mobile"]) for (const property of ["size", "leading", "tracking", "weight"]) {
    const value = declaration(`--qy-text-control-${size}${suffix}-${property}`);
    expect(value).toBeDefined();
    expect(value).not.toContain("var(--qy-text-");
  }
});

test("the converged registry contains exactly the semantic steps with no retired names", () => {
  // 31 → 33（2026-10-03）：control-xl / control-xl-mobile。xl 档曾借用 lg 文字档，
  // 高度增加只换来纵向空白；每个尺寸档现在都有同名文字档。
  // 33 → 36（2026-10-08）：prose-h1 / -h2 / -h3。长文自有标题阶梯，界面的 title/chapter 读不出长文层级。
  expect(TEXT_STEPS).toHaveLength(36);
  for (const role of ["lead", "subheading", "panel-title", "micro-tight", "button", "field-input", "field-label"]) expect(TEXT_STEPS).not.toContain(role);
  for (const role of TEXT_STEPS) for (const property of ["size", "leading", "tracking", "weight"]) expect(declaration(`--qy-text-${role}-${property}`)).toBeDefined();
  // Assistance and dense-region content are distinct semantic scopes (§8).
  expect(TEXT_STEPS).toContain("support-strong-mobile");
  expect(TEXT_STEPS).toContain("dense-strong-mobile");
});

test("every semantic step compiles its own quartet; metric leaves figure alignment to numeric", async () => {
  const theme = read("../theme.css").replace(/@import "\.\/([^\"]+)";/g, (_match, path: string) => read(`../${path}`));
  const compiler = await compile(`${read("../node_modules/tailwindcss/theme.css")}\n${theme}\n${read("../utilities.css")}\n@tailwind utilities;`);
  const css = compiler.build(TEXT_STEPS.map((role) => `text-${role}`));
  // Tailwind may emit a custom extension and the theme quartet as separate
  // rules for the same selector when several utilities compile together.
  const rules = (role: string) => [...css.matchAll(new RegExp(`\\.text-${role} \\{[^}]+\\}`, "g"))].map((match) => match[0]).join("\n");
  for (const role of TEXT_STEPS) {
    const selector = `.text-${role} {`;
    expect(css).toContain(selector);
    const rule = rules(role);
    expect(rule).toContain(`font-size: var(--qy-text-${role}-size)`);
    expect(rule).toContain(`line-height: var(--tw-leading, var(--qy-text-${role}-leading))`);
    expect(rule).toContain(`letter-spacing: var(--tw-tracking, var(--qy-text-${role}-tracking))`);
    expect(rule).toContain(`font-weight: var(--tw-font-weight, var(--qy-text-${role}-weight))`);
  }
  // 单独的大号读数用比例数字；等宽只在需要纵向对齐时由 numeric 显式加上（基础层 §8）。
  const metric = rules("metric");
  expect(metric).not.toContain("tabular-nums");
});

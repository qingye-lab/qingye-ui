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
  if (!/^[0-9.+\-*/() ]+$/.test(arithmetic)) throw new Error(`not arithmetic: ${arithmetic}`);
  return Function(`return (${arithmetic});`)() as number;
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

test("圆角：方整控件 r = min(外高 / 4, 2 分)；浮层内项与控件同角且同心", () => {
  const radius = (size: string) => px(`var(--qy-radius-${size === "md" || size === "lg" || size === "xl" ? "control" : size})`);
  for (const size of ["xs", "sm", "md", "lg", "xl"]) expect(radius(size)).toBe(Math.min(px(`var(--qy-control-${size})`) / 4, 8));
  expect(px("var(--qy-radius-overlay)") - px("var(--qy-overlay-inset)")).toBe(px("var(--qy-radius-control)"));
  expect(px("var(--qy-radius-marker)")).toBe(px("var(--qy-marker-size)") / 4);
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
  expect(TEXT_STEPS).toHaveLength(33);
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

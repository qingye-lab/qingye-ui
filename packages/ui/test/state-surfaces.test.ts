import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import postcss from "postcss";
import { describe, expect, test } from "vitest";
import { composite, resolveColor, tokenValues } from "./contrast-check";

// 2026-10-12 用户裁决：选中色由 token 生效，与底色有关系。这里读真实的 token 文件，不抄值：
// 断言的是关系——悬停 = 选中 < 按下，三者同源于 --qy-ink-qing；所有「选中 / 当前」的角色都经 --qy-surface-selected。
const root = join(__dirname, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");
const sources = ["tokens/primitives.css", "tokens/semantic.css", "tokens/components.css"].map(read);
const alpha = (tokens: Map<string, string>, name: string) => resolveColor(`var(--qy-${name})`, tokens)[3];

function declarations(source: string, prop: string): string[] {
  const values: string[] = [];
  postcss.parse(source).walkDecls(prop, (decl) => { values.push(decl.value); });
  return values;
}

describe.each(["light", "dark"] as const)("反馈梯与选中面（%s）", (appearance) => {
  const tokens = tokenValues(sources, appearance);

  test("静止 ≤ 悬停 = 选中 < 按下，悬停不深于选中", () => {
    expect(alpha(tokens, "surface-inset")).toBeLessThanOrEqual(alpha(tokens, "surface-hover"));
    expect(alpha(tokens, "surface-hover")).toBeCloseTo(alpha(tokens, "surface-selected"), 12);
    expect(alpha(tokens, "surface-selected")).toBeLessThan(alpha(tokens, "surface-active"));
  });

  test("侧栏当前项文字默认继承已有悬停文字，独立覆盖不改变悬停色", () => {
    const current = "var(--qy-sidebar-current-foreground)";
    const hover = "var(--qy-sidebar-accent-foreground)";
    expect(resolveColor(current, tokens)).toEqual(resolveColor(hover, tokens));
    const branded = new Map(tokens).set("--qy-sidebar-accent-foreground", "rgb(12, 80, 40)");
    expect(resolveColor(current, branded)).toEqual(resolveColor(hover, branded));
    const separate = new Map(branded).set("--qy-sidebar-current-foreground", "rgb(255, 255, 255)");
    expect(resolveColor(current, separate)).not.toEqual(resolveColor(hover, separate));
    expect(resolveColor(hover, separate)).toEqual(resolveColor(hover, branded));
  });

  test("三者同源于墨原子 --qy-ink-qing：调整它，线、悬停、选中与按下一起移动", () => {
    const before = ["surface-hover", "surface-selected", "surface-active", "border"].map((name) => resolveColor(`var(--qy-${name})`, tokens));
    const moved = new Map(tokens).set("--qy-ink-qing", "16%");
    const after = ["surface-hover", "surface-selected", "surface-active", "border"].map((name) => resolveColor(`var(--qy-${name})`, moved));
    before.forEach((color, i) => expect(after[i], String(i)).not.toEqual(color));
    expect(alpha(moved, "surface-active")).toBeCloseTo(2 * alpha(moved, "surface-selected"), 12);
  });

  test("代码面取页面底纸；标题栏里选中的段与侧栏当前项是同一种颜色", () => {
    expect(declarations(read("tokens/components.css"), "--qy-code-surface")).toEqual(["var(--qy-background)"]);
    expect(declarations(read("tokens/semantic.css"), "--qy-sidebar")).toEqual(["var(--qy-background)"]);
    const paint = (...layers: string[]) => layers.map((layer) => resolveColor(layer, tokens)).reduce((below, layer) => composite(layer, below), [0, 0, 0, 0]);
    const inCodeHeader = paint("var(--qy-code-surface)", "var(--qy-track-selected)");
    const inSidebar = paint("var(--qy-sidebar)", "var(--qy-sidebar-current)");
    inCodeHeader.forEach((channel, i) => expect(inSidebar[i], String(i)).toBeCloseTo(channel, 12));
  });
});

test("每个「选中 / 当前」的角色只是 --qy-surface-selected 的别名，不带自己的取值", () => {
  const semantic = read("tokens/semantic.css");
  expect(declarations(semantic, "--qy-track-selected")).toEqual(["var(--qy-surface-selected)"]);
  expect(declarations(semantic, "--qy-sidebar-current")).toEqual(["var(--qy-surface-selected)"]);
  // 没有组件在局部改写这两个角色（改写意味着选中色又散回单个组件）。
  const dir = join(root, "src");
  const files = [...readdirSync(dir).filter((name) => /\.tsx?$/.test(name)).map((name) => join(dir, name)), ...readdirSync(join(dir, "components")).map((name) => join(dir, "components", name))];
  for (const file of files) expect(readFileSync(file, "utf8"), file).not.toMatch(/--qy-(?:sidebar-current|track-selected|surface-selected)\s*:/);
});

test("圆角比例只写在 --qy-radius-ratio 一处", () => {
  const components = read("tokens/components.css");
  expect(declarations(components, "--qy-radius-ratio")).toEqual(["calc(5 / 16)"]);
  const literal: string[] = [];
  postcss.parse(components).walkDecls((decl) => { if (/\b5\s*\/\s*16\b/.test(decl.value) && decl.prop !== "--qy-radius-ratio") literal.push(decl.prop); });
  expect(literal).toEqual([]);
  for (const prop of ["xs", "sm", "md", "lg", "xl", "marker", "track", "slider-track"]) expect(declarations(components, `--qy-radius-${prop}`)[0], prop).toContain("var(--qy-radius-ratio)");
});

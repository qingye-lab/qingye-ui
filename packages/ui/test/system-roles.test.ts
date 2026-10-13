import { readFileSync } from "node:fs";
import { join } from "node:path";
import postcss from "postcss";
import { compile } from "tailwindcss";
import { describe, expect, test } from "vitest";
import { resolveColor, tokenValues } from "./contrast-check";

// 系统角色（2026-10-12，WP1）：此前每个组件各写一份的基础角色——线宽、半分、禁用不透明度、填值控件静止面、
// 小方块圆角上限比、字框、表头行、行内文字、动效幅度、浮层间距、通知边距、danger 的 bordered 线、装饰墨。
// 硬规则是「零计算值变化」：每个新 token 取的是组件今天写的那个值。这里逐条断言：
//   1. token 的值与关系（不是抄一个字符串，而是算出来与「今天组件写的表达式」相等）；
//   2. 契约里列出的工具类确实被 Tailwind 编译出规则，并读 token；
//   3. 数据取自真实的 tokens/*.css 与 theme.css，不抄值。
const root = join(__dirname, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");
const primitives = read("tokens/primitives.css");
const semantic = read("tokens/semantic.css");
const components = read("tokens/components.css");
const sources = [primitives, semantic, components];

const decls = (source: string, prop: string): string[] => {
  const values: string[] = [];
  postcss.parse(source).walkDecls(prop, (decl) => { values.push(decl.value); });
  return values;
};
const declaration = (name: string): string => {
  const found = decls(components, name);
  expect(found, `${name} is declared exactly once in components.css`).toHaveLength(1);
  return found[0]!;
};

// components.css 的小求值器：只认 var / calc / rem / px / round / min / max；em 与 % 不在其内（单独断言字符串）。
const px = (expression: string, depth = 0): number => {
  if (depth > 24) throw new Error(`unresolvable: ${expression}`);
  const resolved = expression.replace(/var\((--[a-z0-9-]+)\)/g, (_m, name: string) => `(${px(declaration(name), depth + 1)})`);
  const arithmetic = resolved.replace(/calc\(/g, "(").replace(/(-?[0-9.]+)rem/g, (_m, n: string) => String(Number(n) * 16)).replace(/(-?[0-9.]+)px/g, "$1");
  if (!/^(?:[0-9.+\-*/(), ]|round|min|max)+$/.test(arithmetic)) throw new Error(`not arithmetic: ${arithmetic}`);
  return Function("round", "min", "max", `return (${arithmetic});`)((v: number, step: number) => Math.round(v / step) * step, Math.min, Math.max) as number;
};

describe("线宽 --qy-line-width", () => {
  test("是 1px；边框占掉的那一道（-padding-bordered）、安静焦点线宽读它，值与此前字面 1px 相同", () => {
    expect(declaration("--qy-line-width")).toBe("1px");
    for (const size of ["xs", "sm", "md", "lg", "xl"]) {
      expect(declaration(`--qy-control-${size}-padding-bordered`), size).toBe(`calc(var(--qy-control-${size}-padding) - var(--qy-line-width))`);
      expect(px(`var(--qy-control-${size}-padding-bordered)`), size).toBe(px(`var(--qy-control-${size}-padding)`) - 1);
    }
    expect(declaration("--qy-focus-quiet-width")).toBe("var(--qy-line-width)");
    expect(px("var(--qy-focus-quiet-width)")).toBe(1);
    // 焦点的 2px 是唯一的例外宽度（基础层 §15），不读线宽。
    expect(declaration("--qy-focus-ring-width")).toBe("2px");
  });

  test("强制颜色下的补线读它，而且 styles.css 里不再有字面 1px 的 outline 补线", () => {
    const styles = read("styles.css");
    expect(styles).not.toMatch(/outline:\s*1px\s+solid/);
    expect(styles).not.toMatch(/outline-offset:\s*-1px/);
    expect(styles.match(/outline:\s*var\(--qy-line-width\)\s+solid/g)?.length).toBe(7);
  });
});

describe("半分 --qy-fen-half", () => {
  test("= 分 / 2 = 2px；轨道内缩与读数轨道分格的缝宽读它", () => {
    expect(declaration("--qy-fen-half")).toBe("calc(var(--qy-fen) / 2)");
    expect(px("var(--qy-fen-half)")).toBe(2);
    expect(declaration("--qy-track-inset")).toBe("var(--qy-fen-half)");
    expect(px("var(--qy-track-inset)")).toBe(2);
    expect(decls(read("utilities.css"), "--qy-segment-gap")).toEqual(["var(--qy-fen-half)"]);
  });
});

describe("Tailwind 的 --spacing 与 --qy-fen", () => {
  test("两者都是 rem，数值相同：绑定在任何根字号下逐值不变", () => {
    const tailwindSpacing = /--spacing:\s*([0-9.]+)rem;/.exec(read("node_modules/tailwindcss/theme.css"))?.[1];
    expect(tailwindSpacing).toBe("0.25");
    // 分 = 材 / 5 = 1.25rem / 5：同为 rem，不含 px（px 才会在非 16px 根字号下与 0.25rem 分道扬镳）。
    expect(declaration("--qy-cai")).toMatch(/^[0-9.]+rem$/);
    expect(declaration("--qy-fen")).toBe("calc(var(--qy-cai) / 5)");
    expect(parseFloat(declaration("--qy-cai")) / 5).toBeCloseTo(Number(tailwindSpacing), 12);
    expect(read("theme.css")).toContain("--spacing: var(--qy-fen);");
  });
});

// theme.css（含 @import 的三层 token）接上 Tailwind 自带的默认主题，编出契约里列出的工具类。
const themeSource = () => read("theme.css").replace(/@import "\.\/([^"]+)";/g, (_m, path: string) => read(path));
async function build(candidates: string[]): Promise<string> {
  const compiler = await compile(`${read("node_modules/tailwindcss/theme.css")}\n${themeSource()}\n${read("utilities.css")}\n@tailwind utilities;`);
  return compiler.build(candidates);
}
/** 取一条选择器对应的整条规则文本；选择器里的特殊字符按 Tailwind 的转义写。 */
const rule = (css: string, selector: string): string => {
  const start = css.indexOf(`${selector} {`);
  if (start < 0) return "";
  return css.slice(start, css.indexOf("}", start) + 1);
};

describe("契约里的工具类：编出规则、读 token", () => {
  // [类名, 转义后的选择器, 期望出现在规则里的声明]
  const contract: [string, string, string][] = [
    ["opacity-disabled", ".opacity-disabled", "opacity: var(--qy-opacity-disabled)"],
    ["bg-surface-field", ".bg-surface-field", "background-color: var(--qy-surface-field)"],
    ["bg-ink-decor", ".bg-ink-decor", "background-color: var(--qy-ink-decor)"],
    ["text-ink-decor", ".text-ink-decor", "color: var(--qy-ink-decor)"],
    ["border", ".border", "border-width: var(--qy-line-width)"],
    ["border-b", ".border-b", "border-bottom-width: var(--qy-line-width)"],
    ["border-s", ".border-s", "border-inline-start-width: var(--qy-line-width)"],
    ["border-e", ".border-e", "border-inline-end-width: var(--qy-line-width)"],
    ["border-t", ".border-t", "border-top-width: var(--qy-line-width)"],
    ["w-line", ".w-line", "width: var(--qy-line-width)"],
    ["pb-line", ".pb-line", "padding-bottom: var(--qy-line-width)"],
    ["-mb-line", ".-mb-line", "margin-bottom: calc(var(--qy-line-width) * -1)"],
    ["-ms-line", ".-ms-line", "margin-inline-start: calc(var(--qy-line-width) * -1)"],
    ["inset-ring-(length:--qy-line-width)", ".inset-ring-\\(length\\:--qy-line-width\\)", "inset 0 0 0 var(--qy-line-width)"],
    ["decoration-(length:--qy-line-width)", ".decoration-\\(length\\:--qy-line-width\\)", "text-decoration-thickness: var(--qy-line-width)"],
    ["gap-fen-half", ".gap-fen-half", "gap: var(--qy-fen-half)"],
    ["h-fen-half", ".h-fen-half", "height: var(--qy-fen-half)"],
    ["min-w-fen-half", ".min-w-fen-half", "min-width: var(--qy-fen-half)"],
    ["gap-0.5", ".gap-0\\.5", "gap: calc(var(--qy-fen) * 0.5)"],
    ["w-16", ".w-16", "width: calc(var(--qy-fen) * 16)"],
    ["rounded-(--qy-swatch-radius)", ".rounded-\\(--qy-swatch-radius\\)", "border-radius: var(--qy-swatch-radius)"],
    ["h-(--qy-header-row)", ".h-\\(--qy-header-row\\)", "height: var(--qy-header-row)"],
    ["h-(--qy-glyph-box)", ".h-\\(--qy-glyph-box\\)", "height: var(--qy-glyph-box)"],
    ["min-w-(--qy-glyph-box)", ".min-w-\\(--qy-glyph-box\\)", "min-width: var(--qy-glyph-box)"],
    ["my-(--qy-glyph-box-inset)", ".my-\\(--qy-glyph-box-inset\\)", "margin-block: var(--qy-glyph-box-inset)"],
    ["text-(length:--qy-inline-code-size)", ".text-\\(length\\:--qy-inline-code-size\\)", "font-size: var(--qy-inline-code-size)"],
    ["underline-offset-(--qy-underline-offset)", ".underline-offset-\\(--qy-underline-offset\\)", "text-underline-offset: var(--qy-underline-offset)"],
    ["min-w-[min(100%,var(--qy-field-min-text))]", ".min-w-\\[min\\(100\\%\\,var\\(--qy-field-min-text\\)\\)\\]", "min-width: min(100%,var(--qy-field-min-text))"],
    ["top-(--qy-notice-inset)", ".top-\\(--qy-notice-inset\\)", "top: var(--qy-notice-inset)"],
    ["mt-(--qy-popup-offset)", ".mt-\\(--qy-popup-offset\\)", "margin-top: var(--qy-popup-offset)"],
    ["border-(--qy-button-bordered-border-danger)", ".border-\\(--qy-button-bordered-border-danger\\)", "border-color: var(--qy-button-bordered-border-danger)"],
  ];
  test.each(contract)("%s", async (candidate, selector, declaration) => {
    const css = await build([candidate]);
    // 比较时去掉空白：Tailwind 会在逗号后补空格（min(100%, var(…))），那只是排版。
    const squash = (text: string) => text.replace(/\s+/g, "");
    expect(squash(rule(css, selector)), `${selector} not emitted:\n${css.slice(0, 400)}`).toContain(squash(declaration));
  });

  test("裸 border 读线宽，数字写法与 px 写法不读（这是边界，不是疏漏）", async () => {
    const css = await build(["border", "border-0", "border-b-0", "border-2", "w-px", "inset-ring"]);
    expect(rule(css, ".border")).toContain("var(--qy-line-width)");
    expect(rule(css, ".border-0")).toContain("border-width: 0px");
    expect(rule(css, ".border-b-0")).toContain("border-bottom-width: 0px");
    expect(rule(css, ".border-2")).toContain("border-width: 2px");
    expect(rule(css, ".w-px")).toContain("width: 1px");
    expect(rule(css, ".inset-ring")).toContain("inset 0 0 0 1px");
  });

  test("divide-y / divide-x 读线宽", async () => {
    const css = await build(["divide-y", "divide-x"]);
    expect(css).toContain("calc(var(--qy-line-width) * var(--tw-divide-y-reverse))");
    expect(css).toContain("calc(var(--qy-line-width) * var(--tw-divide-x-reverse))");
  });
});

describe("禁用不透明度", () => {
  test("--qy-opacity-disabled = 64%，与组件今天写的 opacity-64 同一个值", async () => {
    expect(declaration("--qy-opacity-disabled")).toBe("64%");
    const css = await build(["opacity-64", "opacity-disabled"]);
    expect(rule(css, ".opacity-64")).toContain("opacity: 64%");
    expect(rule(css, ".opacity-disabled")).toContain("opacity: var(--qy-opacity-disabled)");
  });
});

describe.each(["light", "dark"] as const)("填值控件静止面 --qy-surface-field（%s）", (appearance) => {
  const sameColor = (a: number[], b: number[]) => a.forEach((channel, i) => expect(b[i]).toBeCloseTo(channel, 12));
  test("与组件今天的 `bg-card dark:bg-surface-inset` 逐通道相同：浅色 = 纸本色，深色 = 内嵌面", () => {
    const tokens = tokenValues(sources, appearance);
    const field = resolveColor("var(--qy-surface-field)", tokens);
    const legacy = resolveColor(appearance === "light" ? "var(--qy-surface)" : "var(--qy-surface-inset)", tokens);
    sameColor(legacy, field);
    // bg-card 就是 --qy-surface（theme.css）：浅色里两条写法指向同一个角色。
    expect(read("theme.css")).toContain("--color-card: var(--qy-surface);");
  });

  test("高对比偏好下仍相同：浅色随纸，深色随内嵌面（内嵌面钉在 4%，面不随偏好漂移）", () => {
    const preference: string[] = [];
    postcss.parse(read("tokens/contrast.css")).walkAtRules("media", (media) => {
      media.each((node) => { if (node.type === "rule") preference.push(node.toString()); });
    });
    const tokens = tokenValues([...sources, preference.join("\n")], appearance);
    const field = resolveColor("var(--qy-surface-field)", tokens);
    const legacy = resolveColor(appearance === "light" ? "var(--qy-surface)" : "var(--qy-surface-inset)", tokens);
    sameColor(legacy, field);
  });

  test("没有被禁用的字段读它，禁用面仍是内嵌面（名实相符）", () => {
    const tokens = tokenValues(sources, appearance);
    // 禁用面 = surface-inset 在两个明暗里都是同一个 token；浅色里它不同于静止面（纸），深色里与静止面重合。
    const inset = resolveColor("var(--qy-surface-inset)", tokens);
    const field = resolveColor("var(--qy-surface-field)", tokens);
    if (appearance === "light") expect(field).not.toEqual(inset);
    else expect(field).toEqual(inset);
  });
});

describe("嵌套的局部明暗根：按最近的根求值", () => {
  test("浅色块与深色块各自声明一行 --qy-surface-field，都在会被局部根重算的选择器上", () => {
    const owners: string[] = [];
    postcss.parse(semantic).walkRules((r) => { if (r.some((n) => n.type === "decl" && n.prop === "--qy-surface-field")) owners.push(r.selector.replace(/\s+/g, " ")); });
    expect(owners).toEqual([":root, .light, [data-theme=\"light\"]", ".dark, [data-theme=\"dark\"]"]);
  });
});

describe("小方块圆角上限比", () => {
  test("--qy-radius-cap-ratio = 1/4；色块圆角 = 点边长 × 比例 = 2px，与此前 calc(点边长 / 4) 相同", () => {
    expect(declaration("--qy-radius-cap-ratio")).toBe("calc(1 / 4)");
    expect(declaration("--qy-swatch-radius")).toBe("calc(var(--qy-status-dot-size) * var(--qy-radius-cap-ratio))");
    expect(px("var(--qy-swatch-radius)")).toBe(px("calc(var(--qy-status-dot-size) / 4)"));
    expect(px("var(--qy-swatch-radius)")).toBe(2);
  });
  test("勾选标记 16px → 4px，开关槽 20px → 5px：与此前 /4 相同", () => {
    const edge = px("var(--qy-marker-size)");
    const cap = px("var(--qy-radius-cap-ratio)");
    expect(edge * cap).toBe(edge / 4);
    expect(edge * cap).toBe(4);
    expect(px("var(--qy-switch-size)") * cap).toBe(5);
  });
});

describe("字框、表头行", () => {
  test("字框 = 4 分 = 16px，居中外边距 = (材 − 字框) / 2 = 2px，与此前两条 calc 相同", () => {
    expect(px("var(--qy-glyph-box)")).toBe(px("calc(4 * var(--qy-fen))"));
    expect(px("var(--qy-glyph-box)")).toBe(16);
    expect(px("var(--qy-glyph-box-inset)")).toBe(px("calc((var(--qy-cai) - 4 * var(--qy-fen)) / 2)"));
    expect(px("var(--qy-glyph-box-inset)")).toBe(2);
  });
  test("表头行 = 一材 + 2 个组内间隔 = 36px，与此前 calc(材 + 2 × 字段间隔) 相同", () => {
    expect(px("var(--qy-header-row)")).toBe(px("calc(var(--qy-cai) + 2 * var(--qy-field-gap))"));
    expect(px("var(--qy-header-row)")).toBe(36);
  });
});

describe("行内文字与浮层", () => {
  test("字符串与此前内联的写法一致（em 在使用处求值，不在这里求值）", () => {
    expect(declaration("--qy-inline-code-size")).toBe("round(0.875em, 1px)");
    expect(declaration("--qy-underline-offset")).toBe("round(0.25em, 1px)");
    expect(declaration("--qy-field-min-text")).toBe("4em");
  });
  test("浮层间距 = 1 分 = 4px，与 sideOffset={4} 一致；通知边距 = 6 分 = 24px，与 --qy-space-6 一致", () => {
    expect(px("var(--qy-popup-offset)")).toBe(4);
    expect(declaration("--qy-notice-inset")).toBe("var(--qy-space-6)");
    expect(px("var(--qy-notice-inset)")).toBe(24);
  });
  test("提示面内缘：行向 = 小控件外缘到字（12px），块向 = 行间 + 1 分（8px），都不随密度变", () => {
    expect(px("var(--qy-hint-padding-inline)")).toBe(px("var(--qy-control-sm-padding)"));
    expect(px("var(--qy-hint-padding-inline)")).toBe(12);
    expect(px("var(--qy-hint-padding-block)")).toBe(2 * px("var(--qy-fen)"));
    // declaration() 已断言各只声明一次：紧凑密度的块里没有第二份。
  });
});

describe("动效幅度（motion.css 读 token，数值与此前字面量相同）", () => {
  const motion = read("motion.css");
  test("token 的值", () => {
    expect(declaration("--qy-scale-popup")).toBe("0.98");
    expect(declaration("--qy-scale-press")).toBe("0.97");
    expect(declaration("--qy-travel-nav")).toBe("1.5rem");
    expect(declaration("--qy-travel-dialog")).toBe("1rem");
    expect(declaration("--qy-travel-rise")).toBe("4px");
  });
  test("motion.css 里不再有这些字面量（注释除外）", () => {
    const code = motion.replace(/\/\*[\s\S]*?\*\//g, "");
    expect(code).not.toMatch(/scale:\s*0\.9[78]/);
    expect(code).not.toMatch(/translate:\s*-?1\.5rem/);
    expect(code).not.toMatch(/translate:\s*0\s+1rem/);
    expect(code).not.toMatch(/translate:\s*0\s+4px/);
    expect(code.match(/var\(--qy-scale-popup\)/g)?.length).toBe(2);
    expect(code.match(/var\(--qy-scale-press\)/g)?.length).toBe(1);
  });
});

describe.each(["light", "dark"] as const)("danger 的 bordered 线与装饰墨（%s）", (appearance) => {
  const tokens = tokenValues(sources, appearance);
  test("--qy-button-bordered-border-danger 与 button.tsx 今天内联的表达式逐通道相同", () => {
    // 今天：[--qy-button-bordered-border:color-mix(in_srgb,var(--color-destructive-foreground)_var(--qy-ink-dan),transparent)]，
    // 其中 --color-destructive-foreground 在 theme.css 里是 var(--qy-danger-foreground)。
    expect(read("theme.css")).toContain("--color-destructive-foreground: var(--qy-danger-foreground);");
    const withAlias = new Map(tokens).set("--color-destructive-foreground", "var(--qy-danger-foreground)");
    const legacy = resolveColor("color-mix(in srgb, var(--color-destructive-foreground) var(--qy-ink-dan), transparent)", withAlias);
    const next = resolveColor("var(--qy-button-bordered-border-danger)", tokens);
    legacy.forEach((channel, i) => expect(next[i]).toBeCloseTo(channel, 12));
    expect(resolveColor("var(--qy-button-bordered-border-focus-danger)", tokens)).toEqual(resolveColor("var(--qy-danger-foreground)", tokens));
  });
  test("--qy-ink-decor 与 breadcrumb 的 text-input / timeline 的 bg-input 今天读的 --qy-border-input 逐通道相同", () => {
    expect(read("theme.css")).toContain("--color-input: var(--qy-border-input);");
    const a = resolveColor("var(--qy-border-input)", tokens);
    const b = resolveColor("var(--qy-ink-decor)", tokens);
    a.forEach((channel, i) => expect(b[i]).toBeCloseTo(channel, 12));
  });
});

describe("图标尺寸是派生，不是字面", () => {
  test.each(["xs", "sm", "md", "lg", "xl"])("%s：图标 = 该档字号 + 2px，奇数和向下取偶（桌面与窄屏各一档）", (size) => {
    const even = (n: number) => 2 * Math.floor(n / 2);
    expect(px(`var(--qy-control-${size}-icon)`), `${size} desktop`).toBe(even(px(`var(--qy-text-control-${size}-size)`) + 2));
    expect(px(`var(--qy-control-${size}-icon-narrow)`), `${size} narrow`).toBe(even(px(`var(--qy-text-control-${size}-mobile-size)`) + 2));
  });
});

describe("暴露给 Tailwind 的入口", () => {
  test("theme.css 的 @theme inline 声明了契约依赖的每一个键", () => {
    const theme = read("theme.css");
    for (const line of [
      "--spacing: var(--qy-fen);",
      "--spacing-line: var(--qy-line-width);",
      "--spacing-fen-half: var(--qy-fen-half);",
      "--default-border-width: var(--qy-line-width);",
      "--opacity-disabled: var(--qy-opacity-disabled);",
      "--color-surface-field: var(--qy-surface-field);",
      "--color-ink-decor: var(--qy-ink-decor);",
    ]) expect(theme, line).toContain(line);
  });
});

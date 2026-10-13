import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { compile } from "tailwindcss";
import { expect, test } from "vitest";
import { inspectColors } from "./color-check";

/*
 * Prose 的排版规则在 prose.css，不在 TSX：组件源码上的 AST 检查看不到它，所以这里守四件
 * 只有样式文件才会出的事——规则里写的工具类真的存在、没有写死的颜色、规则留在 components 层、文件随包发布。
 */
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");
const theme = () => read("theme.css").replace(/@import "\.\/([^"]+)";/g, (_m, path: string) => read(path));

test("prose.css 里每个 @apply 的工具类都能解析，编译结果只落在 components 层且不带 !important", async () => {
  // 未知的工具类会让 compile 抛错（库的构建也会因此失败）；这里把同一件事提前到单元测试。
  const compiler = await compile(
    `@layer theme, base, components, utilities;\n${read("node_modules/tailwindcss/theme.css")}\n${theme()}\n${read("utilities.css")}\n${read("prose.css")}\n@tailwind utilities;`,
  );
  const css = compiler.build([]);
  expect(css).not.toContain("@apply");
  expect(css).not.toContain("!important");
  const outside = css.replace(/@layer components\s*\{[\s\S]*?\n\}\n/g, "");
  expect(outside).not.toContain('[data-slot="prose"]');
  // 范围之内确实产出了规则：篇、节、小节三级标题各读各的文字档。
  for (const step of ["h1", "h2", "h3"]) expect(css).toContain(`--qy-text-prose-${step}-size`);
});

test("styles.css 引入 prose.css，包的 files 与 exports 都带上它", () => {
  expect(read("styles.css")).toContain('@import "./prose.css";');
  const pkg = JSON.parse(read("package.json")) as { files: string[]; exports: Record<string, unknown> };
  expect(pkg.files).toContain("prose.css");
  expect(pkg.exports["./prose.css"]).toBe("./prose.css");
});

test("prose.css 的 @apply 不写死颜色：与组件源码同一个颜色检查", () => {
  // 把每条 @apply 的参数当作一个 className 交给 color-check（同一个 AST 分类器），不另写一套正则。
  const applied = [...read("prose.css").replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/@apply\s+([^;]+);/g)].map(match => match[1]!.trim());
  expect(applied.length).toBeGreaterThan(0);
  const source = applied.map((classes, index) => `export const rule${index} = <div className={${JSON.stringify(classes)}} />;`).join("\n");
  expect(inspectColors(source, "prose-apply.tsx").violations).toEqual([]);
});

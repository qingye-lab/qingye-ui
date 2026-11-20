import "./_env";
import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { render, screen, within } from "@testing-library/react";
import postcss from "postcss";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { AtlasSettings } from "../AtlasSettings";

const root = process.cwd();
// 只按顶层逗号切分选择器列表；:is()/:where() 等括号内的逗号属于同一个复合选择器。
const topLevelParts = (selector: string) => {
  const parts: string[] = []; let depth = 0, start = 0;
  for (let i = 0; i < selector.length; i++) {
    const c = selector[i];
    if (c === "(" || c === "[") depth++;
    else if (c === ")" || c === "]") depth--;
    else if (c === "," && depth === 0) { parts.push(selector.slice(start, i)); start = i + 1; }
  }
  parts.push(selector.slice(start));
  return parts;
};
const members = [{ id: "m1", name: "林溪", role: "管理员" }, { id: "m2", name: "周岩", role: "成员" }];

describe("T3 AtlasSettings", () => {
  it("[api] index.html 在 html 元素上声明品牌 atlas", () => {
    const html = readFileSync(resolve(root, "index.html"), "utf8");
    const tag = html.match(/<html\b[^>]*>/i)?.[0] ?? "";
    expect(tag).toMatch(/\sdata-brand\s*=\s*["']?atlas["']?/);
    expect(tag).not.toMatch(/data-theme\s*=\s*["']?atlas/);
  });

  it("[api] 主色覆盖只挂在品牌选择器上", () => {
    const css = postcss.parse(readFileSync(resolve(root, "src/theme.css"), "utf8"));
    const selectors: string[] = [];
    css.walkDecls("--qy-primary", decl => { selectors.push(decl.parent && "selector" in decl.parent ? String(decl.parent.selector) : "@" ); });
    expect(selectors.length).toBeGreaterThan(0);
    for (const selector of selectors) {
      for (const part of topLevelParts(selector)) expect(part).toMatch(/\[data-brand\s*=\s*["']?atlas["']?\]/);
      expect(selector).not.toMatch(/data-theme\s*=\s*["']?atlas/);
    }
  });

  it("[api] 表单区由容器统一采用紧凑密度", () => {
    render(<AtlasSettings members={members} />);
    for (const label of ["团队名称", "联系邮箱"]) {
      const input = screen.getByLabelText(label);
      expect(input.closest("[data-density='compact']")).not.toBeNull();
    }
  });

  it("[api] 卡片内的表格不带自己的外框", () => {
    render(<AtlasSettings members={members} />);
    const table = screen.getByRole("table", { name: "成员" });
    expect(table.closest("[data-slot='card']")).not.toBeNull();
    // 库内两种写法都不产生双重边框：不包外框容器，或外框容器 framed={false}
    const container = table.closest("[data-slot='table-container']");
    if (container) expect(container.getAttribute("data-framed")).toBe("false");
  });

  it("[behavior] 表格按成员逐行列出姓名与角色", () => {
    render(<AtlasSettings members={members} />);
    const table = screen.getByRole("table", { name: "成员" });
    expect(within(table).getByText("林溪")).toBeTruthy();
    expect(within(table).getByText("管理员")).toBeTruthy();
    expect(within(table).getAllByRole("row")).toHaveLength(3);
  });

  it("[api] 组件源码不写死颜色", () => {
    const palette = "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
    const patterns = [/#[0-9a-fA-F]{3,8}\b/, /\b(?:rgba?|hsla?|oklch|oklab|lab|lch|color-mix)\(/, new RegExp(`\\b[a-z-]+-(?:${palette})-\\d{2,3}\\b`), /\b(?:bg|text|border|ring|fill|stroke|outline|decoration)-(?:black|white)\b/];
    const files = (readdirSync(resolve(root, "src"), { recursive: true }) as string[])
      .filter(file => /\.(t|j)sx?$/.test(file) && !/\.(test|spec)\.(t|j)sx?$/.test(file) && !/(^|[\\/])(__hidden__|test)[\\/]/.test(file));
    const hits: string[] = [];
    for (const file of files) {
      const source = ts.createSourceFile(file, readFileSync(join(root, "src", file), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
      const visit = (node: ts.Node) => {
        if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
          if (patterns.some(pattern => pattern.test(node.text))) hits.push(`${file}: ${node.text}`);
        }
        ts.forEachChild(node, visit);
      };
      visit(source);
    }
    expect(hits).toEqual([]);
  });
});

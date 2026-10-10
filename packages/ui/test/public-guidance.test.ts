import { readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { expect, test } from "vitest";

const root = resolve(__dirname, "../../..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");
const source = read("design.md");
const adoption = source.split("<!-- qingye:project-adoption:start -->")[1]?.split("<!-- qingye:project-adoption:end -->")[0]?.trim();

test("published design guides retain the complete repository source", () => {
  const pkg = JSON.parse(read("packages/ui/package.json"));
  expect(pkg.exports["./design.md"]).toBe("./design.md");
  expect(pkg.exports["./ai/*"]).toBe("./ai/*");
  expect(read("packages/ui/design.md")).toBe(source);
  expect(read("apps/docs/public/design.md")).toBe(source);
  const digest = createHash("sha256").update(source).digest("hex");
  for (const path of ["packages/ui/catalog.json", "apps/docs/public/catalog.json"]) {
    expect(JSON.parse(read(path)).designGuide.sha256).toBe(digest);
  }
});

test("both main skills carry the source project-adoption instructions and copyable snippets", () => {
  expect(adoption).toBeTruthy();
  expect([...adoption!.matchAll(/```md\r?\n([\s\S]*?)\r?\n```/g)]).toHaveLength(2);
  const packageSkill = read("packages/ui/ai/SKILL.md");
  expect(packageSkill).toContain(adoption!);
  expect(read("apps/docs/public/ai/SKILL.md")).toBe(packageSkill);
});

test("component Markdown carries the catalog's composition, responsive and customization decisions", () => {
  const catalog = JSON.parse(read("packages/ui/catalog.json"));
  for (const component of catalog.components) {
    const relative = `ai/v${catalog.version}/components/${component.name}.md`;
    const markdown = read(`packages/ui/${relative}`);
    expect(read(`apps/docs/public/${relative}`)).toBe(markdown);
    for (const key of ["composition", "responsive", "customization"] as const) {
      expect(component.design[key].length).toBeGreaterThan(0);
      for (const decision of component.design[key]) expect(markdown).toContain(decision);
    }
  }
});


test("current component resources match the live public catalog after removals and additions", () => {
  const catalog = JSON.parse(read("packages/ui/catalog.json"));
  const names = catalog.components.map((component: { name: string }) => `${component.name}.md`).sort();
  for (const base of ["packages/ui/ai", "apps/docs/public/ai"]) {
    expect(readdirSync(resolve(root, base, `v${catalog.version}/components`)).filter((name) => name.endsWith(".md")).sort()).toEqual(names);
  }
  // 2026-10-10（功能要纯粹）：搜索与密码输入重新成为独立组件（由 InputGroup 组合），资源随目录一并回来。
  expect(names).toContain("search-input.md");
  expect(names).toContain("password-input.md");
});

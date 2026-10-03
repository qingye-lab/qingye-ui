import { readFileSync } from "node:fs";
import { compile } from "tailwindcss";
import { expect, test } from "vitest";

test("control typography compiles to its independent profile while the public input colour stays a colour", async () => {
  const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");
  const theme = read("../theme.css").replace(/@import "\.\/([^\"]+)";/g, (_match, path: string) => read(`../${path}`));
  const compiler = await compile(`${read("../node_modules/tailwindcss/theme.css")}\n${theme}\n@tailwind utilities;`);
  const css = compiler.build(["text-control-md", "text-control-md-mobile", "sm:text-control-md", "text-input"]);
  const rule = (selector: string) => css.slice(css.indexOf(selector)).split("}")[0];
  expect(rule(".text-control-md {")).toContain("font-size: var(--qy-text-control-md-size)");
  expect(rule(".text-control-md-mobile {")).toContain("font-size: var(--qy-text-control-md-mobile-size)");
  expect(rule(".sm\\:text-control-md {")).toContain("font-size: var(--qy-text-control-md-size)");
  expect(rule(".sm\\:text-control-md {")).toContain("line-height: var(--tw-leading, var(--qy-text-control-md-leading))");
  expect(rule(".text-control-md {")).toContain("font-weight: var(--tw-font-weight, var(--qy-text-control-md-weight))");
  expect(rule(".text-control-md {")).toContain("letter-spacing: var(--tw-tracking, var(--qy-text-control-md-tracking))");
  expect(rule(".text-input {")).toContain("color: var(--qy-border-input)");
  expect(rule(".text-input {")).not.toContain("font-size");
});

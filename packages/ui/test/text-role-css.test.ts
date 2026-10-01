import { readFileSync } from "node:fs";
import { compile } from "tailwindcss";
import { expect, test } from "vitest";

test("input typography compiles to font size while the public input colour stays a colour", async () => {
  const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");
  const theme = read("../theme.css").replace(/@import "\.\/([^\"]+)";/g, (_match, path: string) => read(`../${path}`));
  const compiler = await compile(`${read("../node_modules/tailwindcss/theme.css")}\n${theme}\n@tailwind utilities;`);
  const css = compiler.build(["text-field-input", "text-field-input-mobile", "sm:text-field-input", "text-input"]);
  const rule = (selector: string) => css.slice(css.indexOf(selector)).split("}")[0];
  expect(rule(".text-field-input {")).toContain("font-size: var(--qy-text-input-size)");
  expect(rule(".text-field-input-mobile {")).toContain("font-size: var(--qy-text-input-mobile-size)");
  expect(rule(".sm\\:text-field-input {")).toContain("font-size: var(--qy-text-input-size)");
  expect(rule(".sm\\:text-field-input {")).toContain("line-height: var(--tw-leading, var(--qy-text-input-leading))");
  expect(rule(".text-input {")).toContain("color: var(--qy-border-input)");
  expect(rule(".text-input {")).not.toContain("font-size");
});

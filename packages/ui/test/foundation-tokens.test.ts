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
const pixelPreset = (name: string) => {
  const value = declaration(name)!;
  return Number.parseFloat(value) * (value.endsWith("rem") ? 16 : 1);
};

// Structural assertions are separate from the browser computed-value evidence.
// They defend the prescribed profile and independence while runtime verification
// confirms these values actually reach real components.
test.each([
  ["xs", 24, 10], ["sm", 28, 12], ["md", 32, 14], ["lg", 36, 16], ["xl", 40, 16],
] as const)("%s control keeps the authoritative outer/padding preset independently of spacing", (size, height, padding) => {
  expect(pixelPreset(`--qy-control-${size}`)).toBe(height);
  expect(pixelPreset(`--qy-control-${size}-padding`)).toBe(padding);
  // The authority's percentages are rounded table labels (lg=44.444...%).
  expect(Math.round(padding / height * 100)).toBeGreaterThanOrEqual(40);
  expect(Math.round(padding / height * 100)).toBeLessThanOrEqual(44);
  expect(padding).toBeLessThanOrEqual(height / 2);
  expect(declaration(`--qy-control-${size}-padding-bordered`)).toBe(`calc(var(--qy-control-${size}-padding) - 1px)`);
  expect(declaration(`--qy-control-${size}-narrow`)).toBe(`calc(var(--qy-control-${size}) + var(--qy-control-mobile-extra))`);
  expect(declaration(`--qy-control-${size}-icon-padding`)).toBe(`calc((var(--qy-control-${size}) - var(--qy-control-${size}-icon)) / 2)`);
  expect(declaration(`--qy-control-${size}`)).not.toContain("--qy-space-");
  expect(declaration(`--qy-control-${size}-padding`)).not.toContain("--qy-space-");
});

test.each([
  ["xs", 12, 14], ["sm", 13, 14], ["md", 14, 15], ["lg", 16, 17],
] as const)("control-%s has independent desktop/narrow typography with all four properties", (size, desktop, narrow) => {
  expect(pixelPreset(`--qy-text-control-${size}-size`)).toBe(desktop);
  expect(pixelPreset(`--qy-text-control-${size}-mobile-size`)).toBe(narrow);
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

test("every semantic step compiles its own quartet and metric includes numerical alignment", async () => {
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
  const metric = rules("metric");
  expect(metric).toContain("font-variant-numeric: tabular-nums");
  expect(metric).toContain('font-feature-settings: "tnum" 1');
});

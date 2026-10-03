import { expect, test } from "vitest";
import { cn } from "../src/utils";

test.each(["control", "panel", "overlay", "marker", "item"])("rounded-%s respects caller overrides and replaces earlier radii", (role) => {
  expect(cn(`rounded-${role}`, "rounded-xl")).toBe("rounded-xl");
  expect(cn(`rounded-${role}`, "rounded-none")).toBe("rounded-none");
  expect(cn(`md:rounded-${role}`, "md:rounded-none")).toBe("md:rounded-none");
  expect(cn("rounded-xl", `rounded-${role}`)).toBe(`rounded-${role}`);
  expect(cn(`rounded-${role}`, "rounded-[2px]")).toBe("rounded-[2px]");
});

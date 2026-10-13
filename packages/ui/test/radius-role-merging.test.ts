import { expect, test } from "vitest";
import { cn } from "../src/utils";

test.each(["control", "panel", "overlay", "marker", "item"])("rounded-%s respects caller overrides and replaces earlier radii", (role) => {
  expect(cn(`rounded-${role}`, "rounded-xl")).toBe("rounded-xl");
  expect(cn(`rounded-${role}`, "rounded-none")).toBe("rounded-none");
  expect(cn(`md:rounded-${role}`, "md:rounded-none")).toBe("md:rounded-none");
  expect(cn("rounded-xl", `rounded-${role}`)).toBe(`rounded-${role}`);
  expect(cn(`rounded-${role}`, "rounded-[2px]")).toBe("rounded-[2px]");
});

// 调用方的类要盖得过组件的类：有名字的系统尺度与禁用透明度须和数字档同组，否则 cn() 两个都留下。
test("named system spacing and the disabled opacity merge with their numeric siblings", () => {
  expect(cn("gap-fen-half", "gap-2")).toBe("gap-2");
  expect(cn("gap-2", "gap-fen-half")).toBe("gap-fen-half");
  expect(cn("w-line", "w-4")).toBe("w-4");
  expect(cn("-mb-line", "mb-0")).toBe("mb-0");
  expect(cn("min-w-fen-half", "min-w-0")).toBe("min-w-0");
  expect(cn("opacity-disabled", "opacity-100")).toBe("opacity-100");
  expect(cn("opacity-50", "disabled:opacity-disabled", "disabled:opacity-100")).toBe("opacity-50 disabled:opacity-100");
  // 填值控件的底与装饰墨是颜色，不与字级混在一组。
  expect(cn("bg-card", "bg-surface-field")).toBe("bg-surface-field");
  expect(cn("text-body", "text-ink-decor")).toBe("text-body text-ink-decor");
  // 下划线的颜色与粗细：`decoration-(length:…)` 会被当成颜色组，把前面的颜色挤掉；粗细因此写成任意属性。
  expect(cn("decoration-(color:--qy-border-input)", "[text-decoration-thickness:var(--qy-line-width)]")).toBe("decoration-(color:--qy-border-input) [text-decoration-thickness:var(--qy-line-width)]");
});

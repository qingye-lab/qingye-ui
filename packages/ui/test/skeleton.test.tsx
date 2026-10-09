import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Skeleton, SkeletonBlock, SkeletonLine } from "../src/components/skeleton";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

test("one status says it is loading; the shapes are hidden from assistive technology", () => {
  const { container } = render(<Skeleton><SkeletonLine /><SkeletonLine className="w-2/3" /><SkeletonBlock /></Skeleton>);
  const status = screen.getByRole("status");
  expect(status).toHaveTextContent("正在加载");
  expect(status).toHaveAttribute("aria-busy", "true");
  expect(container.querySelectorAll('[data-slot^="skeleton-"][aria-hidden="true"]')).toHaveLength(3);
});

test("the name follows the locale and a caller's object-specific label wins", () => {
  render(<UILocaleProvider locale={enUS}><Skeleton /><Skeleton label="Loading members" /></UILocaleProvider>);
  const [named, custom] = screen.getAllByRole("status");
  expect(named).toHaveTextContent(enUS.messages.loading);
  expect(custom).toHaveTextContent("Loading members");
});

test("callers keep id, data attributes and class names, merged last", () => {
  render(<Skeleton id="members" data-testid="s" className="gap-0"><SkeletonLine className="w-1/2" /></Skeleton>);
  expect(screen.getByTestId("s")).toHaveAttribute("id", "members");
  expect(screen.getByTestId("s").className).toContain("gap-0");
});

test("rows stack with no gap so N skeleton rows are N text lines, and nothing loops", async () => {
  const { readFileSync } = await import("node:fs");
  render(<Skeleton data-testid="s"><SkeletonLine /></Skeleton>);
  expect(screen.getByTestId("s").className).not.toMatch(/\bgap-/);
  const motion = readFileSync("motion.css", "utf8");
  expect(motion).not.toContain("skeleton");
});

test("the wait period is one token shared by the progress band and the in-progress mark, and reduced motion stops the turning", async () => {
  const { readFileSync } = await import("node:fs");
  const motion = readFileSync("motion.css", "utf8");
  expect(motion).toMatch(/\.qy-spin\s*{[^}]*var\(--qy-duration-wait\)/);
  expect(motion).toMatch(/qy-progress-slide var\(--qy-duration-wait\)/);
  expect(motion).toMatch(/prefers-reduced-motion: reduce[\s\S]*\.qy-spin\s*{\s*animation: none/);
  expect(readFileSync("src/components/button.tsx", "utf8")).not.toContain("animate-spin");
});

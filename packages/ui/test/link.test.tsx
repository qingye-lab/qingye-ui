import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Link } from "../src/components/link";

test("Link is a native named anchor with an always-present underline", () => {
  render(<Link href="/records">接入记录</Link>);
  const link = screen.getByRole("link", { name: "接入记录" });
  expect(link.tagName).toBe("A");
  expect(link).toHaveAttribute("href", "/records");
  expect(link).toHaveAttribute("data-slot", "link");
  expect(link.className).toContain("underline");
  // 行内链接不扩展命中区：44px 的命中层会盖住上下行文字。
  expect(link.className).not.toContain("touch-target");
});

test("render connects a router link without losing the shared treatment", () => {
  render(<Link render={<a data-router="yes" />} href="/a">去往</Link>);
  const link = screen.getByRole("link", { name: "去往" });
  expect(link).toHaveAttribute("data-router", "yes");
  expect(link.className).toContain("decoration-(color:--qy-border-input)");
});

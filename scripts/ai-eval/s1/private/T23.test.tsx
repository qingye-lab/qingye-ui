import "./_env";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ArticleToc } from "../ArticleToc";

const three = [
  { id: "intro", title: "引言" },
  { id: "method", title: "方法" },
  { id: "result", title: "结果" },
];
const anchors = (c: HTMLElement) => c.querySelectorAll("a[href^='#']");

describe("T23 ArticleToc", () => {
  it("[behavior] 三节时出现“本页目录”导航，含三个指向各节 #id 的链接", () => {
    render(<ArticleToc headings={three} />);
    const nav = screen.getByRole("navigation", { name: "本页目录" });
    const links = Array.from(nav.querySelectorAll("a")).map(a => a.getAttribute("href"));
    expect(links).toEqual(["#intro", "#method", "#result"]);
    expect(screen.getByRole("link", { name: "方法" })).toBeTruthy();
  });

  it("[behavior] 只有一节时不渲染目录", () => {
    const { container } = render(<ArticleToc headings={[three[0]!]} />);
    expect(anchors(container).length).toBe(0);
    expect(screen.queryByRole("navigation", { name: "本页目录" })).toBeNull();
  });

  it("[behavior] 零节时不渲染目录", () => {
    const { container } = render(<ArticleToc headings={[]} />);
    expect(anchors(container).length).toBe(0);
    expect(screen.queryByRole("navigation")).toBeNull();
  });

  it("[api] 目录来自库（data-slot 以 toc 开头）", () => {
    const { container } = render(<ArticleToc headings={three} />);
    expect(container.querySelector("[data-slot^='toc']")).not.toBeNull();
  });
});

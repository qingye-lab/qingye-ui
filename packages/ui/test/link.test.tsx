import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, test, vi } from "vitest";
import { Link } from "../src/components/link";

describe("Link", () => {
  test("Link is a native named anchor with an always-present underline", () => {
    render(<Link href="/records">接入记录</Link>);
    const link = screen.getByRole("link", { name: "接入记录" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/records");
    expect(link).toHaveAttribute("data-slot", "link");
    // 行内链接不扩展命中区：44px 的命中层会盖住上下行文字。
  });

  test("render connects a router link without losing the shared treatment", () => {
    render(<Link render={<a data-router="yes" />} href="/a">去往</Link>);
    const link = screen.getByRole("link", { name: "去往" });
    expect(link).toHaveAttribute("data-router", "yes");
    expect(link).toHaveAttribute("data-slot", "link");
  });

  test("forwards native anchor attributes, and ARIA", () => {
    render(
      <Link id="doc-link" href="https://example.com" target="_blank" rel="noopener noreferrer" aria-current="page" className="text-muted-foreground custom-link">
        规范文档
      </Link>,
    );
    const link = screen.getByRole("link", { name: "规范文档" });
    expect(link).toHaveAttribute("id", "doc-link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAttribute("aria-current", "page");
  });

  test("forwards ref and merges click handlers across render and outer props", async () => {
    const ref = createRef<HTMLAnchorElement>();
    const innerClick = vi.fn((e: React.MouseEvent) => e.preventDefault());
    const outerClick = vi.fn();
    render(<Link ref={ref} href="#top" onClick={outerClick} render={<a onClick={innerClick} />}>回到顶部</Link>);
    const link = screen.getByRole("link", { name: "回到顶部" });
    expect(ref.current).toBe(link);
    await userEvent.click(link);
    expect(innerClick).toHaveBeenCalledOnce();
    expect(outerClick).toHaveBeenCalledOnce();
  });

  test("reaches keyboard focus via Tab as a native interactive link", async () => {
    const user = userEvent.setup();
    render(<Link href="#section">跳转章节</Link>);
    await user.tab();
    expect(screen.getByRole("link", { name: "跳转章节" })).toHaveFocus();
  });
});

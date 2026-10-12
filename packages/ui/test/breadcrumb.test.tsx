import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Breadcrumb, BreadcrumbCurrent, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../src/components/breadcrumb";

describe("Breadcrumb", () => {
  it("keeps navigation, ordered ancestors and an explicit current page", () => {
    render(<Breadcrumb aria-label="位置"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/">首页</BreadcrumbLink><BreadcrumbSeparator /></BreadcrumbItem><BreadcrumbItem><BreadcrumbCurrent>内容</BreadcrumbCurrent></BreadcrumbItem></BreadcrumbList></Breadcrumb>);
    expect(screen.getByRole("navigation", { name: "位置" }).querySelector("ol")).not.toBeNull();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
    expect(screen.getByText("内容")).toHaveAttribute("aria-current", "page");
    // 分隔是一枚装饰性的小箭头（不再是字面的「/」），对读屏隐藏。
    expect(document.querySelector("[data-slot=breadcrumb-separator]")).toHaveAttribute("aria-hidden", "true");
  });
  it("forwards the real link ref, render attributes and action", () => {
    const ref = React.createRef<HTMLAnchorElement>(); const onClick = vi.fn((event: React.MouseEvent) => event.preventDefault());
    render(<BreadcrumbLink ref={ref} render={<a href="/parent" data-route="parent" />} onClick={onClick}>父级</BreadcrumbLink>);
    fireEvent.click(screen.getByRole("link"));
    expect(onClick).toHaveBeenCalledOnce(); expect(ref.current).toBe(screen.getByRole("link")); expect(ref.current).toHaveAttribute("data-route", "parent");
  });
  describe("maxItems", () => {
    const path = (count: number, props: { maxItems?: number } = {}) => <Breadcrumb aria-label="位置"><BreadcrumbList {...props}>{Array.from({ length: count }, (_, index) => <BreadcrumbItem key={index}>{index === count - 1 ? <BreadcrumbCurrent>第 {index + 1} 级</BreadcrumbCurrent> : <><BreadcrumbLink href={`/${index + 1}`}>第 {index + 1} 级</BreadcrumbLink><BreadcrumbSeparator /></>}</BreadcrumbItem>)}</BreadcrumbList></Breadcrumb>;
    it("shows every item when the path is not longer than maxItems", () => {
      render(path(4, { maxItems: 4 }));
      expect(screen.getAllByRole("listitem")).toHaveLength(4); expect(screen.queryByRole("button", { name: "更多" })).toBeNull();
    });
    it("keeps the first item and the last maxItems-2, folding the middle into a menu of real links", async () => {
      const user = userEvent.setup(); render(path(6, { maxItems: 4 }));
      const items = screen.getAllByRole("listitem"); expect(items).toHaveLength(4);
      expect(within(items[0]!).getByRole("link", { name: "第 1 级" })).toHaveAttribute("href", "/1");
      expect(within(items[2]!).getByRole("link", { name: "第 5 级" })).toBeInTheDocument(); expect(items[3]).toHaveTextContent("第 6 级");
      expect(screen.queryByRole("link", { name: "第 2 级" })).toBeNull();
      const more = within(items[1]!).getByRole("button", { name: "更多" }); expect(more).toHaveAttribute("aria-haspopup", "menu");
      more.focus(); await user.keyboard("{Enter}");
      const menu = await screen.findByRole("menu"); const links = within(menu).getAllByRole("menuitem");
      expect(links.map(link => link.textContent)).toEqual(["第 2 级", "第 3 级", "第 4 级"]); expect(links[1]).toHaveAttribute("href", "/3");
    });
    it("rejects counts that would hide the current page and items that cannot become links", () => {
      expect(() => render(path(5, { maxItems: 2 }))).toThrow("at least 3");
      expect(() => render(<BreadcrumbList maxItems={3}><BreadcrumbItem><BreadcrumbLink href="/">甲</BreadcrumbLink></BreadcrumbItem><BreadcrumbItem><BreadcrumbCurrent>乙</BreadcrumbCurrent></BreadcrumbItem><BreadcrumbItem><BreadcrumbCurrent>丙</BreadcrumbCurrent></BreadcrumbItem><BreadcrumbItem><BreadcrumbCurrent>丁</BreadcrumbCurrent></BreadcrumbItem></BreadcrumbList>)).toThrow("BreadcrumbLink");
    });
  });
});

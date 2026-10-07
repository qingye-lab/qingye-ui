import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
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
});

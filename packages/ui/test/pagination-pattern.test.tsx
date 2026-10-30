import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PaginationPattern, type PaginationValue } from "../src/components/pagination";

describe("PaginationPattern", () => {
  it("provides a bounded page window and actual current-page buttons", async () => {
    const user = userEvent.setup();
    render(<PaginationPattern defaultValue={{ page: 6, pageSize: 10 }} totalCount={120} />);
    expect(screen.getByRole("button", { name: "第 6 页" })).toHaveAttribute("aria-current", "page");
    expect(screen.getAllByRole("button").map(button => button.getAttribute("aria-label") ?? button.textContent)).toEqual(["上一页", "第 1 页", "第 5 页", "第 6 页", "第 7 页", "第 12 页", "下一页"]);
    await user.click(screen.getByRole("button", { name: "下一页" }));
    expect(screen.getByRole("button", { name: "第 7 页" })).toHaveAttribute("aria-current", "page");
  });

  it("changes page size and resets the page in one notification", async () => {
    const user = userEvent.setup();
    const changed = vi.fn();
    render(<PaginationPattern defaultValue={{ page: 4, pageSize: 10 }} totalCount={100} pageSizeOptions={[10, 25]} onValueChange={changed} />);
    await user.click(screen.getByRole("combobox", { name: "每页条数" }));
    await user.click(await screen.findByRole("option", { name: "25 条/页" }));
    expect(changed).toHaveBeenCalledExactlyOnceWith({ page: 1, pageSize: 25 }, { reason: "page-size" });
    expect(screen.getByRole("button", { name: "第 1 页" })).toHaveAttribute("aria-current", "page");
  });

  it("corrects total decreases and last-page deletion, including zero results", () => {
    const changed = vi.fn();
    const { rerender } = render(<PaginationPattern defaultValue={{ page: 3, pageSize: 10 }} totalCount={21} onValueChange={changed} />);
    rerender(<PaginationPattern defaultValue={{ page: 3, pageSize: 10 }} totalCount={20} onValueChange={changed} />);
    expect(changed).toHaveBeenLastCalledWith({ page: 2, pageSize: 10 }, { reason: "total-change" });
    expect(screen.getByRole("button", { name: "第 2 页" })).toHaveAttribute("aria-current", "page");
    rerender(<PaginationPattern totalCount={0} onValueChange={changed} />);
    expect(changed).toHaveBeenLastCalledWith({ page: 1, pageSize: 10 }, { reason: "total-change" });
    expect(screen.getByRole("navigation")).toHaveAttribute("data-total-pages", "0");
    expect(screen.getByRole("navigation")).not.toHaveAttribute("data-page");
    expect(screen.queryByRole("button", { name: /第 .* 页/ })).toBeNull();
    expect(screen.getByRole("button", { name: "上一页" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "下一页" })).toBeDisabled();
  });

  it("keeps unknown totals explicit and obeys server next-page facts", async () => {
    const user = userEvent.setup();
    const changed = vi.fn();
    const { rerender } = render(<PaginationPattern totalCount={null} hasNextPage defaultValue={{ page: 1, pageSize: 10 }} onValueChange={changed} />);
    expect(screen.getByRole("navigation")).toHaveAttribute("data-total-state", "unknown");
    expect(screen.queryByRole("button", { name: /第 .* 页/ })).toBeNull();
    await user.click(screen.getByRole("button", { name: "下一页" }));
    expect(changed).toHaveBeenLastCalledWith({ page: 2, pageSize: 10 }, { reason: "page" });
    rerender(<PaginationPattern totalCount={null} hasNextPage={false} onValueChange={changed} />);
    expect(screen.getByRole("button", { name: "下一页" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "上一页" })).not.toBeDisabled();
  });

  it("emits a controlled correction once and renders the effective page", () => {
    const changed = vi.fn();
    const value: PaginationValue = { page: 5, pageSize: 10 };
    const { rerender } = render(<PaginationPattern value={value} totalCount={12} onValueChange={changed} />);
    expect(changed).toHaveBeenCalledExactlyOnceWith({ page: 2, pageSize: 10 }, { reason: "total-change" });
    rerender(<PaginationPattern value={value} totalCount={12} onValueChange={changed} />);
    expect(changed).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "第 2 页" })).toHaveAttribute("aria-current", "page");
  });

  it("rejects invalid totals and missing unknown-total availability", () => {
    expect(() => render(<PaginationPattern totalCount={-1} />)).toThrow("nonnegative integer");
    // Runtime consumers may be plain JavaScript and still receive a useful contract error.
    expect(() => render(React.createElement(PaginationPattern, { totalCount: null } as never))).toThrow("explicit hasNextPage");
  });
  it("blocks paging while busy yet keeps the pressed button focusable", async () => {
    const user = userEvent.setup(); const changed = vi.fn();
    const { rerender } = render(<PaginationPattern value={{ page: 2, pageSize: 10 }} totalCount={100} onValueChange={changed} />);
    await user.click(screen.getByRole("button", { name: "下一页" })); expect(changed).toHaveBeenCalledOnce();
    rerender(<PaginationPattern busy value={{ page: 2, pageSize: 10 }} totalCount={100} onValueChange={changed} />);
    const next = screen.getByRole("button", { name: "下一页" }); next.focus();
    await user.click(next); await user.click(screen.getByRole("button", { name: "第 1 页" }));
    expect(changed).toHaveBeenCalledOnce(); expect(next).toHaveAttribute("aria-disabled", "true"); expect(next).toHaveFocus();
  });
  it("disables every control with disabled", () => {
    render(<PaginationPattern disabled value={{ page: 2, pageSize: 10 }} totalCount={100} pageSizeOptions={[10, 25]} />);
    for (const button of screen.getAllByRole("button")) expect(button).toBeDisabled();
  });
});

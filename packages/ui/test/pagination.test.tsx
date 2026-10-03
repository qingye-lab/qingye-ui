import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Pagination, PaginationItem, PaginationLink, PaginationList, PaginationNext, PaginationPrevious } from "../src/components/pagination";

describe("Pagination", () => {
  it("derives only the current link from application page facts", () => {
    render(<Pagination page={2} totalPages={3}><PaginationList>{[1, 2, 3].map(page => <PaginationItem key={page}><PaginationLink page={page} href={`?page=${page}`}>{page}</PaginationLink></PaginationItem>)}</PaginationList></Pagination>);
    expect(screen.getByRole("navigation")).toHaveAttribute("data-total-pages", "3"); expect(screen.getByRole("link", { name: "2" })).toHaveAttribute("aria-current", "page"); expect(screen.getByRole("link", { name: "1" })).not.toHaveAttribute("aria-current");
  });
  it("keeps an unknown total and caller-disabled direction without inventing a last page", () => {
    const next = vi.fn(); const previous = vi.fn();
    render(<Pagination page={1} totalPages={null}><PaginationList><PaginationItem><PaginationPrevious disabled onClick={previous} /></PaginationItem><PaginationItem><PaginationNext onClick={next} /></PaginationItem></PaginationList><span>总页数未知</span></Pagination>);
    const nav = screen.getByRole("navigation"); expect(nav).toHaveAttribute("data-total-state", "unknown"); expect(nav).not.toHaveAttribute("data-total-pages"); expect(screen.queryByRole("link")).toBeNull(); fireEvent.click(screen.getByRole("button", { name: "上一页" })); fireEvent.click(screen.getByRole("button", { name: "下一页" })); expect(previous).not.toHaveBeenCalled(); expect(next).toHaveBeenCalledOnce();
  });
});

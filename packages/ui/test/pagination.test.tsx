import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationList,
  PaginationNext,
  PaginationPattern,
  PaginationPrevious,
  useCursorPagination,
} from "../src/components/pagination";

describe("Pagination", () => {
  it("derives only the current link from application page facts", () => {
    render(
      <Pagination page={2} totalPages={3}>
        <PaginationList>
          {[1, 2, 3].map((page) => (
            <PaginationItem key={page}>
              <PaginationLink page={page} href={`?page=${page}`}>{page}</PaginationLink>
            </PaginationItem>
          ))}
        </PaginationList>
      </Pagination>,
    );
    expect(screen.getByRole("navigation")).toHaveAttribute("data-total-pages", "3");
    expect(screen.getByRole("link", { name: "2" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "1" })).not.toHaveAttribute("aria-current");
  });

  it("keeps an unknown total and caller-disabled direction without inventing a last page", () => {
    const next = vi.fn();
    const previous = vi.fn();
    render(
      <Pagination page={1} totalPages={null}>
        <PaginationList>
          <PaginationItem><PaginationPrevious disabled onClick={previous} /></PaginationItem>
          <PaginationItem><PaginationNext onClick={next} /></PaginationItem>
        </PaginationList>
        <span>总页数未知</span>
      </Pagination>,
    );
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-total-state", "unknown");
    expect(nav).not.toHaveAttribute("data-total-pages");
    expect(screen.queryByRole("link")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "上一页" }));
    fireEvent.click(screen.getByRole("button", { name: "下一页" }));
    expect(previous).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledOnce();
  });

  it("renders accessible ellipsis copy, width-reservation label, and render composition", () => {
    const { container } = render(
      <Pagination page={1} totalPages={10}>
        <PaginationList>
          <PaginationItem>
            <PaginationLink page={1} render={<button type="button" />}>1</PaginationLink>
          </PaginationItem>
          <PaginationItem><PaginationEllipsis /></PaginationItem>
        </PaginationList>
      </Pagination>,
    );
    const pageBtn = screen.getByRole("button", { name: "1" });
    expect(pageBtn).toHaveAttribute("data-slot", "pagination-link");
    expect(pageBtn).toHaveAttribute("aria-current", "page");
    expect(pageBtn.querySelector('[data-slot="pagination-link-label"]')).toHaveAttribute("data-reserve", "1");
    const ellipsis = container.querySelector('[data-slot="pagination-ellipsis"]')!;
    expect(ellipsis).toHaveTextContent("更多页");
  });

  it("PaginationPattern emits page changes and collapses redundant controls on single-page or dead-end cursor states", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { rerender, container } = render(
      <PaginationPattern defaultValue={{ page: 1, pageSize: 10 }} totalCount={95} onValueChange={onValueChange} />,
    );
    expect(container.querySelector('[data-slot="pagination-summary"]')).toHaveTextContent("第 1–10 条，共 95 条");
    await user.click(screen.getByRole("button", { name: "下一页" }));
    expect(onValueChange).toHaveBeenLastCalledWith({ page: 2, pageSize: 10 }, { reason: "page" });

    // 只有一页且无可切换条数：不出现页码排，只保留范围摘要
    rerender(<PaginationPattern value={{ page: 1, pageSize: 10 }} totalCount={5} onValueChange={onValueChange} />);
    expect(container.querySelector('[data-slot="pagination-summary"]')).toHaveTextContent("共 5 条");
    expect(screen.queryByRole("button", { name: "下一页" })).toBeNull();

    // 未知总数第 1 页且无下一页：整条不渲染
    rerender(<PaginationPattern value={{ page: 1, pageSize: 10 }} totalCount={null} hasNextPage={false} onValueChange={onValueChange} />);
    expect(screen.queryByRole("navigation")).toBeNull();
  });

  it("PaginationPattern corrects out-of-range controlled pages and keeps busy controls focusable while blocking changes", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { rerender } = render(
      <PaginationPattern value={{ page: 5, pageSize: 10 }} totalCount={20} onValueChange={onValueChange} />,
    );
    await waitFor(() => expect(onValueChange).toHaveBeenCalledWith({ page: 2, pageSize: 10 }, { reason: "total-change" }));

    onValueChange.mockClear();
    rerender(<PaginationPattern value={{ page: 1, pageSize: 10 }} totalCount={30} busy onValueChange={onValueChange} />);
    const nextBtn = screen.getByRole("button", { name: "下一页" });
    expect(nextBtn).toHaveAttribute("aria-disabled", "true");
    expect(nextBtn).not.toBeDisabled();
    nextBtn.focus();
    expect(nextBtn).toHaveFocus();
    await user.click(nextBtn);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("useCursorPagination tracks visited cursors across pages and resets to page 1", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    function Harness() {
      const pager = useCursorPagination<string>({ onValueChange: onChange });
      return (
        <div>
          <output data-testid="cursor">{pager.cursor ?? "null"}</output>
          <button type="button" onClick={() => pager.setNextCursor("cursor-2")}>load-page-1</button>
          <button type="button" onClick={() => pager.reset()}>reset</button>
          <PaginationPattern {...pager.paginationProps} />
        </div>
      );
    }
    render(<Harness />);
    expect(screen.getByTestId("cursor")).toHaveTextContent("null");
    expect(screen.queryByRole("navigation")).toBeNull();

    await user.click(screen.getByRole("button", { name: "load-page-1" }));
    await user.click(screen.getByRole("button", { name: "下一页" }));
    expect(screen.getByTestId("cursor")).toHaveTextContent("cursor-2");

    await user.click(screen.getByRole("button", { name: "reset" }));
    expect(screen.getByTestId("cursor")).toHaveTextContent("null");
    expect(onChange).toHaveBeenLastCalledWith({ page: 1, pageSize: 10 }, { reason: "reset" });
  });
});

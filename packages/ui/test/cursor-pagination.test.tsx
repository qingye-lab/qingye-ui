import * as React from "react";
import { act, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PaginationPattern, useCursorPagination, type PaginationValue } from "../src/components/pagination";

describe("useCursorPagination", () => {
  it("starts on page 1 without a cursor or next page", () => {
    const { result } = renderHook(() => useCursorPagination());
    expect(result.current.cursor).toBeNull();
    expect(result.current.paginationProps).toMatchObject({ value: { page: 1, pageSize: 10 }, totalCount: null, hasNextPage: false });
  });

  it("remembers visited cursors and returns to any read page", () => {
    const { result } = renderHook(() => useCursorPagination());
    act(() => result.current.setNextCursor("c2"));
    expect(result.current.paginationProps.hasNextPage).toBe(true);
    act(() => result.current.paginationProps.onValueChange({ page: 2, pageSize: 10 }, { reason: "page" }));
    expect(result.current.cursor).toBe("c2");
    act(() => result.current.setNextCursor("c3"));
    act(() => result.current.paginationProps.onValueChange({ page: 3, pageSize: 10 }, { reason: "page" }));
    expect(result.current.cursor).toBe("c3");
    expect(result.current.paginationProps.hasNextPage).toBe(false);
    act(() => result.current.paginationProps.onValueChange({ page: 2, pageSize: 10 }, { reason: "page" }));
    expect(result.current.cursor).toBe("c2");
    expect(result.current.paginationProps.hasNextPage).toBe(true);
    act(() => result.current.paginationProps.onValueChange({ page: 1, pageSize: 10 }, { reason: "page" }));
    expect(result.current.cursor).toBeNull();
  });

  it("treats a null next cursor as the last page and drops later cursors when a page is re-registered", () => {
    const { result } = renderHook(() => useCursorPagination());
    act(() => result.current.setNextCursor("c2"));
    act(() => result.current.paginationProps.onValueChange({ page: 2, pageSize: 10 }, { reason: "page" }));
    act(() => result.current.setNextCursor("c3"));
    act(() => result.current.paginationProps.onValueChange({ page: 1, pageSize: 10 }, { reason: "page" }));
    act(() => result.current.setNextCursor("c2b"));
    expect(result.current.paginationProps.hasNextPage).toBe(true);
    act(() => result.current.paginationProps.onValueChange({ page: 2, pageSize: 10 }, { reason: "page" }));
    expect(result.current.cursor).toBe("c2b");
    expect(result.current.paginationProps.hasNextPage).toBe(false);
    act(() => result.current.setNextCursor(null));
    expect(result.current.paginationProps.hasNextPage).toBe(false);
  });

  it("ignores a late result registered for a page that was never reached", () => {
    const { result } = renderHook(() => useCursorPagination());
    act(() => result.current.setNextCursor("c3", 2));
    expect(result.current.paginationProps.hasNextPage).toBe(false);
    act(() => result.current.setNextCursor("c2", 1));
    expect(result.current.paginationProps.hasNextPage).toBe(true);
  });

  it("discards cursors and returns to page 1 when the page size changes", () => {
    const { result } = renderHook(() => useCursorPagination());
    act(() => result.current.setNextCursor("c2"));
    act(() => result.current.paginationProps.onValueChange({ page: 2, pageSize: 10 }, { reason: "page" }));
    act(() => result.current.paginationProps.onValueChange({ page: 1, pageSize: 25 }, { reason: "page-size" }));
    expect(result.current.cursor).toBeNull();
    expect(result.current.paginationProps.hasNextPage).toBe(false);
    act(() => result.current.paginationProps.onValueChange({ page: 1, pageSize: 10 }, { reason: "page-size" }));
    expect(result.current.paginationProps.hasNextPage).toBe(false);
  });

  it("resets cursors and page, notifying once with the reset reason", () => {
    const changed = vi.fn();
    const { result } = renderHook(() => useCursorPagination({ defaultValue: { page: 1, pageSize: 20 }, onValueChange: changed }));
    act(() => result.current.setNextCursor("c2"));
    act(() => result.current.paginationProps.onValueChange({ page: 2, pageSize: 20 }, { reason: "page" }));
    changed.mockClear();
    act(() => result.current.reset());
    expect(changed).toHaveBeenCalledExactlyOnceWith({ page: 1, pageSize: 20 }, { reason: "reset" });
    expect(result.current.cursor).toBeNull();
    expect(result.current.paginationProps.hasNextPage).toBe(false);
    changed.mockClear();
    act(() => result.current.reset());
    expect(changed).not.toHaveBeenCalled();
  });

  it("supports controlled value and corrects a page beyond the read range once", () => {
    const changed = vi.fn();
    const { result, rerender } = renderHook(({ value }: { value: PaginationValue }) => useCursorPagination({ value, onValueChange: changed }), { initialProps: { value: { page: 3, pageSize: 10 } } });
    expect(result.current.paginationProps.value.page).toBe(1);
    expect(changed).toHaveBeenCalledExactlyOnceWith({ page: 1, pageSize: 10 }, { reason: "total-change" });
    rerender({ value: { page: 1, pageSize: 10 } });
    act(() => result.current.setNextCursor("c2"));
    act(() => result.current.paginationProps.onValueChange({ page: 2, pageSize: 10 }, { reason: "page" }));
    expect(changed).toHaveBeenLastCalledWith({ page: 2, pageSize: 10 }, { reason: "page" });
    expect(result.current.cursor).toBeNull();
    rerender({ value: { page: 2, pageSize: 10 } });
    expect(result.current.cursor).toBe("c2");
  });
});

describe("useCursorPagination with PaginationPattern", () => {
  it("drives the pager through forward and back navigation", async () => {
    const user = userEvent.setup();
    const cursors = ["a", "b", null];
    function Example() {
      const cursorPagination = useCursorPagination();
      const { setNextCursor, cursor, value } = cursorPagination;
      React.useEffect(() => { setNextCursor(cursors[value.page - 1]); }, [value.page, setNextCursor]);
      return <><output data-testid="cursor">{String(cursor)}</output><PaginationPattern {...cursorPagination.paginationProps} /></>;
    }
    render(<Example />);
    expect(screen.getByTestId("cursor")).toHaveTextContent("null");
    await user.click(screen.getByRole("button", { name: "下一页" }));
    expect(screen.getByTestId("cursor")).toHaveTextContent("a");
    await user.click(screen.getByRole("button", { name: "下一页" }));
    expect(screen.getByTestId("cursor")).toHaveTextContent("b");
    expect(screen.getByRole("button", { name: "下一页" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "上一页" }));
    expect(screen.getByTestId("cursor")).toHaveTextContent("a");
    expect(screen.getByRole("button", { name: "下一页" })).toBeEnabled();
  });
});

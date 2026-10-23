import * as React from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type RowSelectionState } from "@tanstack/react-table";
import { describe, expect, it, vi } from "vitest";
import { DataTable, DataTableSelectAll, DataTableSelectionCell, DataTableSortButton, type DataTableProps } from "../src/components/data-table";
type RecordItem = { id: string; label: string; count: number };
const items: RecordItem[] = [{ id: "a", label: "A", count: 2 }, { id: "b", label: "B", count: 0 }, { id: "c", label: "C", count: 1 }];
function Fixture({ data = items, scope = "page", filtered = false, selection = {}, cancel = false, busy = false, stable = true }: { data?: RecordItem[]; scope?: "page" | "filtered"; filtered?: boolean; selection?: RowSelectionState; cancel?: boolean; busy?: boolean; stable?: boolean }) {
  const columns = React.useMemo<ColumnDef<RecordItem>[]>(() => [
    { id: "selection", header: ({ table }) => <DataTableSelectAll table={table} scope={scope} aria-label="选择范围" />, cell: ({ row }) => <DataTableSelectionCell row={row} aria-label={`选择 ${row.original.label}`} onCheckedChange={(_, details) => { if (cancel) details.cancel(); }} />, enableSorting: false },
    { accessorKey: "label", header: "条目", meta: { rowHeader: true }, filterFn: row => row.id !== "a" },
    { accessorKey: "count", sortDescFirst: false, header: ({ column }) => <DataTableSortButton column={column}>数量</DataTableSortButton> },
  ], [scope, cancel]);
  const table = useReactTable({ data, columns, ...(stable ? { getRowId: (row: RecordItem) => row.id } : {}), getCoreRowModel: getCoreRowModel(), getFilteredRowModel: getFilteredRowModel(), getSortedRowModel: getSortedRowModel(), getPaginationRowModel: getPaginationRowModel(), enableRowSelection: row => row.id !== "c", initialState: { rowSelection: selection, pagination: { pageIndex: 0, pageSize: scope === "page" ? 1 : 10 }, columnFilters: filtered ? [{ id: "label", value: "exclude-a" }] : [] } });
  return <><DataTable table={table} caption="本地条目" emptyContent="结果尚未知" busy={busy} /><output data-testid="selected">{Object.entries(table.getState().rowSelection).filter(([, checked]) => checked).map(([id]) => id).join(",")}</output><button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>下一页</button></>;
}
const comparison: ColumnDef<RecordItem>[] = [{ accessorKey: "label", header: "名称", meta: { rowHeader: true } }, { accessorKey: "count", header: "数量" }];
function AdvancedFixture({ definitions = comparison, data = items, columnSizing, selected = {}, ...props }: Omit<DataTableProps<RecordItem>, "table" | "emptyContent"> & { definitions?: ColumnDef<RecordItem>[]; data?: RecordItem[]; columnSizing?: Record<string, number>; selected?: RowSelectionState }) {
  const table = useReactTable({ data, columns: definitions, getRowId: row => row.id, getCoreRowModel: getCoreRowModel(), autoResetAll: false, initialState: { rowSelection: selected }, ...(columnSizing ? { state: { columnSizing } } : {}) });
  return <><DataTable table={table} emptyContent="没有条目" {...props} /><output data-testid="selection-count">{Object.values(table.getState().rowSelection).filter(Boolean).length}</output></>;
}
function pendingScroll(viewport: HTMLElement, count: () => number) {
  let id = 0;
  const frames = new Map<number, FrameRequestCallback>();
  const request = vi.spyOn(window, "requestAnimationFrame").mockImplementation(callback => { frames.set(++id, callback); return id; });
  const cancel = vi.spyOn(window, "cancelAnimationFrame").mockImplementation(frame => { frames.delete(frame); });
  Object.defineProperty(viewport, "scrollHeight", { configurable: true, get: () => count() * 48 });
  Object.defineProperty(viewport, "clientHeight", { configurable: true, value: 144 });
  // The write has not landed yet, as with a native command awaiting its next animation frame.
  const writes = vi.fn();
  viewport.scrollTo = writes;
  return {
    writes,
    frames,
    flush() { act(() => { for (const [frame, callback] of [...frames]) { frames.delete(frame); callback(performance.now()); } }); },
    restore() { request.mockRestore(); cancel.mockRestore(); },
  };
}
describe("DataTable", () => {
  it("preserves native comparison, zero and real sort order", async () => {
    const user = userEvent.setup(); render(<Fixture scope="filtered" />); const table = screen.getByRole("table", { name: "本地条目" }); expect(within(table).getByRole("rowheader", { name: "B" })).toBeInTheDocument(); expect(within(table).getByRole("cell", { name: "0" })).toBeInTheDocument(); await user.click(screen.getByRole("button", { name: /数量/ })); expect(screen.getByRole("columnheader", { name: /数量/ })).toHaveAttribute("aria-sort", "ascending"); expect(table.querySelector("tbody tr")).toHaveAttribute("data-row-id", "b");
  });
  it("selects only the current page and retains that fact on page change", async () => {
    const user = userEvent.setup(); render(<Fixture />); await user.click(screen.getByRole("checkbox", { name: "选择范围" })); expect(screen.getByTestId("selected")).toHaveTextContent(/^a$/); await user.click(screen.getByRole("button", { name: "下一页" })); expect(screen.getByRole("checkbox", { name: "选择范围" })).toHaveAttribute("aria-checked", "false"); expect(screen.getByRole("rowheader", { name: "B" })).toBeInTheDocument();
  });
  it("derives filtered selection from eligible rows and preserves outside selections", async () => {
    const user = userEvent.setup(); const { unmount } = render(<Fixture scope="filtered" filtered selection={{ a: true }} />); const selectAll = screen.getByRole("checkbox", { name: "选择范围" }); expect(selectAll).toHaveAttribute("aria-checked", "false"); expect(screen.getByRole("checkbox", { name: "选择 C" })).toHaveAttribute("aria-disabled", "true"); await user.click(selectAll); expect(selectAll).toHaveAttribute("aria-checked", "true"); expect(screen.getByTestId("selected")).toHaveTextContent(/^a,b$/); await user.click(selectAll); expect(selectAll).toHaveAttribute("aria-checked", "false"); expect(screen.getByTestId("selected")).toHaveTextContent(/^a$/); unmount(); render(<Fixture scope="filtered" filtered selection={{ a: false }} />); expect(screen.getByRole("checkbox", { name: "选择范围" })).toHaveAttribute("aria-checked", "false");
  });
  it("honors canceled selection, preserves busy rows and caller unknown content", async () => {
    const user = userEvent.setup(); const { rerender } = render(<Fixture scope="filtered" cancel busy />); await user.click(screen.getByRole("checkbox", { name: "选择 A" })); expect(screen.getByTestId("selected")).toBeEmptyDOMElement(); expect(screen.getByRole("table")).toHaveAttribute("aria-busy", "true"); expect(screen.getByRole("rowheader", { name: "A" })).toBeInTheDocument(); rerender(<Fixture data={[]} scope="filtered" />); expect(screen.getByRole("cell", { name: "结果尚未知" })).toHaveAttribute("colspan", "3"); expect(screen.getByRole("checkbox", { name: "选择范围" })).toHaveAttribute("aria-disabled", "true");
  });
  it("rejects positional identity", () => { expect(() => render(<Fixture stable={false} />)).toThrow("stable getRowId"); });

  it("retains natural layout unless sizes are requested, then applies clamped leaf and grouped widths", () => {
    const { rerender } = render(<AdvancedFixture />);
    expect(screen.getByRole("table").style.tableLayout).toBe("");
    expect(screen.getByRole("table").querySelector("colgroup")).not.toBeInTheDocument();
    const definitions: ColumnDef<RecordItem>[] = [{ id: "group", header: "条目", columns: [
      { accessorKey: "label", header: "名称", size: 100, minSize: 160, maxSize: 220 },
      { accessorKey: "count", header: "数量", size: 120 },
    ] }];
    rerender(<AdvancedFixture definitions={definitions} />);
    expect(screen.getByRole("table")).toHaveStyle({ tableLayout: "fixed", width: "280px" });
    expect(screen.getByRole("columnheader", { name: "条目" })).toHaveAttribute("colspan", "2");
    expect(screen.getByRole("columnheader", { name: "条目" })).toHaveStyle({ width: "280px" });
    expect(screen.getByRole("columnheader", { name: "名称" })).toHaveStyle({ width: "160px" });
    expect(screen.getByRole("cell", { name: "A" })).toHaveStyle({ width: "160px", minWidth: "160px", maxWidth: "220px" });
    rerender(<AdvancedFixture definitions={definitions} columnSizing={{ label: 500 }} />);
    expect(screen.getByRole("columnheader", { name: "名称" })).toHaveStyle({ width: "220px" });
    expect(screen.getByRole("columnheader", { name: "条目" })).toHaveStyle({ width: "340px" });
    expect(screen.getByRole("table").querySelector("col")).toHaveStyle({ width: "220px" });
  });

  it("also consumes advanced columnSizing state without requiring definition sizes", () => {
    render(<AdvancedFixture columnSizing={{ label: 240, count: 80 }} />);
    expect(screen.getByRole("table")).toHaveStyle({ tableLayout: "fixed", width: "320px" });
    expect(screen.getByRole("rowheader", { name: "A" })).toHaveStyle({ width: "240px" });
  });

  it("ellipsizes complete rendered text while leaving interactive content unclipped", () => {
    const text = "完整的中文名称 / Complete rendered name";
    render(<AdvancedFixture definitions={[
      { accessorKey: "label", header: "名称", size: 160, meta: { rowHeader: true, ellipsis: true }, cell: () => <span>{text}</span> },
      { accessorKey: "count", header: "操作", size: 120, meta: { ellipsis: true }, cell: () => <button>完整操作名称</button> },
    ]} />);
    const heading = screen.getAllByRole("rowheader", { name: text })[0]!;
    const content = heading.querySelector("[data-slot=data-table-cell-content]");
    expect(content).toHaveClass("truncate");
    expect(content).toHaveAttribute("title", text);
    expect(heading).toHaveAccessibleName(text);
    const action = screen.getAllByRole("button", { name: "完整操作名称" })[0]!;
    expect(action.parentElement).not.toHaveClass("truncate");
    expect(action.parentElement).not.toHaveAttribute("title");
  });

  it("checkbox-only selection keeps real controls and active-row emphasis independent", async () => {
    const user = userEvent.setup();
    const definitions: ColumnDef<RecordItem>[] = [{ id: "selection", header: "选择", cell: ({ row }) => <DataTableSelectionCell row={row} aria-label={`选择 ${row.original.label}`} /> }, ...comparison];
    const { rerender } = render(<AdvancedFixture definitions={definitions} selected={{ a: true }} activeRowId="b" selectionAppearance="checkbox" />);
    const selected = screen.getByRole("rowheader", { name: "A" }).closest("tr");
    const active = screen.getByRole("rowheader", { name: "B" }).closest("tr");
    expect(selected).toHaveAttribute("data-selected", "true");
    expect(selected).not.toHaveClass("bg-surface-selected");
    expect(active).toHaveClass("bg-surface-selected");
    expect(screen.getByRole("checkbox", { name: "选择 A" })).toHaveAttribute("aria-checked", "true");
    await user.click(screen.getByRole("checkbox", { name: "选择 B" }));
    expect(active).toHaveAttribute("data-active", "true");
    rerender(<AdvancedFixture definitions={definitions} activeRowId="b" />);
    expect(selected).toHaveClass("bg-surface-selected");
  });

  it("activates noninteractive row content with click, Enter and Space but excludes nested controls", async () => {
    const user = userEvent.setup();
    const activated = vi.fn();
    render(<AdvancedFixture onRowActivate={activated} definitions={[...comparison, { id: "actions", header: "操作", cell: ({ row }) => <>
      <button>操作 {row.id}</button><a href={`#${row.id}`}>链接 {row.id}</a><input aria-label={`编辑 ${row.id}`} />
      <label><input type="checkbox" />确认 {row.id}</label><span contentEditable suppressContentEditableWarning>草稿 {row.id}</span><span data-row-activate-ignore>忽略 {row.id}</span>
    </> }]} />);
    const row = screen.getByRole("rowheader", { name: "A" }).closest("tr")!;
    await user.click(screen.getByRole("rowheader", { name: "A" }));
    expect(activated).toHaveBeenLastCalledWith(expect.objectContaining({ id: "a", original: items[0] }));
    row.focus();
    await user.keyboard("{Enter} ");
    expect(activated).toHaveBeenCalledTimes(3);
    for (const node of [screen.getByRole("button", { name: "操作 a" }), screen.getByRole("link", { name: "链接 a" }), screen.getByRole("textbox", { name: "编辑 a" }), screen.getByText("确认 a"), screen.getByText("草稿 a"), screen.getByText("忽略 a")]) await user.click(node);
    fireEvent.keyDown(screen.getByRole("textbox", { name: "编辑 a" }), { key: "Enter" });
    expect(activated).toHaveBeenCalledTimes(3);
    expect(screen.getByTestId("selection-count")).toHaveTextContent("0");
  });

  it("virtualizes only the current model with truthful native row indices and bounded DOM", () => {
    const many = Array.from({ length: 500 }, (_, index) => ({ id: `row-${index}`, label: `条目 ${index}`, count: index }));
    render(<AdvancedFixture data={many} caption="完整集合" busy virtualization={{ height: 144, estimateRowHeight: 48, overscan: 1 }} />);
    const table = screen.getByRole("table", { name: "完整集合" });
    const viewport = table.parentElement!;
    expect(viewport).toHaveStyle({ height: "144px" });
    expect(table).toHaveAttribute("aria-rowcount", "501");
    expect(table).toHaveAttribute("aria-busy", "true");
    expect(table.querySelectorAll("tbody > tr[data-row-id]").length).toBeLessThanOrEqual(5);
    expect(screen.getByRole("rowheader", { name: "条目 0" }).closest("tr")).toHaveAttribute("aria-rowindex", "2");
    fireEvent.scroll(viewport, { target: { scrollTop: 9000 } });
    expect(screen.queryByRole("rowheader", { name: "条目 0" })).not.toBeInTheDocument();
    expect(screen.getByRole("rowheader", { name: "条目 187" }).closest("tr")).toHaveAttribute("aria-rowindex", "189");
    expect(table.querySelectorAll("tbody > tr[data-row-id]").length).toBeLessThanOrEqual(6);
    expect(table.querySelector("tbody")?.tagName).toBe("TBODY");
    expect(table.querySelector("thead")?.tagName).toBe("THEAD");
    for (const spacer of table.querySelectorAll("[data-slot=data-table-spacer]")) expect(spacer).toHaveAttribute("aria-hidden", "true");
  });

  it("retains an offscreen editor through scroll/reorder and returns focus to the viewport when removed", async () => {
    const user = userEvent.setup();
    const many = Array.from({ length: 200 }, (_, index) => ({ id: `row-${index}`, label: `条目 ${index}`, count: index }));
    const definitions: ColumnDef<RecordItem>[] = [...comparison, { id: "edit", header: "草稿", cell: ({ row }) => <input aria-label={`编辑 ${row.id}`} defaultValue="原稿" /> }];
    const { rerender } = render(<AdvancedFixture data={many} definitions={definitions} virtualization={{ height: 144, estimateRowHeight: 48, overscan: 0 }} />);
    const editor = screen.getByRole("textbox", { name: "编辑 row-0" });
    await user.type(editor, "修改");
    fireEvent.keyDown(editor, { key: "End" });
    expect(editor).toHaveFocus();
    const viewport = screen.getByRole("table").parentElement!;
    fireEvent.scroll(viewport, { target: { scrollTop: 6000 } });
    expect(editor).toHaveFocus();
    expect(editor).toHaveValue("原稿修改");
    expect(viewport.querySelectorAll("tbody tr[data-row-id]").length).toBeLessThanOrEqual(5);
    rerender(<AdvancedFixture data={[...many].reverse()} definitions={definitions} virtualization={{ height: 144, estimateRowHeight: 48, overscan: 0 }} />);
    expect(screen.getByRole("textbox", { name: "编辑 row-0" })).toBe(editor);
    expect(editor).toHaveFocus();
    rerender(<AdvancedFixture data={many.slice(1)} definitions={definitions} virtualization={{ height: 144, estimateRowHeight: 48, overscan: 0 }} />);
    expect(screen.queryByRole("textbox", { name: "编辑 row-0" })).not.toBeInTheDocument();
    expect(viewport).toHaveFocus();
  });

  it("moves across virtual windows with row keys while honoring viewport cancellation", async () => {
    const user = userEvent.setup();
    const many = Array.from({ length: 200 }, (_, index) => ({ id: `row-${index}`, label: `条目 ${index}`, count: index }));
    const { rerender } = render(<AdvancedFixture data={many} virtualization={{ height: 144, estimateRowHeight: 48, overscan: 0 }} containerProps={{ onKeyDown: event => event.preventDefault() }} />);
    const viewport = screen.getByRole("table").parentElement!;
    viewport.focus();
    await user.keyboard("{End}");
    expect(viewport).toHaveFocus();
    expect(screen.queryByRole("rowheader", { name: "条目 199" })).not.toBeInTheDocument();
    rerender(<AdvancedFixture data={many} virtualization={{ height: 144, estimateRowHeight: 48, overscan: 0 }} />);
    await user.keyboard("{End}");
    expect(screen.getByRole("rowheader", { name: "条目 199" }).closest("tr")).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(screen.getByRole("rowheader", { name: "条目 198" }).closest("tr")).toHaveFocus();
    await user.keyboard("{Home}");
    expect(screen.getByRole("rowheader", { name: "条目 0" }).closest("tr")).toHaveFocus();
  });

  it("accounts for caption/header offset and measures rows larger than the estimate", () => {
    const rect = vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function () {
      return new DOMRect(0, this.tagName === "TBODY" ? 60 - (this.parentElement?.parentElement?.scrollTop ?? 0) : 0, 0, 0);
    });
    const height = vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockImplementation(function () {
      return this.tagName === "TR" && this.hasAttribute("data-row-id") ? this.dataset.rowId === "a" ? 96 : 48 : 0;
    });
    const { unmount } = render(<AdvancedFixture caption="表头与名称" virtualization={{ height: 144, estimateRowHeight: 20, overscan: 0 }} />);
    try {
      const viewport = screen.getByRole("table").parentElement!;
      fireEvent.scroll(viewport, { target: { scrollTop: 156 } });
      expect(screen.queryByRole("rowheader", { name: "A" })).not.toBeInTheDocument();
      expect(screen.getByRole("rowheader", { name: "B" }).closest("tr")).toHaveAttribute("aria-rowindex", "3");
      expect(viewport.querySelector("[data-slot=data-table-spacer]")).toHaveStyle({ height: "96px" });
    } finally { unmount(); rect.mockRestore(); height.mockRestore(); }
  });

  it("does not rebuild every row's key/measurement map when a large collection scrolls", () => {
    const read = vi.fn();
    const many = Array.from({ length: 10_000 }, (_, index) => ({ id: `row-${index}`, label: `条目 ${index}`, count: index }));
    function Profiled() {
      const table = useReactTable({ data: many, columns: comparison, getRowId: row => row.id, getCoreRowModel: getCoreRowModel(), autoResetAll: false });
      const rows = table.getRowModel().rows;
      React.useMemo(() => { for (const row of rows) { const id = row.id; Object.defineProperty(row, "id", { get: () => { read(); return id; } }); } }, [rows]);
      return <DataTable table={table} emptyContent="没有条目" virtualization={{ height: 144, estimateRowHeight: 48, overscan: 1 }} />;
    }
    render(<Profiled />);
    const before = read.mock.calls.length;
    const viewport = screen.getByRole("table").parentElement!;
    for (const scrollTop of [4800, 240_000, 479_000]) fireEvent.scroll(viewport, { target: { scrollTop } });
    expect(read.mock.calls.length - before).toBeLessThan(500);
    expect(viewport.querySelectorAll("tbody tr[data-row-id]").length).toBeLessThanOrEqual(6);
    expect(screen.getByRole("rowheader", { name: "条目 9979" })).toBeInTheDocument();
  });

  it("keeps the virtual empty message as one truthful native row", () => {
    render(<AdvancedFixture data={[]} virtualization={{ height: 144, estimateRowHeight: 48 }} />);
    expect(screen.getByRole("table")).toHaveAttribute("aria-rowcount", "2");
    expect(screen.getByRole("cell", { name: "没有条目" }).closest("tr")).toHaveAttribute("aria-rowindex", "2");
    expect(screen.getByRole("cell", { name: "没有条目" })).toHaveAttribute("colspan", "2");
  });

  it.each(["reorder", "replace", "shrink"] as const)("drops an unfinished numeric jump when the row model changes: %s", change => {
    const many = Array.from({ length: 200 }, (_, index) => ({ id: `row-${index}`, label: `条目 ${index}`, count: index }));
    let model = many;
    const { rerender, unmount } = render(<AdvancedFixture data={model} virtualization={{ height: 144, estimateRowHeight: 48 }} />);
    const viewport = screen.getByRole("table").parentElement!;
    const scroll = pendingScroll(viewport, () => model.length);
    try {
      fireEvent.keyDown(viewport, { key: "End" });
      expect(scroll.frames.size).toBeGreaterThan(0);
      model = change === "reorder" ? [...many].reverse() : change === "replace" ? many.map(row => row.id === "row-199" ? { ...row, id: "replacement" } : row) : many.slice(0, 20);
      rerender(<AdvancedFixture data={model} virtualization={{ height: 144, estimateRowHeight: 48 }} />);
      expect(scroll.frames.size).toBe(0);
      const writes = scroll.writes.mock.calls.length;
      scroll.flush(); scroll.flush();
      expect(scroll.writes).toHaveBeenCalledTimes(writes);
      expect(viewport.scrollTop).toBe(0);
    } finally { unmount(); scroll.restore(); }
  });

  it.each(["wheel", "touchStart"] as const)("lets a user %s interrupt a pending jump while preserving container handlers", gesture => {
    const many = Array.from({ length: 200 }, (_, index) => ({ id: `row-${index}`, label: `条目 ${index}`, count: index }));
    const handler = vi.fn();
    const { unmount } = render(<AdvancedFixture data={many} virtualization={{ height: 144, estimateRowHeight: 48 }} containerProps={gesture === "wheel" ? { onWheel: handler } : { onTouchStart: handler }} />);
    const viewport = screen.getByRole("table").parentElement!;
    const scroll = pendingScroll(viewport, () => many.length);
    try {
      fireEvent.keyDown(viewport, { key: "End" });
      expect(scroll.frames.size).toBeGreaterThan(0);
      fireEvent[gesture](viewport);
      expect(handler).toHaveBeenCalledOnce();
      expect(scroll.frames.size).toBe(0);
      const writes = scroll.writes.mock.calls.length;
      scroll.flush(); scroll.flush();
      expect(scroll.writes).toHaveBeenCalledTimes(writes);
      expect(viewport.scrollTop).toBe(0);
    } finally { unmount(); scroll.restore(); }
  });

  it("rejects invalid virtual geometry instead of rendering an unbounded or invalid range", () => {
    for (const height of [0, -1, NaN, Infinity]) expect(() => render(<AdvancedFixture virtualization={{ height, estimateRowHeight: 48 }} />)).toThrow("finite positive");
    for (const estimateRowHeight of [0, -1, NaN, Infinity]) expect(() => render(<AdvancedFixture virtualization={{ height: 144, estimateRowHeight }} />)).toThrow("finite positive");
    for (const overscan of [-1, 0.5, NaN, Infinity]) expect(() => render(<AdvancedFixture virtualization={{ height: 144, estimateRowHeight: 48, overscan }} />)).toThrow("nonnegative integer");
  });
});

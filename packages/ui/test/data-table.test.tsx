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
    const user = userEvent.setup(); render(<Fixture />); await user.click(screen.getByRole("checkbox", { name: "选择范围（仅本页）" })); expect(screen.getByTestId("selected")).toHaveTextContent(/^a$/); await user.click(screen.getByRole("button", { name: "下一页" })); expect(screen.getByRole("checkbox", { name: "选择范围（仅本页）" })).toHaveAttribute("aria-checked", "false"); expect(screen.getByRole("rowheader", { name: "B" })).toBeInTheDocument();
  });
  it("derives filtered selection from eligible rows and preserves outside selections", async () => {
    const user = userEvent.setup(); const { unmount } = render(<Fixture scope="filtered" filtered selection={{ a: true }} />); const selectAll = screen.getByRole("checkbox", { name: "选择范围（全部筛选结果）" }); expect(selectAll).toHaveAttribute("aria-checked", "false"); expect(screen.getByRole("checkbox", { name: "选择 C" })).toHaveAttribute("aria-disabled", "true"); await user.click(selectAll); expect(selectAll).toHaveAttribute("aria-checked", "true"); expect(screen.getByTestId("selected")).toHaveTextContent(/^a,b$/); await user.click(selectAll); expect(selectAll).toHaveAttribute("aria-checked", "false"); expect(screen.getByTestId("selected")).toHaveTextContent(/^a$/); unmount(); render(<Fixture scope="filtered" filtered selection={{ a: false }} />); expect(screen.getByRole("checkbox", { name: "选择范围（全部筛选结果）" })).toHaveAttribute("aria-checked", "false");
  });
  it("honors canceled selection, preserves busy rows and caller unknown content", async () => {
    const user = userEvent.setup(); const { rerender } = render(<Fixture scope="filtered" cancel busy />); await user.click(screen.getByRole("checkbox", { name: "选择 A" })); expect(screen.getByTestId("selected")).toBeEmptyDOMElement(); expect(screen.getByRole("table")).toHaveAttribute("aria-busy", "true"); expect(screen.getByRole("rowheader", { name: "A" })).toBeInTheDocument(); rerender(<Fixture data={[]} scope="filtered" />); expect(screen.getByRole("cell", { name: "结果尚未知" })).toHaveAttribute("colspan", "3"); expect(screen.getByRole("checkbox", { name: "选择范围（全部筛选结果）" })).toHaveAttribute("aria-disabled", "true");
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

  describe("ellipsis", () => {
    const text = "完整的中文名称 / Complete rendered name";
    const definitions: ColumnDef<RecordItem>[] = [
      { accessorKey: "label", header: "名称", size: 160, meta: { rowHeader: true, ellipsis: true }, cell: () => <span>{text}</span> },
      { accessorKey: "count", header: "操作", size: 120, meta: { ellipsis: true }, cell: () => <button>完整操作名称</button> },
    ];
    // jsdom has no layout: the test supplies the measurements the browser would.
    function overflow(scroll: number, client: number) {
      const a = vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(scroll);
      const b = vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(client);
      return () => { a.mockRestore(); b.mockRestore(); };
    }
    it("keeps the complete text readable and out of the Tab sequence while it fits; interactive content is never clipped", () => {
      render(<AdvancedFixture definitions={definitions} />);
      const heading = screen.getAllByRole("rowheader", { name: text })[0]!;
      const content = heading.querySelector("[data-slot=data-table-cell-content]")!;
      expect(heading).toHaveAccessibleName(text);
      expect(content).not.toHaveAttribute("tabindex");
      expect(content).not.toHaveAttribute("title");
      const action = screen.getAllByRole("button", { name: "完整操作名称" })[0]!;
      expect(action.parentElement).not.toHaveAttribute("tabindex");
    });
    it("makes truncated text a keyboard stop that shows the full text in a tooltip, with the text still in the DOM for readers", async () => {
      const user = userEvent.setup();
      const restore = overflow(300, 100);
      try {
        render(<AdvancedFixture definitions={definitions} />);
        const heading = screen.getAllByRole("rowheader", { name: text })[0]!;
        const content = heading.querySelector("[data-slot=data-table-cell-content]")!;
        expect(content).toHaveAttribute("tabindex", "0");
        expect(content).toHaveTextContent(text);
        expect(heading).toHaveAccessibleName(text);
        // 滚动容器与表头里被截断的文字（测量对整页一视同仁）也是停靠点，Tab 到这一格为止。
        for (let step = 0; step < 12 && document.activeElement !== content; step++) await user.tab();
        expect(content).toHaveFocus();
        expect(await screen.findByRole("tooltip")).toHaveTextContent(text);
        // 控件不是被裁切的文字：不成为停靠点。
        expect(screen.getAllByRole("button", { name: "完整操作名称" })[0]!.parentElement).not.toHaveAttribute("tabindex");
      } finally { restore(); }
    });
    it("still activates the row when the truncated text is clicked", async () => {
      const user = userEvent.setup();
      const onRowActivate = vi.fn();
      const restore = overflow(300, 100);
      try {
        render(<AdvancedFixture definitions={definitions} onRowActivate={onRowActivate} />);
        await user.click(screen.getAllByRole("rowheader", { name: text })[0]!.querySelector("[data-slot=data-table-cell-content]")!);
        expect(onRowActivate).toHaveBeenCalledOnce();
      } finally { restore(); }
    });
  });

  it("checkbox-only selection keeps real controls and active-row emphasis independent", async () => {
    const user = userEvent.setup();
    const definitions: ColumnDef<RecordItem>[] = [{ id: "selection", header: "选择", cell: ({ row }) => <DataTableSelectionCell row={row} aria-label={`选择 ${row.original.label}`} /> }, ...comparison];
    const { rerender } = render(<AdvancedFixture definitions={definitions} selected={{ a: true }} activeRowId="b" selectionAppearance="checkbox" />);
    const selected = screen.getByRole("rowheader", { name: "A" }).closest("tr");
    const active = screen.getByRole("rowheader", { name: "B" }).closest("tr");
    expect(selected).toHaveAttribute("data-selected", "true");
    expect(screen.getByRole("checkbox", { name: "选择 A" })).toHaveAttribute("aria-checked", "true");
    await user.click(screen.getByRole("checkbox", { name: "选择 B" }));
    expect(active).toHaveAttribute("data-active", "true");
    rerender(<AdvancedFixture definitions={definitions} activeRowId="b" />);
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

  it("names each selection checkbox after its row, falling back to the generic name without a row header", () => {
    const withSelection: ColumnDef<RecordItem>[] = [{ id: "pick", header: "选择", cell: ({ row }) => <DataTableSelectionCell row={row} />, enableSorting: false }];
    const { unmount } = render(<AdvancedFixture definitions={[...withSelection, ...comparison]} />);
    expect(screen.getByRole("checkbox", { name: "选择“A”" })).toBeInTheDocument(); expect(screen.getByRole("checkbox", { name: "选择“B”" })).toBeInTheDocument(); expect(screen.queryByRole("checkbox", { name: "选择此行" })).toBeNull();
    unmount();
    render(<AdvancedFixture definitions={[...withSelection, { accessorKey: "label", header: "名称" }]} />);
    expect(screen.getAllByRole("checkbox", { name: "选择此行" })).toHaveLength(3);
  });
  it("reads the shown row-header text when the cell renders something other than the raw value", () => {
    render(<AdvancedFixture definitions={[{ id: "pick", header: "选择", cell: ({ row }) => <DataTableSelectionCell row={row} /> }, { accessorKey: "label", header: "名称", meta: { rowHeader: true }, cell: ({ row }) => <>条目 {row.original.label}</> }]} />);
    expect(screen.getByRole("checkbox", { name: "选择“条目 A”" })).toBeInTheDocument();
  });
  it("keeps old rows during busy, shows a labelled wait mark, and exposes the error slot as an alert", () => {
    const { rerender } = render(<AdvancedFixture busy error={<span>刷新失败 <button>重试</button></span>} />);
    expect(screen.getByRole("progressbar", { name: "正在加载" })).toBeInTheDocument(); expect(screen.getByRole("table")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("刷新失败"); expect(screen.getByRole("button", { name: "重试" })).toBeInTheDocument(); expect(screen.getByRole("rowheader", { name: "A" })).toBeInTheDocument();
    rerender(<AdvancedFixture />);
    expect(screen.queryByRole("progressbar")).toBeNull(); expect(screen.queryByRole("alert")).toBeNull(); expect(screen.getByRole("table")).toHaveAttribute("aria-busy", "false");
  });
  it("keeps one row in the Tab sequence and moves it with arrows, Home and End", async () => {
    const user = userEvent.setup(); const activated = vi.fn();
    const { rerender } = render(<AdvancedFixture onRowActivate={activated} />);
    const rows = () => Array.from(screen.getByRole("table").querySelectorAll<HTMLTableRowElement>("tbody tr"));
    expect(rows().map(row => row.getAttribute("tabindex"))).toEqual(["0", "-1", "-1"]);
    await user.tab(); expect(rows()[0]).toHaveFocus();
    await user.keyboard("{ArrowDown}"); expect(rows()[1]).toHaveFocus(); expect(rows().map(row => row.getAttribute("tabindex"))).toEqual(["-1", "0", "-1"]);
    await user.keyboard("{End}"); expect(rows()[2]).toHaveFocus(); await user.keyboard("{ArrowDown}"); expect(rows()[2]).toHaveFocus();
    await user.keyboard("{Home}"); expect(rows()[0]).toHaveFocus(); await user.keyboard("{ArrowUp}"); expect(rows()[0]).toHaveFocus();
    await user.keyboard("{ArrowDown}{Enter}"); expect(activated).toHaveBeenLastCalledWith(expect.objectContaining({ id: "b" }));
    await user.tab(); expect(rows().some(row => row === document.activeElement)).toBe(false);
    await user.tab({ shift: true }); expect(rows()[1]).toHaveFocus();
    rerender(<AdvancedFixture onRowActivate={activated} activeRowId="c" data={[items[2]!, items[0]!]} />);
    expect(rows().map(row => row.getAttribute("tabindex"))).toEqual(["0", "-1"]);
  });
  it("starts the single Tab stop on the active row when focus has not entered the table", () => {
    render(<AdvancedFixture onRowActivate={() => {}} activeRowId="b" />);
    expect(Array.from(screen.getByRole("table").querySelectorAll("tbody tr")).map(row => row.getAttribute("tabindex"))).toEqual(["-1", "0", "-1"]);
  });

  describe("mixed column widths", () => {
    const mixed: ColumnDef<RecordItem>[] = [
      { accessorKey: "label", header: "名称", minSize: 300, meta: { rowHeader: true } },
      { accessorKey: "count", header: "数量", size: 90 },
      { id: "note", header: "说明", accessorFn: row => row.id },
    ];
    const cols = () => Array.from(screen.getByRole("table").querySelectorAll<HTMLElement>("colgroup > col"));

    it("shares the remaining width between flexible columns and floors the table at the largest flexible minimum", () => {
      render(<AdvancedFixture definitions={mixed} />);
      const table = screen.getByRole("table");
      // 定宽 90 + 2 个弹性列 × max(300 声明的 minSize, 150 默认 size)
      expect(table.style.tableLayout).toBe("fixed");
      expect(table.style.width).toBe("100%");
      expect(table.style.minWidth).toBe("690px");
      expect(cols().map(col => col.style.width)).toEqual(["", "90px", ""]);
      expect(screen.getByRole("columnheader", { name: "名称" }).style.width).toBe("");
      expect(screen.getByRole("columnheader", { name: "数量" })).toHaveStyle({ width: "90px" });
      expect(screen.getByRole("rowheader", { name: "A" }).style.width).toBe("");
      expect(screen.getByRole("cell", { name: "2" })).toHaveStyle({ width: "90px" });
    });

    it("uses TanStack's default size as the floor of a flexible column without minSize", () => {
      render(<AdvancedFixture definitions={[{ accessorKey: "label", header: "名称", meta: { rowHeader: true } }, { accessorKey: "count", header: "数量", size: 80 }]} />);
      expect(screen.getByRole("table").style.minWidth).toBe("230px");
    });

    it("treats a user-resized column as fixed width and keeps maxSize from constraining a flexible column", () => {
      const { rerender } = render(<AdvancedFixture definitions={[{ accessorKey: "label", header: "名称", maxSize: 200, meta: { rowHeader: true } }, { accessorKey: "count", header: "数量" }]} />);
      expect(cols().map(col => col.style.width)).toEqual(["", ""]);
      expect(screen.getByRole("table").style.width).toBe("100%");
      rerender(<AdvancedFixture definitions={[{ accessorKey: "label", header: "名称", maxSize: 200, meta: { rowHeader: true } }, { accessorKey: "count", header: "数量" }]} columnSizing={{ count: 220 }} />);
      expect(cols().map(col => col.style.width)).toEqual(["", "220px"]);
      expect(screen.getByRole("table").style.minWidth).toBe("370px");
    });

    it("counts only size as a fixed width and keeps marker columns on their content width", () => {
      render(<AdvancedFixture definitions={[
        { id: "pick", header: "选择", cell: ({ row }) => <DataTableSelectionCell row={row} />, meta: { marker: true } },
        { accessorKey: "label", header: "名称", meta: { rowHeader: true } },
        { accessorKey: "count", header: "数量", size: 100 },
      ]} />);
      const table = screen.getByRole("table");
      expect(table.style.width).toBe("100%");
      expect(table.style.minWidth).toContain("--qy-marker-size");
      expect(table.style.minWidth).toContain("100px");
      expect(table.style.minWidth).toContain("150px");
      expect(cols()[0]!.style.width).toContain("--qy-marker-size");
      expect(cols()[1]!.style.width).toBe("");
    });

    it("keeps the sum-of-columns table when every column is fixed or a marker, and natural layout when nothing is sized", () => {
      render(<AdvancedFixture definitions={[{ accessorKey: "label", header: "名称", size: 200, meta: { rowHeader: true } }, { accessorKey: "count", header: "数量", size: 100 }]} />);
      const table = screen.getByRole("table");
      expect(table.style.tableLayout).toBe("fixed");
      expect(table.style.width).toBe("300px");
      expect(table.style.minWidth).toBe("");
      expect(cols().map(col => col.style.width)).toEqual(["200px", "100px"]);
    });
  });

  describe("row accessible names", () => {
    it("labels each row by its row-header cell", () => {
      render(<AdvancedFixture />);
      for (const item of items) {
        const row = screen.getByRole("rowheader", { name: item.label }).closest("tr")!;
        const ids = row.getAttribute("aria-labelledby")!.split(" ");
        expect(ids).toHaveLength(1);
        expect(document.getElementById(ids[0]!)).toBe(screen.getByRole("rowheader", { name: item.label }));
        expect(row).toHaveAccessibleName(item.label);
      }
      expect(screen.getByRole("row", { name: "B" })).toHaveAttribute("data-row-id", "b");
    });

    it("joins several row-header columns in column order and uses unique ids", () => {
      render(<AdvancedFixture definitions={[
        { accessorKey: "label", header: "名称", meta: { rowHeader: true } },
        { accessorKey: "count", header: "数量" },
        { id: "code", header: "编号", accessorFn: row => `#${row.id}`, meta: { rowHeader: true } },
      ]} />);
      const row = screen.getByRole("row", { name: "A #a" });
      const ids = row.getAttribute("aria-labelledby")!.split(" ");
      expect(ids).toHaveLength(2);
      expect(ids.map(id => document.getElementById(id)?.textContent)).toEqual(["A", "#a"]);
      const all = Array.from(document.querySelectorAll("tbody th[id]")).map(node => node.id);
      expect(new Set(all).size).toBe(all.length);
      for (const id of all) expect(/\s/.test(id)).toBe(false);
    });

    it("does not name rows when no row-header column exists", () => {
      render(<AdvancedFixture definitions={[{ accessorKey: "count", header: "数量" }]} />);
      expect(screen.getByRole("table").querySelector("tbody tr")).not.toHaveAttribute("aria-labelledby");
    });

    it("keeps names tied to the model index when virtualized", () => {
      const many = Array.from({ length: 200 }, (_, index) => ({ id: `row id ${index}`, label: `条目 ${index}`, count: index }));
      render(<AdvancedFixture data={many} virtualization={{ height: 144, estimateRowHeight: 48 }} />);
      fireEvent.scroll(screen.getByRole("table").parentElement!, { target: { scrollTop: 4000 } });
      const row = screen.getAllByRole("row").find(node => node.getAttribute("data-row-id")?.startsWith("row id 8"))!;
      const name = row.querySelector("th")!.textContent!;
      expect(row).toHaveAccessibleName(name);
      expect(document.getElementById(row.getAttribute("aria-labelledby")!)).toBe(row.querySelector("th"));
    });

    it("requires a visible row-header column when rows are activatable", () => {
      const error = vi.spyOn(console, "error").mockImplementation(() => {});
      try {
        expect(() => render(<AdvancedFixture onRowActivate={() => {}} definitions={[{ accessorKey: "count", header: "数量" }]} />)).toThrow("meta.rowHeader");
        expect(() => render(<AdvancedFixture onRowActivate={() => {}} definitions={[{ accessorKey: "label", header: "名称", meta: { rowHeader: true } }, { accessorKey: "count", header: "数量" }]} />)).not.toThrow();
      } finally { error.mockRestore(); }
    });
  });

  it("names the select-all checkbox after the range it selects", () => {
    const { unmount } = render(<Fixture />);
    expect(screen.getByRole("checkbox", { name: "选择范围（仅本页）" })).toHaveAttribute("data-scope", "page");
    unmount();
    render(<Fixture scope="filtered" />);
    expect(screen.getByRole("checkbox", { name: "选择范围（全部筛选结果）" })).toHaveAttribute("data-scope", "filtered");
  });
  it("aligns a numeric column by its meta declaration, header and cells together, whatever the content", () => {
    render(<AdvancedFixture definitions={[{ accessorKey: "label", header: "名称", meta: { rowHeader: true } }, { accessorKey: "count", header: "数量", meta: { numeric: true } }, { id: "note", header: "备注", cell: ({ row }) => String(row.original.count) }]} />);
    expect(screen.getByRole("columnheader", { name: "数量" })).toHaveAttribute("data-numeric");
    const counts = screen.getAllByRole("cell").filter(cell => cell.hasAttribute("data-numeric"));
    expect(counts.map(cell => cell.textContent)).toEqual(["2", "0", "1"]);
    // 不是数值列声明的列，即便内容是数字也不对齐成数值列。
    expect(screen.getByRole("columnheader", { name: "备注" })).not.toHaveAttribute("data-numeric");
    expect(screen.getByRole("rowheader", { name: "A" })).not.toHaveAttribute("data-numeric");
  });
});

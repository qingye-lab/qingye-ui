import * as React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DataTablePattern, type DataTablePatternColumn, type DataTablePatternState } from "../src/components/data-table";

type Entry = { id: string; label: string; count: number };
const data: Entry[] = [{ id: "a", label: "Alpha", count: 2 }, { id: "b", label: "Beta", count: 0 }, { id: "c", label: "Gamma", count: 1 }];
const columns: DataTablePatternColumn<Entry>[] = [
  { id: "label", header: "名称", accessor: row => row.label, rowHeader: true },
  { id: "count", header: "数量", accessor: row => row.count, sortable: true, sortDescFirst: false, numeric: true },
];
const getRowId = (row: Entry) => row.id;
const selection = { label: "选择当页", rowLabel: (row: Entry) => `选择 ${row.label}` };

describe("DataTablePattern", () => {
  it("configures actual client sorting/pagination and keeps zero values", async () => {
    const user = userEvent.setup();
    render(<DataTablePattern data={data} columns={columns} getRowId={getRowId} emptyContent="没有条目" pagination={{}} defaultState={{ pagination: { page: 2, pageSize: 1 } }} />);
    expect(screen.getByRole("rowheader", { name: "Beta" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "0" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /数量/ }));
    expect(screen.getByRole("columnheader", { name: /数量/ })).toHaveAttribute("aria-sort", "ascending");
    expect(screen.getByRole("button", { name: "第 1 页" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("rowheader", { name: "Beta" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "下一页" }));
    expect(screen.getByRole("rowheader", { name: "Gamma" })).toBeInTheDocument();
  });

  it("does not sort or slice server rows and reports new sort with first page atomically", async () => {
    const user = userEvent.setup();
    const changed = vi.fn();
    render(<DataTablePattern mode="server" data={data} columns={columns} getRowId={getRowId} emptyContent="没有条目" pagination={{ totalCount: 30 }} defaultState={{ pagination: { page: 3, pageSize: 1 } }} onStateChange={changed} />);
    await user.click(screen.getByRole("button", { name: /数量/ }));
    expect(changed).toHaveBeenCalledTimes(1);
    expect(changed.mock.calls[0]![0]).toMatchObject({ sorting: [{ id: "count", desc: false }], pagination: { page: 1, pageSize: 1 } });
    expect(changed.mock.calls[0]![1]).toEqual({ reason: "sorting" });
    expect(within(screen.getByRole("table")).getAllByRole("rowheader").map(row => row.textContent)).toEqual(["Alpha", "Beta", "Gamma"]);
  });

  it("selects only the current server page and preserves complete cross-page IDs", async () => {
    const user = userEvent.setup();
    function Fixture() {
      const [state, setState] = React.useState<DataTablePatternState>({ sorting: [], pagination: { page: 1, pageSize: 1 }, rowSelection: {}, activeRowId: null });
      return <><DataTablePattern mode="server" data={[data[state.pagination.page - 1]!]} columns={columns} getRowId={getRowId} emptyContent="没有条目" state={state} onStateChange={setState} selection={selection} pagination={{ totalCount: 3 }} /><output data-testid="selection">{Object.keys(state.rowSelection).filter(id => state.rowSelection[id]).join(",")}</output></>;
    }
    render(<Fixture />);
    await user.click(screen.getByRole("checkbox", { name: "选择当页（仅本页）" }));
    await user.click(screen.getByRole("button", { name: "下一页" }));
    expect(screen.getByRole("checkbox", { name: "选择当页（仅本页）" })).toHaveAttribute("aria-checked", "false");
    await user.click(screen.getByRole("checkbox", { name: "选择当页（仅本页）" }));
    expect(screen.getByTestId("selection")).toHaveTextContent(/^a,b$/);
    await user.click(screen.getByRole("checkbox", { name: "选择当页（仅本页）" }));
    expect(screen.getByTestId("selection")).toHaveTextContent(/^a$/);
    await user.click(screen.getByRole("button", { name: "上一页" }));
    expect(screen.getByRole("checkbox", { name: "选择 Alpha" })).toHaveAttribute("aria-checked", "true");
  });

  it("keeps activation keyboard-accessible and independent from selection", async () => {
    const user = userEvent.setup();
    const activated = vi.fn();
    const changed = vi.fn();
    render(<DataTablePattern data={data} columns={columns} getRowId={getRowId} emptyContent="没有条目" selection={selection} activeRow={{ columnId: "label", onActivate: activated }} onStateChange={changed} />);
    const activate = screen.getByRole("button", { name: "Beta" });
    activate.focus();
    await user.keyboard("{Enter}");
    expect(activated).toHaveBeenCalledExactlyOnceWith(data[1]);
    expect(activate).toHaveAttribute("aria-current", "true");
    expect(activate).toHaveFocus();
    expect(activate.closest("tr")).toHaveAttribute("data-active", "true");
    expect(screen.getByRole("checkbox", { name: "选择 Beta" })).toHaveAttribute("aria-checked", "false");
    expect(changed.mock.calls[0]![0]).toMatchObject({ activeRowId: "b", rowSelection: {} });
  });

  it("preserves checkbox focus with controlled inline configuration", async () => {
    const user = userEvent.setup();
    function Fixture() {
      const [state, setState] = React.useState<DataTablePatternState>({ sorting: [], pagination: { page: 1, pageSize: 10 }, rowSelection: {}, activeRowId: null });
      return <DataTablePattern data={data} columns={[...columns]} getRowId={getRowId} emptyContent="没有条目" state={state} onStateChange={setState} selection={{ ...selection }} activeRow={{ columnId: "label" }} />;
    }
    render(<Fixture />);
    const checkbox = screen.getByRole("checkbox", { name: "选择 Alpha" });
    checkbox.focus();
    await user.keyboard(" ");
    expect(checkbox).toHaveAttribute("aria-checked", "true");
    expect(checkbox).toHaveFocus();
  });

  it("excludes unavailable rows from page selection and retains busy/empty facts", async () => {
    const user = userEvent.setup();
    const changed = vi.fn();
    const { rerender } = render(<DataTablePattern data={data} columns={columns} getRowId={getRowId} emptyContent="结果未知" busy selection={{ ...selection, canSelect: row => row.id !== "b" }} onStateChange={changed} />);
    await user.click(screen.getByRole("checkbox", { name: "选择当页（仅本页）" }));
    expect(changed.mock.calls[0]![0].rowSelection).toEqual({ a: true, c: true });
    expect(screen.getByRole("table")).toHaveAttribute("aria-busy", "true");
    rerender(<DataTablePattern data={[]} columns={columns} getRowId={getRowId} emptyContent="结果未知" selection={selection} />);
    expect(screen.getByRole("cell", { name: "结果未知" })).toHaveAttribute("colspan", "3");
    expect(screen.getByRole("checkbox", { name: "选择当页（仅本页）" })).toHaveAttribute("aria-disabled", "true");
  });

  it("requires server paging facts instead of inferring a next page from loaded rows", () => {
    expect(() => render(<DataTablePattern mode="server" data={data} columns={columns} getRowId={getRowId} emptyContent="没有条目" pagination={{}} />)).toThrow("requires totalCount");
    expect(() => render(<DataTablePattern mode="server" data={data} columns={columns} getRowId={getRowId} emptyContent="没有条目" pagination={{ totalCount: null }} />)).toThrow("explicit hasNextPage");
  });

  it("corrects a controlled server page once when totals fall, retaining the supplied working rows", () => {
    const changed = vi.fn();
    const state: DataTablePatternState = { sorting: [], pagination: { page: 3, pageSize: 10 }, rowSelection: { outside: true }, activeRowId: null };
    const { rerender } = render(<DataTablePattern mode="server" data={data} columns={columns} getRowId={getRowId} emptyContent="没有条目" state={state} onStateChange={changed} pagination={{ totalCount: 21 }} />);
    rerender(<DataTablePattern mode="server" data={data} columns={columns} getRowId={getRowId} emptyContent="没有条目" state={state} onStateChange={changed} pagination={{ totalCount: 10 }} busy />);
    expect(changed).toHaveBeenCalledExactlyOnceWith({ ...state, pagination: { page: 1, pageSize: 10 } }, { reason: "pagination" });
    rerender(<DataTablePattern mode="server" data={data} columns={columns} getRowId={getRowId} emptyContent="没有条目" state={state} onStateChange={changed} pagination={{ totalCount: 10 }} busy />);
    expect(changed).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("rowheader", { name: "Alpha" })).toBeInTheDocument();
    expect(screen.getByRole("table")).toHaveAttribute("aria-busy", "true");
  });

  it("forwards configured dimensions and text ellipsis without giving selection a text-column width", () => {
    const full = "需要保留的完整名称 / Complete name";
    render(<DataTablePattern data={[{ ...data[0]!, label: full }, data[1]!]} columns={[
      { ...columns[0]!, size: 180, minSize: 160, maxSize: 200, ellipsis: true },
      { ...columns[1]!, size: 80 },
    ]} getRowId={getRowId} emptyContent="没有条目" selection={selection} selectionAppearance="checkbox" defaultState={{ rowSelection: { a: true }, activeRowId: "b" }} />);
    expect(screen.getByRole("columnheader", { name: "名称" })).toHaveStyle({ width: "180px" });
    const rowheader = screen.getByRole("rowheader", { name: full });
    expect(rowheader).toHaveStyle({ width: "180px", minWidth: "160px", maxWidth: "200px" });
    expect(rowheader.querySelector("[data-slot=data-table-cell-content]")).toHaveTextContent(full);
    const marker = screen.getByRole("table").querySelector("col")!;
    expect(marker.style.width).toContain("--qy-marker-size");
    expect(marker.style.width).toContain("--qy-panel-padding");
    expect(marker.style.width).not.toBe("150px");
    expect(screen.getByRole("checkbox", { name: `选择 ${full}` })).toHaveAttribute("aria-checked", "true");
  });

  it("offers row activation without wrapping cell controls or changing the selected ID map", async () => {
    const user = userEvent.setup();
    const activated = vi.fn();
    const changed = vi.fn();
    render(<DataTablePattern data={data} columns={[...columns, { id: "action", header: "操作", accessor: row => row.id, cell: row => <button>编辑 {row.label}</button> }]} getRowId={getRowId} emptyContent="没有条目" selection={selection} selectionAppearance="checkbox" activeRow={{ trigger: "row", onActivate: activated }} onStateChange={changed} />);
    await user.click(screen.getByRole("button", { name: "编辑 Beta" }));
    await user.click(screen.getByRole("checkbox", { name: "选择 Beta" }));
    expect(activated).not.toHaveBeenCalled();
    expect(changed).toHaveBeenLastCalledWith(expect.objectContaining({ rowSelection: { b: true }, activeRowId: null }), { reason: "selection" });
    await user.click(screen.getByRole("rowheader", { name: "Beta" }));
    expect(activated).toHaveBeenCalledExactlyOnceWith(data[1]);
    const row = screen.getByRole("rowheader", { name: "Beta" }).closest("tr")!;
    expect(row).toHaveAttribute("aria-current", "true");
    expect(changed).toHaveBeenLastCalledWith(expect.objectContaining({ rowSelection: { b: true }, activeRowId: "b" }), { reason: "active-row" });
    row.focus();
    await user.keyboard("{Enter}");
    expect(activated).toHaveBeenCalledTimes(2);
    expect(screen.getByRole("checkbox", { name: "选择 Beta" })).toHaveAttribute("aria-checked", "true");
  });

  it("virtualizes the paginated model while select-all retains its complete page scope", async () => {
    const user = userEvent.setup();
    const many = Array.from({ length: 200 }, (_, index) => ({ id: `row-${index}`, label: `记录 ${index}`, count: index }));
    const changed = vi.fn();
    render(<DataTablePattern data={many} columns={columns} getRowId={getRowId} emptyContent="没有条目" selection={selection} pagination={{}} defaultState={{ pagination: { page: 1, pageSize: 20 } }} virtualization={{ height: 144, estimateRowHeight: 48, overscan: 0 }} onStateChange={changed} />);
    const table = screen.getByRole("table");
    expect(table).toHaveAttribute("aria-rowcount", "21");
    expect(table.querySelectorAll("tbody tr[data-row-id]").length).toBeLessThanOrEqual(4);
    await user.click(screen.getByRole("checkbox", { name: "选择当页（仅本页）" }));
    expect(Object.keys(changed.mock.calls.at(-1)![0].rowSelection)).toHaveLength(20);
    await user.click(screen.getByRole("button", { name: "下一页" }));
    expect(screen.getByRole("rowheader", { name: "记录 20" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "选择当页（仅本页）" })).toHaveAttribute("aria-checked", "false");
    await user.click(screen.getByRole("checkbox", { name: "选择当页（仅本页）" }));
    expect(Object.keys(changed.mock.calls.at(-1)![0].rowSelection)).toHaveLength(40);
  });

  it("keeps virtual server rows caller-owned and describes the loaded page rather than guessing global row positions", async () => {
    const user = userEvent.setup();
    render(<DataTablePattern mode="server" data={data} columns={columns} getRowId={getRowId} emptyContent="结果未知" pagination={{ totalCount: 30 }} defaultState={{ pagination: { page: 3, pageSize: 1 } }} virtualization={{ height: 500, estimateRowHeight: 48 }} busy />);
    await user.click(screen.getByRole("button", { name: /数量/ }));
    expect(within(screen.getByRole("table")).getAllByRole("rowheader").map(row => row.textContent)).toEqual(["Alpha", "Beta", "Gamma"]);
    expect(screen.getByRole("table")).toHaveAttribute("aria-rowcount", "4");
    expect(screen.getByRole("rowheader", { name: "Alpha" }).closest("tr")).toHaveAttribute("aria-rowindex", "2");
    expect(screen.getByRole("table")).toHaveAttribute("aria-busy", "true");
  });
  it("shows missing values truthfully: default dash with accessible text, custom empty, zero kept", () => {
    type Row = { id: string; a: string | null | undefined; n: number };
    const rows: Row[] = [{ id: "1", a: null, n: 0 }, { id: "2", a: "", n: 0 }, { id: "3", a: undefined, n: 0 }, { id: "4", a: "有", n: 0 }];
    render(<DataTablePattern data={rows} getRowId={row => row.id} emptyContent="空" columns={[
      { id: "a", header: "甲", accessor: row => row.a },
      { id: "b", header: "乙", accessor: row => (row.id === "4" ? "x" : row.a), empty: "不适用" },
      { id: "n", header: "数", accessor: row => row.n },
    ]} />);
    expect(screen.getAllByText("无值")).toHaveLength(3);
    for (const dash of screen.getAllByText("—")) expect(dash).toHaveAttribute("aria-hidden", "true");
    expect(screen.getAllByText("不适用")).toHaveLength(3);
    expect(screen.getAllByText("0")).toHaveLength(4);
  });

  it("pins leading columns including the selection column and rejects non-leading pins", () => {
    const { container } = render(<DataTablePattern data={data} getRowId={getRowId} emptyContent="空" selection={selection} stickyHeader columns={[{ ...columns[0]!, pinned: true }, columns[1]!]} />);
    const head = container.querySelectorAll("thead th");
    expect(head[0]).toHaveAttribute("data-pinned"); expect(head[1]).toHaveAttribute("data-pinned"); expect(head[2]).not.toHaveAttribute("data-pinned");
    expect(container.querySelector("thead")).toHaveAttribute("data-sticky", "true");
    expect(container.querySelectorAll("tbody tr:first-child > *")[0]).toHaveAttribute("data-pinned");
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<DataTablePattern data={data} getRowId={getRowId} emptyContent="空" columns={[columns[0]!, { ...columns[1]!, pinned: true }]} />)).toThrow(/contiguous/);
    error.mockRestore();
  });

  it("rejects row activation without a row-header column", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      expect(() => render(<DataTablePattern data={data} columns={[{ ...columns[1]! }]} getRowId={getRowId} emptyContent="没有条目" activeRow={{ trigger: "row" }} />)).toThrow("rowHeader");
    } finally { error.mockRestore(); }
  });
});

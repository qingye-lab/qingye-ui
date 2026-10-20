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
    await user.click(screen.getByRole("checkbox", { name: "选择当页" }));
    await user.click(screen.getByRole("button", { name: "下一页" }));
    expect(screen.getByRole("checkbox", { name: "选择当页" })).toHaveAttribute("aria-checked", "false");
    await user.click(screen.getByRole("checkbox", { name: "选择当页" }));
    expect(screen.getByTestId("selection")).toHaveTextContent(/^a,b$/);
    await user.click(screen.getByRole("checkbox", { name: "选择当页" }));
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
    await user.click(screen.getByRole("checkbox", { name: "选择当页" }));
    expect(changed.mock.calls[0]![0].rowSelection).toEqual({ a: true, c: true });
    expect(screen.getByRole("table")).toHaveAttribute("aria-busy", "true");
    rerender(<DataTablePattern data={[]} columns={columns} getRowId={getRowId} emptyContent="结果未知" selection={selection} />);
    expect(screen.getByRole("cell", { name: "结果未知" })).toHaveAttribute("colspan", "3");
    expect(screen.getByRole("checkbox", { name: "选择当页" })).toHaveAttribute("aria-disabled", "true");
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
});

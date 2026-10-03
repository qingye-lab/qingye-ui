import * as React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type RowSelectionState } from "@tanstack/react-table";
import { describe, expect, it } from "vitest";
import { DataTable, DataTableSelectAll, DataTableSelectionCell, DataTableSortButton } from "../src/components/data-table";
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
});

import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { type ColumnDef, DataTable } from "../src/components/data-table";

type Device = { id: string; name: string; price: number };

const devices: Device[] = Array.from({ length: 23 }, (_, index) => ({
  id: `d${index + 1}`,
  name: index === 4 ? "扫码枪" : `收银机 ${index + 1}`,
  price: (index * 37) % 100,
}));

const columns: ColumnDef<Device>[] = [
  { accessorKey: "name", header: "设备" },
  { accessorKey: "price", header: "价格", meta: { align: "end" } },
];

const bodyRows = () => within(screen.getAllByRole("rowgroup")[1]!).getAllByRole("row");

test("paginates, sorts from a header button and reports the page", async () => {
  const user = userEvent.setup();
  render(<DataTable columns={columns} data={devices} getRowId={(row) => row.id} />);
  expect(bodyRows()).toHaveLength(10);
  expect(screen.getByText("第 1 / 3 页，共 23 条")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "下一页" }));
  expect(screen.getByText("第 2 / 3 页，共 23 条")).toBeInTheDocument();

  const header = screen.getByRole("columnheader", { name: /价格/ });
  await user.click(within(header).getByRole("button"));
  // Numbers sort descending first; a new sort returns to the first page.
  expect(header).toHaveAttribute("aria-sort", "descending");
  expect(screen.getByText("第 1 / 3 页，共 23 条")).toBeInTheDocument();
  expect(within(bodyRows()[0]!).getAllByRole("cell")[1]).toHaveTextContent("96");
  expect(within(bodyRows()[0]!).getAllByRole("cell")[1]).toHaveClass("text-end");
});

test("searches every column and offers to clear an empty result", async () => {
  const user = userEvent.setup();
  render(<DataTable columns={columns} data={devices} />);
  await user.type(screen.getByRole("searchbox", { name: "搜索表格" }), "扫码");
  expect(bodyRows()).toHaveLength(1);
  expect(screen.getByText("第 1 / 1 页，共 1 条")).toBeInTheDocument();

  await user.type(screen.getByRole("searchbox"), "不存在");
  expect(screen.getByText("没有匹配的结果")).toBeInTheDocument();
  await user.click(within(screen.getByRole("table")).getByRole("button", { name: "清除搜索" }));
  expect(bodyRows()).toHaveLength(10);
});

test("selects rows and hands the selection to bulk actions", async () => {
  const user = userEvent.setup();
  const onRemove = vi.fn();
  render(
    <DataTable
      bulkActions={({ rows, clear }) => (
        <button
          onClick={() => {
            onRemove(rows.map((row) => row.id));
            clear();
          }}
          type="button"
        >
          移除
        </button>
      )}
      columns={columns}
      data={devices.slice(0, 3)}
      enableRowSelection={(row) => row.original.id !== "d3"}
      getRowId={(row) => row.id}
    />,
  );
  const boxes = screen.getAllByRole("checkbox", { name: "选择此行" });
  expect(boxes[2]).toHaveAttribute("aria-disabled", "true");
  await user.click(boxes[0]!);
  expect(bodyRows()[0]).toHaveAttribute("data-state", "selected");
  expect(document.querySelector("[aria-live=polite].sr-only")).toHaveTextContent("已选 1 项");

  await user.click(screen.getByRole("checkbox", { name: "选择全部行" }));
  expect(screen.getAllByText("已选 2 项").length).toBeGreaterThan(0);
  await user.click(screen.getByRole("button", { name: "移除" }));
  expect(onRemove).toHaveBeenCalledWith(["d1", "d2"]);
  expect(screen.queryByText("已选 2 项")).not.toBeInTheDocument();
});

test("renders skeleton rows while loading and uses rowCount for server pages", () => {
  const onPaginationChange = vi.fn();
  const { rerender } = render(
    <DataTable columns={columns} data={[]} loading manualPagination onPaginationChange={onPaginationChange} rowCount={87} />,
  );
  expect(screen.getByRole("table")).toHaveAttribute("aria-busy", "true");
  expect(document.querySelectorAll("[data-slot=data-table-skeleton-row]")).toHaveLength(8);
  expect(screen.getByRole("button", { name: "下一页" })).toBeDisabled();

  rerender(
    <DataTable columns={columns} data={devices.slice(0, 10)} manualPagination onPaginationChange={onPaginationChange} rowCount={87} />,
  );
  expect(screen.getByText("第 1 / 9 页，共 87 条")).toBeInTheDocument();
  act(() => screen.getByRole("button", { name: "下一页" }).click());
  expect(onPaginationChange).toHaveBeenLastCalledWith({ pageIndex: 1, pageSize: 10 });
});

test("hides columns through controlled visibility", () => {
  const { rerender } = render(<DataTable columns={columns} columnVisibility={{ price: false }} data={devices} />);
  expect(screen.queryByRole("columnheader", { name: /价格/ })).not.toBeInTheDocument();
  rerender(<DataTable columns={columns} columnVisibility={{ price: true }} data={devices} />);
  expect(screen.getByRole("columnheader", { name: /价格/ })).toBeInTheDocument();
});

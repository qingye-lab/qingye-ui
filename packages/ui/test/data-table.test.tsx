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
  // One skeleton row per row the page will hold, so the table does not jump.
  expect(document.querySelectorAll("[data-slot=data-table-skeleton-row]")).toHaveLength(10);
  expect(screen.getByRole("button", { name: "下一页" })).toBeDisabled();

  rerender(
    <DataTable columns={columns} data={devices.slice(0, 10)} manualPagination onPaginationChange={onPaginationChange} rowCount={87} />,
  );
  expect(screen.getByText("第 1 / 9 页，共 87 条")).toBeInTheDocument();
  act(() => screen.getByRole("button", { name: "下一页" }).click());
  expect(onPaginationChange).toHaveBeenLastCalledWith({ pageIndex: 1, pageSize: 10 });
});

test("external selection keeps the active query and its toolbar visible", async () => {
  const user = userEvent.setup();
  const props = { columns, data: devices, enableRowSelection: true, getRowId: (row: Device) => row.id };
  const { rerender } = render(<DataTable {...props} rowSelection={{}} />);
  const search = screen.getByRole("searchbox", { name: "搜索表格" });
  await user.type(search, "收银");
  rerender(<DataTable {...props} rowSelection={{ d1: true }} />);
  expect(screen.getByRole("searchbox", { name: "搜索表格" })).toBe(search);
  expect(search).toHaveFocus();
  expect(search).toHaveValue("收银");
  // jsdom checks the hiding hook; actual visibility and wrapping need a browser.
  expect(search.closest("[data-slot=data-table-toolbar-content]")).not.toHaveClass("invisible");
  expect(screen.getByRole("button", { name: "清除选择" })).toBeInTheDocument();
});

test("refresh keeps a row editor mounted, with its draft and focus", async () => {
  const user = userEvent.setup();
  const editableColumns: ColumnDef<Device>[] = [
    { accessorKey: "name", header: "设备", cell: ({ row }) => <input aria-label="设备备注" defaultValue={row.original.name} /> },
  ];
  const props = { columns: editableColumns, data: devices.slice(0, 1), getRowId: (row: Device) => row.id };
  const { rerender } = render(<DataTable {...props} />);
  const editor = screen.getByRole("textbox", { name: "设备备注" });
  await user.type(editor, " 待复核");
  rerender(<DataTable {...props} loading />);
  expect(screen.getByRole("table")).toHaveAttribute("aria-busy", "true");
  expect(screen.getByRole("textbox", { name: "设备备注" })).toBe(editor);
  expect(editor).toHaveValue("收银机 1 待复核");
  expect(editor).toHaveFocus();
  expect(document.querySelectorAll("[data-slot=data-table-skeleton-row]")).toHaveLength(0);
  rerender(<DataTable {...props} loading={false} />);
  expect(screen.getByRole("table")).not.toHaveAttribute("aria-busy");
  expect(screen.getByRole("textbox", { name: "设备备注" })).toBe(editor);
  expect(editor).toHaveValue("收银机 1 待复核");
  expect(editor).toHaveFocus();
});

test("hides columns through controlled visibility", () => {
  const { rerender } = render(<DataTable columns={columns} columnVisibility={{ price: false }} data={devices} />);
  expect(screen.queryByRole("columnheader", { name: /价格/ })).not.toBeInTheDocument();
  rerender(<DataTable columns={columns} columnVisibility={{ price: true }} data={devices} />);
  expect(screen.getByRole("columnheader", { name: /价格/ })).toBeInTheDocument();
});

const cellText = (row: HTMLElement, index: number) => row.querySelectorAll("td")[index]?.textContent?.trim();

test("appends a second column to the sort with Shift", async () => {
  const user = userEvent.setup();
  render(<DataTable columns={columns} data={devices} getRowId={(row) => row.id} />);
  const nameHeader = screen.getByRole("columnheader", { name: /设备/ });
  const priceHeader = screen.getByRole("columnheader", { name: /价格/ });

  await user.click(nameHeader.querySelector("button")!);
  await user.keyboard("{Shift>}");
  await user.click(priceHeader.querySelector("button")!);
  await user.keyboard("{/Shift}");

  expect(nameHeader).toHaveAttribute("aria-sort", "ascending");
  // The price column is numeric, so its own first click goes descending.
  expect(priceHeader).toHaveAttribute("aria-sort", "descending");
});

test("selects a page size and keeps selection across a sort", async () => {
  const user = userEvent.setup();
  render(<DataTable columns={columns} data={devices} enableRowSelection getRowId={(row) => row.id} />);
  expect(bodyRows()).toHaveLength(10);

  await user.click(screen.getByRole("combobox", { name: "每页行数" }));
  await user.click(await screen.findByRole("option", { name: "20" }));
  expect(bodyRows()).toHaveLength(20);
  expect(screen.getByText("第 1 / 2 页，共 23 条")).toBeInTheDocument();

  // The checked row must still be the same device after the order changes.
  // Cell 0 is the selection checkbox, so the name sits in cell 1.
  const first = bodyRows()[0]!;
  const name = cellText(first, 1);
  await user.click(within(first).getByRole("checkbox", { name: "选择此行" }));
  await user.click(screen.getByRole("columnheader", { name: /设备/ }).querySelector("button")!);

  const stillSelected = bodyRows().find((row) => cellText(row, 1) === name);
  expect(stillSelected).toHaveAttribute("data-state", "selected");
});

test("collates Chinese text by locale instead of code point", async () => {
  const user = userEvent.setup();
  // Code-point order is 上海 北京 厦门 成都 杭州 深圳 苏州;
  // zh-CN collation is pinyin: 北京 成都 杭州 厦门 上海 深圳 苏州.
  const names = ["上海云杉科技", "杭州青禾文化", "成都远山物流", "深圳明川电子", "北京拾光影业", "苏州木与石家居", "厦门潮汐咖啡"];
  const rows = names.map((name, index) => ({ id: `c${index}`, name, price: index }));
  render(<DataTable collationLocale="zh-CN" columns={columns} data={rows} getRowId={(row) => row.id} />);

  await user.click(screen.getByRole("columnheader", { name: /设备/ }).querySelector("button")!);
  expect(bodyRows().map((row) => cellText(row, 0))).toEqual([
    "北京拾光影业",
    "成都远山物流",
    "杭州青禾文化",
    "厦门潮汐咖啡",
    "上海云杉科技",
    "深圳明川电子",
    "苏州木与石家居",
  ]);
});

test("keeps numeric columns numeric and states the sort direction", async () => {
  const user = userEvent.setup();
  render(<DataTable columns={columns} data={devices} getRowId={(row) => row.id} />);
  const priceHeader = screen.getByRole("columnheader", { name: /价格/ });
  await user.click(priceHeader.querySelector("button")!);

  // Numbers must not be collated as strings ("9" > "37").
  const prices = bodyRows().map((row) => Number(cellText(row, 1)));
  expect(prices).toEqual([...prices].sort((a, b) => b - a));

  // The icon carries direction visually; the button also names it.
  expect(priceHeader).toHaveAttribute("aria-sort", "descending");
  expect(within(priceHeader).getByText("降序")).toBeInTheDocument();
  await user.click(priceHeader.querySelector("button")!);
  expect(within(priceHeader).getByText("升序")).toBeInTheDocument();
});

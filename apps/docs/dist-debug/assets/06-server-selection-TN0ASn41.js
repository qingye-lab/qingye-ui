const n=`import { Badge } from "@qingye/ui/components/badge";
import { Button } from "@qingye/ui/components/button";
import { DataTable } from "@qingye/ui/components/data-table";
import { type ColumnDef } from "@qingye/ui";
import { SendIcon } from "lucide-react";
import { useState } from "react";

export const meta = {
  title: "跨页选择与批量操作",
  description: "服务端分页时选择按行 id 保留：ids 含所有已选行，rows 只有当前页的那部分。",
};

type Order = { id: string; customer: string; amount: number; status: "待发货" | "已发货" | "已签收" };

const customers = ["上海云杉科技", "杭州青禾文化", "成都远山物流", "深圳明川电子", "北京拾光影业", "苏州木与石家居"];
const statuses = ["待发货", "已发货", "已签收"] as const;

// 64 orders the "API" hands out ten at a time.
const allOrders: Order[] = Array.from({ length: 64 }, (_, index) => ({
  id: \`SO-\${20481 - index}\`,
  customer: customers[index % customers.length]!,
  amount: 860 + ((index * 3779) % 31000),
  status: statuses[index % statuses.length]!,
}));

const columns: ColumnDef<Order>[] = [
  { accessorKey: "id", header: "订单号", cell: ({ getValue }) => <span className="font-medium numeric">{getValue<string>()}</span> },
  { accessorKey: "customer", header: "客户" },
  {
    accessorKey: "status",
    header: "状态",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "待发货" ? "warning" : "outline"}>{row.original.status}</Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: "金额",
    meta: { align: "end" },
    cell: ({ getValue }) => <span className="numeric">¥{getValue<number>().toLocaleString("zh-CN")}</span>,
  },
];

export default function Demo() {
  const [pageIndex, setPageIndex] = useState(0);
  const [shipped, setShipped] = useState<string[]>([]);
  const pageSize = 8;
  const page = allOrders.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);

  return (
    <DataTable
      bulkActions={({ ids, rows, clear }) => (
        <>
          <Button
            onClick={() => {
              // \`ids\` covers every page; \`rows\` would only cover the current one.
              setShipped((current) => [...new Set([...current, ...ids])]);
              clear();
            }}
            size="sm"
            variant="outline"
          >
            <SendIcon aria-hidden="true" />
            标记发货（{ids.length}）
          </Button>
          <span className="hidden text-muted-foreground text-xs sm:inline">本页 {rows.length} 行</span>
        </>
      )}
      className="w-full"
      columns={columns}
      data={page}
      enableRowSelection
      getRowId={(order) => order.id}
      label="订单"
      manualPagination
      onPaginationChange={(next) => setPageIndex(next.pageIndex)}
      pagination={{ pageIndex, pageSize }}
      rowCount={allOrders.length}
      searchPlaceholder="搜索订单"
      toolbar={shipped.length > 0 ? <Badge variant="success">已标记 {shipped.length} 单</Badge> : null}
    />
  );
}
`;export{n as default};

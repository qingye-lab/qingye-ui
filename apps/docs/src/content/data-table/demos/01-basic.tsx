import { Badge } from "@yanqing/ui/components/badge";
import { DataTable } from "@yanqing/ui/components/data-table";
import { type ColumnDef } from "@yanqing/ui";

export const meta = { title: "排序、搜索与分页", description: "点击表头排序，搜索覆盖所有列；金额和日期列右对齐。" };

type Order = { id: string; customer: string; city: string; status: "已付款" | "待付款" | "已退款"; amount: number; date: string };

const customers = ["上海云杉科技", "杭州青禾文化", "成都远山物流", "深圳明川电子", "北京拾光影业", "苏州木与石家居", "厦门潮汐咖啡"];
const cities = ["上海", "杭州", "成都", "深圳", "北京", "苏州", "厦门"];
const statuses = ["已付款", "已付款", "待付款", "已付款", "已退款"] as const;

const orders: Order[] = Array.from({ length: 32 }, (_, index) => ({
  id: `SO-${20481 - index}`,
  customer: customers[index % customers.length]!,
  city: cities[index % cities.length]!,
  status: statuses[index % statuses.length]!,
  amount: 860 + ((index * 3779) % 31000),
  date: `2026-09-${String(30 - (index % 28)).padStart(2, "0")}`,
}));

const tone = { 已付款: "bg-success", 待付款: "bg-warning", 已退款: "bg-muted-foreground/64" };

const columns: ColumnDef<Order>[] = [
  { accessorKey: "id", header: "订单号", cell: ({ getValue }) => <span className="font-medium numeric">{getValue<string>()}</span> },
  { accessorKey: "customer", header: "客户" },
  { accessorKey: "city", header: "城市" },
  {
    accessorKey: "status",
    header: "状态",
    cell: ({ row }) => (
      <Badge variant="outline">
        <span aria-hidden="true" className={`size-1.5 rounded-full ${tone[row.original.status]}`} />
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: "金额",
    meta: { align: "end" },
    cell: ({ getValue }) => <span className="numeric">¥{getValue<number>().toLocaleString("zh-CN")}</span>,
  },
  { accessorKey: "date", header: "下单日期", meta: { align: "end", cellClassName: "numeric text-muted-foreground" } },
];

export default function Demo() {
  return <DataTable className="w-full" columns={columns} data={orders} defaultSorting={[{ id: "date", desc: true }]} getRowId={(order) => order.id} label="订单" />;
}

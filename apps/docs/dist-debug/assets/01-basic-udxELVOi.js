const e=`import { Badge } from "@qingye/ui/components/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";

export const meta = { title: "基础用法", description: "金额列右对齐并使用等宽数字。" };

const orders = [
  { id: "SO-20481", customer: "上海云杉科技", status: "已付款", amount: 12800 },
  { id: "SO-20480", customer: "杭州青禾文化", status: "待付款", amount: 4600 },
  { id: "SO-20479", customer: "成都远山物流", status: "已付款", amount: 32150 },
  { id: "SO-20478", customer: "深圳明川电子", status: "已退款", amount: 980 },
];

const tone = { 已付款: "bg-success", 待付款: "bg-warning", 已退款: "bg-muted-foreground/64" } as const;

export default function Demo() {
  return (
    <Table>
      <TableCaption>最近 4 笔订单</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>订单号</TableHead>
          <TableHead>客户</TableHead>
          <TableHead>状态</TableHead>
          <TableHead className="text-end">金额</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium numeric">{order.id}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell>
              <Badge variant="outline">
                <span aria-hidden="true" className={\`size-1.5 rounded-full \${tone[order.status as keyof typeof tone]}\`} />
                {order.status}
              </Badge>
            </TableCell>
            <TableCell className="text-end numeric">¥{order.amount.toLocaleString("zh-CN")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
`;export{e as default};

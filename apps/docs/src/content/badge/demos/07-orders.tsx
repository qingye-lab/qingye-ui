import { Badge, Frame, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@yanqing/ui";

export const meta = { title: "组合：订单状态", description: "表格状态列统一用 outline + 圆点，颜色之外始终保留文字。" };

const orders = [
  { id: "YQ-20481", customer: "上海云杉科技", status: "已完成", amount: "¥12,800.00" },
  { id: "YQ-20480", customer: "杭州白鹭文化", status: "已发货", amount: "¥3,260.00" },
  { id: "YQ-20479", customer: "北京青柠餐饮", status: "待付款", amount: "¥980.00" },
  { id: "YQ-20478", customer: "深圳星图电子", status: "支付失败", amount: "¥15,000.00" },
  { id: "YQ-20477", customer: "成都知行教育", status: "已退款", amount: "¥4,500.00" },
];

const dot: Record<string, string> = {
  已完成: "bg-success",
  已发货: "bg-info",
  待付款: "bg-warning",
  支付失败: "bg-destructive",
  已退款: "bg-muted-foreground/64",
};

export default function Demo() {
  return (
    <Frame className="w-full">
      <Table variant="card">
        <TableHeader>
          <TableRow>
            <TableHead>客户</TableHead>
            <TableHead>状态</TableHead>
            <TableHead className="text-end">金额</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <div className="font-medium">{order.customer}</div>
                <div className="mt-1 text-muted-foreground text-xs numeric">{order.id}</div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  <span aria-hidden="true" className={`size-1.5 rounded-full ${dot[order.status]}`} />
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="text-end numeric">{order.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Frame>
  );
}

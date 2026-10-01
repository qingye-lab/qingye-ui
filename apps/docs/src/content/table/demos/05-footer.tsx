import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";

export const meta = { title: "合计行", description: "TableFooter 放汇总数据，底色与表体略有区分。" };

const items = [
  { name: "云服务器 4核8G", quantity: 3, price: 389 },
  { name: "对象存储 500GB", quantity: 1, price: 59 },
  { name: "CDN 流量包 1TB", quantity: 2, price: 126 },
];

const yuan = (value: number) => `¥${value.toLocaleString("zh-CN", { minimumFractionDigits: 2 })}`;

export default function Demo() {
  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>项目</TableHead>
          <TableHead className="text-end">数量</TableHead>
          <TableHead className="text-end">单价</TableHead>
          <TableHead className="text-end">小计</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.name}>
            <TableCell>{item.name}</TableCell>
            <TableCell className="text-end numeric">{item.quantity}</TableCell>
            <TableCell className="text-end numeric">{yuan(item.price)}</TableCell>
            <TableCell className="text-end numeric">{yuan(item.quantity * item.price)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>本月合计</TableCell>
          <TableCell className="text-end numeric">{yuan(total)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

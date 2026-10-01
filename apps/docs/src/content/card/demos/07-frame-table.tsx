import { Badge } from "@yanqing/ui/components/badge";
import { Button } from "@yanqing/ui/components/button";
import { CardFrame, CardFrameAction, CardFrameDescription, CardFrameFooter, CardFrameHeader, CardFrameTitle } from "@yanqing/ui/components/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@yanqing/ui/components/table";
import { DownloadIcon } from "lucide-react";

export const meta = {
  title: "卡片框架：表格",
  description: "CardFrame 包住 <Table variant=\"card\">，表头落在外框的浅底上，表体成为一张卡片。",
};

const invoices = [
  { id: "INV-2026-0918", date: "9月18日", status: "已支付", amount: "¥2,990.00" },
  { id: "INV-2026-0904", date: "9月4日", status: "已支付", amount: "¥1,280.00" },
  { id: "INV-2026-0827", date: "8月27日", status: "待支付", amount: "¥640.00" },
  { id: "INV-2026-0812", date: "8月12日", status: "已逾期", amount: "¥3,200.00" },
];

const dot: Record<string, string> = {
  已支付: "bg-success",
  待支付: "bg-warning",
  已逾期: "bg-destructive",
};

export default function Demo() {
  return (
    <CardFrame className="w-full">
      <CardFrameHeader>
        <CardFrameTitle>发票</CardFrameTitle>
        <CardFrameDescription>最近 30 天开具的发票</CardFrameDescription>
        <CardFrameAction>
          <Button size="sm" variant="outline">
            <DownloadIcon aria-hidden="true" />
            导出
          </Button>
        </CardFrameAction>
      </CardFrameHeader>
      <Table variant="card">
        <TableHeader>
          <TableRow>
            <TableHead>发票号</TableHead>
            <TableHead>状态</TableHead>
            <TableHead className="text-end">金额</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>
                <div className="font-medium numeric">{invoice.id}</div>
                <div className="mt-1 text-muted-foreground text-xs">{invoice.date}</div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  <span aria-hidden="true" className={`size-1.5 rounded-full ${dot[invoice.status]}`} />
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell className="text-end numeric">{invoice.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CardFrameFooter className="text-muted-foreground text-sm">共 12 张发票，显示最近 4 张。</CardFrameFooter>
    </CardFrame>
  );
}

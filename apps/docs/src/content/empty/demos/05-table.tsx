import { Button } from "@yanqing/ui/components/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@yanqing/ui/components/empty";
import { Frame } from "@yanqing/ui/components/frame";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@yanqing/ui/components/table";

export const meta = {
  title: "在表格中",
  description: "表体放一行一格，colSpan 覆盖全部列；单元格默认不换行，要加 whitespace-normal。",
};

export default function Demo() {
  return (
    <Frame className="w-full">
      <Table variant="card">
        <TableHeader>
          <TableRow>
            <TableHead>订单号</TableHead>
            <TableHead>客户</TableHead>
            <TableHead>状态</TableHead>
            <TableHead className="text-end">金额</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={4} className="whitespace-normal">
              <Empty className="gap-4 px-4 py-10 md:py-10">
                <EmptyHeader>
                  <EmptyTitle className="text-base">没有符合条件的订单</EmptyTitle>
                  <EmptyDescription>筛选条件：华东区 · 待付款 · 本月</EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button size="sm" variant="outline">清除筛选</Button>
                </EmptyContent>
              </Empty>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Frame>
  );
}

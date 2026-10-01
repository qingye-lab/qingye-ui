import { Checkbox, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@yanqing/ui";
import { useState } from "react";

export const meta = { title: "行选择", description: "选中行设置 data-state=\"selected\"；表头复选框在部分选中时显示为半选。" };

const invoices = [
  { id: "INV-0931", client: "北京拾光影业", due: "10-08", amount: 26400 },
  { id: "INV-0930", client: "苏州木与石家居", due: "10-12", amount: 8350 },
  { id: "INV-0929", client: "厦门潮汐咖啡", due: "10-15", amount: 3120 },
];

export default function Demo() {
  const [selected, setSelected] = useState<string[]>(["INV-0930"]);
  const all = selected.length === invoices.length;
  const toggle = (id: string, checked: boolean) =>
    setSelected((current) => (checked ? [...current, id] : current.filter((item) => item !== id)));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox
              aria-label="选择全部发票"
              checked={all}
              indeterminate={selected.length > 0 && !all}
              onCheckedChange={(checked) => setSelected(checked ? invoices.map((item) => item.id) : [])}
            />
          </TableHead>
          <TableHead>发票号</TableHead>
          <TableHead>客户</TableHead>
          <TableHead className="text-end">到期</TableHead>
          <TableHead className="text-end">金额</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => {
          const checked = selected.includes(invoice.id);
          return (
            <TableRow data-state={checked ? "selected" : undefined} key={invoice.id}>
              <TableCell>
                <Checkbox aria-label={`选择 ${invoice.id}`} checked={checked} onCheckedChange={(next) => toggle(invoice.id, next)} />
              </TableCell>
              <TableCell className="font-medium numeric">{invoice.id}</TableCell>
              <TableCell>{invoice.client}</TableCell>
              <TableCell className="text-end text-muted-foreground numeric">{invoice.due}</TableCell>
              <TableCell className="text-end numeric">¥{invoice.amount.toLocaleString("zh-CN")}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

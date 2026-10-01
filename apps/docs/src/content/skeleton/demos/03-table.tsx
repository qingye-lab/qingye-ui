import { Skeleton, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@yanqing/ui";

export const meta = { title: "表格行", description: "表头照常显示，只有表体用占位；数字列的占位同样靠右。" };

const widths = ["w-24", "w-32", "w-20", "w-28"];

export default function Demo() {
  return (
    <Table aria-busy="true">
      <TableHeader>
        <TableRow>
          <TableHead>设备</TableHead>
          <TableHead>门店</TableHead>
          <TableHead className="text-end">今日订单</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {widths.map((width) => (
          <TableRow key={width}>
            <TableCell>
              <Skeleton className={`h-4 ${width}`} />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-16" />
            </TableCell>
            <TableCell>
              <Skeleton className="ms-auto h-4 w-10" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

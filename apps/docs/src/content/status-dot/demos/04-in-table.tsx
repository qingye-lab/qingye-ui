import type { StatusDotStatus } from "@yanqing/ui/components/status-dot";
import { StatusDot } from "@yanqing/ui/components/status-dot";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@yanqing/ui/components/table";

export const meta = { title: "表格中的状态列", description: "状态列让圆点和文字一起扫读。", flush: true };

const devices: { name: string; store: string; status: StatusDotStatus; label: string; seen: string }[] = [
  { name: "前台收银机", store: "徐汇店", status: "online", label: "在线", seen: "刚刚" },
  { name: "后厨打印机", store: "徐汇店", status: "warning", label: "缺纸", seen: "2 分钟前" },
  { name: "自助点餐屏", store: "静安店", status: "error", label: "连接异常", seen: "16 分钟前" },
  { name: "门口客流计", store: "静安店", status: "offline", label: "离线", seen: "3 天前" },
];

export default function Demo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="ps-4">设备</TableHead>
          <TableHead>门店</TableHead>
          <TableHead>状态</TableHead>
          <TableHead className="pe-4 text-end">最后上报</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {devices.map((device) => (
          <TableRow key={device.name}>
            <TableCell className="ps-4 font-medium">{device.name}</TableCell>
            <TableCell className="text-muted-foreground">{device.store}</TableCell>
            <TableCell>
              <StatusDot status={device.status}>{device.label}</StatusDot>
            </TableCell>
            <TableCell className="pe-4 text-end text-muted-foreground numeric">{device.seen}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

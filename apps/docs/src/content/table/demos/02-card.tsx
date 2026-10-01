import { Button } from "@qingye/ui/components/button";
import { CardFrame, CardFrameAction, CardFrameDescription, CardFrameHeader, CardFrameTitle } from "@qingye/ui/components/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";
import { PlusIcon } from "lucide-react";

export const meta = { title: "卡片样式", description: "variant=\"card\" 放进 CardFrame，表头落在外框的浅底上。" };

const devices = [
  { name: "前台收银机", model: "SUNMI T2s", location: "徐汇店", uptime: "18 天" },
  { name: "后厨打印机", model: "佳博 GP-L80", location: "徐汇店", uptime: "6 天" },
  { name: "自助点餐屏", model: "SUNMI K2", location: "静安店", uptime: "42 天" },
];

export default function Demo() {
  return (
    <CardFrame className="w-full">
      <CardFrameHeader>
        <CardFrameTitle>门店设备</CardFrameTitle>
        <CardFrameDescription>3 台在线</CardFrameDescription>
        <CardFrameAction>
          <Button size="sm" variant="outline">
            <PlusIcon aria-hidden="true" />
            添加设备
          </Button>
        </CardFrameAction>
      </CardFrameHeader>
      <Table variant="card">
        <TableHeader>
          <TableRow>
            <TableHead>设备</TableHead>
            <TableHead>型号</TableHead>
            <TableHead>门店</TableHead>
            <TableHead className="text-end">持续在线</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.name}>
              <TableCell className="font-medium">{device.name}</TableCell>
              <TableCell className="text-muted-foreground">{device.model}</TableCell>
              <TableCell>{device.location}</TableCell>
              <TableCell className="text-end numeric">{device.uptime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardFrame>
  );
}

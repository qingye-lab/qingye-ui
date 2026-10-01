import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";

export const meta = { title: "表头吸顶", description: "stickyHeader 配合 render 给容器限高，表体在固定表头下滚动。", flush: true };

const cities = ["上海", "北京", "深圳", "杭州", "成都", "武汉", "南京", "西安"];
const readings = Array.from({ length: 16 }, (_, index) => ({
  id: `TH-${String(index + 101)}`,
  city: cities[index % cities.length],
  temperature: (18 + ((index * 7) % 9) + index / 10).toFixed(1),
  humidity: 42 + ((index * 11) % 37),
  time: `14:${String(59 - index * 3).padStart(2, "0")}`,
}));

export default function Demo() {
  return (
    <Table render={<div className="max-h-72 rounded-xl" />} stickyHeader>
      <TableHeader>
        <TableRow>
          <TableHead className="ps-4">传感器</TableHead>
          <TableHead>城市</TableHead>
          <TableHead className="text-end">温度 °C</TableHead>
          <TableHead className="text-end">湿度 %</TableHead>
          <TableHead className="pe-4 text-end">上报时间</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {readings.map((reading) => (
          <TableRow key={reading.id}>
            <TableCell className="ps-4 font-medium numeric">{reading.id}</TableCell>
            <TableCell>{reading.city}</TableCell>
            <TableCell className="text-end numeric">{reading.temperature}</TableCell>
            <TableCell className="text-end numeric">{reading.humidity}</TableCell>
            <TableCell className="pe-4 text-end text-muted-foreground numeric">{reading.time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

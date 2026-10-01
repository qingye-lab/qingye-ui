import { Badge } from "@yanqing/ui";

export const meta = {
  title: "状态圆点",
  description: "outline 加一个彩色圆点，比整块底色更克制，适合表格和设备列表。",
};

export default function Demo() {
  return (
    <>
      <Badge variant="outline">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-success" />
        运行中
      </Badge>
      <Badge variant="outline">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-warning" />
        维护中
      </Badge>
      <Badge variant="outline">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-destructive" />
        故障
      </Badge>
      <Badge variant="outline">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-muted-foreground/64" />
        已停止
      </Badge>
    </>
  );
}

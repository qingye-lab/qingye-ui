import { Button } from "@yanqing/ui/components/button";
import { ChevronRightIcon } from "lucide-react";

export const meta = {
  title: "组合：卡片式按钮",
  description: "整块可点击的选项，悬停时箭头轻移提示去向。",
};

export default function Demo() {
  return (
    <div className="grid w-full max-w-md gap-2">
      {[
        { name: "华东一区 · 杭州", detail: "12 台设备在线，1 台告警" },
        { name: "华南二区 · 深圳", detail: "8 台设备在线" },
      ].map((region) => (
        <Button className="h-auto! justify-between gap-4 px-4 py-3 text-start" key={region.name} variant="outline">
          <span className="flex flex-col gap-0.5">
            <span>{region.name}</span>
            <span className="whitespace-normal font-normal text-muted-foreground">{region.detail}</span>
          </span>
          <ChevronRightIcon
            aria-hidden="true"
            className="transition-transform duration-(--qy-duration-fast) in-[[data-slot=button]:hover]:translate-x-0.5"
          />
        </Button>
      ))}
    </div>
  );
}

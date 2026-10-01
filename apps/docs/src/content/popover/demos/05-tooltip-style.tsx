import { Button } from "@qingye/ui/components/button";
import { Popover, PopoverPopup, PopoverTrigger } from "@qingye/ui/components/popover";
import { InfoIcon } from "lucide-react";

export const meta = {
  title: "点击说明",
  description: "tooltipStyle 使用提示的紧凑样式。触屏没有悬停，需要让用户点开的说明用它代替 Tooltip。",
};

export default function Demo() {
  return (
    <p className="flex items-center gap-1 text-sm">
      <span className="numeric font-medium">设备在线率 96.4%</span>
      <Popover>
        <PopoverTrigger render={<Button aria-label="指标说明" size="icon-xs" variant="ghost" />}>
          <InfoIcon />
        </PopoverTrigger>
        <PopoverPopup className="max-w-60" side="top" tooltipStyle>
          过去 24 小时内至少上报过一次心跳的设备占比。
        </PopoverPopup>
      </Popover>
    </p>
  );
}

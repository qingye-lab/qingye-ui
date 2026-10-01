import { Button } from "@qingye/ui/components/button";
import { Popover, PopoverClose, PopoverDescription, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye/ui/components/popover";
import { BellIcon, XIcon } from "lucide-react";

export const meta = { title: "带关闭按钮", description: "PopoverClose 可放在任意位置，图标按钮需要 aria-label。" };

export default function Demo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button aria-label="通知" size="icon" variant="outline" />}>
        <BellIcon />
      </PopoverTrigger>
      <PopoverPopup className="w-72">
        <PopoverClose aria-label="关闭" className="absolute end-2 top-2" render={<Button size="icon-sm" variant="ghost" />}>
          <XIcon />
        </PopoverClose>
        <div className="mb-3 grid gap-1.5 pe-6">
          <PopoverTitle className="text-base">没有新通知</PopoverTitle>
          <PopoverDescription>今天的 12 条告警都已处理完毕。</PopoverDescription>
        </div>
        <PopoverClose render={<Button size="sm" variant="outline" />}>查看历史</PopoverClose>
      </PopoverPopup>
    </Popover>
  );
}

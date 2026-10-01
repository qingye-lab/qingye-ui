import { Button } from "@yanqing/ui/components/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@yanqing/ui/components/tooltip";
import { CopyIcon, DownloadIcon, PencilIcon, Trash2Icon } from "lucide-react";

export const meta = {
  title: "图标按钮",
  description: "第一次悬停按默认延迟出现；在相邻按钮间移动时立即切换，不再等待。",
};

const actions = [
  { label: "编辑", icon: PencilIcon },
  { label: "复制", icon: CopyIcon },
  { label: "下载", icon: DownloadIcon },
  { label: "删除", icon: Trash2Icon },
];

export default function Demo() {
  return (
    <div className="flex gap-1">
      {actions.map(({ label, icon: Icon }) => (
        <Tooltip key={label}>
          <TooltipTrigger render={<Button aria-label={label} size="icon" variant="ghost" />}>
            <Icon />
          </TooltipTrigger>
          <TooltipPopup>{label}</TooltipPopup>
        </Tooltip>
      ))}
    </div>
  );
}

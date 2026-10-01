import { Toggle } from "@yanqing/ui/components/toggle";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

export const meta = { title: "默认", description: "按下后保持浅色填充，再次点击恢复。" };

export default function Demo() {
  return (
    <div className="flex items-center gap-1">
      <Toggle aria-label="加粗" defaultPressed>
        <BoldIcon />
      </Toggle>
      <Toggle aria-label="斜体">
        <ItalicIcon />
      </Toggle>
      <Toggle aria-label="下划线">
        <UnderlineIcon />
      </Toggle>
    </div>
  );
}

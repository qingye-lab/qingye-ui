import { ToggleGroup, ToggleGroupItem, ToggleGroupSeparator } from "@qingye/ui/components/toggle-group";
import { AlignEndHorizontalIcon, AlignStartHorizontalIcon, AlignCenterHorizontalIcon } from "lucide-react";

export const meta = { title: "纵向", description: "orientation=\"vertical\" 时用 ↑ ↓ 移动焦点。" };

export default function Demo() {
  return (
    <ToggleGroup defaultValue={["top"]} orientation="vertical" variant="outline">
      <ToggleGroupItem aria-label="顶部对齐" value="top">
        <AlignStartHorizontalIcon />
      </ToggleGroupItem>
      <ToggleGroupSeparator orientation="horizontal" />
      <ToggleGroupItem aria-label="垂直居中" value="middle">
        <AlignCenterHorizontalIcon />
      </ToggleGroupItem>
      <ToggleGroupSeparator orientation="horizontal" />
      <ToggleGroupItem aria-label="底部对齐" value="bottom">
        <AlignEndHorizontalIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

import { Toggle } from "@qingye/ui/components/toggle";
import { ToggleGroup, ToggleGroupItem } from "@qingye/ui/components/toggle-group";
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from "@qingye/ui/components/toolbar";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

export const meta = {
  title: "格式栏",
  description: "Tab 进入后用方向键在按钮之间移动。",
};

export default function Demo() {
  return (
    <Toolbar aria-label="正文格式">
      <ToolbarGroup aria-label="字形">
        <ToolbarButton aria-label="加粗" render={<Toggle defaultPressed />}>
          <BoldIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="斜体" render={<Toggle />}>
          <ItalicIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="下划线" render={<Toggle />}>
          <UnderlineIcon />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToggleGroup aria-label="对齐方式" defaultValue={["left"]}>
        <ToolbarButton aria-label="左对齐" render={<ToggleGroupItem value="left" />}>
          <AlignLeftIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="居中" render={<ToggleGroupItem value="center" />}>
          <AlignCenterIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="右对齐" render={<ToggleGroupItem value="right" />}>
          <AlignRightIcon />
        </ToolbarButton>
      </ToggleGroup>
    </Toolbar>
  );
}

import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarLink, ToolbarSeparator } from "@qingye_lab/ui/components/toolbar";

export default function Cover() {
  return <Toolbar aria-label="文本操作">
    <ToolbarGroup aria-label="格式"><ToolbarButton aria-pressed>加粗</ToolbarButton><ToolbarButton>恢复</ToolbarButton></ToolbarGroup>
    <ToolbarSeparator />
    <ToolbarLink href="#typography">文字</ToolbarLink>
  </Toolbar>;
}

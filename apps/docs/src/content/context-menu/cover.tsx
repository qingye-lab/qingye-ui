import { ContextMenu, ContextMenuItem, ContextMenuPopup, ContextMenuPortal, ContextMenuPositioner, ContextMenuTrigger } from "@qingye_lab/ui/components/context-menu";

export default function Cover() {
  return <ContextMenu>
    <ContextMenuTrigger className="w-full border border-border p-(--qy-panel-padding-sm)">接入设备</ContextMenuTrigger>
    <ContextMenuPortal><ContextMenuPositioner><ContextMenuPopup><ContextMenuItem>标记</ContextMenuItem></ContextMenuPopup></ContextMenuPositioner></ContextMenuPortal>
  </ContextMenu>;
}

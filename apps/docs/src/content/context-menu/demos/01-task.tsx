import * as React from "react";
import { ContextMenu, ContextMenuTrigger, ContextMenuPortal, ContextMenuPositioner, ContextMenuPopup, ContextMenuItem } from "@qingye_lab/ui/components/context-menu";
import { Menu, MenuTrigger, MenuPortal, MenuPositioner, MenuPopup, MenuItem } from "@qingye_lab/ui/components/menu";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "可见入口与右键", titleEn: "Visible and context triggers" } satisfies DemoMeta;
export default function Demo() {
  const [marked, setMarked] = React.useState(false); const label = marked ? "取消标记" : "标记"; const action = () => setMarked(value => !value);
  return <Stack><Inline><ContextMenu><ContextMenuTrigger className="p-(--qy-panel-padding-sm) border border-border">接入设备 · {marked ? "已标记" : "未标记"}</ContextMenuTrigger><ContextMenuPortal><ContextMenuPositioner><ContextMenuPopup><ContextMenuItem onClick={action}>{label}</ContextMenuItem></ContextMenuPopup></ContextMenuPositioner></ContextMenuPortal></ContextMenu><Menu><MenuTrigger>接入设备操作</MenuTrigger><MenuPortal><MenuPositioner><MenuPopup><MenuItem onClick={action}>{label}</MenuItem></MenuPopup></MenuPositioner></MenuPortal></Menu></Inline></Stack>;
}

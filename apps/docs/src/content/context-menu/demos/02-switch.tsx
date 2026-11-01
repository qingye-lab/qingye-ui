import * as React from "react";
import { ContextMenu, ContextMenuTrigger, ContextMenuPortal, ContextMenuPositioner, ContextMenuPopup, ContextMenuSwitchItem } from "@qingye_lab/ui/components/context-menu";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "开关式勾选项", titleEn: "Switch-style checked item" } satisfies DemoMeta;
export default function Demo() {
  const [muted, setMuted] = React.useState(false);
  return <ContextMenu><ContextMenuTrigger className="p-(--qy-panel-padding-sm) border border-border">接入设备 · {muted ? "已静音" : "未静音"}</ContextMenuTrigger><ContextMenuPortal><ContextMenuPositioner><ContextMenuPopup>
    <ContextMenuSwitchItem checked={muted} onCheckedChange={setMuted} closeOnClick={false}>静音</ContextMenuSwitchItem>
  </ContextMenuPopup></ContextMenuPositioner></ContextMenuPortal></ContextMenu>;
}

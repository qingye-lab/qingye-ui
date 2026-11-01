import * as React from "react";
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuSeparator, MenuSwitchItem, MenuTrigger } from "@qingye_lab/ui/components/menu";
import { Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "开关式勾选项", titleEn: "Switch-style checked items" } satisfies DemoMeta;
export default function Demo() {
  const [muted, setMuted] = React.useState(false); const [pinned, setPinned] = React.useState(true);
  return <Stack><Menu><MenuTrigger>通知设置</MenuTrigger><MenuPortal><MenuPositioner><MenuPopup>
    <MenuSwitchItem checked={muted} onCheckedChange={setMuted} closeOnClick={false}>静音</MenuSwitchItem>
    <MenuSwitchItem checked={pinned} onCheckedChange={setPinned} closeOnClick={false}>置顶</MenuSwitchItem>
    <MenuSwitchItem disabled>同步到其他设备</MenuSwitchItem>
    <MenuSeparator />
    <MenuItem>全部标为已读</MenuItem>
  </MenuPopup></MenuPositioner></MenuPortal></Menu>
  <p className="m-0 text-body">静音：{muted ? "开" : "关"} · 置顶：{pinned ? "开" : "关"}</p></Stack>;
}

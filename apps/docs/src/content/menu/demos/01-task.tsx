import * as React from "react";
import { Menu, MenuTrigger, MenuPortal, MenuPositioner, MenuPopup, MenuItem, MenuCheckboxItem, MenuSeparator } from "@qingye_lab/ui/components/menu";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "命令菜单", titleEn: "Command menu" } satisfies DemoMeta;
export default function Demo() {
  const [marked, setMarked] = React.useState(false);
  return <Menu><MenuTrigger>操作</MenuTrigger><MenuPortal><MenuPositioner><MenuPopup>
    <MenuItem>重命名</MenuItem><MenuItem>复制</MenuItem>
    <MenuSeparator />
    <MenuCheckboxItem checked={marked} onCheckedChange={setMarked}>标记</MenuCheckboxItem>
  </MenuPopup></MenuPositioner></MenuPortal></Menu>;
}

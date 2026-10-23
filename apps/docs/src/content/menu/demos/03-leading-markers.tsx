import { Menu, MenuCheckboxItem, MenuGroup, MenuGroupLabel, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuRadioGroup, MenuRadioItem, MenuSeparator, MenuTrigger } from "@qingye_lab/ui/components/menu";
import { IconListCheck } from "@tabler/icons-react";

export const meta = { title: "前导标记与紧凑命令", titleEn: "Leading marks and compact commands" };
export default function Demo() {
  return <Menu><MenuTrigger>显示选项</MenuTrigger><MenuPortal><MenuPositioner><MenuPopup>
    <MenuGroup><MenuGroupLabel size="sm" inset>内容</MenuGroupLabel>
      <MenuItem size="sm"><IconListCheck aria-hidden="true" /><span>检查显示</span></MenuItem>
      <MenuCheckboxItem size="sm" markerPosition="start" defaultChecked closeOnClick={false}>显示说明</MenuCheckboxItem>
      <MenuCheckboxItem size="sm" markerPosition="start" closeOnClick={false}>显示编号</MenuCheckboxItem>
      <MenuItem size="sm" inset>重置显示</MenuItem>
    </MenuGroup><MenuSeparator />
    <MenuRadioGroup defaultValue="current"><MenuRadioItem size="sm" value="current" markerPosition="start" closeOnClick={false}>当前范围</MenuRadioItem><MenuRadioItem size="sm" value="all" markerPosition="start" closeOnClick={false}>全部范围</MenuRadioItem></MenuRadioGroup>
  </MenuPopup></MenuPositioner></MenuPortal></Menu>;
}

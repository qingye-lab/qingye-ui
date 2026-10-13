import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger } from "@qingye_lab/ui/components/menu";

export default function Cover() {
  return <Menu><MenuTrigger>操作</MenuTrigger><MenuPortal><MenuPositioner><MenuPopup><MenuItem>移到首位</MenuItem><MenuItem>标记</MenuItem></MenuPopup></MenuPositioner></MenuPortal></Menu>;
}

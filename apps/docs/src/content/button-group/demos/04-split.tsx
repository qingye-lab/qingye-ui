import { IconChevronDown } from "@tabler/icons-react";
import { Button } from "@qingye_lab/ui/components/button";
import { ButtonGroup } from "@qingye_lab/ui/components/button-group";
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger } from "@qingye_lab/ui/components/menu";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "拆分按钮", titleEn: "Split button" } satisfies DemoMeta;
export default function Demo() {
  return <ButtonGroup aria-label="发布" attached>
    <Button variant="bordered">发布</Button>
    <Menu><MenuTrigger render={<Button variant="bordered" shape="icon" aria-label="更多发布方式" />}><IconChevronDown aria-hidden="true" /></MenuTrigger><MenuPortal><MenuPositioner align="end"><MenuPopup>
      <MenuItem>定时发布</MenuItem><MenuItem>存为草稿</MenuItem>
    </MenuPopup></MenuPositioner></MenuPortal></Menu>
  </ButtonGroup>;
}

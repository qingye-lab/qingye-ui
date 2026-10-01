import { Button } from "@yanqing/ui/components/button";
import { Kbd, KbdGroup } from "@yanqing/ui/components/kbd";
import { Menu, MenuItem, MenuPopup, MenuSeparator, MenuTrigger } from "@yanqing/ui/components/menu";
import { ChevronDownIcon } from "lucide-react";

export const meta = { title: "在菜单中", description: "菜单项末端标出对应快捷键。" };

export default function Demo() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>
        编辑
        <ChevronDownIcon aria-hidden="true" />
      </MenuTrigger>
      <MenuPopup align="start" className="min-w-48">
        <MenuItem>
          撤销
          <KbdGroup className="ms-auto">
            <Kbd>⌘</Kbd>
            <Kbd>Z</Kbd>
          </KbdGroup>
        </MenuItem>
        <MenuItem>
          重做
          <KbdGroup className="ms-auto">
            <Kbd>⌘</Kbd>
            <Kbd>⇧</Kbd>
            <Kbd>Z</Kbd>
          </KbdGroup>
        </MenuItem>
        <MenuSeparator />
        <MenuItem>
          查找
          <KbdGroup className="ms-auto">
            <Kbd>⌘</Kbd>
            <Kbd>F</Kbd>
          </KbdGroup>
        </MenuItem>
      </MenuPopup>
    </Menu>
  );
}

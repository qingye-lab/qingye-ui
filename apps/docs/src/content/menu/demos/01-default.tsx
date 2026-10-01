import { Button } from "@qingye/ui/components/button";
import { Menu, MenuItem, MenuPopup, MenuSeparator, MenuShortcut, MenuTrigger } from "@qingye/ui/components/menu";
import { ArchiveIcon, CopyIcon, EllipsisIcon, PencilIcon, Share2Icon, Trash2Icon } from "lucide-react";

export const meta = {
  title: "基础用法",
  description: "图标、快捷键、禁用项和危险操作。危险操作放在最后并用分隔线隔开。",
};

export default function Demo() {
  return (
    <Menu>
      <MenuTrigger render={<Button aria-label="工单操作" size="icon" variant="outline" />}>
        <EllipsisIcon />
      </MenuTrigger>
      <MenuPopup align="start" className="w-48">
        <MenuItem>
          <PencilIcon />
          编辑
          <MenuShortcut>⌘E</MenuShortcut>
        </MenuItem>
        <MenuItem>
          <CopyIcon />
          创建副本
          <MenuShortcut>⌘D</MenuShortcut>
        </MenuItem>
        <MenuItem disabled>
          <Share2Icon />
          转交他人
        </MenuItem>
        <MenuItem>
          <ArchiveIcon />
          归档
        </MenuItem>
        <MenuSeparator />
        <MenuItem variant="destructive">
          <Trash2Icon />
          删除
          <MenuShortcut>⌫</MenuShortcut>
        </MenuItem>
      </MenuPopup>
    </Menu>
  );
}

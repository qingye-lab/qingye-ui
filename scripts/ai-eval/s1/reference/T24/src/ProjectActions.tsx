import { Button } from "@qingye_lab/ui/components/button";
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger } from "@qingye_lab/ui/components/menu";

export type ProjectActionsProps = {
  archived: boolean;
  onRename: () => void;
  onTransfer: () => void;
  onCopyLink: () => void;
};

// 指南 menu.md：禁用不等于隐藏；原语可让禁用项聚焦，但禁止执行
export function ProjectActions({ archived, onRename, onTransfer, onCopyLink }: ProjectActionsProps) {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="bordered" />}>项目操作</MenuTrigger>
      <MenuPortal>
        <MenuPositioner>
          <MenuPopup>
            <MenuItem disabled={archived} onClick={onRename}>重命名</MenuItem>
            <MenuItem disabled={archived} onClick={onTransfer}>转交负责人</MenuItem>
            <MenuItem onClick={onCopyLink}>复制链接</MenuItem>
          </MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </Menu>
  );
}

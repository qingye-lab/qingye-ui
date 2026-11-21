import { Button } from "@qingye_lab/ui/components/button";
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger } from "@qingye_lab/ui/components/menu";

export type ProjectActionsProps = {
  archived: boolean;
  onRename: () => void;
  onTransfer: () => void;
  onCopyLink: () => void;
};

// 错解：已归档时不渲染这两项
export function ProjectActions({ archived, onRename, onTransfer, onCopyLink }: ProjectActionsProps) {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="bordered" />}>项目操作</MenuTrigger>
      <MenuPortal>
        <MenuPositioner>
          <MenuPopup>
            {!archived && <MenuItem onClick={onRename}>重命名</MenuItem>}
            {!archived && <MenuItem onClick={onTransfer}>转交负责人</MenuItem>}
            <MenuItem onClick={onCopyLink}>复制链接</MenuItem>
          </MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </Menu>
  );
}

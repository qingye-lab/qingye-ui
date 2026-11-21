import { Button } from "@qingye_lab/ui/components/button";
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger } from "@qingye_lab/ui/components/menu";

export type ProjectActionsProps = {
  archived: boolean;
  onRename: () => void;
  onTransfer: () => void;
  onCopyLink: () => void;
};

// 错解：两项照常可点，已归档时点击什么也不做，没有禁用状态
export function ProjectActions({ archived, onRename, onTransfer, onCopyLink }: ProjectActionsProps) {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="bordered" />}>项目操作</MenuTrigger>
      <MenuPortal>
        <MenuPositioner>
          <MenuPopup>
            <MenuItem onClick={() => { if (!archived) onRename(); }}>重命名</MenuItem>
            <MenuItem onClick={() => { if (!archived) onTransfer(); }}>转交负责人</MenuItem>
            <MenuItem onClick={onCopyLink}>复制链接</MenuItem>
          </MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </Menu>
  );
}

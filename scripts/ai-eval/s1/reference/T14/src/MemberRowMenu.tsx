import { Button } from "@qingye_lab/ui/components/button";
import { Menu, MenuItem, MenuLinkItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger } from "@qingye_lab/ui/components/menu";

export type MemberRowMenuProps = {
  memberId: string;
  onDeactivate: () => void;
};

// 指南 menu.md：Menu 执行动作，LinkItem 导航
export function MemberRowMenu({ memberId, onDeactivate }: MemberRowMenuProps) {
  return (
    <Menu>
      <MenuTrigger render={<Button aria-label="更多操作" shape="icon" variant="quiet" />}><span aria-hidden="true">⋯</span></MenuTrigger>
      <MenuPortal>
        <MenuPositioner>
          <MenuPopup>
            <MenuLinkItem href={`/members/${memberId}`}>查看资料</MenuLinkItem>
            <MenuItem onClick={onDeactivate}>停用</MenuItem>
          </MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </Menu>
  );
}

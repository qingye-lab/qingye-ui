import { Button } from "@qingye_lab/ui/components/button";
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger } from "@qingye_lab/ui/components/menu";

export type MemberRowMenuProps = {
  memberId: string;
  onDeactivate: () => void;
};

// DN 自然解：导航也用 MenuItem + onClick
export function MemberRowMenu({ memberId, onDeactivate }: MemberRowMenuProps) {
  return (
    <Menu>
      <MenuTrigger render={<Button aria-label="更多操作" shape="icon" variant="quiet" />}><span aria-hidden="true">⋯</span></MenuTrigger>
      <MenuPortal>
        <MenuPositioner>
          <MenuPopup>
            <MenuItem onClick={() => { window.location.assign(`/members/${memberId}`); }}>查看资料</MenuItem>
            <MenuItem onClick={onDeactivate}>停用</MenuItem>
          </MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </Menu>
  );
}

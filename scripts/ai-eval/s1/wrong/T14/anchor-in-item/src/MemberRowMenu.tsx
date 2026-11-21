import { Button } from "@qingye_lab/ui/components/button";
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger } from "@qingye_lab/ui/components/menu";

export type MemberRowMenuProps = {
  memberId: string;
  onDeactivate: () => void;
};

// 把 <a> 嵌进 MenuItem：菜单项本身仍是动作项（div），链接被套在里面
export function MemberRowMenu({ memberId, onDeactivate }: MemberRowMenuProps) {
  return (
    <Menu>
      <MenuTrigger render={<Button aria-label="更多操作" shape="icon" variant="quiet" />}><span aria-hidden="true">⋯</span></MenuTrigger>
      <MenuPortal>
        <MenuPositioner>
          <MenuPopup>
            <MenuItem><a href={`/members/${memberId}`}>查看资料</a></MenuItem>
            <MenuItem onClick={onDeactivate}>停用</MenuItem>
          </MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </Menu>
  );
}

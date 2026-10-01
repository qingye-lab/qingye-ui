const n=`import { Avatar, AvatarFallback } from "@qingye/ui/components/avatar";
import { Button } from "@qingye/ui/components/button";
import { Menu, MenuGroup, MenuGroupLabel, MenuItem, MenuPopup, MenuSeparator, MenuShortcut, MenuTrigger } from "@qingye/ui/components/menu";
import { CreditCardIcon, LogOutIcon, SettingsIcon, UserIcon, UserPlusIcon, UsersIcon } from "lucide-react";

export const meta = { title: "分组与标题", description: "用 MenuGroup 与 MenuGroupLabel 组织较长的菜单。" };

export default function Demo() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="ghost" />}>
        <Avatar size="xs">
          <AvatarFallback>林</AvatarFallback>
        </Avatar>
        林嘉禾
      </MenuTrigger>
      <MenuPopup align="start" className="w-56">
        <MenuGroup>
          <MenuGroupLabel>我的账号</MenuGroupLabel>
          <MenuItem>
            <UserIcon />
            个人资料
            <MenuShortcut>⇧⌘P</MenuShortcut>
          </MenuItem>
          <MenuItem>
            <CreditCardIcon />
            账单与发票
          </MenuItem>
          <MenuItem>
            <SettingsIcon />
            偏好设置
            <MenuShortcut>⌘,</MenuShortcut>
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuGroupLabel>团队 · 燕青科技</MenuGroupLabel>
          <MenuItem>
            <UsersIcon />
            成员管理
          </MenuItem>
          <MenuItem>
            <UserPlusIcon />
            邀请成员
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuItem>
          <LogOutIcon />
          退出登录
        </MenuItem>
      </MenuPopup>
    </Menu>
  );
}
`;export{n as default};

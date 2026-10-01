import { Button } from "@yanqing/ui/components/button";
import { Menu, MenuItem, MenuPopup, MenuSeparator, MenuSub, MenuSubPopup, MenuSubTrigger, MenuTrigger } from "@yanqing/ui/components/menu";
import { FolderInputIcon, MailIcon, MessageSquareIcon, Share2Icon } from "lucide-react";

export const meta = { title: "子菜单", description: "悬停或按 → 打开子菜单，按 ← 返回上一级。" };

export default function Demo() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>工单 #2318</MenuTrigger>
      <MenuPopup align="start" className="w-48">
        <MenuItem>标记为已解决</MenuItem>
        <MenuItem>复制工单链接</MenuItem>
        <MenuSeparator />
        <MenuSub>
          <MenuSubTrigger>
            <FolderInputIcon />
            移动到项目
          </MenuSubTrigger>
          <MenuSubPopup className="w-40">
            <MenuItem>华东仓储</MenuItem>
            <MenuItem>华南门店</MenuItem>
            <MenuSub>
              <MenuSubTrigger>更多项目</MenuSubTrigger>
              <MenuSubPopup className="w-40">
                <MenuItem>西南物流</MenuItem>
                <MenuItem>华北工厂</MenuItem>
                <MenuItem disabled>已归档项目</MenuItem>
              </MenuSubPopup>
            </MenuSub>
          </MenuSubPopup>
        </MenuSub>
        <MenuSub>
          <MenuSubTrigger>
            <Share2Icon />
            分享
          </MenuSubTrigger>
          <MenuSubPopup className="w-40">
            <MenuItem>
              <MailIcon />
              发送邮件
            </MenuItem>
            <MenuItem>
              <MessageSquareIcon />
              发到群聊
            </MenuItem>
          </MenuSubPopup>
        </MenuSub>
      </MenuPopup>
    </Menu>
  );
}

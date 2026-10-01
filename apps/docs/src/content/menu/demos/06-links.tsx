import { Button } from "@qingye/ui/components/button";
import { Menu, MenuLinkItem, MenuPopup, MenuSeparator, MenuTrigger } from "@qingye/ui/components/menu";
import { BookOpenIcon, CircleHelpIcon, ExternalLinkIcon, MegaphoneIcon } from "lucide-react";

export const meta = {
  title: "链接项",
  description: "MenuLinkItem 渲染为 <a>，保留新标签页打开、复制链接等原生行为；用 render 接入路由的 Link。",
};

export default function Demo() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>
        <CircleHelpIcon />
        帮助
      </MenuTrigger>
      <MenuPopup align="start" className="w-48">
        <MenuLinkItem href="#guide">
          <BookOpenIcon />
          使用指南
        </MenuLinkItem>
        <MenuLinkItem href="#changelog">
          <MegaphoneIcon />
          更新日志
        </MenuLinkItem>
        <MenuSeparator />
        <MenuLinkItem href="https://base-ui.com" rel="noreferrer" target="_blank">
          <ExternalLinkIcon />
          开发者文档
        </MenuLinkItem>
      </MenuPopup>
    </Menu>
  );
}

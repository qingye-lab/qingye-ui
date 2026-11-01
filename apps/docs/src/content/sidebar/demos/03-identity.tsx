import { IconLayoutSidebar, IconListTree, IconSearch } from "@tabler/icons-react";
import { Avatar, AvatarFallback } from "@qingye_lab/ui/components/avatar";
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuSeparator, MenuTrigger } from "@qingye_lab/ui/components/menu";
import { Sidebar, SidebarButton, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarLink, SidebarTitle, SidebarToggle } from "@qingye_lab/ui/components/sidebar";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "标识与账户入口", titleEn: "Identity and account entry" } satisfies DemoMeta;
export default function Demo() {
  return <Sidebar aria-label="标识与账户" className="min-h-96 w-full max-w-xs">
    <SidebarHeader>
      <span aria-hidden="true" className="grid size-(--qy-control-xs) shrink-0 place-items-center rounded-(--qy-radius-xs) bg-foreground text-support-strong text-surface">青</span>
      <SidebarTitle>青野工作区</SidebarTitle>
      <SidebarToggle />
    </SidebarHeader>
    <SidebarContent aria-label="标识与账户导航" className="mt-(--qy-field-group-gap) flex-1">
      <SidebarGroup>
        <SidebarButton icon={<IconSearch aria-hidden="true" />}>搜索</SidebarButton>
        <SidebarLink href="/components/sidebar" active icon={<IconLayoutSidebar aria-hidden="true" />}>侧栏导航</SidebarLink>
        <SidebarLink href="/components/tree" icon={<IconListTree aria-hidden="true" />}>层级集合</SidebarLink>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <Menu>
        <MenuTrigger render={<SidebarButton icon={<Avatar size="sm" label="陈致远" aria-hidden="true"><AvatarFallback>陈</AvatarFallback></Avatar>} />}>陈致远</MenuTrigger>
        <MenuPortal><MenuPositioner side="top" align="start"><MenuPopup>
          <MenuItem>账户</MenuItem>
          <MenuSeparator />
          <MenuItem>退出登录</MenuItem>
        </MenuPopup></MenuPositioner></MenuPortal>
      </Menu>
    </SidebarFooter>
  </Sidebar>;
}

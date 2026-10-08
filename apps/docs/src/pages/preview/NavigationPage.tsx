import * as React from "react";
import { Breadcrumb, BreadcrumbCurrent, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@qingye_lab/ui/components/breadcrumb";
import { Button } from "@qingye_lab/ui/components/button";
import { ContextMenu, ContextMenuItem, ContextMenuPopup, ContextMenuPortal, ContextMenuPositioner, ContextMenuTrigger } from "@qingye_lab/ui/components/context-menu";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Menu, MenuCheckboxItem, MenuGroup, MenuGroupLabel, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuRadioGroup, MenuRadioItem, MenuSeparator, MenuTrigger } from "@qingye_lab/ui/components/menu";
import { Avatar, AvatarFallback } from "@qingye_lab/ui/components/avatar";
import { CornerMark } from "@qingye_lab/ui/components/corner-mark";
import { NavigationMenu, NavigationMenuContent, NavigationMenuGroup, NavigationMenuGroupLabel, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuPopup, NavigationMenuPortal, NavigationMenuPositioner, NavigationMenuTrigger, NavigationMenuViewport } from "@qingye_lab/ui/components/navigation-menu";
import { PageHeader, PageHeaderActions, PageHeaderContent, PageHeaderDescription, PageHeaderTitle } from "@qingye_lab/ui/components/page-header";
import { Separator } from "@qingye_lab/ui/components/separator";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarLink, SidebarSub, SidebarSubContent, SidebarSubTrigger, SidebarToggle } from "@qingye_lab/ui/components/sidebar";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@qingye_lab/ui/components/tabs";
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarLink, ToolbarSeparator } from "@qingye_lab/ui/components/toolbar";
import { Text } from "@qingye_lab/ui/components/typography";
import { IconBold, IconPlugConnected, IconItalic, IconList, IconRefresh, IconFileText, IconShieldCheck, IconUnderline, IconUsers } from "@tabler/icons-react";
import { GalleryPage, Row, Section } from "./gallery";

/* 导航：路径、视角切换、站点导航、侧栏、命令菜单、右键菜单、工具条与页面标题。
 * 菜单执行命令，选择框选择值——两者不互相代替。 */

export default function NavigationPage() {
  const [view, setView] = React.useState("overview");
  const [marked, setMarked] = React.useState(false);
  const [sort, setSort] = React.useState("recent");
  const [lastCommand, setLastCommand] = React.useState("尚未执行");
  const [format, setFormat] = React.useState({ bold: false, italic: false, underline: false });

  return <GalleryPage>
    <Section title="位置与标题">
      <Row label="面包屑">
        <Breadcrumb aria-label="位置">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="#">工作区</BreadcrumbLink><BreadcrumbSeparator /></BreadcrumbItem>
            <BreadcrumbItem><BreadcrumbLink href="#">本地集合</BreadcrumbLink><BreadcrumbSeparator /></BreadcrumbItem>
            <BreadcrumbItem><BreadcrumbCurrent>接入设备</BreadcrumbCurrent></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Row>
      <Row label="页面标题" block lead="chapter">
        <PageHeader>
          <PageHeaderContent>
            <PageHeaderTitle level={3}>接入设备</PageHeaderTitle>
            <PageHeaderDescription>1,284 条记录 · 3 分钟前同步</PageHeaderDescription>
          </PageHeaderContent>
          <PageHeaderActions><Button variant="bordered">导出</Button><Button>重新同步</Button></PageHeaderActions>
        </PageHeader>
      </Row>
    </Section>

    <Separator />

    <Section title="视角切换">
      <Row label="标签页" block lead="control">
        <Tabs value={view} onValueChange={value => setView(String(value))}>
          <TabsList aria-label="集合视角">
            <TabsTab value="overview">概览</TabsTab>
            <TabsTab value="records">记录</TabsTab>
            <TabsTab value="history">历史</TabsTab>
            <TabsTab value="settings" disabled>设置</TabsTab>
          </TabsList>
          <TabsPanel value="overview"><Text className="text-muted-foreground">接入设备共 1,284 条记录，最近一次同步在 3 分钟前完成。</Text></TabsPanel>
          <TabsPanel value="records"><Text className="text-muted-foreground">按时间倒序的记录列表。</Text></TabsPanel>
          <TabsPanel value="history"><Text className="text-muted-foreground">最近 30 天的同步与修改记录。</Text></TabsPanel>
          <TabsPanel value="settings"><Text className="text-muted-foreground">需要管理员权限。</Text></TabsPanel>
        </Tabs>
      </Row>
    </Section>

    <Separator />

    <Section title="站点导航">
      <Row label="导航菜单">
        <NavigationMenu aria-label="站点导航">
          <NavigationMenuList>
            <NavigationMenuItem value="home"><NavigationMenuLink href="#" active>概览</NavigationMenuLink></NavigationMenuItem>
            <NavigationMenuItem value="collections">
              <NavigationMenuTrigger>集合</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuGroup>
                  <NavigationMenuGroupLabel>本地集合</NavigationMenuGroupLabel>
                  <NavigationMenuLink href="#devices" description="1,284 条记录 · 3 分钟前同步">接入设备</NavigationMenuLink>
                  <NavigationMenuLink href="#roles">权限与角色</NavigationMenuLink>
                  <NavigationMenuLink href="#sync" description="未同步 · 2 天前">同步与导出</NavigationMenuLink>
                </NavigationMenuGroup>
                <NavigationMenuGroup>
                  <NavigationMenuGroupLabel>工作区</NavigationMenuGroupLabel>
                  <NavigationMenuLink href="#members">成员</NavigationMenuLink>
                  <NavigationMenuLink href="#audit">审计日志</NavigationMenuLink>
                </NavigationMenuGroup>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem value="members"><NavigationMenuLink href="#members">成员</NavigationMenuLink></NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuPortal><NavigationMenuPositioner><NavigationMenuPopup><NavigationMenuViewport /></NavigationMenuPopup></NavigationMenuPositioner></NavigationMenuPortal>
        </NavigationMenu>
      </Row>
      <Row label="侧栏" block lead="inset-control">
        <Sidebar className="w-[calc(12*var(--qy-cai))] rounded-panel border border-border p-(--qy-overlay-inset)" aria-label="工作区侧栏">
          <SidebarToggle />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>本地集合</SidebarGroupLabel>
              <SidebarSub defaultOpen>
                <SidebarSubTrigger icon={<IconPlugConnected aria-hidden="true" />}>接入设备</SidebarSubTrigger>
                <SidebarSubContent>
                  <SidebarLink href="#devices" active>设备列表</SidebarLink>
                  <SidebarLink href="#devices-endpoint">接入地址</SidebarLink>
                  <SidebarLink href="#devices-sync">同步日志</SidebarLink>
                </SidebarSubContent>
              </SidebarSub>
              <SidebarLink href="#roles" icon={<IconShieldCheck aria-hidden="true" />}>权限与角色</SidebarLink>
              <SidebarLink href="#sync" icon={<IconRefresh aria-hidden="true" />}>同步与导出</SidebarLink>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>工作区</SidebarGroupLabel>
              <SidebarLink href="#members" icon={<IconUsers aria-hidden="true" />}>成员</SidebarLink>
              <SidebarLink href="#audit" icon={<IconFileText aria-hidden="true" />} count={5}>审计日志</SidebarLink>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </Row>
      <Row label="成员在线状态">
        <CornerMark dot tone="success" label="在线"><Avatar label="陈致远"><AvatarFallback>陈</AvatarFallback></Avatar></CornerMark>
      </Row>
    </Section>

    <Separator />

    <Section title="命令">
      <Row label="菜单">
        <Menu>
          <MenuTrigger>集合操作</MenuTrigger>
          <MenuPortal><MenuPositioner><MenuPopup>
            <MenuItem onClick={() => setLastCommand("重新同步")}>重新同步</MenuItem>
            <MenuItem onClick={() => setLastCommand("复制标识")}>复制标识</MenuItem>
            <MenuItem disabled>移动到…（需要权限）</MenuItem>
            <MenuSeparator />
            <MenuCheckboxItem checked={marked} onCheckedChange={setMarked}>标记为待核实</MenuCheckboxItem>
            <MenuSeparator />
            <MenuGroup>
              <MenuGroupLabel>排序</MenuGroupLabel>
              <MenuRadioGroup value={sort} onValueChange={value => setSort(String(value))}>
                <MenuRadioItem value="recent">最近同步</MenuRadioItem>
                <MenuRadioItem value="name">名称</MenuRadioItem>
                <MenuRadioItem value="records">记录数</MenuRadioItem>
              </MenuRadioGroup>
            </MenuGroup>
          </MenuPopup></MenuPositioner></MenuPortal>
        </Menu>
        <span className="text-support text-muted-foreground">上一条命令：{lastCommand} · {marked ? "已标记" : "未标记"} · 按{sort === "recent" ? "最近同步" : sort === "name" ? "名称" : "记录数"}排序</span>
      </Row>
      <Row label="右键菜单">
        <ContextMenu>
          <ContextMenuTrigger className="rounded-panel bg-neutral-soft px-(--qy-panel-padding) py-(--qy-panel-padding-sm) text-support text-muted-foreground">在这里点右键</ContextMenuTrigger>
          <ContextMenuPortal><ContextMenuPositioner><ContextMenuPopup>
            <ContextMenuItem onClick={() => setLastCommand("重新同步")}>重新同步</ContextMenuItem>
            <ContextMenuItem onClick={() => setLastCommand("复制标识")}>复制标识</ContextMenuItem>
          </ContextMenuPopup></ContextMenuPositioner></ContextMenuPortal>
        </ContextMenu>
      </Row>
      <Row label="工具条">
        <Stack gap="field">
          <Toolbar aria-label="文本格式">
            <ToolbarGroup aria-label="字形">
              <ToolbarButton shape="icon" aria-label="加粗" aria-pressed={format.bold} onClick={() => setFormat(value => ({ ...value, bold: !value.bold }))}><IconBold aria-hidden="true" /></ToolbarButton>
              <ToolbarButton shape="icon" aria-label="斜体" aria-pressed={format.italic} onClick={() => setFormat(value => ({ ...value, italic: !value.italic }))}><IconItalic aria-hidden="true" /></ToolbarButton>
              <ToolbarButton shape="icon" aria-label="下划线" aria-pressed={format.underline} onClick={() => setFormat(value => ({ ...value, underline: !value.underline }))}><IconUnderline aria-hidden="true" /></ToolbarButton>
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup aria-label="段落"><ToolbarButton shape="icon" aria-label="列表"><IconList aria-hidden="true" /></ToolbarButton></ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarLink href="#help">格式说明</ToolbarLink>
          </Toolbar>
          <Text className={[format.bold && "font-semibold", format.italic && "italic", format.underline && "underline"].filter(Boolean).join(" ")}>每台设备接入时写入一条记录。</Text>
        </Stack>
      </Row>
    </Section>
  </GalleryPage>;
}


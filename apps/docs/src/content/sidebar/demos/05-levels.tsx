import * as React from "react";
import { IconDatabase, IconSettings } from "@tabler/icons-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarLink, SidebarSub, SidebarSubContent, SidebarSubTrigger } from "@qingye_lab/ui/components/sidebar";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@qingye_lab/ui/components/tabs";
import { Workspace, WorkspaceContent, WorkspaceHeader, WorkspaceSurface, WorkspaceTitle } from "@qingye_lab/ui/components/workspace";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "二级导航与内容区 Tabs", titleEn: "Sub-level navigation with Tabs in the content", flush: true } satisfies DemoMeta;

// 侧栏到二级为止：第三级是「通知」这一页里的并列视角，放在内容区的 Tabs，不再往侧栏里缩。
export default function Demo() {
  const { code } = useUILocale(); const en = code.startsWith("en");
  const t = (zh: string, enText: string) => en ? enText : zh;
  const [page, setPage] = React.useState("notifications");
  const link = (id: string, name: string) => <SidebarLink render={<button type="button" onClick={() => setPage(id)} />} active={page === id}>{name}</SidebarLink>;
  return <div className="h-[calc(20*var(--qy-cai))]">
    <Workspace>
      <Sidebar>
        <SidebarContent aria-label="两级侧栏导航">
          <SidebarGroup>
            <SidebarLink render={<button type="button" onClick={() => setPage("collections")} />} active={page === "collections"} icon={<IconDatabase aria-hidden="true" />}>{t("集合", "Collections")}</SidebarLink>
            <SidebarSub defaultOpen>
              <SidebarSubTrigger icon={<IconSettings aria-hidden="true" />}>{t("设置", "Settings")}</SidebarSubTrigger>
              <SidebarSubContent>{link("account", t("账户", "Account"))}{link("notifications", t("通知", "Notifications"))}</SidebarSubContent>
            </SidebarSub>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <WorkspaceSurface>
        <WorkspaceHeader><WorkspaceTitle level={4}>{page === "account" ? t("账户", "Account") : page === "notifications" ? t("通知", "Notifications") : t("集合", "Collections")}</WorkspaceTitle></WorkspaceHeader>
        <WorkspaceContent render={<div />} className="p-(--qy-page-gutter)">
          {page === "notifications" && <Tabs defaultValue="mail">
            <TabsList aria-label={t("通知渠道", "Channel")}><TabsTab value="mail">{t("邮件", "Email")}</TabsTab><TabsTab value="push">{t("推送", "Push")}</TabsTab><TabsTab value="digest">{t("摘要", "Digest")}</TabsTab></TabsList>
            <TabsPanel value="mail">{t("邮件", "Email")}</TabsPanel><TabsPanel value="push">{t("推送", "Push")}</TabsPanel><TabsPanel value="digest">{t("摘要", "Digest")}</TabsPanel>
          </Tabs>}
        </WorkspaceContent>
      </WorkspaceSurface>
    </Workspace>
  </div>;
}

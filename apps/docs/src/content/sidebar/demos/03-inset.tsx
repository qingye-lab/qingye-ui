import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton } from "@yanqing/ui/components/sidebar";
import { SidebarProvider } from "@yanqing/ui/components/sidebar";
import { SidebarTrigger } from "@yanqing/ui/components/sidebar";
import { CSSProperties } from "react";
import {
  Sidebar } from "@yanqing/ui";
import { BookOpenIcon, FileTextIcon, StarIcon } from "lucide-react";

export const meta = {
  title: "内嵌样式与自定义宽度",
  description:
    "variant=\"inset\" 让主区域像一张浮在侧栏底色上的卡片；在 Provider 上覆盖 --sidebar-width 调整宽度。加载中的分组用 SidebarMenuSkeleton 占位。",
  flush: true,
};

export default function Demo() {
  return (
    <SidebarProvider
      className="relative h-72 min-h-0 md:h-[26rem] overflow-hidden rounded-[calc(var(--radius-xl)-1px)]"
      style={{ "--sidebar-width": "14rem" } as CSSProperties}
    >
      <Sidebar className="absolute h-full" variant="inset">
        <SidebarHeader>
          <SidebarInput aria-label="搜索文档" placeholder="搜索文档…" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>收藏</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <StarIcon />
                  <span>接口鉴权说明</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <BookOpenIcon />
                  <span>新人入职手册</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FileTextIcon />
                  <span>2026 年度规划</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>最近浏览</SidebarGroupLabel>
            <SidebarMenu>
              {[0, 1, 2].map((i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-3">
          <SidebarTrigger />
          <span className="font-medium text-sm">接口鉴权说明</span>
        </header>
        <article className="flex flex-col gap-2 p-4 text-muted-foreground text-sm">
          <p>所有请求在 Authorization 头中携带访问令牌，令牌有效期 2 小时。</p>
          <p>令牌过期后用刷新令牌换取新令牌，刷新令牌有效期 30 天。</p>
        </article>
      </SidebarInset>
    </SidebarProvider>
  );
}

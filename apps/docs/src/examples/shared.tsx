import type { ComponentType, CSSProperties, ReactNode } from "react";
import { Avatar, AvatarFallback } from "@qingye/ui/components/avatar";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@qingye/ui/components/empty";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye/ui/components/select";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@qingye/ui/components/sidebar";
import { Tabs, TabsList, TabsTab } from "@qingye/ui/components/tabs";
import { Settings2 } from "lucide-react";

export type DemoProps = { embedded?: boolean };
export type DemoNavItem = { id: string; label: string; icon: ComponentType<{ size?: number; "aria-hidden"?: boolean }>; count?: number };

export function AppFrame({ children, embedded = false, active, onNavigate, nav, kind = "dashboard", workspace = "青野工作室", footer, action }: DemoProps & {
  children: ReactNode;
  active: string;
  onNavigate: (id: string) => void;
  nav: DemoNavItem[];
  kind?: "dashboard" | "mail" | "studio";
  workspace?: string;
  footer?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <SidebarProvider className={`qy-example qy-example--${kind}${embedded ? " qy-example--embedded" : ""}`} style={{ "--sidebar-width": "208px" } as CSSProperties}>
      <Sidebar collapsible="none" className="example-sidebar" aria-label={`${workspace}导航`}>
        <SidebarHeader className="example-sidebar-header">
          <div className="example-workspace"><Avatar size="sm"><AvatarFallback>青</AvatarFallback></Avatar><strong>{workspace}</strong></div>
          {action}
        </SidebarHeader>
        <SidebarContent className="example-sidebar-content">
          <SidebarMenu>{nav.map(({ id, label, icon: Icon, count }) => <SidebarMenuItem key={id}><SidebarMenuButton isActive={active === id} aria-current={active === id ? "page" : undefined} onClick={() => onNavigate(id)}><Icon size={17} aria-hidden /><span>{label}</span></SidebarMenuButton>{count !== undefined && count > 0 && <SidebarMenuBadge>{count}</SidebarMenuBadge>}</SidebarMenuItem>)}</SidebarMenu>
        </SidebarContent>
        {footer && <SidebarFooter>{footer}</SidebarFooter>}
      </Sidebar>
      <div className="example-mobile-bar"><div className="example-workspace"><Avatar size="sm"><AvatarFallback>青</AvatarFallback></Avatar><strong>{workspace}</strong></div><Tabs value={active} onValueChange={(value) => onNavigate(String(value))}><TabsList size="sm">{nav.map(({ id, label }) => <TabsTab key={id} value={id}>{label}</TabsTab>)}</TabsList></Tabs></div>
      <div className="example-body">{children}</div>
    </SidebarProvider>
  );
}

export function ExampleSelect({ value, onChange, options, label, icon }: { value: string; onChange: (value: string) => void; options: { value: string; label: string }[]; label: string; icon?: ReactNode }) {
  return <Select value={value} items={options} onValueChange={(next) => { if (next !== null) onChange(next); }}><SelectTrigger className="example-select" aria-label={label}>{icon}<SelectValue /></SelectTrigger><SelectPopup>{options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectPopup></Select>;
}

export function EmptyResult({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return <Empty><EmptyHeader><EmptyMedia><Settings2 aria-hidden /></EmptyMedia><EmptyTitle>{title}</EmptyTitle>{description && <EmptyDescription>{description}</EmptyDescription>}</EmptyHeader>{action && <EmptyContent>{action}</EmptyContent>}</Empty>;
}

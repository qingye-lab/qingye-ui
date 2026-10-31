"use client";
import { useDirection } from "@base-ui/react/direction-provider";
import * as React from "react";
import { Drawer, DrawerContent, DrawerPopup } from "./components/drawer";
import { useUILocale } from "./locale";
import { sidebarDrawerTrigger, type SidebarDrawerHandle } from "./sidebar-handle";

export type SidebarDrawerHostProps = {
  handle: SidebarDrawerHandle; open: boolean; onOpenChange(open: boolean): void; children: React.ReactNode;
};
/**
 * 窄屏承载侧栏的抽屉。单独成模块，由 Sidebar 在真正变窄时才动态加载：宽屏首屏不带抽屉的弹层、
 * 滑动与焦点管理代码。开合状态在 handle 里（见 sidebar-handle.ts），宿主到位前按下的按钮也已记下。
 */
export default function SidebarDrawerHost({ handle, open, onOpenChange, children }: SidebarDrawerHostProps) {
  const { messages } = useUILocale(); const direction = useDirection();
  // 抽屉从起始侧滑出：swipeDirection 说的是收回的方向，ltr 向左、rtl 向右。名称与侧栏的导航名称同一个。
  // 关闭后焦点回到打开它的按钮；按钮已不在（例如变宽后被隐去）时交给 Base UI 的默认落点。
  return <Drawer open={open} onOpenChange={onOpenChange} swipeDirection={direction === "rtl" ? "right" : "left"}>
    <DrawerPopup aria-label={messages.sidebar} finalFocus={() => sidebarDrawerTrigger(handle) ?? true}><DrawerContent>{children}</DrawerContent></DrawerPopup>
  </Drawer>;
}

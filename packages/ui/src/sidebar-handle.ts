"use client";

import * as React from "react";
import type { DrawerPrimitive } from "./components/drawer";

/**
 * 窄屏侧栏抽屉与它的触发按钮之间的关联：Workspace 持有一个并提供在这里，Sidebar（drawer）与 SidebarDrawerTrigger
 * 在外壳里各自取用，页面不必传递。单独成文件而不放进 workspace.tsx，是为了不把这个内部入口经 index.ts 公开。
 */
export const SidebarHandleContext = React.createContext<DrawerPrimitive.Handle<unknown> | null>(null);
export function useWorkspaceSidebarHandle() { return React.useContext(SidebarHandleContext); }

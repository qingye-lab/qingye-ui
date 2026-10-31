"use client";

import * as React from "react";

/**
 * 窄屏侧栏抽屉与它的触发按钮之间的关联：抽屉开没开、焦点关闭后回到哪个按钮。
 * Workspace 持有一个并提供在这里，Sidebar（drawer）与 SidebarDrawerTrigger 在外壳里各自取用，页面不必传递；
 * 不在 Workspace 里时用 createSidebarDrawerHandle() 创建并同时交给两者。
 *
 * 不用 Base UI 抽屉自己的 handle：取它要引入 @base-ui/react/drawer 的总入口，打包时抽屉的弹层、滑动与焦点代码
 * 会随之进入首屏共享块，抽屉宿主按需加载（见 sidebar-drawer.tsx）就落空了。这里只是一份开合状态，宿主到位前
 * 按下按钮也已记下，宿主挂载时直接以打开状态出现，按下不会无声落空。
 * 开合跟着「有没有侧栏正在承接抽屉」走：没有承接者时按下不算数，承接者离开（变宽、卸载）时一并关上——
 * handle 比侧栏活得久，不能让按钮停在「已展开」，也不能让下一个挂上来的侧栏带着旧的「开」自己弹出来。
 * 单独成文件而不放进 workspace.tsx，是为了不把内部读写入口经 index.ts 公开；公开的只有创建函数与类型（经 sidebar.tsx）。
 */
export interface SidebarDrawerHandle { readonly __sidebarDrawer: true }
type Store = SidebarDrawerHandle & { open: boolean; hosts: number; trigger: HTMLElement | null; listeners: Set<() => void> };

export function createSidebarDrawerHandle(): SidebarDrawerHandle {
  const store: Store = { __sidebarDrawer: true, open: false, hosts: 0, trigger: null, listeners: new Set() };
  return store;
}
function update(store: Store, open: boolean) {
  if (store.open === open || (open && store.hosts === 0)) return;
  store.open = open; store.listeners.forEach(listener => listener());
}
const noop = () => {};
const closed = () => false;
/** 抽屉的开合：两端读同一份状态，任一端写入都通知另一端。没有 handle 时恒为关。 */
export function useSidebarDrawerOpen(handle: SidebarDrawerHandle | null): [boolean, (open: boolean) => void] {
  const store = handle as Store | null;
  const subscribe = React.useCallback((listener: () => void) => { if (!store) return noop; store.listeners.add(listener); return () => { store.listeners.delete(listener); }; }, [store]);
  const open = React.useSyncExternalStore(subscribe, store ? () => store.open : closed, closed);
  const setOpen = React.useCallback((next: boolean) => { if (store) update(store, next); }, [store]);
  return [open, setOpen];
}
/** 侧栏开始承接抽屉（窄屏且 drawer）。返回的清理在它不再承接时调用，最后一个承接者离开时抽屉关上。 */
export function hostSidebarDrawer(handle: SidebarDrawerHandle) {
  const store = handle as Store; store.hosts += 1;
  return () => { store.hosts -= 1; if (store.hosts === 0) update(store, false); };
}
/** 按钮打开抽屉，并记下按下的是哪一个：同一个 handle 可以有几枚按钮，关闭后焦点回到按下的那枚。 */
export function openSidebarDrawer(handle: SidebarDrawerHandle, trigger: HTMLElement) {
  const store = handle as Store; if (store.hosts === 0) return;
  store.trigger = trigger; update(store, true);
}
/** 关闭后焦点的去处：按下的按钮还在文档里就回到它，否则交给抽屉的默认落点。 */
export function sidebarDrawerTrigger(handle: SidebarDrawerHandle) {
  const trigger = (handle as Store).trigger;
  return trigger?.isConnected ? trigger : null;
}

export const SidebarHandleContext = React.createContext<SidebarDrawerHandle | null>(null);
export function useWorkspaceSidebarHandle() { return React.useContext(SidebarHandleContext); }

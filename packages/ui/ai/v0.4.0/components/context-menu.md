# 右键菜单 ContextMenu

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/context-menu
Source: packages/ui/src/components/context-menu.tsx
Source SHA-256: 99d8a1a2c3095e225391de403ce7ee98de373d85b8903e74640a9096d669223c

在区域上点击右键（触屏长按）时出现的操作菜单，用于文件、卡片、表格行等对象的快捷操作。它是加速手段：同样的操作必须在界面其他位置也能完成。

## Use and ownership
- 为已定位对象提供右键或长按的快速操作，作为可见命令入口的补充。
- Avoid: 不能让仅会发现右键的人才能完成任务；触发区域不能改变操作对象或忽略权限。
- Library: 管理上下文触发、菜单键盘与焦点、碰撞定位；危险高亮、长标签和 RTL 子菜单保持真实表达。
- Application: 提供当前对象、操作范围、可用条件和真实结果；长按不会自动创建业务选择。

## Composition
- 与可见 Button / Menu 复用同一命令定义，子菜单、Checkbox、Radio 按实际命令或值关系组合。

## Responsive behavior
- 触屏长按只作加速，保留可见替代入口；菜单范围限制在可用视口并支持内部滚动。

## Customization
- 沿用 Menu 的表面与状态角色；触发区域外观依据内容对象，避免另造命令语义。

## Current exports
- ContextMenu: const; owner context-menu; PASS
- ContextMenuCheckboxItem: function; owner context-menu; PASS; props: ContextMenuPrimitive.CheckboxItem.Props & {
  variant?: "default" | "switch";
}
- ContextMenuContent: function; owner context-menu; alias of ContextMenuPopup; PASS; props: ContextMenuPrimitive.Popup.Props & {
  align?: ContextMenuPrimitive.Positioner.Props["align"];
  sideOffset?: ContextMenuPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: ContextMenuPrimitive.Positioner.Props["alignOffset"];
  side?: ContextMenuPrimitive.Positioner.Props["side"];
  anchor?: ContextMenuPrimitive.Positioner.Props["anchor"];
  portalProps?: ContextMenuPrimitive.Portal.Props;
}
- ContextMenuGroup: function; owner context-menu; PASS; props: ContextMenuPrimitive.Group.Props
- ContextMenuGroupLabel: function; owner context-menu; PASS; props: ContextMenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
}
- ContextMenuItem: function; owner context-menu; PASS; props: ContextMenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
}
- ContextMenuLabel: function; owner context-menu; alias of ContextMenuGroupLabel; PASS; props: ContextMenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
}
- ContextMenuLinkItem: function; owner context-menu; PASS; props: ContextMenuPrimitive.LinkItem.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
}
- ContextMenuPopup: function; owner context-menu; PASS; props: ContextMenuPrimitive.Popup.Props & {
  align?: ContextMenuPrimitive.Positioner.Props["align"];
  sideOffset?: ContextMenuPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: ContextMenuPrimitive.Positioner.Props["alignOffset"];
  side?: ContextMenuPrimitive.Positioner.Props["side"];
  anchor?: ContextMenuPrimitive.Positioner.Props["anchor"];
  portalProps?: ContextMenuPrimitive.Portal.Props;
}
- ContextMenuPortal: const; owner context-menu; PASS
- ContextMenuPrimitive: reexport; owner context-menu; UNVERIFIED
- ContextMenuRadioGroup: function; owner context-menu; PASS; props: ContextMenuPrimitive.RadioGroup.Props
- ContextMenuRadioItem: function; owner context-menu; PASS; props: ContextMenuPrimitive.RadioItem.Props
- ContextMenuSeparator: function; owner context-menu; PASS; props: ContextMenuPrimitive.Separator.Props
- ContextMenuShortcut: function; owner context-menu; PASS; props: React.ComponentProps<"kbd">
- ContextMenuSub: function; owner context-menu; PASS; props: ContextMenuPrimitive.SubmenuRoot.Props
- ContextMenuSubContent: function; owner context-menu; alias of ContextMenuSubPopup; PASS; props: ContextMenuPrimitive.Popup.Props & {
  align?: ContextMenuPrimitive.Positioner.Props["align"];
  sideOffset?: ContextMenuPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: ContextMenuPrimitive.Positioner.Props["alignOffset"];
}
- ContextMenuSubPopup: function; owner context-menu; PASS; props: ContextMenuPrimitive.Popup.Props & {
  align?: ContextMenuPrimitive.Positioner.Props["align"];
  sideOffset?: ContextMenuPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: ContextMenuPrimitive.Positioner.Props["alignOffset"];
}
- ContextMenuSubTrigger: function; owner context-menu; PASS; props: ContextMenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
}
- ContextMenuTrigger: function; owner context-menu; PASS; props: ContextMenuPrimitive.Trigger.Props

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ContextMenu
根组件。
- open / defaultOpen: boolean; default false. 受控 / 非受控的打开状态。
- onOpenChange: (open, details) => void. 打开状态变化时调用。
- disabled: boolean; default false. 停用右键菜单，恢复浏览器默认菜单。

### ContextMenuTrigger
响应右键与长按的区域，渲染为 <div>。

### ContextMenuPopup
菜单浮层，出现在指针位置。别名 ContextMenuContent。
- side / align / sideOffset / alignOffset: 同 MenuPopup. 相对指针的定位。

### ContextMenuItem
菜单项。
- variant: "default" | "destructive"; default "default". 危险操作。
- inset: boolean; default false. 与带图标的项对齐。
- disabled: boolean; default false. 禁用。

### ContextMenuLinkItem
渲染为 <a> 的导航项。

### ContextMenuCheckboxItem
可勾选的项，支持 variant="switch"。

### ContextMenuRadioGroup / ContextMenuRadioItem
单选组。

### ContextMenuGroup / ContextMenuGroupLabel
分组与组标题。别名 ContextMenuLabel。

### ContextMenuSeparator / ContextMenuShortcut
分隔线 / 快捷键提示。

### ContextMenuSub / ContextMenuSubTrigger / ContextMenuSubPopup
子菜单。别名 ContextMenuSubContent。

## Keyboard
- Shift + F10 / 菜单键: 在聚焦的触发区域上打开菜单（取决于浏览器与系统）。
- ↑ / ↓: 在菜单项之间移动。
- → / ←: 打开 / 关闭子菜单。
- Enter / Space: 执行当前项。
- Esc: 关闭菜单。

## Source examples
### 基础用法
Source: apps/docs/src/content/context-menu/demos/01-default.tsx
```tsx
import { ContextMenu, ContextMenuItem, ContextMenuPopup, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger } from "@qingye/ui/components/context-menu";
import { CopyIcon, DownloadIcon, FileTextIcon, PencilIcon, Trash2Icon } from "lucide-react";

export const meta = { title: "基础用法", description: "在卡片上点击右键，触屏设备上长按。" };

export default function Demo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex w-full max-w-xs select-none items-center gap-3 rounded-xl border p-4 text-sm">
        <FileTextIcon aria-hidden="true" className="size-8 shrink-0 text-muted-foreground" strokeWidth={1.5} />
        <div className="grid min-w-0 gap-0.5">
          <span className="truncate font-medium">2026 年第三季度巡检报告.pdf</span>
          <span className="text-muted-foreground text-xs">右键点击或长按查看操作</span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuPopup className="w-48">
        <ContextMenuItem>
          <PencilIcon />
          重命名
          <ContextMenuShortcut>F2</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <CopyIcon />
          创建副本
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <DownloadIcon />
          下载
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2Icon />
          移到回收站
          <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuPopup>
    </ContextMenu>
  );
}
```

### 勾选与单选
Source: apps/docs/src/content/context-menu/demos/02-options.tsx
```tsx
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuGroup, ContextMenuGroupLabel, ContextMenuPopup, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuTrigger } from "@qingye/ui/components/context-menu";

export const meta = { title: "勾选与单选", description: "在看板空白处右键，调整视图选项；切换时菜单保持打开。" };

export default function Demo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-36 w-full max-w-sm select-none items-center justify-center rounded-xl border border-dashed text-muted-foreground text-sm">
        在看板空白处右键
      </ContextMenuTrigger>
      <ContextMenuPopup className="w-48">
        <ContextMenuGroup>
          <ContextMenuGroupLabel>分组方式</ContextMenuGroupLabel>
          <ContextMenuRadioGroup defaultValue="status">
            <ContextMenuRadioItem value="status">按状态</ContextMenuRadioItem>
            <ContextMenuRadioItem value="assignee">按负责人</ContextMenuRadioItem>
            <ContextMenuRadioItem value="warehouse">按仓库</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuGroupLabel>显示</ContextMenuGroupLabel>
          <ContextMenuCheckboxItem defaultChecked>负责人头像</ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem defaultChecked>截止日期</ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>已完成的工单</ContextMenuCheckboxItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem variant="switch">紧凑卡片</ContextMenuCheckboxItem>
      </ContextMenuPopup>
    </ContextMenu>
  );
}
```

### 子菜单
Source: apps/docs/src/content/context-menu/demos/03-submenu.tsx
```tsx
import { ContextMenu, ContextMenuItem, ContextMenuPopup, ContextMenuSeparator, ContextMenuSub, ContextMenuSubPopup, ContextMenuSubTrigger, ContextMenuTrigger } from "@qingye/ui/components/context-menu";

export const meta = { title: "子菜单", description: "层级不超过两级；更深的选择改用对话框。" };

const rows = [
  { id: "#2318", title: "3 号仓库温控器离线" },
  { id: "#2317", title: "扫码枪固件升级失败" },
];

export default function Demo() {
  return (
    <div className="grid w-full max-w-sm divide-y rounded-xl border text-sm">
      {rows.map((row) => (
        <ContextMenu key={row.id}>
          <ContextMenuTrigger className="flex select-none gap-3 px-4 py-3 data-popup-open:bg-accent">
            <span className="numeric text-muted-foreground">{row.id}</span>
            <span className="truncate">{row.title}</span>
          </ContextMenuTrigger>
          <ContextMenuPopup className="w-44">
            <ContextMenuItem>打开</ContextMenuItem>
            <ContextMenuItem>在新标签页打开</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuSub>
              <ContextMenuSubTrigger>设置状态</ContextMenuSubTrigger>
              <ContextMenuSubPopup className="w-36">
                <ContextMenuItem>待处理</ContextMenuItem>
                <ContextMenuItem>处理中</ContextMenuItem>
                <ContextMenuItem>已解决</ContextMenuItem>
              </ContextMenuSubPopup>
            </ContextMenuSub>
            <ContextMenuSub>
              <ContextMenuSubTrigger>分配给</ContextMenuSubTrigger>
              <ContextMenuSubPopup className="w-36">
                <ContextMenuItem>周以宁</ContextMenuItem>
                <ContextMenuItem>许清和</ContextMenuItem>
                <ContextMenuItem>林嘉禾</ContextMenuItem>
              </ContextMenuSubPopup>
            </ContextMenuSub>
          </ContextMenuPopup>
        </ContextMenu>
      ))}
    </div>
  );
}
```


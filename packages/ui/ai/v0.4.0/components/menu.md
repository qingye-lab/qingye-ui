# 下拉菜单 Menu

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/menu
Source: packages/ui/src/components/menu.tsx
Source SHA-256: 6bee4a7fa2214a33347c496e48f5aa70253bd2e58df09b3797ecb1096ab9b091

点击按钮后展开的操作列表，收纳次要操作、视图选项和导航链接。从表单中选值用 Select，右键菜单用 ContextMenu。

## Use and ownership
- 收纳同一对象的命令、相关模式或真实导航，核心操作仍可直接到达。
- Avoid: 不能用 Menu 代替表单 Select；危险属性在键盘高亮时不能被普通项颜色覆盖。
- Library: 管理菜单角色、方向键、高亮、子菜单、焦点返回与可用视口；长标签保持完整可读。
- Application: 决定对象、命令范围、权限与执行结果；Shortcut 只展示快捷键而不注册。

## Composition
- 命令用 Item，地址用 LinkItem，保持选项用 Checkbox / Radio；不可逆命令按后果接 AlertDialog。

## Responsive behavior
- 菜单项在粗指针下保持整行目标；长对象名换行，超高菜单内部滚动，RTL 子菜单指向实际展开侧。

## Customization
- variant 标识真实危险动作；集中主题控制高亮与辅助文字，窗口宽度受可用视口约束。

## Current exports
- DropdownMenu: const; owner menu; alias of Menu; PASS
- DropdownMenuCheckboxItem: function; owner menu; alias of MenuCheckboxItem; PASS; props: MenuPrimitive.CheckboxItem.Props & {
  variant?: "default" | "switch";
}
- DropdownMenuContent: function; owner menu; alias of MenuPopup; PASS; props: MenuPrimitive.Popup.Props & {
  align?: MenuPrimitive.Positioner.Props["align"];
  sideOffset?: MenuPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: MenuPrimitive.Positioner.Props["alignOffset"];
  side?: MenuPrimitive.Positioner.Props["side"];
  anchor?: MenuPrimitive.Positioner.Props["anchor"];
  portalProps?: MenuPrimitive.Portal.Props;
}
- DropdownMenuCreateHandle: const; owner menu; alias of MenuCreateHandle; PASS
- DropdownMenuGroup: function; owner menu; alias of MenuGroup; PASS; props: MenuPrimitive.Group.Props
- DropdownMenuItem: function; owner menu; alias of MenuItem; PASS; props: MenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
}
- DropdownMenuLabel: function; owner menu; alias of MenuGroupLabel; PASS; props: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
}
- DropdownMenuPortal: const; owner menu; alias of MenuPortal; PASS
- DropdownMenuRadioGroup: function; owner menu; alias of MenuRadioGroup; PASS; props: MenuPrimitive.RadioGroup.Props
- DropdownMenuRadioItem: function; owner menu; alias of MenuRadioItem; PASS; props: MenuPrimitive.RadioItem.Props
- DropdownMenuSeparator: function; owner menu; alias of MenuSeparator; PASS; props: MenuPrimitive.Separator.Props
- DropdownMenuShortcut: function; owner menu; alias of MenuShortcut; PASS; props: React.ComponentProps<"kbd">
- DropdownMenuSub: function; owner menu; alias of MenuSub; PASS; props: MenuPrimitive.SubmenuRoot.Props
- DropdownMenuSubContent: function; owner menu; alias of MenuSubPopup; PASS; props: MenuPrimitive.Popup.Props & {
  align?: MenuPrimitive.Positioner.Props["align"];
  sideOffset?: MenuPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: MenuPrimitive.Positioner.Props["alignOffset"];
}
- DropdownMenuSubTrigger: function; owner menu; alias of MenuSubTrigger; PASS; props: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
}
- DropdownMenuTrigger: function; owner menu; alias of MenuTrigger; PASS; props: MenuPrimitive.Trigger.Props
- Menu: const; owner menu; PASS
- MenuCheckboxItem: function; owner menu; PASS; props: MenuPrimitive.CheckboxItem.Props & {
  variant?: "default" | "switch";
}
- MenuCreateHandle: const; owner menu; PASS
- MenuGroup: function; owner menu; PASS; props: MenuPrimitive.Group.Props
- MenuGroupLabel: function; owner menu; PASS; props: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
}
- MenuItem: function; owner menu; PASS; props: MenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
}
- MenuLinkItem: function; owner menu; PASS; props: MenuPrimitive.LinkItem.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
}
- MenuPopup: function; owner menu; PASS; props: MenuPrimitive.Popup.Props & {
  align?: MenuPrimitive.Positioner.Props["align"];
  sideOffset?: MenuPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: MenuPrimitive.Positioner.Props["alignOffset"];
  side?: MenuPrimitive.Positioner.Props["side"];
  anchor?: MenuPrimitive.Positioner.Props["anchor"];
  portalProps?: MenuPrimitive.Portal.Props;
}
- MenuPortal: const; owner menu; PASS
- MenuPrimitive: reexport; owner menu; UNVERIFIED
- MenuRadioGroup: function; owner menu; PASS; props: MenuPrimitive.RadioGroup.Props
- MenuRadioItem: function; owner menu; PASS; props: MenuPrimitive.RadioItem.Props
- MenuSeparator: function; owner menu; PASS; props: MenuPrimitive.Separator.Props
- MenuShortcut: function; owner menu; PASS; props: React.ComponentProps<"kbd">
- MenuSub: function; owner menu; PASS; props: MenuPrimitive.SubmenuRoot.Props
- MenuSubPopup: function; owner menu; PASS; props: MenuPrimitive.Popup.Props & {
  align?: MenuPrimitive.Positioner.Props["align"];
  sideOffset?: MenuPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: MenuPrimitive.Positioner.Props["alignOffset"];
}
- MenuSubTrigger: function; owner menu; PASS; props: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
}
- MenuTrigger: function; owner menu; PASS; props: MenuPrimitive.Trigger.Props

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Menu
根组件。别名 DropdownMenu。
- open / defaultOpen: boolean; default false. 受控 / 非受控的打开状态。
- onOpenChange: (open, details) => void. 打开状态变化时调用。
- modal: boolean; default true. 打开时锁定页面滚动与外部交互。
- loopFocus: boolean; default true. 方向键到达末尾后回到开头。

### MenuTrigger
触发按钮。别名 DropdownMenuTrigger。
- openOnHover: boolean; default false. 悬停打开，适合顶部导航。
- delay / closeDelay: number; default 100 / 0. 悬停打开 / 关闭的等待时间。

### MenuPopup
菜单浮层。别名 DropdownMenuContent。
- side: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"; default "bottom". 弹出方向，空间不足时自动翻转。
- align: "start" | "center" | "end"; default "center". 沿边的对齐方式。
- sideOffset / alignOffset: number; default 4 / 0. 与触发器的距离 / 对齐偏移。

### MenuItem
菜单项。别名 DropdownMenuItem。
- variant: "default" | "destructive"; default "default". destructive 用于删除等危险操作。
- inset: boolean; default false. 左侧留出图标宽度，与带图标的项对齐。
- disabled: boolean; default false. 禁用；键盘导航时跳过。
- closeOnClick: boolean; default true. 点击后是否关闭菜单。
- onClick: (event) => void. 选中时调用（鼠标、Enter、Space）。

### MenuLinkItem
渲染为 <a> 的导航项，用 render 接入路由链接。

### MenuCheckboxItem
可勾选的项。别名 DropdownMenuCheckboxItem。
- checked / defaultChecked: boolean. 受控 / 非受控的勾选状态。
- onCheckedChange: (checked) => void. 勾选变化时调用。
- variant: "default" | "switch"; default "default". switch 在右侧显示开关。

### MenuRadioGroup / MenuRadioItem
单选组。别名 DropdownMenuRadioGroup / DropdownMenuRadioItem。
- value / defaultValue / onValueChange: string. 当前选中值。

### MenuGroup / MenuGroupLabel
分组与组标题，标题自动关联为组的可访问名称。别名 DropdownMenuGroup / DropdownMenuLabel。

### MenuSeparator
分隔线。

### MenuShortcut
右侧的快捷键提示，仅作展示，不会注册快捷键。

### MenuSub / MenuSubTrigger / MenuSubPopup
子菜单。别名 DropdownMenuSub / DropdownMenuSubTrigger / DropdownMenuSubContent。

## Keyboard
- Enter / Space / ↓: 在触发器上打开菜单并聚焦第一项。
- ↑ / ↓: 在菜单项之间移动。
- → / ←: 打开 / 关闭子菜单。
- Home / End: 跳到第一项 / 最后一项。
- 字母键: 跳到以该字符开头的项。
- Esc: 关闭菜单，焦点回到触发器。

## Source examples
### 基础用法
Source: apps/docs/src/content/menu/demos/01-default.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Menu, MenuItem, MenuPopup, MenuSeparator, MenuShortcut, MenuTrigger } from "@qingye/ui/components/menu";
import { ArchiveIcon, CopyIcon, EllipsisIcon, PencilIcon, Share2Icon, Trash2Icon } from "lucide-react";

export const meta = {
  title: "基础用法",
  description: "图标、快捷键、禁用项和危险操作。危险操作放在最后并用分隔线隔开。",
};

export default function Demo() {
  return (
    <Menu>
      <MenuTrigger render={<Button aria-label="工单操作" size="icon" variant="outline" />}>
        <EllipsisIcon />
      </MenuTrigger>
      <MenuPopup align="start" className="w-48">
        <MenuItem>
          <PencilIcon />
          编辑
          <MenuShortcut>⌘E</MenuShortcut>
        </MenuItem>
        <MenuItem>
          <CopyIcon />
          创建副本
          <MenuShortcut>⌘D</MenuShortcut>
        </MenuItem>
        <MenuItem disabled>
          <Share2Icon />
          转交他人
        </MenuItem>
        <MenuItem>
          <ArchiveIcon />
          归档
        </MenuItem>
        <MenuSeparator />
        <MenuItem variant="destructive">
          <Trash2Icon />
          删除
          <MenuShortcut>⌫</MenuShortcut>
        </MenuItem>
      </MenuPopup>
    </Menu>
  );
}
```

### 分组与标题
Source: apps/docs/src/content/menu/demos/02-groups.tsx
```tsx
import { Avatar, AvatarFallback } from "@qingye/ui/components/avatar";
import { Button } from "@qingye/ui/components/button";
import { Menu, MenuGroup, MenuGroupLabel, MenuItem, MenuPopup, MenuSeparator, MenuShortcut, MenuTrigger } from "@qingye/ui/components/menu";
import { CreditCardIcon, LogOutIcon, SettingsIcon, UserIcon, UserPlusIcon, UsersIcon } from "lucide-react";

export const meta = { title: "分组与标题", description: "用 MenuGroup 与 MenuGroupLabel 组织较长的菜单。" };

export default function Demo() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="ghost" />}>
        <Avatar size="xs">
          <AvatarFallback>林</AvatarFallback>
        </Avatar>
        林嘉禾
      </MenuTrigger>
      <MenuPopup align="start" className="w-56">
        <MenuGroup>
          <MenuGroupLabel>我的账号</MenuGroupLabel>
          <MenuItem>
            <UserIcon />
            个人资料
            <MenuShortcut>⇧⌘P</MenuShortcut>
          </MenuItem>
          <MenuItem>
            <CreditCardIcon />
            账单与发票
          </MenuItem>
          <MenuItem>
            <SettingsIcon />
            偏好设置
            <MenuShortcut>⌘,</MenuShortcut>
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuGroupLabel>团队 · 燕青科技</MenuGroupLabel>
          <MenuItem>
            <UsersIcon />
            成员管理
          </MenuItem>
          <MenuItem>
            <UserPlusIcon />
            邀请成员
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuItem>
          <LogOutIcon />
          退出登录
        </MenuItem>
      </MenuPopup>
    </Menu>
  );
}
```

### 勾选项
Source: apps/docs/src/content/menu/demos/03-checkbox.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Menu, MenuCheckboxItem, MenuGroup, MenuGroupLabel, MenuPopup, MenuSeparator, MenuTrigger } from "@qingye/ui/components/menu";
import { Columns3Icon } from "lucide-react";
import { useState } from "react";

export const meta = {
  title: "勾选项",
  description: "MenuCheckboxItem 切换选项且不关闭菜单；variant=\"switch\" 显示为开关。",
};

const columns = ["设备编号", "所属仓库", "负责人", "最近上报", "固件版本"];

export default function Demo() {
  const [visible, setVisible] = useState(["设备编号", "所属仓库", "最近上报"]);

  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>
        <Columns3Icon />
        显示列
      </MenuTrigger>
      <MenuPopup align="start" className="w-52">
        <MenuGroup>
          <MenuGroupLabel>表格列</MenuGroupLabel>
          {columns.map((column) => (
            <MenuCheckboxItem
              checked={visible.includes(column)}
              disabled={column === "设备编号"}
              key={column}
              onCheckedChange={(checked) =>
                setVisible((current) => (checked ? [...current, column] : current.filter((item) => item !== column)))
              }
            >
              {column}
            </MenuCheckboxItem>
          ))}
        </MenuGroup>
        <MenuSeparator />
        <MenuCheckboxItem defaultChecked variant="switch">
          紧凑行高
        </MenuCheckboxItem>
        <MenuCheckboxItem variant="switch">固定首列</MenuCheckboxItem>
      </MenuPopup>
    </Menu>
  );
}
```

### 单选项
Source: apps/docs/src/content/menu/demos/04-radio.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Menu, MenuGroup, MenuGroupLabel, MenuPopup, MenuRadioGroup, MenuRadioItem, MenuTrigger } from "@qingye/ui/components/menu";
import { ArrowDownUpIcon } from "lucide-react";
import { useState } from "react";

export const meta = { title: "单选项", description: "MenuRadioGroup 中只能选中一项，适合排序、视图切换。" };

const options = [
  { value: "updated", label: "最近更新" },
  { value: "created", label: "创建时间" },
  { value: "priority", label: "优先级" },
  { value: "assignee", label: "负责人" },
];

export default function Demo() {
  const [sort, setSort] = useState("updated");
  const current = options.find((option) => option.value === sort)?.label;

  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>
        <ArrowDownUpIcon />
        {current}
      </MenuTrigger>
      <MenuPopup align="start" className="w-44">
        <MenuGroup>
          <MenuGroupLabel>排序方式</MenuGroupLabel>
          <MenuRadioGroup onValueChange={setSort} value={sort}>
            {options.map((option) => (
              <MenuRadioItem key={option.value} value={option.value}>
                {option.label}
              </MenuRadioItem>
            ))}
          </MenuRadioGroup>
        </MenuGroup>
      </MenuPopup>
    </Menu>
  );
}
```

### 子菜单
Source: apps/docs/src/content/menu/demos/05-submenu.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Menu, MenuItem, MenuPopup, MenuSeparator, MenuSub, MenuSubPopup, MenuSubTrigger, MenuTrigger } from "@qingye/ui/components/menu";
import { FolderInputIcon, MailIcon, MessageSquareIcon, Share2Icon } from "lucide-react";

export const meta = { title: "子菜单", description: "悬停或按 → 打开子菜单，按 ← 返回上一级。" };

export default function Demo() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>工单 #2318</MenuTrigger>
      <MenuPopup align="start" className="w-48">
        <MenuItem>标记为已解决</MenuItem>
        <MenuItem>复制工单链接</MenuItem>
        <MenuSeparator />
        <MenuSub>
          <MenuSubTrigger>
            <FolderInputIcon />
            移动到项目
          </MenuSubTrigger>
          <MenuSubPopup className="w-40">
            <MenuItem>华东仓储</MenuItem>
            <MenuItem>华南门店</MenuItem>
            <MenuSub>
              <MenuSubTrigger>更多项目</MenuSubTrigger>
              <MenuSubPopup className="w-40">
                <MenuItem>西南物流</MenuItem>
                <MenuItem>华北工厂</MenuItem>
                <MenuItem disabled>已归档项目</MenuItem>
              </MenuSubPopup>
            </MenuSub>
          </MenuSubPopup>
        </MenuSub>
        <MenuSub>
          <MenuSubTrigger>
            <Share2Icon />
            分享
          </MenuSubTrigger>
          <MenuSubPopup className="w-40">
            <MenuItem>
              <MailIcon />
              发送邮件
            </MenuItem>
            <MenuItem>
              <MessageSquareIcon />
              发到群聊
            </MenuItem>
          </MenuSubPopup>
        </MenuSub>
      </MenuPopup>
    </Menu>
  );
}
```

### 链接项
Source: apps/docs/src/content/menu/demos/06-links.tsx
```tsx
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
```

### 悬停打开
Source: apps/docs/src/content/menu/demos/07-hover.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@qingye/ui/components/menu";
import { ChevronDownIcon } from "lucide-react";

export const meta = { title: "悬停打开", description: "openOnHover 适合顶部导航；触屏上仍然点击打开。" };

const products = ["设备管理", "工单中心", "数据看板", "开放平台"];

export default function Demo() {
  return (
    <Menu>
      <MenuTrigger openOnHover render={<Button variant="ghost" />}>
        产品
        <ChevronDownIcon />
      </MenuTrigger>
      <MenuPopup align="start" className="w-40">
        {products.map((product) => (
          <MenuItem key={product}>{product}</MenuItem>
        ))}
      </MenuPopup>
    </Menu>
  );
}
```


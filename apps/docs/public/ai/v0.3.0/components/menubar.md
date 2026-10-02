# 菜单栏 Menubar

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/menubar
Source: packages/ui/src/components/menubar.tsx
Source SHA-256: d55163513720c27de3cbe3a4a74bb56f1174baa811f20953e3e214d4efcd10dd

桌面应用式的一排菜单（文件 / 编辑 / 视图），适合编辑器、设计工具等命令很多的工作台。菜单内容沿用 Menu 的全部部件。

## Use and ownership
- 在编辑器或工具工作面集中收纳高频命令，保持对当前内容对象的连续操作。
- Avoid: 网站的地址导航不因外形相近而改用应用菜单栏；快捷键提示不等于快捷键已注册。
- Library: 提供顶层方向键漫游、相邻菜单切换和内部菜单关系，复用 Menu 的长内容约束。
- Application: 决定命令组织、文档选择、权限、快捷键冲突与执行结果。

## Composition
- 顶层用 MenubarMenu 和 Trigger；内容共享 Menu 的命令、选项、危险状态与子菜单。

## Responsive behavior
- 窄屏按命令重要性保留直接入口并收纳次要命令；触屏检查顶层目标和菜单行。

## Customization
- orientation 表达真实布局与键盘方向；层级关系不靠额外菜单深度解决。

## Current exports
- Menubar: function; owner menubar; PASS; props: MenubarPrimitive.Props
- MenubarCheckboxItem: function; owner menu; alias of MenuCheckboxItem; PASS; props: MenuPrimitive.CheckboxItem.Props & {
  variant?: "default" | "switch";
}
- MenubarContent: function; owner menubar; alias of MenubarPopup; PASS; props: React.ComponentProps<typeof MenuPopup>
- MenubarGroup: function; owner menu; alias of MenuGroup; PASS; props: MenuPrimitive.Group.Props
- MenubarItem: function; owner menu; alias of MenuItem; PASS; props: MenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
}
- MenubarLabel: function; owner menu; alias of MenuGroupLabel; PASS; props: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
}
- MenubarLinkItem: function; owner menu; alias of MenuLinkItem; PASS; props: MenuPrimitive.LinkItem.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
}
- MenubarMenu: const; owner menu; alias of Menu; PASS
- MenubarPopup: function; owner menubar; PASS; props: React.ComponentProps<typeof MenuPopup>
- MenubarPortal: const; owner menu; alias of MenuPortal; PASS
- MenubarPrimitive: reexport; owner menubar; UNVERIFIED
- MenubarRadioGroup: function; owner menu; alias of MenuRadioGroup; PASS; props: MenuPrimitive.RadioGroup.Props
- MenubarRadioItem: function; owner menu; alias of MenuRadioItem; PASS; props: MenuPrimitive.RadioItem.Props
- MenubarSeparator: function; owner menu; alias of MenuSeparator; PASS; props: MenuPrimitive.Separator.Props
- MenubarShortcut: function; owner menu; alias of MenuShortcut; PASS; props: React.ComponentProps<"kbd">
- MenubarSub: function; owner menu; alias of MenuSub; PASS; props: MenuPrimitive.SubmenuRoot.Props
- MenubarSubContent: function; owner menu; alias of MenuSubPopup; PASS; props: MenuPrimitive.Popup.Props & {
  align?: MenuPrimitive.Positioner.Props["align"];
  sideOffset?: MenuPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: MenuPrimitive.Positioner.Props["alignOffset"];
}
- MenubarSubTrigger: function; owner menu; alias of MenuSubTrigger; PASS; props: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
}
- MenubarTrigger: function; owner menubar; PASS; props: MenuPrimitive.Trigger.Props

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Menubar
菜单的容器，提供触发器之间的方向键漫游。
- orientation: "horizontal" | "vertical"; default "horizontal". 排列方向，同时决定方向键。
- loopFocus: boolean; default true. 方向键到末尾后回到第一个。
- modal: boolean; default true. 打开菜单时是否锁定页面滚动与外部交互。
- disabled: boolean; default false. 禁用整个菜单栏。

### MenubarMenu
一个菜单，即 Menu 的根部件；支持 open / defaultOpen / onOpenChange。

### MenubarTrigger
顶层按钮，样式同 ghost 按钮，打开时保持选中底色。

### MenubarContent
菜单面板（别名 MenubarPopup），默认与触发器起始边对齐，使菜单项文字与触发器文字对齐。
- align: "start" | "center" | "end"; default "start". 对齐方式。
- sideOffset / alignOffset: number; default 8 / -3. 与触发器的间距与对齐偏移。

### MenubarItem · MenubarCheckboxItem · MenubarRadioGroup · MenubarRadioItem
即 MenuItem 等部件，用法与下拉菜单完全一致；MenubarItem 支持 variant="destructive" 与 inset。

### MenubarSub · MenubarSubTrigger · MenubarSubContent
二级菜单。

### MenubarGroup · MenubarLabel · MenubarSeparator · MenubarShortcut
分组、分组标题、分隔线与快捷键提示。

## Keyboard
- ← / →: 在顶层触发器之间移动；菜单打开时直接切换到相邻菜单。
- Enter / Space / ↓: 打开当前菜单并聚焦第一项。
- ↑ / ↓: 在菜单项之间移动。
- → / ←: 在二级菜单触发项上展开 / 收起二级菜单。
- Esc: 关闭菜单，焦点回到触发器。
- 字母: 跳到以该字符开头的菜单项。

## Source examples
### 桌面应用
Source: apps/docs/src/content/menubar/demos/01-app.tsx
```tsx
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@qingye/ui/components/menubar";

export const meta = { title: "桌面应用", description: "点击打开一个菜单后，左右方向键或悬停即可切换到相邻菜单。" };

export default function Demo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>文件</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            新建文档 <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            打开… <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>最近打开</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>季度复盘.md</MenubarItem>
              <MenubarItem>品牌规范.pdf</MenubarItem>
              <MenubarItem>首页改版.fig</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>清除记录</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            保存 <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            另存为… <MenubarShortcut>⇧⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            打印… <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>编辑</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            撤销 <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            重做 <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            剪切 <MenubarShortcut>⌘X</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            复制 <MenubarShortcut>⌘C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            粘贴 <MenubarShortcut>⌘V</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            查找与替换 <MenubarShortcut>⌘F</MenubarShortcut>
          </MenubarItem>
          <MenubarItem variant="destructive">删除选中内容</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>视图</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            放大 <MenubarShortcut>⌘+</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            缩小 <MenubarShortcut>⌘−</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            实际大小 <MenubarShortcut>⌘0</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            进入全屏 <MenubarShortcut>⌃⌘F</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>帮助</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>使用指南</MenubarItem>
          <MenubarItem>
            键盘快捷键 <MenubarShortcut>⌘/</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>反馈问题</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

### 勾选与单选
Source: apps/docs/src/content/menubar/demos/02-options.tsx
```tsx
import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarLabel, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarTrigger } from "@qingye/ui/components/menubar";
import { useState } from "react";

export const meta = { title: "勾选与单选", description: "视图选项用 CheckboxItem，互斥选项用 RadioGroup。" };

export default function Demo() {
  const [rulers, setRulers] = useState(true);
  const [grid, setGrid] = useState(false);
  const [zoom, setZoom] = useState("fit");

  return (
    <div className="flex flex-col items-center gap-3">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>视图</MenubarTrigger>
          <MenubarContent>
            <MenubarGroup>
              <MenubarLabel>辅助线</MenubarLabel>
              <MenubarCheckboxItem checked={rulers} onCheckedChange={setRulers}>
                显示标尺
              </MenubarCheckboxItem>
              <MenubarCheckboxItem checked={grid} onCheckedChange={setGrid}>
                显示网格
              </MenubarCheckboxItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarLabel>缩放</MenubarLabel>
              <MenubarRadioGroup onValueChange={(value) => setZoom(String(value))} value={zoom}>
                <MenubarRadioItem value="fit">适应窗口</MenubarRadioItem>
                <MenubarRadioItem value="100">100%</MenubarRadioItem>
                <MenubarRadioItem value="200">200%</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>排列</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem defaultChecked>吸附到像素</MenubarCheckboxItem>
            <MenubarCheckboxItem>吸附到对象</MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu disabled>
          <MenubarTrigger>插件</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
      <p className="text-muted-foreground text-xs numeric">
        标尺{rulers ? "开" : "关"} · 网格{grid ? "开" : "关"} · 缩放 {zoom === "fit" ? "适应窗口" : `${zoom}%`}
      </p>
    </div>
  );
}
```


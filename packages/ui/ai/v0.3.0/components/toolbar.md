# 工具栏 Toolbar

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/toolbar
Source: packages/ui/src/components/toolbar.tsx
Source SHA-256: 89cd361d27ed86cab68e37289a034c00c066790f96024d4a52abc7ca643051d0

把一组相关控件（格式按钮、切换组、下拉选择）收进同一个可键盘漫游的容器，例如编辑器顶部的格式栏。

## Use and ownership
- 把一组相关控件（格式按钮、切换组、下拉选择）收进同一个可键盘漫游的容器，例如编辑器顶部的格式栏。
- Avoid: 不要让样式替代语义；空值、未知与零分别表达。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 数据、权限、动作范围、异步结果与持久化。

## Current exports
- Toolbar: function; owner toolbar; PASS; props: ToolbarPrimitive.Root.Props
- ToolbarButton: function; owner toolbar; PASS; props: ToolbarPrimitive.Button.Props
- ToolbarGroup: function; owner toolbar; PASS; props: ToolbarPrimitive.Group.Props
- ToolbarInput: function; owner toolbar; PASS; props: ToolbarPrimitive.Input.Props
- ToolbarLink: function; owner toolbar; PASS; props: ToolbarPrimitive.Link.Props
- ToolbarPrimitive: reexport; owner toolbar; UNVERIFIED
- ToolbarSeparator: function; owner toolbar; PASS; props: ToolbarPrimitive.Separator.Props

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Toolbar
容器：卡片底色、细边框与 4px 内边距。整个工具栏只占一个 Tab 停靠点。
- orientation: "horizontal" | "vertical"; default "horizontal". 排列方向，同时决定方向键（← → 或 ↑ ↓）。
- loopFocus: boolean; default true. 焦点到末尾后是否回到开头。

### ToolbarButton
工具栏中的按钮，本身不带样式；通过 render 渲染为 Button、ToggleGroupItem 或 SelectTrigger。
- render: ReactElement. 实际渲染的控件，例如 <Button size="icon" variant="ghost" />。
- disabled: boolean; default false. 禁用后仍可聚焦，便于读屏用户发现它。

### ToolbarGroup
把几项归为一组，间距 4px；可整体禁用。

### ToolbarSeparator
组与组之间的分隔线，方向自动与工具栏垂直。

### ToolbarLink / ToolbarInput
参与键盘漫游的链接与输入框。

## Keyboard
- Tab: 进入或离开工具栏（整个工具栏只停一次）。
- ← / →: 在控件之间移动焦点（纵向工具栏为 ↑ / ↓）。
- Home / End: 跳到第一个 / 最后一个控件。

## Source examples
### 格式栏
Source: apps/docs/src/content/toolbar/demos/01-formatting.tsx
```tsx
import { Toggle } from "@qingye/ui/components/toggle";
import { ToggleGroup, ToggleGroupItem } from "@qingye/ui/components/toggle-group";
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from "@qingye/ui/components/toolbar";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

export const meta = {
  title: "格式栏",
  description: "Tab 进入后用方向键在按钮之间移动。",
};

export default function Demo() {
  return (
    <Toolbar aria-label="正文格式">
      <ToolbarGroup aria-label="字形">
        <ToolbarButton aria-label="加粗" render={<Toggle defaultPressed />}>
          <BoldIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="斜体" render={<Toggle />}>
          <ItalicIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="下划线" render={<Toggle />}>
          <UnderlineIcon />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToggleGroup aria-label="对齐方式" defaultValue={["left"]}>
        <ToolbarButton aria-label="左对齐" render={<ToggleGroupItem value="left" />}>
          <AlignLeftIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="居中" render={<ToggleGroupItem value="center" />}>
          <AlignCenterIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="右对齐" render={<ToggleGroupItem value="right" />}>
          <AlignRightIcon />
        </ToolbarButton>
      </ToggleGroup>
    </Toolbar>
  );
}
```

### 下拉与主操作
Source: apps/docs/src/content/toolbar/demos/02-select-action.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye/ui/components/select";
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from "@qingye/ui/components/toolbar";
import { Redo2Icon, Undo2Icon } from "lucide-react";

export const meta = {
  title: "下拉与主操作",
  description: "SelectTrigger 与 Button 同样通过 render 接入键盘漫游；用 ms-auto 把主操作推到末端。",
};

const fonts = [
  { label: "思源黑体", value: "source-han-sans" },
  { label: "思源宋体", value: "source-han-serif" },
  { label: "霞鹜文楷", value: "lxgw-wenkai" },
];

export default function Demo() {
  return (
    <Toolbar aria-label="文档工具" className="w-full max-w-md">
      <ToolbarGroup>
        <ToolbarButton aria-label="撤销" render={<Button size="icon" variant="ghost" />}>
          <Undo2Icon />
        </ToolbarButton>
        <ToolbarButton aria-label="重做" disabled render={<Button size="icon" variant="ghost" />}>
          <Redo2Icon />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <Select defaultValue="source-han-sans" items={fonts}>
        <ToolbarButton
          render={
            <SelectTrigger aria-label="字体" className="w-auto min-w-28">
              <SelectValue />
            </SelectTrigger>
          }
        />
        <SelectPopup>
          {fonts.map((font) => (
            <SelectItem key={font.value} value={font.value}>
              {font.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
      <ToolbarButton className="ms-auto" render={<Button />}>
        发布
      </ToolbarButton>
    </Toolbar>
  );
}
```

### 纵向
Source: apps/docs/src/content/toolbar/demos/03-vertical.tsx
```tsx
import { ToggleGroup, ToggleGroupItem } from "@qingye/ui/components/toggle-group";
import { Toolbar, ToolbarButton } from "@qingye/ui/components/toolbar";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye/ui/components/tooltip";
import { HandIcon, MousePointer2Icon, SquareIcon, TypeIcon } from "lucide-react";

export const meta = {
  title: "纵向",
  description: "画布工具条：orientation=\"vertical\" 后方向键改为上下，提示从右侧出现。",
};

const tools = [
  { value: "select", label: "选择", icon: MousePointer2Icon },
  { value: "hand", label: "抓手", icon: HandIcon },
  { value: "rect", label: "矩形", icon: SquareIcon },
  { value: "text", label: "文本", icon: TypeIcon },
];

export default function Demo() {
  return (
    <Toolbar aria-label="画布工具" orientation="vertical">
      <ToggleGroup aria-label="当前工具" className="flex-col" defaultValue={["select"]} orientation="vertical">
        {tools.map((tool) => (
          <Tooltip key={tool.value}>
            <TooltipTrigger
              render={
                <ToolbarButton aria-label={tool.label} render={<ToggleGroupItem value={tool.value} />}>
                  <tool.icon />
                </ToolbarButton>
              }
            />
            <TooltipPopup side="right" sideOffset={8}>
              {tool.label}
            </TooltipPopup>
          </Tooltip>
        ))}
      </ToggleGroup>
    </Toolbar>
  );
}
```


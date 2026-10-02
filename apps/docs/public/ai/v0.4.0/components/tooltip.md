# 文字提示 Tooltip

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/tooltip
Source: packages/ui/src/components/tooltip.tsx
Source SHA-256: e6bb7916da7c87bee93a011538823cdf4da4b04a57b3450b0a8e16c2bd394e99

悬停或聚焦时出现的简短说明，常用于解释图标按钮或展示快捷键。内容只能是纯文本提示，不放可交互元素。

## Use and ownership
- 补充图标名称、快捷键或短解释，供悬停与键盘聚焦时阅读。
- Avoid: 不能承担控件唯一可访问名称、关键后果、错误恢复或交互元素。
- Library: 管理提示延迟、trigger 关联、Esc 关闭与位置，提示不接管执行状态。
- Application: 决定是否有必要补充以及文本与动作事实是否一致。

## Composition
- 图标 Button 自带 aria-label；应用根挂 TooltipProvider，点击式帮助用 Popover 的 tooltipStyle。

## Responsive behavior
- 长词按可用宽度换行；触屏缺少悬停时正文或点击帮助仍可获得必需信息。

## Customization
- 用 side、align、anchor 调整位置；简短内容共享主题表面，避免逐个自定义延迟。

## Current exports
- Tooltip: const; owner tooltip; PASS
- TooltipContent: function; owner tooltip; alias of TooltipPopup; PASS; props: TooltipPrimitive.Popup.Props & {
  align?: TooltipPrimitive.Positioner.Props["align"];
  alignOffset?: TooltipPrimitive.Positioner.Props["alignOffset"];
  side?: TooltipPrimitive.Positioner.Props["side"];
  sideOffset?: TooltipPrimitive.Positioner.Props["sideOffset"];
  anchor?: TooltipPrimitive.Positioner.Props["anchor"];
  portalProps?: TooltipPrimitive.Portal.Props;
}
- TooltipCreateHandle: const; owner tooltip; PASS
- TooltipPopup: function; owner tooltip; PASS; props: TooltipPrimitive.Popup.Props & {
  align?: TooltipPrimitive.Positioner.Props["align"];
  alignOffset?: TooltipPrimitive.Positioner.Props["alignOffset"];
  side?: TooltipPrimitive.Positioner.Props["side"];
  sideOffset?: TooltipPrimitive.Positioner.Props["sideOffset"];
  anchor?: TooltipPrimitive.Positioner.Props["anchor"];
  portalProps?: TooltipPrimitive.Portal.Props;
}
- TooltipPrimitive: reexport; owner tooltip; UNVERIFIED
- TooltipProvider: const; owner tooltip; PASS
- TooltipTrigger: function; owner tooltip; PASS; props: TooltipPrimitive.Trigger.Props

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- 文档站与应用都应在根部挂载一次 TooltipProvider，不要在每个提示外再包一层。
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### TooltipProvider
在应用根部挂载一次。相邻的提示共享延迟：第一个按默认延迟出现，移动到下一个时立即显示。
- delay: number; default 600. 首次悬停到出现的等待时间（毫秒）。保留默认值，避免鼠标划过时到处弹出。
- closeDelay: number; default 0. 离开后关闭前的等待时间。

### Tooltip
根组件。
- open / defaultOpen: boolean; default false. 受控 / 非受控的打开状态。
- onOpenChange: (open, details) => void. 打开状态变化时调用。
- disabled: boolean; default false. 临时停用提示。
- handle: TooltipCreateHandle(). 多个触发器共用一个提示，切换时提示平滑移动。

### TooltipTrigger
触发元素；用 render 渲染为 Button 等控件。
- delay / closeDelay: number. 单独覆盖 Provider 的延迟。

### TooltipPopup
提示本体。别名 TooltipContent。
- side: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"; default "top". 相对触发器的方向，空间不足时自动翻转。
- align: "start" | "center" | "end"; default "center". 沿边的对齐方式。
- sideOffset / alignOffset: number; default 4 / 0. 与触发器的距离 / 对齐偏移。

## Keyboard
- Tab: 聚焦触发器时显示提示。
- Esc: 关闭提示，焦点保持在触发器上。

## Source examples
### 图标按钮
Source: apps/docs/src/content/tooltip/demos/01-icon-buttons.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye/ui/components/tooltip";
import { CopyIcon, DownloadIcon, PencilIcon, Trash2Icon } from "lucide-react";

export const meta = {
  title: "图标按钮",
  description: "第一次悬停按默认延迟出现；在相邻按钮间移动时立即切换，不再等待。",
};

const actions = [
  { label: "编辑", icon: PencilIcon },
  { label: "复制", icon: CopyIcon },
  { label: "下载", icon: DownloadIcon },
  { label: "删除", icon: Trash2Icon },
];

export default function Demo() {
  return (
    <div className="flex gap-1">
      {actions.map(({ label, icon: Icon }) => (
        <Tooltip key={label}>
          <TooltipTrigger render={<Button aria-label={label} size="icon" variant="ghost" />}>
            <Icon />
          </TooltipTrigger>
          <TooltipPopup>{label}</TooltipPopup>
        </Tooltip>
      ))}
    </div>
  );
}
```

### 方向
Source: apps/docs/src/content/tooltip/demos/02-sides.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye/ui/components/tooltip";

export const meta = { title: "方向", description: "默认在上方；side 指定其他方向，空间不足时自动翻转。" };

const sides = [
  { side: "top", label: "上方" },
  { side: "right", label: "右侧" },
  { side: "bottom", label: "下方" },
  { side: "left", label: "左侧" },
] as const;

export default function Demo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {sides.map(({ side, label }) => (
        <Tooltip key={side}>
          <TooltipTrigger render={<Button variant="outline" />}>{label}</TooltipTrigger>
          <TooltipPopup side={side}>显示在{label}</TooltipPopup>
        </Tooltip>
      ))}
    </div>
  );
}
```

### 附带快捷键
Source: apps/docs/src/content/tooltip/demos/03-shortcut.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Kbd, KbdGroup } from "@qingye/ui/components/kbd";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye/ui/components/tooltip";
import { SaveIcon, SearchIcon } from "lucide-react";

export const meta = { title: "附带快捷键", description: "在提示里用 Kbd 标出快捷键，帮助用户逐步记住。" };

export default function Demo() {
  return (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger render={<Button aria-label="搜索" size="icon" variant="outline" />}>
          <SearchIcon />
        </TooltipTrigger>
        <TooltipPopup>
          <span className="flex items-center gap-2">
            搜索
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </span>
        </TooltipPopup>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          <SaveIcon />
          保存草稿
        </TooltipTrigger>
        <TooltipPopup>
          <span className="flex items-center gap-2">
            保存到本机
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>S</Kbd>
            </KbdGroup>
          </span>
        </TooltipPopup>
      </Tooltip>
    </div>
  );
}
```

### 工具栏共用提示
Source: apps/docs/src/content/tooltip/demos/04-shared.tsx
```tsx
import { ToggleGroup, ToggleGroupItem } from "@qingye/ui/components/toggle-group";
import { Tooltip, TooltipCreateHandle, TooltipPopup, TooltipTrigger } from "@qingye/ui/components/tooltip";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";

export const meta = {
  title: "工具栏共用提示",
  description: "通过 handle 让一组触发器共用一个提示，切换时提示跟随移动，而不是闪烁重建。",
};

const handle = TooltipCreateHandle<string>();

const items = [
  { value: "left", label: "左对齐", icon: AlignLeftIcon },
  { value: "center", label: "居中对齐", icon: AlignCenterIcon },
  { value: "right", label: "右对齐", icon: AlignRightIcon },
];

export default function Demo() {
  return (
    <>
      <ToggleGroup defaultValue={["left"]}>
        {items.map(({ value, label, icon: Icon }) => (
          <TooltipTrigger
            handle={handle}
            key={value}
            payload={label}
            render={<ToggleGroupItem aria-label={label} value={value} />}
          >
            <Icon />
          </TooltipTrigger>
        ))}
      </ToggleGroup>
      <Tooltip handle={handle}>{({ payload }) => <TooltipPopup>{payload}</TooltipPopup>}</Tooltip>
    </>
  );
}
```


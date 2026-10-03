# 文字提示 Tooltip

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/tooltip
Source: packages/ui/src/components/tooltip.tsx
Source SHA-256: 6972d75fc5562f802db893b986cb6a7617fb6309ce4f502074ad85efbb26e20b

悬停或聚焦时阅读快捷键、格式与短解释。

## Use and ownership
- 在已可辨认的对象或动作旁补充快捷键、格式或简短上下文。
- Avoid: 唯一名称、唯一关键后果、禁用原因、失败恢复或可交互内容。
- Library: 聚焦/悬停展开、关联、延迟、定位与 Esc。
- Application: 补充内容与受控 open。

## Composition
- 控件自带名称；Tooltip 关联补充文字；持续结果放在对象旁。

## Responsive behavior
- 按原语可用宽度换行；控制文字保留窄屏角色，必要信息始终可见。

## Customization
- 应用根共享延迟；使用已有表面、阴影和圆角 token。

## Current exports
- Tooltip: function; owner tooltip; PASS; props: TooltipPrimitive.Root.Props<Payload>
- TooltipContent: function; owner tooltip; alias of TooltipPopup; PASS; props: TooltipPopupProps
- TooltipCreateHandle: const; owner tooltip; UNVERIFIED
- TooltipPopup: function; owner tooltip; PASS; props: TooltipPopupProps
- TooltipPrimitive: reexport; owner tooltip; UNVERIFIED
- TooltipProvider: const; owner tooltip; UNVERIFIED
- TooltipTrigger: function; owner tooltip; PASS; props: TooltipPrimitive.Trigger.Props

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, react
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### TooltipProvider
共享指针延迟。键盘聚焦立即展开。
- delay: number; default 600. 首次悬停等待毫秒数，原语预设，可由应用覆盖。
- closeDelay: number; default 0. 离开触发者和提示后的等待时间。
- timeout: number; default 400. 连续提示立即展开的共享窗口，原语预设。

### Tooltip
非阻断打开状态。提示可被悬停，不接收交互内容。
- open / defaultOpen: boolean; default false. 受控 / 非受控打开。
- onOpenChange: (open, details) => void. 接收实际请求与原因；受控值由应用决定。
- disabled: boolean; default false. 停用提示，不停用触发控件的动作。
- disableHoverablePopup: boolean; default false. 类型保留兼容；包装始终使用 false，满足可悬停约束。
- trackCursorAxis: "none" | "x" | "y" | "both"; default none. both 归一为 none，以保留指针移入提示的通路；其余取值透传。
- handle / triggerId / defaultTriggerId: Handle / string. 关联共享触发者及受控或初始展开。

### TooltipTrigger
支持 render、ref、事件、ARIA 和按状态求值的 className。
- delay / closeDelay: number. 覆盖当前触发者的指针延迟。
- disabled: boolean; default false. 仅停用提示。原生禁用动作通过 render 的控件声明。

### TooltipPopup / TooltipContent
提示正文与定位。可换行；入退由 motion.css 管理。
- side / align: Positioner.Props; default top / center. 原语默认位置，空间不足时自动翻转。
- sideOffset / alignOffset / anchor: Positioner.Props; default 0 / 0 / trigger. 相对锚点的显式位置关系。
- portalProps: Portal.Props. container 可保留局部语言、方向和密度。默认挂到 body。

### TooltipCreateHandle / TooltipPrimitive
共享触发者的类型化 handle 与 Base UI 公共原语。

## Keyboard
- Tab / Shift+Tab: 聚焦即显示，离开时关闭；不困住焦点。
- Esc: 收起提示，焦点保持当前触发者。

## Source examples
### 文字格式
Source: apps/docs/src/content/tooltip/demos/01-icon-buttons.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye/ui/components/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye/ui/components/tooltip";
import { BoldIcon, ItalicIcon } from "lucide-react";

export const meta = { title: "文字格式" };

export default function Demo() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  return (
    <div className="flex flex-col gap-(--qy-field-group-gap)">
      <div className="flex gap-(--qy-action-gap)">
        <Tooltip>
          <TooltipTrigger render={<Button variant="quiet" shape="icon" aria-label="粗体" aria-pressed={bold} onClick={() => setBold(!bold)} />}><BoldIcon aria-hidden="true" /></TooltipTrigger>
          <TooltipPopup>强调项目名称</TooltipPopup>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="quiet" shape="icon" aria-label="斜体" aria-pressed={italic} onClick={() => setItalic(!italic)} />}><ItalicIcon aria-hidden="true" /></TooltipTrigger>
          <TooltipPopup>标记作品名称或引用</TooltipPopup>
        </Tooltip>
      </div>
      <p className="text-body text-foreground" aria-live="polite">{bold ? <strong>{italic ? <em>青野组件库</em> : "青野组件库"}</strong> : italic ? <em>青野组件库</em> : "青野组件库"}</p>
    </div>
  );
}
```

### 位置
Source: apps/docs/src/content/tooltip/demos/02-sides.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye/ui/components/tooltip";

export const meta = { title: "位置", titleEn: "Placement" };

const places = [
  { side: "top", label: "上方" },
  { side: "right", label: "右侧" },
  { side: "bottom", label: "下方" },
  { side: "left", label: "左侧" },
] as const;

export default function Demo() {
  return <div className="flex gap-(--qy-action-gap)">{places.map(({ side, label }) => <Tooltip key={side}><TooltipTrigger render={<Button variant="quiet" />}>{label}</TooltipTrigger><TooltipPopup side={side}>{side}</TooltipPopup></Tooltip>)}</div>;
}
```

### 快捷键
Source: apps/docs/src/content/tooltip/demos/03-shortcut.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye/ui/components/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye/ui/components/tooltip";
import { BoldIcon } from "lucide-react";

export const meta = { title: "快捷键" };

export default function Demo() {
  const [bold, setBold] = useState(false);
  return (
    <div className="flex items-center gap-(--qy-field-group-gap)" onKeyDown={(event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "b") {
        event.preventDefault();
        setBold((value) => !value);
      }
    }}>
      <Tooltip>
        <TooltipTrigger render={<Button aria-label="粗体" aria-pressed={bold} variant="quiet" shape="icon" onClick={() => setBold((value) => !value)} />}><BoldIcon aria-hidden="true" /></TooltipTrigger>
        <TooltipPopup><kbd>⌘B / Ctrl+B</kbd></TooltipPopup>
      </Tooltip>
      <p className="text-body text-foreground">{bold ? <strong>让器物服务于人</strong> : "让器物服务于人"}</p>
    </div>
  );
}
```

### 段落对齐
Source: apps/docs/src/content/tooltip/demos/04-shared.tsx
```tsx
import { useMemo, useState } from "react";
import { Button } from "@qingye/ui/components/button";
import { Tooltip, TooltipCreateHandle, TooltipPopup, TooltipTrigger } from "@qingye/ui/components/tooltip";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";

export const meta = { title: "段落对齐" };

const items = [
  { value: "left", label: "左对齐", detail: "段落靠左边缘排列", icon: AlignLeftIcon },
  { value: "center", label: "居中对齐", detail: "段落沿中央排列", icon: AlignCenterIcon },
  { value: "right", label: "右对齐", detail: "段落靠右边缘排列", icon: AlignRightIcon },
] as const;

export default function Demo() {
  const handle = useMemo(() => TooltipCreateHandle<string>(), []);
  const [align, setAlign] = useState<"left" | "center" | "right">("left");
  return <div className="flex flex-col gap-(--qy-field-group-gap)"><div role="group" aria-label="段落对齐" className="flex gap-(--qy-action-gap)">{items.map(({ value, label, detail, icon: Icon }) => <TooltipTrigger handle={handle} key={value} payload={detail} render={<Button variant="quiet" shape="icon" aria-label={label} aria-pressed={align === value} onClick={() => setAlign(value)} />}><Icon aria-hidden="true" /></TooltipTrigger>)}</div><Tooltip handle={handle}>{({ payload }) => <TooltipPopup>{payload}</TooltipPopup>}</Tooltip><p className="text-body text-foreground" style={{ textAlign: align }}>青野组件库，器用为本。</p></div>;
}
```


# Resizable

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/resizable
Source: packages/ui/src/components/resizable.tsx
Source SHA-256: 475ad2f99677a4a8568db306872ef7323f3f3386300065365e1086cbbc386a74

Draggable separators between two or more panels that change how the space is shared.

## Decision
A separator changes only the two panels around it; the rest stay put and the shares always add up to 100. Pixel limits ("240px") are converted with the measured group length and do not apply when no length can be measured. Collapsing belongs to the panel: it is triggered by the pointer passing the midpoint between collapsed and minimum size, or by Enter on the separator. What the content does when collapsed, and how it is reopened, is up to the application.

## Notes
- The 10% arrow step is a preset; APG does not prescribe one.
- The hit area is 8px with a fine pointer and 44px with a coarse one; only a line is visible.
- Panels clip overflow: put content that needs to scroll in a ScrollArea.

## Use and ownership
- The share between two blocks side by side (or stacked) should be adjusted by the user, such as a list on the left and details on the right.
- Avoid: Use plain flex or grid when the shares are fixed, and Separator when only a dividing line is needed.
- Library: Solving and clamping each panel's share, dragging and keys, collapse state, writing direction.
- Application: Whether the layout is persisted (onLayout / layout), how a collapsed panel is reopened, and the panel content.

## Composition
- Put content that scrolls itself in the panels (ScrollArea, Tree, DataTable). Name the separator after the main panel it resizes, for example "List".

## Responsive behavior
- Shares are relative to the group. Whether a narrow screen stacks the panels or switches to a single pane is up to the application; the component does not swap layouts.

## Customization
- Line width and ink read the system line width and ink ladder; the hit area and the keyboard step are presets. className merges last and native attributes forward.

## Current exports
- RESIZABLE_KEYBOARD_STEP: const; owner resizable; UNVERIFIED
- ResizableBound: type; owner resizable; PASS
- ResizableHandle: function; owner resizable; PASS; props: ResizableHandleProps
- ResizableHandleProps: type; owner resizable; PASS
- ResizableOrientation: type; owner resizable; PASS
- ResizablePanel: function; owner resizable; PASS; props: ResizablePanelProps
- ResizablePanelGroup: function; owner resizable; PASS; props: ResizablePanelGroupProps
- ResizablePanelGroupProps: type; owner resizable; PASS
- ResizablePanelProps: type; owner resizable; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### ResizableHandle
- no props declared by this library
- plus 280 inherited (@types/react 280); not expanded, see the installed declarations

### ResizablePanel
- `collapsedSize?`: `number`. 折叠后的百分比。默认 0。
- `collapsible?`: `boolean`. 允许折叠：指针拖过「折叠值与最小值的中点」吸附折叠，分隔条上 Enter 折叠 / 还原。
- `defaultSize?`: `number`. 初始百分比。省略的面板均分其余部分。
- `maxSize?`: `ResizableBound`. 上限，写法同 minSize。省略为 100。
- `minSize?`: `ResizableBound`. 下限：数字是百分比，`"240px"` 是像素。省略为 0。
- `onCollapse?`: `() => void`.
- `onExpand?`: `() => void`.
- plus 279 inherited (@types/react 279); not expanded, see the installed declarations

### ResizablePanelGroup
- `layout?`: `number[]`. 受控布局，按面板出现的顺序。长度与面板数不符时忽略，退回内部状态。
- `onLayout?`: `(sizes: number[]) => void`. 一次拖动或一次按键调整结束时调用，参数是各面板的百分比（和为 100）。
- `orientation?`: `"horizontal" | "vertical"`. 面板的排列方向。`horizontal` 左右并排（分隔条是竖线）。
- plus 280 inherited (@types/react 280); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale
- Context GroupContext: without a provider throws; provided by ResizablePanelGroup

## Curated API
Written descriptions; the list above is the type-resolved fact.

### ResizablePanelGroup
A flex container that lays out panels and separators along orientation and measures its own length to convert pixel limits.
- orientation: "horizontal" | "vertical"; default "horizontal". Direction the panels are laid out. Horizontal places them side by side with vertical separators.
- onLayout: (sizes: number[]) => void. Called when a drag or a key press finishes, with the percentages in panel order adding up to 100. Not called for corrections caused by the group changing length.
- layout: number[]. Controlled layout in panel order; ignored when its length differs from the panel count. Intermediate drag values are display-only; onLayout is called on release.
- className / ref / div props: ComponentProps<"div">. Applied to the container. It fills its parent by default; give it a height through the parent or className.

### ResizablePanel
A panel whose size is decided by the group; overflowing content is clipped.
- id: string. Panel id, used as aria-controls of the separator before it. Generated when omitted.
- defaultSize: number. Initial percentage; panels without it share the rest equally.
- minSize / maxSize: number | `${number}px`; default 0 / 100. A number is a percentage, "240px" is pixels, converted with the group's usable length (separators excluded).
- collapsible / collapsedSize: boolean / number; default false / 0. Allow collapsing and the percentage kept when collapsed. The pointer snaps to collapsed past the midpoint between collapsed and minimum size; arrow keys never collapse.
- onCollapse / onExpand: () => void. Called when the panel collapses or is restored. A collapsed panel carries data-collapsed.

### ResizableHandle
The separator: role="separator", focusable, resizing the panels before and after it.
- aria-label / aria-labelledby: string. One is required and a missing name throws. Name it after the main (previous) panel it resizes, for example "List".
- className / ref / div props: ComponentProps<"div">. Applied to the separator. aria-orientation, aria-valuenow / min / max and aria-controls come from the component; valuenow is the previous panel's percentage.

## Keyboard
- Left Right / Up Down: Left and right in a horizontal group, up and down in a vertical one, 10 percentage points at a time. Left and right swap in right-to-left text.
- Home / End: Move the previous panel to its smallest or largest size, counting a collapsed state.
- Enter: Collapse or restore the adjacent collapsible panel, the previous one first.

## Source examples
### 左右两栏
Source: apps/docs/src/content/resizable/demos/01-two-panes.tsx
```tsx
import { useState } from "react";
import { Item } from "@qingye_lab/ui/components/item";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@qingye_lab/ui/components/resizable";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "左右两栏", titleEn: "Two panes" } satisfies DemoMeta;

export default function Demo() {
  const { code } = useUILocale();
  const en = code.startsWith("en");
  const names = en ? ["Alpha", "Bravo", "Charlie", "Delta"] : ["甲", "乙", "丙", "丁"];
  const [current, setCurrent] = useState(0);
  const [layout, setLayout] = useState<number[]>([]);
  return <div className="flex w-full flex-col gap-(--qy-field-group-gap)">
    <ResizablePanelGroup className="h-[calc(10*var(--qy-cai))] rounded-panel border border-border" onLayout={setLayout}>
      <ResizablePanel id="resizable-demo-list" defaultSize={30} minSize="160px" maxSize={60}>
        {/* 横向内边距 = Item 行入口向两侧外扩的量，命中区正好贴到面板内缘。 */}
        <ul className="m-0 flex list-none flex-col px-(--qy-control-sm-padding) py-(--qy-panel-padding-sm)">
          {names.map((name, index) => <li key={name}><Item render={<button type="button" />} aria-current={index === current ? "true" : undefined} onClick={() => setCurrent(index)} className="aria-[current=true]:bg-surface-selected aria-[current=true]:font-medium">{name}</Item></li>)}
        </ul>
      </ResizablePanel>
      <ResizableHandle aria-label={en ? "List" : "列表"} />
      <ResizablePanel id="resizable-demo-detail" defaultSize={70} minSize={30}>
        <p className="m-0 p-(--qy-panel-padding) text-body">{names[current]}</p>
      </ResizablePanel>
    </ResizablePanelGroup>
    <p className="m-0 text-support text-muted-foreground numeric">{layout.length ? layout.map(value => `${Math.round(value)}%`).join(" / ") : "30% / 70%"}</p>
  </div>;
}
```

### 可折叠
Source: apps/docs/src/content/resizable/demos/02-collapsible.tsx
```tsx
import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@qingye_lab/ui/components/resizable";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "可折叠", titleEn: "Collapsible" } satisfies DemoMeta;

export default function Demo() {
  const { code } = useUILocale();
  const en = code.startsWith("en");
  const [collapsed, setCollapsed] = useState(false);
  return <div className="flex w-full flex-col gap-(--qy-field-group-gap)">
    <ResizablePanelGroup orientation="vertical" className="h-[calc(10*var(--qy-cai))] rounded-panel border border-border">
      <ResizablePanel defaultSize={70} minSize={30}><p className="m-0 p-(--qy-panel-padding) text-body">{en ? "Content" : "正文"}</p></ResizablePanel>
      <ResizableHandle aria-label={en ? "Content" : "正文"} />
      <ResizablePanel id="resizable-demo-console" defaultSize={30} minSize={20} collapsible onCollapse={() => setCollapsed(true)} onExpand={() => setCollapsed(false)}>
        <p className="m-0 p-(--qy-panel-padding) text-body">{en ? "Output" : "输出"}</p>
      </ResizablePanel>
    </ResizablePanelGroup>
    <p className="m-0 text-support text-muted-foreground">{collapsed ? (en ? "Output collapsed" : "输出已折叠") : (en ? "Output expanded" : "输出已展开")}</p>
  </div>;
}
```

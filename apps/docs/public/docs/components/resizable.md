# 分栏 Resizable

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/resizable
Source: packages/ui/src/components/resizable.tsx
Source SHA-256: 475ad2f99677a4a8568db306872ef7323f3f3386300065365e1086cbbc386a74

两个或多个面板之间放可拖动的分隔条，调整各自占比。

## Decision
分隔条只改变它前后两个面板，其余面板不动，占比总和恒为 100。像素下限（"240px"）按组的实际长度换算，量不到长度时不生效。折叠是面板自己的状态，由指针越过折叠与最小值的中点、或分隔条上的 Enter 触发；内容是否随之隐藏、折叠后如何再打开由应用决定。

## Notes
- 方向键的步长 10% 是预设；APG 没有规定步长。
- 分隔条的命中区在细指针下为 8px、粗指针下为 44px，可见的只是一条线。
- 面板裁切溢出：需要滚动的内容自己放进 ScrollArea。

## Use and ownership
- 左右（或上下）两块内容的占比需要由使用者调整，例如左列表、右详情。
- Avoid: 占比固定不变时用普通的 flex 或 grid；只需要一条分界线时用 Separator。
- Library: 各面板占比的求解与夹紧、拖动与按键、折叠状态、书写方向。
- Application: 占比是否持久化（onLayout / layout）、折叠后的入口、面板里的内容。

## Composition
- 面板内放 ScrollArea、Tree、DataTable 等自己负责滚动的内容；分隔条的名称写它调整的主面板，如「列表」。

## Responsive behavior
- 占比相对分栏组；窄屏是否改成上下排列或单栏切换由应用决定，组件不替换布局。

## Customization
- 线宽与墨色读系统线宽和墨阶；命中区、键盘步长为预设。className 最后合并，原生属性透传。

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
弹性容器，按 orientation 排列面板与分隔条，并量取自身长度以换算像素界限。
- orientation: "horizontal" | "vertical"; default "horizontal". 面板的排列方向。horizontal 左右并排，分隔条是竖线。
- onLayout: (sizes: number[]) => void. 一次拖动或一次按键调整结束时调用，参数是按面板顺序的百分比，和为 100。组长度变化引起的界限修正不调用。
- layout: number[]. 受控布局，按面板顺序。长度与面板数不符时忽略。拖动中的中间值只用于显示，松手时才调用 onLayout。
- className / ref / div props: ComponentProps<"div">. 作用于容器；默认撑满父元素，高度由父元素或 className 给出。

### ResizablePanel
一个面板，大小由分栏组决定；内容超出时被裁切。
- id: string. 面板 id，也是前一个分隔条的 aria-controls。省略时自动生成。
- defaultSize: number. 初始百分比；省略的面板均分其余部分。
- minSize / maxSize: number | `${number}px`; default 0 / 100. 数字是百分比，"240px" 是像素。像素按组的可用长度（扣除分隔条）换算。
- collapsible / collapsedSize: boolean / number; default false / 0. 允许折叠，折叠后保留的百分比。指针越过折叠值与最小值的中点吸附折叠；方向键不会折叠。
- onCollapse / onExpand: () => void. 折叠或还原时调用。折叠中的面板带 data-collapsed。

### ResizableHandle
分隔条，role="separator"，可聚焦，调整它前后两个面板。
- aria-label / aria-labelledby: string. 必填其一，缺失时抛错。名称写它调整的主面板（前一个面板），如「列表」。
- className / ref / div props: ComponentProps<"div">. 作用于分隔条；aria-orientation、aria-valuenow / min / max、aria-controls 由组件给出，valuenow 是前一个面板的百分比。

## Keyboard
- ← → / ↑ ↓: 横向分栏用左右键，纵向分栏用上下键，每次移动 10 个百分点；从右向左书写时左右键含义对调。
- Home / End: 前一个面板取最小 / 最大（折叠面板计入）。
- Enter: 折叠或还原可折叠的相邻面板，优先前一个。

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

# Drawer

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/drawer
Source: packages/ui/src/components/drawer.tsx
Source SHA-256: 63395abb3d4f641fe6170a87574be325b93daf28603ddc2e868606f68a69d652

Enter an edge-aligned work surface and return to its entry point.

## Decision
Public swipeDirection controls the edge. Actual modality controls focus and background blocking; closing does not imply undo.

## Notes
- To pull a drawer out from the screen edge, place DrawerPrimitive.SwipeArea as an invisible edge hot zone (its swipe direction defaults to the opposite of the Drawer swipeDirection); the caller gives its position and width. It is not a control and is not in the Tab order, so a visible trigger is still required. The library does not wrap it.
- Specify finalFocus when opening programmatically without a trigger.
- For long content use DrawerHeader / DrawerContent / DrawerFooter: header and footer stay fixed and only DrawerContent scrolls; without DrawerContent the whole panel still scrolls.
- Applications handle drafts, saving, abandonment, and undo separately.
- Popup capacity is viewport constrained. Long content scrolls; left/right edges have no arbitrary fixed width.
- Shared FloatingLayerScope/useFloatingLayer order associated candidates and nested workspaces. Overriding zIndex can break this relationship.
- The contract was narrowed after actual ARIA checks: Portal fixes keepMounted=false even for JavaScript callers passing true. Applications explicitly retain drafts; custom Primitive composition still exposes the primitive's retained-Portal isolation defect.

## Use and ownership
- A task requires an edge workspace with an actual exit.
- Avoid: Treating slide direction as a different blocking semantic.
- Library: Actual open state, primitive gestures, focus, background blocking, and shared layers.
- Application: Inputs, drafts, and outcomes.

## Composition
- Title/Description/Content with existing Button/Input/Popover.

## Responsive behavior
- Content capacity is viewport constrained; the browser owner verifies this batch's gestures and actual desktop geometry.

## Customization
- Shared surfaces, lines, padding, radii, and motion.css; no independent size variant.

## Current exports
- Drawer: function; owner drawer; PASS; props: DrawerProps<Payload>
- DrawerClose: function; owner drawer; PASS; props: DrawerPrimitive.Close.Props
- DrawerContent: function; owner drawer; PASS; props: DrawerPrimitive.Content.Props
- DrawerCreateHandle: const; owner drawer; UNVERIFIED
- DrawerDescription: function; owner drawer; PASS; props: DrawerPrimitive.Description.Props
- DrawerFooter: function; owner drawer; PASS; props: DrawerGroupProps
- DrawerGroupProps: type; owner drawer; PASS
- DrawerHeader: function; owner drawer; PASS; props: DrawerGroupProps
- DrawerPopup: function; owner drawer; PASS; props: DrawerPopupProps
- DrawerPopupProps: type; owner drawer; PASS
- DrawerPrimitive: reexport; owner drawer; UNVERIFIED
- DrawerProps: type; owner drawer; PASS
- DrawerTitle: function; owner drawer; PASS; props: DrawerPrimitive.Title.Props
- DrawerTrigger: function; owner drawer; PASS; props: DrawerPrimitive.Trigger.Props<Payload>

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Drawer
- no props declared by this library
- plus 17 inherited (@base-ui/react 17); not expanded, see the installed declarations

### DrawerClose
- no props declared by this library
- plus 289 inherited (@types/react 285, @base-ui/react 4); not expanded, see the installed declarations

### DrawerContent
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### DrawerCreateHandle
- takes no props

### DrawerDescription
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### DrawerFooter
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### DrawerHeader
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### DrawerPopup
- `backdropProps?`: `DrawerPrimitive.Backdrop.Props`.
- `finalFocus?`: `DialogFocusTarget`.
- `initialFocus?`: `DialogFocusTarget`.
- `inset?`: `boolean`. 悬浮式：四边都离视口一段距离，四角圆、四边有线，成为浮在页面上的一张面板而不是从边上拉出的一段。 四个方向都可用；滑动关闭、吸附点与不加 inset 时完全相同。
- `portalProps?`: `Omit<DrawerPrimitive.Portal.Props, "keepMounted">`.
- `viewportProps?`: `DrawerPrimitive.Viewport.Props`.
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### DrawerTitle
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### DrawerTrigger
- no props declared by this library
- plus 291 inherited (@types/react 284, @base-ui/react 7); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context DrawerModality: without a provider default-value; provided by Drawer
- Context FloatingLayerContext: without a provider default-value; provided by FloatingLayerScope

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Drawer
Actual open state, direction, and blocking mode.
- open / defaultOpen / onOpenChange: DrawerPrimitive.Root.Props. Actual opening and cancelable requests; caller events run first and controlled refusal does not promote layers.
- modal: boolean | "trap-focus"; default true. Full blocking, nonblocking, or focus trapping only. Only full blocking shows a backdrop and declares aria-modal.
- swipeDirection: "down" | "up" | "left" | "right"; default "down". Exit direction and owning edge; retains public primitive gestures, snapPoints, and activeSnapPoint.
- snapPoints / snapPoint / defaultSnapPoint / onSnapPointChange: DrawerPrimitive.Root.Props. Snap points: numbers 0 to 1 are fractions of the viewport height, numbers above 1 are pixels, and '148px' / '30rem' strings work too. Only effective when swipeDirection is down or up; the default is the first; the popup must be taller than the largest snap point (for example className="h-full"). The active snap point is caller-owned and may be controlled.

### DrawerPopup
A composition of edge workspace, backdrop, and viewport.
- inset: boolean; default false. Floating variant: all four sides sit --qy-space-2 from the viewport (the same distance Workspace keeps for its sidebar and surface), with four rounded corners (rounded-overlay, the Dialog step) and four borders; available in all four directions. Swipe-to-close, snap points, focus and keyboard are identical to the edge-attached form; the exit animation travel accounts for the gap.
- initialFocus / finalFocus: DialogFocusTarget; default true. Defaults to the first control and trigger; callers may name meaningful focusable targets. false is not accepted.
- portalProps / backdropProps / viewportProps: DrawerPrimitive part props. Forwards native Portal, render, refs, events, and styles. Caller style merges last and can override default layers.

### DrawerTitle / DrawerDescription / DrawerContent
Actual names, necessary descriptions, and scrollable working content without invented business states.

### DrawerTrigger / DrawerClose
Use Button; Close reads locale.close when children are omitted.

## Keyboard
- Enter / Space: Open from the trigger.
- Tab / Shift+Tab: Navigate the workspace according to its actual modal setting.
- Esc: Close the current layer and return to its entry.

## Source examples
### 边缘工作面
Source: apps/docs/src/content/drawer/demos/01-states.tsx
```tsx
import { Drawer, DrawerClose, DrawerContent, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye_lab/ui/components/drawer";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
export const meta = { title: "边缘工作面", titleEn: "Edge workspace" };
export default function DrawerDemo() {
  return <Drawer swipeDirection="right">
    <DrawerTrigger>编辑名称</DrawerTrigger>
    <DrawerPopup className="w-80 content-start">
      <DrawerTitle>编辑名称</DrawerTitle>
      <DrawerContent className="content-start">
        <Field><FieldLabel>名称</FieldLabel><Input /></Field>
        <DrawerClose />
      </DrawerContent>
    </DrawerPopup>
  </Drawer>;
}
```

### 方向与嵌套返回
Source: apps/docs/src/content/drawer/demos/02-edges.tsx
```tsx
import { Drawer, DrawerClose, DrawerContent, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye_lab/ui/components/drawer";
import { Dialog, DialogClose, DialogPopup, DialogTitle, DialogTrigger } from "@qingye_lab/ui/components/dialog";
import { Popover, PopoverPopup, PopoverTrigger } from "@qingye_lab/ui/components/popover";
import { Input } from "@qingye_lab/ui/components/input";
import { Label } from "@qingye_lab/ui/components/label";
import { Inline } from "@qingye_lab/ui/components/layout";
import { useUILocale } from "@qingye_lab/ui/locale";
export const meta = { title: "方向与嵌套返回", titleEn: "Edges and nested return" };
// 方向按钮的文字说的是抽屉出现在哪一边，随语言切换；不是 swipeDirection 的属性值本身。
const EDGES = { left: ["左侧", "Left"], right: ["右侧", "Right"], up: ["上方", "Top"], down: ["下方", "Bottom"] } as const;
export default function DrawerDemo() {
  const { code } = useUILocale(); const en = code.startsWith("en");
  const t = (zh: string, enText: string) => en ? enText : zh;
  return <Inline gap="fields">{(["left", "right", "up", "down"] as const).map(direction => { const name = EDGES[direction][en ? 1 : 0]; return <Drawer key={direction} swipeDirection={direction}><DrawerTrigger>{name}</DrawerTrigger><DrawerPopup><DrawerTitle>{name}</DrawerTitle><DrawerContent><Label htmlFor={`drawer-${direction}`}>{t("输入", "Input")}</Label><Input id={`drawer-${direction}`} /><Popover><PopoverTrigger>{t("补充", "More")}</PopoverTrigger><PopoverPopup>{t("补充内容", "More details")}</PopoverPopup></Popover><Dialog><DialogTrigger>{t("内层", "Inner")}</DialogTrigger><DialogPopup><DialogTitle>{t("内层", "Inner")}</DialogTitle><DialogClose /></DialogPopup></Dialog><DrawerClose /></DrawerContent></DrawerPopup></Drawer>; })}</Inline>;
}
```

### 长内容
Source: apps/docs/src/content/drawer/demos/03-long.tsx
```tsx
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye_lab/ui/components/drawer";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";

export const meta = { title: "长内容", titleEn: "Long content" };

const fields = Array.from({ length: 16 }, (_, index) => `条件 ${index + 1}`);

export default function Demo() {
  return <Drawer swipeDirection="right">
    <DrawerTrigger>筛选条件</DrawerTrigger>
    <DrawerPopup className="w-80">
      <DrawerHeader>
        <DrawerTitle>筛选条件</DrawerTitle>
        <DrawerDescription>填写后点击完成。</DrawerDescription>
      </DrawerHeader>
      <DrawerContent>
        {fields.map(name => <Field key={name}><FieldLabel>{name}</FieldLabel><Input /></Field>)}
      </DrawerContent>
      <DrawerFooter><DrawerClose>完成</DrawerClose></DrawerFooter>
    </DrawerPopup>
  </Drawer>;
}
```

### 悬浮式
Source: apps/docs/src/content/drawer/demos/04-inset.tsx
```tsx
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye_lab/ui/components/drawer";
import { Inline } from "@qingye_lab/ui/components/layout";
export const meta = { title: "悬浮式", titleEn: "Inset" };
const EDGES = [["right", "右侧"], ["left", "左侧"], ["up", "上方"], ["down", "下方"]] as const;
export default function DrawerDemo() {
  return <Inline gap="fields">{EDGES.map(([direction, name]) => <Drawer key={direction} swipeDirection={direction}>
    <DrawerTrigger>{name}</DrawerTrigger>
    <DrawerPopup inset className={direction === "left" || direction === "right" ? "w-80" : undefined}>
      <DrawerHeader><DrawerTitle>筛选条件</DrawerTitle><DrawerDescription>面板四边离开视口，关闭、滑动与焦点返回与贴边时相同。</DrawerDescription></DrawerHeader>
      <DrawerContent>{Array.from({ length: 6 }, (_, index) => <p key={index} className="m-0 text-body">条件 {index + 1}</p>)}</DrawerContent>
      <DrawerFooter><DrawerClose>完成</DrawerClose></DrawerFooter>
    </DrawerPopup>
  </Drawer>)}</Inline>;
}
```

### 停靠点
Source: apps/docs/src/content/drawer/demos/05-snap-points.tsx
```tsx
import * as React from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye_lab/ui/components/drawer";
import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
export const meta = { title: "停靠点", titleEn: "Snap points" };
// 停靠点只对 swipeDirection 为 down / up 的抽屉有效（原语限制）。
// 面板须比最高的停靠点更高，所以让它占满视口高度（h-full）；第一个停靠点是初始停靠位置，1 表示全高。
const SNAPS = ["200px", 1] as const;
const names: Record<string, string> = { "200px": "半开", "1": "全开" };
export default function DrawerDemo() {
  const [snap, setSnap] = React.useState<number | string | null>(SNAPS[0]);
  return <Drawer snapPoints={[...SNAPS]} snapPoint={snap} onSnapPointChange={setSnap}>
    <DrawerTrigger>查看明细</DrawerTrigger>
    <DrawerPopup className="h-full">
      <DrawerHeader><DrawerTitle>明细</DrawerTitle></DrawerHeader>
      <DrawerContent>{Array.from({ length: 24 }, (_, index) => <p key={index} className="m-0 text-body">记录 {index + 1}</p>)}</DrawerContent>
      <DrawerFooter><Inline gap="actions"><Button variant="quiet" onClick={() => setSnap(snap === 1 ? SNAPS[0] : 1)}>{snap === 1 ? "收起" : "展开"}（当前{names[String(snap)] ?? "—"}）</Button><DrawerClose>完成</DrawerClose></Inline></DrawerFooter>
    </DrawerPopup>
  </Drawer>;
}
```

### 边缘滑出
Source: apps/docs/src/content/drawer/demos/06-swipe-area.tsx
```tsx
import { Drawer, DrawerClose, DrawerPopup, DrawerPrimitive, DrawerTitle, DrawerTrigger } from "@qingye_lab/ui/components/drawer";
export const meta = { title: "边缘滑出", titleEn: "Swipe from the edge" };
// DrawerPrimitive.SwipeArea 是一条看不见的边缘热区：swipeDirection="left" 的抽屉在左边，热区默认在相反方向的手势上——
// 从左缘向右拖动即可拉出。热区本身不画任何东西，需要调用方给它位置与宽度；
// 这里贴着视口左缘、宽 --qy-space-4（预设，足够指尖或指针命中又不盖住页面内容）。它不是控件，不进入 Tab 序列，所以仍保留可见的触发器。
export default function DrawerDemo() {
  return <Drawer swipeDirection="left">
    <DrawerPrimitive.SwipeArea className="fixed inset-y-0 left-0 w-(--qy-space-4)" />
    <DrawerTrigger>打开导航</DrawerTrigger>
    <DrawerPopup className="w-72"><DrawerTitle>导航</DrawerTitle><DrawerClose>关闭</DrawerClose></DrawerPopup>
  </Drawer>;
}
```

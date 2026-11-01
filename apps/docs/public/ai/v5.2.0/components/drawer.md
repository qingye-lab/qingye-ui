# 边缘工作面 Drawer

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/drawer
Source: packages/ui/src/components/drawer.tsx
Source SHA-256: e79e156401236e2fe59b0372c1aa7744dc3a293167264bbd1f001674057b2a55

从边缘进入工作面，再返回入口。

## Decision
方向由公开 swipeDirection 决定；实际 modal 决定焦点与背景阻断，关闭不代表撤销。

## Notes
- 程序打开且无触发者时明确 finalFocus。
- 长内容时用 DrawerHeader / DrawerContent / DrawerFooter：页眉与页脚固定，只有 DrawerContent 滚动；不用 DrawerContent 的写法仍是整面板滚动。
- 草稿、保存、放弃与撤销由应用分别处理。
- Popup 自然容量受视口限制；长内容滚动，左右边缘没有任意固定宽度。
- 共享 FloatingLayerScope/useFloatingLayer 为所属候选与嵌套工作面排序；调用方覆盖 zIndex 可破坏该关系。
- ARIA实测驱动的契约收窄：Portal固定keepMounted=false，JS传true也不保留关闭DOM。应用显式持有草稿；Primitive自行组合仍有原语保留Portal隔离缺陷。

## Use and ownership
- 任务需要边缘工作面且保留真实退出入口。
- Avoid: 用抽出方向冒充不同阻断语义。
- Library: 实际 open、原语手势、焦点、背景阻断和共享层级。
- Application: 输入、草稿与结果。

## Composition
- Title/Description/Content 与既有 Button/Input/Popover 组合。

## Responsive behavior
- 内容容量受视口限制；本批手势和桌面真实几何由浏览器 owner 验证。

## Customization
- 共享面、线、padding、圆角与 motion.css；无独立尺寸变体。

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
真实开关、方向与阻断方式。
- open / defaultOpen / onOpenChange: DrawerPrimitive.Root.Props. 实际开关与可取消请求；调用方事件先执行，受控拒绝不提升层级。
- modal: boolean | "trap-focus"; default true. 完整阻断、非阻断或只困住焦点；只有完整阻断显示遮罩并声明 aria-modal。
- swipeDirection: "down" | "up" | "left" | "right"; default "down". 退出方向与所在边缘，沿用原语手势、snapPoints 与 activeSnapPoint 公共 API。

### DrawerPopup
边缘工作面、遮罩与视口组合。
- initialFocus / finalFocus: DialogFocusTarget; default true. 默认首个控件与触发者；可指定有意义的可聚焦目标，不接受 false。
- portalProps / backdropProps / viewportProps: DrawerPrimitive 部位 Props. 原生 Portal、render/ref/事件与样式透传；调用方 style 后合并，可覆盖默认层级。

### DrawerTitle / DrawerDescription / DrawerContent
真实名称、必要说明和可滚动工作内容，不造业务状态。

### DrawerTrigger / DrawerClose
复用 Button；Close 无 children 时读取 locale.close。

## Keyboard
- Enter / Space: 从入口展开。
- Tab / Shift+Tab: 按实际 modal 设置在工作面中导航。
- Esc: 关闭当前层，再返回该层入口。

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

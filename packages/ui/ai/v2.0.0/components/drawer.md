# 边缘工作面 Drawer

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/drawer
Source: packages/ui/src/components/drawer.tsx
Source SHA-256: 155fc699f13ffd26579fd21761a48300c4a83ba8ecb1112db6146e443eccb83c

从边缘进入工作面，再返回入口。

## Decision
方向由公开 swipeDirection 决定；实际 modal 决定焦点与背景阻断，关闭不代表撤销。

## Notes
- 程序打开且无触发者时明确 finalFocus。
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
- DrawerPopup: function; owner drawer; PASS; props: DrawerPopupProps
- DrawerPopupProps: type; owner drawer; PASS
- DrawerPrimitive: reexport; owner drawer; UNVERIFIED
- DrawerProps: type; owner drawer; PASS
- DrawerTitle: function; owner drawer; PASS; props: DrawerPrimitive.Title.Props
- DrawerTrigger: function; owner drawer; PASS; props: DrawerPrimitive.Trigger.Props<Payload>

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
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
### 方向与嵌套返回
Source: apps/docs/src/content/drawer/demos/01-states.tsx
```tsx
import { Drawer, DrawerClose, DrawerContent, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye_lab/ui/components/drawer";
import { Dialog, DialogClose, DialogPopup, DialogTitle, DialogTrigger } from "@qingye_lab/ui/components/dialog";
import { Popover, PopoverPopup, PopoverTrigger } from "@qingye_lab/ui/components/popover";
import { Input } from "@qingye_lab/ui/components/input";
import { Label } from "@qingye_lab/ui/components/label";
import { Inline } from "@qingye_lab/ui/components/layout";
export const meta = { title: "方向与嵌套返回", titleEn: "Edges and nested return" };
export default function DrawerDemo() {
  return <Inline gap="fields">{(["left", "right", "up", "down"] as const).map(direction => <Drawer key={direction} swipeDirection={direction}><DrawerTrigger>{direction}</DrawerTrigger><DrawerPopup><DrawerTitle>{direction}</DrawerTitle><DrawerContent><Label htmlFor={`drawer-${direction}`}>输入</Label><Input id={`drawer-${direction}`} /><Popover><PopoverTrigger>补充</PopoverTrigger><PopoverPopup>补充内容</PopoverPopup></Popover><Dialog><DialogTrigger>内层</DialogTrigger><DialogPopup><DialogTitle>内层</DialogTitle><DialogClose /></DialogPopup></Dialog><DrawerClose /></DrawerContent></DrawerPopup></Drawer>)}</Inline>;
}
```

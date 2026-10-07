# 对话框 Dialog

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/dialog
Source: packages/ui/src/components/dialog.tsx
Source SHA-256: b8d6d2969f3f89460d02a4d6a668b9eceb2c8eabb363feb592b038a855e11369

接管整个工作面，完成当前编辑或决定后返回。

## Decision
关闭结束当前呈现并返回触发者，不代表保存。输入内容与后续动作由调用方持有。

## Notes
- 不需要阻断时使用就地表单或 Popover；必须明确回应的危险决定使用 AlertDialog。
- 草稿策略由应用持有。关闭、放弃草稿、保存和撤销分别命名。
- 危险动作复用可见非空后果的 aria-describedby 或 ButtonProtection。
- 无触发者的程序打开也须指定有意义的 finalFocus。
- 共享层级按真实开启顺序使新工作面高于旧面候选；调用方覆盖 zIndex 可破坏默认关系。
- ARIA实测驱动的契约收窄：Portal固定keepMounted=false，JS传true也不保留关闭DOM。应用显式持有草稿；Primitive自行组合仍有原语keepMounted隔离缺陷。

## Use and ownership
- 需要停下主线才能完成的编辑或决定。
- Avoid: 可就地完成的高频编辑。
- Avoid: 必须明确回应的决定改用 AlertDialog。
- Library: open、焦点困住、滚动锁、背景阻断与返回。
- Application: 草稿、版本、保存、失败、放弃与持久化。

## Composition
- Title/Description 关联名称与必要说明。
- Header/Panel/Footer 组织输入与动作，不提供业务状态。

## Responsive behavior
- 内容固有宽度受视口限制；长内容在面板内滚动。
- 既有控件窄屏 token 与触摸目标仍由控件消费；本批演示只验桌面。

## Customization
- 表面、圆角、遮罩、阴影读取既有角色。
- 入退唯一归 motion.css；不在调用点另写动画。

## Current exports
- Dialog: function; owner dialog; PASS; props: DialogProps<Payload>
- DialogClose: function; owner dialog; PASS; props: DialogPrimitive.Close.Props
- DialogCreateHandle: const; owner dialog; UNVERIFIED
- DialogDescription: function; owner dialog; PASS; props: DialogPrimitive.Description.Props
- DialogFocusTarget: type; owner dialog; PASS
- DialogFooter: function; owner dialog; PASS; props: DialogGroupProps
- DialogGroupProps: type; owner dialog; PASS
- DialogHeader: function; owner dialog; PASS; props: DialogGroupProps
- DialogPanel: function; owner dialog; PASS; props: DialogGroupProps
- DialogPopup: function; owner dialog; PASS; props: DialogPopupProps
- DialogPopupProps: interface; owner dialog; PASS
- DialogPrimitive: reexport; owner dialog; UNVERIFIED
- DialogProps: type; owner dialog; PASS
- DialogTitle: function; owner dialog; PASS; props: DialogPrimitive.Title.Props
- DialogTrigger: function; owner dialog; PASS; props: DialogPrimitive.Trigger.Props<Payload>

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Dialog
固定完整阻断模式，保留原语的受控、非受控与共享触发入口。
- open / defaultOpen: boolean; default false. 应用控制状态 / 初始展开状态。
- onOpenChange: (open, details) => void. 收到打开/关闭请求及原因；不表示提交或取消业务。
- handle / triggerId / defaultTriggerId: DialogPrimitive.Root.Props. 关联共享、受控或初始展开的触发者。
- disablePointerDismissal: boolean; default false. 应用确需阻止点遮罩关闭时启用，仍须保留明确退出。

### DialogPopup
组合 Portal、遮罩与视口，内容固有宽度受视口约束；不提供尺寸变体。
- initialFocus: true | RefObject<HTMLElement | null> | (interaction) => HTMLElement | true | null; default true. 默认首个控件；触摸进入面板。可指定字段、标题或面板；不支持 false。
- finalFocus: true | RefObject<HTMLElement | null> | (interaction) => HTMLElement | true | null; default true. 默认触发者；触发者会被移除时指定可聚焦上级，不能返回 false。
- portalProps / backdropProps / viewportProps: Omit<Portal.Props, 'keepMounted'> / Backdrop.Props / Viewport.Props. 容器、ref、样式、事件与 render 透传；Portal 不支持保留关闭DOM，局部语言、密度、方向需明确容器。
- render / ref / className / style: DialogPrimitive.Popup.Props. 覆盖呈现与组合，className 支持原语状态函数。

### DialogTitle / DialogDescription
原语建立可访问名称与说明的关联；说明不是重复标题。

### DialogTrigger / DialogClose
默认复用 Button，支持 render/ref/事件；Close 缺少 children 时读取 locale.close。

### DialogHeader / DialogPanel / DialogFooter
名称、工作内容、动作的分组关系。支持 useRender 组合；不产生另一层围合。

### DialogCreateHandle / DialogPrimitive
类型化共享触发 handle 与所用 Base UI 原语命名空间。

## Keyboard
- Enter / Space: 从触发者进入对话框。
- Tab / Shift+Tab: 在当前最上层对话框内循环。
- Esc: 关闭当前层并返回触发者或 finalFocus。

## Source examples
### 对话框与字段
Source: apps/docs/src/content/dialog/demos/01-field.tsx
```tsx
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle, DialogTrigger } from "@qingye/ui/components/dialog";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "对话框与字段", titleEn: "Dialog with a field" };

export default function Demo() {
  return (
    <Dialog>
      <DialogTrigger>编辑名称</DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>编辑名称</DialogTitle>
          <DialogDescription>最多 20 个字。</DialogDescription>
        </DialogHeader>
        <DialogPanel>
          <Field><FieldLabel>设备名称</FieldLabel><Input defaultValue="青野" maxLength={20} /></Field>
        </DialogPanel>
        <DialogFooter><DialogClose>关闭</DialogClose></DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
```

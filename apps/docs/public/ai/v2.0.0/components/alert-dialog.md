# 决定对话框 AlertDialog

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/alert-dialog
Source: packages/ui/src/components/alert-dialog.tsx
Source SHA-256: b615207fc39b258e0147256705bdbbe13a37477227a93ccc989c55a93b204f7e

阻断整个工作面，要求对当前对象作出明确选择。

## Decision
点遮罩不关闭，默认聚焦面板。Esc 与返回按钮只关闭对话框；继续动作由调用方处理。

## Notes
- 普通编辑使用 Dialog；不需要中断时用就地确认或面板。
- 后果必须在对话框里可见（Description）。
- 关闭与继续动作分别处理。
- 必须提供明确的返回选择，不能只依赖 Esc。
- 共享层级按真实开启顺序使新工作面高于旧面候选；调用方覆盖 zIndex 可破坏默认关系。
- ARIA实测驱动的契约收窄：Portal固定keepMounted=false，JS传true也不保留关闭DOM。应用显式持有草稿；Primitive自行组合未修复该原语缺陷。

## Use and ownership
- 必须在继续前回应的决定。
- Avoid: 通知、成功反馈、可就地编辑的内容。
- Library: open、焦点困住、滚动锁、背景阻断和返回。
- Application: 决定内容、后果与继续动作。

## Composition
- 返回与继续动作同处，必要后果可关联。

## Responsive behavior
- 内容决定宽度，视口限制上限；本批只验桌面。

## Customization
- 与 Dialog 复用圆角、表面、遮罩及阴影角色。
- 默认进入面板；入退只由 motion.css 提供。

## Current exports
- AlertDialog: function; owner alert-dialog; PASS; props: AlertDialogProps<Payload>
- AlertDialogClose: function; owner alert-dialog; PASS; props: AlertDialogPrimitive.Close.Props
- AlertDialogCreateHandle: const; owner alert-dialog; UNVERIFIED
- AlertDialogDescription: function; owner alert-dialog; PASS; props: AlertDialogPrimitive.Description.Props
- AlertDialogFooter: function; owner alert-dialog; PASS; props: DialogGroupProps
- AlertDialogHeader: function; owner alert-dialog; PASS; props: DialogGroupProps
- AlertDialogPanel: function; owner alert-dialog; PASS; props: DialogGroupProps
- AlertDialogPopup: function; owner alert-dialog; PASS; props: AlertDialogPopupProps
- AlertDialogPopupProps: type; owner alert-dialog; PASS
- AlertDialogPrimitive: reexport; owner alert-dialog; UNVERIFIED
- AlertDialogProps: type; owner alert-dialog; PASS
- AlertDialogTitle: function; owner alert-dialog; PASS; props: AlertDialogPrimitive.Title.Props
- AlertDialogTrigger: function; owner alert-dialog; PASS; props: AlertDialogPrimitive.Trigger.Props<Payload>

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### AlertDialog
保留 open/defaultOpen/onOpenChange/handle；原语固定阻断并禁止外部指针关闭。

### AlertDialogPopup
与 Dialog 同样的承载结构与内容尺寸关系，默认聚焦面板。
- initialFocus: DialogFocusTarget; default panel. 可指定保留动作、确认字段或可聚焦标题；危险按钮不得作为默认落点。
- finalFocus: DialogFocusTarget; default trigger. 触发者移除后由应用指定有意义的上级。
- portalProps / backdropProps / viewportProps: DialogPopupProps. 透传承载层的容器、样式、render、ref 与原生属性。

### AlertDialogTitle / AlertDialogDescription
说明当前选择与必要后果，建立可访问关联。后果写在 Description 里，按钮不承载。

### AlertDialogTrigger / AlertDialogClose
默认组合 Button。Close 由调用方明确命名，如“返回”；不执行继续动作。

### AlertDialogHeader / AlertDialogPanel / AlertDialogFooter
复用 Dialog 的名称、工作内容与动作分组，具有各自 data-slot。

### AlertDialogCreateHandle / AlertDialogPrimitive
共享触发 handle 和所用 Base UI 原语命名空间。

## Keyboard
- Enter / Space: 打开决定。
- Tab / Shift+Tab: 在最上层决定内循环，背景不可操作。
- Esc: 离开这次决定并返回；危险动作不执行。

## Source examples
### 确认与返回
Source: apps/docs/src/content/alert-dialog/demos/01-confirmation.tsx
```tsx
import { useState } from "react";
import { AlertDialog, AlertDialogClose, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogPopup, AlertDialogTitle, AlertDialogTrigger } from "@qingye_lab/ui/components/alert-dialog";
import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";

export const meta = { title: "确认与返回", titleEn: "Confirmation and return" };

export default function Demo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("青野");

  return (
    <div className="grid w-full max-w-sm gap-(--qy-panel-gap)">
      <Field><FieldLabel>备注</FieldLabel><Input value={value} onValueChange={setValue} /></Field>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger render={<Button variant="bordered" tone="danger" />} className="justify-self-start">清空输入</AlertDialogTrigger>
        <AlertDialogPopup>
          <AlertDialogHeader>
            <AlertDialogTitle>清空输入？</AlertDialogTitle>
            <AlertDialogDescription>当前备注将被清空，无法恢复。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose render={<Button variant="bordered" />}>返回</AlertDialogClose>
            <Button tone="danger" onClick={() => { setValue(""); setOpen(false); }}>清空输入</Button>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>
    </div>
  );
}
```

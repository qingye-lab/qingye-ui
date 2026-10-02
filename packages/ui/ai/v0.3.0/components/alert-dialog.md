# 警示对话框 AlertDialog

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/alert-dialog
Source: packages/ui/src/components/alert-dialog.tsx
Source SHA-256: 888e6c24d49b867043305a3f5ccba18a3ac6a633fa08112a5b8feeeb87a1555a

打断当前操作、要求用户明确回应的对话框，用于删除、撤销权限等不可逆操作的二次确认。点击遮罩不会关闭。

## Use and ownership
- 打断当前操作、要求用户明确回应的对话框，用于删除、撤销权限等不可逆操作的二次确认。点击遮罩不会关闭。
- Avoid: 不要把唯一的关键后果藏在临时浮层；直达与返回都需要成立。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 数据、权限、动作范围、异步结果与持久化。

## Current exports
- AlertDialog: const; owner alert-dialog; PASS
- AlertDialogBackdrop: function; owner alert-dialog; PASS; props: AlertDialogPrimitive.Backdrop.Props
- AlertDialogClose: function; owner alert-dialog; PASS; props: AlertDialogPrimitive.Close.Props
- AlertDialogContent: function; owner alert-dialog; alias of AlertDialogPopup; PASS; props: AlertDialogPrimitive.Popup.Props & {
  bottomStickOnMobile?: boolean;
  portalProps?: AlertDialogPrimitive.Portal.Props;
}
- AlertDialogCreateHandle: const; owner alert-dialog; PASS
- AlertDialogDescription: function; owner alert-dialog; PASS; props: AlertDialogPrimitive.Description.Props
- AlertDialogFooter: function; owner alert-dialog; PASS; props: React.ComponentProps<"div"> & {
  variant?: "default" | "bare";
}
- AlertDialogHeader: function; owner alert-dialog; PASS; props: React.ComponentProps<"div">
- AlertDialogOverlay: function; owner alert-dialog; alias of AlertDialogBackdrop; PASS; props: AlertDialogPrimitive.Backdrop.Props
- AlertDialogPopup: function; owner alert-dialog; PASS; props: AlertDialogPrimitive.Popup.Props & {
  bottomStickOnMobile?: boolean;
  portalProps?: AlertDialogPrimitive.Portal.Props;
}
- AlertDialogPortal: const; owner alert-dialog; PASS
- AlertDialogPrimitive: reexport; owner alert-dialog; UNVERIFIED
- AlertDialogTitle: function; owner alert-dialog; PASS; props: AlertDialogPrimitive.Title.Props
- AlertDialogTrigger: function; owner alert-dialog; PASS; props: AlertDialogPrimitive.Trigger.Props
- AlertDialogViewport: function; owner alert-dialog; PASS; props: AlertDialogPrimitive.Viewport.Props

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### AlertDialog
根组件，管理打开状态。
- open / defaultOpen: boolean; default false. 受控 / 非受控的打开状态。
- onOpenChange: (open, details) => void. 打开状态变化时调用。
- handle: AlertDialogCreateHandle(). 与外部触发器关联。

### AlertDialogTrigger
打开确认框的按钮。

### AlertDialogPopup
确认框本体，自带遮罩；不含右上角关闭按钮，用户必须做出选择。别名 AlertDialogContent。
- bottomStickOnMobile: boolean; default true. 窄屏时贴底显示。
- initialFocus: RefObject | boolean | fn. 打开时聚焦的元素，默认为第一个按钮（通常是“取消”）。
- portalProps: AlertDialogPortal props. 指定挂载节点等。

### AlertDialogHeader
标题区；窄屏居中，宽屏左对齐。

### AlertDialogTitle
标题，用问句直接说明后果。

### AlertDialogDescription
说明影响范围与能否撤销。

### AlertDialogFooter
操作区；取消放在前，确认放在后。
- variant: "default" | "bare"; default "default". default 带分隔线与底色；bare 无背景。

### AlertDialogClose
关闭按钮；用 render 渲染为“取消”或确认按钮。

## Keyboard
- Esc: 取消并关闭，焦点回到触发器。
- Tab / Shift + Tab: 在按钮之间循环移动焦点。
- Enter / Space: 执行当前聚焦的按钮。

## Source examples
### 删除确认
Source: apps/docs/src/content/alert-dialog/demos/01-default.tsx
```tsx
import { AlertDialog, AlertDialogClose, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogPopup, AlertDialogTitle, AlertDialogTrigger } from "@qingye/ui/components/alert-dialog";
import { Button } from "@qingye/ui/components/button";

export const meta = { title: "删除确认", description: "不可逆的操作用 destructive 确认按钮，取消放在前面。" };

export default function Demo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive-outline" />}>删除设备</AlertDialogTrigger>
      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle>删除“仓库 3 号扫码枪”？</AlertDialogTitle>
          <AlertDialogDescription>
            设备的 1,024 条扫码记录会一并删除，且无法恢复。设备需要重新绑定才能再次使用。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose render={<Button variant="ghost" />}>取消</AlertDialogClose>
          <AlertDialogClose render={<Button variant="destructive" />}>删除设备</AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
```

### 无底色底部
Source: apps/docs/src/content/alert-dialog/demos/02-bare-footer.tsx
```tsx
import { AlertDialog, AlertDialogClose, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogPopup, AlertDialogTitle, AlertDialogTrigger } from "@qingye/ui/components/alert-dialog";
import { Button } from "@qingye/ui/components/button";

export const meta = { title: "无底色底部", description: "非危险的确认，例如退出登录，用更轻的 bare 底部。" };

export default function Demo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" />}>退出登录</AlertDialogTrigger>
      <AlertDialogPopup className="sm:max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>退出当前账号？</AlertDialogTitle>
          <AlertDialogDescription>未同步的离线草稿会保留在本机，下次登录后继续同步。</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter variant="bare">
          <AlertDialogClose render={<Button variant="ghost" />}>取消</AlertDialogClose>
          <AlertDialogClose render={<Button />}>退出</AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
```

### 异步执行
Source: apps/docs/src/content/alert-dialog/demos/03-async.tsx
```tsx
import { AlertDialog, AlertDialogClose, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogPopup, AlertDialogTitle, AlertDialogTrigger } from "@qingye/ui/components/alert-dialog";
import { Button } from "@qingye/ui/components/button";
import { useState } from "react";

export const meta = {
  title: "异步执行",
  description: "确认后保持打开并显示加载，请求完成再关闭；执行期间禁止取消。",
};

export default function Demo() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const revoke = async () => {
    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setPending(false);
    setOpen(false);
  };

  return (
    <AlertDialog onOpenChange={(next) => !pending && setOpen(next)} open={open}>
      <AlertDialogTrigger render={<Button variant="outline" />}>撤销访问权限</AlertDialogTrigger>
      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle>撤销周以宁的访问权限？</AlertDialogTitle>
          <AlertDialogDescription>
            对方会立即退出“华东仓储”项目，已分配给 TA 的 6 张工单将回到待分配列表。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose disabled={pending} render={<Button variant="ghost" />}>
            取消
          </AlertDialogClose>
          <Button loading={pending} onClick={revoke} variant="destructive">
            撤销权限
          </Button>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
```


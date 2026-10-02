# 对话框 Dialog

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/dialog
Source: packages/ui/src/components/dialog.tsx
Source SHA-256: f342c68f51f9cc7e0eea889ef13140b42b2238fb8910a1b87a9a9dd026e509c7

在当前页面之上打开一个模态窗口，用于填写表单、查看详情或完成一个独立的小任务。需要用户二次确认的危险操作改用 AlertDialog。

## Use and ownership
- 在当前对象上完成确有必要独立聚焦的小任务，完成或退出后能合理返回。
- Avoid: 不要把每个结果都变成模态；关闭窗口不等于撤销已保存动作或已取消后台请求。
- Library: 提供名称关联、焦点限制与返回、关闭原因、滚动正文及内置关闭入口的空间。
- Application: 控制未保存内容、异步结果、错误恢复与关闭拦截；业务完成后才更新结果并决定退出。

## Composition
- Header 标识对象，Panel 承载工作，Footer 承接保存与退出；从 Menu 打开时保留外部 Dialog owner。

## Responsive behavior
- 贴底模式保留可见退出与安全区，长正文在 Panel 滚动；标题不能被关闭按钮覆盖。

## Customization
- 按任务选择底部贴合与 Footer 边界；showCloseButton 关闭时必须有明确替代退出。

## Current exports
- Dialog: const; owner dialog; PASS
- DialogBackdrop: function; owner dialog; PASS; props: DialogPrimitive.Backdrop.Props
- DialogClose: function; owner dialog; PASS; props: DialogPrimitive.Close.Props
- DialogContent: function; owner dialog; alias of DialogPopup; PASS; props: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
  bottomStickOnMobile?: boolean;
  closeProps?: DialogPrimitive.Close.Props;
  portalProps?: DialogPrimitive.Portal.Props;
}
- DialogCreateHandle: const; owner dialog; PASS
- DialogDescription: function; owner dialog; PASS; props: DialogPrimitive.Description.Props
- DialogFooter: function; owner dialog; PASS; props: useRender.ComponentProps<"div"> & {
  variant?: "default" | "bare";
}
- DialogHeader: function; owner dialog; PASS; props: useRender.ComponentProps<"div">
- DialogOverlay: function; owner dialog; alias of DialogBackdrop; PASS; props: DialogPrimitive.Backdrop.Props
- DialogPanel: function; owner dialog; PASS; props: useRender.ComponentProps<"div"> & {
  scrollFade?: boolean;
}
- DialogPopup: function; owner dialog; PASS; props: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
  bottomStickOnMobile?: boolean;
  closeProps?: DialogPrimitive.Close.Props;
  portalProps?: DialogPrimitive.Portal.Props;
}
- DialogPortal: const; owner dialog; PASS
- DialogPrimitive: reexport; owner dialog; UNVERIFIED
- DialogTitle: function; owner dialog; PASS; props: DialogPrimitive.Title.Props
- DialogTrigger: function; owner dialog; PASS; props: DialogPrimitive.Trigger.Props
- DialogViewport: function; owner dialog; PASS; props: DialogPrimitive.Viewport.Props

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Dialog
根组件，管理打开状态。
- open / defaultOpen: boolean; default false. 受控 / 非受控的打开状态。
- onOpenChange: (open, details) => void. 打开状态变化时调用；details.reason 可区分 Esc、点击遮罩等来源。
- modal: boolean | "trap-focus"; default true. 模态时锁定页面滚动并把焦点限制在对话框内。
- disablePointerDismissal: boolean; default false. 禁止点击遮罩关闭，适合填写中的表单。
- handle: DialogCreateHandle(). 把对话框与外部触发器关联，例如从菜单项打开。

### DialogTrigger
打开对话框的按钮；用 render 渲染为 Button。

### DialogPopup
对话框本体，自带遮罩、视口与右上角关闭按钮。别名 DialogContent。
- showCloseButton: boolean; default true. 显示右上角关闭按钮。
- bottomStickOnMobile: boolean; default true. 窄屏时贴底显示，便于单手操作。
- closeProps: DialogClose props. 透传给内置关闭按钮。
- initialFocus / finalFocus: RefObject | boolean | fn. 打开时聚焦的元素 / 关闭后焦点返回的元素，默认分别为首个可聚焦元素与触发器。
- portalProps: DialogPortal props. 例如 container，指定挂载节点。

### DialogHeader
标题区，包含 DialogTitle 与 DialogDescription。

### DialogTitle
标题，自动作为对话框的可访问名称。

### DialogDescription
补充说明，自动关联为 aria-describedby。

### DialogPanel
正文区；内容超出时在此区域内滚动，头部与底部保持固定。
- scrollFade: boolean; default true. 滚动边缘显示渐隐遮罩。

### DialogFooter
操作区；窄屏时按钮纵向排列，主按钮在上。
- variant: "default" | "bare"; default "default". default 带分隔线与底色；bare 无背景。

### DialogClose
关闭对话框的按钮。

## Keyboard
- Esc: 关闭当前（最上层）对话框，焦点回到触发器。
- Tab / Shift + Tab: 在对话框内循环移动焦点。
- Enter / Space: 在触发器上打开对话框。

## Source examples
### 基础用法
Source: apps/docs/src/content/dialog/demos/01-form.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle, DialogTrigger } from "@qingye/ui/components/dialog";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Form } from "@qingye/ui/components/form";
import { Input } from "@qingye/ui/components/input";

export const meta = {
  title: "基础用法",
  description: "头部、正文、底部三段结构；表单用 Form 包住正文与底部，回车即可提交。",
};

export default function Demo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>编辑资料</DialogTrigger>
      <DialogPopup className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>编辑资料</DialogTitle>
          <DialogDescription>修改后会同步到团队通讯录。</DialogDescription>
        </DialogHeader>
        <Form className="contents" onSubmit={(event) => event.preventDefault()}>
          <DialogPanel className="grid gap-4">
            <Field>
              <FieldLabel>姓名</FieldLabel>
              <Input defaultValue="林嘉禾" />
            </Field>
            <Field>
              <FieldLabel>职位</FieldLabel>
              <Input defaultValue="产品设计师" />
            </Field>
          </DialogPanel>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>取消</DialogClose>
            <Button type="submit">保存</Button>
          </DialogFooter>
        </Form>
      </DialogPopup>
    </Dialog>
  );
}
```

### 无底色底部
Source: apps/docs/src/content/dialog/demos/02-bare-footer.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPopup, DialogTitle, DialogTrigger } from "@qingye/ui/components/dialog";

export const meta = {
  title: "无底色底部",
  description: "内容很短时用 variant=\"bare\"，去掉分隔线和底色，让窗口更轻。",
};

export default function Demo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>导出账单</DialogTrigger>
      <DialogPopup className="sm:max-w-sm" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>导出 9 月账单</DialogTitle>
          <DialogDescription>
            共 1,286 笔交易，生成完成后会发送到 finance@qingye.example。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter variant="bare">
          <DialogClose render={<Button variant="ghost" />}>取消</DialogClose>
          <DialogClose render={<Button />}>开始导出</DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
```

### 长内容滚动
Source: apps/docs/src/content/dialog/demos/03-scrollable.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle, DialogTrigger } from "@qingye/ui/components/dialog";

export const meta = {
  title: "长内容滚动",
  description: "正文超出视口时只在 DialogPanel 内滚动，标题和操作始终可见。",
};

const sections = [
  ["服务内容", "燕青云为团队提供设备管理、工单流转与数据看板服务。我们会持续改进功能，重大变更将提前 30 天通过站内信与邮件通知。"],
  ["账号与安全", "你需要妥善保管账号凭据。发现异常登录时，请立即在“安全设置”中重置密码并退出所有设备。"],
  ["数据归属", "你上传的设备数据、工单记录归你所在的组织所有。我们仅在提供服务所必需的范围内处理这些数据。"],
  ["费用与发票", "订阅费用按自然月结算。发票将在每月 5 日前开具，可在“账单中心”下载电子发票。"],
  ["服务可用性", "我们承诺月度可用性不低于 99.9%。计划内维护会提前 72 小时公告，并尽量安排在凌晨进行。"],
  ["终止服务", "你可以随时导出数据并注销组织。注销后 30 天内数据可恢复，超过期限将被永久删除。"],
  ["争议解决", "本协议适用中华人民共和国法律。因本协议产生的争议，双方应友好协商；协商不成的，提交杭州仲裁委员会仲裁。"],
];

export default function Demo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>查看服务协议</DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>燕青云服务协议</DialogTitle>
          <DialogDescription>更新于 2026 年 9 月 1 日</DialogDescription>
        </DialogHeader>
        <DialogPanel className="grid gap-5 text-sm">
          {sections.map(([title, body], index) => (
            <section className="grid gap-1.5" key={title}>
              <h3 className="font-medium">
                {index + 1}. {title}
              </h3>
              <p className="text-pretty text-muted-foreground leading-relaxed">{body}</p>
              <p className="text-pretty text-muted-foreground leading-relaxed">
                如对本条款有疑问，可通过工作台右下角的“联系客服”与我们沟通，我们会在一个工作日内回复。
              </p>
            </section>
          ))}
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>暂不同意</DialogClose>
          <DialogClose render={<Button />}>同意并继续</DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
```

### 嵌套对话框
Source: apps/docs/src/content/dialog/demos/04-nested.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle, DialogTrigger } from "@qingye/ui/components/dialog";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = {
  title: "嵌套对话框",
  description: "子对话框打开时，父级自动缩小后退；Esc 只关闭最上层。",
};

const details = [
  ["设备名称", "仓库 3 号扫码枪"],
  ["序列号", "YQ-SC-20391"],
  ["负责人", "周以宁"],
];

export default function Demo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>设备详情</DialogTrigger>
      <DialogPopup className="sm:max-w-sm" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>设备详情</DialogTitle>
          <DialogDescription>最近一次上报：今天 09:42</DialogDescription>
        </DialogHeader>
        <DialogPanel className="grid gap-3 text-sm">
          {details.map(([label, value]) => (
            <div className="flex justify-between gap-4" key={label}>
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>关闭</DialogClose>
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>重命名</DialogTrigger>
            <DialogPopup className="sm:max-w-sm" showCloseButton={false}>
              <DialogHeader>
                <DialogTitle>重命名设备</DialogTitle>
                <DialogDescription>名称会显示在设备列表和告警通知中。</DialogDescription>
              </DialogHeader>
              <DialogPanel>
                <Field>
                  <FieldLabel>新名称</FieldLabel>
                  <Input defaultValue="仓库 3 号扫码枪" />
                </Field>
              </DialogPanel>
              <DialogFooter>
                <DialogClose render={<Button variant="ghost" />}>取消</DialogClose>
                <DialogClose render={<Button />}>保存</DialogClose>
              </DialogFooter>
            </DialogPopup>
          </Dialog>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
```

### 关闭前确认
Source: apps/docs/src/content/dialog/demos/05-close-confirmation.tsx
```tsx
import { AlertDialog, AlertDialogClose, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogPopup, AlertDialogTitle } from "@qingye/ui/components/alert-dialog";
import { Button } from "@qingye/ui/components/button";
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle, DialogTrigger } from "@qingye/ui/components/dialog";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Textarea } from "@qingye/ui/components/textarea";
import { useState } from "react";

export const meta = {
  title: "关闭前确认",
  description: "有未保存内容时拦截关闭（Esc、遮罩、关闭按钮），再用 AlertDialog 确认是否放弃。",
};

export default function Demo() {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [text, setText] = useState("");

  const closeAndReset = () => {
    setConfirmOpen(false);
    setText("");
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => (!next && text ? setConfirmOpen(true) : setOpen(next))}
    >
      <DialogTrigger render={<Button variant="outline" />}>发布公告</DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>发布团队公告</DialogTitle>
          <DialogDescription>输入内容后尝试关闭窗口。</DialogDescription>
        </DialogHeader>
        <DialogPanel>
          <Field>
            <FieldLabel>公告内容</FieldLabel>
            <Textarea
              onChange={(event) => setText(event.target.value)}
              placeholder="例如：本周五 18:00 起进行机房例行维护，预计 2 小时。"
              value={text}
            />
          </Field>
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>取消</DialogClose>
          <Button disabled={!text} onClick={closeAndReset}>
            发布
          </Button>
        </DialogFooter>
      </DialogPopup>
      <AlertDialog onOpenChange={setConfirmOpen} open={confirmOpen}>
        <AlertDialogPopup>
          <AlertDialogHeader>
            <AlertDialogTitle>放弃这条公告？</AlertDialogTitle>
            <AlertDialogDescription>已输入的内容不会保存。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose render={<Button variant="ghost" />}>继续编辑</AlertDialogClose>
            <Button onClick={closeAndReset} variant="destructive">
              放弃
            </Button>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>
    </Dialog>
  );
}
```

### 从菜单打开
Source: apps/docs/src/content/dialog/demos/06-from-menu.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle } from "@qingye/ui/components/dialog";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { Menu, MenuItem, MenuPopup, MenuSeparator, MenuTrigger } from "@qingye/ui/components/menu";
import { EllipsisIcon, PencilIcon, UserPlusIcon } from "lucide-react";
import { useState } from "react";

export const meta = {
  title: "从菜单打开",
  description: "菜单项只负责切换状态，对话框放在菜单之外，菜单关闭后对话框仍然存在。",
};

export default function Demo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Menu>
        <MenuTrigger render={<Button aria-label="项目操作" size="icon" variant="outline" />}>
          <EllipsisIcon />
        </MenuTrigger>
        <MenuPopup align="start">
          <MenuItem onClick={() => setOpen(true)}>
            <UserPlusIcon />
            邀请成员…
          </MenuItem>
          <MenuSeparator />
          <MenuItem>
            <PencilIcon />
            重命名
          </MenuItem>
        </MenuPopup>
      </Menu>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogPopup className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>邀请成员</DialogTitle>
            <DialogDescription>对方接受邀请后即可查看“华东仓储”项目。</DialogDescription>
          </DialogHeader>
          <DialogPanel>
            <Field>
              <FieldLabel>邮箱地址</FieldLabel>
              <Input placeholder="name@company.com" type="email" />
            </Field>
          </DialogPanel>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>取消</DialogClose>
            <DialogClose render={<Button />}>发送邀请</DialogClose>
          </DialogFooter>
        </DialogPopup>
      </Dialog>
    </>
  );
}
```

### 输入名称确认删除
Source: apps/docs/src/content/dialog/demos/07-destructive.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle, DialogTrigger } from "@qingye/ui/components/dialog";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { useState } from "react";

export const meta = {
  title: "输入名称确认删除",
  description: "影响面很大的删除，要求输入名称后才能确认，避免误操作。",
};

const project = "华东仓储";

export default function Demo() {
  const [value, setValue] = useState("");

  return (
    <Dialog onOpenChange={(open) => !open && setValue("")}>
      <DialogTrigger render={<Button variant="destructive-outline" />}>删除项目</DialogTrigger>
      <DialogPopup className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>删除“{project}”项目</DialogTitle>
          <DialogDescription>
            项目下的 42 台设备、318 张工单和全部报表将被永久删除，且无法恢复。
          </DialogDescription>
        </DialogHeader>
        <DialogPanel>
          <Field>
            <FieldLabel>输入项目名称以确认</FieldLabel>
            <Input
              autoComplete="off"
              onChange={(event) => setValue(event.target.value)}
              placeholder={project}
              value={value}
            />
          </Field>
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>取消</DialogClose>
          <DialogClose disabled={value !== project} render={<Button variant="destructive" />}>
            永久删除
          </DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
```


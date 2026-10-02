# 侧边面板 Sheet

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/sheet
Source: packages/ui/src/components/sheet.tsx
Source SHA-256: dea15cd5c30b4311ba86f974194e4d3cd55b3a857894d1b33b2738fbdac122b7

从屏幕边缘滑入的模态面板，适合在不离开列表的情况下查看详情、编辑记录或设置筛选条件。需要拖拽手势或吸附高度时改用 Drawer。

## Use and ownership
- 从屏幕边缘滑入的模态面板，适合在不离开列表的情况下查看详情、编辑记录或设置筛选条件。需要拖拽手势或吸附高度时改用 Drawer。
- Avoid: 不要把唯一的关键后果藏在临时浮层；直达与返回都需要成立。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 数据、权限、动作范围、异步结果与持久化。

## Current exports
- Sheet: const; owner sheet; PASS
- SheetBackdrop: function; owner sheet; PASS; props: SheetPrimitive.Backdrop.Props
- SheetClose: function; owner sheet; PASS; props: SheetPrimitive.Close.Props
- SheetContent: function; owner sheet; alias of SheetPopup; PASS; props: SheetPrimitive.Popup.Props & {
  showCloseButton?: boolean;
  side?: "right" | "left" | "top" | "bottom";
  variant?: "default" | "inset";
  closeProps?: SheetPrimitive.Close.Props;
  portalProps?: SheetPrimitive.Portal.Props;
}
- SheetDescription: function; owner sheet; PASS; props: SheetPrimitive.Description.Props
- SheetFooter: function; owner sheet; PASS; props: useRender.ComponentProps<"div"> & {
  variant?: "default" | "bare";
}
- SheetHeader: function; owner sheet; PASS; props: useRender.ComponentProps<"div">
- SheetOverlay: function; owner sheet; alias of SheetBackdrop; PASS; props: SheetPrimitive.Backdrop.Props
- SheetPanel: function; owner sheet; PASS; props: useRender.ComponentProps<"div"> & {
  scrollFade?: boolean;
}
- SheetPopup: function; owner sheet; PASS; props: SheetPrimitive.Popup.Props & {
  showCloseButton?: boolean;
  side?: "right" | "left" | "top" | "bottom";
  variant?: "default" | "inset";
  closeProps?: SheetPrimitive.Close.Props;
  portalProps?: SheetPrimitive.Portal.Props;
}
- SheetPortal: const; owner sheet; PASS
- SheetPrimitive: reexport; owner sheet; UNVERIFIED
- SheetTitle: function; owner sheet; PASS; props: SheetPrimitive.Title.Props
- SheetTrigger: function; owner sheet; PASS; props: SheetPrimitive.Trigger.Props
- SheetViewport: function; owner sheet; PASS; props: SheetPrimitive.Viewport.Props & {
  side?: "right" | "left" | "top" | "bottom";
  variant?: "default" | "inset";
}

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Sheet
根组件，基于 Dialog，管理打开状态。
- open / defaultOpen: boolean; default false. 受控 / 非受控的打开状态。
- onOpenChange: (open, details) => void. 打开状态变化时调用。
- modal: boolean | "trap-focus"; default true. 是否锁定页面并限制焦点。

### SheetTrigger
打开面板的按钮。

### SheetPopup
面板本体，自带遮罩与关闭按钮。别名 SheetContent。
- side: "right" | "left" | "top" | "bottom"; default "right". 滑入的边。
- variant: "default" | "inset"; default "default". inset 在宽屏下与屏幕边缘留出间距并加圆角。
- showCloseButton: boolean; default true. 显示右上角关闭按钮。
- closeProps: SheetClose props. 透传给内置关闭按钮。
- portalProps: SheetPortal props. 指定挂载节点等。

### SheetHeader
标题区。

### SheetTitle
标题，作为面板的可访问名称。

### SheetDescription
补充说明。

### SheetPanel
正文区，内容超出时在此滚动。
- scrollFade: boolean; default true. 滚动边缘渐隐。

### SheetFooter
操作区。
- variant: "default" | "bare"; default "default". default 带分隔线与底色；bare 无背景。

### SheetClose
关闭面板的按钮。

## Keyboard
- Esc: 关闭面板，焦点回到触发器。
- Tab / Shift + Tab: 在面板内循环移动焦点。

## Source examples
### 基础用法
Source: apps/docs/src/content/sheet/demos/01-default.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Form } from "@qingye/ui/components/form";
import { Input } from "@qingye/ui/components/input";
import { Sheet, SheetClose, SheetDescription, SheetFooter, SheetHeader, SheetPanel, SheetPopup, SheetTitle, SheetTrigger } from "@qingye/ui/components/sheet";
import { Textarea } from "@qingye/ui/components/textarea";

export const meta = { title: "基础用法", description: "默认从右侧滑入，适合在列表旁新建或编辑一条记录。" };

export default function Demo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>新建工单</SheetTrigger>
      <SheetPopup>
        <SheetHeader>
          <SheetTitle>新建工单</SheetTitle>
          <SheetDescription>提交后会自动分派给当班的运维人员。</SheetDescription>
        </SheetHeader>
        <Form className="contents" onSubmit={(event) => event.preventDefault()}>
          <SheetPanel className="grid gap-4">
            <Field>
              <FieldLabel>标题</FieldLabel>
              <Input placeholder="例如：3 号仓库温控器离线" />
            </Field>
            <Field>
              <FieldLabel>设备编号</FieldLabel>
              <Input defaultValue="YQ-TC-0817" />
            </Field>
            <Field>
              <FieldLabel>问题描述</FieldLabel>
              <Textarea placeholder="发生时间、现象和已尝试的处理方式" />
            </Field>
          </SheetPanel>
          <SheetFooter>
            <SheetClose render={<Button variant="ghost" />}>取消</SheetClose>
            <Button type="submit">提交工单</Button>
          </SheetFooter>
        </Form>
      </SheetPopup>
    </Sheet>
  );
}
```

### 四个方向
Source: apps/docs/src/content/sheet/demos/02-sides.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Sheet, SheetDescription, SheetHeader, SheetPanel, SheetPopup, SheetTitle, SheetTrigger } from "@qingye/ui/components/sheet";

export const meta = { title: "四个方向", description: "通过 side 指定滑入的边。" };

const sides = [
  { side: "right", label: "右侧" },
  { side: "left", label: "左侧" },
  { side: "top", label: "顶部" },
  { side: "bottom", label: "底部" },
] as const;

const notices = [
  "09:42 仓库 3 号扫码枪电量低于 15%",
  "09:30 周以宁完成了工单 #2318",
  "08:55 华东仓储新增 4 台设备",
];

export default function Demo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {sides.map(({ side, label }) => (
        <Sheet key={side}>
          <SheetTrigger render={<Button variant="outline" />}>{label}</SheetTrigger>
          <SheetPopup side={side}>
            <SheetHeader>
              <SheetTitle>最近动态</SheetTitle>
              <SheetDescription>从{label}滑入的面板。</SheetDescription>
            </SheetHeader>
            <SheetPanel>
              <ul className="grid gap-2.5 text-sm">
                {notices.map((notice) => (
                  <li className="numeric text-muted-foreground" key={notice}>
                    {notice}
                  </li>
                ))}
              </ul>
            </SheetPanel>
          </SheetPopup>
        </Sheet>
      ))}
    </div>
  );
}
```

### 内嵌样式
Source: apps/docs/src/content/sheet/demos/03-inset.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Sheet, SheetClose, SheetDescription, SheetFooter, SheetHeader, SheetPanel, SheetPopup, SheetTitle, SheetTrigger } from "@qingye/ui/components/sheet";

export const meta = {
  title: "内嵌样式",
  description: "variant=\"inset\" 在宽屏下与屏幕边缘留出间距并加圆角，适合轻量的详情面板。",
};

const rows = [
  ["订单号", "YQ20260930-0418"],
  ["客户", "杭州青禾餐饮有限公司"],
  ["商品", "智能温控器 × 12"],
  ["金额", "¥ 14,280.00"],
  ["下单时间", "2026-09-30 14:22"],
  ["状态", "待发货"],
];

export default function Demo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>订单详情</SheetTrigger>
      <SheetPopup variant="inset">
        <SheetHeader>
          <SheetTitle>订单详情</SheetTitle>
          <SheetDescription>预计 10 月 2 日从杭州仓发出。</SheetDescription>
        </SheetHeader>
        <SheetPanel>
          <dl className="grid gap-3 text-sm">
            {rows.map(([label, value]) => (
              <div className="flex justify-between gap-4" key={label}>
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="numeric text-end font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </SheetPanel>
        <SheetFooter>
          <SheetClose render={<Button variant="ghost" />}>关闭</SheetClose>
          <Button>安排发货</Button>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  );
}
```


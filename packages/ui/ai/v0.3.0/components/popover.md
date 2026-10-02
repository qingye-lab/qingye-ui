# 气泡卡片 Popover

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/popover
Source: packages/ui/src/components/popover.tsx
Source SHA-256: c12f748ff8eb4835e733b4d11eb8d7249967e8a8eedb95c1159317d3b20daff1

点击触发、锚定在元素旁的非模态浮层，承载简短表单、筛选或补充信息。只读的悬停提示用 Tooltip，悬停预览用 PreviewCard。

## Use and ownership
- 在触发对象旁按需展示短表单、选择或可点击帮助，保持上下文。
- Avoid: 不能把关键后果只塞进临时浮层；关闭不能被应用当成提交成功。
- Library: 管理触发器与浮层关联、定位、碰撞、焦点和 close 请求，保留表单原生语义。
- Application: 负责值、验证、提交与错误恢复；受控 open 不替代业务状态。

## Composition
- 可交互内容用 Popover；纯文本悬停补充用 Tooltip；需要独立模态任务时用 Dialog。

## Responsive behavior
- 根据可用高度滚动内容；窄屏仍提供触发与退出，表单长标签应保留可读宽度。

## Customization
- side、align 和 anchor 调整与对象的空间关系；tooltipStyle 只改变表面，不移除交互语义。

## Current exports
- Popover: const; owner popover; PASS
- PopoverClose: function; owner popover; PASS; props: PopoverPrimitive.Close.Props
- PopoverContent: function; owner popover; alias of PopoverPopup; PASS; props: PopoverPrimitive.Popup.Props & {
  portalProps?: PopoverPrimitive.Portal.Props;
  side?: PopoverPrimitive.Positioner.Props["side"];
  align?: PopoverPrimitive.Positioner.Props["align"];
  sideOffset?: PopoverPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: PopoverPrimitive.Positioner.Props["alignOffset"];
  tooltipStyle?: boolean;
  anchor?: PopoverPrimitive.Positioner.Props["anchor"];
}
- PopoverCreateHandle: const; owner popover; PASS
- PopoverDescription: function; owner popover; PASS; props: PopoverPrimitive.Description.Props
- PopoverPopup: function; owner popover; PASS; props: PopoverPrimitive.Popup.Props & {
  portalProps?: PopoverPrimitive.Portal.Props;
  side?: PopoverPrimitive.Positioner.Props["side"];
  align?: PopoverPrimitive.Positioner.Props["align"];
  sideOffset?: PopoverPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: PopoverPrimitive.Positioner.Props["alignOffset"];
  tooltipStyle?: boolean;
  anchor?: PopoverPrimitive.Positioner.Props["anchor"];
}
- PopoverPrimitive: reexport; owner popover; UNVERIFIED
- PopoverTitle: function; owner popover; PASS; props: PopoverPrimitive.Title.Props
- PopoverTrigger: function; owner popover; PASS; props: PopoverPrimitive.Trigger.Props

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Popover
根组件，管理打开状态。
- open / defaultOpen: boolean; default false. 受控 / 非受控的打开状态。
- onOpenChange: (open, details) => void. 打开状态变化时调用。
- modal: boolean | "trap-focus"; default false. 设为 true 时锁定页面滚动与外部交互。
- handle: PopoverCreateHandle(). 多个触发器共用一个浮层，切换时浮层平滑移动并变换尺寸。

### PopoverTrigger
触发按钮。
- openOnHover: boolean; default false. 悬停时也打开，配合 delay 使用。
- handle / payload: Handle / unknown. 与共享浮层关联，并传入要渲染的内容。

### PopoverPopup
浮层本体，自动避开视口边缘。别名 PopoverContent。
- side: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"; default "bottom". 相对触发器的方向，空间不足时自动翻转。
- align: "start" | "center" | "end"; default "center". 沿边的对齐方式。
- sideOffset / alignOffset: number; default 4 / 0. 与触发器的距离 / 对齐偏移。
- tooltipStyle: boolean; default false. 使用 Tooltip 的紧凑样式，适合触屏上的点击说明。
- anchor: Element | RefObject. 锚定到触发器以外的元素。

### PopoverTitle / PopoverDescription
标题与说明，自动关联为浮层的可访问名称与描述。

### PopoverClose
关闭浮层的按钮。

## Keyboard
- Enter / Space: 在触发器上打开或关闭。
- Esc: 关闭浮层，焦点回到触发器。
- Tab: 在浮层内移动焦点；移出浮层时自动关闭。

## Source examples
### 基础用法
Source: apps/docs/src/content/popover/demos/01-form.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Field } from "@qingye/ui/components/field";
import { Form } from "@qingye/ui/components/form";
import { Popover, PopoverDescription, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye/ui/components/popover";
import { Textarea } from "@qingye/ui/components/textarea";

export const meta = { title: "基础用法", description: "点击打开，承载一个简短的表单。" };

export default function Demo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>意见反馈</PopoverTrigger>
      <PopoverPopup className="w-80">
        <div className="mb-4 grid gap-1.5">
          <PopoverTitle className="text-base">意见反馈</PopoverTitle>
          <PopoverDescription>告诉我们哪里用得不顺手，产品团队每周都会阅读。</PopoverDescription>
        </div>
        <Form className="grid gap-3" onSubmit={(event) => event.preventDefault()}>
          <Field>
            <Textarea aria-label="反馈内容" placeholder="例如：批量导出时希望能选择字段" />
          </Field>
          <Button type="submit">提交反馈</Button>
        </Form>
      </PopoverPopup>
    </Popover>
  );
}
```

### 带关闭按钮
Source: apps/docs/src/content/popover/demos/02-close-button.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Popover, PopoverClose, PopoverDescription, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye/ui/components/popover";
import { BellIcon, XIcon } from "lucide-react";

export const meta = { title: "带关闭按钮", description: "PopoverClose 可放在任意位置，图标按钮需要 aria-label。" };

export default function Demo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button aria-label="通知" size="icon" variant="outline" />}>
        <BellIcon />
      </PopoverTrigger>
      <PopoverPopup className="w-72">
        <PopoverClose aria-label="关闭" className="absolute end-2 top-2" render={<Button size="icon-sm" variant="ghost" />}>
          <XIcon />
        </PopoverClose>
        <div className="mb-3 grid gap-1.5 pe-6">
          <PopoverTitle className="text-base">没有新通知</PopoverTitle>
          <PopoverDescription>今天的 12 条告警都已处理完毕。</PopoverDescription>
        </div>
        <PopoverClose render={<Button size="sm" variant="outline" />}>查看历史</PopoverClose>
      </PopoverPopup>
    </Popover>
  );
}
```

### 方向
Source: apps/docs/src/content/popover/demos/03-sides.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Popover, PopoverDescription, PopoverPopup, PopoverTrigger } from "@qingye/ui/components/popover";

export const meta = { title: "方向", description: "side 指定弹出方向；空间不足时自动翻转到对侧。" };

const sides = [
  { side: "top", label: "上方" },
  { side: "right", label: "右侧" },
  { side: "bottom", label: "下方" },
  { side: "left", label: "左侧" },
] as const;

export default function Demo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {sides.map(({ side, label }) => (
        <Popover key={side}>
          <PopoverTrigger render={<Button variant="outline" />}>{label}</PopoverTrigger>
          <PopoverPopup className="w-56" side={side}>
            <PopoverDescription>从{label}弹出，与触发器保持 4px 间距。</PopoverDescription>
          </PopoverPopup>
        </Popover>
      ))}
    </div>
  );
}
```

### 多个触发器共用浮层
Source: apps/docs/src/content/popover/demos/04-shared.tsx
```tsx
import { Avatar, AvatarFallback } from "@qingye/ui/components/avatar";
import { Button } from "@qingye/ui/components/button";
import { Popover, PopoverCreateHandle, PopoverDescription, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye/ui/components/popover";
import { BellIcon, UserIcon } from "lucide-react";
import type { ComponentType } from "react";

export const meta = {
  title: "多个触发器共用浮层",
  description: "通过 handle 共用一个浮层，在触发器之间切换时，浮层平滑移动并变换尺寸。",
};

const handle = PopoverCreateHandle<ComponentType>();

function Notifications() {
  return (
    <div className="grid gap-1.5">
      <PopoverTitle className="text-base">通知</PopoverTitle>
      <PopoverDescription>暂时没有新的通知。</PopoverDescription>
    </div>
  );
}

function Profile() {
  return (
    <div className="grid w-52 gap-3">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>林</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <PopoverTitle className="truncate font-medium text-sm">林嘉禾</PopoverTitle>
          <PopoverDescription className="text-xs">产品设计师</PopoverDescription>
        </div>
      </div>
      <Button size="sm" variant="outline">
        退出登录
      </Button>
    </div>
  );
}

export default function Demo() {
  return (
    <div className="flex gap-2">
      <PopoverTrigger handle={handle} payload={Notifications} render={<Button aria-label="通知" size="icon" variant="outline" />}>
        <BellIcon />
      </PopoverTrigger>
      <PopoverTrigger handle={handle} payload={Profile} render={<Button aria-label="个人资料" size="icon" variant="outline" />}>
        <UserIcon />
      </PopoverTrigger>
      <Popover handle={handle}>
        {({ payload: Content }) => <PopoverPopup>{Content ? <Content /> : null}</PopoverPopup>}
      </Popover>
    </div>
  );
}
```

### 点击说明
Source: apps/docs/src/content/popover/demos/05-tooltip-style.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Popover, PopoverPopup, PopoverTrigger } from "@qingye/ui/components/popover";
import { InfoIcon } from "lucide-react";

export const meta = {
  title: "点击说明",
  description: "tooltipStyle 使用提示的紧凑样式。触屏没有悬停，需要让用户点开的说明用它代替 Tooltip。",
};

export default function Demo() {
  return (
    <p className="flex items-center gap-1 text-sm">
      <span className="numeric font-medium">设备在线率 96.4%</span>
      <Popover>
        <PopoverTrigger render={<Button aria-label="指标说明" size="icon-xs" variant="ghost" />}>
          <InfoIcon />
        </PopoverTrigger>
        <PopoverPopup className="max-w-60" side="top" tooltipStyle>
          过去 24 小时内至少上报过一次心跳的设备占比。
        </PopoverPopup>
      </Popover>
    </p>
  );
}
```


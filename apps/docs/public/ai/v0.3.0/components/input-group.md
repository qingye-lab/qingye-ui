# 输入框组合 InputGroup

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/input-group
Source: packages/ui/src/components/input-group.tsx
Source SHA-256: abb49bda6cea57df0665dc5b8c09c108fc49e2c2a1c74cc4ef71cf07d0133430

在输入框内部加前后缀文字、图标、按键提示、按钮或工具栏，整体共用一个边框与焦点环。

## Use and ownership
- 让单位、附属动作或提示与一个文本工作区共享边界。
- Avoid: 装饰图标不能变成第二个字段；addon 点击不能抢走链接或按钮自己的操作。
- Library: 输入部位、addon 焦点分派与公共按钮组合。
- Application: 文本值、附属命令的业务后果和请求。

## Composition
- Input 或 Textarea 是主工作区；inline addon 放短前后缀，block addon 放工具栏。

## Responsive behavior
- 输入可收缩，附属动作保留；多行工具栏占独立行，长提示不挤压编辑区。

## Customization
- Addon align 表达位置关系，InputGroupButton 复用 Button 的动作状态。

## Current exports
- InputGroup: function; owner input-group; PASS; props: React.ComponentProps<"div">
- InputGroupAddon: function; owner input-group; PASS; props: React.ComponentProps<"div"> &
  VariantProps<typeof inputGroupAddonVariants>
- InputGroupButton: function; owner input-group; PASS; props: Omit<ButtonProps, "size"> & {
  size?: "xs" | "sm" | "icon-xs" | "icon-sm";
}
- InputGroupInput: function; owner input-group; PASS; props: InputProps
- InputGroupText: function; owner input-group; PASS; props: React.ComponentProps<"span">
- InputGroupTextarea: function; owner input-group; PASS; props: TextareaProps

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### InputGroup
外框，role="group"。焦点、无效、禁用状态由内部输入框驱动。

### InputGroupInput / InputGroupTextarea
去掉自身边框的 Input / Textarea，接受它们的全部属性（含 size）。在源码中放在 Addon 之前，Tab 顺序先到输入框。

### InputGroupAddon
附加区域。点击非交互内容时把焦点交给输入框。
- align: "inline-start" | "inline-end" | "block-start" | "block-end"; default "inline-start". 位置：行内首尾，或输入框上方 / 下方（多用于 textarea 工具栏）。

### InputGroupText
前后缀文字，如 https://、¥、kg，弱化显示。

### InputGroupButton
适配组内尺寸的按钮，默认 ghost + icon-xs。
- size: "xs" | "sm" | "icon-xs" | "icon-sm"; default "icon-xs". 按钮尺寸；lg 输入框配 icon-sm。
- variant: ButtonProps["variant"]; default "ghost". 按钮样式。

## Keyboard
- Tab: 依次聚焦输入框与组内按钮。

## Source examples
### 图标
Source: apps/docs/src/content/input-group/demos/01-icon.tsx
```tsx
import { InputGroup, InputGroupAddon, InputGroupInput } from "@qingye/ui/components/input-group";
import { MailIcon, MapPinIcon } from "lucide-react";

export const meta = { title: "图标", description: "图标放在首端说明内容类型，放在末端作为状态提示。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <InputGroup>
        <InputGroupInput aria-label="邮箱" placeholder="name@company.com" type="email" />
        <InputGroupAddon>
          <MailIcon aria-hidden="true" />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput aria-label="收货地址" defaultValue="杭州市西湖区文三路 90 号" />
        <InputGroupAddon align="inline-end">
          <MapPinIcon aria-hidden="true" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
```

### 前后缀文字
Source: apps/docs/src/content/input-group/demos/02-text.tsx
```tsx
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@qingye/ui/components/input-group";

export const meta = { title: "前后缀文字", description: "协议、域名、货币、单位等固定部分。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <InputGroup>
        <InputGroupInput aria-label="工作区地址" className="*:[input]:px-0!" placeholder="your-team" />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupText>.qingye.example</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput aria-label="单价" className="numeric" defaultValue="1,280.00" inputMode="decimal" />
        <InputGroupAddon>
          <InputGroupText>¥</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupText>元 / 台</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput aria-label="包裹重量" className="numeric" defaultValue="2.5" inputMode="decimal" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>kg</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
```

### 按钮
Source: apps/docs/src/content/input-group/demos/03-button.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@qingye/ui/components/input-group";
import { ArrowRightIcon, InfoIcon, RefreshCwIcon } from "lucide-react";

export const meta = { title: "按钮", description: "InputGroupButton 默认是 ghost + icon-xs，与输入框内边距对齐。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <InputGroup>
        <InputGroupInput aria-label="邀请码" defaultValue="YQ8K-2M4P" readOnly />
        <InputGroupAddon align="inline-end">
          <InputGroupButton aria-label="重新生成">
            <RefreshCwIcon aria-hidden="true" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput aria-label="订阅邮箱" placeholder="输入邮箱订阅周报" type="email" />
        <InputGroupAddon align="inline-end">
          <Button size="xs" variant="secondary">
            订阅
            <ArrowRightIcon aria-hidden="true" />
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput aria-label="用户名" placeholder="用户名" />
        <InputGroupAddon>
          <InputGroupButton aria-label="用户名规则">
            <InfoIcon aria-hidden="true" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
```

### 按键提示与加载
Source: apps/docs/src/content/input-group/demos/04-kbd.tsx
```tsx
import { InputGroup, InputGroupAddon, InputGroupInput } from "@qingye/ui/components/input-group";
import { Kbd } from "@qingye/ui/components/kbd";
import { Spinner } from "@qingye/ui/components/spinner";
import { SearchIcon } from "lucide-react";

export const meta = { title: "按键提示与加载", description: "末端放快捷键提示，或在查询时显示 Spinner。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <InputGroup>
        <InputGroupInput aria-keyshortcuts="Meta+K" aria-label="搜索" placeholder="搜索设备、工单…" type="search" />
        <InputGroupAddon>
          <SearchIcon aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd aria-hidden="true">⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput aria-label="快递单号" defaultValue="SF1402 8876 3310" />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
```

### 尺寸
Source: apps/docs/src/content/input-group/demos/05-sizes.tsx
```tsx
import { InputGroup, InputGroupAddon, InputGroupInput } from "@qingye/ui/components/input-group";
import { SearchIcon } from "lucide-react";

export const meta = { title: "尺寸", description: "size 写在 InputGroupInput 上，附加区域随之调整内边距。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      {(["sm", "default", "lg"] as const).map((size) => (
        <InputGroup key={size}>
          <InputGroupInput aria-label="搜索" placeholder={`搜索（${size}）`} size={size} type="search" />
          <InputGroupAddon>
            <SearchIcon aria-hidden="true" />
          </InputGroupAddon>
        </InputGroup>
      ))}
    </div>
  );
}
```

### 状态
Source: apps/docs/src/content/input-group/demos/06-states.tsx
```tsx
import { Field, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "@qingye/ui/components/input-group";
import { ArrowRightIcon } from "lucide-react";

export const meta = { title: "状态", description: "无效与禁用作用于整个组合。" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-xs gap-5">
      <Field invalid>
        <FieldLabel>回调地址</FieldLabel>
        <InputGroup>
          <InputGroupInput className="*:[input]:ps-0!" defaultValue="hooks.example" />
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <FieldError>请填写完整域名，例如 hooks.example.com</FieldError>
      </Field>
      <Field disabled>
        <FieldLabel>订阅邮箱</FieldLabel>
        <InputGroup>
          <InputGroupInput placeholder="name@company.com" type="email" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton aria-label="订阅" disabled>
              <ArrowRightIcon aria-hidden="true" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </div>
  );
}
```

### 组合：消息输入框
Source: apps/docs/src/content/input-group/demos/07-textarea.tsx
```tsx
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupTextarea } from "@qingye/ui/components/input-group";
import { ArrowUpIcon, AtSignIcon, PaperclipIcon } from "lucide-react";

export const meta = { title: "组合：消息输入框", description: "block-end 附加区域作为底部工具栏。" };

export default function Demo() {
  return (
    <InputGroup className="max-w-md">
      <InputGroupTextarea aria-label="回复工单" placeholder="回复客户，Shift + Enter 换行" />
      <InputGroupAddon align="block-end">
        <InputGroupButton aria-label="添加附件" size="icon-sm">
          <PaperclipIcon aria-hidden="true" />
        </InputGroupButton>
        <InputGroupButton aria-label="提及同事" size="icon-sm">
          <AtSignIcon aria-hidden="true" />
        </InputGroupButton>
        <InputGroupText className="ms-auto text-xs">内部可见</InputGroupText>
        <InputGroupButton aria-label="发送" size="icon-sm" variant="default">
          <ArrowUpIcon aria-hidden="true" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
```

### 组合：内嵌标签
Source: apps/docs/src/content/input-group/demos/08-label.tsx
```tsx
import { InputGroup, InputGroupAddon, InputGroupInput } from "@qingye/ui/components/input-group";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "组合：内嵌标签", description: "block-start 附加区域放标签，适合紧凑的卡片表单。" };

export default function Demo() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput id="ig-company" placeholder="例如：杭州言青科技有限公司" />
      <InputGroupAddon align="block-start">
        <Label htmlFor="ig-company">公司名称</Label>
      </InputGroupAddon>
    </InputGroup>
  );
}
```


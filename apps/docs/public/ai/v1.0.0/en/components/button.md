# Button

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/button
Source: packages/ui/src/components/button.tsx
Source SHA-256: aa02056a504dad182e167cd505d244a5cbcde34058ea1cd04c0a6e23daf1f350

Trigger a named action with a clear object and consequence. The caller owns its state.

## Decision
A button only triggers an action, and busy is its only state: while busy it retains focus and blocks repeated activation. Success, failure and an unknown result are separate facts expressed by feedback components (Alert in place, Toast for brief feedback, FieldError for a field); consequences and confirmation belong to AlertDialog. Tone never grants permission.

## Notes
- Danger is only a tone: it grants no permission and replaces no confirmation. Use AlertDialog when the user must know the consequence before deciding.
- While busy the action's accessible name stays unchanged; “In progress” reaches screen readers through a description and an invisible live region, and no visible status text sits beside the button. A label button adds a spinning mark after its name; on an icon button the mark temporarily stands in for its glyph.
- state (waiting / in-progress / unknown / failed) is removed in favour of loading. Failure and unknown results formerly written beside the button are expressed by Alert, Toast, FieldError or StatusDot.
- Use a native anchor or router Link with buttonVariants for navigation. A nativeButton=false Button remains a command.
- touch-target expands small controls to the library's 44px touch target without changing visual dimensions or shrinking it with density.
- When a solid action lacks contrast with its parent, the consumer adds a visible boundary through className and uses the matching padding-bordered profile. The same-surface example demonstrates this entry; the component does not inspect the DOM to infer its surface.

## Use and ownership
- Run a command with an object and consequence, submit a form, or stop the current task.
- Avoid: Use native links for navigation.
- Avoid: Writing the result into the button: the end of busy does not establish success; express failure and unknown results with Alert, Toast or FieldError.
- Library: Native and non-native command semantics, focus, and the activation guard and screen-reader wording while busy.
- Application: Objects, scope, consequences, permissions, request facts, verification, recovery, and background cancellation.

## Composition
- For an irreversible action the button is only the entry: it opens AlertDialog (or ConfirmAction), whose description states the consequence. Applications own confirmation criteria, permissions, and remote verification.
- A two-state fact that persists after pressing (selected, on) is a Toggle; one of several is SegmentedControl, several of several is ToggleGroup. Button triggers an action and holds no selection.

## Responsive behavior
- Choose dimensions for position; long labels may wrap and grow, icons retain matching geometry, and touch targets remain separate from appearance.

## Customization
- variant, tone, size, and shape independently select presentation, consequence, dimensions, and content form.

## Current exports
- Button: function; owner button; PASS; props: ButtonProps
- ButtonPrimitive: reexport; owner button; UNVERIFIED
- ButtonProps: interface; owner button; PASS
- buttonVariants: const; owner button; UNVERIFIED

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Button
Renders a native type=button control by default and forwards native attributes, refs, events, and derived data-slot values. It never advances its own operation state.
- variant: "solid" | "bordered" | "quiet"; default "solid". Filled, bordered, or borderless presentation; it does not express permission.
- tone: "neutral" | "danger"; default "neutral". Tone. danger marks an action with an irreversible consequence and changes color only; the consequence text and confirmation are not carried by the button. Use AlertDialog or ConfirmAction.
- size: "xs" | "sm" | "md" | "lg" | "xl"; default "md". Choose by position, independently of emphasis.
- shape: "label" | "icon"; default "label". Icon is a shape, not another size. Supply aria-label or aria-labelledby for it.
- loading: boolean; default false. A caller-owned fact: this action is running. Shows a spinning mark, sets aria-busy, retains focus and blocks repeat activation; the button starts no request and never infers when it ends.
- disabled: boolean; default false. Makes the action unavailable and removes it from the tab order. It may coexist with loading.
- render: ReactElement | (props, state) => ReactElement. The Base UI composition entry for another command carrier or trigger. Preserve its actual semantics.
- nativeButton: boolean; default true. Set false for a non-button command carrier; it retains button semantics. Use a native anchor with buttonVariants for navigation.

### buttonVariants
The same size, shape, emphasis, and tone styles for compositions that retain native element semantics, such as links.

### ButtonPrimitive
The Base UI accessibility primitive. Prefer Button in applications.

## Keyboard
- Enter / Space: Activate an available action. A busy action does not activate.
- Tab / Shift+Tab: Move focus. A busy action retains its position; disabled actions leave the tab order.
- ArrowUp / ArrowDown: Follow the primitive's menu or list trigger behavior. A busy trigger does not open.

## Source examples
### 变体与色调
Source: apps/docs/src/content/button/demos/01-variants.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";

export const meta = { title: "变体与色调", titleEn: "Variants and tones" };

export default function Demo() {
  return (
    <div className="flex w-full flex-col gap-(--qy-section-gap)">
      <div className="flex flex-wrap gap-(--qy-action-gap)">
        <Button>保存</Button>
        <Button variant="bordered">取消</Button>
        <Button variant="quiet">编辑</Button>
      </div>
      <div className="flex flex-wrap gap-(--qy-action-gap)">
        <Button tone="danger">删除</Button>
        <Button tone="danger" variant="bordered">删除</Button>
        <Button tone="danger" variant="quiet">删除</Button>
      </div>
    </div>
  );
}
```

### 位置与尺寸
Source: apps/docs/src/content/button/demos/02-sizes.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";

export const meta = { title: "位置与尺寸", titleEn: "Size by position" };

export default function Demo() {
  return <>
    <Button size="xs" variant="quiet">编辑此行</Button>
    <Button size="sm" variant="quiet">筛选设备</Button>
    <Button size="md">保存设置</Button>
    <Button size="lg">登录工作区</Button>
    <Button size="xl">创建工作区</Button>
  </>;
}
```

### 图标形态
Source: apps/docs/src/content/button/demos/03-icon-sizes.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { IconPlus } from "@tabler/icons-react";

export const meta = { title: "图标形态", titleEn: "Icon shape" };

export default function Demo() {
  return <>
    {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
      <Button aria-label="新建设备" key={size} shape="icon" size={size} variant="quiet">
        <IconPlus aria-hidden="true" />
      </Button>
    ))}
  </>;
}
```

### 动作与图标
Source: apps/docs/src/content/button/demos/04-with-icon.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { IconArrowRight, IconChevronDown, IconDownload } from "@tabler/icons-react";

export const meta = { title: "动作与图标", titleEn: "Actions and icons" };

export default function Demo() {
  return <>
    <Button variant="quiet"><IconDownload aria-hidden="true" />导出十月报表</Button>
    <Button>查看核对结果<IconArrowRight aria-hidden="true" /></Button>
    <Button variant="quiet">设备操作<IconChevronDown aria-hidden="true" /></Button>
  </>;
}
```

### 链接
Source: apps/docs/src/content/button/demos/05-link.tsx
```tsx
import { buttonVariants } from "@qingye_lab/ui/components/button";
import { IconExternalLink } from "@tabler/icons-react";

export const meta = { title: "链接", titleEn: "Links" };

export default function Demo() {
  return (
    <div className="flex flex-wrap gap-(--qy-action-gap)">
      <a className={buttonVariants({ variant: "quiet" })} href="/docs/button">按钮文档</a>
      <a className={buttonVariants({ variant: "bordered" })} href="/design.md" rel="noreferrer" target="_blank">
        设计指南<IconExternalLink aria-hidden="true" />
      </a>
    </div>
  );
}
```

### 忙碌与禁用
Source: apps/docs/src/content/button/demos/06-states.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { IconDeviceFloppy } from "@tabler/icons-react";

export const meta = { title: "忙碌与禁用", titleEn: "Busy and disabled" };

export default function Demo() {
  return (
    <div className="grid w-full gap-(--qy-section-gap)">
      <div className="flex flex-wrap gap-(--qy-action-gap)">
        <Button>保存</Button>
        <Button loading>保存</Button>
        <Button disabled>保存</Button>
      </div>
      <div className="flex flex-wrap gap-(--qy-action-gap)">
        <Button aria-label="保存" shape="icon" variant="quiet"><IconDeviceFloppy aria-hidden="true" /></Button>
        <Button aria-label="保存" loading shape="icon" variant="quiet"><IconDeviceFloppy aria-hidden="true" /></Button>
        <Button aria-label="保存" disabled shape="icon" variant="quiet"><IconDeviceFloppy aria-hidden="true" /></Button>
      </div>
    </div>
  );
}
```

### 组合：同底色的边界
Source: apps/docs/src/content/button/demos/07-boundary.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";

export const meta = { title: "组合：同底色的边界", titleEn: "Composition: boundary on the same surface" };

export default function Demo() {
  return <div className="w-full rounded-panel bg-(--device-carrier) [--device-carrier:var(--qy-primary)] [--device-boundary:var(--qy-primary-foreground)] p-(--qy-panel-padding) text-primary-foreground">
    {/* 基础层 §5：实心入口与父面同色，显式补必要边界，并消费 §1 的边框换算。 */}
    <Button className="border border-(--device-boundary) px-(--qy-control-md-padding-bordered) focus-visible:ring-0 focus-visible:border-(--device-boundary) focus-visible:inset-ring-[length:var(--qy-focus-quiet-width)] focus-visible:inset-ring-(--device-boundary)">继续核对设备</Button>
  </div>;
}
```

### 结果由提示组件表达
Source: apps/docs/src/content/button/demos/08-result.tsx
```tsx
import { Alert, AlertDescription, AlertTitle } from "@qingye_lab/ui/components/alert";
import { Button } from "@qingye_lab/ui/components/button";
import { Stack } from "@qingye_lab/ui/components/layout";
import { IconAlertCircle } from "@tabler/icons-react";
import * as React from "react";

export const meta = { title: "结果由提示组件表达", titleEn: "Results belong to feedback components" };

// 按钮只有忙碌一种状态；失败是另一件事实，写在就地说明里，按钮回到可用。
export default function Demo() {
  const [phase, setPhase] = React.useState<"idle" | "saving" | "failed">("idle");
  const timer = React.useRef<number | undefined>(undefined);
  React.useEffect(() => () => window.clearTimeout(timer.current), []);
  const save = () => { setPhase("saving"); timer.current = window.setTimeout(() => setPhase("failed"), 900); };
  return (
    <Stack gap="fields" className="w-full max-w-md">
      {phase === "failed" && (
        <Alert tone="danger">
          <IconAlertCircle aria-hidden="true" />
          <div className="grid gap-1"><AlertTitle>保存未完成</AlertTitle><AlertDescription>连接中断，填写的内容仍在。</AlertDescription></div>
        </Alert>
      )}
      <div><Button loading={phase === "saving"} onClick={save}>保存</Button></div>
    </Stack>
  );
}
```

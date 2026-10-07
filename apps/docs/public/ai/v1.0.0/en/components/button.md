# Button

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/button
Source: packages/ui/src/components/button.tsx
Source SHA-256: 917075f0aba4a2e8a107f94beb71a3ab4cb1d6d59bd2e2190f2348b815942c7e

Trigger a named action with a clear object and consequence. The caller owns its state.

## Decision
Waiting, in-progress, and unknown states retain focus and block repeated activation. The caller must verify an unknown result. Danger actions require a visible consequence; tone never grants permission.

## Notes
- The action's accessible name stays unchanged. Status uses a separate description and live region. Label buttons also display status text; icon buttons use distinct status glyphs.
- Danger tone grants no permission. Describe the consequence for the actual object; the caller owns confirmation conditions and verification.
- The danger association is checked in an effect after mounting. Adjacent text mounted in the same commit is available. SSR skips validation; development throws after DOM commit. Mount asynchronous descriptions before enabling danger. Production does not throw. Text presence alone does not prove a correct or visible consequence; the caller must verify it.
- Unknown results block repeated execution by default. Provide a separate verification action and update state only after reliable facts arrive.
- Use a native anchor or router Link with buttonVariants for navigation. A nativeButton=false Button remains a command.
- touch-target expands small controls to the library's 44px touch target without changing visual dimensions or shrinking it with density.
- When a solid action lacks contrast with its parent, the consumer adds a visible boundary through className and uses the matching padding-bordered profile. The same-surface example demonstrates this entry; the component does not inspect the DOM to infer its surface.

## Use and ownership
- Run a command with an object and consequence, submit a form, or stop the current task.
- Avoid: Use native links for navigation. Finished waiting does not establish success, and unknown is neither failure nor permission to retry immediately.
- Library: Native and non-native command semantics, focus, activation guards, action names, and localized states.
- Application: Objects, scope, consequences, permissions, request facts, verification, recovery, and background cancellation.

## Composition
- Danger actions use ButtonProtection or aria-describedby associated with existing nonblank consequence text. Applications own confirmation criteria, permissions, and remote verification.

## Responsive behavior
- Choose dimensions for position; long labels may wrap and grow, icons retain matching geometry, and touch targets remain separate from appearance.

## Customization
- variant, tone, size, and shape independently select presentation, consequence, dimensions, and content form.

## Current exports
- Button: function; owner button; PASS; props: ButtonProps
- ButtonPrimitive: reexport; owner button; UNVERIFIED
- ButtonProps: interface; owner button; PASS
- ButtonProtection: function; owner button; PASS; props: ButtonProtectionProps
- ButtonProtectionProps: interface; owner button; PASS
- ButtonState: type; owner button; PASS
- buttonVariants: const; owner button; UNVERIFIED

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Button
Renders a native type=button control by default and forwards native attributes, refs, events, and derived data-slot values. It never advances its own operation state.
- variant: "solid" | "bordered" | "quiet"; default "solid". Filled, bordered, or borderless presentation; it does not express permission.
- tone: "neutral" | "danger"; default "neutral". The action's consequence. Use ButtonProtection or aria-describedby linked to existing nonblank text. Development validation runs after mounting; production does not throw.
- size: "xs" | "sm" | "md" | "lg" | "xl"; default "md". Choose by position, independently of emphasis.
- shape: "label" | "icon"; default "label". Icon is a shape, not another size. Supply aria-label or aria-labelledby for it.
- state: "idle" | "waiting" | "in-progress" | "unknown" | "failed"; default "idle". Caller-owned facts. Waiting and in-progress set aria-busy; unknown remains distinct. Those three states block repeat activation. The caller may provide recovery after confirmed failure.
- disabled: boolean; default false. Makes the action unavailable and removes it from the tab order. It may coexist with an unfinished state.
- render: ReactElement | (props, state) => ReactElement. The Base UI composition entry for another command carrier or trigger. Preserve its actual semantics.
- nativeButton: boolean; default true. Set false for a non-button command carrier; it retains button semantics. Use a native anchor with buttonVariants for navigation.

### ButtonProtection
Groups a visible consequence with actions and links aria-describedby. A Button can directly reference an existing description instead. The container requires nonblank consequence text; it does not confirm, authorize, or run a request.
- consequence: string. Required nonblank text describing the consequence for the current object, version, and change.
- children: ReactNode. Related actions and any required exit.

### buttonVariants
The same size, shape, emphasis, and tone styles for compositions that retain native element semantics, such as links.

### ButtonPrimitive
The Base UI accessibility primitive. Prefer Button's state and protection contract in applications.

## Keyboard
- Enter / Space: Activate an available action. Waiting, in-progress, and unknown actions do not activate.
- Tab / Shift+Tab: Move focus. Unfinished states retain their position; disabled actions leave the tab order.
- ArrowUp / ArrowDown: Follow the primitive's menu or list trigger behavior. Unfinished states block opening.

## Source examples
### 变体与色调
Source: apps/docs/src/content/button/demos/01-variants.tsx
```tsx
import { Button, ButtonProtection } from "@qingye/ui/components/button";

export const meta = { title: "变体与色调", titleEn: "Variants and tones" };

export default function Demo() {
  return (
    <div className="flex w-full flex-col gap-(--qy-section-gap)">
      <div className="flex flex-wrap gap-(--qy-action-gap)">
        <Button>保存</Button>
        <Button variant="bordered">取消</Button>
        <Button variant="quiet">编辑</Button>
      </div>
      <ButtonProtection consequence="删除后，内容无法恢复。">
        <Button tone="danger">删除</Button>
        <Button tone="danger" variant="bordered">删除</Button>
        <Button tone="danger" variant="quiet">删除</Button>
      </ButtonProtection>
    </div>
  );
}
```

### 位置与尺寸
Source: apps/docs/src/content/button/demos/02-sizes.tsx
```tsx
import { Button } from "@qingye/ui/components/button";

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
import { Button } from "@qingye/ui/components/button";
import { PlusIcon } from "lucide-react";

export const meta = { title: "图标形态", titleEn: "Icon shape" };

export default function Demo() {
  return <>
    {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
      <Button aria-label="新建设备" key={size} shape="icon" size={size} variant="quiet">
        <PlusIcon aria-hidden="true" />
      </Button>
    ))}
  </>;
}
```

### 动作与图标
Source: apps/docs/src/content/button/demos/04-with-icon.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { ArrowRightIcon, ChevronDownIcon, DownloadIcon } from "lucide-react";

export const meta = { title: "动作与图标", titleEn: "Actions and icons" };

export default function Demo() {
  return <>
    <Button variant="quiet"><DownloadIcon aria-hidden="true" />导出十月报表</Button>
    <Button>查看核对结果<ArrowRightIcon aria-hidden="true" /></Button>
    <Button variant="quiet">设备操作<ChevronDownIcon aria-hidden="true" /></Button>
  </>;
}
```

### 链接
Source: apps/docs/src/content/button/demos/05-link.tsx
```tsx
import { buttonVariants } from "@qingye/ui/components/button";
import { ExternalLinkIcon } from "lucide-react";

export const meta = { title: "链接", titleEn: "Links" };

export default function Demo() {
  return (
    <div className="flex flex-wrap gap-(--qy-action-gap)">
      <a className={buttonVariants({ variant: "quiet" })} href="/docs/button">按钮文档</a>
      <a className={buttonVariants({ variant: "bordered" })} href="/design.md" rel="noreferrer" target="_blank">
        设计指南<ExternalLinkIcon aria-hidden="true" />
      </a>
    </div>
  );
}
```

### 状态
Source: apps/docs/src/content/button/demos/06-states.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { SaveIcon } from "lucide-react";

export const meta = { title: "状态", titleEn: "States" };

export default function Demo() {
  return (
    <div className="grid w-full gap-(--qy-section-gap)">
      <div className="flex flex-wrap gap-(--qy-action-gap)">
        {(["idle", "waiting", "in-progress", "unknown", "failed"] as const).map((state) => (
          <Button key={state} state={state}>保存</Button>
        ))}
        <Button disabled>保存</Button>
      </div>
      <div className="flex flex-wrap gap-(--qy-action-gap)">
        {(["waiting", "in-progress", "unknown", "failed"] as const).map((state) => (
          <Button aria-label="保存" key={state} shape="icon" state={state} variant="quiet"><SaveIcon aria-hidden="true" /></Button>
        ))}
        <Button aria-label="保存" disabled shape="icon" variant="quiet"><SaveIcon aria-hidden="true" /></Button>
      </div>
    </div>
  );
}
```

### 组合：同底色的边界
Source: apps/docs/src/content/button/demos/07-boundary.tsx
```tsx
import { Button } from "@qingye/ui/components/button";

export const meta = { title: "组合：同底色的边界", titleEn: "Composition: boundary on the same surface" };

export default function Demo() {
  return <div className="w-full rounded-panel bg-(--device-carrier) [--device-carrier:var(--qy-primary)] [--device-boundary:var(--qy-primary-foreground)] p-(--qy-panel-padding) text-primary-foreground">
    {/* 基础层 §5：实心入口与父面同色，显式补必要边界，并消费 §1 的边框换算。 */}
    <Button className="border border-(--device-boundary) px-(--qy-control-md-padding-bordered) focus-visible:ring-0 focus-visible:border-(--device-boundary) focus-visible:inset-ring-[length:var(--qy-focus-boundary-inset)] focus-visible:inset-ring-(--device-boundary)">继续核对设备</Button>
  </div>;
}
```

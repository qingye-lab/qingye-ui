# 按钮 Button

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/button
Source: packages/ui/src/components/button.tsx
Source SHA-256: 8ce98a093d8ada83f28ed805733269684452c9cdba5b848000a9b8ef65a6e420

触发有明确对象与后果的动作；状态由调用方持有。

## Use and ownership
- 执行有对象与后果的命令、提交表单或停止当前任务。
- Avoid: 导航用原生链接；不把等待结束当作成功，不把未知当作失败或可立即重试。
- Library: 原生与非原生命令语义、焦点、激活保护、动作名称及 locale 状态表达。
- Application: 对象、范围、后果、权限、请求事实、核实、恢复与取消后台任务。

## Composition
- 危险动作使用 ButtonProtection，或由自身 aria-describedby 关联已有的非空后果说明；确认条件、权限与远端核实属于应用。

## Responsive behavior
- 尺寸按位置选择；长标签可换行增高，图标形态保留同档几何；触摸命中区独立于外观。

## Customization
- variant、tone、size 与 shape 分别选择呈现、后果、尺寸与内容形态。

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
默认渲染 type=button 的原生按钮，透传原生属性、ref、事件和派生 data-slot。状态不会自行推进。
- variant: "solid" | "bordered" | "quiet"; default "solid". 填充、边框或无边框的表达，不表示权限。
- tone: "neutral" | "danger"; default "neutral". 动作后果；danger 使用 ButtonProtection，或 aria-describedby 关联文档中已有的非空说明。开发环境挂载后校验；生产环境不抛错。
- size: "xs" | "sm" | "md" | "lg" | "xl"; default "md". 按所在位置选尺寸，与强调独立。
- shape: "label" | "icon"; default "label". 图标是形态；icon 必须有 aria-label 或 aria-labelledby。
- state: "idle" | "waiting" | "in-progress" | "unknown" | "failed"; default "idle". 调用方持有的事实。等待与进行中设置 aria-busy；结果未知单独呈现。前三种未完成状态阻止重复触发，failed 可由调用方提供恢复操作。
- disabled: boolean; default false. 动作不可用，退出 Tab 顺序；与未完成事实可以共存。
- render: ReactElement | (props, state) => ReactElement. Base UI 组合入口，可渲染其他命令载体或触发器；保留真实语义。
- nativeButton: boolean; default true. 非 button 命令载体设为 false，仍使用按钮语义；导航使用原生 a + buttonVariants。

### ButtonProtection
可见后果与动作成组，并关联 aria-describedby；已有说明可由 Button 直接关联。容器的 consequence 必须非空，不替应用确认、判断权限或执行请求。
- consequence: string. 必填非空文字，说明当前对象、版本与变更的后果。
- children: ReactNode. 相关动作与必要退出入口。

### buttonVariants
与 Button 同一套尺寸、形态、强调和色调，用于保留原生链接等元素语义的组合。

### ButtonPrimitive
Base UI 无障碍原语；应用优先使用 Button 的状态与保护契约。

## Keyboard
- Enter / Space: 触发可用动作；等待、进行中或结果未知时不触发。
- Tab / Shift+Tab: 移入或移出焦点；未完成状态保留位置，disabled 退出 Tab 顺序。
- ArrowUp / ArrowDown: 组合菜单或列表触发器按原语操作；未完成状态阻止展开。

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


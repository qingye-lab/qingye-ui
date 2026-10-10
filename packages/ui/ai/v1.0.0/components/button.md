# 按钮 Button

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/button
Source: packages/ui/src/components/button.tsx
Source SHA-256: aa02056a504dad182e167cd505d244a5cbcde34058ea1cd04c0a6e23daf1f350

触发有明确对象与后果的动作；状态由调用方持有。

## Decision
按钮只触发动作，忙碌是它唯一的状态：忙碌时保留焦点并阻止重复触发。成功、失败与结果未知是另一件事实，由提示组件表达（就地说明用 Alert，短暂反馈用 Toast，字段错误用 FieldError）；后果与确认属于 AlertDialog。色调不代表授权。

## Notes
- 危险色调只是色调，不代表授权，也不替代确认；需要用户知道后果再决定时用 AlertDialog。
- 忙碌时动作的可访问名称不变；「进行中」通过 description 与不可见的 live region 告诉读屏，按钮旁没有可见的状态文字。文字形态在名称后加转动的记号，图标形态由记号暂时替下自己的图形。
- state（waiting / in-progress / unknown / failed）已移除，改为 loading。原来写在按钮旁的失败与结果未知，改由 Alert、Toast、FieldError 或 StatusDot 表达。
- 导航使用原生 a / Link + buttonVariants；nativeButton=false 的 Button 仍是命令语义。
- 小控件通过 touch-target 扩大命中区到本库 44px 目标，密度与外观尺寸不改变这一目标。
- 实心入口与父表面对比不足时，消费组合通过 className 添加可辨认边界，并使用同档 padding-bordered；同底色边界示例展示这一入口，组件不读取 DOM 推断承载面。

## Use and ownership
- 执行有对象与后果的命令、提交表单或停止当前任务。
- Avoid: 导航用原生链接。
- Avoid: 把结果写进按钮：忙碌结束不等于成功，失败与结果未知用 Alert、Toast 或 FieldError 表达。
- Library: 原生与非原生命令语义、焦点、忙碌时的激活保护与读屏说法。
- Application: 对象、范围、后果、权限、请求事实、核实、恢复与取消后台任务。

## Composition
- 有不可逆后果的动作：按钮只是入口，打开 AlertDialog（或 ConfirmAction），后果写在对话框的说明里；确认条件、权限与远端核实属于应用。
- 按下后保持的二态（已选中、已开启）用 Toggle；几个里选一个用 SegmentedControl，可多选用 ToggleGroup。Button 只触发动作，不持有选中。

## Responsive behavior
- 尺寸按位置选择；长标签可换行增高，图标形态保留同档几何；触摸命中区独立于外观。

## Customization
- variant、tone、size 与 shape 分别选择呈现、后果、尺寸与内容形态。

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
默认渲染 type=button 的原生按钮，透传原生属性、ref、事件和派生 data-slot。状态不会自行推进。
- variant: "solid" | "bordered" | "quiet"; default "solid". 填充、边框或无边框的表达，不表示权限。
- tone: "neutral" | "danger"; default "neutral". 色调。danger 表示动作有不可逆的后果，只改变颜色；后果说明与确认不由按钮承载，用 AlertDialog 或 ConfirmAction。
- size: "xs" | "sm" | "md" | "lg" | "xl"; default "md". 按所在位置选尺寸，与强调独立。
- shape: "label" | "icon"; default "label". 图标是形态；icon 必须有 aria-label 或 aria-labelledby。
- loading: boolean; default false. 调用方持有的事实：这个动作正在执行。显示转动的记号、设置 aria-busy、保留焦点并阻止重复触发；按钮不启动请求，也不推断何时结束。
- disabled: boolean; default false. 动作不可用，退出 Tab 顺序；可以与 loading 共存。
- render: ReactElement | (props, state) => ReactElement. Base UI 组合入口，可渲染其他命令载体或触发器；保留真实语义。
- nativeButton: boolean; default true. 非 button 命令载体设为 false，仍使用按钮语义；导航使用原生 a + buttonVariants。

### buttonVariants
与 Button 同一套尺寸、形态、强调和色调，用于保留原生链接等元素语义的组合。

### ButtonPrimitive
Base UI 无障碍原语；应用优先使用 Button。

## Keyboard
- Enter / Space: 触发可用动作；忙碌时不触发。
- Tab / Shift+Tab: 移入或移出焦点；忙碌时保留位置，disabled 退出 Tab 顺序。
- ArrowUp / ArrowDown: 组合菜单或列表触发器按原语操作；忙碌时阻止展开。

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

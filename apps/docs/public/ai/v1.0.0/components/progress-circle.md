# 圆形进度 ProgressCircle

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/progress-circle
Source: packages/ui/src/components/progress-circle.tsx
Source SHA-256: 342de4e6b166caa5e0a97c61b62d32af272eb443e1b67cc0783b4e526551a6f7

以圆形呈现同一可靠进度契约。

## Decision
不作为独立旋转动画；无可靠比例时 value=null。

## Use and ownership
- 位置适合圆形进度表达。
- Avoid: 不作为独立旋转动画；无可靠比例时 value=null。
- Library: 原生语义、公共组合与集中角色。
- Application: 对象、内容、值、状态与请求结果。

## Composition
- 复用 Progress 的范围、ARIA 与真实 null 的本地化进行中；可见名称在外部通过 aria-labelledby 关联。

## Responsive behavior
- 五档圆环采用独立尺寸角色及同名文字档；可见名称与读数在固定圆外通过 aria-labelledby 组合。

## Customization
- 使用公开 render/ref、ARIA、事件与样式；不混用主题三轴。

## Current exports
- ProgressCircle: function; owner progress-circle; PASS; props: ProgressCircleProps
- ProgressCirclePrimitive: reexport; owner progress-circle; alias of ProgressPrimitive; UNVERIFIED
- ProgressCircleProps: type; owner progress-circle; PASS
- ProgressCircleSize: type; owner progress-circle; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ProgressCircle
复用 Progress 的范围、ARIA 与真实 null 的本地化进行中；可见名称在外部通过 aria-labelledby 关联。
- value / min / max: Progress props. 与 Progress 相同的可靠值、0、null 与有效范围协议。
- size: "xs" | "sm" | "md" | "lg" | "xl"; default "md". 独立圆形尺寸角色，不影响进度事实。
- aria-label / aria-labelledby: string. 任务名称；可见名称保持在圆外。
- render / ref / 原生属性: current public component props. 属性、事件与ref透传实际元素；样式由className/style调整。

### ProgressCirclePrimitive
相同 Base UI Progress 公共原语；圆环不引入第二套任务事实。

## Keyboard

## Source examples
### 圆形进度
Source: apps/docs/src/content/progress-circle/demos/01-states.tsx
```tsx
import { useId } from "react";
import { ProgressCircle } from "@qingye/ui/components/progress-circle";
import { Inline, Stack } from "@qingye/ui/components/layout";
export const meta = { title: "圆形进度", titleEn: "Circular progress" };
export default function Demo() {
  const name = useId();
  return <Stack gap="fields"><span id={name} className="text-label">进度</span><Inline>{(["xs","sm","md","lg","xl"] as const).map(size => <Stack key={size} gap="field" align="center"><ProgressCircle size={size} value={50} aria-labelledby={name} /><span className="text-caption">50%</span></Stack>)}</Inline><Inline>{([0,100,null] as const).map((value,index) => <Stack key={index} gap="field" align="center"><ProgressCircle value={value} aria-labelledby={name} /><span className="text-caption">{value === null ? "进行中" : `${value}%`}</span></Stack>)}</Inline></Stack>;
}
```

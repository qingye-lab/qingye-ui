# 就地说明 Alert

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/alert
Source: packages/ui/src/components/alert.tsx
Source SHA-256: 97b34814cfcad2206f46c3642f1a034124a9296da207b58bc39db7537a2329df

静态就地说明，按实际需要显式宣告。

## Decision
不要为每段静态说明自动添加 assertive 宣告。

## Use and ownership
- 说明当前对象的条件、后果或已知结果。
- Avoid: 不要为每段静态说明自动添加 assertive 宣告。
- Library: 原生语义、公共组合与集中角色。
- Application: 对象、内容、值、状态与请求结果。

## Composition
- Title / Description 可与现有 Button 组合；默认无 live 角色。

## Responsive behavior
- 标题与说明开放排布；长中英文允许换行。

## Customization
- 使用公开 render/ref、ARIA、事件与样式；不混用主题三轴。

## Current exports
- Alert: function; owner alert; PASS; props: AlertProps
- AlertDescription: function; owner alert; PASS; props: useRender.ComponentProps<"div">
- AlertProps: type; owner alert; PASS
- AlertTitle: function; owner alert; PASS; props: useRender.ComponentProps<"div">

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Alert
Title / Description 可与现有 Button 组合；默认无 live 角色。
- tone: "neutral" | "info" | "warning" | "danger" | "success"; default "neutral". 已声明事实的语义颜色，不推断结果。
- role: "alert" | "status" | native role. 仅确有宣告需求时由调用方显式传入。
- render / ref / 原生属性: current public component props. 属性、事件与ref透传实际元素；样式由className/style调整。

### AlertTitle
就地说明标题；可透传 render 与原生属性。

### AlertDescription
就地说明正文；长文本允许换行。

## Keyboard

## Source examples
### 静态说明
Source: apps/docs/src/content/alert/demos/01-states.tsx
```tsx
import { Alert, AlertDescription, AlertTitle } from "@qingye/ui/components/alert";
import { Stack } from "@qingye/ui/components/layout";
export const meta = { title: "静态说明", titleEn: "Static information" };
export default function Demo() { return <Stack gap="section" className="max-w-sm"><Alert><AlertTitle>值</AlertTitle><AlertDescription>当前值可继续编辑</AlertDescription></Alert><Alert tone="warning"><AlertTitle>注意</AlertTitle><AlertDescription>条件尚未满足</AlertDescription></Alert><Alert tone="danger"><AlertTitle>已确认失败</AlertTitle><AlertDescription>原值仍在</AlertDescription></Alert></Stack>; }
```

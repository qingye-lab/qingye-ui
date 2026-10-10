# Alert

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/alert
Source: packages/ui/src/components/alert.tsx
Source SHA-256: bff3bfb8e4d04d941b8f839f3a8e741a3ba46c92a9011143453a4bcff9e064c6

Static local information, with announcements only when requested.

## Decision
Static explanations should not automatically make assertive announcements.

## Use and ownership
- Explain conditions, consequences, or known results for the current object.
- Avoid: Automatically making assertive announcements for static explanations.
- Library: Native semantics, public composition, and centralized roles.
- Application: Objects, content, values, states, and request outcomes.

## Composition
- Compose Title/Description with existing Button controls; there is no default live role.

## Responsive behavior
- Titles and explanations use open layout; long text in either language wraps.

## Customization
- Public render/refs, ARIA, events, and styles; keep theme axes independent.

## Current exports
- Alert: function; owner alert; PASS; props: AlertProps
- AlertDescription: function; owner alert; PASS; props: useRender.ComponentProps<"div">
- AlertProps: type; owner alert; PASS
- AlertTitle: function; owner alert; PASS; props: AlertTitleProps
- AlertTitleProps: type; owner alert; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Alert
Compose Title/Description with existing Button controls; there is no default live role.
- tone: "neutral" | "info" | "warning" | "danger" | "success"; default "neutral". Semantic colors for declared facts, without inferring outcomes.
- role: "alert" | "status" | native role. The caller supplies these only when an announcement is needed.
- render / ref / native props: current public component props. Forward attributes, events, and refs to the actual element; adjust presentation through className/style.

### AlertTitle
An in-place explanatory title; forwards render and native props.

### AlertDescription
In-place explanatory text that permits long content to wrap.

## Keyboard

## Source examples
### 就地说明
Source: apps/docs/src/content/alert/demos/01-states.tsx
```tsx
import { Alert, AlertDescription, AlertTitle } from "@qingye_lab/ui/components/alert";
import { Stack } from "@qingye_lab/ui/components/layout";
import { IconAlertCircle, IconCircleCheck, IconInfoCircle, IconAlertTriangle } from "@tabler/icons-react";

export const meta = { title: "就地说明", titleEn: "In-place notices" };


export default function Demo() {
  return <Stack gap="section" className="max-w-md">
    <Alert>
      <IconInfoCircle aria-hidden="true" />
      <div className="grid gap-1"><AlertTitle>草稿已保留</AlertTitle><AlertDescription>离开这一页不会丢失本次填写的内容。</AlertDescription></div>
    </Alert>
    <Alert tone="success">
      <IconCircleCheck aria-hidden="true" />
      <div className="grid gap-1"><AlertTitle>规则已启用</AlertTitle><AlertDescription>新的匹配条件对之后导入的记录生效。</AlertDescription></div>
    </Alert>
    <Alert tone="warning">
      <IconAlertTriangle aria-hidden="true" />
      <div className="grid gap-1"><AlertTitle>同步时间较旧</AlertTitle><AlertDescription>最近一次同步在 3 天前，数字可能不是最新的。</AlertDescription></div>
    </Alert>
    <Alert tone="danger">
      <IconAlertCircle aria-hidden="true" />
      <div className="grid gap-1"><AlertTitle>导出未完成</AlertTitle><AlertDescription>连接中断，原数据仍在，可以重新导出。</AlertDescription></div>
    </Alert>
  </Stack>;
}
```

# Alert

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/alert
Source: packages/ui/src/components/alert.tsx
Source SHA-256: 97b34814cfcad2206f46c3642f1a034124a9296da207b58bc39db7537a2329df

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
- AlertTitle: function; owner alert; PASS; props: useRender.ComponentProps<"div">

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
### 静态说明
Source: apps/docs/src/content/alert/demos/01-states.tsx
```tsx
import { Alert, AlertDescription, AlertTitle } from "@qingye/ui/components/alert";
import { Stack } from "@qingye/ui/components/layout";
export const meta = { title: "静态说明", titleEn: "Static information" };
export default function Demo() { return <Stack gap="section" className="max-w-sm"><Alert><AlertTitle>值</AlertTitle><AlertDescription>当前值可继续编辑</AlertDescription></Alert><Alert tone="warning"><AlertTitle>注意</AlertTitle><AlertDescription>条件尚未满足</AlertDescription></Alert><Alert tone="danger"><AlertTitle>已确认失败</AlertTitle><AlertDescription>原值仍在</AlertDescription></Alert></Stack>; }
```

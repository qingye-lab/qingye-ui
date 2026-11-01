# AsyncContent

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/async-content
Source: packages/ui/src/components/async-content.tsx
Source SHA-256: ff984eaf9c0ebd6721ed7198ee409a0ea629f91a265337afacb6b19328cae599

Present request status separately from content that remains valid.

## Decision
status describes the latest request; hasContent says whether existing content is still valid. Initial loading has no content; refresh and refresh failure retain content and component identity. Only success with hasContent=false shows an empty state. Applications must remove content if a permission change invalidates it.

## Notes
- Error feedback is wrapped in role=alert by the component, so errorContent need not add its own (nesting announces twice); retained content is never made live.
- Feedback always follows the content: refresh and failure do not push the content being read, only elements after it move with the feedback.
- hasContent means content is currently usable, not that a past request once succeeded. The app re-evaluates validity after scope or permission changes.

## Use and ownership
- Initial loading, confirmed empty results, failure and refresh with retained valid content.
- Avoid: Collapsing permission, read-only or partial failure into a mutually exclusive page request state.
- Avoid: Managing requests, caches or query races here.
- Library: Stable feedback/content structure, aria-busy on retained content while pending; loading feedback is a sibling so a busy ancestor does not defer its announcement.
- Application: Requests, cancellation, stale response isolation, validity, permissions, drafts and retries.

## Composition
- Place permission and read-only notices next to relevant content; use a local AsyncContent or Alert for partial failures.

## Responsive behavior
- Adds no scroll owner; composed feedback and recovery controls handle wrapping.

## Customization
- Use the current props and composition first, then adjust the project's central theme; fix shared gaps in the public library.
- Configure brand, light or dark mode, and density separately; themes do not change permissions or save policies.

## Current exports
- AsyncContent: function; owner async-content; PASS; props: AsyncContentProps
- AsyncContentProps: type; owner async-content; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### AsyncContent
- `children?`: `ReactNode`.
- `emptyContent`: `ReactNode`.
- `errorContent`: `ReactNode`.
- `hasContent`: `boolean`. 是否还有可用的内容。刷新与刷新失败时保持 true，避免卸载草稿与焦点。
- `loadingContent?`: `ReactNode`.
- `status`: `"pending" | "success" | "error"`. 应用声明的最近一次请求事实；组件不发请求，也不推断结果。
- plus 280 inherited (@types/react 279, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### AsyncContent
A content-state composition that makes no requests.
- status: "pending" | "success" | "error". Application-declared request fact; elapsed time never implies failure.
- hasContent / children: boolean / ReactNode. Valid content stays mounted without automatic disabling, draft clearing or focus movement.
- emptyContent / loadingContent / errorContent: ReactNode. emptyContent is required; error requires errorContent. Loading defaults to the locale. The app supplies retry actions.
- render / ref / native props: useRender.ComponentProps<div>. Semantics and props for the actual root; the root is not a live region, only error feedback carries role=alert.

## Keyboard

## Source examples
### 刷新失败保留备注
Source: apps/docs/src/content/async-content/demos/01-retained.tsx
```tsx
import { useState } from "react";
import { Alert, AlertDescription } from "@qingye_lab/ui/components/alert";
import { AsyncContent } from "@qingye_lab/ui/components/async-content";
import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "刷新失败保留备注", titleEn: "Keep a note after refresh failure" } satisfies DemoMeta;

export default function Demo() {
  const [status, setStatus] = useState<"pending" | "success" | "error">("success");
  // 用显式事件模拟请求完成；不会留下计时器，也不会把时间经过当作失败。
  return <Stack>
    <Inline>
      <Button variant="bordered" disabled={status === "pending"} onClick={() => setStatus("pending")}>刷新记录</Button>
      {status === "pending" && <><Button variant="quiet" onClick={() => setStatus("success")}>收到新结果</Button><Button variant="quiet" onClick={() => setStatus("error")}>连接中断</Button></>}
    </Inline>
    <AsyncContent status={status} hasContent emptyContent="没有记录"
      loadingContent={<p role="status" className="m-0 text-support text-muted-foreground">正在刷新，上次结果仍可用</p>}
      errorContent={<Alert tone="warning"><Stack gap="field"><AlertDescription>刷新失败，显示上次同步的记录。</AlertDescription><Button variant="quiet" onClick={() => setStatus("pending")}>重试</Button></Stack></Alert>}>
      <Stack gap="fields"><p className="m-0 text-body">桑园采叶记录 · 今天 07:55</p><Field><FieldLabel>本地备注</FieldLabel><Input placeholder="记录待核对事项" /></Field></Stack>
    </AsyncContent>
  </Stack>;
}
```

### 首次加载与零结果
Source: apps/docs/src/content/async-content/demos/02-first-load.tsx
```tsx
import { useState } from "react";
import { Alert, AlertDescription } from "@qingye_lab/ui/components/alert";
import { AsyncContent } from "@qingye_lab/ui/components/async-content";
import { Button } from "@qingye_lab/ui/components/button";
import { Empty, EmptyTitle, EmptyDescription } from "@qingye_lab/ui/components/empty";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "首次加载与零结果", titleEn: "Initial loading and confirmed empty results" } satisfies DemoMeta;
export default function Demo() {
  const [status, setStatus] = useState<"pending" | "success" | "error">("pending");
  return <Stack><Inline><Button variant="quiet" onClick={() => setStatus("pending")}>重新加载</Button><Button variant="quiet" onClick={() => setStatus("success")}>收到零条结果</Button><Button variant="quiet" onClick={() => setStatus("error")}>请求失败</Button></Inline>
    <AsyncContent status={status} hasContent={false}
      emptyContent={<Empty state="empty"><EmptyTitle level={3}>没有待同步记录</EmptyTitle><EmptyDescription>所有记录均已同步。</EmptyDescription></Empty>}
      errorContent={<Alert tone="danger"><Stack gap="field"><AlertDescription>记录暂时无法加载。</AlertDescription><Button variant="bordered" onClick={() => setStatus("pending")}>重试</Button></Stack></Alert>} />
  </Stack>;
}
```

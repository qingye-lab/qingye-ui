# 异步内容 AsyncContent

Package: @qingye_lab/ui@5.0.0
Import: @qingye_lab/ui/components/async-content
Source: packages/ui/src/components/async-content.tsx
Source SHA-256: ff984eaf9c0ebd6721ed7198ee409a0ea629f91a265337afacb6b19328cae599

分别呈现请求状态与仍然有效的内容。

## Decision
status 是最近请求的事实，hasContent 是应用对现有内容有效性的判断。首次加载没有内容；后台刷新和刷新失败保留内容及其组件身份。只有 success 且 hasContent=false 呈现空态。权限变化若使旧内容失效，应用须同时撤下它。

## Notes
- error 状态的反馈由组件包在 role=alert 里宣告，errorContent 不必再自带 role=alert（嵌套会重复播报）；有效内容不设为 live region。
- 反馈固定排在内容之后：刷新与失败时正在阅读的内容不被推动，只有其后的元素随反馈占位而移动。
- hasContent 表示当前可呈现的内容，不等同于曾经成功过；筛选范围或权限变化后，由应用判断旧内容是否仍有效。

## Use and ownership
- 首次加载、零结果、失败和保留有效内容的刷新。
- Avoid: 把权限、只读或局部失败塞进互斥的整页请求状态。
- Avoid: 用本组件管理请求、缓存或查询竞态。
- Library: 反馈与内容的稳定结构，pending 时保留内容区的 aria-busy；加载提示作为它的兄弟节点，避免播报被 busy 祖先延迟。
- Application: 请求、取消、迟到结果隔离、数据有效性、权限、草稿与重试。

## Composition
- 权限与只读说明放在 children 的相应部位；局部失败使用局部 AsyncContent 或 Alert。

## Responsive behavior
- 不创建滚动区；长反馈和恢复动作由所组合组件换行。

## Customization
- 先使用当前属性与组合，再调整项目集中主题；共享缺口在公共库修复。
- 品牌、明暗和密度分别配置，主题不改变权限或保存策略。

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
不发请求的内容状态组合。
- status: "pending" | "success" | "error". 应用声明请求事实，不用超时猜测失败。
- hasContent / children: boolean / ReactNode. 有效内容保持挂载；不会自动禁用、清空草稿或移动焦点。
- emptyContent / loadingContent / errorContent: ReactNode. emptyContent 必填；error 状态必须提供 errorContent。加载默认读 locale。重试动作由应用提供。
- render / ref / native props: useRender.ComponentProps<div>. 实际根节点的语义与属性；根节点本身不是 live region，只有 error 反馈带 role=alert。

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

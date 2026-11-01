# SkipLink

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/skip-link
Source: packages/ui/src/components/skip-link.tsx
Source SHA-256: 4333b6b70cefd7211580107717851060f8942bbe39dc19982442c7da5363f79e

Lets keyboard users bypass repeated navigation and reach the main content.

## Decision
Invisible and unclickable at rest, yet the first stop in tab order; it appears only when focused. On click it moves focus to the target for real, adding tabindex=-1 when the target is not focusable, otherwise the next Tab would return to the navigation and the skip would not have happened. A missing target is not intercepted; the browser's default anchor jump takes over.

## Notes
- If the target is not focusable, the component adds tabindex="-1".

## Use and ownership
- Every page repeats navigation, a sidebar or a header ahead of the main content.
- Avoid: Do not use it as a table of contents or in-page navigation; it does one thing, bypassing repeated blocks.
- Library: When it appears, focus transfer and target remediation.
- Application: Where the target is and its id, and whether more than one skip target is needed.

## Composition
- Place it first in the document, with href pointing at the id of the main-content container.

## Responsive behavior
- Fixed to the viewport's start-side top corner; top-right under right-to-left.

## Customization
- children overrides the default text; className adjusts stacking.

## Current exports
- SkipLink: function; owner skip-link; PASS; props: SkipLinkProps
- SkipLinkProps: type; owner skip-link; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### SkipLink
- `href`: ``#${string}``. 目标的锚点，写成 `#id`。必填：跳到哪里是页面结构的事实，不是默认值。
- plus 287 inherited (@types/react 287); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### SkipLink
An a pointing at an in-page anchor.
- href: `#${string}`. Required. The target anchor, written as #id.
- children: React.ReactNode. Defaults to the locale's skipToContent.
- className / onClick / native props: React.ComponentProps<a>. onClick runs first; calling preventDefault cancels the focus transfer.

## Keyboard

## Source examples
### 越过导航
Source: apps/docs/src/content/skip-link/demos/01-bypass.tsx
```tsx
import { Link } from "@qingye_lab/ui/components/link";
import { Stack } from "@qingye_lab/ui/components/layout";
import { SkipLink } from "@qingye_lab/ui/components/skip-link";
import { Text } from "@qingye_lab/ui/components/typography";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "越过导航", titleEn: "Bypass the navigation" } satisfies DemoMeta;

// 真实页面里它固定在视口一角，只在获得焦点时现身；这里为了在样例中可见，改为静态并常显。
// 目标 <main> 本身不可聚焦，点击后组件会补 tabindex="-1" 并把焦点移过去。
export default function Demo() {
  return <Stack gap="panel">
    <SkipLink href="#skip-demo-main" className="static opacity-100 pointer-events-auto self-start">跳到正文</SkipLink>
    <nav aria-label="示例导航"><Stack gap="pair"><Link href="#a">首页</Link><Link href="#b">文档</Link><Link href="#c">更新记录</Link></Stack></nav>
    <main id="skip-demo-main" className="outline-none focus-visible:ring-2"><Text>正文从这里开始。</Text></main>
  </Stack>;
}
```

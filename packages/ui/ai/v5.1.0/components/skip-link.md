# 跳转链接 SkipLink

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/skip-link
Source: packages/ui/src/components/skip-link.tsx
Source SHA-256: 4333b6b70cefd7211580107717851060f8942bbe39dc19982442c7da5363f79e

让键盘用户越过重复的导航，直达主要内容。

## Decision
平时不可见也不可点，却是 Tab 序里第一个到达的；获得焦点才现身。点击时把焦点真正移到目标，目标不可聚焦就补 tabindex=-1，否则下一次 Tab 又回到导航里，跳转等于没发生。找不到目标时不拦截，交还浏览器的默认锚点跳转。

## Notes
- 目标若不可聚焦，组件会补上 tabindex="-1"。

## Use and ownership
- 每页都重复出现导航、侧栏或页眉，而主要内容在其后。
- Avoid: 不要把它当作目录或页内导航；它只做一件事：越过重复区块。
- Library: 现身时机、焦点转移与目标补救。
- Application: 目标的位置与 id，及是否需要多个跳转目标。

## Composition
- 放在文档的最前面，href 指向主要内容容器的 id。

## Responsive behavior
- 固定在视口起始侧上角；从右向左排版时在右上。

## Customization
- children 覆盖默认文字；className 调整层序。

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
指向页内锚点的 a。
- href: `#${string}`. 必填。目标的锚点，写成 #id。
- children: React.ReactNode. 省略时用 locale 的 skipToContent。
- className / onClick / native props: React.ComponentProps<a>. onClick 在组件之前运行，调用 preventDefault 可取消转移。

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

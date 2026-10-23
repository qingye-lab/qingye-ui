# Breadcrumb

Package: @qingye_lab/ui@4.2.0
Import: @qingye_lab/ui/components/breadcrumb
Source: packages/ui/src/components/breadcrumb.tsx
Source SHA-256: 64bd70dc1261271ea81435e07e192188a150143bdfef034d13d0a1fae4b81824

Parent links and an explicit current location.

## Decision
An ordered list expresses the path; Current identifies the supplied location and separators are decorative.

## Notes
- Does not read URLs or history or create ancestors; direct ol children must be li.

## Use and ownership
- An object has an actual parent path and direct arrivals need to identify their location.
- Avoid: Use NavigationMenu or ordinary links for peer destinations; do not invent parents.
- Library: Native navigation, lists, current-page semantics, and focus.
- Application: Actual parent paths, current location, and navigation targets.

## Composition
- Breadcrumb: A named nav.
- BreadcrumbList / BreadcrumbItem: ol / li preserve ancestor order.
- BreadcrumbLink: A real anchor.
- BreadcrumbCurrent: A span with aria-current=page.
- BreadcrumbSeparator: A decorative separator.

## Responsive behavior
- Long paths wrap while retaining full location names.

## Customization
- Use the current props and composition first, then adjust the project's central theme; fix shared gaps in the public library.
- Configure brand, light or dark mode, and density separately; themes do not change permissions or save policies.

## Current exports
- Breadcrumb: function; owner breadcrumb; PASS; props: BreadcrumbProps
- BreadcrumbCurrent: function; owner breadcrumb; PASS; props: BreadcrumbCurrentProps
- BreadcrumbCurrentProps: type; owner breadcrumb; PASS
- BreadcrumbItem: function; owner breadcrumb; PASS; props: BreadcrumbItemProps
- BreadcrumbItemProps: type; owner breadcrumb; PASS
- BreadcrumbLink: function; owner breadcrumb; PASS; props: BreadcrumbLinkProps
- BreadcrumbLinkProps: type; owner breadcrumb; PASS
- BreadcrumbList: function; owner breadcrumb; PASS; props: BreadcrumbListProps
- BreadcrumbListProps: type; owner breadcrumb; PASS
- BreadcrumbProps: type; owner breadcrumb; PASS
- BreadcrumbSeparator: function; owner breadcrumb; PASS; props: BreadcrumbSeparatorProps
- BreadcrumbSeparatorProps: type; owner breadcrumb; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Breadcrumb
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### BreadcrumbCurrent
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### BreadcrumbItem
- no props declared by this library
- plus 282 inherited (@types/react 281, @base-ui/react 1); not expanded, see the installed declarations

### BreadcrumbLink
- no props declared by this library
- plus 289 inherited (@types/react 288, @base-ui/react 1); not expanded, see the installed declarations

### BreadcrumbList
- `maxItems?`: `number`. 路径最多显示几项（整数，≥ 3）；超过时保留第一项与最后 `maxItems - 2` 项，中间折叠成一个「更多」入口，点开是一个菜单， 每个被折叠的 BreadcrumbItem 里的 BreadcrumbLink 成为菜单里的链接（href、render、事件原样转发）。 不设置则完整显示。折叠只看项数，不看宽度：宽度驱动的折叠会让同一页面在不同窗口下露出不同的路径，也需要测量，留作观察。
- plus 284 inherited (@types/react 283, @base-ui/react 1); not expanded, see the installed declarations

### BreadcrumbSeparator
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Breadcrumb
A named nav.
- aria-label / render / ref / native props: useRender.ComponentProps<nav>. The default name is localized; props reach actual navigation.

### BreadcrumbList / BreadcrumbItem
ol / li preserve ancestor order.
- maxItems: number. BreadcrumbList only. An integer of at least 3. When the path has more items, the first and the last maxItems − 2 stay and the middle folds into one More button (named from the locale), which opens a Menu whose entries are the folded items' BreadcrumbLinks (href, render and events forwarded), reachable by keyboard and screen reader. Folded items must hold a BreadcrumbLink. Folding follows the item count, not the width: width-driven folding would show different paths in different windows and needs measuring, so it stays under observation. Unset shows the full path.
- render / ref / native props: useRender.ComponentProps<ol | li>. Rendered replacements must retain list semantics.

### BreadcrumbLink
A real anchor.
- href / render / ref / native props: useRender.ComponentProps<a>. Destination, events and ref belong to the actual link.

### BreadcrumbCurrent
A span with aria-current=page.
- children / render / native props: useRender.ComponentProps<span>. Render an anchor when the current location must remain a link.

### BreadcrumbSeparator
A decorative separator.
- children / render / native props: useRender.ComponentProps<span>; default children="/". The slash is a preset; place it inside a li.

## Keyboard
- Tab / Enter: Native link focus and navigation.
- Enter / Space / ↓ (More): Open the folded-items menu; arrows move, Enter follows, Esc closes and returns to the button.

## Source examples
### 父级与当前页
Source: apps/docs/src/content/breadcrumb/demos/01-path.tsx
```tsx
import { Breadcrumb, BreadcrumbCurrent, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@qingye_lab/ui/components/breadcrumb";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "父级与当前页", titleEn: "Ancestors and current page" } satisfies DemoMeta;
export default function Demo() {
  return <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/">首页</BreadcrumbLink><BreadcrumbSeparator /></BreadcrumbItem><BreadcrumbItem><BreadcrumbLink href="/components">组件</BreadcrumbLink><BreadcrumbSeparator /></BreadcrumbItem><BreadcrumbItem><BreadcrumbCurrent>路径</BreadcrumbCurrent></BreadcrumbItem></BreadcrumbList></Breadcrumb>;
}
```

### 折叠中间层级
Source: apps/docs/src/content/breadcrumb/demos/02-folded.tsx
```tsx
import { Breadcrumb, BreadcrumbCurrent, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@qingye_lab/ui/components/breadcrumb";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "折叠中间层级", titleEn: "Fold the middle levels" } satisfies DemoMeta;
const ancestors = [["/", "首页"], ["/files", "文件"], ["/files/2026", "2026"], ["/files/2026/q3", "第三季度"], ["/files/2026/q3/reports", "报表"]] as const;
export default function Demo() {
  return <Breadcrumb><BreadcrumbList maxItems={4}>
    {ancestors.map(([href, name]) => <BreadcrumbItem key={href}><BreadcrumbLink href={href}>{name}</BreadcrumbLink><BreadcrumbSeparator /></BreadcrumbItem>)}
    <BreadcrumbItem><BreadcrumbCurrent>销售汇总</BreadcrumbCurrent></BreadcrumbItem>
  </BreadcrumbList></Breadcrumb>;
}
```

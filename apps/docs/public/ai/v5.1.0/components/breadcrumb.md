# 路径 Breadcrumb

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/breadcrumb
Source: packages/ui/src/components/breadcrumb.tsx
Source SHA-256: fc48d9be8459b644e0133c7c3388e304dcc384b2d7052f80ea68e29057d6a7c0

父级链接与明确的当前位置。

## Decision
有序列表表达路径；Current 显式标记应用当前位置，分隔符不进入可访问名称。

## Notes
- 不读取 URL、历史或自动创建父级；ol 直接子项必须是 li。
- dir="rtl" 下分隔箭头随阅读方向翻转。

## Use and ownership
- 对象有明确父级路径，直达后仍需识别位置。
- Avoid: 平级目的地切换用 NavigationMenu 或普通导航链接，不虚构父级。
- Library: 原生导航、列表、当前页语义与焦点。
- Application: 真实父级路径、当前位置及导航目标。

## Composition
- Breadcrumb：有名称的 nav。
- BreadcrumbList / BreadcrumbItem：ol / li 保留路径顺序。
- BreadcrumbLink：真实链接。
- BreadcrumbCurrent：默认 span，aria-current=page。
- BreadcrumbSeparator：装饰分隔符。

## Responsive behavior
- 长路径换行，保留完整位置名称。

## Customization
- 先使用当前属性与组合，再调整项目集中主题；共享缺口在公共库修复。
- 品牌、明暗和密度分别配置，主题不改变权限或保存策略。

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
有名称的 nav。
- aria-label / render / ref / native props: useRender.ComponentProps<nav>. 默认名称来自 locale，属性转发实际导航。

### BreadcrumbList / BreadcrumbItem
ol / li 保留路径顺序。
- maxItems: number. 仅 BreadcrumbList。整数，≥ 3；路径项数超过它时保留第一项与最后 maxItems − 2 项，中间折叠成一个「更多」按钮（名称取 locale 的「更多」），点开是 Menu，被折叠项里的 BreadcrumbLink 成为菜单里的链接（href、render、事件原样转发），键盘与读屏可达。被折叠的项必须含 BreadcrumbLink。只按项数折叠，不按宽度：宽度驱动的折叠会让同一页面在不同窗口下露出不同路径，且需要测量，留作观察。不设置则完整显示。
- render / ref / native props: useRender.ComponentProps<ol | li>. 替换元素须保留列表语义。

### BreadcrumbLink
真实链接。
- href / render / ref / native props: useRender.ComponentProps<a>. 导航目的、事件与 ref 属于实际链接。

### BreadcrumbCurrent
默认 span，aria-current=page。
- children / render / native props: useRender.ComponentProps<span>. 需要当前页链接时可 render 为 a。

### BreadcrumbSeparator
装饰分隔符。
- children / render / native props: useRender.ComponentProps<span>; default children="/". 默认斜线是预设；只放在 li 内。

## Keyboard
- Tab / Enter: 原生链接聚焦与导航。
- Enter / Space / ↓（「更多」）: 打开折叠项菜单，方向键移动，Enter 前往，Esc 关闭并回到按钮。

## Source examples
### 父级与当前页
Source: apps/docs/src/content/breadcrumb/demos/01-path.tsx
```tsx
import { Breadcrumb, BreadcrumbCurrent, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@qingye_lab/ui/components/breadcrumb";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "父级与当前页", titleEn: "Ancestors and current page" } satisfies DemoMeta;
export default function Demo() {
  return <Breadcrumb aria-label="面包屑：完整路径"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/">首页</BreadcrumbLink><BreadcrumbSeparator /></BreadcrumbItem><BreadcrumbItem><BreadcrumbLink href="/components">组件</BreadcrumbLink><BreadcrumbSeparator /></BreadcrumbItem><BreadcrumbItem><BreadcrumbCurrent>路径</BreadcrumbCurrent></BreadcrumbItem></BreadcrumbList></Breadcrumb>;
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
  return <Breadcrumb aria-label="面包屑：折叠的长路径"><BreadcrumbList maxItems={4}>
    {ancestors.map(([href, name]) => <BreadcrumbItem key={href}><BreadcrumbLink href={href}>{name}</BreadcrumbLink><BreadcrumbSeparator /></BreadcrumbItem>)}
    <BreadcrumbItem><BreadcrumbCurrent>销售汇总</BreadcrumbCurrent></BreadcrumbItem>
  </BreadcrumbList></Breadcrumb>;
}
```

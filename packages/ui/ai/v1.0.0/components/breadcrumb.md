# 路径 Breadcrumb

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/breadcrumb
Source: packages/ui/src/components/breadcrumb.tsx
Source SHA-256: 2cd976d39cfc860e1e9d237f93138b290ee840a3c238bbcd974f52c981976162

父级链接与明确的当前位置。

## Decision
有序列表表达路径；Current 显式标记应用当前位置，分隔符不进入可访问名称。

## Notes
- 不读取 URL、历史或自动创建父级；ol 直接子项必须是 li。

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

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Breadcrumb
有名称的 nav。
- aria-label / render / ref / native props: useRender.ComponentProps<nav>. 默认名称来自 locale，属性转发实际导航。

### BreadcrumbList / BreadcrumbItem
ol / li 保留路径顺序。
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

## Source examples
### 父级与当前页
Source: apps/docs/src/content/breadcrumb/demos/01-path.tsx
```tsx
import { Breadcrumb, BreadcrumbCurrent, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@qingye/ui/components/breadcrumb";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "父级与当前页", titleEn: "Ancestors and current page" } satisfies DemoMeta;
export default function Demo() {
  return <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/">首页</BreadcrumbLink><BreadcrumbSeparator /></BreadcrumbItem><BreadcrumbItem><BreadcrumbLink href="/components">组件</BreadcrumbLink><BreadcrumbSeparator /></BreadcrumbItem><BreadcrumbItem><BreadcrumbCurrent>路径</BreadcrumbCurrent></BreadcrumbItem></BreadcrumbList></Breadcrumb>;
}
```

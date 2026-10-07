# Breadcrumb

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/breadcrumb
Source: packages/ui/src/components/breadcrumb.tsx
Source SHA-256: 8eca1a66ac09de34c9d92b74b51ebfa17ebb2f2516f7c5ea411124087e18eccc

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

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Breadcrumb
A named nav.
- aria-label / render / ref / native props: useRender.ComponentProps<nav>. The default name is localized; props reach actual navigation.

### BreadcrumbList / BreadcrumbItem
ol / li preserve ancestor order.
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

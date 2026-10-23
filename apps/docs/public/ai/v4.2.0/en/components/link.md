# Link

Package: @qingye_lab/ui@4.2.0
Import: @qingye_lab/ui/components/link
Source: packages/ui/src/components/link.tsx
Source SHA-256: 1a9ed89613aea1ab58a66f68eeac3cfe5d71573b62df4089a78af1dc7a6926fe

A text entry that goes to an address; every text link in the library shares this one treatment.

## Decision
A link goes somewhere; a button performs an action. The underline is always present, heavy ink at rest and full text color on hover or focus, without thickening or an outer focus ring. Inline links do not expand their hit area.

## Use and ownership
- An entry within body text or descriptions that goes to another page or place.
- Avoid: Use Button for actions such as save, delete, or submit.
- Avoid: Rows or columns of equivalent navigation entries such as navigation menus, sidebars, or pagination are identified by position; use their components without per-item underlines.
- Library: Underline, hover, focus, and accessible-name treatment.
- Application: Addresses, routing, current location, and permissions.

## Composition
- Route links connect through render; Breadcrumb, Item, Toolbar, and HoverCard read linkClassName.

## Responsive behavior
- Long link text wraps with body text; standalone entries add touch-target at the call site.

## Customization
- Colors come from the ink ladder; a brand may change text color but not the always-present underline.

## Current exports
- Link: function; owner link; PASS; props: LinkProps
- linkClassName: const; owner link; UNVERIFIED
- LinkProps: type; owner link; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Link
- no props declared by this library
- plus 289 inherited (@types/react 288, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Link
A native a element; native attributes such as href, target, and rel plus render/ref are forwarded.
- render / ref / native props: useRender.ComponentProps<"a">. Connect a router's link component through render.

### linkClassName
The same treatment as a class name, for components that render a primitive's own link part.

## Keyboard

## Source examples
### 正文中的链接
Source: apps/docs/src/content/link/demos/01-inline.tsx
```tsx
import { Link } from "@qingye_lab/ui/components/link";
export const meta = { title: "正文中的链接", titleEn: "Links in text" };
export default function Demo() {
  return <p className="max-w-prose text-body text-foreground">同步失败的记录保留在 <Link href="#records">接入记录</Link> 中，修正来源后可以 <Link href="#retry">重新同步</Link>。删除集合前，请先阅读 <Link href="#retention">保留策略</Link>。</p>;
}
```

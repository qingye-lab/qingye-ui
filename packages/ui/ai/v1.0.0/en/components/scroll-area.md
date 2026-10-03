# Scroll area

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/scroll-area
Source: packages/ui/src/components/scroll-area.tsx
Source SHA-256: b135ec600d8b8d2d1094c18a68cedba1d2c8d0a290356342a0526602d7daef00

Native scrolling within a bounded viewport.

## Notes
- OS/browser/user preferences determine native scrollbar visibility; automatic hiding is not forcibly overridden.
- Consumer layout owns dimensions. Use ScrollArea for complete rendering and VirtualList for long equal-height collections.

## Use and ownership
- Complete content within a finite workspace.
- Avoid: Hiding necessary scroll access or consuming text-editing keys.
- Library: Default keyboard access and internal focus.
- Application: Viewport dimensions and content.

## Composition
- Finite viewport with native scrolling content.

## Responsive behavior
- Keep essential content and actions reachable in narrow containers; preserve the object, input, and focus when the layout changes.

## Customization
- style/className are consumer layout entries; no new dimension roles.

## Current exports
- ScrollArea: function; owner scroll-area; PASS; props: ScrollAreaProps
- ScrollAreaProps: type; owner scroll-area; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ScrollArea
An actual scrollable div; native scrollbars respect platform settings.
- children: ReactNode. Complete content without windowing or hiding collection items.
- style / className: div props. Consumer layout supplies height/maxHeight and width; overflow defaults to auto.
- tabIndex: number; default 0. Keyboard-reachable by default; retains native arrows/Page/Home/End scrolling.
- render / ref / ARIA / events: useRender.ComponentProps<'div'>. Actual viewport composition, names, refs, and native scroll/keyboard events. The caller may add role=region for a named independent area.

## Keyboard
- Tab: Reach the actual viewport or entries within its content.
- Arrow keys / PageUp / PageDown / Home / End: Use native browser scrolling; nested controls retain their own keys.

## Source examples
### 有限视口
Source: apps/docs/src/content/scroll-area/demos/01-vertical.tsx
```tsx
import { ScrollArea } from "@qingye/ui/components/scroll-area";
export const meta = { title: "有限视口", titleEn: "Bounded viewport" };
export default function Demo() {
  return <ScrollArea aria-label="完整条目" role="region" style={{ maxHeight: "calc(var(--qy-control-md) * 5)" }}>{Array.from({ length: 20 }, (_, index) => <div key={index} className="flex min-h-(--qy-control-md-narrow) items-center px-(--qy-control-md-padding) text-body sm:min-h-(--qy-control-md)">条目 {index + 1}</div>)}</ScrollArea>;
}
```

### 水平内容
Source: apps/docs/src/content/scroll-area/demos/02-horizontal.tsx
```tsx
import { ScrollArea } from "@qingye/ui/components/scroll-area";
export const meta = { title: "水平内容", titleEn: "Horizontal content" };
export default function Demo() {
  return <ScrollArea aria-label="完整字符序列" role="region"><pre className="w-max px-(--qy-control-md-padding) py-(--qy-field-gap) text-body">甲 乙 丙 丁 戊 己 庚 辛 壬 癸 · A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</pre></ScrollArea>;
}
```

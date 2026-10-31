# Scroll area

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/scroll-area
Source: packages/ui/src/components/scroll-area.tsx
Source SHA-256: 0519efa99f42cc71c986065481f58f1a5abd93f3f5f715f74cd8a51672caa22c

Native scrolling with an optional composition of draggable scrollbars.

## Notes
- Division of labor: use ScrollArea by default (one element, native scrollbars that follow platform settings); reach for ScrollAreaRoot / ScrollAreaViewport / ScrollAreaContent / ScrollAreaScrollbar / ScrollAreaThumb / ScrollAreaCorner only when the design requires drawn scrollbars. Do not nest one inside the other; ScrollArea does not accept Scrollbar parts.
- ScrollArea retains its single native viewport and ref contract; native scrollbar visibility respects platform preferences.
- For styled scrollbars use Root > Viewport > Content, with Scrollbar/Thumb alongside Viewport. Native wheel, keyboard and touch scrolling stays on Viewport.
- The 3-unit track width and half-unit inset are composition presets. The primitive jointly calculates thumb extent and travel; do not independently override its minimum extent. Content reserves ending space for the tracks.
- Consumer layout owns dimensions. Use ScrollArea for complete rendering and VirtualList for long collections.

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
- ScrollAreaContent: function; owner scroll-area; PASS; props: ScrollAreaContentProps
- ScrollAreaContentProps: type; owner scroll-area; PASS
- ScrollAreaCorner: function; owner scroll-area; PASS; props: ScrollAreaCornerProps
- ScrollAreaCornerProps: type; owner scroll-area; PASS
- ScrollAreaPrimitive: reexport; owner scroll-area; UNVERIFIED
- ScrollAreaProps: type; owner scroll-area; PASS
- ScrollAreaRoot: function; owner scroll-area; PASS; props: ScrollAreaRootProps
- ScrollAreaRootProps: type; owner scroll-area; PASS
- ScrollAreaScrollbar: function; owner scroll-area; PASS; props: ScrollAreaScrollbarProps
- ScrollAreaScrollbarProps: type; owner scroll-area; PASS
- ScrollAreaThumb: function; owner scroll-area; PASS; props: ScrollAreaThumbProps
- ScrollAreaThumbProps: type; owner scroll-area; PASS
- ScrollAreaViewport: function; owner scroll-area; PASS; props: ScrollAreaViewportProps
- ScrollAreaViewportProps: type; owner scroll-area; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### ScrollArea
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### ScrollAreaContent
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### ScrollAreaCorner
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### ScrollAreaRoot
- no props declared by this library
- plus 279 inherited (@types/react 275, @base-ui/react 4); not expanded, see the installed declarations

### ScrollAreaScrollbar
- no props declared by this library
- plus 280 inherited (@types/react 275, @base-ui/react 5); not expanded, see the installed declarations

### ScrollAreaThumb
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### ScrollAreaViewport
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

### ScrollArea
An actual scrollable div; native scrollbars respect platform settings.
- children: ReactNode. Complete content without windowing or hiding collection items.
- style / className: div props. Consumer layout supplies height/maxHeight and width; overflow defaults to auto.
- tabIndex: number; default 0 while the content overflows. Keyboard-reachable while the content overflows and not a tab stop when nothing scrolls; retains native arrows/Page/Home/End scrolling. A value you pass is kept.
- render / ref / ARIA / events: useRender.ComponentProps<'div'>. Actual viewport composition, names, refs, and native scroll/keyboard events. The caller may add role=region for a named independent area.

### ScrollAreaRoot / ScrollAreaViewport / ScrollAreaContent
Explicit styled-scrollbar composition: Root owns layout/overflow facts, Viewport is the actual scroll element and Content supports measurement.
- render / ref / className / style / native props: ScrollAreaPrimitive part props. Each part retains its primitive props. Scroll events, scrollTop/scrollLeft and focus belong to Viewport; do not move a legacy viewport ref to Root.

### ScrollAreaScrollbar
A draggable track shown for actual overflow; includes a real Thumb when children are omitted.
- orientation: vertical | horizontal; default vertical. Chooses the controlled axis; compose two tracks and Corner for both axes.
- keepMounted: boolean; default false. Retains hidden DOM without inventing a scroll range when content does not overflow.

### ScrollAreaThumb / ScrollAreaCorner / ScrollAreaPrimitive
The public primitive measures thumb extent/position and handles dragging; Corner reserves the two-axis intersection and the full primitive remains available.

## Keyboard
- Tab: Reach a viewport whose content overflows, or entries within its content.
- Arrow keys / PageUp / PageDown / Home / End: Use native browser scrolling; nested controls retain their own keys.

## Source examples
### 有限视口
Source: apps/docs/src/content/scroll-area/demos/01-vertical.tsx
```tsx
import { ScrollArea } from "@qingye_lab/ui/components/scroll-area";
export const meta = { title: "有限视口", titleEn: "Bounded viewport" };
export default function Demo() {
  return <ScrollArea aria-label="完整条目" role="region" style={{ maxHeight: "calc(var(--qy-control-md) * 5)" }}>{Array.from({ length: 20 }, (_, index) => <div key={index} className="flex min-h-(--qy-control-md-narrow) items-center px-(--qy-control-md-padding) text-body sm:min-h-(--qy-control-md)">条目 {index + 1}</div>)}</ScrollArea>;
}
```

### 水平内容
Source: apps/docs/src/content/scroll-area/demos/02-horizontal.tsx
```tsx
import { ScrollArea } from "@qingye_lab/ui/components/scroll-area";
export const meta = { title: "水平内容", titleEn: "Horizontal content" };
export default function Demo() {
  return <ScrollArea aria-label="完整字符序列" role="region"><pre className="w-max px-(--qy-control-md-padding) py-(--qy-field-gap) text-body">甲 乙 丙 丁 戊 己 庚 辛 壬 癸 · A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</pre></ScrollArea>;
}
```

### 双轴滚动条
Source: apps/docs/src/content/scroll-area/demos/03-styled-scrollbars.tsx
```tsx
import { ScrollAreaContent, ScrollAreaCorner, ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaViewport } from "@qingye_lab/ui/components/scroll-area";

export const meta = { title: "双轴滚动条", titleEn: "Styled scrollbars on both axes" };
export default function Demo() {
  return <ScrollAreaRoot className="w-full max-w-sm" style={{ height: "calc(var(--qy-control-md) * 6)" }} data-testid="styled-scroll-area">
    <ScrollAreaViewport aria-label="双轴完整条目" role="region">
      <ScrollAreaContent><div style={{ minWidth: "calc(var(--qy-control-md) * 16)" }}>{Array.from({ length: 30 }, (_, index) => <div key={index} className="flex min-h-(--qy-control-md-narrow) items-center px-(--qy-control-md-padding) text-body sm:min-h-(--qy-control-md)">条目 {index + 1} · 这段内容保留完整宽度与原生文本选择。</div>)}</div></ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar keepMounted /><ScrollAreaScrollbar orientation="horizontal" keepMounted /><ScrollAreaCorner />
  </ScrollAreaRoot>;
}
```

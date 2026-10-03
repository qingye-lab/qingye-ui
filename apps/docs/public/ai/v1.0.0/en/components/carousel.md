# Carousel

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/carousel
Source: packages/ui/src/components/carousel.tsx
Source SHA-256: 80dd0c9b1630eae28d8c95c64e3997081939f8d62a5e5ae61247a5205873b2e8

Manually read finite content with an actual position and clear boundaries.

## Decision
Position does not imply reading or completion. There is no autoplay or wraparound. Only the current item is reachable, while native inputs stay mounted.

## Notes
- There is no autoplay or wraparound API.
- Hidden items retain fields; application-owned native field attributes decide submission and disabling.
- Removing or externally changing the current item restores focus only when it still belongs to the old item. External focus is not reclaimed.
- Controlled value must identify a current item. Keep ids stable instead of replacing them with indexes.

## Use and ownership
- Finite content needs deliberate sequential access.
- Avoid: Autoplaying essential content or describing position as completion.
- Library: Current presentation, boundaries and necessary focus recovery.
- Application: Content, inputs, business facts and controlled value.

## Composition
- Button and native ScrollArea; items retain actual content.

## Responsive behavior
- Long names wrap; native scrolling handles content capacity.

## Customization
- Shared panel/action gaps, text and internal focus; no new global geometry tokens.

## Current exports
- Carousel: function; owner carousel; PASS; props: CarouselProps
- CarouselItem: type; owner carousel; PASS
- CarouselProps: type; owner carousel; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Carousel
A named reading region, native ScrollArea and previous/next Button controls.
- label: string. A nonempty accessible name for the whole reading object.
- items: readonly { id: string; label: string; content: ReactNode }[]. Finite real content, unique stable ids and nonempty item names.
- value / defaultValue / onValueChange: string / string / (id: string) => void. Current item id and change requests. The caller accepts controlled values. Removing the uncontrolled current item selects the first remaining item.
- emptyContent: ReactNode. Actual empty content, without a fabricated position or navigation.
- render / ref / style / className / native props: useRender.ComponentProps<section>. Public composition, id, ARIA, events and refs.

## Keyboard
- Enter / Space: Operate previous/next buttons. aria-disabled boundaries retain focus and do not change position.
- ArrowLeft / ArrowRight / Home / End: Switch only while the root itself has focus. Arrows follow actual direction and do not intercept field keys.
- Tab / Shift+Tab: Reach the current item and navigation controls. Hidden items remain unreachable.

## Source examples
### 有限内容与输入
Source: apps/docs/src/content/carousel/demos/01-states.tsx
```tsx
import { Carousel } from "@qingye/ui/components/carousel";
import { Input } from "@qingye/ui/components/input";
import { Label } from "@qingye/ui/components/label";
import { Stack } from "@qingye/ui/components/layout";
export const meta = { title: "有限内容与输入", titleEn: "Finite content and inputs" };
export default function CarouselDemo() {
  return <Carousel label="控件状态" className="w-full max-w-sm" items={[
    { id: "editable", label: "输入", content: <Stack gap="field"><Label htmlFor="carousel-editable">输入</Label><Input id="carousel-editable" /></Stack> },
    { id: "readonly", label: "只读", content: <Stack gap="field"><Label htmlFor="carousel-readonly">只读</Label><Input id="carousel-readonly" readOnly defaultValue="只读" /></Stack> },
    { id: "disabled", label: "禁用", content: <Stack gap="field"><Label htmlFor="carousel-disabled">禁用</Label><Input id="carousel-disabled" disabled /></Stack> },
  ]} />;
}
```

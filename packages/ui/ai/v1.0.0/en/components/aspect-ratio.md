# Aspect ratio

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/aspect-ratio
Source: packages/ui/src/components/aspect-ratio.tsx
Source SHA-256: ae392fd3d87ed933c5cdc399722658008c1e397ad114f2975fe5f64c9703545c

Set a preferred width-to-height relation without cropping content.

## Notes
- CSS aspect-ratio is a preferred ratio; minimum content needs may make the box taller.
- The image's purpose determines object-fit when cropping is needed; the component does not crop by default.

## Use and ownership
- A containing box needs a preferred height determined by its width.
- Avoid: Treating a ratio as a cropping command or fixed text height.
- Library: Ratio constraint.
- Application: Ratio choice, width, and content.

## Composition
- Ratio box with complete content.

## Responsive behavior
- Keep essential content and actions reachable in narrow containers; preserve the object, input, and focus when the layout changes.

## Customization
- ratio / style / className

## Current exports
- AspectRatio: function; owner aspect-ratio; PASS; props: AspectRatioProps
- AspectRatioProps: type; owner aspect-ratio; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### AspectRatio
A geometric relationship without interaction.
- ratio: number; default 1. A finite positive width/height ratio. The default 1 is a choice; zero, negative, or nonfinite values throw RangeError.
- children / style / className / render / ref: useRender.ComponentProps<'div'>. Content, consumer layout, and the actual containing box. style may explicitly change the CSS relationship. No default clipping or object-fit.

## Keyboard

## Source examples
### 宽高关系
Source: apps/docs/src/content/aspect-ratio/demos/01-ratios.tsx
```tsx
import { AspectRatio } from "@qingye/ui/components/aspect-ratio";
export const meta = { title: "宽高关系", titleEn: "Ratios" };
export default function Demo() {
  return <div className="grid grid-cols-1 gap-(--qy-space-4) sm:grid-cols-3">{[{ ratio: 1, label: "1:1" }, { ratio: 3 / 2, label: "3:2" }, { ratio: 16 / 9, label: "16:9" }].map(item => <AspectRatio key={item.label} ratio={item.ratio} className="flex items-center justify-center bg-surface-subtle text-body">{item.label}</AspectRatio>)}</div>;
}
```

### 完整内容
Source: apps/docs/src/content/aspect-ratio/demos/02-content.tsx
```tsx
import { AspectRatio } from "@qingye/ui/components/aspect-ratio";
export const meta = { title: "完整内容", titleEn: "Complete content" };
export default function Demo() {
  return <AspectRatio ratio={3} className="bg-surface-subtle p-(--qy-space-4) text-body"><p>内容仍参与盒高。宽度缩小时，文字换行并保留完整段落。</p></AspectRatio>;
}
```

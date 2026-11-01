# ImagePreview

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/image-preview
Source: packages/ui/src/components/image-preview.tsx
Source SHA-256: 23741daf38ba1fbc21c80c4eae46b218445b975188b4bbc3e6691bfd6a20803e

Thumbnails open a large view with switching within the set and zoom.

## Decision
Built on Dialog, which supplies the focus trap, Esc to close and the blocking backdrop. alt is required and is the only text available for the thumbnail button, the large view and a load failure. When zoomed, the stage scrolls and takes focus, and the arrow keys then scroll instead of switching images. After closing, focus returns to the thumbnail that opened it, even after switching to another image.

## Notes
- Keyboard: Left/Right switch images (swapped under right-to-left), +/- zoom, 0 fits; stops at the ends, no looping.

## Use and ownership
- Images are part of the content and details need zooming, or browsing within a set.
- Avoid: Decorative images need no preview; a single fixed-size image can be a plain img.
- Library: Open state, current image, zoom level, keyboard handling and focus return.
- Application: Image sources, alt text and grouping.

## Composition
- Thumbnails are buttons; the large view sits in a blocking dialog whose footer carries position, previous/next and zoom.

## Responsive behavior
- The stage has a maximum width and a height of 70% of the viewport, narrowing to fit on small screens.

## Customization
- thumbnailClassName adjusts thumbnails; use className for the rest.

## Current exports
- ImagePreview: function; owner image-preview; PASS; props: ImagePreviewProps
- ImagePreviewImage: type; owner image-preview; PASS
- ImagePreviewProps: type; owner image-preview; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### ImagePreview
- `images`: `readonly ImagePreviewImage[]`. 同一组图片：缩略图并排，大图里可以在它们之间前后切换。单张图传一项。
- `thumbnailClassName?`: `string`.
- plus 279 inherited (@types/react 279); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### ImagePreview
A row of thumbnail buttons that open the large view in a Dialog.
- images: { src, alt, thumbnailSrc? }[]. One set of images; alt is required and thumbnailSrc falls back to src. Pass one item for a single image.
- thumbnailClassName: string. Applies to every thumbnail button.
- className / native props: React.ComponentProps<div>. Remaining attributes forward to the root.

## Keyboard

## Source examples
### 同组图片与单张
Source: apps/docs/src/content/image-preview/demos/01-set.tsx
```tsx
import { ImagePreview } from "@qingye_lab/ui/components/image-preview";
import { Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "同组图片与单张", titleEn: "A set and a single image" } satisfies DemoMeta;

const svg = (fill: string, label: string) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'><rect width='800' height='500' fill='${fill}'/><text x='400' y='270' font-size='64' text-anchor='middle' fill='white'>${label}</text></svg>`)}`;

export default function Demo() {
  return <Stack gap="panel">
    <ImagePreview images={[
      { src: svg("#475569", "一"), alt: "第一张：石板色" },
      { src: svg("#57534e", "二"), alt: "第二张：褐石色" },
      { src: svg("#44403c", "三"), alt: "第三张：深褐色" },
    ]} />
    <ImagePreview images={[{ src: svg("#52525b", "单"), alt: "单张图片" }]} />
  </Stack>;
}
```

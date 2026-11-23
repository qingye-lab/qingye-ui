# 图片预览 ImagePreview

Package: @qingye_lab/ui@5.6.0
Import: @qingye_lab/ui/components/image-preview
Source: packages/ui/src/components/image-preview.tsx
Source SHA-256: 64aec292f6b034b610a31fdbf4803c94b5c20d1b7e35316f4fbfaeb27cd18078

缩略图打开大图，可在同组图片间切换并放大。

## Decision
复用 Dialog：焦点困住、Esc 关闭、背景阻断都来自它。alt 必填，它同时是缩略图按钮、大图和加载失败时唯一能读到的文字。放大后舞台可滚动并获得焦点，此时方向键归滚动、不切图。关闭后焦点回到打开的那张缩略图，即使已切到别的图。

## Notes
- 键盘：左右方向键切图（从右向左排版时对调）、+ / - 缩放、0 适应窗口；到头即止，不循环。

## Use and ownership
- 图片是内容的一部分，且需要放大看细节或在同组中浏览。
- Avoid: 装饰性图片不需要预览；只展示一张固定大小的图用普通 img。
- Library: 开合、当前图、缩放级别、键盘与焦点归还。
- Application: 图片来源、alt 文案与分组。

## Composition
- 缩略图是按钮；大图在阻断式对话框里，页脚是位置、前后切换与缩放。

## Responsive behavior
- 舞台宽度有上限，高度取视口的 70%；窄屏下收窄到视口内。

## Customization
- thumbnailClassName 调整缩略图；其余用 className。

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
一排缩略图按钮，打开 Dialog 中的大图。
- images: { src, alt, thumbnailSrc? }[]. 同一组图片；alt 必填，thumbnailSrc 省略时缩略图也读 src。单张图传一项。
- thumbnailClassName: string. 作用于每个缩略图按钮。
- className / native props: React.ComponentProps<div>. 其余属性透传到根元素。

## Keyboard
- Enter / Space: 在缩略图按钮上打开预览对话框，或在对话框控制按钮上执行对应操作。
- ← / →: 在同组图片中切换上一张 / 下一张（RTL 下方向相反，到头即止）；放大且焦点位于舞台上时方向键用于滚动，不切图。
- + / = / - / 0: 放大一级（+ / =）、缩小一级（-）或重置为适应窗口（0）。
- Tab / Shift+Tab: 在预览对话框内的控制按钮（及放大后可滚动的舞台）间移动焦点。
- Escape: 关闭预览对话框并将焦点返回打开它的缩略图按钮。

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

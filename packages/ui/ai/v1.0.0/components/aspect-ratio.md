# 宽高比 AspectRatio

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/aspect-ratio
Source: packages/ui/src/components/aspect-ratio.tsx
Source SHA-256: ae392fd3d87ed933c5cdc399722658008c1e397ad114f2975fe5f64c9703545c

给承载盒设置宽高关系，保留完整内容。

## Notes
- CSS aspect-ratio 是首选比例；内容的最小需求可能让盒高超过比例。
- 需要图片裁剪时由图片用途决定 object-fit，组件不默认裁剪。

## Use and ownership
- 由宽度确定首选高度的承载关系
- Avoid: 把比例当裁剪命令或文字固定高
- Library: 比例约束
- Application: 比例选择、宽度与内容

## Composition
- 比例盒 + 完整内容

## Responsive behavior
- 窄容器保留必要内容与可达操作；布局改变时保留对象、输入和焦点。

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
无交互的几何关系。
- ratio: number; default 1. 有限正的宽/高比；1 为默认选择，0/负数/非有限值抛 RangeError。
- children / style / className / render / ref: useRender.ComponentProps<'div'>. 内容、消费布局和真实承载盒；style 可显式改 CSS 关系。默认不设裁剪或 object-fit。

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

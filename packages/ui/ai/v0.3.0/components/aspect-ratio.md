# 宽高比 AspectRatio

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/aspect-ratio
Source: packages/ui/src/components/aspect-ratio.tsx
Source SHA-256: 1ca76b9e2c37989152cb8bf2bd33ce5d704d435c2e89526fd241b231bfcf5ff0

让内容按固定宽高比占位，常用于封面图、视频和地图。图片加载前就预留好空间，页面不会跳动。

## Use and ownership
- 图片、视频或地图需要在资源到来前保留稳定位置。
- Avoid: 把标题、正文和说明都塞进被绝对定位的媒体框；重要内容只能通过裁切后的图像识别。
- Library: 有效比例归一化、媒体占位和 render 透传。
- Application: 资源地址、替代文本、加载失败后的替换与焦点内容。

## Composition
- AspectRatio 只围住媒体，标题与说明放在同一 figure 的外部；object-cover 与 object-contain 按内容是否可裁切选择。

## Responsive behavior
- 宽度跟随容器；改变比例时核对主体是否仍完整，必要时移动裁切焦点。

## Customization
- 用 ratio 调整占位，className 集中定义裁切和圆角，比例不代替图片自身尺寸。

## Current exports
- AspectRatio: function; owner aspect-ratio; PASS; props: AspectRatioProps
- AspectRatioProps: interface; owner aspect-ratio; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### AspectRatio
渲染一个按比例占位的 <div>，直接子元素被拉伸铺满；圆角、边框写在 className 上并配合 overflow-hidden。
- ratio: number; default 1. 宽 ÷ 高，例如 16 / 9、4 / 3。
- render: ReactElement | (props) => ReactElement. 替换渲染元素，例如 <figure>。

## Keyboard

## Source examples
### 基础用法
Source: apps/docs/src/content/aspect-ratio/demos/01-basic.tsx
```tsx
import { AspectRatio } from "@qingye/ui/components/aspect-ratio";

export const meta = { title: "基础用法", description: "16:9 的封面，圆角与裁切写在 AspectRatio 上。" };

export default function Demo() {
  return (
    <div className="w-full max-w-lg">
      <AspectRatio className="overflow-hidden rounded-xl border bg-muted" ratio={16 / 9}>
        <img alt="阳光穿过林间的树木" className="object-cover" src="/examples/forest.jpg" />
      </AspectRatio>
    </div>
  );
}
```

### 常用比例
Source: apps/docs/src/content/aspect-ratio/demos/02-ratios.tsx
```tsx
import { AspectRatio } from "@qingye/ui/components/aspect-ratio";

export const meta = { title: "常用比例", description: "宽度相同时，比例决定高度。" };

const ratios = [
  { label: "1 : 1", value: 1, use: "头像、商品" },
  { label: "4 : 3", value: 4 / 3, use: "相册、缩略图" },
  { label: "16 : 9", value: 16 / 9, use: "视频、封面" },
  { label: "21 : 9", value: 21 / 9, use: "横幅" },
];

export default function Demo() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-2 items-start gap-4 sm:grid-cols-4">
      {ratios.map((ratio) => (
        <figure className="flex flex-col gap-2" key={ratio.label}>
          <AspectRatio className="rounded-lg border border-dashed bg-muted/60" ratio={ratio.value}>
            <div className="flex items-center justify-center font-medium text-muted-foreground text-sm numeric">{ratio.label}</div>
          </AspectRatio>
          <figcaption className="text-muted-foreground text-xs">{ratio.use}</figcaption>
        </figure>
      ))}
    </div>
  );
}
```

### 内容封面
Source: apps/docs/src/content/aspect-ratio/demos/03-media-card.tsx
```tsx
import { AspectRatio } from "@qingye/ui/components/aspect-ratio";
export const meta = { title: "内容封面", description: "不同照片使用相同比例，标题保持在图片之外。" };

const photographs = [
  { title: "山间的第一束光", location: "高山记录", image: "/examples/mountain.jpg", alt: "山峰与清晨的天空" },
  { title: "林中的步道", location: "林间记录", image: "/examples/forest.jpg", alt: "阳光穿过林间的树木" },
];

export default function Demo() {
  return (
    <div className="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
      {photographs.map((photograph) => (
        <figure className="flex min-w-0 flex-col gap-3" key={photograph.image}>
          <AspectRatio className="overflow-hidden rounded-xl border" ratio={16 / 9}>
            <img alt={photograph.alt} className="object-cover" loading="lazy" src={photograph.image} />
          </AspectRatio>
          <figcaption className="flex flex-col gap-0.5">
            <span className="font-medium text-sm">{photograph.title}</span>
            <span className="text-muted-foreground text-xs">{photograph.location}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
```


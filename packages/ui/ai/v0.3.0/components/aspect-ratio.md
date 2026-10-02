# 宽高比 AspectRatio

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/aspect-ratio
Source: packages/ui/src/components/aspect-ratio.tsx
Source SHA-256: 1ca76b9e2c37989152cb8bf2bd33ce5d704d435c2e89526fd241b231bfcf5ff0

让内容按固定宽高比占位，常用于封面图、视频和地图。图片加载前就预留好空间，页面不会跳动。

## Use and ownership
- 让内容按固定宽高比占位，常用于封面图、视频和地图。图片加载前就预留好空间，页面不会跳动。
- Avoid: 不要让样式替代语义；空值、未知与零分别表达。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 数据、权限、动作范围、异步结果与持久化。

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
        <svg aria-label="湖畔晨雾的风景插画" preserveAspectRatio="xMidYMid slice" role="img" viewBox="0 0 1600 900">
          <defs>
            <linearGradient id="ar-sky" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#dfe8f1" />
              <stop offset="1" stopColor="#f6efe6" />
            </linearGradient>
            <linearGradient id="ar-lake" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#c9d7e2" />
              <stop offset="1" stopColor="#9fb3c4" />
            </linearGradient>
          </defs>
          <rect fill="url(#ar-sky)" height="900" width="1600" />
          <circle cx="1130" cy="300" fill="#f3d9b8" r="86" />
          <path d="M0 560 L260 380 L430 500 L640 300 L900 520 L1080 420 L1300 560 L1600 400 L1600 900 L0 900 Z" fill="#b7c4cf" />
          <path d="M0 640 L220 520 L420 610 L700 470 L960 620 L1240 520 L1600 640 L1600 900 L0 900 Z" fill="#8fa1b1" />
          <rect fill="url(#ar-lake)" height="230" width="1600" y="670" />
          <path d="M140 760 H520 M760 800 H1180 M300 840 H640" stroke="#e8eef3" strokeLinecap="round" strokeOpacity=".6" strokeWidth="6" />
        </svg>
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

### 课程卡片
Source: apps/docs/src/content/aspect-ratio/demos/03-media-card.tsx
```tsx
import { AspectRatio } from "@qingye/ui/components/aspect-ratio";
import { PlayIcon } from "lucide-react";

export const meta = { title: "课程卡片", description: "封面按 16:9 占位，叠加播放按钮与时长。" };

const lessons = [
  { title: "设计系统中的间距与节奏", author: "林悦", duration: "12:48", hue: "from-[#e6ddd3] to-[#c9b8a6]" },
  { title: "用 Tailwind CSS 4 构建主题令牌", author: "周屹", duration: "18:05", hue: "from-[#d7e1ea] to-[#a9bccd]" },
];

export default function Demo() {
  return (
    <div className="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
      {lessons.map((lesson) => (
        <article className="group flex flex-col gap-3" key={lesson.title}>
          <AspectRatio className="overflow-hidden rounded-xl border" ratio={16 / 9}>
            <div className={`bg-linear-to-br ${lesson.hue} transition-[scale] duration-(--qy-duration-slow) group-hover:scale-[1.02]`} />
            <div className="flex items-center justify-center">
              <span className="flex size-11 items-center justify-center rounded-full bg-background/88 text-foreground shadow-sm/5 backdrop-blur-sm">
                <PlayIcon aria-hidden="true" className="ms-0.5 size-4.5 fill-current" />
              </span>
            </div>
            <div className="flex items-end justify-end p-2.5">
              <span className="rounded-md bg-black/56 px-1.5 py-0.5 font-medium text-white text-xs numeric backdrop-blur-sm">{lesson.duration}</span>
            </div>
          </AspectRatio>
          <div className="flex flex-col gap-0.5">
            <h3 className="font-medium text-sm">{lesson.title}</h3>
            <p className="text-muted-foreground text-xs">{lesson.author}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
```


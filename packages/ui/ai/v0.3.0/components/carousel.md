# 轮播 Carousel

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/carousel
Source: packages/ui/src/components/carousel.tsx
Source SHA-256: 98455d60de988a4c4a891ffaa6df39a1fe0553f672446bc4b60c118e6b781b3d

横向滑动浏览一组同类内容，例如商品图、案例或文章卡片。轨道是原生滚动容器：触屏滑动、触控板与惯性滚动都由浏览器提供；不会自动播放。

## Use and ownership
- 横向滑动浏览一组同类内容，例如商品图、案例或文章卡片。轨道是原生滚动容器：触屏滑动、触控板与惯性滚动都由浏览器提供；不会自动播放。
- Avoid: 不要让样式替代语义；空值、未知与零分别表达。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 数据、权限、动作范围、异步结果与持久化。

## Current exports
- Carousel: function; owner carousel; PASS; props: CarouselProps
- CarouselContent: function; owner carousel; PASS; props: React.ComponentProps<"div">
- CarouselDots: function; owner carousel; PASS; props: React.ComponentProps<"div">
- CarouselItem: function; owner carousel; PASS; props: React.ComponentProps<"div">
- CarouselNext: function; owner carousel; PASS; props: CarouselButtonProps
- CarouselPrevious: function; owner carousel; PASS; props: CarouselButtonProps
- CarouselProps: type; owner carousel; PASS
- useCarousel: function; owner carousel; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Carousel
根组件 <section>，带 aria-roledescription="轮播"；内部包含一个读屏可感知的位置播报。
- aria-label: string. 必填，说明轮播的内容，例如“新品推荐”。
- slidesPerView: number; default 1. 同时可见的张数。需要随断点变化时不传，改在 className 中设置 --carousel-per-view。
- gap: number; default 4. 张与张之间的间距，按间距档位（4 = 1rem）。
- index / defaultIndex: number; default 0. 当前位置（受控 / 非受控）；初始位置不带动画。
- onIndexChange: (index: number) => void. 滑动、按键或按钮使位置变化后调用。

### CarouselContent
滚动轨道，吸附对齐每一张；直接子元素必须是 CarouselItem。

### CarouselItem
单张，按 slidesPerView 与 gap 计算宽度；带 role="group" 与“第 N 张，共 M 张”的名称。

### CarouselPrevious / CarouselNext
上一张 / 下一张按钮（默认 outline、icon-sm、圆形）。到达两端时变为 aria-disabled，焦点不会丢失。可传 Button 的全部属性。

### CarouselDots
位置指示点，每个吸附位置一个，可点击跳转；全部内容一屏放得下时不渲染。

### useCarousel
在 Carousel 内读取 index、count、canPrevious、canNext 与 scrollTo，用于自定义计数或控件。

## Keyboard
- ← / →: 焦点在轮播内时切换上一张 / 下一张（从右到左布局时方向相反）。
- Tab: 依次聚焦每张中的链接与控件，被聚焦的一张会滚入视野。
- Enter / Space: 触发上一张、下一张或指示点。

## Source examples
### 默认
Source: apps/docs/src/content/carousel/demos/01-default.tsx
```tsx
import { Carousel, CarouselContent, CarouselDots, CarouselItem, CarouselNext, CarouselPrevious } from "@qingye/ui/components/carousel";

export const meta = { title: "默认", description: "一次一张；在触屏上直接左右滑动。" };

const products = [
  { name: "云台相机 Q3", price: "¥2,199", tone: "from-sky-100 to-indigo-200 dark:from-sky-950 dark:to-indigo-900" },
  { name: "降噪耳机 Air", price: "¥899", tone: "from-emerald-100 to-teal-200 dark:from-emerald-950 dark:to-teal-900" },
  { name: "机械键盘 K75", price: "¥649", tone: "from-amber-100 to-orange-200 dark:from-amber-950 dark:to-orange-900" },
  { name: "便携屏 15.6″", price: "¥1,299", tone: "from-rose-100 to-fuchsia-200 dark:from-rose-950 dark:to-fuchsia-900" },
];

export default function Demo() {
  return (
    <Carousel aria-label="新品推荐" className="w-full max-w-md">
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem key={product.name}>
            <div className={`flex aspect-[4/3] flex-col justify-end rounded-xl bg-gradient-to-br p-5 ${product.tone}`}>
              <p className="font-semibold text-lg">{product.name}</p>
              <p className="numeric text-foreground/70 text-sm">{product.price} 起</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center justify-between">
        <CarouselDots />
        <div className="flex gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
    </Carousel>
  );
}
```

### 一次多张
Source: apps/docs/src/content/carousel/demos/02-multiple.tsx
```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@qingye/ui/components/carousel";

export const meta = {
  title: "一次多张",
  description: "用 className 设置 --carousel-per-view 随断点变化：手机 1 张多一点，640px 起 2 张，1024px 起 3 张。",
};

const posts = [
  { tag: "设计", title: "为什么我们的边框都是半透明的", date: "9 月 28 日" },
  { tag: "工程", title: "用原生滚动吸附做一个轮播", date: "9 月 21 日" },
  { tag: "产品", title: "青烟云 2.0：更快的构建与回滚", date: "9 月 14 日" },
  { tag: "团队", title: "远程协作的第三年", date: "9 月 7 日" },
  { tag: "工程", title: "深色模式里的阴影应该怎么画", date: "8 月 31 日" },
];

export default function Demo() {
  return (
    <Carousel
      aria-label="最新文章"
      className="w-full [--carousel-per-view:1.15] sm:[--carousel-per-view:2] lg:[--carousel-per-view:3]"
      gap={3}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">最新文章</h3>
        <div className="flex gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
      <CarouselContent>
        {posts.map((post) => (
          <CarouselItem key={post.title}>
            <a className="flex h-full flex-col gap-3 rounded-xl border p-4 transition-colors hover:bg-accent/50" href="#">
              <span className="text-muted-foreground text-xs">{post.tag}</span>
              <span className="text-pretty font-medium text-sm leading-snug">{post.title}</span>
              <span className="mt-auto text-muted-foreground text-xs">{post.date}</span>
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
```

### 按钮浮于两侧
Source: apps/docs/src/content/carousel/demos/03-overlay.tsx
```tsx
import { Carousel, CarouselContent, CarouselDots, CarouselItem, CarouselNext, CarouselPrevious } from "@qingye/ui/components/carousel";

export const meta = {
  title: "按钮浮于两侧",
  description: "图集常用：按钮叠在画面两侧，指示点居中。",
};

const photos = [
  { place: "杭州 · 西溪", tone: "from-teal-200 via-emerald-100 to-lime-100 dark:from-teal-900 dark:via-emerald-950 dark:to-lime-950" },
  { place: "大理 · 洱海", tone: "from-sky-300 via-sky-100 to-blue-100 dark:from-sky-900 dark:via-sky-950 dark:to-blue-950" },
  { place: "敦煌 · 鸣沙山", tone: "from-amber-200 via-orange-100 to-yellow-100 dark:from-amber-900 dark:via-orange-950 dark:to-yellow-950" },
];

export default function Demo() {
  return (
    <Carousel aria-label="旅行相册" className="w-full max-w-lg">
      <div className="relative">
        <CarouselContent>
          {photos.map((photo) => (
            <CarouselItem key={photo.place}>
              <div className={`flex aspect-video items-end rounded-xl bg-gradient-to-br p-4 ${photo.tone}`}>
                <span className="rounded-md bg-background/80 px-2 py-1 font-medium text-xs backdrop-blur-sm">{photo.place}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute start-3 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm max-sm:hidden" />
        <CarouselNext className="absolute end-3 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm max-sm:hidden" />
      </div>
      <CarouselDots className="justify-center" />
    </Carousel>
  );
}
```

### 自定义计数
Source: apps/docs/src/content/carousel/demos/04-counter.tsx
```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, useCarousel } from "@qingye/ui/components/carousel";
import { useState } from "react";

export const meta = {
  title: "自定义计数",
  description: "用 useCarousel 读取位置，onIndexChange 同步外部状态；defaultIndex 指定初始位置。",
};

const steps = [
  { title: "连接代码仓库", text: "授权 GitHub 或 GitLab，选择要部署的仓库。" },
  { title: "确认构建设置", text: "自动识别框架，也可以手动修改构建命令。" },
  { title: "配置环境变量", text: "密钥只在构建与运行时注入，不会出现在日志里。" },
  { title: "部署上线", text: "每次推送自动部署，任意版本一键回滚。" },
];

function Counter() {
  const { index, count } = useCarousel();
  return (
    <span className="numeric text-muted-foreground text-sm">
      <span className="font-medium text-foreground">{index + 1}</span> / {count}
    </span>
  );
}

export default function Demo() {
  const [current, setCurrent] = useState(1);
  return (
    <Carousel aria-label="上手指南" className="w-full max-w-sm" defaultIndex={1} onIndexChange={setCurrent}>
      <CarouselContent>
        {steps.map((step) => (
          <CarouselItem key={step.title}>
            <div className="flex h-36 flex-col justify-center gap-1.5 rounded-xl border bg-card p-5">
              <p className="font-medium">{step.title}</p>
              <p className="text-muted-foreground text-sm">{step.text}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center justify-between">
        <CarouselPrevious />
        <Counter />
        <CarouselNext />
      </div>
      <p className="text-center text-muted-foreground text-xs">当前步骤：{steps[current]?.title}</p>
    </Carousel>
  );
}
```


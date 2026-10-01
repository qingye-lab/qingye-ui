import type { ComponentMeta } from "@/lib/types";

export default {
  title: "轮播 Carousel",
  description:
    "横向滑动浏览一组同类内容，例如商品图、案例或文章卡片。轨道是原生滚动容器：触屏滑动、触控板与惯性滚动都由浏览器提供；不会自动播放。",
  category: "数据展示",
  source: "local",
  exports: ["Carousel", "CarouselContent", "CarouselItem", "CarouselPrevious", "CarouselNext", "CarouselDots"],
  keywords: ["carousel", "轮播", "幻灯片", "滑动", "gallery", "slider"],
  api: [
    {
      name: "Carousel",
      description: "根组件 <section>，带 aria-roledescription=\"轮播\"；内部包含一个读屏可感知的位置播报。",
      props: [
        { name: "aria-label", type: "string", description: "必填，说明轮播的内容，例如“新品推荐”。" },
        { name: "slidesPerView", type: "number", default: "1", description: "同时可见的张数。需要随断点变化时不传，改在 className 中设置 --carousel-per-view。" },
        { name: "gap", type: "number", default: "4", description: "张与张之间的间距，按间距档位（4 = 1rem）。" },
        { name: "index / defaultIndex", type: "number", default: "0", description: "当前位置（受控 / 非受控）；初始位置不带动画。" },
        { name: "onIndexChange", type: "(index: number) => void", description: "滑动、按键或按钮使位置变化后调用。" },
      ],
    },
    { name: "CarouselContent", description: "滚动轨道，吸附对齐每一张；直接子元素必须是 CarouselItem。" },
    { name: "CarouselItem", description: "单张，按 slidesPerView 与 gap 计算宽度；带 role=\"group\" 与“第 N 张，共 M 张”的名称。" },
    { name: "CarouselPrevious / CarouselNext", description: "上一张 / 下一张按钮（默认 outline、icon-sm、圆形）。到达两端时变为 aria-disabled，焦点不会丢失。可传 Button 的全部属性。" },
    { name: "CarouselDots", description: "位置指示点，每个吸附位置一个，可点击跳转；全部内容一屏放得下时不渲染。" },
    { name: "useCarousel", description: "在 Carousel 内读取 index、count、canPrevious、canNext 与 scrollTo，用于自定义计数或控件。" },
  ],
  keyboard: [
    { keys: "← / →", description: "焦点在轮播内时切换上一张 / 下一张（从右到左布局时方向相反）。" },
    { keys: "Tab", description: "依次聚焦每张中的链接与控件，被聚焦的一张会滚入视野。" },
    { keys: "Enter / Space", description: "触发上一张、下一张或指示点。" },
  ],
  notes: [
    "不提供自动播放：自动切换会打断阅读，也让读屏用户失去位置。",
    "每张的内容应当完整独立；关键信息不要只放在第二张以后。",
    "同时显示多张时，指示点按“可停靠的位置”计数，而不是按张数。",
    "开启“减少动态效果”时，按钮与按键跳转不再平滑滚动。",
  ],
} satisfies ComponentMeta;

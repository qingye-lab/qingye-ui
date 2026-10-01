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

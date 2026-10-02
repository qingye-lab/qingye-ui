import { AspectRatio } from "@qingye/ui/components/aspect-ratio";
import { Carousel, CarouselContent, CarouselDots, CarouselItem, CarouselNext, CarouselPrevious } from "@qingye/ui/components/carousel";

export const meta = { title: "默认", description: "一次一张；在触屏上直接左右滑动。" };

const photographs = [
  { title: "林间", image: "/examples/forest.jpg", alt: "阳光穿过林间的树木" },
  { title: "山巅", image: "/examples/mountain.jpg", alt: "山峰与清晨的天空" },
  { title: "桌边", image: "/examples/coffee.jpg", alt: "桌上的咖啡" },
  { title: "工作台", image: "/examples/desk.jpg", alt: "桌面的工作用品" },
];

export default function Demo() {
  return (
    <Carousel aria-label="摄影集" className="w-full max-w-md">
      <CarouselContent>
        {photographs.map((photograph) => (
          <CarouselItem key={photograph.image}>
            <figure className="overflow-hidden rounded-xl border">
              <AspectRatio ratio={4 / 3}>
                <img alt={photograph.alt} className="object-cover" loading="lazy" src={photograph.image} />
              </AspectRatio>
              <figcaption className="px-4 py-3 font-medium text-sm">{photograph.title}</figcaption>
            </figure>
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

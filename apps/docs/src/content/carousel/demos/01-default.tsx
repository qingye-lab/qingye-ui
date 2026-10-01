import { Carousel, CarouselContent, CarouselDots, CarouselItem, CarouselNext, CarouselPrevious } from "@yanqing/ui/components/carousel";

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

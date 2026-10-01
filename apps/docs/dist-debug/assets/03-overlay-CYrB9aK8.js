const e=`import { Carousel, CarouselContent, CarouselDots, CarouselItem, CarouselNext, CarouselPrevious } from "@qingye/ui/components/carousel";

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
              <div className={\`flex aspect-video items-end rounded-xl bg-gradient-to-br p-4 \${photo.tone}\`}>
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
`;export{e as default};

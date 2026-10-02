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

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

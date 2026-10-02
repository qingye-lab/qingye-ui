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

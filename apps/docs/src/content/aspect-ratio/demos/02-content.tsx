import { AspectRatio } from "@qingye/ui/components/aspect-ratio";
export const meta = { title: "完整内容", titleEn: "Complete content" };
export default function Demo() {
  return <AspectRatio ratio={3} className="bg-surface-subtle p-(--qy-space-4) text-body"><p>内容仍参与盒高。宽度缩小时，文字换行并保留完整段落。</p></AspectRatio>;
}

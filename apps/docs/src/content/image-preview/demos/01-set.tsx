import { ImagePreview } from "@qingye_lab/ui/components/image-preview";
import { Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "同组图片与单张", titleEn: "A set and a single image" } satisfies DemoMeta;

const svg = (fill: string, label: string) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'><rect width='800' height='500' fill='${fill}'/><text x='400' y='270' font-size='64' text-anchor='middle' fill='white'>${label}</text></svg>`)}`;

export default function Demo() {
  return <Stack gap="panel">
    <ImagePreview images={[
      { src: svg("#475569", "一"), alt: "第一张：石板色" },
      { src: svg("#57534e", "二"), alt: "第二张：褐石色" },
      { src: svg("#44403c", "三"), alt: "第三张：深褐色" },
    ]} />
    <ImagePreview images={[{ src: svg("#52525b", "单"), alt: "单张图片" }]} />
  </Stack>;
}

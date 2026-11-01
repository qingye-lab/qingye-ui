import { ImagePreview } from "@qingye_lab/ui/components/image-preview";

const svg = (fill: string) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='640' height='400'><rect width='640' height='400' fill='${fill}'/><circle cx='320' cy='200' r='90' fill='white' fill-opacity='.8'/></svg>`)}`;

export default function Cover() {
  return <ImagePreview images={[{ src: svg("#9ca3af"), alt: "灰色底图" }, { src: svg("#6b7280"), alt: "深灰色底图" }]} />;
}

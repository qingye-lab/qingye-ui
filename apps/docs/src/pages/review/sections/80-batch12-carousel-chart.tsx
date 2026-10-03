import CarouselDemo from "@/content/carousel/demos/01-states";
import ChartDemo from "@/content/chart/demos/01-states";
import { Stack } from "@qingye/ui/components/layout";
export default function Batch12CarouselChart() {
  return <section id="batch12-carousel-chart" className="min-w-0"><Stack gap="section"><h2 className="text-chapter">顺序阅读与数值</h2><Stack gap="panel"><h3 className="text-heading">有限内容</h3><CarouselDemo /></Stack><Stack gap="panel"><h3 className="text-heading">数值</h3><ChartDemo /></Stack></Stack></section>;
}

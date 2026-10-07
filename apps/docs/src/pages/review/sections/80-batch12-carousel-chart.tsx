import ChartTrend from "@/content/chart/demos/01-trend";
import ChartCompare from "@/content/chart/demos/02-compare";
import ChartUnknown from "@/content/chart/demos/03-unknown";
import ProportionDemo from "@/content/proportion/demos/01-storage";
import SparklineDemo from "@/content/sparkline/demos/01-inline";
import StatDeltaDemo from "@/content/stat/demos/02-delta";
import { Stack } from "@qingye/ui/components/layout";
export default function Batch12CarouselChart() {
  return <section id="batch12-carousel-chart" className="min-w-0"><Stack gap="section"><h2 className="text-chapter">数值</h2>
    <Stack gap="panel"><h3 className="text-heading">趋势与比较</h3><ChartTrend /><ChartCompare /><ChartUnknown /></Stack>
    <Stack gap="panel"><h3 className="text-heading">读数与行内趋势</h3><StatDeltaDemo /><SparklineDemo /></Stack>
    <Stack gap="panel"><h3 className="text-heading">构成</h3><ProportionDemo /></Stack>
  </Stack></section>;
}

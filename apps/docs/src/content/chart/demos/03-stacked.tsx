import type { ChartConfig } from "@yanqing/ui/components/chart";
import { Card, CardDescription, CardHeader, CardPanel, CardTitle } from "@yanqing/ui/components/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, RechartsPrimitive } from "@yanqing/ui/components/chart";

const { Bar, BarChart, CartesianGrid, XAxis, YAxis } = RechartsPrimitive;

export const meta = {
  title: "堆叠柱状图",
  description: "段与段之间用 2px 卡片色描边隔开，只在最上一段做圆角。",
};

const data = [
  { week: "第 36 周", miniapp: 2860, app: 1740, delivery: 980 },
  { week: "第 37 周", miniapp: 3020, app: 1810, delivery: 1040 },
  { week: "第 38 周", miniapp: 2940, app: 1920, delivery: 1120 },
  { week: "第 39 周", miniapp: 3310, app: 1880, delivery: 1260 },
  { week: "第 40 周", miniapp: 3480, app: 2050, delivery: 1190 },
];

const config = {
  miniapp: { label: "小程序", color: "var(--chart-1)" },
  app: { label: "App", color: "var(--chart-2)" },
  delivery: { label: "外卖平台", color: "var(--chart-3)" },
} satisfies ChartConfig;

const gap = { stroke: "var(--color-card)", strokeWidth: 2 } as const;

export default function Demo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>订单渠道构成</CardTitle>
        <CardDescription>近 5 周 · 单位：单</CardDescription>
      </CardHeader>
      <CardPanel>
        <ChartContainer className="aspect-auto h-64 w-full sm:h-72" config={config}>
          <BarChart accessibilityLayer data={data} margin={{ left: 0, right: 0, top: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis axisLine={false} dataKey="week" tickLine={false} tickMargin={8} />
            <YAxis
              axisLine={false}
              ticks={[0, 2000, 4000, 6000, 8000]}
              tickFormatter={(value: number) => value.toLocaleString("zh-CN")}
              tickLine={false}
              tickMargin={4}
              width="auto"
            />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar {...gap} animationDuration={600} dataKey="miniapp" fill="var(--color-miniapp)" maxBarSize={32} stackId="channel" />
            <Bar {...gap} animationDuration={600} dataKey="app" fill="var(--color-app)" maxBarSize={32} stackId="channel" />
            <Bar
              {...gap}
              animationDuration={600}
              dataKey="delivery"
              fill="var(--color-delivery)"
              maxBarSize={32}
              radius={[4, 4, 0, 0]}
              stackId="channel"
            />
          </BarChart>
        </ChartContainer>
      </CardPanel>
    </Card>
  );
}

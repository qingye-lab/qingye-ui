import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  RechartsPrimitive,
  type ChartConfig,
} from "@yanqing/ui";

const { Bar, BarChart, CartesianGrid, XAxis, YAxis } = RechartsPrimitive;

export const meta = { title: "分组柱状图", description: "柱宽不超过 24px，同组柱之间留 2px 背景色缝隙，数据端 4px 圆角。" };

const data = [
  { month: "4月", online: 8420, store: 6130 },
  { month: "5月", online: 9160, store: 6480 },
  { month: "6月", online: 10240, store: 6020 },
  { month: "7月", online: 11830, store: 6740 },
  { month: "8月", online: 12460, store: 7210 },
  { month: "9月", online: 11920, store: 7580 },
];

const config = {
  online: { label: "线上订单", color: "var(--chart-1)" },
  store: { label: "门店订单", color: "var(--chart-2)" },
} satisfies ChartConfig;

export default function Demo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>月度订单</CardTitle>
        <CardDescription>2026 年 4–9 月 · 单位：单</CardDescription>
      </CardHeader>
      <CardPanel>
        <ChartContainer className="aspect-auto h-64 w-full sm:h-72" config={config}>
          <BarChart accessibilityLayer barGap={2} data={data} margin={{ left: 0, right: 0, top: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis axisLine={false} dataKey="month" tickLine={false} tickMargin={8} />
            <YAxis
              axisLine={false}
              ticks={[0, 5000, 10000, 15000]}
              tickFormatter={(value: number) => value.toLocaleString("zh-CN")}
              tickLine={false}
              tickMargin={4}
              width="auto"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar animationDuration={600} dataKey="online" fill="var(--color-online)" maxBarSize={24} radius={[4, 4, 0, 0]} />
            <Bar animationDuration={600} dataKey="store" fill="var(--color-store)" maxBarSize={24} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardPanel>
    </Card>
  );
}

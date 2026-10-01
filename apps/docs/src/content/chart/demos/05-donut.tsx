import type { ChartConfig } from "@qingye/ui/components/chart";
import { Card, CardDescription, CardHeader, CardPanel, CardTitle } from "@qingye/ui/components/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, RechartsPrimitive } from "@qingye/ui/components/chart";

const { Label, Pie, PieChart } = RechartsPrimitive;

export const meta = {
  title: "环形图",
  description: "中心显示总数；扇区之间留 2px 卡片色缝隙。只用于 6 类以内的占比概览。",
};

const data = [
  { channel: "miniapp", orders: 4820, fill: "var(--color-miniapp)" },
  { channel: "app", orders: 3160, fill: "var(--color-app)" },
  { channel: "store", orders: 2240, fill: "var(--color-store)" },
  { channel: "delivery", orders: 1380, fill: "var(--color-delivery)" },
];

const total = data.reduce((sum, item) => sum + item.orders, 0);

const config = {
  orders: { label: "订单" },
  miniapp: { label: "小程序", color: "var(--chart-1)" },
  app: { label: "App", color: "var(--chart-2)" },
  store: { label: "门店", color: "var(--chart-3)" },
  delivery: { label: "外卖平台", color: "var(--chart-4)" },
} satisfies ChartConfig;

export default function Demo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>订单渠道分布</CardTitle>
        <CardDescription>9 月 · 全部门店</CardDescription>
      </CardHeader>
      <CardPanel>
        <ChartContainer className="mx-auto aspect-square max-h-72 w-full" config={config}>
          <PieChart accessibilityLayer>
            <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="channel" />} />
            <Pie
              animationDuration={600}
              cornerRadius={3}
              data={data}
              dataKey="orders"
              innerRadius="62%"
              nameKey="channel"
              outerRadius="86%"
              strokeWidth={2}
            >
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox)) return null;
                  const { cx, cy } = viewBox as { cx: number; cy: number };
                  return (
                    <text dominantBaseline="middle" textAnchor="middle" x={cx} y={cy}>
                      <tspan className="fill-foreground font-semibold text-2xl" x={cx} y={cy - 6}>
                        {total.toLocaleString("zh-CN")}
                      </tspan>
                      <tspan className="fill-muted-foreground text-xs" x={cx} y={cy + 16}>
                        订单总数
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="channel" />} />
          </PieChart>
        </ChartContainer>
      </CardPanel>
    </Card>
  );
}

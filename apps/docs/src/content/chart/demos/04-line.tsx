import type { ChartConfig } from "@yanqing/ui/components/chart";
import { Card, CardDescription, CardHeader, CardPanel, CardTitle } from "@yanqing/ui/components/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, RechartsPrimitive } from "@yanqing/ui/components/chart";

const { CartesianGrid, Line, LineChart, XAxis, YAxis } = RechartsPrimitive;

export const meta = {
  title: "多系列折线图",
  description: "2px 线宽，不画常驻数据点；悬停时出现带卡片色描边的圆点和竖向发丝线。",
};

const data = [
  { week: "7/7", east: 182, south: 164, north: 141 },
  { week: "7/14", east: 176, south: 171, north: 138 },
  { week: "7/21", east: 191, south: 168, north: 149 },
  { week: "7/28", east: 204, south: 175, north: 152 },
  { week: "8/4", east: 198, south: 186, north: 147 },
  { week: "8/11", east: 212, south: 181, north: 158 },
  { week: "8/18", east: 219, south: 193, north: 163 },
  { week: "8/25", east: 214, south: 201, north: 160 },
  { week: "9/1", east: 226, south: 198, north: 171 },
  { week: "9/8", east: 233, south: 207, north: 168 },
  { week: "9/15", east: 241, south: 212, north: 176 },
  { week: "9/22", east: 238, south: 219, north: 181 },
];

const config = {
  east: { label: "华东", color: "var(--chart-1)" },
  south: { label: "华南", color: "var(--chart-2)" },
  north: { label: "华北", color: "var(--chart-4)" },
} satisfies ChartConfig;

export default function Demo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>各区域日均订单</CardTitle>
        <CardDescription>近 12 周 · 单店日均（单）</CardDescription>
      </CardHeader>
      <CardPanel>
        <ChartContainer className="aspect-auto h-64 w-full sm:h-72" config={config}>
          <LineChart accessibilityLayer data={data} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis axisLine={false} dataKey="week" minTickGap={16} tickLine={false} tickMargin={8} />
            <YAxis axisLine={false} domain={[120, 250]} ticks={[120, 160, 200, 240]} tickLine={false} tickMargin={4} width="auto" />
            <ChartTooltip
              content={<ChartTooltipContent indicator="line" labelFormatter={(label) => `${label} 当周`} />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            {(Object.keys(config) as (keyof typeof config)[]).map((key) => (
              <Line
                activeDot={{ r: 4, strokeWidth: 2 }}
                animationDuration={600}
                dataKey={key}
                dot={false}
                key={key}
                stroke={`var(--color-${key})`}
                strokeWidth={2}
                type="monotone"
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardPanel>
    </Card>
  );
}

import type { ChartConfig } from "@yanqing/ui/components/chart";
import { Card, CardDescription, CardHeader, CardPanel, CardTitle } from "@yanqing/ui/components/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, RechartsPrimitive } from "@yanqing/ui/components/chart";

const { Area, AreaChart, CartesianGrid, XAxis, YAxis } = RechartsPrimitive;

export const meta = { title: "面积图", description: "单一系列不放图例，由标题说明；渐变填充保持在 16% 以内。" };

const data = [
  1102, 1118, 1109, 1131, 1146, 1139, 1152, 1168, 1160, 1175, 1189, 1181, 1194, 1207, 1199,
  1213, 1226, 1218, 1231, 1240, 1236, 1249, 1258, 1251, 1263, 1270, 1266, 1275, 1281, 1284,
].map((online, index) => ({ date: `9月${index + 1}日`, online }));

const config = {
  online: { label: "在线设备", color: "var(--chart-1)" },
} satisfies ChartConfig;

export default function Demo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>在线设备数</CardTitle>
        <CardDescription>9 月每日峰值 · 全部门店</CardDescription>
      </CardHeader>
      <CardPanel>
        <ChartContainer className="aspect-auto h-56 w-full sm:h-64" config={config}>
          <AreaChart accessibilityLayer data={data} margin={{ left: 0, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="fill-online" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--color-online)" stopOpacity={0.16} />
                <stop offset="100%" stopColor="var(--color-online)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis axisLine={false} dataKey="date" minTickGap={24} tickLine={false} tickMargin={8} />
            <YAxis
              axisLine={false}
              domain={[1000, 1300]}
              ticks={[1000, 1100, 1200, 1300]}
              tickFormatter={(value: number) => value.toLocaleString("zh-CN")}
              tickLine={false}
              tickMargin={4}
              width="auto"
            />
            <ChartTooltip content={<ChartTooltipContent valueFormatter={(value) => `${Number(value).toLocaleString("zh-CN")} 台`} />} />
            <Area
              activeDot={{ r: 4, strokeWidth: 2 }}
              animationDuration={600}
              dataKey="online"
              fill="url(#fill-online)"
              stroke="var(--color-online)"
              strokeWidth={2}
              type="monotone"
            />
          </AreaChart>
        </ChartContainer>
      </CardPanel>
    </Card>
  );
}

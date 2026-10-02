# 图表 Chart

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/chart
Source: packages/ui/src/components/chart.tsx
Source SHA-256: 722e292bd3ba22f341a3aeb3914253964200b6874ca28b32cd7f113f8ad0b330

基于 Recharts 的图表外壳：用 config 统一管理系列名称与颜色，并把坐标轴、网格、提示框、图例调成与组件库一致的克制样式。

## Use and ownership
- 数据之间的趋势、分布或比较比单个数值更重要。
- Avoid: 颜色随排名重排；缺测当零；重要值只在悬停 Tooltip 中；图表容器没有可访问名称或摘要。
- Library: 系列样式变量、图例次序、提示框格式、Recharts 容器与焦点外观。
- Application: 数据、单位、时间区间、缺测含义、系列过滤和无障碍摘要。

## Composition
- config 固定实体的名称和颜色；Tooltip/Legend 是增强，关键数值同时提供可阅读摘要或 Table。

## Responsive behavior
- 压缩空间时减少刻度与系列、拆成小图；保留可比较尺度，长系列名可换行。

## Customization
- config 与项目图表组合是修改入口；主题色修改后检查真实标记、轴和背景对比。

## Current exports
- ChartConfig: type; owner chart; PASS
- ChartContainer: function; owner chart; PASS; props: ChartContainerProps
- ChartContainerProps: interface; owner chart; PASS
- ChartLegend: const; owner chart; PASS
- ChartLegendContent: function; owner chart; PASS; props: ChartLegendContentProps
- ChartLegendContentProps: interface; owner chart; PASS
- ChartStyle: function; owner chart; PASS; props: {
  id: string;
  config: ChartConfig;
}
- ChartTooltip: const; owner chart; PASS
- ChartTooltipContent: function; owner chart; PASS; props: ChartTooltipContentProps
- ChartTooltipContentProps: type; owner chart; PASS
- RechartsPrimitive: reexport; owner chart; UNVERIFIED

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: clsx, react, tailwind-merge
- Optional peers: recharts
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ChartContainer
响应式容器（默认 16:9，可用 aspect-* 或高度类覆盖），并为每个系列提供 --color-<key> 变量。
- config: ChartConfig. 系列 key → { label, color?, theme?, icon? }。color 可写 var(--chart-1) 等主题感知的变量；theme 分别给出 { light, dark }。未给颜色的系列按 config 顺序取 --chart-1…5，超出则为中性灰。
- initialDimension: { width: number; height: number }; default { width: 320, height: 200 }. 测量前使用的尺寸（服务端渲染、测试）。
- children: ReactElement. 一个 Recharts 图表，如 <AreaChart>。

### ChartTooltip
即 Recharts 的 Tooltip，传 content={<ChartTooltipContent />}。

### ChartTooltipContent
浮层样式的提示框：数值在右、等宽数字、强调色只用于指示标记。
- indicator: "dot" | "line" | "dashed"; default "dot". 系列标记样式。折线图建议 line。
- hideLabel / hideIndicator: boolean; default false. 隐藏标题行 / 隐藏系列标记。
- labelFormatter: (label, payload) => ReactNode. 格式化标题行，例如把日期写成「9 月 30 日 周二」。
- valueFormatter: (value, name, item) => ReactNode. 格式化每个数值；默认按界面语言加千分位。
- formatter: Recharts formatter. 完全接管一行的渲染。
- nameKey / labelKey: string. 从数据中取哪个字段去 config 查找名称。

### ChartLegend
即 Recharts 的 Legend，传 content={<ChartLegendContent />}。

### ChartLegendContent
图例：标记形状跟随图形（折线为短线，柱与面积为方块），文字用弱化色。
- nameKey: string. 从数据中取哪个字段去 config 查找名称（饼图常用）。
- hideIcon: boolean; default false. 不显示 config 中的 icon。

### RechartsPrimitive
Recharts 命名空间的再导出。在应用中也可以直接从 recharts 导入图形组件。

## Keyboard
- Tab: 聚焦图表（Recharts 的可访问层），出现焦点环。
- ← / →: 在数据点之间移动，同步显示提示框。

## Source examples
### 面积图
Source: apps/docs/src/content/chart/demos/01-area.tsx
```tsx
import type { ChartConfig } from "@qingye/ui/components/chart";
import { Card, CardDescription, CardHeader, CardPanel, CardTitle } from "@qingye/ui/components/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, RechartsPrimitive } from "@qingye/ui/components/chart";

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
```

### 分组柱状图
Source: apps/docs/src/content/chart/demos/02-bar.tsx
```tsx
import type { ChartConfig } from "@qingye/ui/components/chart";
import { Card, CardDescription, CardHeader, CardPanel, CardTitle } from "@qingye/ui/components/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, RechartsPrimitive } from "@qingye/ui/components/chart";

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
```

### 堆叠柱状图
Source: apps/docs/src/content/chart/demos/03-stacked.tsx
```tsx
import type { ChartConfig } from "@qingye/ui/components/chart";
import { Card, CardDescription, CardHeader, CardPanel, CardTitle } from "@qingye/ui/components/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, RechartsPrimitive } from "@qingye/ui/components/chart";

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
```

### 多系列折线图
Source: apps/docs/src/content/chart/demos/04-line.tsx
```tsx
import type { ChartConfig } from "@qingye/ui/components/chart";
import { Card, CardDescription, CardHeader, CardPanel, CardTitle } from "@qingye/ui/components/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, RechartsPrimitive } from "@qingye/ui/components/chart";

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
```

### 环形图
Source: apps/docs/src/content/chart/demos/05-donut.tsx
```tsx
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
```


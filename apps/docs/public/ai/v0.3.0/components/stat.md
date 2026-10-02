# 指标 Stat

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/stat
Source: packages/ui/src/components/stat.tsx
Source SHA-256: eebb854c97ccca5d76984b38707b887179e72911fecad988fd57e2e2c5653611

展示单个关键数字：标签、数值、单位、与上一周期的变化和辅助说明。常放在 Card 中组成仪表盘的指标行。

## Use and ownership
- 读取一个关键量及其单位、比较周期与趋势。
- Avoid: 零与未采集混淆；上涨永远绿色；缺测被删除后跨时间连接；为了层级让同级比较字号不同。
- Library: 指标部位、方向文字、情感颜色与趋势线几何。
- Application: 真实数值、周期、好坏规则、缺测事实与摘要。

## Composition
- Label/Value/Unit 明确量纲；Delta 的 trend 说明方向，inverse 说明好坏；Sparkline 缺测断线且保留时间位置。

## Responsive behavior
- 长标签和单位可换行，保留数值容量；迷你线不能成为唯一数据来源。

## Customization
- size 按任务层级选择，Sparkline label 提供趋势事实，主题不改变 inverse 的业务含义。

## Current exports
- Stat: function; owner stat; PASS; props: StatProps
- StatDelta: function; owner stat; PASS; props: StatDeltaProps
- StatDeltaProps: interface; owner stat; PASS
- StatDescription: function; owner stat; PASS; props: useRender.ComponentProps<"div">
- StatLabel: function; owner stat; PASS; props: useRender.ComponentProps<"div">
- StatProps: interface; owner stat; PASS
- StatSize: type; owner stat; PASS
- StatSparkline: function; owner stat; PASS; props: StatSparklineProps
- StatSparklineProps: interface; owner stat; PASS
- StatTrend: type; owner stat; PASS
- StatUnit: function; owner stat; PASS; props: useRender.ComponentProps<"span">
- StatValue: function; owner stat; PASS; props: useRender.ComponentProps<"div">

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Stat
指标容器，纵向排列各部件。可通过 render 替换元素。
- size: "sm" | "default" | "lg"; default "default". 数值字号 20 / 24 / 32px，单位与标签随之缩放。lg 留给一个视图里最重要的那个数字。

### StatLabel
指标名称，弱化色、500 字重；可带一个图标。

### StatValue
数值，600 字重、等宽数字，可放入 StatUnit 作为前缀（¥）或后缀（台、ms）。

### StatUnit
单位或货币符号，比数值更小、更淡。

### StatDelta
变化量。颜色表达好坏而不是方向；图标与读屏前缀（上升 / 下降 / 持平）表达方向。
- trend: "up" | "down" | "flat"; default "flat". 变化方向，决定图标与读屏前缀。
- inverse: boolean; default false. 下降为好（故障率、耗时、成本）时设置：下降显示为成功色，上升显示为危险色。
- variant: "default" | "badge"; default "default". badge 增加淡色底。
- trendLabel: string. 覆盖读屏前缀。

### StatDescription
数值下方的辅助说明，常与 StatDelta 一起写成「+8.2% 较上周」。

### StatSparkline
不依赖图表库的迷你趋势线，颜色取 currentColor（默认 text-chart-1），线宽在任意尺寸下保持 1.5px。
- data: readonly number[]. 按时间顺序的数值，至少两个点；非有限数值保留时间位置并断开趋势线，末项缺测时不显示最新值圆点。
- fill: boolean; default true. 线下方的淡色渐变。
- showEnd: boolean; default true. 在最新值处画一个圆点。
- label: string. 可访问的摘要，例如「近 12 周订单量持续上升」；不传时视为装饰。

## Keyboard

## Source examples
### 基础
Source: apps/docs/src/content/stat/demos/01-basic.tsx
```tsx
import { Card, CardPanel } from "@qingye/ui/components/card";
import { Stat, StatDelta, StatDescription, StatLabel, StatUnit, StatValue } from "@qingye/ui/components/stat";

export const meta = { title: "基础", description: "放进 Card，数值使用等宽数字，变化量注明对比周期。" };

export default function Demo() {
  return (
    <Card className="w-full max-w-xs" size="sm">
      <CardPanel>
        <Stat>
          <StatLabel>在线设备</StatLabel>
          <StatValue>
            1,284
            <StatUnit>台</StatUnit>
          </StatValue>
          <StatDescription>
            <StatDelta trend="up">+8.2%</StatDelta>
            较上周
          </StatDescription>
        </Stat>
      </CardPanel>
    </Card>
  );
}
```

### 趋势与反向指标
Source: apps/docs/src/content/stat/demos/02-trend.tsx
```tsx
import { Card, CardPanel } from "@qingye/ui/components/card";
import { Stat, StatDelta, StatDescription, StatLabel, StatUnit, StatValue } from "@qingye/ui/components/stat";

export const meta = {
  title: "趋势与反向指标",
  description: "颜色表达好坏：故障率、响应时间这类以下降为好的指标设置 inverse。badge 样式增加淡色底。",
};

export default function Demo() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Card size="sm">
        <CardPanel>
          <Stat>
            <StatLabel>今日订单</StatLabel>
            <StatValue>3,962</StatValue>
            <StatDescription>
              <StatDelta trend="up">+12.4%</StatDelta>
              较昨日
            </StatDescription>
          </Stat>
        </CardPanel>
      </Card>
      <Card size="sm">
        <CardPanel>
          <Stat>
            <StatLabel>退款金额</StatLabel>
            <StatValue>
              <StatUnit>¥</StatUnit>
              8,240
            </StatValue>
            <StatDescription>
              <StatDelta trend="flat">0.0%</StatDelta>
              较昨日
            </StatDescription>
          </Stat>
        </CardPanel>
      </Card>
      <Card size="sm">
        <CardPanel>
          <Stat>
            <StatLabel>设备故障率</StatLabel>
            <StatValue>
              0.42
              <StatUnit>%</StatUnit>
            </StatValue>
            <StatDescription>
              <StatDelta inverse trend="down" variant="badge">
                −0.18%
              </StatDelta>
              较上月
            </StatDescription>
          </Stat>
        </CardPanel>
      </Card>
      <Card size="sm">
        <CardPanel>
          <Stat>
            <StatLabel>平均响应时间</StatLabel>
            <StatValue>
              182
              <StatUnit>ms</StatUnit>
            </StatValue>
            <StatDescription>
              <StatDelta inverse trend="up" variant="badge">
                +24 ms
              </StatDelta>
              较上周
            </StatDescription>
          </Stat>
        </CardPanel>
      </Card>
    </div>
  );
}
```

### 尺寸
Source: apps/docs/src/content/stat/demos/03-sizes.tsx
```tsx
import { Stat, StatDelta, StatDescription, StatLabel, StatUnit, StatValue } from "@qingye/ui/components/stat";

export const meta = { title: "尺寸", description: "sm 用于侧栏等紧凑区域，lg 留给一个视图里最重要的数字。" };

const sizes = [
  { size: "sm", label: "小" },
  { size: "default", label: "默认" },
  { size: "lg", label: "大" },
] as const;

export default function Demo() {
  return (
    <div className="flex w-full flex-wrap items-end justify-around gap-x-10 gap-y-8">
      {sizes.map(({ size, label }) => (
        <Stat key={size} size={size}>
          <StatLabel>本月营收 · {label}</StatLabel>
          <StatValue>
            <StatUnit>¥</StatUnit>
            128,460
          </StatValue>
          <StatDescription>
            <StatDelta trend="up">+6.8%</StatDelta>
            环比
          </StatDescription>
        </Stat>
      ))}
    </div>
  );
}
```

### 迷你趋势线
Source: apps/docs/src/content/stat/demos/04-sparkline.tsx
```tsx
import { Card, CardPanel } from "@qingye/ui/components/card";
import { Stat, StatDelta, StatDescription, StatLabel, StatSparkline, StatUnit, StatValue } from "@qingye/ui/components/stat";
import { ActivityIcon, ServerIcon } from "lucide-react";

export const meta = {
  title: "迷你趋势线",
  description: "StatSparkline 不依赖图表库；颜色取 currentColor，线宽在任意尺寸下保持 1.5px。",
};

const online = [1102, 1136, 1121, 1158, 1190, 1176, 1204, 1231, 1218, 1250, 1266, 1284];
const latency = [212, 205, 198, 204, 191, 188, 196, 179, 184, 176, 171, 182];

export default function Demo() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
      <Card size="sm">
        <CardPanel className="flex flex-col gap-4">
          <Stat>
            <StatLabel>
              <ServerIcon aria-hidden="true" />
              在线设备
            </StatLabel>
            <StatValue>
              1,284
              <StatUnit>台</StatUnit>
            </StatValue>
            <StatDescription>
              <StatDelta trend="up">+8.2%</StatDelta>
              近 12 周
            </StatDescription>
          </Stat>
          <StatSparkline data={online} label="近 12 周在线设备从 1,102 台升至 1,284 台" />
        </CardPanel>
      </Card>
      <Card size="sm">
        <CardPanel className="flex flex-col gap-4">
          <Stat>
            <StatLabel>
              <ActivityIcon aria-hidden="true" />
              接口平均耗时
            </StatLabel>
            <StatValue>
              182
              <StatUnit>ms</StatUnit>
            </StatValue>
            <StatDescription>
              <StatDelta inverse trend="down">−14.2%</StatDelta>
              近 12 周
            </StatDescription>
          </Stat>
          <StatSparkline className="text-chart-2" data={latency} fill={false} label="近 12 周接口平均耗时从 212ms 降至 182ms" />
        </CardPanel>
      </Card>
    </div>
  );
}
```

### 指标网格
Source: apps/docs/src/content/stat/demos/05-grid.tsx
```tsx
import { Card } from "@qingye/ui/components/card";
import { Stat, StatDelta, StatDescription, StatLabel, StatUnit, StatValue } from "@qingye/ui/components/stat";

export const meta = {
  title: "指标网格",
  description: "一张卡片内用发丝线分隔多个指标：窄屏两列，宽屏四列。",
};

const stats = [
  { label: "在线设备", value: "1,284", unit: "台", delta: "+8.2%", trend: "up", period: "较上周" },
  { label: "今日订单", value: "3,962", unit: "单", delta: "+12.4%", trend: "up", period: "较昨日" },
  { label: "客单价", value: "32.4", unit: "元", delta: "−1.6%", trend: "down", period: "较昨日" },
  { label: "未处理告警", value: "17", unit: "条", delta: "−5", trend: "down", period: "较昨日", inverse: true },
] as const;

export default function Demo() {
  return (
    <Card className="w-full overflow-hidden">
      <dl className="m-0 grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
        {stats.map((stat) => (
          <Stat className="bg-card p-4 sm:p-5" key={stat.label}>
            <StatLabel render={<dt />}>{stat.label}</StatLabel>
            <StatValue render={<dd className="m-0" />}>
              {stat.value}
              <StatUnit>{stat.unit}</StatUnit>
            </StatValue>
            <StatDescription render={<dd className="m-0" />}>
              <StatDelta inverse={"inverse" in stat} trend={stat.trend}>
                {stat.delta}
              </StatDelta>
              {stat.period}
            </StatDescription>
          </Stat>
        ))}
      </dl>
    </Card>
  );
}
```


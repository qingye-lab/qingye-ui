# 度量 Meter

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/meter
Source: packages/ui/src/components/meter.tsx
Source SHA-256: e6985c24fd6958dd83a961d5648a858508a4c6a39412d355a76205cab3faa544

在已知范围内显示一个静态数值，如存储占用、配额使用率、CPU 负载。表示任务完成进度时用 Progress。

## Use and ownership
- 在已知上下界内读出容量、用量或负载的测量值。
- Avoid: 用 Meter 表示正在完成的任务；只靠条长和颜色说明接近上限；阈值解释与实际数值不一致。
- Library: meter 原语、数值范围、标签和值的关系。
- Application: 测量源、单位、阈值、采样时间与缺测。

## Composition
- Label 命名测量对象，Value 与单位共同说明事实；阈值信息配文字，自定义值同步 getAriaValueText。

## Responsive behavior
- 数值与标签可换行；条本身适应容器，保留必要文字。

## Customization
- min/max/format 定义量纲；主题只调整图形表达，状态规则由应用决定。

## Current exports
- Meter: function; owner meter; PASS; props: MeterPrimitive.Root.Props
- MeterIndicator: function; owner meter; PASS; props: MeterPrimitive.Indicator.Props
- MeterLabel: function; owner meter; PASS; props: MeterPrimitive.Label.Props
- MeterPrimitive: reexport; owner meter; UNVERIFIED
- MeterTrack: function; owner meter; PASS; props: MeterPrimitive.Track.Props
- MeterValue: function; owner meter; PASS; props: MeterPrimitive.Value.Props

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Meter
根元素（role="meter"）。不传子元素时自动渲染轨道与指示条；需要标签或数值时自行组合各部件。
- value: number. 当前数值，必填；超出范围时按 min / max 截断。
- min: number; default 0. 最小值。
- max: number; default 100. 最大值。
- format: Intl.NumberFormatOptions. MeterValue 与 aria-valuetext 的数字格式，如 { style: "unit", unit: "gigabyte" }；不传时显示范围内的百分比。
- locale: Intl.LocalesArgument. 格式化数字使用的语言，默认取运行环境；货币等格式建议显式传 "zh-CN"。
- getAriaValueText: (formattedValue: string, value: number) => string. 自定义读屏朗读的文本。

### MeterLabel
度量名称，自动与 Meter 关联为可访问名称。

### MeterValue
显示当前数值，默认为按 format 格式化后的文本，使用等宽数字。
- children: (formattedValue: string, value: number) => ReactNode. 自定义显示内容，例如 “12.4 GB / 16 GB”。

### MeterTrack
轨道，默认 8px 高；用 className 调整高度或圆角。

### MeterIndicator
指示条，默认主色；用 className 换成状态色或分类色。

## Keyboard

## Source examples
### 基础
Source: apps/docs/src/content/meter/demos/01-basic.tsx
```tsx
import { Meter } from "@qingye/ui/components/meter";

export const meta = { title: "基础", description: "不传子元素时自动渲染轨道与指示条；没有可见标签时提供 aria-label。" };

export default function Demo() {
  return <Meter aria-label="存储用量" className="max-w-sm" value={64} />;
}
```

### 标签与数值
Source: apps/docs/src/content/meter/demos/02-label.tsx
```tsx
import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "@qingye/ui/components/meter";

export const meta = { title: "标签与数值", description: "MeterValue 默认显示数值在范围内的百分比。" };

export default function Demo() {
  return (
    <Meter className="max-w-sm" value={75}>
      <div className="flex items-center justify-between gap-2">
        <MeterLabel>团队席位</MeterLabel>
        <MeterValue />
      </div>
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </Meter>
  );
}
```

### 格式化数值
Source: apps/docs/src/content/meter/demos/03-format.tsx
```tsx
import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "@qingye/ui/components/meter";

export const meta = {
  title: "格式化数值",
  description: "format 接收 Intl.NumberFormat 选项，可显示金额、单位；min / max 可以是任意范围。",
};

export default function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Meter
        format={{ style: "currency", currency: "CNY", maximumFractionDigits: 0 }}
        locale="zh-CN"
        max={5000}
        value={3260}
      >
        <div className="flex items-center justify-between gap-2">
          <MeterLabel>本月广告预算</MeterLabel>
          <MeterValue className="text-muted-foreground">{(formatted) => `${formatted} / ¥5,000`}</MeterValue>
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>
      <Meter format={{ style: "unit", unit: "gigabyte", maximumFractionDigits: 1 }} max={16} value={12.4}>
        <div className="flex items-center justify-between gap-2">
          <MeterLabel>内存</MeterLabel>
          <MeterValue className="text-muted-foreground">{(formatted) => `${formatted} / 16 GB`}</MeterValue>
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>
      <Meter format={{ style: "unit", unit: "celsius" }} max={100} min={30} value={68}>
        <div className="flex items-center justify-between gap-2">
          <MeterLabel>CPU 温度</MeterLabel>
          <MeterValue className="text-muted-foreground" />
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>
    </div>
  );
}
```

### 阈值颜色
Source: apps/docs/src/content/meter/demos/04-thresholds.tsx
```tsx
import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "@qingye/ui/components/meter";

export const meta = {
  title: "阈值颜色",
  description: "根据数值计算指示条颜色：60% 以下正常，85% 以下偏高，其余告警；状态同时写成文字。",
};

const resources = [
  { label: "CPU", value: 42 },
  { label: "内存", value: 78 },
  { label: "磁盘", value: 93 },
];

function level(value: number) {
  if (value < 60) return { status: "正常", indicator: "bg-success", text: "text-muted-foreground" };
  if (value < 85) return { status: "偏高", indicator: "bg-warning", text: "text-warning-foreground" };
  return { status: "接近上限", indicator: "bg-destructive", text: "text-destructive-foreground" };
}

export default function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      {resources.map((resource) => {
        const { status, indicator, text } = level(resource.value);
        return (
          <Meter key={resource.label} value={resource.value}>
            <div className="flex items-center justify-between gap-2">
              <MeterLabel>{resource.label}</MeterLabel>
              <span className="flex items-center gap-2 text-sm">
                <span className={text}>{status}</span>
                <MeterValue />
              </span>
            </div>
            <MeterTrack>
              <MeterIndicator className={indicator} />
            </MeterTrack>
          </Meter>
        );
      })}
    </div>
  );
}
```

### 组合：存储空间
Source: apps/docs/src/content/meter/demos/05-storage.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Card, CardDescription, CardFooter, CardHeader, CardPanel, CardTitle } from "@qingye/ui/components/card";
import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "@qingye/ui/components/meter";

export const meta = { title: "组合：存储空间", description: "总量在上，分类在下；分类用图表色区分，并配文字标签。" };

const categories = [
  { label: "照片", value: 32.1, color: "bg-chart-1" },
  { label: "视频", value: 21.4, color: "bg-chart-2" },
  { label: "文档", value: 9.8, color: "bg-chart-3" },
  { label: "其他", value: 5.1, color: "bg-chart-4" },
];

const gb = { style: "unit", unit: "gigabyte", maximumFractionDigits: 1 } as const;

export default function Demo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>存储空间</CardTitle>
        <CardDescription>团队云盘 · 专业版 100 GB</CardDescription>
      </CardHeader>
      <CardPanel className="flex flex-col gap-6">
        <Meter format={gb} max={100} value={68.4}>
          <div className="flex items-baseline justify-between gap-2">
            <MeterLabel>已使用</MeterLabel>
            <MeterValue className="font-semibold text-lg" />
          </div>
          <MeterTrack className="h-2.5 rounded-full">
            <MeterIndicator className="rounded-full" />
          </MeterTrack>
        </Meter>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {categories.map((category) => (
            <Meter key={category.label} format={gb} max={100} value={category.value}>
              <div className="flex items-center justify-between gap-2">
                <MeterLabel className="flex items-center gap-2 font-normal text-muted-foreground">
                  <span aria-hidden="true" className={`size-2 rounded-full ${category.color}`} />
                  {category.label}
                </MeterLabel>
                <MeterValue />
              </div>
              <MeterTrack className="h-1 rounded-full">
                <MeterIndicator className={category.color} />
              </MeterTrack>
            </Meter>
          ))}
        </div>
      </CardPanel>
      <CardFooter className="justify-between gap-4">
        <span className="text-muted-foreground text-sm">剩余 31.6 GB</span>
        <Button size="sm" variant="outline">升级到 1 TB</Button>
      </CardFooter>
    </Card>
  );
}
```


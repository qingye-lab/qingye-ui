# 环形进度 ProgressCircle

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/progress-circle
Source: packages/ui/src/components/progress-circle.tsx
Source SHA-256: 048f7e59b5cc7aa39444a0b571f6c7aaf3d3dc01561eff7dcd7f80039acec91c

以圆环展示任务完成度或占用率，适合空间紧凑处（卡片角落、列表行）或需要在中心显示数值的场景。

## Use and ownership
- 在紧凑位置表达任务进度，与任务名称和操作邻接。
- Avoid: 环颜色被当作成功结论；只读到无名的百分比；中心内容包含必要操作却放进 progressbar。
- Library: 环几何、不确定弧、progressbar 语义与中心表达。
- Application: 真实进度、任务范围、结果和取消/重试操作。

## Composition
- 外围文本命名任务；value=null 表示未知。自定义中心内容通过 getAriaValueText 同步有意义的状态。

## Responsive behavior
- 小环省略中心数字时，附近仍要能读取进度；大环不为装饰压缩工作面。

## Customization
- size/strokeWidth 按识别需要选择，status 只增强状态表达。

## Current exports
- ProgressCircle: function; owner progress-circle; PASS; props: ProgressCircleProps
- ProgressCircleProps: interface; owner progress-circle; PASS
- ProgressCircleSize: type; owner progress-circle; PASS
- ProgressCircleStatus: type; owner progress-circle; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ProgressCircle
基于 Base UI Progress，输出 role="progressbar" 与 aria-valuenow / valuemin / valuemax / valuetext。
- value: number | null. 当前值；null 为不确定进度，显示旋转的圆弧。
- min / max: number; default 0 / 100. 取值范围。
- size: "xs" | "sm" | "default" | "lg" | "xl"; default "default". 16 / 24 / 40 / 64 / 96px；xs、sm 不显示中心文字。
- strokeWidth: number. 环的粗细（px，按标称尺寸计），默认随尺寸增长但增长得更慢，大环依然轻盈。
- status: "default" | "success" | "warning" | "error" | "info"; default "default". 进度弧的颜色；轨道始终是半透明中性色。
- showValue: boolean; default false. 在中心显示格式化后的百分比。
- children: ReactNode. 自定义中心内容；内容超出百分比时配合 getAriaValueText，因为进度条内部文字不会被读出。
- format / locale / getAriaValueText: Intl.NumberFormatOptions / string / function. 数值格式与读屏文本，见 Base UI Progress。不确定进度时读作「正在加载」。

## Keyboard

## Source examples
### 尺寸
Source: apps/docs/src/content/progress-circle/demos/01-sizes.tsx
```tsx
import { ProgressCircle } from "@qingye/ui/components/progress-circle";

export const meta = { title: "尺寸", description: "环的粗细随尺寸增长但增长得更慢，大环依然轻盈。" };

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <ProgressCircle aria-label="上传进度" size="xs" value={68} />
      <ProgressCircle aria-label="上传进度" size="sm" value={68} />
      <ProgressCircle aria-label="上传进度" showValue value={68} />
      <ProgressCircle aria-label="上传进度" showValue size="lg" value={68} />
      <ProgressCircle aria-label="上传进度" showValue size="xl" value={68} />
    </div>
  );
}
```

### 状态色
Source: apps/docs/src/content/progress-circle/demos/02-status.tsx
```tsx
import { ProgressCircle } from "@qingye/ui/components/progress-circle";

export const meta = { title: "状态色", description: "进度弧取状态色，轨道保持半透明中性。" };

const items = [
  { status: "default", value: 42, label: "默认" },
  { status: "success", value: 100, label: "已完成" },
  { status: "info", value: 64, label: "同步中" },
  { status: "warning", value: 86, label: "容量偏高" },
  { status: "error", value: 97, label: "即将耗尽" },
] as const;

export default function Demo() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      {items.map((item) => (
        <div className="flex w-16 flex-col items-center gap-2" key={item.status}>
          <ProgressCircle aria-label={item.label} showValue size="lg" status={item.status} value={item.value} />
          <span className="text-muted-foreground text-xs">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
```

### 不确定进度与动态更新
Source: apps/docs/src/content/progress-circle/demos/03-states.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { ProgressCircle } from "@qingye/ui/components/progress-circle";
import { useEffect, useState } from "react";

export const meta = { title: "不确定进度与动态更新", description: "value 为 null 时旋转；数值变化时进度弧平滑过渡。" };

export default function Demo() {
  const [value, setValue] = useState(24);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setValue((current) => {
        const next = Math.min(100, current + 9);
        if (next === 100) setRunning(false);
        return next;
      });
    }, 500);
    return () => window.clearInterval(timer);
  }, [running]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      <div className="flex items-center gap-3">
        <ProgressCircle aria-label="正在准备导出" size="sm" value={null} />
        <span className="text-muted-foreground text-sm">正在准备导出…</span>
      </div>
      <div className="flex items-center gap-4">
        <ProgressCircle aria-label="固件升级进度" showValue size="lg" status={value === 100 ? "success" : "default"} value={value} />
        <div className="flex gap-2">
          <Button disabled={running || value === 100} onClick={() => setRunning(true)} size="sm" variant="outline">
            开始升级
          </Button>
          <Button onClick={() => { setRunning(false); setValue(0); }} size="sm" variant="ghost">
            重置
          </Button>
        </div>
      </div>
    </div>
  );
}
```

### 自定义中心内容
Source: apps/docs/src/content/progress-circle/demos/04-custom.tsx
```tsx
import { Card, CardPanel } from "@qingye/ui/components/card";
import { ProgressCircle } from "@qingye/ui/components/progress-circle";

export const meta = {
  title: "自定义中心内容",
  description: "中心放分数等自定义内容时，用 getAriaValueText 让读屏读到同样的信息。",
};

export default function Demo() {
  return (
    <Card className="w-full max-w-sm" size="sm">
      <CardPanel className="flex items-center gap-4">
        <ProgressCircle
          aria-label="本周巡检任务"
          getAriaValueText={() => "已完成 18 项，共 24 项"}
          max={24}
          size="xl"
          strokeWidth={4.5}
          value={18}
        >
          <span className="flex flex-col items-center gap-1">
            <span className="font-semibold text-xl leading-none">18</span>
            <span className="font-normal text-muted-foreground text-xs leading-none">/ 24 项</span>
          </span>
        </ProgressCircle>
        <div className="flex min-w-0 flex-col gap-1">
          <span className="font-medium text-sm">本周巡检任务</span>
          <span className="text-muted-foreground text-sm">还剩 6 项，主要集中在静安店的冷柜与消防设备。</span>
        </div>
      </CardPanel>
    </Card>
  );
}
```


# 进度条 Progress

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/progress
Source: packages/ui/src/components/progress.tsx
Source SHA-256: a1e11abf6582473e15447a385190d4298d007b9836e122a3f7e5203381709f7d

显示一项任务的完成进度，如上传、导出、安装。进度未知时用不确定状态；表示容量、占比等静态度量请用 Meter。

## Use and ownership
- 说明一项任务正在推进，已知总量或结果尚未确定。
- Avoid: 虚构百分比；100% 动画结束宣称服务端成功；失败只换条颜色；刷新抹掉有效结果。
- Library: progressbar 数值与不确定原语、标签和值、轨道。
- Application: 真实任务、计量源、结果、取消确认与重试。

## Composition
- value 来自任务计量，未知用 null；Label 命名任务，完成/失败/取消的文字与动作由应用提供。

## Responsive behavior
- 标签和值保持可读；进度条占可用宽度，不抢内容的工作空间。

## Customization
- format/getAriaValueText 对齐可见计量；状态色增强事实而不取代结果文字。

## Current exports
- Progress: function; owner progress; PASS; props: ProgressPrimitive.Root.Props
- ProgressIndicator: function; owner progress; PASS; props: ProgressPrimitive.Indicator.Props
- ProgressLabel: function; owner progress; PASS; props: ProgressPrimitive.Label.Props
- ProgressPrimitive: reexport; owner progress; UNVERIFIED
- ProgressTrack: function; owner progress; PASS; props: ProgressPrimitive.Track.Props
- ProgressValue: function; owner progress; PASS; props: ProgressPrimitive.Value.Props

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Progress
根元素（role="progressbar"）。不传子元素时自动渲染轨道与指示条；需要标签或数值时自行组合各部件。
- value: number | null. 当前进度；传 null 进入不确定状态，指示条改为循环扫过的光带。
- min: number; default 0. 最小值。
- max: number; default 100. 最大值。
- format: Intl.NumberFormatOptions. ProgressValue 与 aria-valuetext 的数字格式；不传时显示百分比。
- locale: Intl.LocalesArgument. 格式化数字使用的语言，默认取运行环境。
- getAriaValueText: (formattedValue: string, value: number | null) => string. 自定义读屏朗读的进度文本。

### ProgressLabel
任务名称，自动与进度条关联为可访问名称。

### ProgressValue
显示当前进度，默认为格式化后的百分比，使用等宽数字。
- children: (formattedValue: string | null, value: number | null) => ReactNode. 自定义显示内容，例如 “302 / 512 MB”。

### ProgressTrack
轨道，默认 6px 高、全圆角；用 className 调整高度，如 h-1、h-2。

### ProgressIndicator
指示条，默认主色。用 className 换颜色，可结合状态属性 data-complete / data-progressing / data-indeterminate。

## Keyboard

## Source examples
### 基础
Source: apps/docs/src/content/progress/demos/01-basic.tsx
```tsx
import { Progress } from "@qingye/ui/components/progress";

export const meta = { title: "基础", description: "不传子元素时自动渲染轨道与指示条；没有可见标签时提供 aria-label。" };

export default function Demo() {
  return <Progress aria-label="同步进度" className="max-w-sm" value={40} />;
}
```

### 标签与数值
Source: apps/docs/src/content/progress/demos/02-label.tsx
```tsx
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@qingye/ui/components/progress";

export const meta = { title: "标签与数值", description: "标签和数值放在轨道上方的一行，两端对齐。" };

export default function Demo() {
  return (
    <Progress className="max-w-sm" value={64}>
      <div className="flex items-center justify-between gap-2">
        <ProgressLabel>导出订单数据</ProgressLabel>
        <ProgressValue />
      </div>
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </Progress>
  );
}
```

### 自定义数值
Source: apps/docs/src/content/progress/demos/03-format.tsx
```tsx
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@qingye/ui/components/progress";

export const meta = {
  title: "自定义数值",
  description: "ProgressValue 接收一个函数，可以显示已完成量与总量；读屏文本用 getAriaValueText 同步。",
};

export default function Demo() {
  return (
    <Progress
      className="max-w-sm"
      getAriaValueText={(_, value) => `已上传 ${value} MB，共 512 MB`}
      max={512}
      value={302}
    >
      <div className="flex items-center justify-between gap-2">
        <ProgressLabel>上传安装包</ProgressLabel>
        <ProgressValue className="text-muted-foreground">{(_, value) => `${value} / 512 MB`}</ProgressValue>
      </div>
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </Progress>
  );
}
```

### 不确定进度
Source: apps/docs/src/content/progress/demos/04-indeterminate.tsx
```tsx
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack } from "@qingye/ui/components/progress";

export const meta = {
  title: "不确定进度",
  description: "value={null} 时一道光带循环扫过轨道，适合还算不出总量的阶段。",
};

export default function Demo() {
  return (
    <Progress className="max-w-sm" value={null}>
      <div className="flex items-center justify-between gap-2">
        <ProgressLabel>正在准备备份</ProgressLabel>
        <span className="text-muted-foreground text-sm">计算文件数量…</span>
      </div>
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </Progress>
  );
}
```

### 颜色与粗细
Source: apps/docs/src/content/progress/demos/05-colors.tsx
```tsx
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@qingye/ui/components/progress";
import { CircleAlertIcon, CircleCheckIcon } from "lucide-react";

export const meta = {
  title: "颜色与粗细",
  description: "用 className 修改指示条颜色和轨道高度；结果同时用文字或图标说明。",
};

export default function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Progress value={100}>
        <div className="flex items-center justify-between gap-2">
          <ProgressLabel>数据库备份</ProgressLabel>
          <span className="flex items-center gap-1 text-sm text-success-foreground">
            <CircleCheckIcon aria-hidden="true" className="size-4" />
            已完成
          </span>
        </div>
        <ProgressTrack>
          <ProgressIndicator className="bg-success" />
        </ProgressTrack>
      </Progress>
      <Progress value={64}>
        <div className="flex items-center justify-between gap-2">
          <ProgressLabel>同步商品库存</ProgressLabel>
          <span className="flex items-center gap-1 text-destructive-foreground text-sm">
            <CircleAlertIcon aria-hidden="true" className="size-4" />
            在 64% 处中断
          </span>
        </div>
        <ProgressTrack>
          <ProgressIndicator className="bg-destructive" />
        </ProgressTrack>
      </Progress>
      <Progress value={30}>
        <div className="flex items-center justify-between gap-2">
          <ProgressLabel>索引重建</ProgressLabel>
          <ProgressValue className="text-muted-foreground" />
        </div>
        <ProgressTrack className="h-1">
          <ProgressIndicator />
        </ProgressTrack>
      </Progress>
    </div>
  );
}
```

### 组合：上传列表
Source: apps/docs/src/content/progress/demos/06-uploads.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@qingye/ui/components/progress";
import { CircleCheckIcon, FileArchiveIcon, FileImageIcon, FileTextIcon, RotateCwIcon } from "lucide-react";

export const meta = { title: "组合：上传列表", description: "每个文件一条进度；完成和失败的文件换成状态说明与操作。" };

export default function Demo() {
  return (
    <ul className="w-full max-w-md divide-y rounded-xl border">
      <li className="flex items-center gap-3 p-3">
        <FileImageIcon aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
        <Progress className="min-w-0 flex-1 gap-1.5" value={72}>
          <div className="flex items-center justify-between gap-2">
            <ProgressLabel className="truncate">门店实拍-徐汇店.jpg</ProgressLabel>
            <ProgressValue className="text-muted-foreground text-xs" />
          </div>
          <ProgressTrack className="h-1">
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
      </li>
      <li className="flex items-center gap-3 p-3">
        <FileArchiveIcon aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
        <Progress className="min-w-0 flex-1 gap-1.5" max={86} value={15}>
          <div className="flex items-center justify-between gap-2">
            <ProgressLabel className="truncate">2026年9月订单导出.zip</ProgressLabel>
            <ProgressValue className="text-muted-foreground text-xs">
              {(_, value) => `${value} / 86 MB`}
            </ProgressValue>
          </div>
          <ProgressTrack className="h-1">
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
      </li>
      <li className="flex items-center gap-3 p-3">
        <FileTextIcon aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate font-medium text-sm">供应商合同-云杉科技.pdf</span>
          <span className="flex items-center gap-1 text-success-foreground text-xs">
            <CircleCheckIcon aria-hidden="true" className="size-3.5" />
            已上传 · 2.4 MB
          </span>
        </div>
      </li>
      <li className="flex items-center gap-3 p-3">
        <FileImageIcon aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate font-medium text-sm">新品海报-秋季.png</span>
          <span className="text-destructive-foreground text-xs">上传失败：文件超过 20 MB</span>
        </div>
        <Button size="icon-sm" variant="ghost" aria-label="重试上传 新品海报-秋季.png">
          <RotateCwIcon aria-hidden="true" />
        </Button>
      </li>
    </ul>
  );
}
```

### 动态更新
Source: apps/docs/src/content/progress/demos/07-live.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@qingye/ui/components/progress";
import { useEffect, useState } from "react";

export const meta = { title: "动态更新", description: "value 变化时指示条平滑过渡，完成后切换为成功色。" };

export default function Demo() {
  const [value, setValue] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || value >= 100) return;
    const timer = setTimeout(() => setValue((current) => Math.min(100, current + 12)), 400);
    return () => clearTimeout(timer);
  }, [running, value]);

  const done = value >= 100;

  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-4">
      <Progress className="w-full" value={value}>
        <div className="flex items-center justify-between gap-2">
          <ProgressLabel>{done ? "部署完成" : running ? "正在部署到生产环境" : "等待部署"}</ProgressLabel>
          <ProgressValue className="text-muted-foreground" />
        </div>
        <ProgressTrack>
          <ProgressIndicator className="data-complete:bg-success" />
        </ProgressTrack>
      </Progress>
      {done ? (
        <Button size="sm" variant="outline" onClick={() => setValue(0)}>
          重新部署
        </Button>
      ) : (
        <Button size="sm" variant="outline" onClick={() => setRunning(!running)}>
          {running ? "暂停" : value > 0 ? "继续" : "开始部署"}
        </Button>
      )}
    </div>
  );
}
```


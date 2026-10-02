# 框架 Frame

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/frame
Source: packages/ui/src/components/frame.tsx
Source SHA-256: ea208e6bcbf223433ded27a79bf1002432cc72ee21cf4ab3a11c662a163a4f3e

浅底外框里放一块或多块白色面板，把同一主题的信息归为一组，如账单概览、域名或构建设置。比 Card 更适合“一个标题 + 若干并列区块”的结构。

## Use and ownership
- 多个相关面板需要共同外框，同时保留各自的内容工作面。
- Avoid: Frame 与 Card 无限套娃；仅为视觉留白分割同一任务；页内标题区被误解为全站 banner。
- Library: 外框、内面板与部位间距。
- Application: 面板归属、标题语义、操作范围与工作状态。

## Composition
- Header/Title/Description 对应整组范围，Panel 对应具体工作面；Footer 放作用于整组的事实或操作。

## Responsive behavior
- 长内容留在各自面板中；窄屏先改布局，不为装下外框牺牲控件容量。

## Customization
- 外观在项目主题集中定义；需要真实语义元素时用原生结构围住 Frame，避免错误 landmark。

## Current exports
- Frame: function; owner frame; PASS; props: React.ComponentProps<"div">
- FrameDescription: function; owner frame; PASS; props: React.ComponentProps<"div">
- FrameFooter: function; owner frame; PASS; props: React.ComponentProps<"footer">
- FrameHeader: function; owner frame; PASS; props: React.ComponentProps<"header">
- FramePanel: function; owner frame; PASS; props: React.ComponentProps<"div">
- FrameTitle: function; owner frame; PASS; props: React.ComponentProps<"div">

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Frame
根元素：浅底（muted/72）、2xl 圆角、4px 内边距；相邻的 FramePanel 之间自动留 4px 间隔。透传所有 <div> 属性。

### FrameHeader
外框顶部的标题区（<header>），落在浅底上，纵向排列标题与说明。

### FrameTitle
标题，14px / 600。

### FrameDescription
标题下方的说明文字。

### FramePanel
白色面板，xl 圆角、半透明边框与一线内高光，默认 20px 内边距。可以连续放多块。

### FrameFooter
外框底部（<footer>），落在浅底上，放汇总、提示或次要操作。

## Keyboard

## Source examples
### 基础
Source: apps/docs/src/content/frame/demos/01-basic.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";
import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle } from "@qingye/ui/components/frame";

export const meta = { title: "基础", description: "标题与提示落在浅底上，主要内容放进白色面板。" };

export default function Demo() {
  return (
    <Frame className="w-full max-w-lg">
      <FrameHeader>
        <FrameTitle>自定义域名</FrameTitle>
        <FrameDescription>绑定后可以用自己的域名访问项目。</FrameDescription>
      </FrameHeader>
      <FramePanel className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-4">
          <span className="truncate font-medium text-sm">shop.qingye.example</span>
          <Badge variant="success">已生效</Badge>
        </div>
        <span className="text-muted-foreground text-xs">SSL 证书将于 2027年1月12日自动续期</span>
      </FramePanel>
      <FrameFooter className="text-muted-foreground text-sm">DNS 记录变更最长需要 48 小时生效。</FrameFooter>
    </Frame>
  );
}
```

### 多个面板
Source: apps/docs/src/content/frame/demos/02-panels.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";
import { Button } from "@qingye/ui/components/button";
import { Frame, FrameDescription, FrameHeader, FramePanel, FrameTitle } from "@qingye/ui/components/frame";
import { ExternalLinkIcon } from "lucide-react";

export const meta = { title: "多个面板", description: "相邻面板之间自动留出 4px，露出外框的浅底作为分隔。" };

const environments = [
  { name: "生产环境", branch: "main", deployed: "2 分钟前", status: "运行中", tone: "bg-success" },
  { name: "预发环境", branch: "release/2.5", deployed: "今天 09:12", status: "运行中", tone: "bg-success" },
  { name: "开发环境", branch: "feat/coupon", deployed: "构建中", status: "部署中", tone: "bg-info" },
];

export default function Demo() {
  return (
    <Frame className="w-full max-w-lg">
      <FrameHeader>
        <FrameTitle>环境</FrameTitle>
        <FrameDescription>每个环境对应一个分支，推送即部署。</FrameDescription>
      </FrameHeader>
      {environments.map((env) => (
        <FramePanel key={env.name} className="flex items-center gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{env.name}</span>
              <Badge variant="outline">
                <span aria-hidden="true" className={`size-1.5 rounded-full ${env.tone}`} />
                {env.status}
              </Badge>
            </div>
            <span className="truncate text-muted-foreground text-xs">
              <span className="font-mono">{env.branch}</span> · {env.deployed}
            </span>
          </div>
          <Button size="sm" variant="outline">
            访问
            <ExternalLinkIcon aria-hidden="true" />
          </Button>
        </FramePanel>
      ))}
    </Frame>
  );
}
```

### 组合：账单概览
Source: apps/docs/src/content/frame/demos/03-billing.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";
import { Button } from "@qingye/ui/components/button";
import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle } from "@qingye/ui/components/frame";
import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "@qingye/ui/components/meter";

export const meta = { title: "组合：账单概览", description: "套餐、用量与扣款信息分成三层：面板放主要内容，底部放次要信息。" };

const usage = [
  { label: "带宽", value: 318, max: 500, unit: "GB" },
  { label: "构建时长", value: 1240, max: 3000, unit: "分钟" },
  { label: "函数调用", value: 86, max: 100, unit: "万次" },
];

export default function Demo() {
  return (
    <Frame className="w-full max-w-lg">
      <FrameHeader className="flex-row items-center justify-between gap-4">
        <div className="flex flex-col">
          <FrameTitle>本期账单</FrameTitle>
          <FrameDescription>9月1日 – 9月30日</FrameDescription>
        </div>
        <Button size="sm" variant="outline">更改套餐</Button>
      </FrameHeader>
      <FramePanel className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">专业版</span>
            <Badge variant="secondary">年付</Badge>
          </div>
          <span className="font-semibold text-2xl numeric">
            ¥299<span className="font-normal text-muted-foreground text-sm"> / 月</span>
          </span>
        </div>
        <span className="text-muted-foreground text-xs">5 个席位</span>
      </FramePanel>
      <FramePanel className="flex flex-col gap-4">
        {usage.map((item) => (
          <Meter key={item.label} max={item.max} value={item.value}>
            <div className="flex items-center justify-between gap-2">
              <MeterLabel>{item.label}</MeterLabel>
              <MeterValue className="text-muted-foreground">
                {(_, value) => `${value.toLocaleString("zh-CN")} / ${item.max.toLocaleString("zh-CN")} ${item.unit}`}
              </MeterValue>
            </div>
            <MeterTrack className="h-1.5 rounded-full">
              <MeterIndicator />
            </MeterTrack>
          </Meter>
        ))}
      </FramePanel>
      <FrameFooter className="flex items-center justify-between gap-4 text-sm">
        <span className="text-muted-foreground">
          <span className="numeric">10月1日</span>扣款 · 尾号 <span className="numeric">4821</span>
        </span>
        <Button size="sm" variant="link" className="px-0">查看发票</Button>
      </FrameFooter>
    </Frame>
  );
}
```

### 组合：构建设置
Source: apps/docs/src/content/frame/demos/04-settings.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "@qingye/ui/components/field";
import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle } from "@qingye/ui/components/frame";
import { Input } from "@qingye/ui/components/input";
import { Switch } from "@qingye/ui/components/switch";

export const meta = { title: "组合：构建设置", description: "表单放在面板里，保存操作放在外框底部。" };

export default function Demo() {
  return (
    <Frame className="w-full max-w-lg">
      <FrameHeader>
        <FrameTitle>构建与部署</FrameTitle>
        <FrameDescription>修改后从下一次推送开始生效。</FrameDescription>
      </FrameHeader>
      <FramePanel>
        <FieldGroup>
          <Field>
            <FieldLabel>构建命令</FieldLabel>
            <Input className="font-mono" defaultValue="pnpm build" />
          </Field>
          <Field>
            <FieldLabel>输出目录</FieldLabel>
            <Input className="font-mono" defaultValue="dist" />
          </Field>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel>自动部署</FieldLabel>
              <FieldDescription>推送到 main 后自动发布上线。</FieldDescription>
            </FieldContent>
            <Switch defaultChecked />
          </Field>
        </FieldGroup>
      </FramePanel>
      <FrameFooter className="flex justify-end gap-2">
        <Button variant="ghost">取消</Button>
        <Button>保存</Button>
      </FrameFooter>
    </Frame>
  );
}
```


# 描述列表 DescriptionList

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/description-list
Source: packages/ui/src/components/description-list.tsx
Source SHA-256: 6d867ade3d6a3ce26a166dda3e5bd8bf2b6c3da46569b3f95fde92bf792fdf7c

以「名称—值」成对展示一个对象的详情，如订单信息、设备参数、账号资料。渲染为语义化的 <dl>。

## Use and ownership
- 一个对象的名称和值成对出现，读者需要辨认属性关系。
- Avoid: 把零、未填写、不适用和未知都写成破折号；多对象比较拆成互不对齐的详情列。
- Library: dl/dt/dd 语义、成对布局、部位与复制组合。
- Application: 属性事实、空值含义、单位和复制原文。

## Composition
- 每个 Item 包含 Term 与 Details；复制值使用原文本并明确对象，说明和链接仍属于该值。

## Responsive behavior
- 长标识符需能断行；horizontal 留名称列，过窄时在项目组合切到 vertical 或 grid。

## Customization
- layout/--description-list-term/--description-list-column 调整关系；多个对象横向比较使用 Table。

## Current exports
- DescriptionDetails: function; owner description-list; PASS; props: DescriptionDetailsProps
- DescriptionDetailsProps: interface; owner description-list; PASS
- DescriptionList: function; owner description-list; PASS; props: DescriptionListProps
- DescriptionListItem: function; owner description-list; PASS; props: useRender.ComponentProps<"div">
- DescriptionListLayout: type; owner description-list; PASS
- DescriptionListProps: interface; owner description-list; PASS
- DescriptionTerm: function; owner description-list; PASS; props: useRender.ComponentProps<"dt">

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### DescriptionList
<dl> 容器。
- layout: "horizontal" | "vertical" | "grid"; default "horizontal". horizontal：名称在左侧固定列；vertical：名称在值的上方；grid：上下结构按容器宽度自动分列。
- divided: boolean; default false. 在条目之间加发丝线。

### DescriptionListItem
一组名称与值，渲染为 <div>（<dl> 允许的分组元素）。

### DescriptionTerm
<dt>，弱化色，可带图标。

### DescriptionDetails
<dd>，长文本自动断行。
- copyValue: string. 设置后在值后显示复制按钮（复用 CopyButton），复制这里给出的原文。
- copyLabel: string; default locale.copy. 复制按钮的可访问名称，建议写明复制的对象，如「复制订单号」。

## Keyboard

## Source examples
### 水平布局
Source: apps/docs/src/content/description-list/demos/01-horizontal.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";
import { DescriptionDetails, DescriptionList, DescriptionListItem, DescriptionTerm } from "@qingye/ui/components/description-list";

export const meta = { title: "水平布局", description: "名称在左侧固定列，适合详情页和抽屉。" };

export default function Demo() {
  return (
    <DescriptionList className="w-full max-w-lg">
      <DescriptionListItem>
        <DescriptionTerm>订单号</DescriptionTerm>
        <DescriptionDetails className="font-mono" copyLabel="复制订单号" copyValue="SO-20260930-004817">
          SO-20260930-004817
        </DescriptionDetails>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionTerm>订单状态</DescriptionTerm>
        <DescriptionDetails>
          <Badge variant="success">已支付</Badge>
        </DescriptionDetails>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionTerm>下单时间</DescriptionTerm>
        <DescriptionDetails className="numeric">2026-09-30 14:26:08</DescriptionDetails>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionTerm>实付金额</DescriptionTerm>
        <DescriptionDetails className="numeric">¥ 1,286.00</DescriptionDetails>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionTerm>收货地址</DescriptionTerm>
        <DescriptionDetails>上海市徐汇区漕溪北路 398 号汇智大厦 12 层 1203 室（工作日 9:00–18:00 可收货）</DescriptionDetails>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionTerm>备注</DescriptionTerm>
        <DescriptionDetails className="text-muted-foreground">—</DescriptionDetails>
      </DescriptionListItem>
    </DescriptionList>
  );
}
```

### 分隔线与图标
Source: apps/docs/src/content/description-list/demos/02-divided.tsx
```tsx
import { Card, CardDescription, CardHeader, CardPanel, CardTitle } from "@qingye/ui/components/card";
import { DescriptionDetails, DescriptionList, DescriptionListItem, DescriptionTerm } from "@qingye/ui/components/description-list";
import { StatusDot } from "@qingye/ui/components/status-dot";
import { CpuIcon, MapPinIcon, RadioTowerIcon, TimerIcon } from "lucide-react";

export const meta = { title: "分隔线与图标", description: "divided 在条目间加发丝线；名称可带图标。" };

export default function Demo() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>设备信息</CardTitle>
        <CardDescription>前台收银机 · 徐汇店</CardDescription>
      </CardHeader>
      <CardPanel>
        <DescriptionList divided>
          <DescriptionListItem>
            <DescriptionTerm>
              <RadioTowerIcon aria-hidden="true" />
              连接状态
            </DescriptionTerm>
            <DescriptionDetails>
              <StatusDot pulse status="online">
                在线
              </StatusDot>
            </DescriptionDetails>
          </DescriptionListItem>
          <DescriptionListItem>
            <DescriptionTerm>
              <CpuIcon aria-hidden="true" />
              设备序列号
            </DescriptionTerm>
            <DescriptionDetails className="font-mono" copyLabel="复制设备序列号" copyValue="T2S-8F3A-21C7-0049">
              T2S-8F3A-21C7-0049
            </DescriptionDetails>
          </DescriptionListItem>
          <DescriptionListItem>
            <DescriptionTerm>
              <MapPinIcon aria-hidden="true" />
              安装位置
            </DescriptionTerm>
            <DescriptionDetails>一楼前台 2 号收银台</DescriptionDetails>
          </DescriptionListItem>
          <DescriptionListItem>
            <DescriptionTerm>
              <TimerIcon aria-hidden="true" />
              持续在线
            </DescriptionTerm>
            <DescriptionDetails className="numeric">18 天 6 小时</DescriptionDetails>
          </DescriptionListItem>
        </DescriptionList>
      </CardPanel>
    </Card>
  );
}
```

### 垂直布局
Source: apps/docs/src/content/description-list/demos/03-vertical.tsx
```tsx
import { DescriptionDetails, DescriptionList, DescriptionListItem, DescriptionTerm } from "@qingye/ui/components/description-list";

export const meta = { title: "垂直布局", description: "名称在值的上方，适合窄栏或值较长的情形。" };

export default function Demo() {
  return (
    <DescriptionList className="w-full max-w-sm" divided layout="vertical">
      <DescriptionListItem>
        <DescriptionTerm>API 访问地址</DescriptionTerm>
        <DescriptionDetails className="break-all font-mono text-[0.8125rem]" copyLabel="复制 API 访问地址" copyValue="https://api.qingye.example/v2/stores/xh-001/devices">
          https://api.qingye.example/v2/stores/xh-001/devices
        </DescriptionDetails>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionTerm>回调说明</DescriptionTerm>
        <DescriptionDetails>
          设备状态变化时向该地址推送事件，5 秒内未返回 200 会按 1、5、30 分钟重试三次，仍失败则记入告警。
        </DescriptionDetails>
      </DescriptionListItem>
    </DescriptionList>
  );
}
```

### 网格布局
Source: apps/docs/src/content/description-list/demos/04-grid.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";
import { DescriptionDetails, DescriptionList, DescriptionListItem, DescriptionTerm } from "@qingye/ui/components/description-list";

export const meta = { title: "网格布局", description: "按容器宽度自动分列；窄屏单列，宽屏三到四列。可与 divided 同用。" };

const fields = [
  { term: "门店名称", value: "徐汇漕溪北路店" },
  { term: "门店编号", value: "XH-001", mono: true },
  { term: "负责人", value: "林嘉怡" },
  { term: "联系电话", value: "138 1652 0937", numeric: true },
  { term: "营业时间", value: "10:00–22:00", numeric: true },
  { term: "开业日期", value: "2023-04-18", numeric: true },
];

export default function Demo() {
  return (
    <div className="flex w-full flex-col gap-10">
      <DescriptionList layout="grid">
        {fields.map((field) => (
          <DescriptionListItem key={field.term}>
            <DescriptionTerm>{field.term}</DescriptionTerm>
            <DescriptionDetails className={field.mono ? "font-mono" : field.numeric ? "numeric" : undefined}>
              {field.value}
            </DescriptionDetails>
          </DescriptionListItem>
        ))}
        <DescriptionListItem>
          <DescriptionTerm>门店标签</DescriptionTerm>
          <DescriptionDetails className="flex flex-wrap gap-1.5">
            <Badge variant="outline">直营</Badge>
            <Badge variant="outline">24 小时外卖</Badge>
            <Badge variant="info">新品试点</Badge>
          </DescriptionDetails>
        </DescriptionListItem>
      </DescriptionList>
      <DescriptionList divided layout="grid">
        {fields.slice(0, 4).map((field) => (
          <DescriptionListItem key={field.term}>
            <DescriptionTerm>{field.term}</DescriptionTerm>
            <DescriptionDetails className={field.mono ? "font-mono" : field.numeric ? "numeric" : undefined}>
              {field.value}
            </DescriptionDetails>
          </DescriptionListItem>
        ))}
      </DescriptionList>
    </div>
  );
}
```


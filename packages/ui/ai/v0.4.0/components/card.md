# 卡片 Card

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/card
Source: packages/ui/src/components/card.tsx
Source SHA-256: daa6147f4df7eed4c784fb5be90b6d4e1a79d789483ea258aaf8d26029c11879

把一组相关的内容和操作收进一个带边框的表面，例如设置项、统计指标或表单。CardFrame 在外层再包一圈浅底外框，用来收纳多张卡片或卡片样式的表格。

## Use and ownership
- 一个对象或任务需要独立边界，并且标题、内容与动作属于同一范围。
- Avoid: 每段正文套卡片；整卡链接里嵌套按钮；把 CardTitle 的视觉大小当作标题语义。
- Library: 表面、部位关系、尺寸角色与 render。
- Application: 对象范围、标题级别、动作权限、草稿与异步结果。

## Composition
- 按需组合 Header/Panel/Footer；CardTitle render 为真实标题。整卡导航与卡内独立动作分别设计。

## Responsive behavior
- 长标题和动作共同占位时允许动作换行；卡片内部表格保留二维比较。

## Customization
- size 控制内容密度；表面来自集中主题，CardFrame 只用于需要共同外框的一组对象。

## Current exports
- Card: function; owner card; PASS; props: CardProps
- CardAction: function; owner card; PASS; props: useRender.ComponentProps<"div">
- CardContent: function; owner card; alias of CardPanel; PASS; props: useRender.ComponentProps<"div">
- CardDescription: function; owner card; PASS; props: useRender.ComponentProps<"div">
- CardFooter: function; owner card; PASS; props: useRender.ComponentProps<"div">
- CardFrame: function; owner card; PASS; props: useRender.ComponentProps<"div">
- CardFrameAction: function; owner card; PASS; props: useRender.ComponentProps<"div">
- CardFrameDescription: function; owner card; PASS; props: useRender.ComponentProps<"div">
- CardFrameFooter: function; owner card; PASS; props: useRender.ComponentProps<"div">
- CardFrameHeader: function; owner card; PASS; props: useRender.ComponentProps<"div">
- CardFrameTitle: function; owner card; PASS; props: useRender.ComponentProps<"div">
- CardHeader: function; owner card; PASS; props: useRender.ComponentProps<"div">
- CardPanel: function; owner card; PASS; props: useRender.ComponentProps<"div">
- CardProps: interface; owner card; PASS
- CardTitle: function; owner card; PASS; props: useRender.ComponentProps<"div">

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Card
根元素，圆角 2xl、半透明边框与一线内高光。内边距由 --card-spacing 控制，移动端自动收紧。
- size: "default" | "sm"; default "default". sm 收紧内边距与区块间距，适合仪表盘和侧栏。
- render: ReactElement | (props) => ReactElement. 替换渲染元素，例如 <section> 或 <a>。

### CardHeader
标题区。包含 CardAction 时自动变成两列，操作贴右上角。加 className="border-b" 得到带分隔线的头部。

### CardTitle
标题，字重 600。

### CardDescription
标题下方的辅助说明，弱化颜色。

### CardAction
放在 CardHeader 内的操作区，跨标题与说明两行，靠右对齐。

### CardPanel
主体内容。紧跟无分隔线的头部或底部时自动去掉相邻一侧的内边距；别名 CardContent。

### CardFooter
底部操作区，横向排列。加 className="border-t" 得到带分隔线的底部。

### CardFrame
浅底外框，可容纳 CardFrameHeader、多张 Card 或 <Table variant="card">，内部卡片会去掉阴影并贴合外框圆角。
- render: ReactElement | (props) => ReactElement. 替换渲染元素。

### CardFrameHeader
外框的标题区，包含 CardFrameAction 时自动两列。

### CardFrameTitle
外框标题。

### CardFrameDescription
外框说明文字。

### CardFrameAction
外框标题区右侧的操作。

### CardFrameFooter
外框底部，通常放汇总或次要说明。

## Keyboard

## Source examples
### 基础
Source: apps/docs/src/content/card/demos/01-basic.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Card, CardDescription, CardFooter, CardHeader, CardPanel, CardTitle } from "@qingye/ui/components/card";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "基础", description: "标题、内容与底部操作。" };

export default function Demo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>创建项目</CardTitle>
        <CardDescription>新项目默认部署到华东 1 区，可随时在设置中更改。</CardDescription>
      </CardHeader>
      <CardPanel>
        <Field>
          <FieldLabel>项目名称</FieldLabel>
          <Input placeholder="例如：会员中心" />
        </Field>
      </CardPanel>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost">取消</Button>
        <Button>创建</Button>
      </CardFooter>
    </Card>
  );
}
```

### 头部操作
Source: apps/docs/src/content/card/demos/02-action.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Card, CardAction, CardDescription, CardHeader, CardPanel, CardTitle } from "@qingye/ui/components/card";
import { Menu, MenuItem, MenuPopup, MenuSeparator, MenuTrigger } from "@qingye/ui/components/menu";
import { EllipsisIcon } from "lucide-react";

export const meta = { title: "头部操作", description: "CardAction 跨标题与说明两行，固定在右上角。" };

export default function Demo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>生产环境</CardTitle>
        <CardDescription>main 分支 · 2 分钟前部署</CardDescription>
        <CardAction>
          <Menu>
            <MenuTrigger render={<Button size="icon-sm" variant="ghost" aria-label="更多操作" />}>
              <EllipsisIcon aria-hidden="true" />
            </MenuTrigger>
            <MenuPopup align="end">
              <MenuItem>重新部署</MenuItem>
              <MenuItem>查看构建日志</MenuItem>
              <MenuSeparator />
              <MenuItem variant="destructive">回滚到上一版本</MenuItem>
            </MenuPopup>
          </Menu>
        </CardAction>
      </CardHeader>
      <CardPanel>
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
          <dt className="text-muted-foreground">域名</dt>
          <dd className="truncate">shop.qingye.example</dd>
          <dt className="text-muted-foreground">区域</dt>
          <dd>华东 1（杭州）</dd>
          <dt className="text-muted-foreground">构建耗时</dt>
          <dd className="numeric">48 秒</dd>
        </dl>
      </CardPanel>
    </Card>
  );
}
```

### 分隔区块
Source: apps/docs/src/content/card/demos/03-divided.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Card, CardDescription, CardFooter, CardHeader, CardPanel, CardTitle } from "@qingye/ui/components/card";
import { Input } from "@qingye/ui/components/input";

export const meta = {
  title: "分隔区块",
  description: "头部加 border-b、底部加 border-t 后，CardPanel 自动恢复上下内边距；底部用 py-4 收成一条紧凑的操作栏。",
};

export default function Demo() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="border-b">
        <CardTitle>项目名称</CardTitle>
        <CardDescription>显示在控制台、通知邮件和访问链接中。</CardDescription>
      </CardHeader>
      <CardPanel>
        <Input aria-label="项目名称" defaultValue="会员中心" />
      </CardPanel>
      <CardFooter className="justify-between gap-4 border-t py-4">
        <span className="text-muted-foreground text-sm">最多 32 个字符。</span>
        <Button size="sm">保存</Button>
      </CardFooter>
    </Card>
  );
}
```

### 紧凑尺寸
Source: apps/docs/src/content/card/demos/04-size.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Card, CardDescription, CardFooter, CardHeader, CardPanel, CardTitle } from "@qingye/ui/components/card";

export const meta = { title: "紧凑尺寸", description: "size=\"sm\" 把内边距从 24px 收到 16px，区块间距从 16px 收到 12px。" };

export default function Demo() {
  return (
    <>
      <Card className="w-full max-w-64">
        <CardHeader>
          <CardTitle>每周报告</CardTitle>
          <CardDescription>每周一 09:00 发送</CardDescription>
        </CardHeader>
        <CardPanel className="text-sm">上周访问 12,840 次</CardPanel>
        <CardFooter>
          <Button size="sm" variant="outline">预览报告</Button>
        </CardFooter>
      </Card>
      <Card className="w-full max-w-64" size="sm">
        <CardHeader>
          <CardTitle>每周报告</CardTitle>
          <CardDescription>每周一 09:00 发送</CardDescription>
        </CardHeader>
        <CardPanel className="text-sm">上周访问 12,840 次</CardPanel>
        <CardFooter>
          <Button size="sm" variant="outline">预览报告</Button>
        </CardFooter>
      </Card>
    </>
  );
}
```

### 统计卡片
Source: apps/docs/src/content/card/demos/05-stats.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";
import { Card, CardAction, CardDescription, CardHeader, CardPanel } from "@qingye/ui/components/card";
import { TrendingUpIcon } from "lucide-react";

export const meta = {
  title: "统计卡片",
  description: "指标数字加 numeric，并排时位数对齐；涨跌的好坏用颜色区分，方向用图标表示。",
};

const stats = [
  { label: "本月收入", value: "¥128,430", change: "12.5%", previous: "上月 ¥114,150", good: true },
  { label: "新增客户", value: "342", change: "8.1%", previous: "上月 316 位", good: true },
  { label: "退款率", value: "1.8%", change: "0.4%", previous: "上月 1.4%", good: false },
];

export default function Demo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label} size="sm">
          <CardHeader>
            <CardDescription>{stat.label}</CardDescription>
            <CardAction>
              <Badge variant={stat.good ? "success" : "error"} className="numeric">
                <TrendingUpIcon aria-hidden="true" />
                {stat.change}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardPanel className="flex flex-col gap-1">
            <span className="font-semibold text-2xl numeric">{stat.value}</span>
            <span className="text-muted-foreground text-xs">{stat.previous}</span>
          </CardPanel>
        </Card>
      ))}
    </div>
  );
}
```

### 设置卡片
Source: apps/docs/src/content/card/demos/06-settings.tsx
```tsx
import { Card, CardDescription, CardHeader, CardPanel, CardTitle } from "@qingye/ui/components/card";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { Switch } from "@qingye/ui/components/switch";

export const meta = { title: "设置卡片", description: "Field 横向排列标签与开关，点击标签也能切换。" };

export default function Demo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>邮件通知</CardTitle>
        <CardDescription>选择哪些事件需要发送到 linxiaowen@qingye.example。</CardDescription>
      </CardHeader>
      <CardPanel className="flex flex-col gap-5">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel>部署失败</FieldLabel>
            <FieldDescription>构建或上线出错时立即通知。</FieldDescription>
          </FieldContent>
          <Switch defaultChecked />
        </Field>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel>新成员加入</FieldLabel>
            <FieldDescription>有人接受邀请加入团队时通知。</FieldDescription>
          </FieldContent>
          <Switch defaultChecked />
        </Field>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel>每周用量报告</FieldLabel>
            <FieldDescription>每周一汇总上周的带宽、构建分钟数与费用。</FieldDescription>
          </FieldContent>
          <Switch />
        </Field>
      </CardPanel>
    </Card>
  );
}
```

### 卡片框架：表格
Source: apps/docs/src/content/card/demos/07-frame-table.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";
import { Button } from "@qingye/ui/components/button";
import { CardFrame, CardFrameAction, CardFrameDescription, CardFrameFooter, CardFrameHeader, CardFrameTitle } from "@qingye/ui/components/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";
import { DownloadIcon } from "lucide-react";

export const meta = {
  title: "卡片框架：表格",
  description: "CardFrame 包住 <Table variant=\"card\">，表头落在外框的浅底上，表体成为一张卡片。",
};

const invoices = [
  { id: "INV-2026-0918", date: "9月18日", status: "已支付", amount: "¥2,990.00" },
  { id: "INV-2026-0904", date: "9月4日", status: "已支付", amount: "¥1,280.00" },
  { id: "INV-2026-0827", date: "8月27日", status: "待支付", amount: "¥640.00" },
  { id: "INV-2026-0812", date: "8月12日", status: "已逾期", amount: "¥3,200.00" },
];

const dot: Record<string, string> = {
  已支付: "bg-success",
  待支付: "bg-warning",
  已逾期: "bg-destructive",
};

export default function Demo() {
  return (
    <CardFrame className="w-full">
      <CardFrameHeader>
        <CardFrameTitle>发票</CardFrameTitle>
        <CardFrameDescription>最近 30 天开具的发票</CardFrameDescription>
        <CardFrameAction>
          <Button size="sm" variant="outline">
            <DownloadIcon aria-hidden="true" />
            导出
          </Button>
        </CardFrameAction>
      </CardFrameHeader>
      <Table variant="card">
        <TableHeader>
          <TableRow>
            <TableHead>发票号</TableHead>
            <TableHead>状态</TableHead>
            <TableHead className="text-end">金额</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>
                <div className="font-medium numeric">{invoice.id}</div>
                <div className="mt-1 text-muted-foreground text-xs">{invoice.date}</div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  <span aria-hidden="true" className={`size-1.5 rounded-full ${dot[invoice.status]}`} />
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell className="text-end numeric">{invoice.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CardFrameFooter className="text-muted-foreground text-sm">共 12 张发票，显示最近 4 张。</CardFrameFooter>
    </CardFrame>
  );
}
```

### 卡片框架：卡片
Source: apps/docs/src/content/card/demos/08-frame-cards.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Card, CardFrame, CardFrameAction, CardFrameDescription, CardFrameFooter, CardFrameHeader, CardFrameTitle, CardPanel } from "@qingye/ui/components/card";
import { KeyRoundIcon, PlusIcon } from "lucide-react";

export const meta = {
  title: "卡片框架：卡片",
  description: "标题与说明落在外框的浅底上，内部卡片去掉阴影并贴合外框圆角。",
};

const keys = [
  { name: "生产环境服务端", value: "yq_live_••••3f9a", usage: "3月2日创建 · 今天使用过" },
  { name: "数据同步脚本", value: "yq_live_••••a71c", usage: "8月19日创建 · 从未使用" },
];

export default function Demo() {
  return (
    <CardFrame className="w-full max-w-lg">
      <CardFrameHeader>
        <CardFrameTitle>API 密钥</CardFrameTitle>
        <CardFrameDescription>仅用于服务端调用，不要放进前端代码。</CardFrameDescription>
        <CardFrameAction>
          <Button size="sm" variant="outline">
            <PlusIcon aria-hidden="true" />
            新建
          </Button>
        </CardFrameAction>
      </CardFrameHeader>
      <Card>
        <CardPanel className="py-0">
          <ul className="divide-y">
            {keys.map((key) => (
              <li key={key.value} className="flex items-center gap-3 py-4">
                <KeyRoundIcon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="font-medium text-sm">{key.name}</span>
                  <span className="truncate font-mono text-muted-foreground text-xs">{key.value}</span>
                  <span className="truncate text-muted-foreground text-xs">{key.usage}</span>
                </div>
                <Button size="sm" variant="destructive-outline">撤销</Button>
              </li>
            ))}
          </ul>
        </CardPanel>
      </Card>
      <CardFrameFooter className="text-muted-foreground text-sm">密钥只在创建时完整显示一次。</CardFrameFooter>
    </CardFrame>
  );
}
```


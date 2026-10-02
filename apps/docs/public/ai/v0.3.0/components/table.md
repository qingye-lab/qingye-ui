# 表格 Table

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/table
Source: packages/ui/src/components/table.tsx
Source SHA-256: 2087ba938b04b21b9091f0687b08fef0bb1968a22ad78524c148ee8e43aaadd3

以行列呈现结构化数据，适合订单、设备、成员等需要对比与扫读的列表。需要排序、搜索、分页时改用 DataTable。

## Use and ownership
- 以行列呈现结构化数据，适合订单、设备、成员等需要对比与扫读的列表。需要排序、搜索、分页时改用 DataTable。
- Avoid: 比较任务不应在窄屏直接删除关键列；保留二维关系，并给横向阅读清楚入口。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 数据、权限、动作范围、异步结果与持久化。

## Current exports
- Table: function; owner table; PASS; props: TableProps
- TableBody: function; owner table; PASS; props: React.ComponentProps<"tbody">
- TableCaption: function; owner table; PASS; props: React.ComponentProps<"caption">
- TableCell: function; owner table; PASS; props: React.ComponentProps<"td">
- TableDensity: type; owner table; PASS
- TableFooter: function; owner table; PASS; props: React.ComponentProps<"tfoot">
- TableHead: function; owner table; PASS; props: React.ComponentProps<"th">
- TableHeader: function; owner table; PASS; props: React.ComponentProps<"thead">
- TableProps: type; owner table; PASS
- TableRow: function; owner table; PASS; props: React.ComponentProps<"tr">
- TableVariant: type; owner table; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Table
外层是可横向滚动的容器，className 作用于内部 <table>。
- variant: "default" | "card"; default "default". card 让表体呈卡片样式，通常放在 CardFrame 中。
- density: "default" | "compact"; default "default". 行高，分别读取 --qy-row-default（48px）与 --qy-row-compact（40px）；表头比行矮 8px，最低 36px。
- stickyHeader: boolean; default false. 表头吸顶。容器即滚动区域，需要通过 render 给容器限高。
- render: ReactElement | (props) => ReactElement. 替换外层容器，例如 render={<div className="max-h-80" />}。

### TableHeader
<thead>，表头行不响应悬停。

### TableBody
<tbody>。

### TableFooter
<tfoot>，用于合计、汇总行。

### TableRow
<tr>，悬停时轻微加深。
- data-state: "selected". 标记选中行，呈现选中底色。

### TableHead
<th>，默认左对齐（RTL 下右对齐）；数字列加 text-end。

### TableCell
<td>，不换行；数字、金额、时间加 numeric 等宽数字并右对齐。

### TableCaption
<caption>，显示在表格下方的说明。

## Keyboard

## Source examples
### 基础用法
Source: apps/docs/src/content/table/demos/01-basic.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";

export const meta = { title: "基础用法", description: "金额列右对齐并使用等宽数字。" };

const orders = [
  { id: "SO-20481", customer: "上海云杉科技", status: "已付款", amount: 12800 },
  { id: "SO-20480", customer: "杭州青禾文化", status: "待付款", amount: 4600 },
  { id: "SO-20479", customer: "成都远山物流", status: "已付款", amount: 32150 },
  { id: "SO-20478", customer: "深圳明川电子", status: "已退款", amount: 980 },
];

const tone = { 已付款: "bg-success", 待付款: "bg-warning", 已退款: "bg-muted-foreground/64" } as const;

export default function Demo() {
  return (
    <Table>
      <TableCaption>最近 4 笔订单</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>订单号</TableHead>
          <TableHead>客户</TableHead>
          <TableHead>状态</TableHead>
          <TableHead className="text-end">金额</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium numeric">{order.id}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell>
              <Badge variant="outline">
                <span aria-hidden="true" className={`size-1.5 rounded-full ${tone[order.status as keyof typeof tone]}`} />
                {order.status}
              </Badge>
            </TableCell>
            <TableCell className="text-end numeric">¥{order.amount.toLocaleString("zh-CN")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### 卡片样式
Source: apps/docs/src/content/table/demos/02-card.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { CardFrame, CardFrameAction, CardFrameDescription, CardFrameHeader, CardFrameTitle } from "@qingye/ui/components/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";
import { PlusIcon } from "lucide-react";

export const meta = { title: "卡片样式", description: "variant=\"card\" 放进 CardFrame，表头落在外框的浅底上。" };

const devices = [
  { name: "前台收银机", model: "SUNMI T2s", location: "徐汇店", uptime: "18 天" },
  { name: "后厨打印机", model: "佳博 GP-L80", location: "徐汇店", uptime: "6 天" },
  { name: "自助点餐屏", model: "SUNMI K2", location: "静安店", uptime: "42 天" },
];

export default function Demo() {
  return (
    <CardFrame className="w-full">
      <CardFrameHeader>
        <CardFrameTitle>门店设备</CardFrameTitle>
        <CardFrameDescription>3 台在线</CardFrameDescription>
        <CardFrameAction>
          <Button size="sm" variant="outline">
            <PlusIcon aria-hidden="true" />
            添加设备
          </Button>
        </CardFrameAction>
      </CardFrameHeader>
      <Table variant="card">
        <TableHeader>
          <TableRow>
            <TableHead>设备</TableHead>
            <TableHead>型号</TableHead>
            <TableHead>门店</TableHead>
            <TableHead className="text-end">持续在线</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.name}>
              <TableCell className="font-medium">{device.name}</TableCell>
              <TableCell className="text-muted-foreground">{device.model}</TableCell>
              <TableCell>{device.location}</TableCell>
              <TableCell className="text-end numeric">{device.uptime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardFrame>
  );
}
```

### 紧凑密度
Source: apps/docs/src/content/table/demos/03-density.tsx
```tsx
import { Label } from "@qingye/ui/components/label";
import { Switch } from "@qingye/ui/components/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";
import { useState } from "react";

export const meta = { title: "紧凑密度", description: "compact 将行高从 48px 收到 40px，适合信息密集的后台列表。" };

const members = [
  { name: "林晓雯", role: "产品经理", team: "增长组", joined: "2023-04-12" },
  { name: "周子航", role: "前端工程师", team: "平台组", joined: "2022-11-03" },
  { name: "陈一诺", role: "设计师", team: "体验组", joined: "2024-02-19" },
  { name: "王嘉树", role: "后端工程师", team: "平台组", joined: "2021-08-30" },
];

export default function Demo() {
  const [compact, setCompact] = useState(true);
  return (
    <div className="flex w-full flex-col gap-4">
      <Label className="self-end">
        <Switch checked={compact} onCheckedChange={setCompact} />
        紧凑
      </Label>
      <Table density={compact ? "compact" : "default"}>
        <TableHeader>
          <TableRow>
            <TableHead>姓名</TableHead>
            <TableHead>职位</TableHead>
            <TableHead>团队</TableHead>
            <TableHead className="text-end">入职日期</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.name}>
              <TableCell className="font-medium">{member.name}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell className="text-muted-foreground">{member.team}</TableCell>
              <TableCell className="text-end numeric">{member.joined}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```

### 行选择
Source: apps/docs/src/content/table/demos/04-selection.tsx
```tsx
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";
import { useState } from "react";

export const meta = { title: "行选择", description: "选中行设置 data-state=\"selected\"；表头复选框在部分选中时显示为半选。" };

const invoices = [
  { id: "INV-0931", client: "北京拾光影业", due: "10-08", amount: 26400 },
  { id: "INV-0930", client: "苏州木与石家居", due: "10-12", amount: 8350 },
  { id: "INV-0929", client: "厦门潮汐咖啡", due: "10-15", amount: 3120 },
];

export default function Demo() {
  const [selected, setSelected] = useState<string[]>(["INV-0930"]);
  const all = selected.length === invoices.length;
  const toggle = (id: string, checked: boolean) =>
    setSelected((current) => (checked ? [...current, id] : current.filter((item) => item !== id)));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox
              aria-label="选择全部发票"
              checked={all}
              indeterminate={selected.length > 0 && !all}
              onCheckedChange={(checked) => setSelected(checked ? invoices.map((item) => item.id) : [])}
            />
          </TableHead>
          <TableHead>发票号</TableHead>
          <TableHead>客户</TableHead>
          <TableHead className="text-end">到期</TableHead>
          <TableHead className="text-end">金额</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => {
          const checked = selected.includes(invoice.id);
          return (
            <TableRow data-state={checked ? "selected" : undefined} key={invoice.id}>
              <TableCell>
                <Checkbox aria-label={`选择 ${invoice.id}`} checked={checked} onCheckedChange={(next) => toggle(invoice.id, next)} />
              </TableCell>
              <TableCell className="font-medium numeric">{invoice.id}</TableCell>
              <TableCell>{invoice.client}</TableCell>
              <TableCell className="text-end text-muted-foreground numeric">{invoice.due}</TableCell>
              <TableCell className="text-end numeric">¥{invoice.amount.toLocaleString("zh-CN")}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
```

### 合计行
Source: apps/docs/src/content/table/demos/05-footer.tsx
```tsx
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";

export const meta = { title: "合计行", description: "TableFooter 放汇总数据，底色与表体略有区分。" };

const items = [
  { name: "云服务器 4核8G", quantity: 3, price: 389 },
  { name: "对象存储 500GB", quantity: 1, price: 59 },
  { name: "CDN 流量包 1TB", quantity: 2, price: 126 },
];

const yuan = (value: number) => `¥${value.toLocaleString("zh-CN", { minimumFractionDigits: 2 })}`;

export default function Demo() {
  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>项目</TableHead>
          <TableHead className="text-end">数量</TableHead>
          <TableHead className="text-end">单价</TableHead>
          <TableHead className="text-end">小计</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.name}>
            <TableCell>{item.name}</TableCell>
            <TableCell className="text-end numeric">{item.quantity}</TableCell>
            <TableCell className="text-end numeric">{yuan(item.price)}</TableCell>
            <TableCell className="text-end numeric">{yuan(item.quantity * item.price)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>本月合计</TableCell>
          <TableCell className="text-end numeric">{yuan(total)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
```

### 表头吸顶
Source: apps/docs/src/content/table/demos/06-sticky-header.tsx
```tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";

export const meta = { title: "表头吸顶", description: "stickyHeader 配合 render 给容器限高，表体在固定表头下滚动。", flush: true };

const cities = ["上海", "北京", "深圳", "杭州", "成都", "武汉", "南京", "西安"];
const readings = Array.from({ length: 16 }, (_, index) => ({
  id: `TH-${String(index + 101)}`,
  city: cities[index % cities.length],
  temperature: (18 + ((index * 7) % 9) + index / 10).toFixed(1),
  humidity: 42 + ((index * 11) % 37),
  time: `14:${String(59 - index * 3).padStart(2, "0")}`,
}));

export default function Demo() {
  return (
    <Table render={<div className="max-h-72 rounded-xl" />} stickyHeader>
      <TableHeader>
        <TableRow>
          <TableHead className="ps-4">传感器</TableHead>
          <TableHead>城市</TableHead>
          <TableHead className="text-end">温度 °C</TableHead>
          <TableHead className="text-end">湿度 %</TableHead>
          <TableHead className="pe-4 text-end">上报时间</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {readings.map((reading) => (
          <TableRow key={reading.id}>
            <TableCell className="ps-4 font-medium numeric">{reading.id}</TableCell>
            <TableCell>{reading.city}</TableCell>
            <TableCell className="text-end numeric">{reading.temperature}</TableCell>
            <TableCell className="text-end numeric">{reading.humidity}</TableCell>
            <TableCell className="pe-4 text-end text-muted-foreground numeric">{reading.time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```


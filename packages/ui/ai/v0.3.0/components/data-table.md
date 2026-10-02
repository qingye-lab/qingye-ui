# 数据表格 DataTable

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/data-table
Source: packages/ui/src/components/data-table.tsx
Source SHA-256: c3146b3c5864c1105352487fa99dca179448bf8f0311b514ecbb82f561ca789a

基于 TanStack Table 的完整列表：排序、搜索、分页、行选择、批量操作、列显示切换与加载态。既可在客户端处理数据，也可交给服务端分页排序。

## Use and ownership
- 基于 TanStack Table 的完整列表：排序、搜索、分页、行选择、批量操作、列显示切换与加载态。既可在客户端处理数据，也可交给服务端分页排序。
- Avoid: 比较任务不应在窄屏直接删除关键列；保留二维关系，并给横向阅读清楚入口。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 数据、权限、动作范围、异步结果与持久化。

## Current exports
- ColumnDef: reexport; owner data-table; UNVERIFIED
- ColumnFiltersState: reexport; owner data-table; UNVERIFIED
- DataTable: function; owner data-table; PASS; props: DataTableProps<TData>
- DataTableBulkContext: type; owner data-table; PASS
- DataTableInstance: reexport; owner data-table; alias of TanstackTable; UNVERIFIED
- DataTableProps: type; owner data-table; PASS
- PaginationState: reexport; owner data-table; UNVERIFIED
- RowSelectionState: reexport; owner data-table; UNVERIFIED
- SortingState: reexport; owner data-table; UNVERIFIED
- VisibilityState: reexport; owner data-table; UNVERIFIED

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: @tanstack/react-table
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### DataTable
泛型组件 DataTable<TData>。所有状态都支持受控（传值 + onXChange）与非受控。需要安装可选依赖 @tanstack/react-table。
- data: TData[]. 行数据；服务端分页时为当前页。
- columns: ColumnDef<TData>[]. 列定义。meta 支持 label（列菜单名称）、align（"start" | "center" | "end"）、headerClassName、cellClassName。
- getRowId: (row, index) => string. 稳定的行 id，跨排序、分页、刷新保持选择。
- label: string; default "数据表格". 表格的无障碍名称。
- enableGlobalFilter: boolean; default true. 显示搜索框，按所有列筛选。
- searchPlaceholder: string; default "搜索表格". 搜索框的占位文字，同时作为它的无障碍名称。
- globalFilter / onGlobalFilterChange: string / (value) => void. 受控搜索词。
- collationLocale: string. 文本列的排序语言标签（如 "zh-CN"）。默认取 <html lang>，因此中文按拼音而非码点排序；数字与日期列不受影响。
- columnFilters / onColumnFiltersChange: ColumnFiltersState. 受控列筛选，常与 toolbar 中的自定义筛选配合。
- enableSorting: boolean; default true. 点击表头排序；列上 enableSorting: false 可单独关闭，Shift 点击多列排序。
- sorting / defaultSorting / onSortingChange: SortingState. 排序状态。
- enablePagination: boolean; default true. 关闭后显示全部行，不渲染分页栏。
- pagination / onPaginationChange: PaginationState. 受控页码与每页行数。
- defaultPageSize: number; default 10. 非受控时的初始每页行数。
- pageSizeOptions: number[]; default [10, 20, 50]. 每页行数选项。
- manualPagination / manualSorting / manualFiltering: boolean; default false. 交给服务端处理，表格按原样显示 data。
- rowCount: number. 服务端总行数，用于页数与汇总。
- enableRowSelection: boolean | (row) => boolean; default false. 添加复选框列；函数可按行禁用。
- rowSelection / defaultRowSelection / onRowSelectionChange: RowSelectionState. 选中状态，以行 id 为键。
- bulkActions: ({ rows, ids, clear, table }) => ReactNode. 有选择时显示批量操作；ids 包含所有页的已选 ID，rows 只包含当前 data 中的已选对象。搜索与筛选继续可见。
- enableColumnVisibility: boolean; default false. 显示列菜单，切换可隐藏的列（列上 enableHiding: false 可固定）。
- columnVisibility / defaultColumnVisibility / onColumnVisibilityChange: VisibilityState. 列显示状态。
- toolbar: ReactNode | (table) => ReactNode. 放在搜索框后的自定义筛选。
- loading: boolean; default false. 初始无数据时显示骨架行；有数据刷新时保留原行，并设置 aria-busy。
- empty: ReactNode. 无数据时的内容；默认提示“没有匹配的结果”，有搜索词时附清除按钮。
- density: "default" | "compact"; default "default". 行高。
- variant: "default" | "card"; default "default". 表格样式，同 Table。
- maxHeight: number | string. 限制表格高度，表体滚动，表头默认吸顶。
- stickyHeader: boolean. 表头吸顶；设置 maxHeight 时默认开启。

## Keyboard
- Tab: 依次聚焦搜索框、表头排序按钮、复选框和分页按钮。
- Enter / Space: 焦点在表头按钮上时切换排序：升序、降序、取消（数字列先降序）。
- Shift + Enter / Shift + Space: 焦点在表头按钮上时把该列追加到已有排序，实现多列排序。
- Space: 焦点在复选框上时切换该行或全部行的选择。

## Source examples
### 排序、搜索与分页
Source: apps/docs/src/content/data-table/demos/01-basic.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";
import { DataTable } from "@qingye/ui/components/data-table";
import { type ColumnDef } from "@qingye/ui";

export const meta = { title: "排序、搜索与分页", description: "点击表头排序，搜索覆盖所有列；金额和日期列右对齐。" };

type Order = { id: string; customer: string; city: string; status: "已付款" | "待付款" | "已退款"; amount: number; date: string };

const customers = ["上海云杉科技", "杭州青禾文化", "成都远山物流", "深圳明川电子", "北京拾光影业", "苏州木与石家居", "厦门潮汐咖啡"];
const cities = ["上海", "杭州", "成都", "深圳", "北京", "苏州", "厦门"];
const statuses = ["已付款", "已付款", "待付款", "已付款", "已退款"] as const;

const orders: Order[] = Array.from({ length: 32 }, (_, index) => ({
  id: `SO-${20481 - index}`,
  customer: customers[index % customers.length]!,
  city: cities[index % cities.length]!,
  status: statuses[index % statuses.length]!,
  amount: 860 + ((index * 3779) % 31000),
  date: `2026-09-${String(30 - (index % 28)).padStart(2, "0")}`,
}));

const tone = { 已付款: "bg-success", 待付款: "bg-warning", 已退款: "bg-muted-foreground/64" };

const columns: ColumnDef<Order>[] = [
  { accessorKey: "id", header: "订单号", cell: ({ getValue }) => <span className="font-medium numeric">{getValue<string>()}</span> },
  { accessorKey: "customer", header: "客户" },
  { accessorKey: "city", header: "城市" },
  {
    accessorKey: "status",
    header: "状态",
    cell: ({ row }) => (
      <Badge variant="outline">
        <span aria-hidden="true" className={`size-1.5 rounded-full ${tone[row.original.status]}`} />
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: "金额",
    meta: { align: "end" },
    cell: ({ getValue }) => <span className="numeric">¥{getValue<number>().toLocaleString("zh-CN")}</span>,
  },
  { accessorKey: "date", header: "下单日期", meta: { align: "end", cellClassName: "numeric text-muted-foreground" } },
];

export default function Demo() {
  return <DataTable className="w-full" columns={columns} data={orders} defaultSorting={[{ id: "date", desc: true }]} getRowId={(order) => order.id} label="订单" />;
}
```

### 选择、批量操作与列菜单
Source: apps/docs/src/content/data-table/demos/02-selection.tsx
```tsx
import { SelectPopup } from "@qingye/ui/components/select";
import { Avatar } from "@qingye/ui/components/avatar";
import { SelectItem, SelectTrigger } from "@qingye/ui/components/select";
import { AvatarFallback } from "@qingye/ui/components/avatar";
import { Button } from "@qingye/ui/components/button";
import { DataTable } from "@qingye/ui/components/data-table";
import { Select, SelectValue } from "@qingye/ui/components/select";
import { type ColumnDef } from "@qingye/ui";
import { DownloadIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

export const meta = {
  title: "选择、批量操作与列菜单",
  description: "勾选行后出现已选计数与批量操作；toolbar 放自定义筛选，列菜单切换可隐藏的列。",
};

type Member = { id: string; name: string; email: string; team: string; role: string; lastActive: string };

const people: Member[] = [
  { id: "u1", name: "林晓雯", email: "lin.xiaowen@yunshan.cn", team: "增长组", role: "管理员", lastActive: "2 分钟前" },
  { id: "u2", name: "周子航", email: "zhou.zihang@yunshan.cn", team: "平台组", role: "成员", lastActive: "1 小时前" },
  { id: "u3", name: "陈一诺", email: "chen.yinuo@yunshan.cn", team: "体验组", role: "成员", lastActive: "昨天" },
  { id: "u4", name: "王嘉树", email: "wang.jiashu@yunshan.cn", team: "平台组", role: "所有者", lastActive: "3 天前" },
  { id: "u5", name: "赵思远", email: "zhao.siyuan@yunshan.cn", team: "增长组", role: "成员", lastActive: "5 分钟前" },
  { id: "u6", name: "孙可欣", email: "sun.kexin@yunshan.cn", team: "体验组", role: "访客", lastActive: "上周" },
];

const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "name",
    header: "成员",
    cell: ({ row }) => (
      <div className="flex items-center gap-2.5">
        <Avatar size="sm">
          <AvatarFallback>{row.original.name.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <span className="font-medium">{row.original.name}</span>
      </div>
    ),
  },
  { accessorKey: "email", header: "邮箱", cell: ({ getValue }) => <span className="text-muted-foreground">{getValue<string>()}</span> },
  { accessorKey: "team", header: "团队", filterFn: "equalsString" },
  { accessorKey: "role", header: "角色" },
  { accessorKey: "lastActive", header: "最近活跃", enableSorting: false, meta: { align: "end", cellClassName: "text-muted-foreground" } },
];

const teams = [
  { label: "全部团队", value: "" },
  { label: "增长组", value: "增长组" },
  { label: "平台组", value: "平台组" },
  { label: "体验组", value: "体验组" },
];

export default function Demo() {
  const [members, setMembers] = useState(people);
  return (
    <DataTable
      bulkActions={({ ids, clear }) => (
        <>
          <Button size="sm" variant="outline">
            <DownloadIcon aria-hidden="true" />
            导出
          </Button>
          <Button
            onClick={() => {
              setMembers((current) => current.filter((member) => !ids.includes(member.id)));
              clear();
            }}
            size="sm"
            variant="destructive-outline"
          >
            <Trash2Icon aria-hidden="true" />
            移除
          </Button>
        </>
      )}
      className="w-full"
      columns={columns}
      data={members}
      defaultColumnVisibility={{ email: false }}
      enableColumnVisibility
      enableRowSelection={(row) => row.original.role !== "所有者"}
      getRowId={(member) => member.id}
      label="团队成员"
      searchPlaceholder="搜索成员"
      toolbar={(table) => (
        <Select
          items={teams}
          onValueChange={(value) => table.getColumn("team")?.setFilterValue(value || undefined)}
          value={(table.getColumn("team")?.getFilterValue() as string | undefined) ?? ""}
        >
          <SelectTrigger aria-label="按团队筛选" className="w-auto min-w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            {teams.map((team) => (
              <SelectItem key={team.value} value={team.value}>
                {team.label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
      )}
    />
  );
}
```

### 加载与空状态
Source: apps/docs/src/content/data-table/demos/03-states.tsx
```tsx
import { EmptyContent, EmptyDescription, EmptyHeader } from "@qingye/ui/components/empty";
import { EmptyMedia } from "@qingye/ui/components/empty";
import { Button } from "@qingye/ui/components/button";
import { DataTable } from "@qingye/ui/components/data-table";
import { Empty, EmptyTitle } from "@qingye/ui/components/empty";
import { Label } from "@qingye/ui/components/label";
import { Switch } from "@qingye/ui/components/switch";
import { type ColumnDef } from "@qingye/ui";
import { ServerIcon } from "lucide-react";
import { useState } from "react";

export const meta = { title: "加载与空状态", description: "loading 显示骨架行；没有数据时显示 empty，可放入 Empty 组件引导下一步。" };

type Server = { name: string; region: string; cpu: number };

const servers: Server[] = [
  { name: "api-prod-01", region: "华东 2（上海）", cpu: 42 },
  { name: "api-prod-02", region: "华东 2（上海）", cpu: 37 },
  { name: "worker-01", region: "华北 2（北京）", cpu: 81 },
];

const columns: ColumnDef<Server>[] = [
  { accessorKey: "name", header: "实例", cell: ({ getValue }) => <span className="font-medium">{getValue<string>()}</span> },
  { accessorKey: "region", header: "地域" },
  { accessorKey: "cpu", header: "CPU", meta: { align: "end" }, cell: ({ getValue }) => <span className="numeric">{getValue<number>()}%</span> },
];

export default function Demo() {
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        <Label>
          <Switch checked={loading} onCheckedChange={setLoading} />
          加载中
        </Label>
        <Label>
          <Switch checked={empty} onCheckedChange={setEmpty} />
          无数据
        </Label>
      </div>
      <DataTable
        columns={columns}
        data={empty ? [] : servers}
        defaultPageSize={5}
        empty={
          <Empty className="py-4 md:py-6">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ServerIcon />
              </EmptyMedia>
              <EmptyTitle size="sm">还没有实例</EmptyTitle>
              <EmptyDescription>创建第一台云服务器后，它会出现在这里。</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button size="sm">创建实例</Button>
            </EmptyContent>
          </Empty>
        }
        enableGlobalFilter={false}
        label="云服务器"
        loading={loading}
      />
    </div>
  );
}
```

### 服务端分页与排序
Source: apps/docs/src/content/data-table/demos/04-server.tsx
```tsx
import { DataTable } from "@qingye/ui/components/data-table";
import { type ColumnDef, type PaginationState, type SortingState } from "@qingye/ui";
import { useEffect, useState } from "react";

export const meta = {
  title: "服务端分页与排序",
  description: "manualPagination、manualSorting 与 rowCount 把分页排序交给接口；请求期间传 loading。",
};

type Ticket = { id: number; title: string; assignee: string; priority: number };

const titles = ["支付回调超时", "导出报表缺少字段", "登录页验证码不显示", "订单列表加载缓慢", "发票抬头无法保存", "推送通知重复"];
const assignees = ["林晓雯", "周子航", "陈一诺", "王嘉树"];

// Stands in for a real API: sorts and slices 87 tickets after a short delay.
function fetchTickets(pagination: PaginationState, sorting: SortingState) {
  const all: Ticket[] = Array.from({ length: 87 }, (_, index) => ({
    id: 1201 + index,
    title: titles[index % titles.length]!,
    assignee: assignees[index % assignees.length]!,
    priority: (index * 7) % 4,
  }));
  const sort = sorting[0];
  if (sort) all.sort((a, b) => (a[sort.id as keyof Ticket] > b[sort.id as keyof Ticket] ? 1 : -1) * (sort.desc ? -1 : 1));
  const start = pagination.pageIndex * pagination.pageSize;
  return new Promise<{ rows: Ticket[]; total: number }>((resolve) =>
    setTimeout(() => resolve({ rows: all.slice(start, start + pagination.pageSize), total: all.length }), 600),
  );
}

const priorities = ["P0 紧急", "P1 高", "P2 中", "P3 低"];

const columns: ColumnDef<Ticket>[] = [
  { accessorKey: "id", header: "编号", cell: ({ getValue }) => <span className="font-medium numeric">#{getValue<number>()}</span> },
  { accessorKey: "title", header: "标题", enableSorting: false },
  { accessorKey: "assignee", header: "负责人" },
  { accessorKey: "priority", header: "优先级", meta: { align: "end" }, cell: ({ getValue }) => priorities[getValue<number>()] },
];

export default function Demo() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [result, setResult] = useState<{ rows: Ticket[]; total: number }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let current = true;
    setLoading(true);
    fetchTickets(pagination, sorting).then((next) => {
      if (!current) return;
      setResult(next);
      setLoading(false);
    });
    return () => {
      current = false;
    };
  }, [pagination, sorting]);

  return (
    <DataTable
      className="w-full"
      columns={columns}
      data={result?.rows ?? []}
      enableGlobalFilter={false}
      getRowId={(ticket) => String(ticket.id)}
      label="工单"
      loading={loading}
      manualPagination
      manualSorting
      onPaginationChange={setPagination}
      onSortingChange={setSorting}
      pagination={pagination}
      rowCount={result?.total ?? 0}
      sorting={sorting}
    />
  );
}
```

### 紧凑与限高
Source: apps/docs/src/content/data-table/demos/05-compact-scroll.tsx
```tsx
import { DataTable } from "@qingye/ui/components/data-table";
import { type ColumnDef } from "@qingye/ui";

export const meta = {
  title: "紧凑与限高",
  description: "density=\"compact\" 收紧行高，maxHeight 让表体在吸顶表头下滚动；关闭分页一次显示全部记录。",
};

type Event = { time: string; level: "信息" | "警告" | "错误"; source: string; message: string };

const messages = [
  { level: "信息", source: "gateway", message: "健康检查通过" },
  { level: "警告", source: "billing", message: "账单生成耗时 4.2s，超过阈值" },
  { level: "信息", source: "auth", message: "刷新访问令牌 128 个" },
  { level: "错误", source: "payments", message: "微信支付回调签名校验失败" },
  { level: "信息", source: "scheduler", message: "完成每日对账任务" },
] as const;

const events: Event[] = Array.from({ length: 24 }, (_, index) => ({
  time: `15:${String(59 - index * 2).padStart(2, "0")}:${String((index * 17) % 60).padStart(2, "0")}`,
  ...messages[index % messages.length]!,
}));

const tone = { 信息: "text-muted-foreground", 警告: "text-warning-foreground", 错误: "text-destructive-foreground" };

const columns: ColumnDef<Event>[] = [
  { accessorKey: "time", header: "时间", cell: ({ getValue }) => <span className="text-muted-foreground numeric">{getValue<string>()}</span> },
  { accessorKey: "level", header: "级别", cell: ({ row }) => <span className={`font-medium ${tone[row.original.level]}`}>{row.original.level}</span> },
  { accessorKey: "source", header: "来源", cell: ({ getValue }) => <code className="text-xs">{getValue<string>()}</code> },
  { accessorKey: "message", header: "内容", enableSorting: false },
];

export default function Demo() {
  return (
    <DataTable
      className="w-full"
      columns={columns}
      data={events}
      density="compact"
      enablePagination={false}
      label="系统日志"
      maxHeight={320}
      searchPlaceholder="搜索日志"
    />
  );
}
```

### 跨页选择与批量操作
Source: apps/docs/src/content/data-table/demos/06-server-selection.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";
import { Button } from "@qingye/ui/components/button";
import { DataTable } from "@qingye/ui/components/data-table";
import { type ColumnDef } from "@qingye/ui";
import { SendIcon } from "lucide-react";
import { useState } from "react";

export const meta = {
  title: "跨页选择与批量操作",
  description: "服务端分页时选择按行 id 保留：ids 含所有已选行，rows 只有当前页的那部分。",
};

type Order = { id: string; customer: string; amount: number; status: "待发货" | "已发货" | "已签收" };

const customers = ["上海云杉科技", "杭州青禾文化", "成都远山物流", "深圳明川电子", "北京拾光影业", "苏州木与石家居"];
const statuses = ["待发货", "已发货", "已签收"] as const;

// 64 orders the "API" hands out ten at a time.
const allOrders: Order[] = Array.from({ length: 64 }, (_, index) => ({
  id: `SO-${20481 - index}`,
  customer: customers[index % customers.length]!,
  amount: 860 + ((index * 3779) % 31000),
  status: statuses[index % statuses.length]!,
}));

const columns: ColumnDef<Order>[] = [
  { accessorKey: "id", header: "订单号", cell: ({ getValue }) => <span className="font-medium numeric">{getValue<string>()}</span> },
  { accessorKey: "customer", header: "客户" },
  {
    accessorKey: "status",
    header: "状态",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "待发货" ? "warning" : "outline"}>{row.original.status}</Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: "金额",
    meta: { align: "end" },
    cell: ({ getValue }) => <span className="numeric">¥{getValue<number>().toLocaleString("zh-CN")}</span>,
  },
];

export default function Demo() {
  const [pageIndex, setPageIndex] = useState(0);
  const [shipped, setShipped] = useState<string[]>([]);
  const pageSize = 8;
  const page = allOrders.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);

  return (
    <DataTable
      bulkActions={({ ids, rows, clear }) => (
        <>
          <Button
            onClick={() => {
              // `ids` covers every page; `rows` would only cover the current one.
              setShipped((current) => [...new Set([...current, ...ids])]);
              clear();
            }}
            size="sm"
            variant="outline"
          >
            <SendIcon aria-hidden="true" />
            标记发货（{ids.length}）
          </Button>
          <span className="hidden text-muted-foreground text-xs sm:inline">本页 {rows.length} 行</span>
        </>
      )}
      className="w-full"
      columns={columns}
      data={page}
      enableRowSelection
      getRowId={(order) => order.id}
      label="订单"
      manualPagination
      onPaginationChange={(next) => setPageIndex(next.pageIndex)}
      pagination={{ pageIndex, pageSize }}
      rowCount={allOrders.length}
      searchPlaceholder="搜索订单"
      toolbar={shipped.length > 0 ? <Badge variant="success">已标记 {shipped.length} 单</Badge> : null}
    />
  );
}
```


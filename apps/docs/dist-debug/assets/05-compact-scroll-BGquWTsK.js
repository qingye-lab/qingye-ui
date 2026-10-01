const e=`import { DataTable } from "@qingye/ui/components/data-table";
import { type ColumnDef } from "@qingye/ui";

export const meta = {
  title: "紧凑与限高",
  description: "density=\\"compact\\" 收紧行高，maxHeight 让表体在吸顶表头下滚动；关闭分页一次显示全部记录。",
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
  time: \`15:\${String(59 - index * 2).padStart(2, "0")}:\${String((index * 17) % 60).padStart(2, "0")}\`,
  ...messages[index % messages.length]!,
}));

const tone = { 信息: "text-muted-foreground", 警告: "text-warning-foreground", 错误: "text-destructive-foreground" };

const columns: ColumnDef<Event>[] = [
  { accessorKey: "time", header: "时间", cell: ({ getValue }) => <span className="text-muted-foreground numeric">{getValue<string>()}</span> },
  { accessorKey: "level", header: "级别", cell: ({ row }) => <span className={\`font-medium \${tone[row.original.level]}\`}>{row.original.level}</span> },
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
`;export{e as default};

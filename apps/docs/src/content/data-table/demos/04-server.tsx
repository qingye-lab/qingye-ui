import { type ColumnDef, DataTable, type PaginationState, type SortingState } from "@yanqing/ui";
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

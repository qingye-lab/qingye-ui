const e=`import { SelectPopup } from "@qingye/ui/components/select";
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
`;export{e as default};

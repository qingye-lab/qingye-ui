import { EmptyContent, EmptyDescription, EmptyHeader } from "@yanqing/ui/components/empty";
import { EmptyMedia } from "@yanqing/ui/components/empty";
import { Button } from "@yanqing/ui/components/button";
import { DataTable } from "@yanqing/ui/components/data-table";
import { Empty, EmptyTitle } from "@yanqing/ui/components/empty";
import { Label } from "@yanqing/ui/components/label";
import { Switch } from "@yanqing/ui/components/switch";
import { type ColumnDef } from "@yanqing/ui";
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
              <EmptyTitle className="text-base">还没有实例</EmptyTitle>
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

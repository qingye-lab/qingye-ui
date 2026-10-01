const e=`import { Button } from "@qingye/ui/components/button";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye/ui/components/select";
import { DownloadIcon } from "lucide-react";

export const meta = { title: "组合：列表筛选栏", description: "小尺寸选择器与按钮排成一行，窄屏自动换行。" };

const status = { all: "全部状态", online: "在线", offline: "离线", alarm: "告警中" };
const range = { "24h": "最近 24 小时", "7d": "最近 7 天", "30d": "最近 30 天" };

export default function Demo() {
  return (
    <div className="flex w-full flex-wrap items-center gap-2">
      <Select items={status} defaultValue="all" aria-label="设备状态">
        <SelectTrigger size="sm" className="w-auto min-w-28">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {Object.entries(status).map(([value, label]) => (
            <SelectItem key={value} value={value}>{label}</SelectItem>
          ))}
        </SelectPopup>
      </Select>
      <Select items={range} defaultValue="7d" aria-label="时间范围">
        <SelectTrigger size="sm" className="w-auto min-w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {Object.entries(range).map(([value, label]) => (
            <SelectItem key={value} value={value}>{label}</SelectItem>
          ))}
        </SelectPopup>
      </Select>
      <Button size="sm" variant="outline" className="ms-auto">
        <DownloadIcon />
        导出 CSV
      </Button>
    </div>
  );
}
`;export{e as default};

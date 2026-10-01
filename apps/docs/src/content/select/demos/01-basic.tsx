import { Label } from "@yanqing/ui/components/label";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@yanqing/ui/components/select";

export const meta = { title: "基础用法", description: "列表默认与触发器同宽，展开在正下方。" };

const regions = [
  { label: "华东 1（杭州）", value: "cn-hangzhou" },
  { label: "华东 2（上海）", value: "cn-shanghai" },
  { label: "华北 2（北京）", value: "cn-beijing" },
  { label: "华南 1（深圳）", value: "cn-shenzhen" },
  { label: "西南 1（成都）", value: "cn-chengdu" },
];

export default function Demo() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-2">
      <Label htmlFor="region">部署地域</Label>
      <Select items={regions} defaultValue="cn-hangzhou">
        <SelectTrigger id="region">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {regions.map((region) => (
            <SelectItem key={region.value} value={region.value}>
              {region.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </div>
  );
}

import { Checkbox } from "@yanqing/ui/components/checkbox";
import { Label } from "@yanqing/ui/components/label";

export const meta = { title: "卡片选项", description: "整张卡片是标签；选中时边框与底色一起变化。" };

const addons = [
  { id: "backup", title: "自动备份", detail: "每日 03:00 快照，保留 7 天", price: "¥30/月", checked: true },
  { id: "waf", title: "Web 应用防火墙", detail: "拦截 SQL 注入、XSS 与恶意爬虫", price: "¥199/月" },
  { id: "monitor", title: "高级监控", detail: "秒级指标与短信告警", price: "¥49/月" },
];

export default function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      {addons.map((addon) => (
        <Label
          key={addon.id}
          className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50"
        >
          <Checkbox defaultChecked={addon.checked} className="mt-px" />
          <span className="flex min-w-0 flex-1 flex-col gap-1">
            <span>{addon.title}</span>
            <span className="font-normal text-muted-foreground text-xs">{addon.detail}</span>
          </span>
          <span className="font-normal text-muted-foreground text-xs numeric">{addon.price}</span>
        </Label>
      ))}
    </div>
  );
}

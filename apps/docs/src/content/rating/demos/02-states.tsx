import { Rating } from "@qingye_lab/ui/components/rating";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "状态", titleEn: "States" };

export default function Demo() {
  const { code } = useUILocale(); const en = code.startsWith("en");
  return <div className="flex flex-col gap-(--qy-space-3)">
    <div className="flex items-center gap-(--qy-space-3)"><span className="w-24 text-support text-muted-foreground">{en ? "Read-only" : "只读"}</span><Rating readOnly value={4} /></div>
    <div className="flex items-center gap-(--qy-space-3)"><span className="w-24 text-support text-muted-foreground">{en ? "Disabled" : "禁用"}</span><Rating disabled defaultValue={2} /></div>
    <div className="flex items-center gap-(--qy-space-3)"><span className="w-24 text-support text-muted-foreground">max = 10</span><Rating max={10} defaultValue={7} /></div>
    <div className="flex items-center gap-(--qy-space-3)"><span className="w-24 text-support text-muted-foreground">{en ? "No clearing" : "不可清除"}</span><Rating allowClear={false} defaultValue={3} /></div>
  </div>;
}

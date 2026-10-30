import { Field, FieldContent, FieldLabel } from "@qingye_lab/ui/components/field";
import { Switch } from "@qingye_lab/ui/components/switch";

export const meta = { title: "等待确认", titleEn: "Pending" };

// 抓手停在请求的目标值；结果由应用持有，到达后再去掉 pending。
export default function Demo() {
  return <Field orientation="horizontal"><Switch checked pending /><FieldContent><FieldLabel>自动同步</FieldLabel></FieldContent></Field>;
}

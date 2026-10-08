import { Field, FieldDescription, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";

export const meta = { title: "标签与说明", titleEn: "Label and description" };

export default function Demo() {
  return <Field className="w-full max-w-xs"><FieldLabel>设备名称</FieldLabel><Input defaultValue="青野" maxLength={20} /><FieldDescription>最多 20 个字。</FieldDescription></Field>;
}

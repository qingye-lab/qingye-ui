import { Field, FieldControl, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { NativeSelect } from "@qingye/ui/components/native-select";

export const meta = { title: "字段错误", titleEn: "Field error" };
export default function Demo() {
  return <Field invalid className="w-full max-w-sm"><FieldLabel>选项</FieldLabel><FieldControl render={<NativeSelect><option value="">请选择</option><option value="one">选项一</option><option value="two">选项二</option></NativeSelect>} /><FieldError>请选择一个选项</FieldError></Field>;
}

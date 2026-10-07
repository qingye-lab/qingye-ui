import { Field, FieldControl, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { NativeSelect } from "@qingye/ui/components/native-select";

export const meta = { title: "字段错误", titleEn: "Field error" };
export default function Demo() {
  return <Field invalid className="w-full max-w-sm"><FieldLabel>同步频率</FieldLabel><FieldControl render={<NativeSelect><option value="">请选择</option><option value="daily">每天一次</option><option value="hourly">每小时一次</option></NativeSelect>} /><FieldError>请选择同步频率</FieldError></Field>;
}

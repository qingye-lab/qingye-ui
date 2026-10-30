import { Field, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";

export const meta = { title: "校验中", titleEn: "Validating" };

// 校验进行中旧的错误不显示；结论由应用在结束后传入。
export default function Demo() {
  return <Field className="w-full max-w-xs" validating invalid><FieldLabel>用户名</FieldLabel><Input defaultValue="qingye" /><FieldError>用户名已被占用</FieldError></Field>;
}

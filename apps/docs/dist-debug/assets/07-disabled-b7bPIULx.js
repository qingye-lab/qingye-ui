const e=`import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "禁用", description: "Field 的 disabled 同时作用于标签与控件。" };

export default function Demo() {
  return (
    <Field className="w-full max-w-xs" disabled>
      <FieldLabel>组织 ID</FieldLabel>
      <Input defaultValue="org_7f3a92c1" />
      <FieldDescription>创建后不可修改。</FieldDescription>
    </Field>
  );
}
`;export{e as default};

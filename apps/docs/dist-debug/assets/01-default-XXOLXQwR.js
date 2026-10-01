const e=`import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "默认", description: "标签、控件、说明自上而下排列。" };

export default function Demo() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>显示名称</FieldLabel>
      <Input defaultValue="林晓" />
      <FieldDescription>同事在评论与提及中看到的名字。</FieldDescription>
    </Field>
  );
}
`;export{e as default};

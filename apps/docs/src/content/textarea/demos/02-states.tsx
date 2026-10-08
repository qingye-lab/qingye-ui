import { Field, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { Textarea } from "@qingye_lab/ui/components/textarea";

export const meta = { title: "状态", titleEn: "States" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-lg gap-(--qy-field-group-gap)">
      <Field invalid>
        <FieldLabel>无效</FieldLabel>
        <Textarea defaultValue="待检查的文字。" />
        <FieldError>请检查内容。</FieldError>
      </Field>
      <Field>
        <FieldLabel>只读</FieldLabel>
        <Textarea readOnly defaultValue={"第一行文字。\n第二行文字。"} />
      </Field>
      <Field>
        <FieldLabel>禁用</FieldLabel>
        <Textarea disabled defaultValue="暂不可编辑。" />
      </Field>
    </div>
  );
}

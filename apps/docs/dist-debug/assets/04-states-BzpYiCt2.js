const e=`import { Field, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Textarea } from "@qingye/ui/components/textarea";

export const meta = { title: "状态", description: "无效、只读与禁用。" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-sm gap-5">
      <Field invalid>
        <FieldLabel>退款原因</FieldLabel>
        <Textarea defaultValue="不想要了" />
        <FieldError>请至少填写 10 个字，便于客服核实。</FieldError>
      </Field>
      <Field>
        <FieldLabel>审核意见</FieldLabel>
        <Textarea defaultValue="资料齐全，同意开通企业账户。—— 王敏，9 月 28 日" readOnly />
      </Field>
      <Field disabled>
        <FieldLabel>内部备注</FieldLabel>
        <Textarea placeholder="仅管理员可编辑" />
      </Field>
    </div>
  );
}
`;export{e as default};

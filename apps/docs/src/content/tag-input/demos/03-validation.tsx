import { Field, FieldDescription, FieldLabel } from "@yanqing/ui/components/field";
import { TagInput } from "@yanqing/ui/components/tag-input";

export const meta = {
  title: "校验与上限",
  description: "validate 返回文案即拒绝该标签，输入保留以便修改；max 限制数量。",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Demo() {
  return (
    <Field className="w-full max-w-md">
      <FieldLabel>抄送成员</FieldLabel>
      <TagInput
        defaultValue={["lin.yue@qingyun.design"]}
        max={5}
        name="cc"
        placeholder="输入邮箱，以逗号分隔"
        validate={(tag) => (emailPattern.test(tag) ? null : `“${tag}”不是有效的邮箱地址`)}
      />
      <FieldDescription>最多 5 人。试试输入一个不完整的地址。</FieldDescription>
    </Field>
  );
}

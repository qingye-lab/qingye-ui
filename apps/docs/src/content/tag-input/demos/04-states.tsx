import { Field, FieldLabel } from "@yanqing/ui/components/field";
import { TagInput } from "@yanqing/ui/components/tag-input";

export const meta = { title: "只读与禁用" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
      <Field>
        <FieldLabel>项目标签（只读）</FieldLabel>
        <TagInput defaultValue={["已归档", "2025 Q4", "品牌升级"]} readOnly />
      </Field>
      <Field disabled>
        <FieldLabel>技能（禁用）</FieldLabel>
        <TagInput defaultValue={["Figma", "原型设计"]} disabled />
      </Field>
    </div>
  );
}

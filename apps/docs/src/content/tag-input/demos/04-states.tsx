import { Button } from "@qingye/ui/components/button";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Fieldset, FieldsetLegend } from "@qingye/ui/components/fieldset";
import { TagInput } from "@qingye/ui/components/tag-input";
import { useState } from "react";

export const meta = { title: "只读与禁用" };

export default function Demo() {
  const [editable, setEditable] = useState(false);
  return (
    <div className="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
      <Field>
        <FieldLabel>项目标签（只读）</FieldLabel>
        <TagInput defaultValue={["已归档", "2025 Q4", "品牌升级"]} readOnly />
      </Field>
      <Field disabled>
        <FieldLabel>技能（禁用）</FieldLabel>
        <TagInput defaultValue={["Figma", "原型设计"]} />
      </Field>
      <div className="flex flex-col gap-3">
        <Fieldset disabled={!editable}>
          <FieldsetLegend variant="label">交接标签</FieldsetLegend>
          <TagInput aria-label="交接标签" defaultValue={["优先评审", "需要法务参与"]} />
        </Fieldset>
        <Button className="self-start" onClick={() => setEditable((current) => !current)} size="sm" variant="outline">
          {editable ? "锁定标签" : "编辑标签"}
        </Button>
      </div>
    </div>
  );
}

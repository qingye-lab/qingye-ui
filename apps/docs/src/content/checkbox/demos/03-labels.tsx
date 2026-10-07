import { Checkbox } from "@qingye/ui/components/checkbox";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Heading } from "@qingye/ui/components/typography";

export const meta = { title: "跟随标签", titleEn: "Follows its label" };

// 标记只有一种几何，跟随相邻标签的文字档（用户裁决 2026-10-05）：
// 勾选框与它旁边那行字同高，因此列表项里的标记和标题旁的标记由文字本身决定。
export default function Demo() {
  return (
    <div className="grid w-full max-w-lg gap-(--qy-field-group-gap)">
      <Field orientation="horizontal"><Checkbox defaultChecked /><FieldLabel>正文标签</FieldLabel></Field>
      <Field orientation="horizontal"><Checkbox defaultChecked /><FieldLabel className="text-support">紧凑标签</FieldLabel></Field>
      <Field orientation="horizontal"><Checkbox defaultChecked /><span className="text-reading">说明性文字，标记与它同高</span></Field>
      <Field orientation="horizontal"><Checkbox defaultChecked /><Heading level={4} className="text-heading">分区标题</Heading></Field>
    </div>
  );
}

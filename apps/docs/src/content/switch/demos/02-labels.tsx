import { Field, FieldContent, FieldLabel } from "@qingye/ui/components/field";
import { Switch } from "@qingye/ui/components/switch";

export const meta = { title: "跟随标签", titleEn: "Follows its label" };

// 开关的轨道高度跟随相邻标签的文字档；密度与容器高度都不改它。
export default function Demo() {
  return (
    <div className="grid w-full max-w-lg gap-(--qy-field-group-gap)">
      <Field orientation="horizontal"><Switch defaultChecked /><FieldContent><FieldLabel>显示网格</FieldLabel></FieldContent></Field>
      <Field orientation="horizontal"><Switch defaultChecked /><FieldContent><FieldLabel className="text-support">跟随紧凑标签</FieldLabel></FieldContent></Field>
      <Field orientation="horizontal"><Switch defaultChecked /><FieldContent><span className="text-reading">说明性文字，轨道与它同高</span></FieldContent></Field>
    </div>
  );
}

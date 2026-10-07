import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Textarea } from "@qingye/ui/components/textarea";

export const meta = { title: "密度", titleEn: "Density" };

// 多行编辑的高度由 rows 与内容决定，密度只收紧容器与内边距。
export default function Demo() {
  return (
    <div className="grid w-full grid-cols-2 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <Textarea rows={3} defaultValue={"第一行文字。\n第二行文字。"} />
          </Field>
        </div>
      ))}
    </div>
  );
}

import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "密度", titleEn: "Density" };

// 填值控件只有一套几何，紧凑密度收紧容器，不改值文字（用户裁决 2026-10-05）。
export default function Demo() {
  return (
    <div className="grid w-full grid-cols-2 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <Input name={`device-${density}`} defaultValue="3 号楼东侧摄像头" />
          </Field>
        </div>
      ))}
    </div>
  );
}

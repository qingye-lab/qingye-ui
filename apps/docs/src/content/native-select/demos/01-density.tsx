import { Field, FieldControl, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { NativeSelect } from "@qingye_lab/ui/components/native-select";

export const meta = { title: "密度", titleEn: "Density" };

// 原生 size 只表示列表显示行数；单值形态的几何跟随密度轴。
export default function Demo() {
  return (
    <FieldGroup className="grid w-full grid-cols-2 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <FieldControl defaultValue="one" render={
              <NativeSelect>
                <option value="one">按名称排序</option>
                <option value="two">按时间排序</option>
              </NativeSelect>
            } />
          </Field>
        </div>
      ))}
    </FieldGroup>
  );
}

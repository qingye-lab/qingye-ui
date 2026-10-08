import { Field, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { Slider, SliderControl, SliderTrack, SliderIndicator, SliderThumb, SliderValue } from "@qingye_lab/ui/components/slider";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "密度", titleEn: "Density" } satisfies DemoMeta;

const control = <SliderControl><SliderTrack><SliderIndicator /><SliderThumb /></SliderTrack></SliderControl>;

// 滑块的工作高度跟随填值控件角色层；抓手跟随标签文字，密度不改它。
export default function Demo() {
  return (
    <FieldGroup className="grid w-full grid-cols-2 items-start gap-(--qy-section-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <Slider defaultValue={50}><div className="flex items-center justify-between gap-(--qy-field-gap)"><SliderValue /></div>{control}</Slider>
          </Field>
        </div>
      ))}
    </FieldGroup>
  );
}

import { useState } from "react";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Slider, SliderControl, SliderIndicator, SliderThumb, SliderTrack, SliderValue } from "@qingye_lab/ui/components/slider";

export const meta = { title: "有序区间", titleEn: "Ordered range" };

export default function Demo() {
  const [range, setRange] = useState<readonly number[]>([20, 80]);

  return <Field className="w-full max-w-sm">
    <Slider name="retention" value={range} onValueChange={setRange} min={0} max={100} step={5} minStepsBetweenValues={2} thumbCollisionBehavior="none">
      <div className="flex items-center justify-between gap-(--qy-field-gap)">
        <FieldLabel>保留区间</FieldLabel>
        <SliderValue className="text-body-strong">{(formatted: readonly string[]) => `${formatted[0]}–${formatted[1]} 天`}</SliderValue>
      </div>
      <SliderControl><SliderTrack><SliderIndicator /><SliderThumb index={0} aria-label="保留天数下限" /><SliderThumb index={1} aria-label="保留天数上限" /></SliderTrack></SliderControl>
    </Slider>
    <div className="flex justify-between text-caption text-muted-foreground"><span>0 天</span><span>100 天</span></div>
  </Field>;
}

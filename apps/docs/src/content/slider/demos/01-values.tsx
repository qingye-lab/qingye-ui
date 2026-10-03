import { useState } from "react";
import { FieldGroup } from "@qingye/ui/components/field";
import { Slider, SliderControl, SliderTrack, SliderIndicator, SliderThumb, SliderLabel, SliderValue } from "@qingye/ui/components/slider";

export const meta = { title: "数值与区间", titleEn: "Value and range" };
export default function Demo() {
  const [value, setValue] = useState(25); const [range, setRange] = useState<readonly number[]>([20, 80]);
  return <FieldGroup className="grid sm:grid-cols-2">
    <Slider name="value" value={value} onValueChange={setValue} min={0} max={100} step={5}><div className="flex items-center justify-between gap-(--qy-field-gap)"><SliderLabel>数值</SliderLabel><SliderValue /></div><SliderControl><SliderTrack><SliderIndicator /><SliderThumb /></SliderTrack></SliderControl></Slider>
    <Slider name="range" value={range} onValueChange={setRange} min={0} max={100} step={5} minStepsBetweenValues={2} thumbCollisionBehavior="none"><div className="flex items-center justify-between gap-(--qy-field-gap)"><SliderLabel>区间</SliderLabel><SliderValue>{formatted => formatted.join(" – ")}</SliderValue></div><SliderControl><SliderTrack><SliderIndicator /><SliderThumb index={0} aria-label="下限" /><SliderThumb index={1} aria-label="上限" /></SliderTrack></SliderControl></Slider>
  </FieldGroup>;
}

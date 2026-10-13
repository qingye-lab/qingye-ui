import { useState } from "react";
import { Field, FieldItem, FieldLabel } from "@qingye_lab/ui/components/field";
import { NumberField, NumberFieldGroup, NumberFieldInput } from "@qingye_lab/ui/components/number-field";
import { Slider, SliderControl, SliderIndicator, SliderThumb, SliderTrack, SliderValue } from "@qingye_lab/ui/components/slider";

export const meta = { title: "单位与精确输入", titleEn: "Unit and exact entry" };

export default function Demo() {
  const [threshold, setThreshold] = useState(60);

  return <Field className="w-full max-w-sm">
    {/* SliderValue 读 Slider 根的真实值，因此标签行必须在根之内。 */}
    <Slider name="threshold" value={threshold} onValueChange={setThreshold} min={0} max={100} step={5}>
      <div className="flex items-center justify-between gap-(--qy-field-gap)">
        <FieldLabel>告警阈值</FieldLabel>
        <SliderValue className="text-body-strong">{(formatted) => `${formatted}%`}</SliderValue>
      </div>
      <SliderControl><SliderTrack><SliderIndicator /><SliderThumb aria-label="告警阈值百分比" /></SliderTrack></SliderControl>
    </Slider>
    <div className="flex justify-between text-caption text-muted-foreground"><span>0%（每次同步都告警）</span><span>100%（从不告警）</span></div>
    {/* NumberField 的值可以是 null（空），只在有值时回写给滑块。FieldItem 给第二个控件自己的标签作用域，
     *  否则两个控件共用 Field 的 controlId。 */}
    <FieldItem className="items-center"><NumberField className="w-28" value={threshold} onValueChange={(next) => { if (next !== null) setThreshold(next); }} min={0} max={100} step={5}><NumberFieldGroup><NumberFieldInput aria-label="告警阈值，精确输入" /></NumberFieldGroup></NumberField><span className="text-support text-muted-foreground">%</span></FieldItem>
  </Field>;
}

import { FieldGroup } from "@qingye/ui/components/field";
import { Slider, SliderControl, SliderTrack, SliderIndicator, SliderThumb, SliderLabel, SliderValue, type SliderSize } from "@qingye/ui/components/slider";

export const meta = { title: "尺寸", titleEn: "Sizes" };
const sizes: SliderSize[] = ["xs", "sm", "md", "lg", "xl"];
export default function Demo() {
  return <FieldGroup>{sizes.map(size => <Slider key={size} size={size} defaultValue={50}><div className="flex items-center justify-between gap-(--qy-field-gap)"><SliderLabel>{size}</SliderLabel><SliderValue /></div><SliderControl><SliderTrack><SliderIndicator /><SliderThumb /></SliderTrack></SliderControl></Slider>)}</FieldGroup>;
}

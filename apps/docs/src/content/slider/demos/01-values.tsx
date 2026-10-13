import { Slider, SliderControl, SliderIndicator, SliderLabel, SliderThumb, SliderTrack, SliderValue } from "@qingye_lab/ui/components/slider";

export const meta = { title: "单个数值", titleEn: "One value" };

export default function Demo() {
  return <Slider defaultValue={60} min={0} max={100} step={5} className="w-full max-w-sm">
    <div className="flex items-center justify-between gap-(--qy-field-gap)">
      <SliderLabel>告警阈值</SliderLabel>
      <SliderValue>{(formatted) => `${formatted}%`}</SliderValue>
    </div>
    <SliderControl><SliderTrack><SliderIndicator /><SliderThumb /></SliderTrack></SliderControl>
  </Slider>;
}

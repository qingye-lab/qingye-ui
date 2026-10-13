import { Slider, SliderControl, SliderIndicator, SliderThumb, SliderTrack } from "@qingye_lab/ui/components/slider";

export default function Cover() {
  return <Slider defaultValue={60} min={0} max={100} step={5} className="w-full">
    <SliderControl><SliderTrack><SliderIndicator /><SliderThumb aria-label="阈值" /></SliderTrack></SliderControl>
  </Slider>;
}

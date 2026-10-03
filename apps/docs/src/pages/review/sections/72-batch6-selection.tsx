import CheckboxCollection from "@/content/checkbox-group/demos/01-selection";
import CheckboxStates from "@/content/checkbox-group/demos/02-states";
import TogglePressed from "@/content/toggle/demos/01-pressed";
import ToggleSizes from "@/content/toggle/demos/02-sizes";
import ToggleModes from "@/content/toggle-group/demos/01-modes";
import ToggleOrientation from "@/content/toggle-group/demos/02-orientation";
import SegmentValue from "@/content/segmented-control/demos/01-values";
import SegmentStates from "@/content/segmented-control/demos/02-states";
import SliderValues from "@/content/slider/demos/01-values";
import SliderStates from "@/content/slider/demos/02-states";
import SliderSizes from "@/content/slider/demos/03-sizes";

export default function Batch6SelectionReview() {
  return <section id="batch6-selection" className="grid gap-(--qy-section-gap) py-(--qy-section-gap)">
    <h2 className="text-chapter text-foreground">集合与区间输入</h2>
    <section className="grid gap-(--qy-field-group-gap)"><h3 className="text-heading text-foreground">CheckboxGroup</h3><CheckboxCollection /><CheckboxStates /></section>
    <section className="grid gap-(--qy-field-group-gap)"><h3 className="text-heading text-foreground">Toggle</h3><TogglePressed /><ToggleSizes /></section>
    <section className="grid gap-(--qy-field-group-gap)"><h3 className="text-heading text-foreground">ToggleGroup</h3><ToggleModes /><ToggleOrientation /></section>
    <section className="grid gap-(--qy-field-group-gap)"><h3 className="text-heading text-foreground">SegmentedControl</h3><SegmentValue /><SegmentStates /></section>
    <section className="grid gap-(--qy-field-group-gap)"><h3 className="text-heading text-foreground">Slider</h3><SliderValues /><SliderStates /><SliderSizes /></section>
  </section>;
}

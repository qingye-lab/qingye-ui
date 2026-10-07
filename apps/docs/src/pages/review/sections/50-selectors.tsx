import RadioSizes from "@/content/radio-group/demos/01-labels";
import RadioStates from "@/content/radio-group/demos/02-states";
import SelectSizes from "@/content/select/demos/01-density";
import SelectStates from "@/content/select/demos/02-states";

export default function SelectorsReview() {
  return (
    <section id="selectors-review" className="grid gap-(--qy-space-8) py-(--qy-space-8)">
      <h2 className="text-chapter text-foreground">RadioGroup / Select</h2>
      <section className="grid gap-(--qy-field-group-gap)">
        <h3 className="text-heading text-foreground">RadioGroup · 尺寸</h3>
        <RadioSizes />
      </section>
      <section className="grid gap-(--qy-field-group-gap)">
        <h3 className="text-heading text-foreground">RadioGroup · 状态</h3>
        <RadioStates />
      </section>
      <section className="grid gap-(--qy-field-group-gap)">
        <h3 className="text-heading text-foreground">Select · 尺寸</h3>
        <SelectSizes />
      </section>
      <section className="grid gap-(--qy-field-group-gap)">
        <h3 className="text-heading text-foreground">Select · 状态与分组</h3>
        <SelectStates />
      </section>
    </section>
  );
}

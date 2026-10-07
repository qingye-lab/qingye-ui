import Calendar from "@/content/calendar/demos/01-single";
import CalendarRange from "@/content/calendar/demos/02-range";
import Date from "@/content/date-picker/demos/01-date";
import DateSizes from "@/content/date-picker/demos/02-density";
import Range from "@/content/date-range-picker/demos/01-range";
import RangeStates from "@/content/date-range-picker/demos/02-states";
import DateTime from "@/content/date-time-picker/demos/01-datetime";
import DateTimeStates from "@/content/date-time-picker/demos/02-states";
import Choice from "@/content/combobox/demos/01-choice";
import ChoiceSizes from "@/content/combobox/demos/02-density";
import Text from "@/content/autocomplete/demos/01-text";
import TextSizes from "@/content/autocomplete/demos/02-density";
export default function Batch10DateInputReview() {
  return <section id="batch10-date-input" className="grid gap-(--qy-section-gap) py-(--qy-section-gap)">
    <h2 className="text-chapter text-foreground">日期与候选输入</h2>
    <section className="grid gap-(--qy-field-group-gap)"><h3 className="text-heading text-foreground">Calendar</h3><div className="flex flex-wrap gap-(--qy-section-gap)"><Calendar /><CalendarRange /></div></section>
    <section className="grid gap-(--qy-field-group-gap)"><h3 className="text-heading text-foreground">DatePicker</h3><Date /><DateSizes /></section>
    <section className="grid gap-(--qy-field-group-gap)"><h3 className="text-heading text-foreground">DateRangePicker</h3><Range /><RangeStates /></section>
    <section className="grid gap-(--qy-field-group-gap)"><h3 className="text-heading text-foreground">DateTimePicker</h3><DateTime /><DateTimeStates /></section>
    <section className="grid gap-(--qy-field-group-gap)"><h3 className="text-heading text-foreground">Combobox</h3><Choice /><ChoiceSizes /></section>
    <section className="grid gap-(--qy-field-group-gap)"><h3 className="text-heading text-foreground">Autocomplete</h3><Text /><TextSizes /></section>
  </section>;
}

import Copy from "@/content/copy-button/demos/01-copy";
import CopySizes from "@/content/copy-button/demos/02-sizes";
import Scroll from "@/content/scroll-area/demos/01-vertical";
import Horizontal from "@/content/scroll-area/demos/02-horizontal";
import Locale from "@/content/locale-switch/demos/01-provider";
import LocaleSizes from "@/content/locale-switch/demos/02-density";
import Window from "@/content/virtual-list/demos/01-window";
import Focus from "@/content/virtual-list/demos/02-focus";
export default function Batch8ToolsReview() {
  return <section id="batch8-tools" className="grid gap-(--qy-section-gap) py-(--qy-section-gap)">
    <h2 className="text-chapter text-foreground">工具</h2>
    <section className="grid gap-(--qy-field-group-gap)"><h3 className="text-heading text-foreground">CopyButton</h3><Copy /><CopySizes /></section>
    <section className="grid gap-(--qy-field-group-gap)"><h3 className="text-heading text-foreground">ScrollArea</h3><Scroll /><Horizontal /></section>
    <section className="grid gap-(--qy-field-group-gap)"><h3 className="text-heading text-foreground">LocaleSwitch</h3><Locale /><LocaleSizes /></section>
    <section className="grid gap-(--qy-field-group-gap)"><h3 className="text-heading text-foreground">VirtualList</h3><Window /><Focus /></section>
  </section>;
}

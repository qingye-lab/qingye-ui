import { useState } from "react";
import { BoldIcon } from "lucide-react";
import { Toggle } from "@qingye/ui/components/toggle";

export const meta = { title: "按压", titleEn: "Pressed" };
export default function Demo() {
  const [pressed, setPressed] = useState(false);
  return <div className="flex flex-wrap items-center gap-(--qy-action-gap)">
    <Toggle pressed={pressed} onPressedChange={setPressed}>加粗</Toggle>
    <Toggle shape="icon" aria-label="斜体">I</Toggle>
    <Toggle disabled defaultPressed><BoldIcon aria-hidden="true" />加粗</Toggle>
    <span className={pressed ? "text-body-strong text-foreground" : "text-body text-foreground"}>Aa 字</span>
  </div>;
}

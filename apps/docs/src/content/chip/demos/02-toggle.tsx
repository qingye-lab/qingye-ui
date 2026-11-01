import { useState } from "react";
import { ChipToggle } from "@qingye_lab/ui/components/chip";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "可开关", titleEn: "Toggleable" };

export default function Demo() {
  const { code } = useUILocale(); const en = code.startsWith("en");
  const options = en ? ["Unread", "Starred", "Attachments", "Mentions"] : ["未读", "加星", "含附件", "提到我"];
  const [pressed, setPressed] = useState<string[]>([options[0]!]);
  return <div role="group" aria-label={en ? "Filters" : "筛选"} className="flex flex-wrap gap-(--qy-space-2)">
    {options.map(option => <ChipToggle key={option} pressed={pressed.includes(option)} onPressedChange={next => setPressed(next ? [...pressed, option] : pressed.filter(other => other !== option))}>{option}</ChipToggle>)}
    <ChipToggle disabled>{en ? "Unavailable" : "不可用"}</ChipToggle>
  </div>;
}

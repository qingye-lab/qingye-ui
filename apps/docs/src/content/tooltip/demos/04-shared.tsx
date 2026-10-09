import { useMemo, useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Tooltip, TooltipCreateHandle, TooltipPopup, TooltipTrigger } from "@qingye_lab/ui/components/tooltip";
import { IconAlignCenter, IconAlignLeft, IconAlignRight } from "@tabler/icons-react";

export const meta = { title: "段落对齐", titleEn: "Aligning a paragraph" };

const items = [
  { value: "left", label: "左对齐", detail: "段落靠左边缘排列", icon: IconAlignLeft },
  { value: "center", label: "居中对齐", detail: "段落沿中央排列", icon: IconAlignCenter },
  { value: "right", label: "右对齐", detail: "段落靠右边缘排列", icon: IconAlignRight },
] as const;

export default function Demo() {
  const handle = useMemo(() => TooltipCreateHandle<string>(), []);
  const [align, setAlign] = useState<"left" | "center" | "right">("left");
  return <div className="flex flex-col gap-(--qy-field-group-gap)"><div role="group" aria-label="段落对齐" className="flex gap-(--qy-action-gap)">{items.map(({ value, label, detail, icon: Icon }) => <TooltipTrigger handle={handle} key={value} payload={detail} render={<Button variant="quiet" shape="icon" aria-label={label} aria-pressed={align === value} onClick={() => setAlign(value)} />}><Icon aria-hidden="true" /></TooltipTrigger>)}</div><Tooltip handle={handle}>{({ payload }) => <TooltipPopup>{payload}</TooltipPopup>}</Tooltip><p className="text-body text-foreground" style={{ textAlign: align }}>青野组件库，器用为本。</p></div>;
}

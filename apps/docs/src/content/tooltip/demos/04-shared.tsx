import { useMemo, useState } from "react";
import { Button } from "@qingye/ui/components/button";
import { Tooltip, TooltipCreateHandle, TooltipPopup, TooltipTrigger } from "@qingye/ui/components/tooltip";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";

export const meta = { title: "段落对齐" };

const items = [
  { value: "left", label: "左对齐", detail: "段落靠左边缘排列", icon: AlignLeftIcon },
  { value: "center", label: "居中对齐", detail: "段落沿中央排列", icon: AlignCenterIcon },
  { value: "right", label: "右对齐", detail: "段落靠右边缘排列", icon: AlignRightIcon },
] as const;

export default function Demo() {
  const handle = useMemo(() => TooltipCreateHandle<string>(), []);
  const [align, setAlign] = useState<"left" | "center" | "right">("left");
  return <div className="flex flex-col gap-(--qy-field-group-gap)"><div role="group" aria-label="段落对齐" className="flex gap-(--qy-action-gap)">{items.map(({ value, label, detail, icon: Icon }) => <TooltipTrigger handle={handle} key={value} payload={detail} render={<Button variant="quiet" shape="icon" aria-label={label} aria-pressed={align === value} onClick={() => setAlign(value)} />}><Icon aria-hidden="true" /></TooltipTrigger>)}</div><Tooltip handle={handle}>{({ payload }) => <TooltipPopup>{payload}</TooltipPopup>}</Tooltip><p className="text-body text-foreground" style={{ textAlign: align }}>青野组件库，器用为本。</p></div>;
}

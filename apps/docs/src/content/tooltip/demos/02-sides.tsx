import { Button } from "@qingye_lab/ui/components/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye_lab/ui/components/tooltip";

export const meta = { title: "位置", titleEn: "Placement" };

const places = [
  { side: "top", label: "上方" },
  { side: "right", label: "右侧" },
  { side: "bottom", label: "下方" },
  { side: "left", label: "左侧" },
] as const;

export default function Demo() {
  return <div className="flex gap-(--qy-action-gap)">{places.map(({ side, label }) => <Tooltip key={side}><TooltipTrigger render={<Button variant="quiet" />}>{label}</TooltipTrigger><TooltipPopup side={side}>{side}</TooltipPopup></Tooltip>)}</div>;
}

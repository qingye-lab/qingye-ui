import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
import { Popover, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye_lab/ui/components/popover";

export const meta = { title: "位置", titleEn: "Placement" };

const places = [
  { side: "top", label: "上方" },
  { side: "inline-end", label: "行尾" },
  { side: "bottom", label: "下方" },
  { side: "inline-start", label: "行首" },
] as const;

export default function Demo() {
  return (
    <Inline className="justify-center">
      {places.map(({ side, label }) => (
        <Popover key={label}>
          <PopoverTrigger render={<Button variant="quiet" />}>{label}</PopoverTrigger>
          <PopoverPopup side={side}>
            <PopoverTitle>{label}</PopoverTitle>
          </PopoverPopup>
        </Popover>
      ))}
    </Inline>
  );
}

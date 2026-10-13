import { Button } from "@qingye_lab/ui/components/button";
import { Popover, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye_lab/ui/components/popover";

export default function Cover() {
  return <Popover>
    <PopoverTrigger render={<Button variant="bordered" />}>编辑备注</PopoverTrigger>
    <PopoverPopup><PopoverTitle>编辑备注</PopoverTitle></PopoverPopup>
  </Popover>;
}

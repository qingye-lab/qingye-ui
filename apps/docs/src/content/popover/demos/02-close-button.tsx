import { Button } from "@qingye/ui/components/button";
import { Inline, Stack } from "@qingye/ui/components/layout";
import { Popover, PopoverClose, PopoverDescription, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye/ui/components/popover";
import { InfoIcon, XIcon } from "lucide-react";

export const meta = { title: "关闭按钮", titleEn: "Close button" };

export default function Demo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button aria-label="详细信息" shape="icon" variant="quiet" />}><InfoIcon aria-hidden="true" /></PopoverTrigger>
      <PopoverPopup className="w-72">
        <Stack gap="panel">
          <Inline gap="panel" className="justify-between">
            <PopoverTitle>青野 Qingye UI</PopoverTitle>
            <PopoverClose aria-label="关闭" render={<Button shape="icon" size="sm" variant="quiet" />}><XIcon aria-hidden="true" /></PopoverClose>
          </Inline>
          <PopoverDescription>React 组件库</PopoverDescription>
        </Stack>
      </PopoverPopup>
    </Popover>
  );
}

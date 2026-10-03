import { Button } from "@qingye/ui/components/button";
import { Inline, Stack } from "@qingye/ui/components/layout";
import { Popover, PopoverClose, PopoverCreateHandle, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye/ui/components/popover";
import { useMemo } from "react";

export const meta = { title: "共享面板", titleEn: "Shared popup" };

export default function Demo() {
  const handle = useMemo(() => PopoverCreateHandle<string>(), []);
  return (
    <Inline>
      <PopoverTrigger handle={handle} payload="第一项" render={<Button variant="quiet" />}>第一项</PopoverTrigger>
      <PopoverTrigger handle={handle} payload="第二项" render={<Button variant="quiet" />}>第二项</PopoverTrigger>
      <Popover handle={handle}>
        {({ payload }) => (
          <PopoverPopup>
            <Stack gap="panel">
              <PopoverTitle>{payload}</PopoverTitle>
              <PopoverClose render={<Button size="sm" variant="quiet" />}>关闭</PopoverClose>
            </Stack>
          </PopoverPopup>
        )}
      </Popover>
    </Inline>
  );
}

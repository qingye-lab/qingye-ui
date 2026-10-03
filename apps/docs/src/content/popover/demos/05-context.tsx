import { Button } from "@qingye/ui/components/button";
import { Stack } from "@qingye/ui/components/layout";
import { Popover, PopoverClose, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye/ui/components/popover";
import { useRef } from "react";

import { Text } from "@qingye/ui/components/typography";

export const meta = { title: "局部语言与密度", titleEn: "Local language and density" };

export default function Demo() {
  const context = useRef<HTMLDivElement>(null);
  return (
    <div data-density="compact" dir="rtl" lang="ar" ref={context}>
      <Popover>
        <PopoverTrigger render={<Button variant="quiet" />}>فتح</PopoverTrigger>
        <PopoverPopup portalProps={{ container: context }}>
          <Stack gap="panel">
            <PopoverTitle>ملاحظة</PopoverTitle>
            <Text>نص قصير.</Text>
            <PopoverClose render={<Button size="sm" variant="quiet" />}>إغلاق</PopoverClose>
          </Stack>
        </PopoverPopup>
      </Popover>
    </div>
  );
}

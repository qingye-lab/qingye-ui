import { Button } from "@qingye_lab/ui/components/button";
import { IconDeviceFloppy } from "@tabler/icons-react";

export const meta = { title: "忙碌与禁用", titleEn: "Busy and disabled" };

export default function Demo() {
  return (
    <div className="grid w-full gap-(--qy-section-gap)">
      <div className="flex flex-wrap gap-(--qy-action-gap)">
        <Button>保存</Button>
        <Button loading>保存</Button>
        <Button disabled>保存</Button>
      </div>
      <div className="flex flex-wrap gap-(--qy-action-gap)">
        <Button aria-label="保存" shape="icon" variant="quiet"><IconDeviceFloppy aria-hidden="true" /></Button>
        <Button aria-label="保存" loading shape="icon" variant="quiet"><IconDeviceFloppy aria-hidden="true" /></Button>
        <Button aria-label="保存" disabled shape="icon" variant="quiet"><IconDeviceFloppy aria-hidden="true" /></Button>
      </div>
    </div>
  );
}

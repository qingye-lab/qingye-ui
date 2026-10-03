import { Button } from "@qingye/ui/components/button";
import { SaveIcon } from "lucide-react";

export const meta = { title: "状态", titleEn: "States" };

export default function Demo() {
  return (
    <div className="grid w-full gap-(--qy-section-gap)">
      <div className="flex flex-wrap gap-(--qy-action-gap)">
        {(["idle", "waiting", "in-progress", "unknown", "failed"] as const).map((state) => (
          <Button key={state} state={state}>保存</Button>
        ))}
        <Button disabled>保存</Button>
      </div>
      <div className="flex flex-wrap gap-(--qy-action-gap)">
        {(["waiting", "in-progress", "unknown", "failed"] as const).map((state) => (
          <Button aria-label="保存" key={state} shape="icon" state={state} variant="quiet"><SaveIcon aria-hidden="true" /></Button>
        ))}
        <Button aria-label="保存" disabled shape="icon" variant="quiet"><SaveIcon aria-hidden="true" /></Button>
      </div>
    </div>
  );
}

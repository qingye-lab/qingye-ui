import { Button } from "@qingye/ui/components/button";
import { Disclosure, DisclosurePanel, DisclosureTrigger } from "@qingye/ui/components/disclosure";
import { useState } from "react";

export const meta = {
  title: "受控与禁用",
  description: "open 与 onOpenChange 由外部控制；disabled 时标题置灰且不可展开。",
};

export default function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex gap-2">
        <Button onClick={() => setOpen(true)} size="sm" variant="outline">
          展开
        </Button>
        <Button onClick={() => setOpen(false)} size="sm" variant="outline">
          收起
        </Button>
      </div>
      <Disclosure onOpenChange={setOpen} open={open}>
        <DisclosureTrigger>退款规则</DisclosureTrigger>
        <DisclosurePanel className="text-muted-foreground text-sm">
          购买后 7 天内未使用可全额退款，超过 7 天按剩余时长折算。
        </DisclosurePanel>
      </Disclosure>
      <Disclosure disabled>
        <DisclosureTrigger>发票信息（付款后可填写）</DisclosureTrigger>
        <DisclosurePanel>—</DisclosurePanel>
      </Disclosure>
    </div>
  );
}

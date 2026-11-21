import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
import { Popover, PopoverDescription, PopoverPopup, PopoverTrigger } from "@qingye_lab/ui/components/popover";

// 指南 tooltip.md：需要点击帮助或交互内容时用 Popover
export function BillingHelp() {
  return (
    <Inline gap="panel" align="center">
      <span>¥99/月</span>
      <Popover>
        <PopoverTrigger render={<Button aria-label="计费说明" shape="icon" variant="quiet" />}><span aria-hidden="true">?</span></PopoverTrigger>
        <PopoverPopup className="w-72">
          <PopoverDescription>按自然月计费，月中升级按天折算</PopoverDescription>
          <a href="/docs/billing">查看计费规则</a>
        </PopoverPopup>
      </Popover>
    </Inline>
  );
}

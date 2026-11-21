import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye_lab/ui/components/tooltip";

// DN 自然解：把说明与链接放进 Tooltip
export function BillingHelp() {
  return (
    <Inline gap="panel" align="center">
      <span>¥99/月</span>
      <Tooltip>
        <TooltipTrigger render={<Button aria-label="计费说明" shape="icon" variant="quiet" />}><span aria-hidden="true">?</span></TooltipTrigger>
        <TooltipPopup>按自然月计费，月中升级按天折算 <a href="/docs/billing">查看计费规则</a></TooltipPopup>
      </Tooltip>
    </Inline>
  );
}

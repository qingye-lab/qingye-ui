import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";

// 说明放进 title 属性（原生悬停提示），链接常驻在按钮旁
export function BillingHelp() {
  return (
    <Inline gap="panel" align="center">
      <span>¥99/月</span>
      <Button aria-label="计费说明" shape="icon" variant="quiet" title="按自然月计费，月中升级按天折算"><span aria-hidden="true">?</span></Button>
      <a href="/docs/billing">查看计费规则</a>
    </Inline>
  );
}

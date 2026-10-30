import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Tooltip, TooltipPopup, TooltipProvider, TooltipTrigger } from "@qingye_lab/ui/components/tooltip";
import { useCopyToClipboard } from "@qingye_lab/ui/hooks/use-copy-to-clipboard";

const sides = ["top", "right", "bottom", "left"] as const;
const labels = { top: "上", right: "右", bottom: "下", left: "左" };

export default function TooltipReview() {
  // 复制的状态与 http 下的回退由库的 hook 持有；失败由 onError 报告，不静默。
  const [failed, setFailed] = useState(false);
  const { copyToClipboard, isCopied, isCopying } = useCopyToClipboard({ onCopy: () => setFailed(false), onError: () => setFailed(true) });
  return (
    <section id="tooltip-review" className="border-t border-border py-(--qy-section-gap)">
      <h2 className="text-heading text-foreground">Tooltip · 方位与触发</h2>
      <TooltipProvider delay={600}>
        <div className="mt-(--qy-field-group-gap) flex gap-(--qy-action-gap)">
          {sides.map((side) => <Tooltip key={side}><TooltipTrigger render={<Button variant="bordered" />}>{labels[side]}</TooltipTrigger><TooltipPopup side={side}>补充文字</TooltipPopup></Tooltip>)}
          <Tooltip><TooltipTrigger render={<Button variant="bordered" disabled />}>禁用</TooltipTrigger><TooltipPopup>补充文字</TooltipPopup></Tooltip>
        </div>
        <div className="mt-(--qy-field-group-gap) flex items-center gap-(--qy-action-gap)">
          <code className="select-all text-body text-foreground">青野 UI</code>
          <Tooltip>
            <TooltipTrigger render={<Button variant="quiet" loading={isCopying} onClick={() => copyToClipboard("青野 UI")} />}>复制</TooltipTrigger>
            <TooltipPopup>复制「青野 UI」</TooltipPopup>
          </Tooltip>
          <p role="status" className="text-support text-foreground">{isCopying ? "正在复制" : isCopied ? "已复制" : failed ? "未复制，请手动复制。" : ""}</p>
        </div>
      </TooltipProvider>
    </section>
  );
}

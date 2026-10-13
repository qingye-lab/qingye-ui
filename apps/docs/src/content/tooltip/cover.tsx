import { IconBold, IconItalic } from "@tabler/icons-react";
import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye_lab/ui/components/tooltip";

export default function Cover() {
  return <Inline>
    <Tooltip>
      <TooltipTrigger render={<Button variant="quiet" shape="icon" aria-label="粗体" />}><IconBold aria-hidden="true" /></TooltipTrigger>
      <TooltipPopup>强调项目名称</TooltipPopup>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger render={<Button variant="quiet" shape="icon" aria-label="斜体" />}><IconItalic aria-hidden="true" /></TooltipTrigger>
      <TooltipPopup>标记作品名称或引用</TooltipPopup>
    </Tooltip>
  </Inline>;
}

import { Button } from "@qingye_lab/ui/components/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye_lab/ui/components/tooltip";
import { IconBold } from "@tabler/icons-react";

export const meta = { title: "图标按钮", titleEn: "Icon button" };

export default function Demo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="quiet" shape="icon" aria-label="粗体" />}><IconBold aria-hidden="true" /></TooltipTrigger>
      <TooltipPopup>粗体</TooltipPopup>
    </Tooltip>
  );
}

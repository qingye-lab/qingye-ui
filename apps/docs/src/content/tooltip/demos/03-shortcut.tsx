import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye_lab/ui/components/tooltip";
import { IconBold } from "@tabler/icons-react";

export const meta = { title: "快捷键", titleEn: "Keyboard shortcut" };

export default function Demo() {
  const [bold, setBold] = useState(false);
  return (
    <div className="flex items-center gap-(--qy-field-group-gap)" onKeyDown={(event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "b") {
        event.preventDefault();
        setBold((value) => !value);
      }
    }}>
      <Tooltip>
        <TooltipTrigger render={<Button aria-label="粗体" aria-pressed={bold} variant="quiet" shape="icon" onClick={() => setBold((value) => !value)} />}><IconBold aria-hidden="true" /></TooltipTrigger>
        <TooltipPopup><kbd>⌘B / Ctrl+B</kbd></TooltipPopup>
      </Tooltip>
      <p className="text-body text-foreground">{bold ? <strong>让器物服务于人</strong> : "让器物服务于人"}</p>
    </div>
  );
}

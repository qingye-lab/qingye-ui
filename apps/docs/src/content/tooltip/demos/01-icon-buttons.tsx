import { useState } from "react";
import { Button } from "@qingye/ui/components/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye/ui/components/tooltip";
import { BoldIcon, ItalicIcon } from "lucide-react";

export const meta = { title: "文字格式" };

export default function Demo() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  return (
    <div className="flex flex-col gap-(--qy-field-group-gap)">
      <div className="flex gap-(--qy-action-gap)">
        <Tooltip>
          <TooltipTrigger render={<Button variant="quiet" shape="icon" aria-label="粗体" aria-pressed={bold} onClick={() => setBold(!bold)} />}><BoldIcon aria-hidden="true" /></TooltipTrigger>
          <TooltipPopup>强调项目名称</TooltipPopup>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="quiet" shape="icon" aria-label="斜体" aria-pressed={italic} onClick={() => setItalic(!italic)} />}><ItalicIcon aria-hidden="true" /></TooltipTrigger>
          <TooltipPopup>标记作品名称或引用</TooltipPopup>
        </Tooltip>
      </div>
      <p className="text-body text-foreground" aria-live="polite">{bold ? <strong>{italic ? <em>青野组件库</em> : "青野组件库"}</strong> : italic ? <em>青野组件库</em> : "青野组件库"}</p>
    </div>
  );
}

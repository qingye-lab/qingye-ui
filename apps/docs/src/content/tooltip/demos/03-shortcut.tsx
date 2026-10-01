import { Button } from "@qingye/ui/components/button";
import { Kbd, KbdGroup } from "@qingye/ui/components/kbd";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye/ui/components/tooltip";
import { SaveIcon, SearchIcon } from "lucide-react";

export const meta = { title: "附带快捷键", description: "在提示里用 Kbd 标出快捷键，帮助用户逐步记住。" };

export default function Demo() {
  return (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger render={<Button aria-label="搜索" size="icon" variant="outline" />}>
          <SearchIcon />
        </TooltipTrigger>
        <TooltipPopup>
          <span className="flex items-center gap-2">
            搜索
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </span>
        </TooltipPopup>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          <SaveIcon />
          保存草稿
        </TooltipTrigger>
        <TooltipPopup>
          <span className="flex items-center gap-2">
            保存到本机
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>S</Kbd>
            </KbdGroup>
          </span>
        </TooltipPopup>
      </Tooltip>
    </div>
  );
}

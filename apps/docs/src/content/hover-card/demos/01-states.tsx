import { HoverCard, HoverCardPopup, HoverCardTrigger } from "@qingye_lab/ui/components/hover-card";
import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
export const meta = { title: "悬停与焦点", titleEn: "Hover and focus" };
export default function HoverCardDemo() {
  return <Inline gap="fields"><HoverCard><HoverCardTrigger href="#hover-card-target">内容入口</HoverCardTrigger><HoverCardPopup>补充内容</HoverCardPopup></HoverCard><Button variant="quiet">下一控件</Button><span id="hover-card-target" className="text-body">内容</span></Inline>;
}

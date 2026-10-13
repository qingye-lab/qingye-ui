import { HoverCard, HoverCardPopup, HoverCardTrigger } from "@qingye_lab/ui/components/hover-card";

export default function Cover() {
  return <HoverCard><HoverCardTrigger href="#detail">内容入口</HoverCardTrigger><HoverCardPopup>补充内容</HoverCardPopup></HoverCard>;
}

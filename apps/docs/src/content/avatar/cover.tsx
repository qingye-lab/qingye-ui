import { Avatar, AvatarFallback } from "@qingye_lab/ui/components/avatar";
import { Inline } from "@qingye_lab/ui/components/layout";

export default function Cover() {
  return <Inline>
    <Avatar label="陈致远"><AvatarFallback>陈</AvatarFallback></Avatar>
    <Avatar label="李一鸣"><AvatarFallback>李</AvatarFallback></Avatar>
    <Avatar label="Wen Zhang"><AvatarFallback>W</AvatarFallback></Avatar>
  </Inline>;
}

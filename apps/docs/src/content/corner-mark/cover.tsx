import { Avatar, AvatarFallback } from "@qingye_lab/ui/components/avatar";
import { Button } from "@qingye_lab/ui/components/button";
import { CornerMark } from "@qingye_lab/ui/components/corner-mark";
import { Inline } from "@qingye_lab/ui/components/layout";
import { IconBell } from "@tabler/icons-react";

export default function Cover() {
  return <Inline gap="panel">
    <CornerMark count={3} label="3 条未读"><Button variant="bordered" shape="icon" aria-label="通知"><IconBell aria-hidden="true" /></Button></CornerMark>
    <CornerMark dot tone="success" label="在线"><Avatar label="陈致远"><AvatarFallback>陈</AvatarFallback></Avatar></CornerMark>
  </Inline>;
}

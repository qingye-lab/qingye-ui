import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@yanqing/ui/components/avatar";
import { Button } from "@yanqing/ui/components/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@yanqing/ui/components/empty";
import { SendIcon } from "lucide-react";

export const meta = { title: "头像组", description: "默认变体不加修饰，可以放头像组或插画。" };

export default function Demo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <AvatarGroup>
            <Avatar size="lg">
              <AvatarImage alt="" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces" />
              <AvatarFallback>林</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarImage alt="" src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=96&h=96&fit=crop&crop=faces" />
              <AvatarFallback>周</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>陈</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </EmptyMedia>
        <EmptyTitle>#发布协调 还没有消息</EmptyTitle>
        <EmptyDescription>林晓雯、周子航和陈思远都在这里，打个招呼吧。</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">
          <SendIcon aria-hidden="true" />
          发送消息
        </Button>
      </EmptyContent>
    </Empty>
  );
}

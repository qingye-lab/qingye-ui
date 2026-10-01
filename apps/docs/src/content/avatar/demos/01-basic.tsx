import { Avatar, AvatarFallback, AvatarImage } from "@qingye/ui/components/avatar";
import { UserIcon } from "lucide-react";

export const meta = {
  title: "图片与回退",
  description: "没有图片或图片加载失败时显示 AvatarFallback，通常放姓氏或图标。",
};

export default function Demo() {
  return (
    <>
      <Avatar>
        <AvatarImage
          alt="林晓雯"
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces"
        />
        <AvatarFallback>林</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>周</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>
          <UserIcon aria-hidden="true" className="size-4 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
    </>
  );
}

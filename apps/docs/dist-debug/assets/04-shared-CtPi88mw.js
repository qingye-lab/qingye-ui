const n=`import { Avatar, AvatarFallback } from "@qingye/ui/components/avatar";
import { Button } from "@qingye/ui/components/button";
import { Popover, PopoverCreateHandle, PopoverDescription, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye/ui/components/popover";
import { BellIcon, UserIcon } from "lucide-react";
import type { ComponentType } from "react";

export const meta = {
  title: "多个触发器共用浮层",
  description: "通过 handle 共用一个浮层，在触发器之间切换时，浮层平滑移动并变换尺寸。",
};

const handle = PopoverCreateHandle<ComponentType>();

function Notifications() {
  return (
    <div className="grid gap-1.5">
      <PopoverTitle className="text-base">通知</PopoverTitle>
      <PopoverDescription>暂时没有新的通知。</PopoverDescription>
    </div>
  );
}

function Profile() {
  return (
    <div className="grid w-52 gap-3">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>林</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <PopoverTitle className="truncate font-medium text-sm">林嘉禾</PopoverTitle>
          <PopoverDescription className="text-xs">产品设计师</PopoverDescription>
        </div>
      </div>
      <Button size="sm" variant="outline">
        退出登录
      </Button>
    </div>
  );
}

export default function Demo() {
  return (
    <div className="flex gap-2">
      <PopoverTrigger handle={handle} payload={Notifications} render={<Button aria-label="通知" size="icon" variant="outline" />}>
        <BellIcon />
      </PopoverTrigger>
      <PopoverTrigger handle={handle} payload={Profile} render={<Button aria-label="个人资料" size="icon" variant="outline" />}>
        <UserIcon />
      </PopoverTrigger>
      <Popover handle={handle}>
        {({ payload: Content }) => <PopoverPopup>{Content ? <Content /> : null}</PopoverPopup>}
      </Popover>
    </div>
  );
}
`;export{n as default};

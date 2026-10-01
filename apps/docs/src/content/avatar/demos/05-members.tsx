import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@yanqing/ui";
import { UserPlusIcon } from "lucide-react";

export const meta = { title: "组合：成员列表", description: "头像旁已有姓名时，图片 alt 留空，避免读屏重复朗读。" };

const members = [
  {
    name: "林晓雯",
    email: "linxiaowen@yanqing.cn",
    role: "所有者",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces",
  },
  {
    name: "周子航",
    email: "zhouzihang@yanqing.cn",
    role: "管理员",
    src: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=96&h=96&fit=crop&crop=faces",
  },
  { name: "陈思远", email: "chensiyuan@yanqing.cn", role: "成员" },
  {
    name: "沈若溪",
    email: "shenruoxi@yanqing.cn",
    role: "成员",
    src: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?w=96&h=96&fit=crop&crop=faces",
  },
];

export default function Demo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>成员</CardTitle>
        <CardDescription>4 人可以访问此项目</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">
            <UserPlusIcon aria-hidden="true" />
            邀请
          </Button>
        </CardAction>
      </CardHeader>
      <CardPanel>
        <ul className="-my-3 divide-y">
          {members.map((member) => (
            <li key={member.email} className="flex items-center gap-3 py-3">
              <Avatar>
                {member.src ? <AvatarImage alt="" src={member.src} /> : null}
                <AvatarFallback>{member.name.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="font-medium text-sm leading-none">{member.name}</span>
                <span className="truncate text-muted-foreground text-xs leading-none">{member.email}</span>
              </div>
              <Badge variant={member.role === "成员" ? "outline" : "secondary"}>{member.role}</Badge>
            </li>
          ))}
        </ul>
      </CardPanel>
    </Card>
  );
}

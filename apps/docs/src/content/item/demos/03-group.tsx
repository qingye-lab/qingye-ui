import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  ItemGroup,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@yanqing/ui";
import { XIcon } from "lucide-react";
import { Fragment } from "react";

export const meta = { title: "成员列表", description: "ItemGroup + ItemSeparator 组成列表；操作按钮的 aria-label 写明对象。" };

const members = [
  { name: "林嘉怡", initials: "林", email: "linjiayi@yanqing.cn", role: "店长" },
  { name: "周子航", initials: "周", email: "zhouzihang@yanqing.cn", role: "收银" },
  { name: "陈思远", initials: "陈", email: "chensiyuan@yanqing.cn", role: "后厨" },
];

export default function Demo() {
  return (
    <Card className="w-full max-w-lg gap-0">
      <CardHeader>
        <CardTitle>门店成员</CardTitle>
        <CardDescription>徐汇漕溪北路店 · 3 人</CardDescription>
      </CardHeader>
      <ItemGroup className="px-2 pb-2">
        {members.map((member, index) => (
          <Fragment key={member.email}>
            {index > 0 ? <ItemSeparator className="mx-2 w-auto" /> : null}
            <Item size="sm">
              <ItemMedia variant="avatar">
                <Avatar>
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  {member.name}
                  {index === 0 ? <Badge variant="secondary">{member.role}</Badge> : null}
                </ItemTitle>
                <ItemDescription className="truncate">{member.email}</ItemDescription>
              </ItemContent>
              <ItemActions>
                {index === 0 ? null : (
                  <Button aria-label={`移除 ${member.name}`} size="icon-sm" variant="ghost">
                    <XIcon />
                  </Button>
                )}
              </ItemActions>
            </Item>
          </Fragment>
        ))}
      </ItemGroup>
    </Card>
  );
}

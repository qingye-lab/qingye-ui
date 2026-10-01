import { Avatar, AvatarFallback } from "@yanqing/ui/components/avatar";
import { Grid, Inline, Stack, Text } from "@yanqing/ui/components/layout";

export const meta = {
  title: "按容器自适应",
  description: "minItemWidth=\"12rem\"：按容器宽度放下尽可能多的列，适合宽度不确定的区域。",
};

const members = [
  { name: "林晓", role: "设计负责人" },
  { name: "周舟", role: "前端工程师" },
  { name: "陈默", role: "后端工程师" },
  { name: "许诺", role: "产品经理" },
  { name: "王一然", role: "测试工程师" },
];

export default function Demo() {
  return (
    <Grid as="ul" aria-label="团队成员" className="w-full" gap={3} minItemWidth="12rem">
      {members.map((member) => (
        <Inline as="li" className="rounded-xl border p-3" gap={3} key={member.name} wrap={false}>
          <Avatar>
            <AvatarFallback>{member.name.slice(-1)}</AvatarFallback>
          </Avatar>
          <Stack className="min-w-0" gap={0}>
            <Text className="truncate font-medium">{member.name}</Text>
            <Text className="truncate" size="caption" tone="muted">
              {member.role}
            </Text>
          </Stack>
        </Inline>
      ))}
    </Grid>
  );
}

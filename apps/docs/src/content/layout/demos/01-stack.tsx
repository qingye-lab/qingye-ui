import { Button, Input, Label, Stack, Text } from "@yanqing/ui";

export const meta = { title: "Stack", description: "表单字段纵向排列：外层 gap 5 分隔字段，内层 gap 2 连接标签与输入。" };

export default function Demo() {
  return (
    <Stack as="form" className="w-full max-w-sm" gap={5} onSubmit={(event) => event.preventDefault()}>
      <Stack gap={2}>
        <Label htmlFor="team-name">团队名称</Label>
        <Input defaultValue="青烟科技" id="team-name" />
      </Stack>
      <Stack gap={2}>
        <Label htmlFor="team-slug">团队地址</Label>
        <Input defaultValue="qingyan" id="team-slug" />
        <Text size="caption" tone="muted">
          成员通过 qingyan.tech/qingyan 访问团队主页。
        </Text>
      </Stack>
      <Button className="self-start" type="submit">
        保存
      </Button>
    </Stack>
  );
}

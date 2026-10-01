import { Stack, Text } from "@qingye/ui/components/layout";

export const meta = { title: "Text", description: "三档字号与五种语义色；不设 tone 时继承父级颜色。" };

export default function Demo() {
  return (
    <Stack className="w-full max-w-sm" gap={4}>
      <Stack gap={1}>
        <Text as="p">正文 body · 部署完成后会发送邮件通知。</Text>
        <Text as="p" size="label">
          标签 label · 部署区域
        </Text>
        <Text as="p" size="caption">
          说明 caption · 最近更新于 <time dateTime="2026-10-01T14:32">10 月 1 日 14:32</time>
        </Text>
      </Stack>
      <Stack gap={1}>
        <Text as="p" tone="muted">muted · 次要信息与说明文字</Text>
        <Text as="p" tone="success">success · 证书已自动续期</Text>
        <Text as="p" tone="warning">warning · 本月构建时长已用 85%</Text>
        <Text as="p" tone="danger">danger · 域名解析校验失败</Text>
      </Stack>
    </Stack>
  );
}

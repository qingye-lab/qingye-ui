import { Badge } from "@qingye/ui/components/badge";
import { Button } from "@qingye/ui/components/button";
import { Inline, Stack, Text } from "@qingye/ui/components/layout";
import { PlusIcon } from "lucide-react";

export const meta = { title: "Inline", description: "标题与操作两端对齐；标签一行放不下时自动换行。" };

const tags = ["React", "TypeScript", "设计系统", "无障碍", "深色模式", "国际化"];

export default function Demo() {
  return (
    <Stack className="w-full max-w-md" gap={3}>
      <Inline justify="between">
        <Text as="p" className="font-medium">
          技术标签
        </Text>
        <Button size="sm" variant="outline">
          <PlusIcon />
          添加
        </Button>
      </Inline>
      <Inline as="ul" aria-label="技术标签">
        {tags.map((tag) => (
          <li key={tag}>
            <Badge variant="outline">{tag}</Badge>
          </li>
        ))}
      </Inline>
    </Stack>
  );
}

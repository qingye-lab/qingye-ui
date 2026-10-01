const _01Default = 'import { Button, Group, GroupSeparator } from "@yanqing/ui";\nimport { ArchiveIcon, ClockIcon, ReplyIcon } from "lucide-react";\n\nexport const meta = { title: "默认", description: "outline 按钮相接，用 GroupSeparator 分隔。" };\n\nexport default function Demo() {\n  return (\n    <Group aria-label="邮件操作">\n      <Button variant="outline">\n        <ReplyIcon />\n        回复\n      </Button>\n      <GroupSeparator />\n      <Button variant="outline">\n        <ClockIcon />\n        稍后提醒\n      </Button>\n      <GroupSeparator />\n      <Button variant="outline">\n        <ArchiveIcon />\n        归档\n      </Button>\n    </Group>\n  );\n}\n';
export {
  _01Default as default
};

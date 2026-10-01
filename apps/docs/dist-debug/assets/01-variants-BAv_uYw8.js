const _01Variants = 'import { Badge } from "@yanqing/ui";\n\nexport const meta = {\n  title: "样式",\n  description: "实色用于少量需要强调的标记；浅底语义色适合在列表中大量出现的状态。",\n};\n\nexport default function Demo() {\n  return (\n    <>\n      <Badge>新功能</Badge>\n      <Badge variant="secondary">草稿</Badge>\n      <Badge variant="outline">v2.4.0</Badge>\n      <Badge variant="info">处理中</Badge>\n      <Badge variant="success">已完成</Badge>\n      <Badge variant="warning">待审核</Badge>\n      <Badge variant="error">构建失败</Badge>\n      <Badge variant="destructive">已停用</Badge>\n    </>\n  );\n}\n';
export {
  _01Variants as default
};

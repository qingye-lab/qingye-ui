const n=`import { Badge } from "@qingye/ui/components/badge";

export const meta = {
  title: "样式",
  description: "实色用于少量需要强调的标记；浅底语义色适合在列表中大量出现的状态。",
};

export default function Demo() {
  return (
    <>
      <Badge>新功能</Badge>
      <Badge variant="secondary">草稿</Badge>
      <Badge variant="outline">v2.4.0</Badge>
      <Badge variant="info">处理中</Badge>
      <Badge variant="success">已完成</Badge>
      <Badge variant="warning">待审核</Badge>
      <Badge variant="error">构建失败</Badge>
      <Badge variant="destructive">已停用</Badge>
    </>
  );
}
`;export{n as default};

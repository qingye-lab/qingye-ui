import { Button } from "@yanqing/ui";

export const meta = { title: "样式" };

export default function Demo() {
  return (
    <>
      <Button>主要操作</Button>
      <Button variant="outline">次要操作</Button>
      <Button variant="secondary">辅助</Button>
      <Button variant="ghost">幽灵</Button>
      <Button variant="link">链接</Button>
      <Button variant="destructive">删除</Button>
      <Button variant="destructive-outline">移除</Button>
    </>
  );
}

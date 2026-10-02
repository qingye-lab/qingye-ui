import { Button } from "@qingye/ui/components/button";

export const meta = {
  title: "样式",
  description: "样式表达当前任务中的强调与后果；保存、退出或保护动作都可以成为重点，不按动作名称固定分级。",
};

export default function Demo() {
  return (
    <>
      <Button>保存</Button>
      <Button variant="outline">取消</Button>
      <Button variant="secondary">存为草稿</Button>
      <Button variant="ghost">稍后再说</Button>
      <Button variant="link">展开记录</Button>
      <Button variant="destructive">删除设备</Button>
      <Button variant="destructive-outline">解除绑定</Button>
    </>
  );
}

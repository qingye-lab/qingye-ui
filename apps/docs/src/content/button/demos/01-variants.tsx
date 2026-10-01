import { Button } from "@yanqing/ui";

export const meta = {
  title: "样式",
  description: "一个区域只放一个主按钮；次要操作用 outline、secondary 或 ghost，危险操作用 destructive。",
};

export default function Demo() {
  return (
    <>
      <Button>保存</Button>
      <Button variant="outline">取消</Button>
      <Button variant="secondary">存为草稿</Button>
      <Button variant="ghost">稍后再说</Button>
      <Button variant="link">查看详情</Button>
      <Button variant="destructive">删除设备</Button>
      <Button variant="destructive-outline">解除绑定</Button>
    </>
  );
}

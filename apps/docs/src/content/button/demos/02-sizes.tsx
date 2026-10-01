import { Button } from "@qingye/ui/components/button";

export const meta = {
  title: "尺寸",
  description: "xs 用于表格行内，sm 用于工具栏，lg / xl 用于登录与落地页。移动端统一加高 4px。",
};

export default function Demo() {
  return (
    <>
      <Button size="xs" variant="outline">行内</Button>
      <Button size="sm" variant="outline">工具栏</Button>
      <Button variant="outline">默认</Button>
      <Button size="lg" variant="outline">登录</Button>
      <Button size="xl" variant="outline">免费试用</Button>
    </>
  );
}

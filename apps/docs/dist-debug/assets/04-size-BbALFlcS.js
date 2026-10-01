const n=`import { Button } from "@qingye/ui/components/button";
import { Card, CardDescription, CardFooter, CardHeader, CardPanel, CardTitle } from "@qingye/ui/components/card";

export const meta = { title: "紧凑尺寸", description: "size=\\"sm\\" 把内边距从 24px 收到 16px，区块间距从 16px 收到 12px。" };

export default function Demo() {
  return (
    <>
      <Card className="w-full max-w-64">
        <CardHeader>
          <CardTitle>每周报告</CardTitle>
          <CardDescription>每周一 09:00 发送</CardDescription>
        </CardHeader>
        <CardPanel className="text-sm">上周访问 12,840 次</CardPanel>
        <CardFooter>
          <Button size="sm" variant="outline">预览报告</Button>
        </CardFooter>
      </Card>
      <Card className="w-full max-w-64" size="sm">
        <CardHeader>
          <CardTitle>每周报告</CardTitle>
          <CardDescription>每周一 09:00 发送</CardDescription>
        </CardHeader>
        <CardPanel className="text-sm">上周访问 12,840 次</CardPanel>
        <CardFooter>
          <Button size="sm" variant="outline">预览报告</Button>
        </CardFooter>
      </Card>
    </>
  );
}
`;export{n as default};

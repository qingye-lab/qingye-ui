import { Button } from "@yanqing/ui/components/button";
import { Card, CardDescription, CardFooter, CardHeader, CardPanel, CardTitle } from "@yanqing/ui/components/card";
import { Input } from "@yanqing/ui/components/input";

export const meta = {
  title: "分隔区块",
  description: "头部加 border-b、底部加 border-t 后，CardPanel 自动恢复上下内边距；底部用 py-4 收成一条紧凑的操作栏。",
};

export default function Demo() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="border-b">
        <CardTitle>项目名称</CardTitle>
        <CardDescription>显示在控制台、通知邮件和访问链接中。</CardDescription>
      </CardHeader>
      <CardPanel>
        <Input aria-label="项目名称" defaultValue="会员中心" />
      </CardPanel>
      <CardFooter className="justify-between gap-4 border-t py-4">
        <span className="text-muted-foreground text-sm">最多 32 个字符。</span>
        <Button size="sm">保存</Button>
      </CardFooter>
    </Card>
  );
}

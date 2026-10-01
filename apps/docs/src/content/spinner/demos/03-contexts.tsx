import { Button, Card, CardContent, CardHeader, CardTitle, Spinner } from "@qingye/ui";

export const meta = { title: "常见位置", description: "按钮内加载用 Button 的 loading；卡片与表格内的占位用 Spinner 加说明文字。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Button loading className="self-start">
        保存中
      </Button>
      <Card size="sm">
        <CardHeader>
          <CardTitle>区域概览</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center gap-2 py-6 text-muted-foreground text-body">
          <Spinner aria-hidden="true" />
          正在加载数据
        </CardContent>
      </Card>
    </div>
  );
}

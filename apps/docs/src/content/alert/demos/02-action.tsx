import { Alert, AlertAction, AlertDescription, AlertTitle } from "@yanqing/ui/components/alert";
import { Button } from "@yanqing/ui/components/button";
import { TriangleAlertIcon } from "lucide-react";

export const meta = {
  title: "带操作",
  description: "AlertAction 在宽屏时位于右侧，窄屏时自动换到文字下方，与正文左对齐。",
};

export default function Demo() {
  return (
    <div className="grid w-full max-w-xl gap-3">
      <Alert variant="warning">
        <TriangleAlertIcon />
        <AlertTitle>发票信息不完整</AlertTitle>
        <AlertDescription>补充纳税人识别号后，才能开具 9 月账单的专用发票。</AlertDescription>
        <AlertAction>
          <Button size="xs" variant="ghost">
            稍后
          </Button>
          <Button size="xs">去补充</Button>
        </AlertAction>
      </Alert>
      <Alert>
        <AlertTitle>有新的固件版本 v2.8.0</AlertTitle>
        <AlertDescription>修复了低温环境下扫码枪偶发断连的问题。</AlertDescription>
        <AlertAction>
          <Button size="xs" variant="outline">
            查看更新
          </Button>
        </AlertAction>
      </Alert>
    </div>
  );
}

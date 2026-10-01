import { Alert, AlertDescription, AlertTitle } from "@yanqing/ui/components/alert";
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, TerminalIcon, TriangleAlertIcon } from "lucide-react";

export const meta = { title: "类型", description: "default、info、success、warning、error 五种语义。" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-xl gap-3">
      <Alert>
        <TerminalIcon />
        <AlertTitle>API 密钥已轮换</AlertTitle>
        <AlertDescription>旧密钥将在 24 小时后失效，请及时更新服务端配置。</AlertDescription>
      </Alert>
      <Alert variant="info">
        <InfoIcon />
        <AlertTitle>今晚 23:00 例行维护</AlertTitle>
        <AlertDescription>预计 30 分钟，期间设备数据会缓存在本地，恢复后自动上传。</AlertDescription>
      </Alert>
      <Alert variant="success">
        <CircleCheckIcon />
        <AlertTitle>实名认证已通过</AlertTitle>
        <AlertDescription>现在可以开具增值税专用发票。</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <TriangleAlertIcon />
        <AlertTitle>设备配额即将用完</AlertTitle>
        <AlertDescription>已绑定 47 / 50 台设备，升级套餐后可继续添加。</AlertDescription>
      </Alert>
      <Alert variant="error">
        <CircleAlertIcon />
        <AlertTitle>3 台设备同步失败</AlertTitle>
        <AlertDescription>最近一次尝试：今天 09:42。请检查设备网络后重试。</AlertDescription>
      </Alert>
    </div>
  );
}

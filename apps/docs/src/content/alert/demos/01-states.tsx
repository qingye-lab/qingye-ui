import { Alert, AlertDescription, AlertTitle } from "@qingye/ui/components/alert";
import { Stack } from "@qingye/ui/components/layout";
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, TriangleAlertIcon } from "lucide-react";

export const meta = { title: "就地说明", titleEn: "In-place notices" };


export default function Demo() {
  return <Stack gap="section" className="max-w-md">
    <Alert>
      <InfoIcon aria-hidden="true" />
      <div className="grid gap-1"><AlertTitle>草稿已保留</AlertTitle><AlertDescription>离开这一页不会丢失本次填写的内容。</AlertDescription></div>
    </Alert>
    <Alert tone="success">
      <CircleCheckIcon aria-hidden="true" />
      <div className="grid gap-1"><AlertTitle>规则已启用</AlertTitle><AlertDescription>新的匹配条件对之后导入的记录生效。</AlertDescription></div>
    </Alert>
    <Alert tone="warning">
      <TriangleAlertIcon aria-hidden="true" />
      <div className="grid gap-1"><AlertTitle>同步时间较旧</AlertTitle><AlertDescription>最近一次同步在 3 天前，数字可能不是最新的。</AlertDescription></div>
    </Alert>
    <Alert tone="danger">
      <CircleAlertIcon aria-hidden="true" />
      <div className="grid gap-1"><AlertTitle>导出未完成</AlertTitle><AlertDescription>连接中断，原数据仍在，可以重新导出。</AlertDescription></div>
    </Alert>
  </Stack>;
}

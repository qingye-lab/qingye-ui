import { Alert, AlertDescription, AlertTitle } from "@qingye_lab/ui/components/alert";
import { Stack } from "@qingye_lab/ui/components/layout";

export const meta = { title: "就地说明", titleEn: "In-place notices" };

export default function Demo() {
  return <Stack gap="section" className="max-w-md">
    <Alert>
      <div className="grid gap-1"><AlertTitle>草稿已保留</AlertTitle><AlertDescription>离开这一页不会丢失本次填写的内容。</AlertDescription></div>
    </Alert>
    <Alert tone="info">
      <div className="grid gap-1"><AlertTitle>名称可以重复</AlertTitle><AlertDescription>同名记录以创建时间区分。</AlertDescription></div>
    </Alert>
    <Alert tone="success">
      <div className="grid gap-1"><AlertTitle>规则已启用</AlertTitle><AlertDescription>新的匹配条件对之后导入的记录生效。</AlertDescription></div>
    </Alert>
    <Alert tone="warning">
      <div className="grid gap-1"><AlertTitle>同步时间较旧</AlertTitle><AlertDescription>最近一次同步在 3 天前，数字可能不是最新的。</AlertDescription></div>
    </Alert>
    <Alert tone="danger">
      <div className="grid gap-1"><AlertTitle>导出未完成</AlertTitle><AlertDescription>连接中断，原数据仍在，可以重新导出。</AlertDescription></div>
    </Alert>
  </Stack>;
}

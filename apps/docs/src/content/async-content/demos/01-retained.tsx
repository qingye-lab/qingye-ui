import { useState } from "react";
import { Alert, AlertDescription } from "@qingye_lab/ui/components/alert";
import { AsyncContent } from "@qingye_lab/ui/components/async-content";
import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "刷新失败保留备注", titleEn: "Keep a note after refresh failure" } satisfies DemoMeta;

export default function Demo() {
  const [status, setStatus] = useState<"pending" | "success" | "error">("success");
  // 用显式事件模拟请求完成；不会留下计时器，也不会把时间经过当作失败。
  return <Stack>
    <Inline>
      <Button variant="bordered" disabled={status === "pending"} onClick={() => setStatus("pending")}>刷新记录</Button>
      {status === "pending" && <><Button variant="quiet" onClick={() => setStatus("success")}>收到新结果</Button><Button variant="quiet" onClick={() => setStatus("error")}>连接中断</Button></>}
    </Inline>
    <AsyncContent status={status} hasContent emptyContent="没有记录"
      loadingContent={<p role="status" className="m-0 text-support text-muted-foreground">正在刷新，上次结果仍可用</p>}
      errorContent={<Alert tone="warning" role="alert"><Stack gap="field"><AlertDescription>刷新失败，显示上次同步的记录。</AlertDescription><Button variant="quiet" onClick={() => setStatus("pending")}>重试</Button></Stack></Alert>}>
      <Stack gap="fields"><p className="m-0 text-body">桑园采叶记录 · 今天 07:55</p><Field><FieldLabel>本地备注</FieldLabel><Input placeholder="记录待核对事项" /></Field></Stack>
    </AsyncContent>
  </Stack>;
}

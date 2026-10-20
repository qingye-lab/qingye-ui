import { useState } from "react";
import { Alert, AlertDescription } from "@qingye_lab/ui/components/alert";
import { AsyncContent } from "@qingye_lab/ui/components/async-content";
import { Button } from "@qingye_lab/ui/components/button";
import { Empty, EmptyTitle, EmptyDescription } from "@qingye_lab/ui/components/empty";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "首次加载与零结果", titleEn: "Initial loading and confirmed empty results" } satisfies DemoMeta;
export default function Demo() {
  const [status, setStatus] = useState<"pending" | "success" | "error">("pending");
  return <Stack><Inline><Button variant="quiet" onClick={() => setStatus("pending")}>重新加载</Button><Button variant="quiet" onClick={() => setStatus("success")}>收到零条结果</Button><Button variant="quiet" onClick={() => setStatus("error")}>请求失败</Button></Inline>
    <AsyncContent status={status} hasContent={false}
      emptyContent={<Empty state="empty"><EmptyTitle level={3}>没有待同步记录</EmptyTitle><EmptyDescription>所有记录均已同步。</EmptyDescription></Empty>}
      errorContent={<Alert tone="danger" role="alert"><Stack gap="field"><AlertDescription>记录暂时无法加载。</AlertDescription><Button variant="bordered" onClick={() => setStatus("pending")}>重试</Button></Stack></Alert>} />
  </Stack>;
}

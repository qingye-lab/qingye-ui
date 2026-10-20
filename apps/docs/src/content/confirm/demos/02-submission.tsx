import { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription } from "@qingye_lab/ui/components/alert";
import { Button } from "@qingye_lab/ui/components/button";
import { ConfirmProvider, useConfirm } from "@qingye_lab/ui/components/confirm";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Textarea } from "@qingye_lab/ui/components/textarea";

export const meta = { title: "提交与失败恢复", titleEn: "Submission and recovery", description: "本地控制返回完成或失败，检查忙碌状态与保留的草稿。", descriptionEn: "Choose a local completion or failure to inspect busy state and retained drafts." };

function Submission() {
  const confirm = useConfirm();
  const [draft, setDraft] = useState("保留现有记录，再加入补充说明。");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [received, setReceived] = useState("");
  const response = useRef<{ resolve: () => void; reject: (error: Error) => void } | null>(null);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; response.current?.reject(new Error("演示已关闭")); };
  }, []);
  return <div className="grid min-w-0 gap-(--qy-panel-gap)">
    <Field><FieldLabel>草稿内容</FieldLabel><Textarea value={draft} disabled={busy} onChange={event => setDraft(event.currentTarget.value)} /></Field>
    <div className="flex flex-wrap items-center gap-(--qy-action-gap)">
      <Button loading={busy} onClick={async () => {
        if (!await confirm({ title: "提交这份草稿？", description: "提交本页内容，失败时保留草稿以便重试。", confirmLabel: "提交", cancelLabel: "继续编辑" })) return;
        setBusy(true); setError(""); setReceived("");
        try {
          // 本地演示由下面的返回动作完成；真实应用在此 await 自己的请求。
          await new Promise<void>((resolve, reject) => { response.current = { resolve, reject }; });
          if (mounted.current) setReceived(draft);
        } catch {
          if (mounted.current) setError("提交失败，草稿已保留。可以修改后重试。");
        } finally {
          response.current = null;
          if (mounted.current) setBusy(false);
        }
      }}>提交草稿</Button>
      <Button variant="quiet" disabled={!busy} onClick={() => response.current?.reject(new Error("本地失败"))}>返回失败</Button>
      <Button variant="quiet" disabled={!busy} onClick={() => response.current?.resolve()}>返回完成</Button>
    </div>
    {error && <Alert role="alert" tone="danger"><AlertDescription>{error}</AlertDescription></Alert>}
    {received && <output className="text-support text-muted-foreground">本地接收：{received}</output>}
  </div>;
}

export default function Demo() { return <ConfirmProvider><Submission /></ConfirmProvider>; }

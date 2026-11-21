import { useState } from "react";
import { Alert, Button, Empty, EmptyActions, EmptyTitle, Field, FieldLabel, Link, Textarea } from "@qingye_lab/ui";

export type ApplyFormProps = {
  submit: (reason: string) => Promise<{ id: string }>;
};

// 用 Empty 呈现结局并取代表单
export function ApplyForm({ submit }: ApplyFormProps) {
  const [reason, setReason] = useState("");
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [id, setId] = useState<string | null>(null);

  if (id !== null) {
    return (
      <Empty state="empty" role="status">
        <EmptyTitle level={2}>申请已提交</EmptyTitle>
        <EmptyActions><Link href={`/applications/${id}`}>查看申请</Link></EmptyActions>
      </Empty>
    );
  }

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (sending) return;
    setSending(true); setFailed(false);
    try { setId((await submit(reason)).id); }
    catch { setFailed(true); }
    finally { setSending(false); }
  };

  return (
    <form onSubmit={onSubmit}>
      <Field>
        <FieldLabel>申请理由</FieldLabel>
        <Textarea value={reason} onChange={e => { setReason(e.target.value); setFailed(false); }} />
      </Field>
      {failed && <Alert tone="danger" role="alert">提交失败，请重试。</Alert>}
      <Button type="submit" loading={sending}>提交申请</Button>
    </form>
  );
}

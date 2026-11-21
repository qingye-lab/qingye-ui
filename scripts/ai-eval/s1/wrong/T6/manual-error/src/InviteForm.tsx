import { useState } from "react";
import { Alert, Button, Field, FieldError, FieldLabel, Input } from "@qingye_lab/ui";

export type InviteFormProps = {
  checkEmail: (email: string) => Promise<boolean>;
  sendInvite: (email: string) => Promise<void>;
};

export function InviteForm({ checkEmail, sendInvite }: InviteFormProps) {
  const [email, setEmail] = useState("");
  const [taken, setTaken] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sent, setSent] = useState(false);

  const edit = (value: string) => { setEmail(value); setTaken(false); setFailed(false); setSent(false); };
  const check = async () => {
    const value = email;
    if (!value) return;
    const ok = await checkEmail(value);
    setEmail(current => { if (current === value) setTaken(!ok); return current; });
  };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (sending || taken || !email) return;
    setSending(true); setFailed(false);
    try { await sendInvite(email); setSent(true); }
    catch { setFailed(true); }
    finally { setSending(false); }
  };

  return (
    <form onSubmit={submit} noValidate>
      <Field>
        <FieldLabel>邮箱</FieldLabel>
        <div style={{ display: "flex" }}>
          <Input type="email" value={email} onChange={e => edit(e.target.value)} onBlur={check} />
          <Button type="button" variant="quiet" shape="icon" aria-label="清空" onClick={() => edit("")}><svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg></Button>
        </div>
        {taken && <p>该邮箱已是成员</p>}
      </Field>
      {failed && <Alert tone="danger" role="alert">邀请发送失败，请重试。</Alert>}
      {sent && <p role="status">邀请已发送</p>}
      <Button type="submit" loading={sending}>发送邀请</Button>
    </form>
  );
}

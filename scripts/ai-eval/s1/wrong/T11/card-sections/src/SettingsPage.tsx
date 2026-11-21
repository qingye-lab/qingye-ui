import { Button } from "@qingye_lab/ui/components/button";
import { Card } from "@qingye_lab/ui/components/card";
import { Link } from "@qingye_lab/ui/components/link";

export type SettingsPageProps = {
  name: string;
  email: string;
  onSignOut: () => void;
};

// DN 自然解：每个分节一张卡片，标题用 h2
export function SettingsPage({ name, email, onSignOut }: SettingsPageProps) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>账户设置</h1>
        <Button onClick={onSignOut}>退出登录</Button>
      </div>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between" }}><h2>个人资料</h2><Link href="/settings/profile">编辑</Link></div>
        <div><p>{name}</p><p>{email}</p></div>
      </Card>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between" }}><h2>通知</h2></div>
        <div><p>每周一发送摘要邮件</p></div>
      </Card>
    </div>
  );
}

import { Button } from "@qingye_lab/ui/components/button";
import { Link } from "@qingye_lab/ui/components/link";

export type SettingsPageProps = {
  name: string;
  email: string;
  onSignOut: () => void;
};

// 原生 section + aria-labelledby + h1：语义对，但没用库的页面标题与分节
export function SettingsPage({ name, email, onSignOut }: SettingsPageProps) {
  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>账户设置</h1>
        <Button onClick={onSignOut}>退出登录</Button>
      </header>
      <section aria-labelledby="profile-h">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 id="profile-h">个人资料</h2>
          <Link href="/settings/profile">编辑</Link>
        </div>
        <p>{name}</p>
        <p>{email}</p>
      </section>
      <section aria-labelledby="notify-h">
        <h2 id="notify-h">通知</h2>
        <p>每周一发送摘要邮件</p>
      </section>
    </div>
  );
}

import { Tabs, TabsList, TabsPanel, TabsTab } from "@yanqing/ui";

export const meta = { title: "纵向", description: "设置页常用；方向键改为上下。" };

const sections = [
  { value: "profile", label: "个人资料", text: "头像、昵称与个人简介。" },
  { value: "account", label: "账号与安全", text: "登录邮箱、密码与两步验证。" },
  { value: "notifications", label: "通知", text: "选择通过邮件或站内信接收哪些提醒。" },
];

export default function Demo() {
  return (
    <div className="grid w-full max-w-lg gap-8">
      <Tabs defaultValue="profile" orientation="vertical">
        <TabsList>
          {sections.map((s) => (
            <TabsTab key={s.value} value={s.value}>
              {s.label}
            </TabsTab>
          ))}
        </TabsList>
        {sections.map((s) => (
          <TabsPanel className="px-2 py-1.5 text-muted-foreground text-sm" key={s.value} value={s.value}>
            {s.text}
          </TabsPanel>
        ))}
      </Tabs>
      <Tabs defaultValue="account" orientation="vertical">
        <div className="border-s">
          <TabsList variant="underline">
            {sections.map((s) => (
              <TabsTab key={s.value} value={s.value}>
                {s.label}
              </TabsTab>
            ))}
          </TabsList>
        </div>
        {sections.map((s) => (
          <TabsPanel className="px-2 py-1.5 text-muted-foreground text-sm" key={s.value} value={s.value}>
            {s.text}
          </TabsPanel>
        ))}
      </Tabs>
    </div>
  );
}

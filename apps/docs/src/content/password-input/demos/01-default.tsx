import { PasswordInput } from "@yanqing/ui/components/password-input";

export const meta = { title: "默认", description: "点击眼睛图标在明文与掩码之间切换。" };

export default function Demo() {
  return (
    <PasswordInput
      aria-label="密码"
      autoComplete="current-password"
      className="max-w-xs"
      defaultValue="hangzhou-2026"
      placeholder="输入密码"
    />
  );
}

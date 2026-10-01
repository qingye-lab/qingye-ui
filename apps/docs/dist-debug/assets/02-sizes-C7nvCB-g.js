const e=`import { PasswordInput } from "@qingye/ui/components/password-input";

export const meta = { title: "尺寸" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <PasswordInput aria-label="密码（小）" placeholder="小 sm" size="sm" />
      <PasswordInput aria-label="密码" placeholder="默认 default" />
      <PasswordInput aria-label="密码（大）" placeholder="大 lg" size="lg" />
    </div>
  );
}
`;export{e as default};

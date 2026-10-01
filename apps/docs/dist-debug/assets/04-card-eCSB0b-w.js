const e=`import { Label } from "@qingye/ui/components/label";
import { Switch } from "@qingye/ui/components/switch";
import { ShieldCheckIcon } from "lucide-react";

export const meta = { title: "卡片开关", description: "开启时卡片边框与底色随之变化。" };

export default function Demo() {
  return (
    <Label className="flex w-full max-w-sm items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50">
      <ShieldCheckIcon aria-hidden="true" className="mt-px size-4.5 shrink-0 opacity-80 sm:size-4" />
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span>登录二次验证</span>
        <span className="font-normal text-muted-foreground text-xs">在新设备登录时要求输入短信验证码。</span>
      </span>
      <Switch defaultChecked />
    </Label>
  );
}
`;export{e as default};

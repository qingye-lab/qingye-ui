import { Button } from "@yanqing/ui/components/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@yanqing/ui/components/item";
import { BellRingIcon, ShieldCheckIcon, WalletIcon } from "lucide-react";

export const meta = { title: "样式", description: "default 透明、outline 卡片面、muted 浅底。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <Item>
        <ItemMedia variant="icon">
          <BellRingIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>告警通知</ItemTitle>
          <ItemDescription>设备离线超过 10 分钟时，通过短信与企业微信通知店长。</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            设置
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <ShieldCheckIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>两步验证</ItemTitle>
          <ItemDescription>登录后台时需要输入手机验证码。</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            管理
          </Button>
        </ItemActions>
      </Item>
      <Item variant="muted">
        <ItemMedia variant="icon">
          <WalletIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>结算账户</ItemTitle>
          <ItemDescription>招商银行 · 尾号 0937，每周一自动结算。</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="ghost">
            更换
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
}

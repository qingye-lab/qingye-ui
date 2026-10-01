import { TextLink } from "@yanqing/ui/components/typography";

export const meta = { title: "文字链接", description: "默认样式、弱化样式与外部链接。" };

export default function Demo() {
  return (
    <div className="flex max-w-md flex-col gap-3 text-sm">
      <p>
        修改结算周期前，请先阅读<TextLink href="#billing">结算规则</TextLink>。
      </p>
      <p className="text-muted-foreground">
        没有收到验证码？<TextLink href="#resend" variant="muted">重新发送</TextLink>
      </p>
      <p>
        设备型号参数见{" "}
        <TextLink external href="https://developer.sunmi.com/">
          商米开发者中心
        </TextLink>
        。
      </p>
    </div>
  );
}

import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye_lab/ui/components/tooltip";

export type LastSignInProps = {
  at: Date;
  now: Date;
};

// 自写相对文字 + 库 Tooltip 放绝对时间（指南 Avoid）
export function LastSignIn({ at, now }: LastSignInProps) {
  const minutes = Math.round((now.getTime() - at.getTime()) / 60000);
  return (
    <p>
      最近登录：
      <Tooltip>
        <TooltipTrigger render={<time dateTime={at.toISOString()} tabIndex={0} />}>{minutes}分钟前</TooltipTrigger>
        <TooltipPopup>{at.toLocaleString("zh-CN")}</TooltipPopup>
      </Tooltip>
    </p>
  );
}

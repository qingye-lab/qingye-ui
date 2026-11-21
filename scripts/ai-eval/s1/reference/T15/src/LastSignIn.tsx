import { RelativeTime } from "@qingye_lab/ui/components/relative-time";

export type LastSignInProps = {
  at: Date;
  now: Date;
};

// 指南 relative-time.md：绝对时间在悬停提示和读屏文字里，不要再套 Tooltip 或自写计时器
export function LastSignIn({ at, now }: LastSignInProps) {
  return <p>最近登录：<RelativeTime value={at} now={now} /></p>;
}

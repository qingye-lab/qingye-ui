export type LastSignInProps = {
  at: Date;
  now: Date;
};

// DN 自然解：Intl.RelativeTimeFormat + <time title>
export function LastSignIn({ at, now }: LastSignInProps) {
  const minutes = Math.round((at.getTime() - now.getTime()) / 60000);
  const text = new Intl.RelativeTimeFormat("zh-CN", { numeric: "auto" }).format(minutes, "minute");
  const absolute = at.toLocaleString("zh-CN");
  return <p>最近登录：<time dateTime={at.toISOString()} title={absolute}>{text}</time></p>;
}

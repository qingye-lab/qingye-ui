import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { useCopyToClipboard } from "@qingye_lab/ui/hooks/use-copy-to-clipboard";
import { useUILocale } from "@qingye_lab/ui/locale";
export const meta = { title: "useCopyToClipboard", titleEn: "useCopyToClipboard" };
export default function Demo() {
  const { code, messages } = useUILocale();
  const en = code.startsWith("en");
  const [failed, setFailed] = useState(false);
  const { copyToClipboard, isCopied, isCopying } = useCopyToClipboard({ onCopy: () => setFailed(false), onError: () => setFailed(true) });
  return <div className="flex flex-wrap items-center gap-(--qy-action-gap)">
    <code className="text-body">npm i @qingye_lab/ui</code>
    <Button variant="bordered" loading={isCopying} onClick={() => copyToClipboard("npm i @qingye_lab/ui")}>{isCopied ? messages.copied : en ? "Copy command" : "复制命令"}</Button>
    {failed && <span role="status" className="text-support text-destructive-foreground">{messages.copyError}</span>}
  </div>;
}

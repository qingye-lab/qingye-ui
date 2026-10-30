import { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@qingye_lab/ui/components/alert";
import { Button } from "@qingye_lab/ui/components/button";
import { ConfirmAction } from "@qingye_lab/ui/components/confirm-action";
import { Stack } from "@qingye_lab/ui/components/layout";
import { useUILocale } from "@qingye_lab/ui/locale";
export const meta = { title: "失败结果留在页面上", titleEn: "Failures stay on the page" };

// 失败的对象与原因由应用持有：确认框随请求结束关闭，但结果不能跟着一起消失——它写进页面上的 Alert，留到应用自己清除。
type Failure = { name: string; reason: string };
export default function Demo() {
  const { code } = useUILocale(); const en = code.startsWith("en");
  const t = (zh: string, enText: string) => en ? enText : zh;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failures, setFailures] = useState<Failure[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const snapshot = { objectId: "batch-3", objectLabel: t("3 份记录", "3 records"), version: 1, change: t("同步到归档", "Sync to archive"), consequence: t("同步后，这 3 份记录在归档里以当前内容为准。", "After syncing, the archive holds the current content of these 3 records.") };
  return <Stack gap="field">
    <ConfirmAction snapshot={snapshot} open={open} onOpenChange={next => setOpen(next)} loading={loading} title={t("同步 3 份记录", "Sync 3 records")} triggerLabel={t("同步", "Sync")} actionLabel={t("同步到归档", "Sync to archive")} tone="neutral"
      onConfirm={() => {
        setLoading(true); setFailures([]);
        timer.current = setTimeout(() => {
          // 请求的结果到了：先把失败交给页面，再结束进行中、关闭确认框。
          setFailures([{ name: t("桑园采叶记录", "Mulberry log"), reason: t("归档中已有更新的版本", "A newer version exists in the archive") }, { name: t("茧质抽检", "Cocoon inspection"), reason: t("网络中断，结果未知", "Network lost, outcome unknown") }]);
          setLoading(false); setOpen(false);
        }, 800);
      }} />
    {failures.length > 0 && <Alert tone="danger">
      <AlertTitle>{t(`${failures.length} 份记录没有同步`, `${failures.length} records were not synced`)}</AlertTitle>
      <AlertDescription><ul className="m-0 grid list-none gap-(--qy-field-gap) p-0">{failures.map(item => <li key={item.name}>{item.name} · {item.reason}</li>)}</ul></AlertDescription>
      <Button variant="bordered" onClick={() => setFailures([])}>{t("知道了", "Dismiss")}</Button>
    </Alert>}
  </Stack>;
}

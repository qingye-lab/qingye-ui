import { useEffect, useId } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { toastManager } from "@qingye_lab/ui/components/toast";

export const meta = { title: "通知", titleEn: "Notice" };

export default function Demo() {
  const id = useId();
  useEffect(() => () => toastManager.close(id), [id]);
  return <Button variant="bordered" onClick={() => toastManager.add({ id, title: "通知", description: "补充信息", timeout: 5000 })}>显示通知</Button>;
}

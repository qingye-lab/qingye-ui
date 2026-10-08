import { useEffect, useId, useRef } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { ToastPrimitive } from "@qingye_lab/ui/components/toast";

export const meta = { title: "更新与关闭", titleEn: "Update and close" };

export default function Demo() {
  const id = useId();
  const manager = ToastPrimitive.useToastManager();
  const currentManager = useRef(manager);
  currentManager.current = manager;
  useEffect(() => () => currentManager.current.close(id), [id]);
  const visible = manager.toasts.some((notice) => notice.id === id);
  return (
    <div className="flex gap-(--qy-action-gap)">
      <Button variant="bordered" onClick={() => manager.add({ id, title: "通知", timeout: 0 })}>显示</Button>
      <Button variant="bordered" disabled={!visible} onClick={() => manager.update(id, { title: "文字已更新" })}>更新</Button>
      <Button variant="quiet" disabled={!visible} onClick={() => manager.close(id)}>关闭</Button>
    </div>
  );
}

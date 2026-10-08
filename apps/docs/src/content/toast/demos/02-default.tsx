import { useEffect, useId } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { toastManager } from "@qingye_lab/ui/components/toast";

export const meta = { title: "正文", titleEn: "Content" };

export default function Demo() {
  const id = useId();
  useEffect(() => () => toastManager.close(id), [id]);
  return (
    <div className="flex gap-(--qy-action-gap)">
      <Button variant="bordered" onClick={() => toastManager.add({ id, title: "青野 Qingye UI", timeout: 5000 })}>短文字</Button>
      <Button variant="bordered" onClick={() => toastManager.add({
        id,
        title: "青野 Qingye UI · Button / Input / Textarea / Popover / Tooltip / Toast",
        description: "按钮、输入框、多行输入、浮起面板、文字提示与通知。中文标点：，。；！？",
        timeout: 5000,
      })}>长文字</Button>
    </div>
  );
}

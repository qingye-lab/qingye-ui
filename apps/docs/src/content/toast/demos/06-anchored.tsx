import { useEffect, useId, useRef } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { AnchoredToastProvider, ToastPrimitive } from "@qingye_lab/ui/components/toast";

export const meta = { title: "关联入口", titleEn: "Anchored notification" };

function Notices() {
  const id = useId();
  const manager = ToastPrimitive.useToastManager();
  const currentManager = useRef(manager);
  currentManager.current = manager;
  const normalAnchor = useRef<HTMLButtonElement>(null);
  const compactAnchor = useRef<HTMLButtonElement>(null);
  useEffect(() => () => {
    currentManager.current.close(`${id}-normal`);
    currentManager.current.close(`${id}-compact`);
  }, [id]);
  return (
    <div className="flex gap-(--qy-action-gap)">
      <Button ref={normalAnchor} variant="bordered" onClick={() => manager.add({
        id: `${id}-normal`,
        title: "关联通知",
        positionerProps: { anchor: normalAnchor.current },
      })}>普通</Button>
      <Button ref={compactAnchor} variant="bordered" onClick={() => manager.add({
        id: `${id}-compact`,
        title: "关联提示",
        positionerProps: { anchor: compactAnchor.current },
        data: { tooltipStyle: true },
      })}>紧凑</Button>
    </div>
  );
}

export default function Demo() {
  return <AnchoredToastProvider><Notices /></AnchoredToastProvider>;
}

import { useEffect, useRef } from "react";
import { Button } from "@qingye/ui/components/button";
import { toastManager } from "@qingye/ui/components/toast";

export const meta = { title: "堆叠", titleEn: "Stack" };

export default function Demo() {
  const count = useRef(0);
  const ids = useRef<string[]>([]);
  useEffect(() => () => ids.current.forEach((id) => toastManager.close(id)), []);
  return (
    <Button variant="bordered" onClick={() => {
      count.current += 1;
      ids.current.push(toastManager.add({ title: `通知 ${count.current}`, timeout: 5000 }));
    }}>添加通知</Button>
  );
}

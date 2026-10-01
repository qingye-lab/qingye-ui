import { Button, Kbd, MotionProvider } from "@yanqing/ui";
import { useEffect, useState } from "react";

export const meta = {
  title: "输入方式",
  description: "移动鼠标或按 Tab 键，观察 <html data-ui-input> 的变化。实际应用中 MotionProvider 放在根部。",
};

function useInputModality() {
  const [input, setInput] = useState<string | null>(null);
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setInput(root.getAttribute("data-ui-input"));
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributeFilter: ["data-ui-input"] });
    return () => observer.disconnect();
  }, []);
  return input;
}

function Readout() {
  const input = useInputModality();
  return (
    <p className="text-muted-foreground text-sm">
      data-ui-input = <code className="font-mono text-foreground">{input ?? "—"}</code>
    </p>
  );
}

export default function Demo() {
  return (
    <MotionProvider>
      <div className="flex flex-col items-center gap-4">
        <Readout />
        <div className="flex gap-2">
          <Button variant="outline">保存草稿</Button>
          <Button>发布</Button>
        </div>
        <p className="text-muted-foreground text-xs">
          按 <Kbd>Tab</Kbd> 切换焦点时焦点环立即出现；用鼠标点击按钮可以看到 0.97 的按压缩放。
        </p>
      </div>
    </MotionProvider>
  );
}

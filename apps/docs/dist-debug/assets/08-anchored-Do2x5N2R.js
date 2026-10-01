const n=`import { Button } from "@qingye/ui/components/button";
import { AnchoredToastProvider, anchoredToastManager } from "@qingye/ui/components/toast";
import { CopyIcon } from "lucide-react";
import { useRef } from "react";

export const meta = {
  title: "锚定提示",
  description: "anchoredToastManager 把消息显示在触发元素旁，适合复制成功这类就地反馈。AnchoredToastProvider 同样只在应用根部挂载一次。",
};

function CopyLink() {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <Button
      onClick={() => {
        void navigator.clipboard?.writeText("https://qingye.example/t/2318");
        anchoredToastManager.add({
          title: "已复制",
          timeout: 1500,
          positionerProps: { anchor: ref.current },
          data: { tooltipStyle: true },
        });
      }}
      ref={ref}
      variant="outline"
    >
      <CopyIcon />
      复制工单链接
    </Button>
  );
}

export default function Demo() {
  return (
    <AnchoredToastProvider>
      <CopyLink />
    </AnchoredToastProvider>
  );
}
`;export{n as default};

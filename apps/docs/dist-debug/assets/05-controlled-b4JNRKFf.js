const e=`import { Toggle } from "@qingye/ui/components/toggle";
import { BellIcon, BellOffIcon } from "lucide-react";
import { useState } from "react";

export const meta = {
  title: "受控",
  description: "用 pressed 与 onPressedChange 接管状态，例如订阅一台设备的告警。",
};

export default function Demo() {
  const [watching, setWatching] = useState(true);
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Toggle onPressedChange={setWatching} pressed={watching} variant="outline">
        {watching ? <BellIcon /> : <BellOffIcon />}
        关注告警
      </Toggle>
      <span className="text-muted-foreground text-sm">
        {watching ? "SH-204 出现异常时会通知你" : "不会收到 SH-204 的通知"}
      </span>
    </div>
  );
}
`;export{e as default};

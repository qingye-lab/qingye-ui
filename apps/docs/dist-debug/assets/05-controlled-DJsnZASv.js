const _05Controlled = 'import { Toggle } from "@yanqing/ui";\nimport { BellIcon, BellOffIcon } from "lucide-react";\nimport { useState } from "react";\n\nexport const meta = {\n  title: "受控",\n  description: "用 pressed 与 onPressedChange 接管状态，例如订阅一台设备的告警。",\n};\n\nexport default function Demo() {\n  const [watching, setWatching] = useState(true);\n  return (\n    <div className="flex flex-wrap items-center justify-center gap-3">\n      <Toggle onPressedChange={setWatching} pressed={watching} variant="outline">\n        {watching ? <BellIcon /> : <BellOffIcon />}\n        关注告警\n      </Toggle>\n      <span className="text-muted-foreground text-sm">\n        {watching ? "SH-204 出现异常时会通知你" : "不会收到 SH-204 的通知"}\n      </span>\n    </div>\n  );\n}\n';
export {
  _05Controlled as default
};

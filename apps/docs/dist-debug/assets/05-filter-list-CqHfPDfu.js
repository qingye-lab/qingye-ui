const e=`import { SearchInput } from "@qingye/ui/components/search-input";
import { useState } from "react";

export const meta = { title: "组合：筛选列表", description: "受控使用，实时过滤下方列表。" };

const devices = [
  { name: "SH-204 门禁控制器", place: "上海 · 张江园区" },
  { name: "HZ-031 温湿度传感器", place: "杭州 · 滨江仓" },
  { name: "HZ-112 网络摄像机", place: "杭州 · 滨江仓" },
  { name: "SZ-008 智能电表", place: "深圳 · 南山办公室" },
];

export default function Demo() {
  const [query, setQuery] = useState("");
  const results = devices.filter((device) => \`\${device.name}\${device.place}\`.includes(query.trim()));
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <SearchInput aria-label="搜索设备" onValueChange={setQuery} placeholder="搜索设备名称或位置" value={query} />
      <ul className="divide-y rounded-lg border">
        {results.map((device) => (
          <li className="flex flex-col gap-0.5 px-3 py-2" key={device.name}>
            <span className="font-medium text-sm">{device.name}</span>
            <span className="text-muted-foreground text-xs">{device.place}</span>
          </li>
        ))}
        {results.length === 0 ? (
          <li className="px-3 py-6 text-center text-muted-foreground text-sm">没有找到“{query}”相关的设备</li>
        ) : null}
      </ul>
    </div>
  );
}
`;export{e as default};

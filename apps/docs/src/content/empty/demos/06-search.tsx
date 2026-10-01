import { Button } from "@yanqing/ui/components/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@yanqing/ui/components/empty";
import { SearchInput } from "@yanqing/ui/components/search-input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

export const meta = { title: "搜索无结果", description: "标题带上关键词，并提供清除搜索的出口。" };

const devices = ["客厅网关 Mini", "智能门锁 S2", "温湿度传感器", "人体感应器", "智能插座 Pro"];

export default function Demo() {
  const [query, setQuery] = useState("摄像头");
  const results = devices.filter((device) => device.includes(query.trim()));

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <SearchInput aria-label="搜索设备" placeholder="搜索设备" value={query} onValueChange={setQuery} />
      {results.length > 0 ? (
        <ul className="divide-y rounded-xl border">
          {results.map((device) => (
            <li key={device} className="px-3 py-2.5 text-sm">
              {device}
            </li>
          ))}
        </ul>
      ) : (
        <Empty className="rounded-xl border border-dashed py-8 md:py-8">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchIcon aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle className="text-base">没有找到“{query}”</EmptyTitle>
            <EmptyDescription>换个关键词试试，或检查拼写。</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm" variant="outline" onClick={() => setQuery("")}>
              清除搜索
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
}

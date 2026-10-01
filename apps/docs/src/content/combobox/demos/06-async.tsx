import { Combobox, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxStatus } from "@qingye/ui/components/combobox";
import { Spinner } from "@qingye/ui/components/spinner";
import { useRef, useState } from "react";

export const meta = { title: "远程搜索", description: "filter={null} 关闭本地筛选；ComboboxStatus 播报加载状态。" };

type Device = { label: string; value: string; site: string };
const directory: Device[] = [
  { label: "HZ-CORE-SW01", value: "sw01", site: "杭州 A 栋 3F" },
  { label: "HZ-CORE-SW02", value: "sw02", site: "杭州 A 栋 3F" },
  { label: "HZ-EDGE-RT07", value: "rt07", site: "杭州 B 栋 1F" },
  { label: "SH-ACC-SW15", value: "sw15", site: "上海 张江 2F" },
  { label: "SH-UPS-03", value: "ups03", site: "上海 张江 B1" },
  { label: "BJ-FW-02", value: "fw02", site: "北京 望京 5F" },
];

// Stands in for a request to your API.
const search = (query: string) =>
  new Promise<Device[]>((resolve) =>
    setTimeout(() => resolve(directory.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))), 500),
  );

export default function Demo() {
  const [results, setResults] = useState<Device[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const latest = useRef(0);

  const onInputValueChange = async (next: string, details: { reason: string }) => {
    setQuery(next);
    if (details.reason === "item-press" || !next.trim()) return;
    const ticket = ++latest.current;
    setLoading(true);
    const found = await search(next.trim());
    if (ticket !== latest.current) return;
    setResults(found);
    setLoading(false);
  };

  const status = loading ? (
    <span className="flex items-center gap-2">
      <Spinner className="size-3.5" />
      正在搜索设备…
    </span>
  ) : !query.trim() ? "输入设备名，例如 SW" : results.length ? `找到 ${results.length} 台设备` : null;

  return (
    <div className="w-full max-w-72">
      <Combobox items={results} filter={null} onInputValueChange={onInputValueChange}>
        <ComboboxInput aria-label="关联设备" placeholder="搜索设备名" />
        <ComboboxPopup aria-busy={loading || undefined}>
          <ComboboxStatus>{status}</ComboboxStatus>
          <ComboboxEmpty>{!loading && query.trim() ? `没有名称包含「${query.trim()}」的设备` : null}</ComboboxEmpty>
          <ComboboxList>
            {(device: Device) => (
              <ComboboxItem key={device.value} value={device}>
                <span className="flex flex-col">
                  <span className="font-medium">{device.label}</span>
                  <span className="text-muted-foreground text-xs">{device.site}</span>
                </span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
    </div>
  );
}

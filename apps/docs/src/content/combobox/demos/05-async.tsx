import { useEffect, useRef, useState } from "react";
import { ComboboxSelect } from "@qingye_lab/ui/components/combobox";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
export const meta = { title: "异步候选", titleEn: "Asynchronous candidates" };
const directory = ["3 号楼东侧", "3 号楼西侧", "4 号楼南门", "4 号楼北门", "5 号楼大堂", "东区车库", "西区车库"];
// 模拟一次查询；真实的请求、取消与失败由应用持有。
function search(query: string, signal: AbortSignal) {
  return new Promise<string[]>((resolve, reject) => {
    const timer = setTimeout(() => resolve(directory.filter(place => place.includes(query.trim()))), 600);
    signal.addEventListener("abort", () => { clearTimeout(timer); reject(signal.reason); }, { once: true });
  });
}
type SearchResult = { query: string; status: "ready"; items: string[] } | { query: string; status: "error" };
export default function Demo({ searchPlaces = search }: { searchPlaces?: typeof search }) {
  const [value, setValue] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const generation = useRef(0);
  useEffect(() => {
    const controller = new AbortController();
    const request = ++generation.current;
    setResult(null);
    // 取消是资源回收；代次检查另外阻止忽略 AbortSignal 的迟到回包覆盖新查询。
    searchPlaces(query, controller.signal).then(items => {
      if (!controller.signal.aborted && request === generation.current) setResult({ query, status: "ready", items });
    }, () => {
      if (!controller.signal.aborted && request === generation.current) setResult({ query, status: "error" });
    });
    return () => controller.abort();
  }, [query, searchPlaces]);
  // 查询改变后，同一帧就停止展示上一次查询的候选；确认值仍由 value 独立保留。
  const current = result?.query === query ? result : null;
  const loading = current === null;
  const results = current?.status === "ready" ? current.items : [];
  return <form className="max-w-xs"><Field name="place"><FieldLabel>位置</FieldLabel>
    <ComboboxSelect items={results} itemToStringLabel={place => place} filter={null}
      value={value} onValueChange={setValue} inputValue={query} onInputValueChange={next => { if (next !== query) { setResult(null); setQuery(next); } }}
      loading={loading} emptyContent={current?.status === "error" ? "查询失败，请修改搜索后重试" : "没有匹配的位置"} />
  </Field></form>;
}

import { useEffect, useState } from "react";
import { Combobox, ComboboxControl, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxStatus, ComboboxTrigger } from "@qingye_lab/ui/components/combobox";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
export const meta = { title: "异步候选", titleEn: "Asynchronous candidates" };
const directory = ["3 号楼东侧", "3 号楼西侧", "4 号楼南门", "4 号楼北门", "5 号楼大堂", "东区车库", "西区车库"];
// 模拟一次查询；真实的请求、取消与失败由应用持有。
function search(query: string, signal: AbortSignal) {
  return new Promise<string[]>((resolve, reject) => {
    const timer = setTimeout(() => resolve(directory.filter(place => place.includes(query.trim()))), 600);
    signal.addEventListener("abort", () => { clearTimeout(timer); reject(signal.reason); });
  });
}
export default function Demo() {
  const [value, setValue] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    search(query, controller.signal).then(found => { setResults(found); setLoading(false); }, () => {});
    return () => controller.abort();
  }, [query]);
  return <form className="max-w-xs"><Field name="place"><FieldLabel>位置</FieldLabel>
    <Combobox items={results} filter={null} value={value} onValueChange={setValue} inputValue={query} onInputValueChange={setQuery}>
      <ComboboxControl><ComboboxInput /><ComboboxTrigger /></ComboboxControl>
      <ComboboxPopup>
        <ComboboxStatus loading={loading} count={loading ? undefined : results.length} visible={loading} />
        <ComboboxEmpty>{loading ? null : "没有匹配的位置"}</ComboboxEmpty>
        <ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList>
      </ComboboxPopup>
    </Combobox></Field></form>;
}

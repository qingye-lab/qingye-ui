import { Autocomplete, AutocompleteEmpty, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup, AutocompleteStatus, useAutocompleteFilter } from "@yanqing/ui/components/autocomplete";
import { useState } from "react";

export const meta = { title: "限制条数", description: "limit 截断列表，状态行提示还有多少条可以继续输入缩小范围。" };

const stations = Array.from({ length: 40 }, (_, index) => `基站 HZ-${String(index + 101).padStart(4, "0")}`);
const limit = 6;

export default function Demo() {
  const [value, setValue] = useState("");
  const { contains } = useAutocompleteFilter();
  const total = stations.filter((station) => contains(station, value.trim())).length;
  const hidden = Math.max(0, total - limit);
  return (
    <div className="w-full max-w-sm">
      <Autocomplete items={stations} value={value} onValueChange={setValue} limit={limit}>
        <AutocompleteInput aria-label="基站编号" placeholder="输入基站编号" showTrigger />
        <AutocompletePopup>
          <AutocompleteEmpty>没有该编号的基站</AutocompleteEmpty>
          <AutocompleteList>
            {(station: string) => (
              <AutocompleteItem key={station} value={station} className="numeric">
                {station}
              </AutocompleteItem>
            )}
          </AutocompleteList>
          <AutocompleteStatus>{hidden ? `还有 ${hidden} 条结果，继续输入以缩小范围` : null}</AutocompleteStatus>
        </AutocompletePopup>
      </Autocomplete>
    </div>
  );
}

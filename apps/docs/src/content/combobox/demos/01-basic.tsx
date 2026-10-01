import { Combobox, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup } from "@yanqing/ui/components/combobox";
import { Label } from "@yanqing/ui/components/label";
import { useState } from "react";

export const meta = { title: "基础用法", description: "输入即筛选，方向键选择，回车确认。" };

const cities = ["北京", "上海", "广州", "深圳", "杭州", "南京", "苏州", "成都", "重庆", "武汉", "西安", "长沙", "青岛", "厦门"];

export default function Demo() {
  // 打开时清空输入，直接输入就能筛选，而不是把新文字接在旧值后面。
  const [query, setQuery] = useState("");
  return (
    <div className="flex w-full max-w-64 flex-col gap-2">
      <Label htmlFor="warehouse-city">发货城市</Label>
      <Combobox
        items={cities}
        defaultValue="杭州"
        inputValue={query}
        onInputValueChange={setQuery}
        onOpenChange={(open) => {
          if (open) setQuery("");
        }}
      >
        <ComboboxInput id="warehouse-city" placeholder="输入城市名" />
        <ComboboxPopup>
          <ComboboxEmpty>没有匹配的城市</ComboboxEmpty>
          <ComboboxList>
            {(city: string) => (
              <ComboboxItem key={city} value={city}>
                {city}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
    </div>
  );
}

import { Combobox, ComboboxCollection, ComboboxEmpty, ComboboxGroup, ComboboxGroupLabel, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxSeparator } from "@yanqing/ui/components/combobox";
import { Fragment } from "react";

export const meta = { title: "分组", description: "筛选后空的分组会自动隐藏。" };

type Zone = { label: string; value: string };
const groups: { value: string; items: Zone[] }[] = [
  { value: "华东", items: [{ label: "杭州 · 可用区 H", value: "hz-h" }, { label: "杭州 · 可用区 I", value: "hz-i" }, { label: "上海 · 可用区 L", value: "sh-l" }] },
  { value: "华北", items: [{ label: "北京 · 可用区 K", value: "bj-k" }, { label: "张家口 · 可用区 A", value: "zjk-a" }] },
  { value: "华南", items: [{ label: "深圳 · 可用区 E", value: "sz-e" }, { label: "广州 · 可用区 B", value: "gz-b" }] },
];

export default function Demo() {
  return (
    <div className="w-full max-w-64">
      <Combobox items={groups}>
        <ComboboxInput aria-label="可用区" placeholder="选择可用区" />
        <ComboboxPopup>
          <ComboboxEmpty>没有匹配的可用区</ComboboxEmpty>
          <ComboboxList>
            {(group: (typeof groups)[number]) => (
              <Fragment key={group.value}>
                <ComboboxGroup items={group.items}>
                  <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
                  <ComboboxCollection>
                    {(zone: Zone) => (
                      <ComboboxItem key={zone.value} value={zone}>
                        {zone.label}
                      </ComboboxItem>
                    )}
                  </ComboboxCollection>
                </ComboboxGroup>
                <ComboboxSeparator />
              </Fragment>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
    </div>
  );
}

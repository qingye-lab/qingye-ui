const e=`import { Autocomplete, AutocompleteCollection, AutocompleteEmpty, AutocompleteGroup, AutocompleteGroupLabel, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup, AutocompleteSeparator } from "@qingye/ui/components/autocomplete";
import { Fragment } from "react";

export const meta = { title: "分组与清除" };

const groups = [
  { value: "最近搜索", items: ["杭州 A 栋机房", "UPS 电池更换"] },
  { value: "热门", items: ["温度告警阈值", "VPN 无法连接", "打印机脱机", "会议室投屏"] },
];

export default function Demo() {
  return (
    <div className="w-full max-w-sm">
      <Autocomplete items={groups}>
        <AutocompleteInput aria-label="搜索工单" placeholder="搜索工单或知识库" showClear />
        <AutocompletePopup>
          <AutocompleteEmpty>没有匹配的结果</AutocompleteEmpty>
          <AutocompleteList>
            {(group: (typeof groups)[number]) => (
              <Fragment key={group.value}>
                <AutocompleteGroup items={group.items}>
                  <AutocompleteGroupLabel>{group.value}</AutocompleteGroupLabel>
                  <AutocompleteCollection>
                    {(item: string) => (
                      <AutocompleteItem key={item} value={item}>
                        {item}
                      </AutocompleteItem>
                    )}
                  </AutocompleteCollection>
                </AutocompleteGroup>
                <AutocompleteSeparator />
              </Fragment>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    </div>
  );
}
`;export{e as default};

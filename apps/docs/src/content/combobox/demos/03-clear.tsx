import { Combobox, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup } from "@yanqing/ui";
import { SearchIcon } from "lucide-react";

export const meta = { title: "前置图标、清除与自动高亮", description: "autoHighlight 让回车直接选中第一个匹配项。" };

const people = [
  { label: "张伟", value: "zhangwei", team: "运维组" },
  { label: "王芳", value: "wangfang", team: "网络组" },
  { label: "李娜", value: "lina", team: "安全组" },
  { label: "刘洋", value: "liuyang", team: "运维组" },
  { label: "陈静", value: "chenjing", team: "数据库组" },
  { label: "杨帆", value: "yangfan", team: "网络组" },
];

export default function Demo() {
  return (
    <div className="w-full max-w-64">
      <Combobox items={people} autoHighlight defaultValue={people[2]}>
        <ComboboxInput
          aria-label="值班负责人"
          placeholder="搜索成员"
          startAddon={<SearchIcon />}
          showClear
        />
        <ComboboxPopup>
          <ComboboxEmpty>没有找到该成员</ComboboxEmpty>
          <ComboboxList>
            {(person: (typeof people)[number]) => (
              <ComboboxItem key={person.value} value={person}>
                <span className="flex items-center justify-between gap-4">
                  {person.label}
                  <span className="text-muted-foreground text-xs">{person.team}</span>
                </span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
    </div>
  );
}

import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxValue } from "@yanqing/ui/components/combobox";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export const meta = { title: "可新建", description: "没有完全匹配时，列表末尾出现「新建」选项。" };

type Label = { value: string; label: string; create?: boolean };

export default function Demo() {
  const [labels, setLabels] = useState<Label[]>(
    ["网络故障", "硬件更换", "固件升级", "用户反馈"].map((label) => ({ value: label, label })),
  );
  const [selected, setSelected] = useState<Label[]>([labels[0]!]);
  const [query, setQuery] = useState("");
  const text = query.trim();
  const exists = labels.some((item) => item.label === text);
  const items = text && !exists ? [...labels, { value: `create:${text}`, label: text, create: true }] : labels;

  return (
    <Combobox
      items={items}
      multiple
      value={selected}
      onValueChange={(next: Label[]) => {
        const created = next.find((item) => item.create);
        if (created) {
          const label = { value: created.label, label: created.label };
          setLabels((previous) => [...previous, label]);
          setSelected([...next.filter((item) => !item.create), label]);
        } else {
          setSelected(next);
        }
        setQuery("");
      }}
      inputValue={query}
      onInputValueChange={setQuery}
    >
      <ComboboxChips className="w-full max-w-sm">
        <ComboboxValue>
          {(value: Label[]) => (
            <>
              {value.map((item) => (
                <ComboboxChip key={item.value} aria-label={item.label}>
                  {item.label}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput aria-label="工单标签" placeholder={value.length ? undefined : "输入或新建标签"} />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxPopup>
        <ComboboxList>
          {(item: Label) =>
            item.create ? (
              <ComboboxItem key={item.value} value={item}>
                <span className="flex items-center gap-2">
                  <PlusIcon aria-hidden="true" className="-ms-6 opacity-80" />
                  新建「{item.label}」
                </span>
              </ComboboxItem>
            ) : (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )
          }
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}

import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxValue } from "@yanqing/ui/components/combobox";

export const meta = { title: "多选标签", description: "已选项显示为标签；输入框为空时按 Backspace 移除最后一个。" };

const tags = ["生产环境", "测试环境", "核心业务", "边缘节点", "待下线", "GPU", "高可用", "等保三级", "华东", "华北"];

export default function Demo() {
  return (
    <Combobox items={tags} multiple defaultValue={["生产环境", "核心业务"]}>
      <ComboboxChips className="w-full max-w-sm">
        <ComboboxValue>
          {(value: string[]) => (
            <>
              {value.map((tag) => (
                <ComboboxChip key={tag} aria-label={tag}>
                  {tag}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput aria-label="资源标签" placeholder={value.length ? undefined : "添加标签"} />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxPopup>
        <ComboboxEmpty>没有匹配的标签</ComboboxEmpty>
        <ComboboxList>
          {(tag: string) => (
            <ComboboxItem key={tag} value={tag}>
              {tag}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}

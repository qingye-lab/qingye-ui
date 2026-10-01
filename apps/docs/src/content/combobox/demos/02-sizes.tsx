import { Combobox, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup } from "@yanqing/ui";

export const meta = { title: "尺寸与禁用" };

const models = ["iPhone 17 Pro", "iPhone 17", "iPad Air M3", "MacBook Air 13", "MacBook Pro 14", "Apple Watch S11"];

function ModelCombobox({ size = "default", disabled = false }: { size?: "sm" | "default" | "lg"; disabled?: boolean }) {
  return (
    <Combobox items={models} disabled={disabled} defaultValue={disabled ? "MacBook Pro 14" : null}>
      <ComboboxInput size={size} aria-label="设备型号" placeholder="搜索设备型号" />
      <ComboboxPopup>
        <ComboboxEmpty>没有匹配的型号</ComboboxEmpty>
        <ComboboxList>
          {(model: string) => (
            <ComboboxItem key={model} value={model}>
              {model}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}

export default function Demo() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-3">
      <ModelCombobox size="sm" />
      <ModelCombobox />
      <ModelCombobox size="lg" />
      <ModelCombobox disabled />
    </div>
  );
}

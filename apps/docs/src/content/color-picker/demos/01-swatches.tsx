import { ColorSwatchPicker } from "@qingye_lab/ui/components/color-picker";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "预设色", titleEn: "Presets" };

export default function Demo() {
  const en = useUILocale().code.startsWith("en");
  return <Field>
    <FieldLabel>{en ? "Label color" : "标签颜色"}</FieldLabel>
    <ColorSwatchPicker
      defaultValue="#007fff"
      swatches={[
        { value: "#e34234", label: en ? "Vermilion" : "朱红" },
        { value: "#ffbf00", label: en ? "Amber" : "琥珀" },
        { value: "#01796f", label: en ? "Pine" : "松绿" },
        { value: "#007fff", label: en ? "Azure" : "天蓝" },
        { value: "#4b0082", label: en ? "Indigo" : "靛蓝" },
        { value: "#8f00ff", label: en ? "Violet" : "紫" },
        { value: "#ffffff", label: en ? "White" : "白" },
        { value: "#1c1c1c", label: en ? "Ink" : "墨" },
      ]}
    />
  </Field>;
}

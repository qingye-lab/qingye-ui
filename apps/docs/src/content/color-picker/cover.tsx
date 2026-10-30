import { ColorSwatchPicker } from "@qingye_lab/ui/components/color-picker";
import { useUILocale } from "@qingye_lab/ui/locale";

export default function Cover() {
  const en = useUILocale().code.startsWith("en");
  return <ColorSwatchPicker
    aria-label={en ? "Label color" : "标签颜色"} defaultValue="#007fff"
    swatches={[
      { value: "#e34234", label: en ? "Vermilion" : "朱红" },
      { value: "#ffbf00", label: en ? "Amber" : "琥珀" },
      { value: "#01796f", label: en ? "Pine" : "松绿" },
      { value: "#007fff", label: en ? "Azure" : "天蓝" },
      { value: "#4b0082", label: en ? "Indigo" : "靛蓝" },
    ]}
  />;
}

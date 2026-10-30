import { useState } from "react";
import { ColorPicker } from "@qingye_lab/ui/components/color-picker";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "自由取色", titleEn: "Free choice" };

export default function Demo() {
  const en = useUILocale().code.startsWith("en");
  const [saved, setSaved] = useState("#007fff");
  return <Field>
    <FieldLabel>{en ? "Theme color" : "主题色"}</FieldLabel>
    <ColorPicker
      className="self-start" defaultValue={saved} onValueCommit={setSaved}
      swatches={[
        { value: "#e34234", label: en ? "Vermilion" : "朱红" },
        { value: "#ffbf00", label: en ? "Amber" : "琥珀" },
        { value: "#01796f", label: en ? "Pine" : "松绿" },
        { value: "#007fff", label: en ? "Azure" : "天蓝" },
        { value: "#4b0082", label: en ? "Indigo" : "靛蓝" },
        { value: "#8f00ff", label: en ? "Violet" : "紫" },
      ]}
    />
  </Field>;
}

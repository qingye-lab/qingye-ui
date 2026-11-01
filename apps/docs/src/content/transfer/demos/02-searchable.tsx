import { Field, FieldDescription, FieldLabel } from "@qingye_lab/ui/components/field";
import { Transfer } from "@qingye_lab/ui/components/transfer";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "筛选与表单", titleEn: "Filter and form" };

export default function Demo() {
  const { code } = useUILocale(); const en = code.startsWith("en");
  const labels = en
    ? ["Alder", "Birch", "Cedar", "Cypress", "Elm", "Fir", "Ginkgo", "Hazel", "Juniper", "Larch", "Maple", "Oak"]
    : ["赤杨", "白桦", "雪松", "柏", "榆", "冷杉", "银杏", "榛", "杜松", "落叶松", "枫", "橡"];
  const items = labels.map((label, index) => ({ value: `t${index}`, label }));
  return <Field name="trees" className="w-full max-w-xl">
    <FieldLabel>{en ? "Trees" : "树种"}</FieldLabel>
    <Transfer name="trees" items={items} searchable defaultValue={["t1"]} titles={en ? ["Available", "Chosen"] : ["候选", "选中"]} />
    <FieldDescription>{en ? "Select all and moving act on the filtered items only." : "全选与移动只作用于筛选后的条目。"}</FieldDescription>
  </Field>;
}

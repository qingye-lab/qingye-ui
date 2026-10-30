import { Cascader, type CascaderOption } from "@qingye_lab/ui/components/cascader";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "搜索路径", titleEn: "Search paths" };

const zh: CascaderOption[] = [
  { value: "home", label: "家居", children: [
    { value: "furniture", label: "家具", children: [{ value: "sofa", label: "沙发" }, { value: "table", label: "餐桌" }, { value: "bed", label: "床" }] },
    { value: "lighting", label: "灯具", children: [{ value: "desk-lamp", label: "台灯" }, { value: "ceiling", label: "吸顶灯" }] },
  ] },
  { value: "digital", label: "数码", children: [
    { value: "phone", label: "手机", children: [{ value: "case", label: "手机壳" }, { value: "charger", label: "充电器" }] },
    { value: "audio", label: "音频", children: [{ value: "headphone", label: "耳机" }, { value: "speaker", label: "音箱" }] },
  ] },
  { value: "books", label: "图书", children: [{ value: "fiction", label: "文学", children: [{ value: "novel", label: "小说" }, { value: "poetry", label: "诗歌" }] }] },
];
const en: CascaderOption[] = [
  { value: "home", label: "Home", children: [
    { value: "furniture", label: "Furniture", children: [{ value: "sofa", label: "Sofas" }, { value: "table", label: "Dining tables" }, { value: "bed", label: "Beds" }] },
    { value: "lighting", label: "Lighting", children: [{ value: "desk-lamp", label: "Desk lamps" }, { value: "ceiling", label: "Ceiling lights" }] },
  ] },
  { value: "digital", label: "Digital", children: [
    { value: "phone", label: "Phones", children: [{ value: "case", label: "Cases" }, { value: "charger", label: "Chargers" }] },
    { value: "audio", label: "Audio", children: [{ value: "headphone", label: "Headphones" }, { value: "speaker", label: "Speakers" }] },
  ] },
  { value: "books", label: "Books", children: [{ value: "fiction", label: "Fiction", children: [{ value: "novel", label: "Novels" }, { value: "poetry", label: "Poetry" }] }] },
];

export default function Demo() {
  const english = useUILocale().code.startsWith("en");
  return (
    <Field>
      <FieldLabel>{english ? "Category" : "类目"}</FieldLabel>
      <Cascader options={english ? en : zh} searchable name="category" />
    </Field>
  );
}

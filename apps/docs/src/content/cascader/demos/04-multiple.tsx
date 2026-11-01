import { useState } from "react";
import { Cascader, type CascaderOption } from "@qingye_lab/ui/components/cascader";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "多选路径", titleEn: "Multiple paths" };

const zh: CascaderOption[] = [
  { value: "zj", label: "浙江", children: [
    { value: "hz", label: "杭州", children: [{ value: "xh", label: "西湖区" }, { value: "yh", label: "余杭区" }, { value: "bj", label: "滨江区", disabled: true }] },
    { value: "nb", label: "宁波", children: [{ value: "hs", label: "海曙区" }, { value: "jb", label: "江北区" }] },
  ] },
  { value: "js", label: "江苏", children: [
    { value: "nj", label: "南京", children: [{ value: "gl", label: "鼓楼区" }, { value: "xw", label: "玄武区" }] },
  ] },
  { value: "xz", label: "西藏" },
];
const en: CascaderOption[] = [
  { value: "zj", label: "Zhejiang", children: [
    { value: "hz", label: "Hangzhou", children: [{ value: "xh", label: "Xihu" }, { value: "yh", label: "Yuhang" }, { value: "bj", label: "Binjiang", disabled: true }] },
    { value: "nb", label: "Ningbo", children: [{ value: "hs", label: "Haishu" }, { value: "jb", label: "Jiangbei" }] },
  ] },
  { value: "js", label: "Jiangsu", children: [
    { value: "nj", label: "Nanjing", children: [{ value: "gl", label: "Gulou" }, { value: "xw", label: "Xuanwu" }] },
  ] },
  { value: "xz", label: "Tibet" },
];

export default function Demo() {
  const english = useUILocale().code.startsWith("en");
  const [value, setValue] = useState<string[][]>([["zj", "hz", "xh"]]);
  return (
    <Field>
      <FieldLabel>{english ? "Regions" : "覆盖地区"}</FieldLabel>
      <Cascader multiple searchable options={english ? en : zh} value={value} onValueChange={setValue} name="regions" />
    </Field>
  );
}

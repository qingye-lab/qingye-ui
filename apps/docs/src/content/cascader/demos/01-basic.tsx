import { useState } from "react";
import { Cascader, type CascaderOption } from "@qingye_lab/ui/components/cascader";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "地区", titleEn: "Regions" };

const zh: CascaderOption[] = [
  { value: "zj", label: "浙江", children: [
    { value: "hz", label: "杭州", children: [{ value: "xh", label: "西湖区" }, { value: "bj", label: "滨江区", disabled: true }, { value: "yh", label: "余杭区" }] },
    { value: "nb", label: "宁波", children: [{ value: "hs", label: "海曙区" }, { value: "jb", label: "江北区" }] },
  ] },
  { value: "js", label: "江苏", children: [
    { value: "nj", label: "南京", children: [{ value: "gl", label: "鼓楼区" }, { value: "xw", label: "玄武区" }] },
    { value: "sz", label: "苏州", children: [{ value: "gs", label: "姑苏区" }] },
  ] },
  { value: "bj", label: "北京", children: [{ value: "bj-city", label: "北京市", children: [{ value: "dc", label: "东城区" }, { value: "xc", label: "西城区" }] }] },
];
const en: CascaderOption[] = [
  { value: "zj", label: "Zhejiang", children: [
    { value: "hz", label: "Hangzhou", children: [{ value: "xh", label: "Xihu" }, { value: "bj", label: "Binjiang", disabled: true }, { value: "yh", label: "Yuhang" }] },
    { value: "nb", label: "Ningbo", children: [{ value: "hs", label: "Haishu" }, { value: "jb", label: "Jiangbei" }] },
  ] },
  { value: "js", label: "Jiangsu", children: [
    { value: "nj", label: "Nanjing", children: [{ value: "gl", label: "Gulou" }, { value: "xw", label: "Xuanwu" }] },
    { value: "sz", label: "Suzhou", children: [{ value: "gs", label: "Gusu" }] },
  ] },
  { value: "bj", label: "Beijing", children: [{ value: "bj-city", label: "Beijing", children: [{ value: "dc", label: "Dongcheng" }, { value: "xc", label: "Xicheng" }] }] },
];

export default function Demo() {
  const { code } = useUILocale();
  const english = code.startsWith("en");
  const options = english ? en : zh;
  const [leaf, setLeaf] = useState<string[] | null>(["zj", "hz", "xh"]);
  const [any, setAny] = useState<string[] | null>(null);
  return (
    <div className="grid w-full sm:grid-cols-2 items-start gap-(--qy-space-4)">
      <Field>
        <FieldLabel>{english ? "Leaf only" : "只选到叶子"}</FieldLabel>
        <Cascader options={options} value={leaf} onValueChange={setLeaf} />
      </Field>
      <Field>
        <FieldLabel>{english ? "Any level" : "任意一级"}</FieldLabel>
        <Cascader options={options} selectParent value={any} onValueChange={setAny} />
      </Field>
    </div>
  );
}

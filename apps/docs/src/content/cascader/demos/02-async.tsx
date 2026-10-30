import { useRef } from "react";
import { Cascader, type CascaderOption } from "@qingye_lab/ui/components/cascader";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "按需加载", titleEn: "Load on demand" };

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function Demo() {
  const { code } = useUILocale();
  const english = code.startsWith("en");
  const failed = useRef(false);
  const roots: CascaderOption[] = english
    ? [{ value: "zj", label: "Zhejiang" }, { value: "js", label: "Jiangsu" }, { value: "xz", label: "Tibet", isLeaf: true }]
    : [{ value: "zj", label: "浙江" }, { value: "js", label: "江苏" }, { value: "xz", label: "西藏", isLeaf: true }];
  const cities: Record<string, CascaderOption[]> = english
    ? { zj: [{ value: "hz", label: "Hangzhou", isLeaf: true }, { value: "nb", label: "Ningbo", isLeaf: true }], js: [{ value: "nj", label: "Nanjing", isLeaf: true }, { value: "sz", label: "Suzhou", isLeaf: true }] }
    : { zj: [{ value: "hz", label: "杭州", isLeaf: true }, { value: "nb", label: "宁波", isLeaf: true }], js: [{ value: "nj", label: "南京", isLeaf: true }, { value: "sz", label: "苏州", isLeaf: true }] };
  return (
    <Field>
      <FieldLabel>{english ? "Region" : "地区"}</FieldLabel>
      <Cascader
        options={roots}
        loadChildren={async option => {
          await delay(700);
          // 江苏第一次取不到，重试后成功。
          if (option.value === "js" && !failed.current) { failed.current = true; throw new Error("offline"); }
          return cities[option.value] ?? [];
        }}
      />
    </Field>
  );
}

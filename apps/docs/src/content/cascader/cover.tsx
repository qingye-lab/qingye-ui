import { Cascader, type CascaderOption } from "@qingye_lab/ui/components/cascader";

const options: CascaderOption[] = [
  { value: "zj", label: "浙江", children: [{ value: "hz", label: "杭州", children: [{ value: "xh", label: "西湖区" }, { value: "yh", label: "余杭区" }] }, { value: "nb", label: "宁波" }] },
  { value: "js", label: "江苏", children: [{ value: "nj", label: "南京" }, { value: "sz", label: "苏州" }] },
];

export default function Cover() {
  return <Cascader aria-label="地区" options={options} defaultValue={["zj", "hz", "xh"]} className="w-full" />;
}

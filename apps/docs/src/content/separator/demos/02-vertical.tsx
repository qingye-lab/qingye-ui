import { Separator } from "@qingye_lab/ui/components/separator";
export const meta = { title: "行内分界", titleEn: "Inline boundary" };
export default function Demo() {
  return <nav aria-label="项目资料" className="flex items-center gap-(--qy-field-gap) text-body"><a href="/design.md">设计指南</a><Separator orientation="vertical" /><a href="https://github.com/qingye-lab/qingye-ui">仓库</a></nav>;
}

import { CopyButton } from "@qingye/ui/components/copy-button";
export const meta = { title: "五档", titleEn: "Sizes" };
export default function Demo() {
  return <div className="flex flex-wrap items-center gap-(--qy-action-gap)">{(["xs", "sm", "md", "lg", "xl"] as const).map(size => <CopyButton key={size} value={size} size={size} variant="bordered">{size}</CopyButton>)}</div>;
}

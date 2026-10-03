import { CopyButton } from "@qingye/ui/components/copy-button";
export const meta = { title: "复制文本", titleEn: "Copy text" };
export default function Demo() {
  return <div className="flex flex-wrap items-center gap-(--qy-action-gap)"><code className="text-body">Qingye</code><CopyButton value="Qingye" /><CopyButton value="Qingye" shape="icon" /><CopyButton value="Qingye" disabled /></div>;
}

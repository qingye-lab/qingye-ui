import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye_lab/ui/components/collapsible";
export const meta = { title: "页内查找", titleEn: "Find in page" };
export default function CollapsibleDemo() {
  return <Collapsible className="w-full max-w-sm"><CollapsibleTrigger>更新记录</CollapsibleTrigger><CollapsiblePanel hiddenUntilFound>修正了导出时丢失表头的问题，并让大文件的进度可以取消。</CollapsiblePanel></Collapsible>;
}

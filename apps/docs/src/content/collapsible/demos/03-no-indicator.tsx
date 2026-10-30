import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye_lab/ui/components/collapsible";
import { useUILocale } from "@qingye_lab/ui/locale";
export const meta = { title: "无箭头", titleEn: "Without arrow" };
export default function CollapsibleNoIndicatorDemo() {
  const { code } = useUILocale();
  const en = code.startsWith("en");
  return <Collapsible className="w-full max-w-sm"><CollapsibleTrigger indicator={false}>{en ? "Show more" : "查看更多"}</CollapsibleTrigger><CollapsiblePanel>{en ? "Additional content for the same object." : "同一对象的补充内容。"}</CollapsiblePanel></Collapsible>;
}

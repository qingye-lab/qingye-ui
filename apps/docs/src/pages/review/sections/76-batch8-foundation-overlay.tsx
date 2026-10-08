import AccordionDemo from "@/content/accordion/demos/01-states";
import CollapsibleDemo from "@/content/collapsible/demos/01-states";
import DrawerDemo from "@/content/drawer/demos/01-states";
import HoverCardDemo from "@/content/hover-card/demos/01-states";
import ThemeDemo from "@/content/theme-provider/demos/02-segmented";
import MotionDemo from "@/content/motion-provider/demos/01-modality";
import { Card } from "@qingye_lab/ui/components/card";
import { Stack } from "@qingye_lab/ui/components/layout";
export default function Batch8FoundationOverlay() {
  return <section id="batch8-foundation-overlay" className="min-w-0"><Stack gap="section"><h2 className="text-chapter">展开与返回</h2><Stack gap="panel"><h3 className="text-heading">分组展开</h3><AccordionDemo /></Stack><Stack gap="panel"><h3 className="text-heading">单段展开</h3><CollapsibleDemo /></Stack><Stack gap="panel"><h3 className="text-heading">边缘工作面</h3><DrawerDemo /></Stack><Stack gap="panel"><h3 className="text-heading">链接预览</h3><HoverCardDemo /></Stack><Stack gap="panel"><h3 className="text-heading">外观</h3><ThemeDemo /><Card className="w-full max-w-sm p-(--qy-panel-padding)">内容</Card></Stack><Stack gap="panel"><h3 className="text-heading">输入方式</h3><MotionDemo /></Stack></Stack></section>;
}

import BadgeDemo from "@/content/badge/demos/01-states";
import AvatarDemo from "@/content/avatar/demos/01-states";
import KbdDemo from "@/content/kbd/demos/01-states";
import StatusDotDemo from "@/content/status-dot/demos/01-states";
import AlertDemo from "@/content/alert/demos/01-states";
import PendingValueDemo from "@/content/pending-value/demos/01-states";
import MeterDemo from "@/content/meter/demos/01-states";
import ProgressDemo from "@/content/progress/demos/01-states";
import { Stack } from "@qingye_lab/ui/components/layout";
export default function Batch7Feedback() {
  return <section id="batch7-feedback" className="min-w-0"><Stack gap="section"><h2 className="text-chapter">展示与反馈</h2><Stack gap="panel"><h3 className="text-heading">标记</h3><BadgeDemo /></Stack><Stack gap="panel"><h3 className="text-heading">图像</h3><AvatarDemo /></Stack><Stack gap="panel"><h3 className="text-heading">键位</h3><KbdDemo /></Stack><Stack gap="panel"><h3 className="text-heading">状态</h3><StatusDotDemo /></Stack><Stack gap="panel"><h3 className="text-heading">就地说明</h3><AlertDemo /></Stack><Stack gap="panel"><h3 className="text-heading">结果未知</h3><PendingValueDemo /></Stack><Stack gap="panel"><h3 className="text-heading">测量</h3><MeterDemo /></Stack><Stack gap="panel"><h3 className="text-heading">进度</h3><ProgressDemo /></Stack></Stack></section>;
}

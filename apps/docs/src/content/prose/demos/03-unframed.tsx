import { Alert, AlertDescription, AlertTitle } from "@qingye_lab/ui/components/alert";
import { Card } from "@qingye_lab/ui/components/card";
import { Prose } from "@qingye_lab/ui/components/prose";
import type { DemoMeta } from "@/lib/types";
export const meta = {
  title: "已有承载面与文中的组件",
  titleEn: "An existing surface, and a component in the text",
} satisfies DemoMeta;
export default function Demo() {
  return <Card className="w-full p-(--qy-panel-padding)">
    <Prose framed={false}>
      <header>
        <h1>重新同步</h1>
        <p>把上一次没有写入的记录再发送一遍，已经写入的不会重复。</p>
      </header>
      <p>重新同步只处理失败与未知两种结果。开始之前，先在操作记录里确认失败原因已经排除，否则同一批记录会再失败一次。</p>
      <Alert tone="warning">
        <AlertTitle>结果未知的记录需要先核实</AlertTitle>
        <AlertDescription>请求已经发出但没有收到确认，直接重试可能写入两次。</AlertDescription>
      </Alert>
      <p>核实完成后，在集合的「同步记录」页选择这一批，再点「重新同步」。</p>
    </Prose>
  </Card>;
}

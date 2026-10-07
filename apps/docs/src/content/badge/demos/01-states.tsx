import { Badge } from "@qingye/ui/components/badge";
import { Inline } from "@qingye/ui/components/layout";

export const meta = { title: "标记", titleEn: "Markers" };

// 标记没有尺寸档：它标注哪段文字就与哪段文字同大（用户裁决 2026-10-05）。
export default function Demo() {
  return (
    <div className="grid gap-(--qy-field-group-gap)">
      <Inline><Badge>草稿</Badge><Badge>已完成</Badge><Badge variant="emphasis">重点</Badge><Badge tone="warning">即将过期</Badge><Badge tone="danger">同步失败</Badge></Inline>
      <p className="text-support text-muted-foreground">与紧凑文字同行时 <Badge>待确认</Badge></p>
    </div>
  );
}

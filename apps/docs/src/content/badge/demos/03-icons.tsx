import { Badge } from "@yanqing/ui";
import { BadgeCheckIcon, CircleCheckIcon, CircleXIcon, ClockIcon, GitBranchIcon, TriangleAlertIcon } from "lucide-react";

export const meta = { title: "带图标", description: "图标放在文字前，尺寸随徽章自动调整。" };

export default function Demo() {
  return (
    <>
      <Badge variant="outline">
        <BadgeCheckIcon aria-hidden="true" />
        已认证
      </Badge>
      <Badge variant="secondary">
        <GitBranchIcon aria-hidden="true" />
        main
      </Badge>
      <Badge variant="info">
        <ClockIcon aria-hidden="true" />
        排队中
      </Badge>
      <Badge variant="success">
        <CircleCheckIcon aria-hidden="true" />
        已部署
      </Badge>
      <Badge variant="warning">
        <TriangleAlertIcon aria-hidden="true" />
        证书 7 天后过期
      </Badge>
      <Badge variant="error">
        <CircleXIcon aria-hidden="true" />
        构建失败
      </Badge>
    </>
  );
}

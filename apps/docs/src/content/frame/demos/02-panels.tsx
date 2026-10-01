import { Badge } from "@qingye/ui/components/badge";
import { Button } from "@qingye/ui/components/button";
import { Frame, FrameDescription, FrameHeader, FramePanel, FrameTitle } from "@qingye/ui/components/frame";
import { ExternalLinkIcon } from "lucide-react";

export const meta = { title: "多个面板", description: "相邻面板之间自动留出 4px，露出外框的浅底作为分隔。" };

const environments = [
  { name: "生产环境", branch: "main", deployed: "2 分钟前", status: "运行中", tone: "bg-success" },
  { name: "预发环境", branch: "release/2.5", deployed: "今天 09:12", status: "运行中", tone: "bg-success" },
  { name: "开发环境", branch: "feat/coupon", deployed: "构建中", status: "部署中", tone: "bg-info" },
];

export default function Demo() {
  return (
    <Frame className="w-full max-w-lg">
      <FrameHeader>
        <FrameTitle>环境</FrameTitle>
        <FrameDescription>每个环境对应一个分支，推送即部署。</FrameDescription>
      </FrameHeader>
      {environments.map((env) => (
        <FramePanel key={env.name} className="flex items-center gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{env.name}</span>
              <Badge variant="outline">
                <span aria-hidden="true" className={`size-1.5 rounded-full ${env.tone}`} />
                {env.status}
              </Badge>
            </div>
            <span className="truncate text-muted-foreground text-xs">
              <span className="font-mono">{env.branch}</span> · {env.deployed}
            </span>
          </div>
          <Button size="sm" variant="outline">
            访问
            <ExternalLinkIcon aria-hidden="true" />
          </Button>
        </FramePanel>
      ))}
    </Frame>
  );
}

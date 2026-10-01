import { Badge } from "@qingye/ui/components/badge";
import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle } from "@qingye/ui/components/frame";

export const meta = { title: "基础", description: "标题与提示落在浅底上，主要内容放进白色面板。" };

export default function Demo() {
  return (
    <Frame className="w-full max-w-lg">
      <FrameHeader>
        <FrameTitle>自定义域名</FrameTitle>
        <FrameDescription>绑定后可以用自己的域名访问项目。</FrameDescription>
      </FrameHeader>
      <FramePanel className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-4">
          <span className="truncate font-medium text-sm">shop.qingye.example</span>
          <Badge variant="success">已生效</Badge>
        </div>
        <span className="text-muted-foreground text-xs">SSL 证书将于 2027年1月12日自动续期</span>
      </FramePanel>
      <FrameFooter className="text-muted-foreground text-sm">DNS 记录变更最长需要 48 小时生效。</FrameFooter>
    </Frame>
  );
}

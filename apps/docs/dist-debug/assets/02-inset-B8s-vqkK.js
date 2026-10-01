const n=`import { Badge } from "@qingye/ui/components/badge";
import { Disclosure, DisclosurePanel, DisclosureTrigger } from "@qingye/ui/components/disclosure";
import { TerminalIcon } from "lucide-react";

export const meta = {
  title: "独立区块",
  description: "inset：自带边框，适合卡片中的详情或日志。",
};

const log = [
  "14:32:01  安装依赖  pnpm install --frozen-lockfile",
  "14:32:19  构建  pnpm build",
  "14:32:46  上传 128 个文件到 CDN",
  "14:32:49  部署完成，耗时 48 秒",
];

export default function Demo() {
  return (
    <Disclosure className="w-full max-w-md" defaultOpen variant="inset">
      <DisclosureTrigger>
        <TerminalIcon />
        构建日志
        <Badge variant="success">成功</Badge>
      </DisclosureTrigger>
      <DisclosurePanel>
        <pre className="numeric overflow-x-auto rounded-lg bg-muted p-3 font-mono text-muted-foreground text-xs leading-relaxed">
          {log.join("\\n")}
        </pre>
      </DisclosurePanel>
    </Disclosure>
  );
}
`;export{n as default};

import { Badge } from "@qingye_lab/ui/components/badge";

export type ServerLoadProps = {
  servers: { name: string; load: "低" | "中" | "高" }[];
};

// 错解：用带状态类别的徽标显示等级
export function ServerLoad({ servers }: ServerLoadProps) {
  return (
    <ul>
      {servers.map(server => (
        <li key={server.name}>
          <span>{server.name}</span>
          <Badge tone={server.load === "高" ? "danger" : server.load === "中" ? "warning" : "info"}>{server.load}</Badge>
        </li>
      ))}
    </ul>
  );
}

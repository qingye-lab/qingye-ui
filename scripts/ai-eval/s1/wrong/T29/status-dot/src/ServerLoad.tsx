import { StatusDot } from "@qingye_lab/ui/components/status-dot";

export type ServerLoadProps = {
  servers: { name: string; load: "低" | "中" | "高" }[];
};

// 错解：用状态点表示负载
export function ServerLoad({ servers }: ServerLoadProps) {
  return (
    <ul>
      {servers.map(server => (
        <li key={server.name}>
          <span>{server.name}</span>
          <StatusDot status={server.load === "高" ? "error" : server.load === "中" ? "warning" : "online"} label={server.load} />
        </li>
      ))}
    </ul>
  );
}

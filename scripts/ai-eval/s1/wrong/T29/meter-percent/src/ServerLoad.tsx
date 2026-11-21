import { Meter, MeterIndicator, MeterTrack } from "@qingye_lab/ui/components/meter";

export type ServerLoadProps = {
  servers: { name: string; load: "低" | "中" | "高" }[];
};

const percent = { 低: 33, 中: 66, 高: 100 } as const;

// 错解：把等级当百分比，不分格
export function ServerLoad({ servers }: ServerLoadProps) {
  return (
    <ul>
      {servers.map(server => (
        <li key={server.name}>
          <span>{server.name}</span>
          <Meter aria-label={`${server.name}负载`} value={percent[server.load]} tone={server.load === "高" ? "danger" : undefined}>
            <MeterTrack><MeterIndicator /></MeterTrack>
          </Meter>
        </li>
      ))}
    </ul>
  );
}

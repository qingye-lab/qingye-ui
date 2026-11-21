import { Meter, MeterIndicator, MeterTrack } from "@qingye_lab/ui/components/meter";

export type ServerLoadProps = {
  servers: { name: string; load: "低" | "中" | "高" }[];
};

const levels = ["低", "中", "高"] as const;
const tones = { 低: "info", 中: "warning", 高: "danger" } as const;

// 级别是「三级里的第几级」：Meter segments={3} + tone（meter.md），不用 StatusDot
export function ServerLoad({ servers }: ServerLoadProps) {
  return (
    <ul className="m-0 grid list-none gap-(--qy-field-gap) p-0">
      {servers.map(server => (
        <li key={server.name} className="flex min-w-0 items-center justify-between gap-(--qy-panel-gap)">
          <span className="min-w-0 wrap-anywhere">{server.name}</span>
          <Meter className="w-16 shrink-0" aria-label={`${server.name}负载`} value={levels.indexOf(server.load) + 1} min={0} max={3} segments={3} tone={tones[server.load]} getAriaValueText={(_, value) => levels[value - 1]!}>
            <MeterTrack><MeterIndicator /></MeterTrack>
          </Meter>
        </li>
      ))}
    </ul>
  );
}

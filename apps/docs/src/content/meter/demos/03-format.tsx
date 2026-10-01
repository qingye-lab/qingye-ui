import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "@yanqing/ui/components/meter";

export const meta = {
  title: "格式化数值",
  description: "format 接收 Intl.NumberFormat 选项，可显示金额、单位；min / max 可以是任意范围。",
};

export default function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Meter
        format={{ style: "currency", currency: "CNY", maximumFractionDigits: 0 }}
        locale="zh-CN"
        max={5000}
        value={3260}
      >
        <div className="flex items-center justify-between gap-2">
          <MeterLabel>本月广告预算</MeterLabel>
          <MeterValue className="text-muted-foreground">{(formatted) => `${formatted} / ¥5,000`}</MeterValue>
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>
      <Meter format={{ style: "unit", unit: "gigabyte", maximumFractionDigits: 1 }} max={16} value={12.4}>
        <div className="flex items-center justify-between gap-2">
          <MeterLabel>内存</MeterLabel>
          <MeterValue className="text-muted-foreground">{(formatted) => `${formatted} / 16 GB`}</MeterValue>
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>
      <Meter format={{ style: "unit", unit: "celsius" }} max={100} min={30} value={68}>
        <div className="flex items-center justify-between gap-2">
          <MeterLabel>CPU 温度</MeterLabel>
          <MeterValue className="text-muted-foreground" />
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>
    </div>
  );
}

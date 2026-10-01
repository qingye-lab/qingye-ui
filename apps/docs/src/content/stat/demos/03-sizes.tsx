import { Stat, StatDelta, StatDescription, StatLabel, StatUnit, StatValue } from "@qingye/ui/components/stat";

export const meta = { title: "尺寸", description: "sm 用于侧栏等紧凑区域，lg 留给一个视图里最重要的数字。" };

const sizes = [
  { size: "sm", label: "小" },
  { size: "default", label: "默认" },
  { size: "lg", label: "大" },
] as const;

export default function Demo() {
  return (
    <div className="flex w-full flex-wrap items-end justify-around gap-x-10 gap-y-8">
      {sizes.map(({ size, label }) => (
        <Stat key={size} size={size}>
          <StatLabel>本月营收 · {label}</StatLabel>
          <StatValue>
            <StatUnit>¥</StatUnit>
            128,460
          </StatValue>
          <StatDescription>
            <StatDelta trend="up">+6.8%</StatDelta>
            环比
          </StatDescription>
        </Stat>
      ))}
    </div>
  );
}

import { Stat, StatLabel, StatUnit, StatValue } from "@qingye_lab/ui/components/stat";

export default function Cover() {
  return <Stat state="known"><StatLabel>数量</StatLabel><StatValue>24<StatUnit>项</StatUnit></StatValue></Stat>;
}

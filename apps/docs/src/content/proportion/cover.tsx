import { Proportion } from "@qingye_lab/ui/components/proportion";

export default function Cover() {
  return <Proportion className="w-full" label="存储用量" total={100} format={n => `${n} GB`} items={[
    { key: "rec", label: "记录", value: 42 },
    { key: "att", label: "附件", value: 23 },
  ]} />;
}

import { Transfer } from "@qingye_lab/ui/components/transfer";

const items = ["苹果", "香蕉", "樱桃", "葡萄"].map(label => ({ value: label, label }));

export default function Cover() {
  return <Transfer items={items} defaultValue={["樱桃"]} listClassName="h-28" className="w-full max-w-md" />;
}

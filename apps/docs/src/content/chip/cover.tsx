import { Chip } from "@qingye_lab/ui/components/chip";

export default function Cover() {
  return <div className="flex flex-wrap gap-(--qy-space-2)">
    <Chip onRemove={() => {}}>设计</Chip>
    <Chip onRemove={() => {}}>工程</Chip>
    <Chip onRemove={() => {}}>运营</Chip>
  </div>;
}

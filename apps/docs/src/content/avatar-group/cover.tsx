import { AvatarGroup } from "@qingye_lab/ui/components/avatar-group";

export default function Cover() {
  return <AvatarGroup aria-label="项目成员" max={3} items={[{ label: "陈致远" }, { label: "李一鸣" }, { label: "王一" }, { label: "周宁" }, { label: "赵清" }]} />;
}

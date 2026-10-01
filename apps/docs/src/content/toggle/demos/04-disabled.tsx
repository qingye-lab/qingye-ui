import { Toggle } from "@yanqing/ui/components/toggle";
import { LockIcon } from "lucide-react";

export const meta = { title: "禁用" };

export default function Demo() {
  return (
    <>
      <Toggle disabled variant="outline">
        <LockIcon />
        只读模式
      </Toggle>
      <Toggle defaultPressed disabled variant="outline">
        <LockIcon />
        已锁定
      </Toggle>
    </>
  );
}

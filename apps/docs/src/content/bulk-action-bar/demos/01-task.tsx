import * as React from "react";
import { BulkActionBar, BulkActionBarAction, BulkActionBarActions, BulkActionBarClear } from "@qingye_lab/ui/components/bulk-action-bar";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "已选对象与动作", titleEn: "Selected targets and actions" } satisfies DemoMeta;
const selection = [{ id: "a", label: "接入设备", version: 1 }, { id: "b", label: "权限与角色", version: 1 }];
export default function Demo() {
  const [targets, setTargets] = React.useState(selection);
  const clear = () => setTargets([]);
  return <BulkActionBar className="w-full max-w-xl" targets={targets} scope="所选条目" onClear={clear}>
    <BulkActionBarActions><BulkActionBarAction onExecute={clear}>标记</BulkActionBarAction><BulkActionBarClear /></BulkActionBarActions>
  </BulkActionBar>;
}

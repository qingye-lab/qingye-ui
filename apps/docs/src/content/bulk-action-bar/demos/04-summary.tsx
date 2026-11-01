import { BulkActionBar, BulkActionBarAction, BulkActionBarActions, BulkActionBarClear } from "@qingye_lab/ui/components/bulk-action-bar";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "量词与合计", titleEn: "Unit and total" } satisfies DemoMeta;

const targets = [{ id: "a", label: "文件 A", version: 1, size: 12 }, { id: "b", label: "文件 B", version: 1, size: 30 }, { id: "c", label: "文件 C", version: 2, size: 8 }];

export default function Demo() {
  const total = targets.reduce((sum, target) => sum + target.size, 0);
  return (
    <BulkActionBar targets={targets} scope="当前文件夹所选文件" formatCount={count => `已选 ${count} 个文件`} summary={`共 ${total} MB`}>
      <BulkActionBarActions><BulkActionBarAction onExecute={() => {}}>移动</BulkActionBarAction><BulkActionBarClear onClick={() => {}} /></BulkActionBarActions>
    </BulkActionBar>
  );
}

import { BulkActionBar, BulkActionBarAction, BulkActionBarActions, BulkActionBarClear } from "@qingye_lab/ui/components/bulk-action-bar";

export default function Cover() {
  return <BulkActionBar className="w-full" targets={[{ id: "a", label: "接入设备", version: 0 }]} scope="本地集合所选条目" onClear={() => {}}>
    <BulkActionBarActions><BulkActionBarAction onExecute={() => {}}>标记</BulkActionBarAction><BulkActionBarClear /></BulkActionBarActions>
  </BulkActionBar>;
}

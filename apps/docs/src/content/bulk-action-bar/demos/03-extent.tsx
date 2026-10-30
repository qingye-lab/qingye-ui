import * as React from "react";
import { BulkActionBar, BulkActionBarAction, BulkActionBarActions, BulkActionBarClear, BulkActionBarExtend } from "@qingye_lab/ui/components/bulk-action-bar";
import { Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "跨页范围", titleEn: "Extent beyond the page" } satisfies DemoMeta;
const page = [{ id: "a", label: "接入设备", version: 1 }, { id: "b", label: "权限与角色", version: 1 }];
export default function Demo() {
  const [extended, setExtended] = React.useState(false); const [result, setResult] = React.useState("未执行");
  return <Stack><BulkActionBar targets={extended ? [] : page} extent={extended ? { count: 1284, label: "符合当前筛选的全部条目" } : undefined} scope="本地筛选结果" onClear={() => setExtended(false)}>{!extended && <BulkActionBarExtend count={1284} onExtend={() => setExtended(true)} />}<BulkActionBarActions><BulkActionBarAction onExecute={snapshot => setResult(snapshot.extent ? `按应用持有的查询处理 ${snapshot.extent.count} 项` : `处理 ${snapshot.targets.length} 项`)}>标记</BulkActionBarAction><BulkActionBarClear /></BulkActionBarActions></BulkActionBar><output className="text-support">{result}</output></Stack>;
}

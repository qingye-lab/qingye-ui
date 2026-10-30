import { DataTablePattern, type DataTablePatternColumn } from "@qingye_lab/ui/components/data-table";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "固定表头、固定列与空值", titleEn: "Sticky header, pinned columns and empty values" } satisfies DemoMeta;

type Account = { id: string; name: string; region: string; owner: string | null; orders: number; refunds: number | null; plan: string; renewal: string | null };
const regions = ["华东", "华北", "华南", "西南"];
const rows: Account[] = Array.from({ length: 40 }, (_, index) => ({
  id: `account-${index + 1}`,
  name: `账户 ${String(index + 1).padStart(2, "0")}`,
  region: regions[index % regions.length]!,
  owner: index % 5 === 0 ? null : `负责人 ${index % 9 + 1}`,
  orders: index % 6 === 0 ? 0 : (index * 37) % 400,
  refunds: index % 4 === 0 ? null : index % 3,
  plan: index % 2 ? "标准版" : "企业版",
  renewal: index % 7 === 0 ? "" : `2027-0${index % 9 + 1}-1${index % 9}`,
}));

export default function Demo() {
  const english = useUILocale().code.startsWith("en");
  const columns: DataTablePatternColumn<Account>[] = [
    { id: "name", header: english ? "Account" : "账户", accessor: row => row.name, rowHeader: true, size: 140, pinned: true },
    { id: "region", header: english ? "Region" : "区域", accessor: row => row.region, size: 120 },
    { id: "owner", header: english ? "Owner" : "负责人", accessor: row => row.owner, size: 160 },
    { id: "orders", header: english ? "Orders" : "订单", accessor: row => row.orders, size: 120, numeric: true },
    { id: "refunds", header: english ? "Refunds" : "退款", accessor: row => row.refunds, size: 120, numeric: true, empty: english ? "N/A" : "不适用" },
    { id: "plan", header: english ? "Plan" : "套餐", accessor: row => row.plan, size: 160 },
    { id: "renewal", header: english ? "Renewal" : "续费日", accessor: row => row.renewal, size: 180 },
  ];
  return <DataTablePattern data={rows} columns={columns} getRowId={row => row.id} caption={english ? "Accounts" : "账户"} emptyContent={english ? "No accounts" : "没有账户"} stickyHeader selection={{ label: english ? "Select accounts" : "选择账户", rowLabel: row => english ? `Select ${row.name}` : `选择${row.name}` }} tableProps={{ containerProps: { className: "max-h-72" } }} />;
}

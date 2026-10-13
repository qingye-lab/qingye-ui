import { Field } from "@qingye_lab/ui/components/field";
import { FilterBar, FilterBarActions, FilterBarApply, FilterBarClear, FilterBarFields } from "@qingye_lab/ui/components/filter-bar";
import { Input } from "@qingye_lab/ui/components/input";

export default function Cover() {
  return <FilterBar className="w-full" dirty canClear appliedSummary="已应用：全部本地条目" onApply={() => {}} onCancel={() => {}} onClear={() => {}}>
    <FilterBarFields><Field><Input aria-label="名称包含" defaultValue="接入" /></Field></FilterBarFields>
    <FilterBarActions><FilterBarApply /><FilterBarClear /></FilterBarActions>
  </FilterBar>;
}

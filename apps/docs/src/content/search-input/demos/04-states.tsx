import { SearchInput } from "@qingye/ui/components/search-input";

export const meta = { title: "加载与禁用", description: "loading 用 Spinner 替换搜索图标；禁用时不显示清除按钮。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <SearchInput aria-label="搜索客户" defaultValue="王" loading />
      <SearchInput aria-label="搜索客户" disabled placeholder="同步完成前不可搜索" />
    </div>
  );
}

import { SearchInput } from "@yanqing/ui/components/search-input";

export const meta = { title: "尺寸" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <SearchInput aria-label="搜索" defaultValue="摄像头" size="sm" />
      <SearchInput aria-label="搜索" defaultValue="摄像头" />
      <SearchInput aria-label="搜索" defaultValue="摄像头" size="lg" />
    </div>
  );
}

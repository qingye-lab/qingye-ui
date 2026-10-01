const n=`import { Kbd } from "@qingye/ui/components/kbd";
import { SearchInput } from "@qingye/ui/components/search-input";

export const meta = { title: "快捷键提示", description: "为空时在末端提示唤起快捷键。" };

export default function Demo() {
  return (
    <SearchInput
      aria-keyshortcuts="Meta+K"
      aria-label="搜索文档"
      className="max-w-xs"
      placeholder="搜索文档…"
      shortcut={<Kbd>⌘K</Kbd>}
    />
  );
}
`;export{n as default};

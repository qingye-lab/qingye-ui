const _04States = 'import { SearchInput } from "@yanqing/ui";\n\nexport const meta = { title: "加载与禁用", description: "loading 用 Spinner 替换搜索图标；禁用时不显示清除按钮。" };\n\nexport default function Demo() {\n  return (\n    <div className="flex w-full max-w-xs flex-col gap-3">\n      <SearchInput aria-label="搜索客户" defaultValue="王" loading />\n      <SearchInput aria-label="搜索客户" disabled placeholder="同步完成前不可搜索" />\n    </div>\n  );\n}\n';
export {
  _04States as default
};

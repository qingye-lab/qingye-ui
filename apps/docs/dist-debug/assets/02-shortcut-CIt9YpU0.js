const _02Shortcut = 'import { Kbd, SearchInput } from "@yanqing/ui";\n\nexport const meta = { title: "快捷键提示", description: "为空时在末端提示唤起快捷键。" };\n\nexport default function Demo() {\n  return (\n    <SearchInput\n      aria-keyshortcuts="Meta+K"\n      aria-label="搜索文档"\n      className="max-w-xs"\n      placeholder="搜索文档…"\n      shortcut={<Kbd>⌘K</Kbd>}\n    />\n  );\n}\n';
export {
  _02Shortcut as default
};

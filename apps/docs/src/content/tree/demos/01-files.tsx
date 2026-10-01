import type { TreeNode } from "@yanqing/ui/components/tree";
import { Tree } from "@yanqing/ui/components/tree";
import { FileCodeIcon, FileJsonIcon, FileTextIcon, FolderIcon, FolderOpenIcon } from "lucide-react";

export const meta = { title: "文件目录", description: "文件夹展开时切换图标；参考线标出所在分支。" };

const folder = { icon: <FolderIcon />, expandedIcon: <FolderOpenIcon /> };

const nodes: TreeNode[] = [
  {
    id: "src",
    label: "src",
    ...folder,
    children: [
      {
        id: "components",
        label: "components",
        ...folder,
        children: [
          { id: "button", label: "button.tsx", icon: <FileCodeIcon /> },
          { id: "dialog", label: "dialog.tsx", icon: <FileCodeIcon /> },
          { id: "table", label: "table.tsx", icon: <FileCodeIcon /> },
        ],
      },
      { id: "hooks", label: "hooks", ...folder, children: [{ id: "media", label: "use-media-query.ts", icon: <FileCodeIcon /> }] },
      { id: "index", label: "index.ts", icon: <FileCodeIcon /> },
    ],
  },
  { id: "docs", label: "docs", ...folder, children: [{ id: "guide", label: "快速上手.md", icon: <FileTextIcon /> }] },
  { id: "package", label: "package.json", icon: <FileJsonIcon /> },
  { id: "readme", label: "README.md", icon: <FileTextIcon /> },
];

export default function Demo() {
  return <Tree className="w-full max-w-xs" defaultExpanded={["src", "components"]} defaultValue="table" label="项目文件" nodes={nodes} />;
}

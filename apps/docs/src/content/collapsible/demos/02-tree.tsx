import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@yanqing/ui/components/collapsible";
import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";

export const meta = { title: "自定义触发器", description: "触发器完全自定：这里做成文件夹节点。" };

const folders = [
  { name: "components", files: ["button.tsx", "tabs.tsx", "carousel.tsx"] },
  { name: "tokens", files: ["semantic.css", "components.css"] },
];

export default function Demo() {
  return (
    <div className="w-full max-w-xs text-sm">
      {folders.map((folder, i) => (
        <Collapsible defaultOpen={i === 0} key={folder.name}>
          <CollapsibleTrigger className="flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring">
            <ChevronRightIcon className="size-4 text-muted-foreground transition-transform duration-200 in-data-panel-open:rotate-90 rtl:-scale-x-100" />
            <FolderIcon aria-hidden="true" className="size-4 text-muted-foreground" />
            {folder.name}
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <ul className="ms-3.5 border-s ps-3">
              {folder.files.map((file) => (
                <li className="flex items-center gap-1.5 px-1.5 py-1 text-muted-foreground" key={file}>
                  <FileIcon aria-hidden="true" className="size-4" />
                  {file}
                </li>
              ))}
            </ul>
          </CollapsiblePanel>
        </Collapsible>
      ))}
    </div>
  );
}

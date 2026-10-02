# 折叠 Collapsible

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/collapsible
Source: packages/ui/src/components/collapsible.tsx
Source SHA-256: ab73227ca67e5291f6568a5401bdd1e4833927942cae4e4b34827fb60fb164e5

无样式的折叠原语：一个触发器控制一块内容的展开与收起，高度平滑过渡。触发器外观完全自定，适合“显示更多”、树节点等。需要现成样式时用 Disclosure。

## Use and ownership
- 无样式的折叠原语：一个触发器控制一块内容的展开与收起，高度平滑过渡。触发器外观完全自定，适合“显示更多”、树节点等。需要现成样式时用 Disclosure。
- Avoid: 不要让样式替代语义；空值、未知与零分别表达。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 数据、权限、动作范围、异步结果与持久化。

## Current exports
- Collapsible: function; owner collapsible; PASS; props: CollapsiblePrimitive.Root.Props
- CollapsibleContent: function; owner collapsible; alias of CollapsiblePanel; PASS; props: CollapsiblePrimitive.Panel.Props
- CollapsiblePanel: function; owner collapsible; PASS; props: CollapsiblePrimitive.Panel.Props
- CollapsiblePrimitive: reexport; owner collapsible; UNVERIFIED
- CollapsibleTrigger: function; owner collapsible; PASS; props: CollapsiblePrimitive.Trigger.Props

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Collapsible
根组件。
- open / defaultOpen: boolean. 展开状态（受控 / 非受控）。
- onOpenChange: (open: boolean) => void. 展开状态变化时调用。
- disabled: boolean; default false. 禁用。
- render: ReactElement. 替换根元素，例如渲染为 <li>。

### CollapsibleTrigger
触发按钮，不带样式；展开时带 data-panel-open，可据此旋转箭头。用 render 渲染为 Button。

### CollapsiblePanel
折叠内容，高度过渡。别名 CollapsibleContent。
- keepMounted: boolean; default false. 收起时保留在 DOM 中。
- hiddenUntilFound: boolean; default false. 收起的内容可被页内搜索找到。

## Keyboard
- Enter / Space: 展开或收起。

## Source examples
### 显示更多
Source: apps/docs/src/content/collapsible/demos/01-show-more.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye/ui/components/collapsible";
import { ChevronDownIcon, GitBranchIcon } from "lucide-react";
import { useState } from "react";

export const meta = { title: "显示更多", description: "先展示最常用的几项，其余收起。" };

const repos = ["qingye-ui", "qingye-docs", "qingyan-site", "deploy-scripts", "design-tokens"];

function Repo({ name }: { name: string }) {
  return (
    <li className="flex items-center gap-2 rounded-md px-2 py-1.5 font-mono text-[0.8125rem]">
      <GitBranchIcon aria-hidden="true" className="size-4 text-muted-foreground" />
      {name}
    </li>
  );
}

export default function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible className="w-full max-w-xs" onOpenChange={setOpen} open={open}>
      <ul>
        {repos.slice(0, 2).map((name) => (
          <Repo key={name} name={name} />
        ))}
      </ul>
      <CollapsiblePanel render={<ul />}>
        {repos.slice(2).map((name) => (
          <Repo key={name} name={name} />
        ))}
      </CollapsiblePanel>
      <CollapsibleTrigger render={<Button className="mt-1" size="sm" variant="ghost" />}>
        {open ? "收起" : `显示其余 ${repos.length - 2} 个仓库`}
        <ChevronDownIcon className="transition-transform duration-200 in-data-panel-open:rotate-180" />
      </CollapsibleTrigger>
    </Collapsible>
  );
}
```

### 自定义触发器
Source: apps/docs/src/content/collapsible/demos/02-tree.tsx
```tsx
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye/ui/components/collapsible";
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
```


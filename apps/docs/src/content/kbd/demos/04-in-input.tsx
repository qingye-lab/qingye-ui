import { InputGroup, InputGroupAddon, InputGroupInput, Kbd } from "@yanqing/ui";
import { SearchIcon } from "lucide-react";

export const meta = { title: "在输入框中", description: "放进 InputGroupAddon，提示唤起搜索的快捷键。" };

export default function Demo() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput aria-keyshortcuts="Meta+K" aria-label="搜索文档" placeholder="搜索文档…" type="search" />
      <InputGroupAddon>
        <SearchIcon aria-hidden="true" />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <Kbd aria-hidden="true">⌘K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  );
}

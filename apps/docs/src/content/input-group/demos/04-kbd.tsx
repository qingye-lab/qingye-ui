import { InputGroup, InputGroupAddon, InputGroupInput } from "@qingye/ui/components/input-group";
import { Kbd } from "@qingye/ui/components/kbd";
import { Spinner } from "@qingye/ui/components/spinner";
import { SearchIcon } from "lucide-react";

export const meta = { title: "按键提示与加载", description: "末端放快捷键提示，或在查询时显示 Spinner。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <InputGroup>
        <InputGroupInput aria-keyshortcuts="Meta+K" aria-label="搜索" placeholder="搜索设备、工单…" type="search" />
        <InputGroupAddon>
          <SearchIcon aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd aria-hidden="true">⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput aria-label="快递单号" defaultValue="SF1402 8876 3310" />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

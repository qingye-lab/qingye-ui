import { InputGroup, InputGroupAddon, InputGroupInput } from "@yanqing/ui/components/input-group";
import { SearchIcon } from "lucide-react";

export const meta = { title: "尺寸", description: "size 写在 InputGroupInput 上，附加区域随之调整内边距。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      {(["sm", "default", "lg"] as const).map((size) => (
        <InputGroup key={size}>
          <InputGroupInput aria-label="搜索" placeholder={`搜索（${size}）`} size={size} type="search" />
          <InputGroupAddon>
            <SearchIcon aria-hidden="true" />
          </InputGroupAddon>
        </InputGroup>
      ))}
    </div>
  );
}

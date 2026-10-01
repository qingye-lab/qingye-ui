import { Button } from "@qingye/ui/components/button";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@qingye/ui/components/input-group";
import { ArrowRightIcon, InfoIcon, RefreshCwIcon } from "lucide-react";

export const meta = { title: "按钮", description: "InputGroupButton 默认是 ghost + icon-xs，与输入框内边距对齐。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <InputGroup>
        <InputGroupInput aria-label="邀请码" defaultValue="YQ8K-2M4P" readOnly />
        <InputGroupAddon align="inline-end">
          <InputGroupButton aria-label="重新生成">
            <RefreshCwIcon aria-hidden="true" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput aria-label="订阅邮箱" placeholder="输入邮箱订阅周报" type="email" />
        <InputGroupAddon align="inline-end">
          <Button size="xs" variant="secondary">
            订阅
            <ArrowRightIcon aria-hidden="true" />
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput aria-label="用户名" placeholder="用户名" />
        <InputGroupAddon>
          <InputGroupButton aria-label="用户名规则">
            <InfoIcon aria-hidden="true" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

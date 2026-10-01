import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupTextarea } from "@yanqing/ui";
import { ArrowUpIcon, AtSignIcon, PaperclipIcon } from "lucide-react";

export const meta = { title: "组合：消息输入框", description: "block-end 附加区域作为底部工具栏。" };

export default function Demo() {
  return (
    <InputGroup className="max-w-md">
      <InputGroupTextarea aria-label="回复工单" placeholder="回复客户，Shift + Enter 换行" />
      <InputGroupAddon align="block-end">
        <InputGroupButton aria-label="添加附件" size="icon-sm">
          <PaperclipIcon aria-hidden="true" />
        </InputGroupButton>
        <InputGroupButton aria-label="提及同事" size="icon-sm">
          <AtSignIcon aria-hidden="true" />
        </InputGroupButton>
        <InputGroupText className="ms-auto text-xs">内部可见</InputGroupText>
        <InputGroupButton aria-label="发送" size="icon-sm" variant="default">
          <ArrowUpIcon aria-hidden="true" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}

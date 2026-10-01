import { InputGroup, InputGroupAddon, InputGroupInput } from "@qingye/ui/components/input-group";
import { MailIcon, MapPinIcon } from "lucide-react";

export const meta = { title: "图标", description: "图标放在首端说明内容类型，放在末端作为状态提示。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <InputGroup>
        <InputGroupInput aria-label="邮箱" placeholder="name@company.com" type="email" />
        <InputGroupAddon>
          <MailIcon aria-hidden="true" />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput aria-label="收货地址" defaultValue="杭州市西湖区文三路 90 号" />
        <InputGroupAddon align="inline-end">
          <MapPinIcon aria-hidden="true" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

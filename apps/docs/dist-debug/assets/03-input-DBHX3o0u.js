const t=`import { Button } from "@qingye/ui/components/button";
import { Input } from "@qingye/ui/components/input";
import { NativeSelect, NativeSelectOption } from "@qingye/ui/components/native-select";
import { ButtonGroup, ButtonGroupText } from "@qingye/ui";
import { SearchIcon } from "lucide-react";

export const meta = { title: "与输入框组合", description: "输入框、选择框、文字前缀与按钮拼接为一行。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <ButtonGroup className="w-full">
        <Input aria-label="搜索订单" placeholder="订单号或手机号" />
        <Button aria-label="搜索" size="icon" variant="outline">
          <SearchIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup className="w-full">
        <ButtonGroupText>https://</ButtonGroupText>
        <Input aria-label="自定义域名" defaultValue="shop.qingyun.design" />
        <Button variant="outline">验证</Button>
      </ButtonGroup>
      <ButtonGroup className="w-full">
        <NativeSelect aria-label="币种" className="w-24 min-w-0 shrink-0" defaultValue="cny">
          <NativeSelectOption value="cny">CNY</NativeSelectOption>
          <NativeSelectOption value="usd">USD</NativeSelectOption>
          <NativeSelectOption value="eur">EUR</NativeSelectOption>
        </NativeSelect>
        <Input aria-label="金额" className="numeric" defaultValue="1,280.00" inputMode="decimal" />
        <ButtonGroupText>元</ButtonGroupText>
      </ButtonGroup>
    </div>
  );
}
`;export{t as default};

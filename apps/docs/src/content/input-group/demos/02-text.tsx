import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@yanqing/ui";

export const meta = { title: "前后缀文字", description: "协议、域名、货币、单位等固定部分。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <InputGroup>
        <InputGroupInput aria-label="工作区地址" className="*:[input]:px-0!" placeholder="your-team" />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupText>.yanqing.app</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput aria-label="单价" className="numeric" defaultValue="1,280.00" inputMode="decimal" />
        <InputGroupAddon>
          <InputGroupText>¥</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupText>元 / 台</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput aria-label="包裹重量" className="numeric" defaultValue="2.5" inputMode="decimal" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>kg</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

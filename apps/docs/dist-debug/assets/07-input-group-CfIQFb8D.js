const n=`import { InputGroup, InputGroupAddon, InputGroupText } from "@qingye/ui/components/input-group";
import { NumberField, NumberFieldInput } from "@qingye/ui/components/number-field";

export const meta = { title: "组合：带单位", description: "放进 InputGroup，前后加货币符号与币种。" };

export default function Demo() {
  return (
    <InputGroup className="max-w-xs">
      <NumberField aria-label="预算金额" defaultValue={50000} step={1000}>
        <NumberFieldInput className="text-start" />
      </NumberField>
      <InputGroupAddon>
        <InputGroupText>¥</InputGroupText>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupText>CNY</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
}
`;export{n as default};

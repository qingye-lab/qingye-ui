const n=`import { CopyButton } from "@qingye/ui/components/copy-button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@qingye/ui/components/input-group";

export const meta = { title: "组合：密钥输入框", description: "放进 InputGroupAddon，复制只读字段的内容。" };

const key = "yq_live_4f9a2c7e81b0d3";

export default function Demo() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput aria-label="API 密钥" className="font-mono" defaultValue={key} readOnly />
      <InputGroupAddon align="inline-end">
        <CopyButton copyLabel="复制 API 密钥" size="icon-xs" value={key} variant="ghost" />
      </InputGroupAddon>
    </InputGroup>
  );
}
`;export{n as default};

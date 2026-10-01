import { InputGroup, InputGroupAddon, InputGroupInput } from "@yanqing/ui/components/input-group";
import { Label } from "@yanqing/ui/components/label";

export const meta = { title: "组合：内嵌标签", description: "block-start 附加区域放标签，适合紧凑的卡片表单。" };

export default function Demo() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput id="ig-company" placeholder="例如：杭州言青科技有限公司" />
      <InputGroupAddon align="block-start">
        <Label htmlFor="ig-company">公司名称</Label>
      </InputGroupAddon>
    </InputGroup>
  );
}

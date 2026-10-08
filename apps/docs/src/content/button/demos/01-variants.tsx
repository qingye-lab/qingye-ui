import { Button, ButtonProtection } from "@qingye_lab/ui/components/button";

export const meta = { title: "变体与色调", titleEn: "Variants and tones" };

export default function Demo() {
  return (
    <div className="flex w-full flex-col gap-(--qy-section-gap)">
      <div className="flex flex-wrap gap-(--qy-action-gap)">
        <Button>保存</Button>
        <Button variant="bordered">取消</Button>
        <Button variant="quiet">编辑</Button>
      </div>
      <ButtonProtection consequence="删除后，内容无法恢复。">
        <Button tone="danger">删除</Button>
        <Button tone="danger" variant="bordered">删除</Button>
        <Button tone="danger" variant="quiet">删除</Button>
      </ButtonProtection>
    </div>
  );
}

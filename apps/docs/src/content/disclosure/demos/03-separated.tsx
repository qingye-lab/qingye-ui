import { Disclosure, DisclosurePanel, DisclosureTrigger } from "@yanqing/ui/components/disclosure";
import { Label } from "@yanqing/ui/components/label";
import { Switch } from "@yanqing/ui/components/switch";

export const meta = {
  title: "收尾一个区域",
  description: "separated：分隔线下的整行，常放在设置卡片底部。",
};

const options = [
  { id: "preview", label: "为每个分支生成预览地址", on: true },
  { id: "comment", label: "在合并请求中评论部署结果", on: true },
  { id: "skip", label: "仅文档变更时跳过构建", on: false },
];

export default function Demo() {
  return (
    <div className="w-full max-w-md rounded-xl border bg-card px-4 pt-4">
      <p className="font-medium text-sm">自动部署</p>
      <p className="mt-1 mb-4 text-muted-foreground text-sm">推送到 main 分支后自动部署到生产环境。</p>
      <Disclosure variant="separated">
        <DisclosureTrigger>更多选项</DisclosureTrigger>
        <DisclosurePanel className="flex flex-col gap-3">
          {options.map((option) => (
            <div className="flex items-center justify-between gap-4" key={option.id}>
              <Label htmlFor={option.id}>{option.label}</Label>
              <Switch defaultChecked={option.on} id={option.id} />
            </div>
          ))}
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}

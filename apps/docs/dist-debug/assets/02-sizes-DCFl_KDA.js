const e=`import { Input } from "@qingye/ui/components/input";

export const meta = { title: "尺寸", description: "sm 用于筛选栏与表格内，lg 用于登录等突出表单。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Input aria-label="小" placeholder="小 sm" size="sm" />
      <Input aria-label="默认" placeholder="默认 default" />
      <Input aria-label="大" placeholder="大 lg" size="lg" />
    </div>
  );
}
`;export{e as default};

import { Button } from "@yanqing/ui/components/button";

export const meta = { title: "禁用", description: "不可用时降低不透明度并屏蔽指针事件。" };

export default function Demo() {
  return (
    <>
      <Button disabled>提交审核</Button>
      <Button disabled variant="outline">
        导出
      </Button>
      <Button disabled variant="secondary">
        存为草稿
      </Button>
      <Button disabled variant="destructive">
        删除
      </Button>
    </>
  );
}

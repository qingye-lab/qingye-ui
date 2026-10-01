import { Button } from "@yanqing/ui/components/button";
import { Field } from "@yanqing/ui/components/field";
import { Form } from "@yanqing/ui/components/form";
import { Popover, PopoverDescription, PopoverPopup, PopoverTitle, PopoverTrigger } from "@yanqing/ui/components/popover";
import { Textarea } from "@yanqing/ui/components/textarea";

export const meta = { title: "基础用法", description: "点击打开，承载一个简短的表单。" };

export default function Demo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>意见反馈</PopoverTrigger>
      <PopoverPopup className="w-80">
        <div className="mb-4 grid gap-1.5">
          <PopoverTitle className="text-base">意见反馈</PopoverTitle>
          <PopoverDescription>告诉我们哪里用得不顺手，产品团队每周都会阅读。</PopoverDescription>
        </div>
        <Form className="grid gap-3" onSubmit={(event) => event.preventDefault()}>
          <Field>
            <Textarea aria-label="反馈内容" placeholder="例如：批量导出时希望能选择字段" />
          </Field>
          <Button type="submit">提交反馈</Button>
        </Form>
      </PopoverPopup>
    </Popover>
  );
}

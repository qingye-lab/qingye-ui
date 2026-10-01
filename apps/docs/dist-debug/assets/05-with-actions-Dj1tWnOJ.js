const e=`import { Button } from "@qingye/ui/components/button";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Form } from "@qingye/ui/components/form";
import { Textarea } from "@qingye/ui/components/textarea";

export const meta = { title: "组合：评论框", description: "多行输入下方放操作按钮，主按钮靠末端。" };

export default function Demo() {
  return (
    <Form className="flex w-full max-w-sm flex-col gap-3" onSubmit={(event) => event.preventDefault()}>
      <Field name="comment">
        <FieldLabel>添加评论</FieldLabel>
        <Textarea placeholder="@张伟 这台设备上周也报过同样的错误" required />
      </Field>
      <div className="flex justify-end gap-2">
        <Button type="reset" variant="ghost">
          清空
        </Button>
        <Button type="submit">发表</Button>
      </div>
    </Form>
  );
}
`;export{e as default};

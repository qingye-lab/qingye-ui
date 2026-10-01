const n=`import { Button } from "@qingye/ui/components/button";
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle, DialogTrigger } from "@qingye/ui/components/dialog";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Form } from "@qingye/ui/components/form";
import { Input } from "@qingye/ui/components/input";

export const meta = {
  title: "基础用法",
  description: "头部、正文、底部三段结构；表单用 Form 包住正文与底部，回车即可提交。",
};

export default function Demo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>编辑资料</DialogTrigger>
      <DialogPopup className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>编辑资料</DialogTitle>
          <DialogDescription>修改后会同步到团队通讯录。</DialogDescription>
        </DialogHeader>
        <Form className="contents" onSubmit={(event) => event.preventDefault()}>
          <DialogPanel className="grid gap-4">
            <Field>
              <FieldLabel>姓名</FieldLabel>
              <Input defaultValue="林嘉禾" />
            </Field>
            <Field>
              <FieldLabel>职位</FieldLabel>
              <Input defaultValue="产品设计师" />
            </Field>
          </DialogPanel>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>取消</DialogClose>
            <Button type="submit">保存</Button>
          </DialogFooter>
        </Form>
      </DialogPopup>
    </Dialog>
  );
}
`;export{n as default};

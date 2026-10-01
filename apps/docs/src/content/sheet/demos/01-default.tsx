import {
  Button,
  Field,
  FieldLabel,
  Form,
  Input,
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
  Textarea,
} from "@yanqing/ui";

export const meta = { title: "基础用法", description: "默认从右侧滑入，适合在列表旁新建或编辑一条记录。" };

export default function Demo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>新建工单</SheetTrigger>
      <SheetPopup>
        <SheetHeader>
          <SheetTitle>新建工单</SheetTitle>
          <SheetDescription>提交后会自动分派给当班的运维人员。</SheetDescription>
        </SheetHeader>
        <Form className="contents" onSubmit={(event) => event.preventDefault()}>
          <SheetPanel className="grid gap-4">
            <Field>
              <FieldLabel>标题</FieldLabel>
              <Input placeholder="例如：3 号仓库温控器离线" />
            </Field>
            <Field>
              <FieldLabel>设备编号</FieldLabel>
              <Input defaultValue="YQ-TC-0817" />
            </Field>
            <Field>
              <FieldLabel>问题描述</FieldLabel>
              <Textarea placeholder="发生时间、现象和已尝试的处理方式" />
            </Field>
          </SheetPanel>
          <SheetFooter>
            <SheetClose render={<Button variant="ghost" />}>取消</SheetClose>
            <Button type="submit">提交工单</Button>
          </SheetFooter>
        </Form>
      </SheetPopup>
    </Sheet>
  );
}

const _05WithActions = 'import { Button, Field, FieldLabel, Form, Textarea } from "@yanqing/ui";\n\nexport const meta = { title: "组合：评论框", description: "多行输入下方放操作按钮，主按钮靠末端。" };\n\nexport default function Demo() {\n  return (\n    <Form className="flex w-full max-w-sm flex-col gap-3" onSubmit={(event) => event.preventDefault()}>\n      <Field name="comment">\n        <FieldLabel>添加评论</FieldLabel>\n        <Textarea placeholder="@张伟 这台设备上周也报过同样的错误" required />\n      </Field>\n      <div className="flex justify-end gap-2">\n        <Button type="reset" variant="ghost">\n          清空\n        </Button>\n        <Button type="submit">发表</Button>\n      </div>\n    </Form>\n  );\n}\n';
export {
  _05WithActions as default
};

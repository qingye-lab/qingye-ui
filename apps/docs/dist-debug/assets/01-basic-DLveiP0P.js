const _01Basic = 'import { Field, FieldDescription, FieldLabel, TagInput } from "@yanqing/ui";\n\nexport const meta = { title: "基础用法", description: "回车或逗号确认；粘贴“设计, 运营, 增长”会拆成三个标签。" };\n\nexport default function Demo() {\n  return (\n    <Field className="w-full max-w-md">\n      <FieldLabel>文章关键词</FieldLabel>\n      <TagInput defaultValue={["产品设计", "用户研究"]} name="keywords" placeholder="输入关键词后按回车" />\n      <FieldDescription>用于站内搜索与推荐，最多选取最相关的几个。</FieldDescription>\n    </Field>\n  );\n}\n';
export {
  _01Basic as default
};

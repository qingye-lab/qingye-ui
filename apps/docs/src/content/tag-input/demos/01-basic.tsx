import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { TagInput } from "@qingye/ui/components/tag-input";

export const meta = { title: "基础用法", description: "回车或逗号确认；粘贴“设计, 运营, 增长”会拆成三个标签。" };

export default function Demo() {
  return (
    <Field className="w-full max-w-md">
      <FieldLabel>文章关键词</FieldLabel>
      <TagInput defaultValue={["产品设计", "用户研究"]} name="keywords" placeholder="输入关键词后按回车" />
      <FieldDescription>用于站内搜索与推荐，最多选取最相关的几个。</FieldDescription>
    </Field>
  );
}

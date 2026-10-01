import { Button, Field, FieldLabel, TagInput } from "@yanqing/ui";
import { useState } from "react";

export const meta = {
  title: "受控与表单提交",
  description: "value 与 onValueChange 受控；每个标签提交一个同名隐藏字段。",
};

const suggestions = ["退款", "物流延迟", "发票", "账号安全"];

export default function Demo() {
  const [tags, setTags] = useState<string[]>(["物流延迟"]);
  const [submitted, setSubmitted] = useState<string[] | null>(null);

  return (
    <form
      className="flex w-full max-w-md flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(new FormData(event.currentTarget).getAll("labels").map(String));
      }}
    >
      <Field>
        <FieldLabel>工单标签</FieldLabel>
        <TagInput name="labels" onValueChange={setTags} placeholder="添加标签" value={tags} />
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="me-0.5 text-muted-foreground text-xs">常用</span>
          {suggestions.map((item) => (
            <Button
              disabled={tags.includes(item)}
              key={item}
              onClick={() => setTags([...tags, item])}
              size="xs"
              type="button"
              variant="outline"
            >
              {item}
            </Button>
          ))}
        </div>
      </Field>
      <div className="flex items-center gap-3">
        <Button type="submit">保存工单</Button>
        {submitted ? (
          <p className="truncate text-muted-foreground text-sm">
            已提交 {submitted.length} 个：{submitted.join("、") || "无"}
          </p>
        ) : null}
      </div>
    </form>
  );
}

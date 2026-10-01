import { TagInput } from "@qingye/ui/components/tag-input";

export const meta = { title: "尺寸", description: "高度与 Combobox 多选框一致，标签随尺寸缩放。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <TagInput aria-label="小尺寸" defaultValue={["前端", "React"]} size="sm" />
      <TagInput aria-label="默认尺寸" defaultValue={["前端", "React"]} />
      <TagInput aria-label="大尺寸" defaultValue={["前端", "React"]} size="lg" />
    </div>
  );
}

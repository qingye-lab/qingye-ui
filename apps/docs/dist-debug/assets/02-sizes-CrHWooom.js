const e=`import { Textarea } from "@qingye/ui/components/textarea";

export const meta = { title: "尺寸" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Textarea aria-label="小" placeholder="小 sm" size="sm" />
      <Textarea aria-label="默认" placeholder="默认 default" />
      <Textarea aria-label="大" placeholder="大 lg" size="lg" />
    </div>
  );
}
`;export{e as default};

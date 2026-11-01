import { Composer, ComposerInput, ComposerSubmit, ComposerToolbar, type ComposerTrigger } from "@qingye_lab/ui/components/composer";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "异步候选", titleEn: "Async candidates" } satisfies DemoMeta;

const names = ["林青", "林野", "苏青", "苏野", "顾远", "周衡"];

const mention: ComposerTrigger = {
  char: "@",
  getItems: (query, { signal }) => new Promise((resolve) => {
    const timer = setTimeout(() => resolve(names.filter((name) => name.includes(query)).map((name) => ({ id: name, label: name }))), 600);
    signal.addEventListener("abort", () => clearTimeout(timer));
  }),
};

export default function Demo() {
  return <Composer className="w-full">
    <ComposerInput aria-label="消息" placeholder="@ 提及" triggers={[mention]} />
    <ComposerToolbar><ComposerSubmit /></ComposerToolbar>
  </Composer>;
}

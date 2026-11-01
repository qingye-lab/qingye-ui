import { Composer, ComposerInput, ComposerSubmit, ComposerToolbar, type ComposerSegment } from "@qingye_lab/ui/components/composer";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "状态与行数", titleEn: "States and rows" } satisfies DemoMeta;

const filled: ComposerSegment[] = [
  { type: "text", text: "请 " },
  { type: "token", trigger: "@", id: "u1", label: "林青" },
  { type: "text", text: " 看一下这份稿子。" },
];

export default function Demo() {
  return <div className="grid w-full grid-cols-1 gap-(--qy-space-4) sm:grid-cols-2">
    <Composer defaultValue={filled} readOnly><ComposerInput aria-label="只读" /></Composer>
    <Composer defaultValue={filled} disabled><ComposerInput aria-label="禁用" /><ComposerToolbar><ComposerSubmit /></ComposerToolbar></Composer>
    <Composer><ComposerInput aria-label="三行起始，最多五行" placeholder="三行起始，最多五行" minRows={3} maxRows={5} /></Composer>
    <Composer submitOn="mod-enter"><ComposerInput aria-label="Ctrl/⌘+Enter 发送" placeholder="Ctrl/⌘+Enter 发送" /><ComposerToolbar><ComposerSubmit /></ComposerToolbar></Composer>
  </div>;
}

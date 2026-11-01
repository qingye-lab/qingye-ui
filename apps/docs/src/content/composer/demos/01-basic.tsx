import { useState } from "react";
import { Composer, ComposerInput, ComposerSubmit, ComposerToolbar, composerValueToText, type ComposerSegment } from "@qingye_lab/ui/components/composer";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "输入与提交", titleEn: "Input and submit" } satisfies DemoMeta;

export default function Demo() {
  const [sent, setSent] = useState<string[]>([]);
  return <div className="flex w-full flex-col gap-(--qy-space-3)">
    <Composer onSubmit={(value: ComposerSegment[], { clear }) => { setSent((list) => [...list, composerValueToText(value)]); clear(); }}>
      <ComposerInput aria-label="消息" placeholder="Enter 发送，Shift+Enter 换行" />
      <ComposerToolbar><ComposerSubmit /></ComposerToolbar>
    </Composer>
    {sent.length > 0 && <ul className="m-0 flex list-none flex-col gap-(--qy-space-1) p-0 whitespace-pre-wrap">{sent.map((text, index) => <li key={index}>{text}</li>)}</ul>}
  </div>;
}

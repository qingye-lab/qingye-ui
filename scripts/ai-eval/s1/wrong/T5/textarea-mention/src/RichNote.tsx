import * as React from "react";
import { Toolbar, ToolbarButton } from "@qingye_lab/ui/components/toolbar";

// 库中没有富文本编辑器；这里用 contentEditable 做最小实现。
export type RichNoteProps = { onChange: (html: string) => void };

export function RichNote({ onChange }: RichNoteProps) {
  const editor = React.useRef<HTMLDivElement>(null);
  const emit = () => onChange(editor.current?.innerHTML ?? "");
  return (
    <div className="flex flex-col gap-2">
      <Toolbar aria-label="格式">
        <ToolbarButton onMouseDown={event => event.preventDefault()} onClick={() => { document.execCommand?.("bold"); emit(); }}>加粗</ToolbarButton>
      </Toolbar>
      <div ref={editor} role="textbox" aria-label="正文" aria-multiline="true" contentEditable suppressContentEditableWarning className="min-h-32 border border-border p-3" onInput={emit} />
    </div>
  );
}

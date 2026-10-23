import { useRef, useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { VirtualList, type VirtualListActions } from "@qingye_lab/ui/components/virtual-list";

export const meta = { title: "动态记录与阅读位置", titleEn: "Measured records and reading continuity" };
type Entry = { id: number; text: string; expanded?: boolean };
const initial: Entry[] = Array.from({ length: 60 }, (_, id) => ({
  id,
  text: id % 3 === 0 ? "窄屏复核已完成，补充了长标题换行和键盘返回的验证记录。" : "本次检查已完成，记录保留供后续复核。",
}));
const getKey = (entry: Entry) => entry.id;
const estimate = 72;

export default function Demo() {
  const [entries, setEntries] = useState(initial);
  const actions = useRef<VirtualListActions>(null);
  const next = useRef(initial.length);
  const previous = useRef(-1);
  return <div className="grid gap-(--qy-action-gap)">
    <div className="flex flex-wrap gap-(--qy-action-gap)">
      <Button variant="bordered" onClick={() => {
        const id = previous.current--;
        setEntries(current => [{ id, text: "更早的检查记录：当时尚未发现新增问题，保留原始观察。" }, ...current]);
      }}>更早记录</Button>
      <Button variant="bordered" onClick={() => {
        const id = next.current++;
        setEntries(current => [...current, { id, text: "刚完成一轮复核，新的观察已加入记录。" }]);
      }}>新增记录</Button>
      <Button variant="quiet" onClick={() => actions.current?.scrollToIndex(Math.floor(entries.length / 2), { align: "start" })}>查看中段</Button>
      <Button variant="quiet" onClick={() => actions.current?.scrollToEnd()}>跳到最新</Button>
    </div>
    <VirtualList aria-label="检查记录" items={entries} getKey={getKey} measurement="dynamic" itemSize={estimate} height={estimate * 4} actionsRef={actions} followEnd
      renderItem={entry => <div className="grid gap-(--qy-space-2) px-(--qy-control-md-padding) py-(--qy-space-3)">
        <div className="flex items-center justify-between gap-(--qy-space-2)">
          <span className="text-support text-muted-foreground">记录 {entry.id + 1}</span>
          <Button size="xs" variant="quiet" aria-expanded={entry.expanded ?? false} onClick={() => setEntries(current => current.map(item => item.id === entry.id ? { ...item, expanded: !item.expanded } : item))}>{entry.expanded ? "收起" : "详情"}</Button>
        </div>
        <p className="text-body">{entry.text}</p>
        {entry.expanded && <p className="text-body">复核范围包含手机窄屏、放大文字与连续键盘操作。当前记录只表达已完成的检查；待验证项仍由项目单独跟踪。详情展开后继续保留正在阅读的位置。</p>}
      </div>} />
  </div>;
}

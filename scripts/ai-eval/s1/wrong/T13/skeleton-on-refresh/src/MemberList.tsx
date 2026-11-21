import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, AlertDescription } from "@qingye_lab/ui/components/alert";
import { Button } from "@qingye_lab/ui/components/button";
import { Empty, EmptyTitle } from "@qingye_lab/ui/components/empty";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Skeleton, SkeletonLine } from "@qingye_lab/ui/components/skeleton";

export type MemberListProps = {
  team: string;
  load: (team: string) => Promise<string[]>;
};

// DN 自然解：只要在加载（含刷新）就整块换成骨架；失败时只显示错误
export function MemberList({ team, load }: MemberListProps) {
  const [members, setMembers] = useState<string[] | null>(null);
  const [pending, setPending] = useState(true);
  const [failed, setFailed] = useState(false);
  const [shownTeam, setShownTeam] = useState(team);
  const seq = useRef(0);

  // 换了团队，上一团队的成员不再有效，随之撤下
  if (shownTeam !== team) { setShownTeam(team); setMembers(null); }

  const run = useCallback(() => {
    const id = ++seq.current; // 只采用最后一次请求的结果
    setPending(true);
    setFailed(false);
    load(team).then(
      next => { if (seq.current === id) { setMembers(next); setPending(false); } },
      () => { if (seq.current === id) { setMembers(null); setFailed(true); setPending(false); } },
    );
  }, [load, team]);

  useEffect(run, [run]);

  return (
    <Stack>
      <div><Button variant="bordered" onClick={run}>刷新</Button></div>
      {pending
        ? <Skeleton label="正在加载成员"><SkeletonLine /><SkeletonLine /></Skeleton>
        : failed
          ? <Alert tone="danger" role="alert"><AlertDescription>加载失败，请再点“刷新”重试</AlertDescription></Alert>
          : members && members.length === 0
            ? <Empty state="empty"><EmptyTitle>还没有成员</EmptyTitle></Empty>
            : <ul>{(members ?? []).map(name => <li key={name}>{name}</li>)}</ul>}
    </Stack>
  );
}

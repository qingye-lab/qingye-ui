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

// 把切换团队当作一次刷新：任何加载期间都保留手上的列表
export function MemberList({ team, load }: MemberListProps) {
  const [members, setMembers] = useState<string[] | null>(null);
  const [pending, setPending] = useState(true);
  const [failed, setFailed] = useState(false);
  const [shownTeam, setShownTeam] = useState(team);
  const seq = useRef(0);

  // 换了团队仍沿用“刷新”的处理：保留手上的列表直到新结果返回
  if (shownTeam !== team) setShownTeam(team);

  const run = useCallback(() => {
    const id = ++seq.current; // 只采用最后一次请求的结果
    setPending(true);
    setFailed(false);
    load(team).then(
      next => { if (seq.current === id) { setMembers(next); setPending(false); } },
      () => { if (seq.current === id) { setFailed(true); setPending(false); } },
    );
  }, [load, team]);

  useEffect(run, [run]);

  return (
    <Stack>
      <div><Button variant="bordered" loading={pending && members !== null} onClick={run}>刷新</Button></div>
      {failed && <Alert tone="danger" role="alert"><AlertDescription>加载失败，请再点“刷新”重试</AlertDescription></Alert>}
      {members === null
        ? (pending && <Skeleton label="正在加载成员"><SkeletonLine /><SkeletonLine /></Skeleton>)
        : members.length === 0
          ? <Empty state="empty"><EmptyTitle>还没有成员</EmptyTitle></Empty>
          : <ul>{members.map(name => <li key={name}>{name}</li>)}</ul>}
    </Stack>
  );
}

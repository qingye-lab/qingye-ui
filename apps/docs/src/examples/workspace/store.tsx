import * as React from "react";
import { toastManager } from "@qingye_lab/ui/components/toast";
import {
  ACTIVITY,
  COLLECTIONS,
  MEMBERS,
  RUNS,
  type Activity,
  type Collection,
  type Member,
  type Source,
  type SyncRun,
} from "./data";

export type NewCollectionInput = {
  name: string;
  source: Source;
  owner: string;
  retention: number;
  tags: string[];
  autoSync: boolean;
};

export type InviteMemberInput = {
  name: string;
  email: string;
  role: Member["role"];
};

export type CollectionUpdate = {
  name: string;
  retention: number;
  autoSync: boolean;
  tags: string[];
};

export type WorkspaceState = {
  workspaceName: string;
  region: string;
  collections: Collection[];
  runs: SyncRun[];
  activity: Activity[];
  unreadCount: number;
  members: Member[];
  syncProgress: Record<string, number>;
  tagsById: Record<string, string[]>;
  autoSyncById: Record<string, boolean>;
  signedOut: boolean;
  setWorkspaceGeneral: (name: string, region: string) => void;
  triggerSync: (ids: string[]) => void;
  createCollection: (input: NewCollectionInput) => Collection;
  updateCollection: (id: string, patch: CollectionUpdate) => void;
  deleteCollection: (id: string) => void;
  inviteMember: (input: InviteMemberInput) => Member;
  updateMemberRole: (id: string, role: Member["role"]) => void;
  markActivityRead: () => void;
  setSignedOut: (next: boolean) => void;
};

const INITIAL_TAGS: Record<string, string[]> = {
  devices: ["物联网", "核心"],
  audit: ["合规", "高吞吐"],
  roles: ["安全"],
  groups: ["组织"],
  webhooks: ["外部集成"],
  exports: ["待排查"],
  tokens: ["安全", "凭据"],
  templates: ["通知"],
  quotas: ["计费"],
  regions: ["基础设施"],
  keys: ["加密"],
  backups: ["灾备"],
};

const nowClock = () => {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  return { time: `${hh}:${mm}`, iso: now.toISOString() };
};

const slugifyId = (name: string, existing: readonly Collection[]) => {
  const ascii = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const base = ascii || `col-${existing.length + 1}`;
  let candidate = base;
  let n = 2;
  while (existing.some((item) => item.id === candidate)) {
    candidate = `${base}-${n++}`;
  }
  return candidate;
};

const WorkspaceStoreContext = React.createContext<WorkspaceState | null>(null);

export function WorkspaceStoreProvider({ children }: { children: React.ReactNode }) {
  const [workspaceName, setWorkspaceName] = React.useState("青野工作区");
  const [region, setRegion] = React.useState("华东（上海）");
  const [collections, setCollections] = React.useState<Collection[]>(() => COLLECTIONS.map((item) => ({ ...item, weekly: [...item.weekly] })));
  const [runs, setRuns] = React.useState<SyncRun[]>(() => [...RUNS]);
  const [activity, setActivity] = React.useState<Activity[]>(() => [...ACTIVITY]);
  const [unreadCount, setUnreadCount] = React.useState<number>(ACTIVITY.length);
  const [members, setMembers] = React.useState<Member[]>(() => [...MEMBERS]);
  const [syncProgress, setSyncProgress] = React.useState<Record<string, number>>({});
  const [tagsById, setTagsById] = React.useState<Record<string, string[]>>(() => ({ ...INITIAL_TAGS }));
  const [autoSyncById, setAutoSyncById] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(COLLECTIONS.map((item) => [item.id, item.state !== "未同步"])),
  );
  const [signedOut, setSignedOut] = React.useState(false);

  const timers = React.useRef<number[]>([]);
  React.useEffect(() => () => { timers.current.forEach((id) => window.clearTimeout(id)); }, []);

  const pushActivity = React.useCallback((title: string, detail: string) => {
    const { time, iso } = nowClock();
    setActivity((prev) => [{ id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, time, dateTime: iso, title, detail }, ...prev]);
    setUnreadCount((count) => count + 1);
  }, []);

  const setWorkspaceGeneral = React.useCallback((nextName: string, nextRegion: string) => {
    const trimmed = nextName.trim() || "青野工作区";
    setWorkspaceName(trimmed);
    setRegion(nextRegion);
    pushActivity("更新了工作区常规设置", `${trimmed} · ${nextRegion}`);
    toastManager.add({ title: "已保存常规设置", type: "success" });
  }, [pushActivity]);

  const triggerSync = React.useCallback((ids: string[]) => {
    const requested = new Set(ids);
    if (!requested.size) return;
    const targets = collections.filter((item) => requested.has(item.id) && item.state !== "同步中");
    if (!targets.length) {
      toastManager.add({ title: "所选集合正在同步", type: "info" });
      return;
    }
    const syncIds = targets.map((item) => item.id);
    // 增量只由现有记录数决定：空集合仍是 0，记录累加与 runs.written 共用同一个值。
    const deltas = new Map(targets.map((item) => [item.id, item.records > 0 ? Math.max(1, Math.round(item.records * 0.015)) : 0]));

    setCollections((prev) => prev.map((item) => (syncIds.includes(item.id) ? { ...item, state: "同步中", synced: "正在同步" } : item)));
    setSyncProgress((prev) => {
      const next = { ...prev };
      for (const id of syncIds) next[id] = 28;
      return next;
    });

    toastManager.add({
      title: targets.length === 1 ? `${targets[0]!.name}已开始同步` : `已触发 ${targets.length} 个集合同步`,
      type: "info",
    });

    const t1 = window.setTimeout(() => {
      setSyncProgress((prev) => {
        const next = { ...prev };
        for (const id of syncIds) if (next[id] !== undefined) next[id] = 74;
        return next;
      });
    }, 420);

    const t2 = window.setTimeout(() => {
      const { time, iso } = nowClock();
      setCollections((prev) =>
        prev.map((item) => {
          if (!syncIds.includes(item.id)) return item;
          const delta = deltas.get(item.id) ?? 0;
          const nextRecords = item.records + delta;
          const nextWeekly = [...item.weekly.slice(0, -1), nextRecords];
          return { ...item, state: "已同步", synced: "刚刚", records: nextRecords, weekly: nextWeekly };
        }),
      );
      setSyncProgress((prev) => {
        const next = { ...prev };
        for (const id of syncIds) delete next[id];
        return next;
      });
      setRuns((prev) => [
        ...targets.map((item, idx) => ({
          id: `r-${Date.now()}-${idx}`,
          collection: item.name,
          at: iso,
          time,
          written: deltas.get(item.id) ?? 0,
          failed: 0,
          duration: `${8 + idx * 3} 秒`,
          state: "完成" as const,
        })),
        ...prev,
      ]);
      pushActivity(
        targets.length === 1 ? `${targets[0]!.name}同步完成` : `${targets.length} 个集合同步完成`,
        targets.map((item) => item.name).join("、"),
      );
      toastManager.add({
        title: targets.length === 1 ? `${targets[0]!.name}同步完成` : `已完成 ${targets.length} 个集合同步`,
        type: "success",
      });
    }, 980);

    timers.current.push(t1, t2);
  }, [collections, pushActivity]);

  const createCollection = React.useCallback((input: NewCollectionInput) => {
    const id = slugifyId(input.name, collections);
    const created: Collection = {
      id,
      name: input.name.trim(),
      source: input.source,
      owner: input.owner,
      records: 0,
      size: 0.1,
      synced: "刚刚创建",
      state: "未同步",
      retention: input.retention,
      weekly: [0, 0, 0, 0, 0, 0, 0, 0],
    };
    setCollections((prev) => [created, ...prev]);
    setTagsById((prev) => ({ ...prev, [id]: input.tags }));
    setAutoSyncById((prev) => ({ ...prev, [id]: input.autoSync }));
    pushActivity(`新建集合「${created.name}」`, `${created.source} · 负责人 ${created.owner}`);
    toastManager.add({ title: `已创建集合「${created.name}」`, type: "success" });
    return created;
  }, [collections, pushActivity]);

  const updateCollection = React.useCallback((id: string, patch: CollectionUpdate) => {
    const savedName = patch.name.trim() || collections.find((item) => item.id === id)?.name || "";
    setCollections((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name: savedName || item.name, retention: patch.retention } : item)),
    );
    setTagsById((prev) => ({ ...prev, [id]: patch.tags }));
    setAutoSyncById((prev) => ({ ...prev, [id]: patch.autoSync }));
    pushActivity(`修改了集合「${savedName}」`, `保留 ${patch.retention} 天`);
    toastManager.add({ title: "已保存集合设置", type: "success" });
  }, [collections, pushActivity]);

  const deleteCollection = React.useCallback((id: string) => {
    const target = collections.find((item) => item.id === id);
    setCollections((prev) => prev.filter((item) => item.id !== id));
    if (target) {
      pushActivity(`删除了集合「${target.name}」`, `原包含 ${target.records} 条记录`);
      toastManager.add({ title: `已删除${target.name}`, type: "success" });
    }
  }, [collections, pushActivity]);

  const inviteMember = React.useCallback((input: InviteMemberInput) => {
    const id = `m-${Date.now()}`;
    const created: Member = { id, name: input.name.trim(), email: input.email.trim(), role: input.role };
    setMembers((prev) => [...prev, created]);
    pushActivity(`${created.name}受邀加入工作区`, `${created.role} · ${created.email}`);
    toastManager.add({ title: `已向 ${created.email} 发送邀请`, type: "success" });
    return created;
  }, [pushActivity]);

  const updateMemberRole = React.useCallback((id: string, role: Member["role"]) => {
    const target = members.find((item) => item.id === id);
    setMembers((prev) => prev.map((item) => (item.id === id ? { ...item, role } : item)));
    if (target) {
      pushActivity(`调整了成员角色`, `${target.name} → ${role}`);
      toastManager.add({ title: `${target.name}已改为${role}`, type: "success" });
    }
  }, [members, pushActivity]);

  const markActivityRead = React.useCallback(() => setUnreadCount(0), []);

  const value = React.useMemo<WorkspaceState>(
    () => ({
      workspaceName,
      region,
      collections,
      runs,
      activity,
      unreadCount,
      members,
      syncProgress,
      tagsById,
      autoSyncById,
      signedOut,
      setWorkspaceGeneral,
      triggerSync,
      createCollection,
      updateCollection,
      deleteCollection,
      inviteMember,
      updateMemberRole,
      markActivityRead,
      setSignedOut,
    }),
    [
      workspaceName,
      region,
      collections,
      runs,
      activity,
      unreadCount,
      members,
      syncProgress,
      tagsById,
      autoSyncById,
      signedOut,
      setWorkspaceGeneral,
      triggerSync,
      createCollection,
      updateCollection,
      deleteCollection,
      inviteMember,
      updateMemberRole,
      markActivityRead,
    ],
  );

  return <WorkspaceStoreContext.Provider value={value}>{children}</WorkspaceStoreContext.Provider>;
}

export function useWorkspaceStore() {
  const ctx = React.useContext(WorkspaceStoreContext);
  if (!ctx) throw new Error("useWorkspaceStore must be used inside WorkspaceStoreProvider");
  return ctx;
}

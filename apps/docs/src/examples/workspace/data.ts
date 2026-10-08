/* 青野数据同步工作区：示例应用的全部数据。所有页面讲的是同一个工作区，数字彼此一致。 */

export type SyncState = "已同步" | "同步中" | "未同步" | "失败";
export type Source = "接口推送" | "定时导入" | "数据库连接" | "手动上传";
export type Member = { id: string; name: string; role: "所有者" | "管理员" | "成员"; email: string };
export type Collection = {
  id: string; name: string; source: Source; owner: string; records: number; size: number;
  synced: string; state: SyncState; retention: number; weekly: number[];
};
export type SyncRun = { id: string; collection: string; at: string; time: string; written: number; failed: number; duration: string; state: "完成" | "部分失败" | "失败" | "进行中" };
export type Activity = { id: string; time: string; dateTime: string; title: string; detail: string };

export const MEMBERS: readonly Member[] = [
  { id: "chen", name: "陈致远", role: "所有者", email: "chen@qingye.dev" },
  { id: "li", name: "李一鸣", role: "管理员", email: "li@qingye.dev" },
  { id: "wang", name: "王一帆", role: "成员", email: "wang@qingye.dev" },
  { id: "zhao", name: "赵子纯", role: "成员", email: "zhao@qingye.dev" },
];

export const COLLECTIONS: readonly Collection[] = [
  { id: "devices", name: "接入设备", source: "接口推送", owner: "陈致远", records: 1284, size: 2.4, synced: "3 分钟前", state: "已同步", retention: 365, weekly: [1102, 1140, 1168, 1190, 1213, 1240, 1262, 1284] },
  { id: "audit", name: "操作记录", source: "数据库连接", owner: "王一帆", records: 90512, size: 38.6, synced: "12 分钟前", state: "已同步", retention: 180, weekly: [71200, 74800, 77900, 80300, 83100, 85900, 88400, 90512] },
  { id: "roles", name: "权限与角色", source: "手动上传", owner: "李一鸣", records: 42, size: 0.1, synced: "3 分钟前", state: "已同步", retention: 365, weekly: [38, 38, 39, 40, 40, 41, 41, 42] },
  { id: "groups", name: "成员分组", source: "定时导入", owner: "王一帆", records: 17, size: 0.1, synced: "1 小时前", state: "同步中", retention: 365, weekly: [12, 13, 13, 14, 15, 15, 16, 17] },
  { id: "webhooks", name: "回调地址", source: "接口推送", owner: "李一鸣", records: 6, size: 0.1, synced: "12 分钟前", state: "已同步", retention: 90, weekly: [4, 4, 5, 5, 5, 6, 6, 6] },
  { id: "exports", name: "同步与导出", source: "定时导入", owner: "陈致远", records: 0, size: 0, synced: "2 天前", state: "失败", retention: 30, weekly: [0, 0, 0, 0, 0, 0, 0, 0] },
  { id: "tokens", name: "访问令牌", source: "手动上传", owner: "陈致远", records: 3, size: 0.1, synced: "1 小时前", state: "已同步", retention: 90, weekly: [2, 2, 2, 3, 3, 3, 3, 3] },
  { id: "templates", name: "通知模板", source: "手动上传", owner: "赵子纯", records: 11, size: 0.2, synced: "昨天", state: "已同步", retention: 365, weekly: [8, 8, 9, 9, 10, 10, 11, 11] },
  { id: "quotas", name: "配额限制", source: "定时导入", owner: "赵子纯", records: 5, size: 0.1, synced: "昨天", state: "未同步", retention: 30, weekly: [5, 5, 5, 5, 5, 5, 5, 5] },
  { id: "regions", name: "区域与节点", source: "数据库连接", owner: "王一帆", records: 28, size: 0.3, synced: "3 天前", state: "已同步", retention: 365, weekly: [24, 25, 25, 26, 27, 27, 28, 28] },
  { id: "keys", name: "加密密钥", source: "手动上传", owner: "赵子纯", records: 4, size: 0.1, synced: "5 天前", state: "已同步", retention: 365, weekly: [4, 4, 4, 4, 4, 4, 4, 4] },
  { id: "backups", name: "备份策略", source: "定时导入", owner: "李一鸣", records: 2, size: 0.1, synced: "3 天前", state: "同步中", retention: 30, weekly: [2, 2, 2, 2, 2, 2, 2, 2] },
];

/** 近 14 天的同步结果（次）。 */
export const DAYS = ["9/24", "9/25", "9/26", "9/27", "9/28", "9/29", "9/30", "10/1", "10/2", "10/3", "10/4", "10/5", "10/6", "10/7"];
export const DAILY_OK = [182, 196, 188, 204, 171, 158, 210, 221, 215, 198, 232, 226, 240, 236];
export const DAILY_FAILED = [6, 3, 11, 4, 2, 1, 5, 3, 9, 4, 2, 6, 3, 5];

export const RUNS: readonly SyncRun[] = [
  { id: "r-1029", collection: "接入设备", at: "2026-10-07T14:20:00+08:00", time: "14:20", written: 1284, failed: 0, duration: "38 秒", state: "完成" },
  { id: "r-1028", collection: "操作记录", at: "2026-10-07T14:11:00+08:00", time: "14:11", written: 2112, failed: 3, duration: "2 分 06 秒", state: "部分失败" },
  { id: "r-1027", collection: "成员分组", at: "2026-10-07T13:30:00+08:00", time: "13:30", written: 9, failed: 0, duration: "—", state: "进行中" },
  { id: "r-1026", collection: "回调地址", at: "2026-10-07T13:08:00+08:00", time: "13:08", written: 6, failed: 0, duration: "4 秒", state: "完成" },
  { id: "r-1025", collection: "同步与导出", at: "2026-10-07T09:15:00+08:00", time: "09:15", written: 0, failed: 0, duration: "1 分 12 秒", state: "失败" },
];

export const ACTIVITY: readonly Activity[] = [
  { id: "a1", time: "14:20", dateTime: "2026-10-07T14:20:00+08:00", title: "接入设备同步完成", detail: "写入 1,284 条" },
  { id: "a2", time: "14:02", dateTime: "2026-10-07T14:02:00+08:00", title: "陈致远修改了保留策略", detail: "操作记录 · 90 天 → 180 天" },
  { id: "a3", time: "11:46", dateTime: "2026-10-07T11:46:00+08:00", title: "赵子纯加入工作区", detail: "由李一鸣邀请" },
  { id: "a4", time: "09:15", dateTime: "2026-10-07T09:15:00+08:00", title: "同步与导出同步失败", detail: "连接超时，原数据未改动" },
];

export const findCollection = (id: string | undefined) => COLLECTIONS.find(item => item.id === id);
export const totalRecords = COLLECTIONS.reduce((sum, item) => sum + item.records, 0);
export const totalSize = COLLECTIONS.reduce((sum, item) => sum + item.size, 0);
export const number = new Intl.NumberFormat("zh-CN");

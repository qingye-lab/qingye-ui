import type { StatusDotStatus } from "@qingye_lab/ui/components/status-dot";
import type { SyncState } from "./data";

/** 集合的同步状态 → 状态点：颜色只表达状态类别，名称总是一起写出。 */
export const syncDot: Record<SyncState, StatusDotStatus> = { "已同步": "online", "同步中": "in-progress", "未同步": "warning", "失败": "error" };

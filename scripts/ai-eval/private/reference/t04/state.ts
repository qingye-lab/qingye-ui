import type { UploadState, UploadEvent } from "../../../tasks/t04-upload/state";
export function initialUpload(): UploadState { return { phase: "idle", progress: 0, jobId: null, error: null }; }
export function uploadReducer(state: UploadState, event: UploadEvent): UploadState {
  if (event.type === "start") return ["idle", "error", "cancelled"].includes(state.phase) ? { phase: "transmitting", progress: 0, jobId: event.jobId, error: null } : state;
  if (event.type === "cancel-request") return ["transmitting", "processing"].includes(state.phase) ? { ...state, phase: "cancel-requested" } : state;
  if (event.jobId !== state.jobId) return state;
  if (event.type === "cancel-result") return state.phase === "cancel-requested" ? { ...state, phase: event.confirmed ? "cancelled" : "unknown" } : state;
  if (event.type === "unknown") return ["transmitting", "processing", "cancel-requested"].includes(state.phase) ? { ...state, phase: "unknown" } : state;
  if (!["transmitting", "processing"].includes(state.phase)) return state;
  if (event.type === "progress") return state.phase === "transmitting" ? { ...state, progress: Math.max(0, Math.min(100, event.percent)) } : state;
  if (event.type === "transmitted") return state.phase === "transmitting" ? { ...state, phase: "processing", progress: 100 } : state;
  if (event.type === "processed") return state.phase === "processing" ? { ...state, phase: "done" } : state;
  return { ...state, phase: "error", error: event.message };
}

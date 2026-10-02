export type UploadPhase = "idle" | "transmitting" | "processing" | "cancel-requested" | "cancelled" | "done" | "error" | "unknown";
export type UploadState = { phase: UploadPhase; progress: number; jobId: string | null; error: string | null };
export type UploadEvent =
  | { type: "start"; jobId: string }
  | { type: "progress"; jobId: string; percent: number }
  | { type: "transmitted"; jobId: string }
  | { type: "processed"; jobId: string }
  | { type: "cancel-request" }
  | { type: "cancel-result"; jobId: string; confirmed: boolean }
  | { type: "failure"; jobId: string; message: string }
  | { type: "unknown"; jobId: string };
export function initialUpload(): UploadState { return { phase: "idle", progress: 0, jobId: null, error: null }; }
export function uploadReducer(state: UploadState, event: UploadEvent): UploadState {
  if (event.type === "start") {
    if (
      (state.phase !== "idle" && state.phase !== "error" && state.phase !== "cancelled") ||
      event.jobId === state.jobId
    ) return state;
    return { phase: "transmitting", progress: 0, jobId: event.jobId, error: null };
  }

  if (event.type === "cancel-request") {
    return state.jobId !== null && (state.phase === "transmitting" || state.phase === "processing")
      ? { ...state, phase: "cancel-requested" }
      : state;
  }

  if (state.jobId === null || event.jobId !== state.jobId) return state;

  switch (event.type) {
    case "progress":
      return state.phase === "transmitting" && !Number.isNaN(event.percent)
        ? { ...state, progress: Math.min(100, Math.max(0, event.percent)) }
        : state;
    case "transmitted":
      return state.phase === "transmitting"
        ? { ...state, phase: "processing", progress: 100 }
        : state;
    case "processed":
      return state.phase === "processing" ? { ...state, phase: "done" } : state;
    case "cancel-result":
      return state.phase === "cancel-requested"
        ? { ...state, phase: event.confirmed ? "cancelled" : "unknown", error: null }
        : state;
    case "failure":
      return state.phase === "transmitting" || state.phase === "processing"
        ? { ...state, phase: "error", error: event.message }
        : state;
    case "unknown":
      return state.phase === "cancel-requested" ? { ...state, phase: "unknown", error: null } : state;
  }
}

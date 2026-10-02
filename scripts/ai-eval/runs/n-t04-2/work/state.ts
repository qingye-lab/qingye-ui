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
    if (!(state.phase === "idle" || state.phase === "error" || state.phase === "cancelled")) return state;
    if (event.jobId === state.jobId) return state;
    return { phase: "transmitting", progress: 0, jobId: event.jobId, error: null };
  }

  if (event.type === "cancel-request") {
    if (state.phase !== "transmitting" && state.phase !== "processing") return state;
    return { ...state, phase: "cancel-requested" };
  }

  if (event.jobId !== state.jobId) return state;

  switch (event.type) {
    case "progress":
      if (state.phase !== "transmitting" || Number.isNaN(event.percent)) return state;
      return { ...state, progress: Math.min(100, Math.max(0, event.percent)) };
    case "transmitted":
      if (state.phase !== "transmitting") return state;
      return { ...state, phase: "processing", progress: 100 };
    case "processed":
      if (state.phase !== "processing") return state;
      return { ...state, phase: "done", error: null };
    case "cancel-result":
      if (state.phase !== "cancel-requested") return state;
      return { ...state, phase: event.confirmed ? "cancelled" : "unknown", error: null };
    case "unknown":
      if (state.phase !== "cancel-requested") return state;
      return { ...state, phase: "unknown", error: null };
    case "failure":
      if (state.phase !== "transmitting" && state.phase !== "processing") return state;
      return { ...state, phase: "error", error: event.message };
  }
}

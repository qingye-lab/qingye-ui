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
  // TODO: transport, processing and cancellation have distinct evidence.
  return state;
}

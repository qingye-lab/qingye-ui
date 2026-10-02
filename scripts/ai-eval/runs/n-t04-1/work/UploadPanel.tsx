import * as React from "react";
import { Button, FileUpload } from "@qingye/ui";
import { initialUpload, uploadReducer, type UploadEvent, type UploadPhase } from "./state";

export type UploadPanelProps = {
  api: {
    upload(file: File, jobId: string, onProgress: (percent: number) => void): Promise<void>;
    process(jobId: string): Promise<void>;
    cancel(jobId: string): Promise<{ confirmed: boolean }>;
  };
  onComplete(jobId: string): void;
};

function canStart(phase: UploadPhase) {
  return phase === "idle" || phase === "error" || phase === "cancelled";
}

function canCancel(phase: UploadPhase) {
  return phase === "transmitting" || phase === "processing";
}

function locksFiles(phase: UploadPhase) {
  return canCancel(phase) || phase === "cancel-requested" || phase === "unknown";
}

const phaseText: Record<UploadPhase, string> = {
  idle: "准备上传",
  transmitting: "传输中",
  processing: "处理中",
  "cancel-requested": "正在请求取消",
  cancelled: "已取消",
  done: "处理完成",
  error: "上传失败",
  unknown: "结果待确认",
};

export function UploadPanel({ api, onComplete }: UploadPanelProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [state, dispatch] = React.useReducer(uploadReducer, undefined, initialUpload);
  const sequence = React.useRef(0);
  const current = React.useRef(state);
  const jobFile = React.useRef<File | null>(null);

  // Apply the same reducer synchronously so promise callbacks see a cancellation
  // immediately, even before React commits the corresponding render.
  function send(event: UploadEvent) {
    const next = uploadReducer(current.current, event);
    current.current = next;
    dispatch(event);
    return next;
  }

  async function start() {
    const file = files[0];
    if (!file || !canStart(current.current.phase)) return;

    const jobId = `upload-${++sequence.current}`;
    jobFile.current = file;
    send({ type: "start", jobId });

    try {
      await api.upload(file, jobId, (percent) => {
        send({ type: "progress", jobId, percent });
      });

      const transmitted = send({ type: "transmitted", jobId });
      if (transmitted.jobId !== jobId || transmitted.phase !== "processing") return;
      await api.process(jobId);
    } catch (error) {
      send({ type: "failure", jobId, message: error instanceof Error ? error.message : "上传失败" });
      return;
    }

    const previous = current.current;
    const processed = send({ type: "processed", jobId });
    if (previous.jobId === jobId && previous.phase === "processing" && processed.phase === "done") {
      onComplete(jobId);
    }
  }

  async function cancel() {
    const { jobId, phase } = current.current;
    if (jobId === null || !canCancel(phase)) return;

    send({ type: "cancel-request" });
    try {
      const result = await api.cancel(jobId);
      send({ type: "cancel-result", jobId, confirmed: result.confirmed });
    } catch {
      send({ type: "unknown", jobId });
    }
  }

  return (
    <section aria-label="上传资料">
      <FileUpload
        files={files}
        onFilesChange={(nextFiles) => {
          if (!locksFiles(current.current.phase)) setFiles(nextFiles);
        }}
        maxFiles={1}
        label="选择资料文件"
        disabled={locksFiles(state.phase)}
        getProgress={(file) => state.phase === "transmitting" && file === jobFile.current ? state.progress : null}
        getError={(file) => state.phase === "error" && file === jobFile.current ? state.error : null}
        renderActions={(file) => (
          <Button
            type="button"
            onClick={() => void cancel()}
            disabled={!canCancel(state.phase) || file !== jobFile.current}
          >
            请求取消
          </Button>
        )}
      />
      <p role="status">{phaseText[state.phase]}</p>
      {state.phase === "cancel-requested" ? <p>已记录传输进度：{state.progress}%</p> : null}
      <Button type="button" onClick={() => void start()} disabled={files.length === 0 || !canStart(state.phase)}>
        开始上传
      </Button>
    </section>
  );
}

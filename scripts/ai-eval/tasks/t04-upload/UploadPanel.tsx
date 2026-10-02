import * as React from "react";
import { Button, FileUpload } from "@qingye/ui";
import { initialUpload, uploadReducer } from "./state";

export type UploadPanelProps = {
  api: {
    upload(file: File, jobId: string, onProgress: (percent: number) => void): Promise<void>;
    process(jobId: string): Promise<void>;
    cancel(jobId: string): Promise<{ confirmed: boolean }>;
  };
  onComplete(jobId: string): void;
};
export function UploadPanel({ api, onComplete }: UploadPanelProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [state, dispatch] = React.useReducer(uploadReducer, undefined, initialUpload);
  const sequence = React.useRef(0);
  // TODO: drive actual transmission then processing, preserving the selected file.
  async function start() { void api; void onComplete; void sequence; }
  async function cancel() { /* TODO: request and confirmation are distinct. */ }
  return <section aria-label="上传资料">
    <FileUpload files={files} onFilesChange={setFiles} maxFiles={1} label="选择资料文件" />
    {/* TODO: use getProgress/getError/renderActions on actual FileUpload. */}
    <p role="status">{/* TODO: truthful phase text. */}</p>
    <Button onClick={() => void start()} disabled={files.length === 0}>开始上传</Button>
  </section>;
}

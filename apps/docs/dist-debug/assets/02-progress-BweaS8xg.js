const e=`import { Button } from "@qingye/ui/components/button";
import { FileUpload } from "@qingye/ui/components/file-upload";
import { RotateCwIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const meta = {
  title: "缩略图、进度与错误",
  description: "组件只展示状态：上传逻辑放在外部，通过 getProgress、getError 和 renderActions 回显。",
};

const photo = (name: string, hue: number) =>
  new File(
    [\`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="hsl(\${hue} 30% 62%)"/><circle cx="28" cy="13" r="5" fill="hsl(\${hue} 40% 86%)"/><path d="M0 40 14 22l10 10 6-6 10 14z" fill="hsl(\${hue} 28% 38%)"/></svg>\`],
    name,
    { type: "image/svg+xml" },
  );

const initial = [photo("机柜正面-A03.svg", 210), photo("配线架标签.svg", 150), photo("UPS 告警面板.svg", 20)];

export default function Demo() {
  const [files, setFiles] = useState<File[]>(initial);
  const [progress, setProgress] = useState(() => new Map<File, number>([[initial[0]!, 100], [initial[1]!, 64]]));
  const [failed, setFailed] = useState(() => new Set<File>([initial[2]!]));

  // Simulated upload: every file without progress starts climbing.
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((previous) => {
        const next = new Map(previous);
        for (const file of files) {
          if (failed.has(file)) continue;
          const value = next.get(file) ?? 0;
          if (value < 100) next.set(file, Math.min(100, value + 9));
        }
        return next;
      });
    }, 400);
    return () => clearInterval(timer);
  }, [files, failed]);

  return (
    <FileUpload
      className="w-full max-w-md"
      accept="image/*"
      thumbnails
      label="上传现场照片"
      description="巡检工单 #4821 · 最多 6 张"
      maxFiles={6}
      files={files}
      onFilesChange={setFiles}
      getProgress={(file) => (progress.get(file) === 100 ? null : (progress.get(file) ?? 0))}
      getError={(file) => (failed.has(file) ? "上传失败：网络连接中断" : null)}
      renderActions={(file) =>
        failed.has(file) ? (
          <Button
            size="icon-sm"
            variant="ghost"
            aria-label={\`重试上传 \${file.name}\`}
            onClick={() => {
              setFailed((previous) => new Set([...previous].filter((item) => item !== file)));
              setProgress((previous) => new Map(previous).set(file, 0));
            }}
          >
            <RotateCwIcon />
          </Button>
        ) : null
      }
    />
  );
}
`;export{e as default};

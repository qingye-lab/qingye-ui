# 文件上传 FileUpload

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/file-upload
Source: packages/ui/src/components/file-upload.tsx
Source SHA-256: 8325e43acae0b4c4e02ec063d0ddbb3320c638b7aeee8307d32886660afb13f2

拖放或点选文件，按类型、大小和数量校验后列出。组件只管理文件列表，不发起上传；进度与错误由你传入。

## Use and ownership
- 选择或拖入文件，逐项核对被接受文件、拒绝原因和上传状态。
- Avoid: 选进队列不代表上传完成；进度不能伪造服务端处理或已取消结果。
- Library: 文件选择、类型大小数量校验、已接受列表、原生提交镜像和移除焦点。
- Application: 上传、重试、取消请求、结果核实与持久化。

## Composition
- 按钮或 dropzone 提供入口，列表保持文件身份，原位 rejection 和行内 actions 承接修正。

## Responsive behavior
- 长文件名收缩并保留完整 title；行内错误与恢复动作不能遮住移除入口。

## Customization
- getProgress 和 getError 只展示宿主事实，renderActions 复用公共 Button 实现恢复。

## Current exports
- FileRejection: type; owner file-upload; PASS
- FileUpload: function; owner file-upload; PASS; props: FileUploadProps
- FileUploadProps: type; owner file-upload; PASS
- formatFileSize: function; owner file-upload; PASS; props: number

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### FileUpload
拖放区（或紧凑按钮）+ 文件列表 + 校验提示。
- files / defaultFiles: readonly File[]. 受控 / 非受控的文件列表。
- onFilesChange: (files: File[]) => void. 添加或移除后调用，参数是完整列表。
- onReject: (rejected: FileRejection[]) => void. 有文件未通过校验时调用；reason 为 type | size | count。
- accept: string. 与 <input accept> 相同，例如 "image/*,.pdf"。
- maxSize: number; default Infinity. 单个文件上限（字节）。
- maxFiles: number; default Infinity. 最多保留的文件数；为 1 时新选的文件替换旧文件。
- variant: "dropzone" | "button"; default "dropzone". 大面积拖放区，或适合密集表单的按钮触发。
- thumbnails: boolean; default false. 图片文件显示缩略图。
- getProgress: (file, index) => number | null | undefined. 0–100 的上传进度；返回空值时显示文件大小。
- getError: (file, index) => ReactNode. 单个文件的错误信息，例如上传失败。
- renderActions: (file, index) => ReactNode. 每行移除按钮前的额外操作，例如重试。
- name: string. 字段名；浏览器支持 DataTransfer 时，隐藏输入与已接受列表同步；拒绝或重复选择不清掉原有文件。
- invalid: boolean; default false. 错误边框；同时提供可见的错误文字。
- disabled: boolean; default false. 禁用拖放、选择与移除。
- label / description / chooseLabel: string / ReactNode. 覆盖默认文案。
- removeLabel / rejectionLabel: (file) => string / (rejection) => string. 移除按钮名称与校验提示的文案。
- buttonProps: ButtonProps. button 形态下触发按钮的 variant、size 等。

### formatFileSize
字节数 → 「1.5 MB」这样的可读大小。

## Keyboard
- Tab: 聚焦拖放区（或按钮），再依次聚焦每个文件的移除按钮。
- Enter / Space: 打开系统文件选择框。
- Enter / Space（移除按钮）: 移除该文件，焦点移到下一个文件或拖放区。

## Source examples
### 拖放区
Source: apps/docs/src/content/file-upload/demos/01-dropzone.tsx
```tsx
import { FileUpload } from "@qingye/ui/components/file-upload";

export const meta = { title: "拖放区", description: "点击或拖入文件；不符合类型或大小的文件会被拒绝并说明原因。" };

const sample = (name: string, type: string, size: number) => new File([new Uint8Array(size)], name, { type });

export default function Demo() {
  return (
    <FileUpload
      className="w-full max-w-md"
      accept="image/*,.pdf"
      maxSize={10 * 1024 * 1024}
      label="上传发票"
      description="支持 PNG、JPG、PDF，单个不超过 10 MB"
      defaultFiles={[
        sample("2026年9月差旅发票.pdf", "application/pdf", 248_000),
        sample("酒店住宿水单-杭州.jpg", "image/jpeg", 1_860_000),
      ]}
    />
  );
}
```

### 缩略图、进度与错误
Source: apps/docs/src/content/file-upload/demos/02-progress.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { FileUpload } from "@qingye/ui/components/file-upload";
import { RotateCwIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const meta = {
  title: "缩略图、进度与错误",
  description: "组件只展示状态：上传逻辑放在外部，通过 getProgress、getError 和 renderActions 回显。",
};

const photo = (name: string, hue: number) =>
  new File(
    [`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="hsl(${hue} 30% 62%)"/><circle cx="28" cy="13" r="5" fill="hsl(${hue} 40% 86%)"/><path d="M0 40 14 22l10 10 6-6 10 14z" fill="hsl(${hue} 28% 38%)"/></svg>`],
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
            aria-label={`重试上传 ${file.name}`}
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
```

### 按钮触发
Source: apps/docs/src/content/file-upload/demos/03-button.tsx
```tsx
import { FileUpload } from "@qingye/ui/components/file-upload";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "按钮触发", description: "variant=\"button\" 适合表单中的单个附件；maxFiles=1 时新文件替换旧文件。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Label htmlFor="contract-file">签署版合同</Label>
      <FileUpload
        id="contract-file"
        variant="button"
        accept=".pdf"
        maxFiles={1}
        maxSize={20 * 1024 * 1024}
        chooseLabel="选择 PDF"
        description="仅 PDF，不超过 20 MB"
      />
    </div>
  );
}
```

### 状态
Source: apps/docs/src/content/file-upload/demos/04-states.tsx
```tsx
import { FileUpload } from "@qingye/ui/components/file-upload";

export const meta = { title: "状态", description: "禁用与错误。错误状态要同时给出文字说明。" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-2xl gap-6 sm:grid-cols-2">
      <FileUpload disabled label="上传固件包" description="设备在线升级期间不可上传" />
      <div className="flex flex-col gap-2">
        <FileUpload invalid aria-describedby="id-card-error" label="上传身份证照片" description="正反面各一张，JPG 或 PNG" accept="image/*" />
        <p id="id-card-error" className="text-destructive-foreground text-xs">请上传身份证正反面照片</p>
      </div>
    </div>
  );
}
```

### 数量与大小限制
Source: apps/docs/src/content/file-upload/demos/05-validation.tsx
```tsx
import type { FileRejection } from "@qingye/ui/components/file-upload";
import { FileUpload } from "@qingye/ui/components/file-upload";
import { useState } from "react";

export const meta = {
  title: "数量与大小限制",
  description: "最多 3 个文件、单个 2 MB。拖入超出的文件试试，被拒绝的文件会逐条列出原因。",
};

export default function Demo() {
  const [rejected, setRejected] = useState<FileRejection[]>([]);
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <FileUpload
        maxFiles={3}
        maxSize={2 * 1024 * 1024}
        accept=".csv,.xlsx"
        label="导入设备台账"
        description="CSV 或 Excel，最多 3 个，单个不超过 2 MB"
        onReject={setRejected}
      />
      <p className="text-muted-foreground text-xs numeric">本次拒绝 {rejected.length} 个文件</p>
    </div>
  );
}
```

### 组合：提交工单
Source: apps/docs/src/content/file-upload/demos/06-form.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Field, FieldDescription } from "@qingye/ui/components/field";
import { FileUpload } from "@qingye/ui/components/file-upload";
import { Input } from "@qingye/ui/components/input";
import { Label } from "@qingye/ui/components/label";
import { useState, type FormEvent } from "react";

export const meta = { title: "组合：提交工单", description: "通过 name 参与原生表单提交，FormData 中直接拿到 File。" };

export default function Demo() {
  const [summary, setSummary] = useState<string | null>(null);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const files = new FormData(event.currentTarget).getAll("attachments") as File[];
    setSummary(files.filter((file) => file.size > 0).map((file) => file.name).join("、") || "无附件");
  };
  return (
    <form className="flex w-full max-w-md flex-col gap-4" onSubmit={onSubmit}>
      <Field>
        <Label htmlFor="ticket-title">问题描述</Label>
        <Input id="ticket-title" defaultValue="3 楼会议室投影仪无法识别 HDMI 信号" />
      </Field>
      <Field>
        <Label htmlFor="ticket-files">附件</Label>
        <FileUpload id="ticket-files" name="attachments" variant="button" accept=".png,.jpg,.jpeg,.pdf,.log,.txt" maxFiles={5} chooseLabel="添加附件" aria-describedby="ticket-files-description" />
        <FieldDescription id="ticket-files-description">截图、PDF 或日志，最多 5 个。</FieldDescription>
      </Field>
      <Button type="submit" className="self-start">提交工单</Button>
      {summary !== null ? <p role="status" className="text-muted-foreground text-xs">本次附件：{summary}</p> : null}
    </form>
  );
}
```


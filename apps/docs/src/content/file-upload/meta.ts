import type { ComponentMeta } from "@/lib/types";

export default {
  title: "文件上传 FileUpload",
  description: "拖放或点选文件，按类型、大小和数量校验后列出。组件只管理文件列表，不发起上传；进度与错误由你传入。",
  category: "表单",
  source: "local",
  exports: ["FileUpload", "formatFileSize"],
  keywords: ["upload", "file", "dropzone", "上传", "附件", "拖拽"],
  api: [
    {
      name: "FileUpload",
      description: "拖放区（或紧凑按钮）+ 文件列表 + 校验提示。",
      props: [
        { name: "files / defaultFiles", type: "readonly File[]", description: "受控 / 非受控的文件列表。" },
        { name: "onFilesChange", type: "(files: File[]) => void", description: "添加或移除后调用，参数是完整列表。" },
        { name: "onReject", type: "(rejected: FileRejection[]) => void", description: "有文件未通过校验时调用；reason 为 type | size | count。" },
        { name: "accept", type: "string", description: "与 <input accept> 相同，例如 \"image/*,.pdf\"。" },
        { name: "maxSize", type: "number", default: "Infinity", description: "单个文件上限（字节）。" },
        { name: "maxFiles", type: "number", default: "Infinity", description: "最多保留的文件数；为 1 时新选的文件替换旧文件。" },
        { name: "variant", type: '"dropzone" | "button"', default: '"dropzone"', description: "大面积拖放区，或适合密集表单的按钮触发。" },
        { name: "thumbnails", type: "boolean", default: "false", description: "图片文件显示缩略图。" },
        { name: "getProgress", type: "(file, index) => number | null | undefined", description: "0–100 的上传进度；返回空值时显示文件大小。" },
        { name: "getError", type: "(file, index) => ReactNode", description: "单个文件的错误信息，例如上传失败。" },
        { name: "renderActions", type: "(file, index) => ReactNode", description: "每行移除按钮前的额外操作，例如重试。" },
        { name: "name", type: "string", description: "字段名；隐藏的文件输入与列表同步，原生表单提交可直接带上文件。" },
        { name: "invalid", type: "boolean", default: "false", description: "错误边框；同时提供可见的错误文字。" },
        { name: "disabled", type: "boolean", default: "false", description: "禁用拖放、选择与移除。" },
        { name: "label / description / chooseLabel", type: "string / ReactNode", description: "覆盖默认文案。" },
        { name: "removeLabel / rejectionLabel", type: "(file) => string / (rejection) => string", description: "移除按钮名称与校验提示的文案。" },
        { name: "buttonProps", type: "ButtonProps", description: "button 形态下触发按钮的 variant、size 等。" },
      ],
    },
    { name: "formatFileSize", description: "字节数 → 「1.5 MB」这样的可读大小。" },
  ],
  keyboard: [
    { keys: "Tab", description: "聚焦拖放区（或按钮），再依次聚焦每个文件的移除按钮。" },
    { keys: "Enter / Space", description: "打开系统文件选择框。" },
    { keys: "Enter / Space（移除按钮）", description: "移除该文件，焦点移到下一个文件或拖放区。" },
  ],
  notes: [
    "组件不上传文件：在 onFilesChange 中自行上传，再通过 getProgress / getError 回显状态。",
    "说明文字写清允许的格式和大小，校验失败时会以 role=alert 读出原因。",
    "图片缩略图使用对象 URL，文件移除或组件卸载时自动释放。",
  ],
} satisfies ComponentMeta;

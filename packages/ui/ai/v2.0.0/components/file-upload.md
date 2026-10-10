# 文件输入 FileUpload

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/file-upload
Source: packages/ui/src/components/file-upload.tsx
Source SHA-256: 8401f44ad4592a64c2fcb9d8bb6399a8409aa2c439f04c08783aefa8fcd5741e

选择或拖入本地文件，保留已接受集合与真实拒绝原因。

## Decision
组件只管理本地文件选择。上传状态、进度分母、失败、结果未知与恢复由应用提供；它不发请求、不制造进度、不从 Promise 推断结果。

## Notes
- 对象身份决定集合成员；不凭同名/大小猜文件内容相同。移除后可重新选择同一文件；聚焦行移除回相邻动作或 chooser，受控拒绝不夺焦点。
- Field 保留 Label/error/disabled 连接；实际 chooser 的 name/value/required 隔离，避免提交草稿或恒 invalid。
- 需要支持 formdata 的浏览器；jsdom 事件桥接不等于已验证原生 FormData 构造行为。
- 规则值是应用约束，列表/拖放布局是选择，样式读现有角色，无额外数值 token。
- 选择入口只显示操作名称，原生 chooser 清空用于重选；已接受文件事实以独立集合呈现。装饰 span 不创建第二交互入口。

## Use and ownership
- 选择或拖入本地文件，保留已接受集合与真实拒绝原因。
- Avoid: 不能仅用 placeholder 代替名称；失败后不要无故清空输入。
- Library: 选择、拖放、非受控本地集合、真实拒绝
- Application: 受控集合、接受规则、上传状态/进度、恢复与结果

## Composition
- Field + FieldLabel + FileUpload + 实际规则说明/FieldError

## Responsive behavior
- 原生 Input/Button 一套几何，跟随密度轴，紧凑不缩小文字，文件名按真实容量换行

## Customization
- Input/根 render/ref/ARIA/events、getStatus、恢复入口及现有主题

## Current exports
- FileUpload: function; owner file-upload; PASS; props: FileUploadProps
- FileUploadChangeDetails: type; owner file-upload; PASS
- FileUploadPrimitive: reexport; owner file-upload; UNVERIFIED
- FileUploadProps: type; owner file-upload; PASS
- FileUploadRejection: type; owner file-upload; PASS
- FileUploadStatus: type; owner file-upload; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### FileUpload
原生 file Input、拖放、已接受列表与真实规则验证的组合。
- value / defaultValue / onValueChange: readonly File[] / readonly File[] / (files, details) => void; default defaultValue: []. 受控或非受控接受集合，保留 File 引用。details 含 select/drop/remove、added/removed/event/cancel()；受控拒绝或取消不改变提交集合。
- accept / maxSize / maxFiles: string / number / number. 扩展名/MIME规则、每文件字节数、集合数量。大小与数量为非负安全整数，省略不限制；按 type/size/count 的实际首个失败理由拒绝，已知外部集合不静默纠正。
- multiple: boolean; default true. 默认是集合选择；false 的集合容量最多1，已有文件须先移除才能加入另一个，不隐式替换。
- onReject: (rejections: {file, reason}[], event) => void. 真实 type/size/count 拒绝；拒绝项可关闭提示，但不冒充已接受文件。
- name / form: string. chooser 不带最终 name；Field 可提供名称，公开 formdata 事件 append 已接受 File，不覆盖同名其它字段。显式 form 支持外部表单。
- disabled / readOnly: boolean; default false. 阻止选择、拖放和移除；Field/原生 fieldset 禁用同样约束。只读文件继续提交，禁用排除。原生 reset 未取消时非受控恢复初始 defaultValue，受控值保留。
- getStatus: (file) => {state, label, progress?} | undefined. 调用方真实 waiting/in-progress/failed/unknown/success 与可见 label。只有 in-progress 可提供 {value, min?, max}；max 是调用方已知分母，null 为不定进度。
- renderFileActions: (file, status) => ReactNode. 应用的实际恢复/核对入口，组件不自动执行；本地移除不表示取消上传或删除服务端对象。
- inputProps / render / ref / ARIA / events: current Input props / div composition. 选择动作与编辑边界共用一套几何（跟随密度轴）；Input 出口支持 render/ref/events。required 不暴露，chooser 会清空；集合必填由应用按当前 value 校验并用 FieldError 表达。

### FileUploadPrimitive
所用安装版 Input 原语命名空间。

## Keyboard
- Tab / Enter / Space: 到真实原生文件入口并选择；只读阻止修改。
- Tab / Enter: 移除已接受本地文件或关闭拒绝提示；应用恢复入口遵守其自身事实。

## Source examples
### 本地文件
Source: apps/docs/src/content/file-upload/demos/01-files.tsx
```tsx
import { useState } from "react";
import { Field, FieldDescription, FieldLabel } from "@qingye_lab/ui/components/field";
import { FileUpload } from "@qingye_lab/ui/components/file-upload";
export const meta = { title: "本地文件", titleEn: "Local files" };
const maxBytes = 64 * 1024;
export default function Demo() {
  const [files, setFiles] = useState<readonly File[]>([]);
  return <form><Field name="files"><FieldLabel>文件</FieldLabel><FileUpload value={files} onValueChange={setFiles} accept=".txt,image/*" maxFiles={3} maxSize={maxBytes} /><FieldDescription>文本或图片，最多 3 个，每个不超过 64 KiB。</FieldDescription></Field></form>;
}
```

### 密度与只读
Source: apps/docs/src/content/file-upload/demos/02-density.tsx
```tsx
import { useState } from "react";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { FileUpload } from "@qingye_lab/ui/components/file-upload";

export const meta = { title: "密度与只读", titleEn: "Density and read-only" };

export default function Demo() {
  const [stored] = useState(() => new File(["A"], "现场照片.jpg", { type: "image/jpeg" }));
  return (
    <div className="grid w-full grid-cols-3 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <FileUpload />
          </Field>
        </div>
      ))}
      <Field><FieldLabel>只读文件</FieldLabel><FileUpload defaultValue={[stored]} readOnly /></Field>
    </div>
  );
}
```

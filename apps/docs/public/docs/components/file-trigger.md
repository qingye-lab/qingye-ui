# 文件触发 FileTrigger

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/file-trigger
Source: packages/ui/src/components/file-trigger.tsx
Source SHA-256: 23cb93caa181ab49f3b19b3e3a030c60f68aa9624afa400f625ccde4e9c190c4

点按钮选文件，选完立即交给应用，不保留选择。

## Decision
只做「选完立即交给应用」：不保留选择、不显示列表、不显示拒绝。被拒绝的文件连同原因放在 details.rejected 交回，应用必须自己呈现，否则用户看不到为什么没有导入。需要列表、移除或随表单提交时用 FileUpload。

## Notes
- 每次选择后原生 input 都被清空，所以可以连续选同一个文件；因此没有 reset 方法。
- 本组件没有地方显示拒绝，onSelect 的 details.rejected 必须由应用呈现（Toast、Alert 或 FieldError）。
- 文件内容校验、解析和上传属于应用；accept 只判断文件名与 MIME 类型，不读内容。

## Use and ownership
- 点按钮选文件，选完立即交给应用，不保留选择。
- Avoid: 不能仅用 placeholder 代替名称；失败后不要无故清空输入。
- Library: 打开选择框、按规则分出接受与拒绝、清空原生 input
- Application: 拿到文件后的解析与上传、拒绝原因的呈现

## Composition
- Toolbar / PageHeader 动作区中的 FileTrigger + onSelect 里的 Toast

## Responsive behavior
- 与 Button 同一套几何，跟随尺寸与密度

## Customization
- Button 的 variant/size/tone/render/ref/ARIA/events

## Current exports
- FileTrigger: function; owner file-trigger; PASS; props: FileTriggerProps
- FileTriggerProps: type; owner file-trigger; PASS
- FileTriggerSelectDetails: type; owner file-trigger; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### FileTrigger
- `accept?`: `string`. 扩展名或 MIME 规则，逗号分隔；同时交给原生选择框，也用来判定实际选中的文件。
- `className?`: `string`.
- `data-slot?`: `string`.
- `loading?`: `boolean`. 这个动作正在执行。事实由调用方持有；按钮只表示忙碌并挡住重复触发，不启动请求、不推断完成。 成功、失败与结果未知不是按钮的事：就地说明用 Alert，短暂反馈用 Toast，字段错误用 FieldError。
- `maxFiles?`: `number`. 单次选择可接受的文件数上限；省略不限（multiple 为 false 时最多 1）。
- `maxSize?`: `number`. 每个文件的字节数上限；省略不限。
- `multiple?`: `boolean`. 一次可选多个。默认 false：「导入」这类入口一次只处理一个文件。
- `onSelect?`: `(accepted: readonly File[], details: FileTriggerSelectDetails) => void`. 选择完成即调用，只在有文件被接受或被拒绝时调用（用户取消不调用）。 全部被拒绝时 `accepted` 为空，仍会调用。
- `shape?`: `"label" | "icon"`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- `tone?`: `"neutral" | "danger"`.
- `validate?`: `(file: File) => string | undefined`. 自定义拒绝：返回文案即拒绝该文件，在类型与大小之后、数量之前判断。文案在 `rejected` 里原样交回。
- `variant?`: `"solid" | "bordered" | "quiet"`.
- plus 283 inherited (@types/react 280, @base-ui/react 3); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### FileTrigger
本库 Button 加一个不可见的原生 file input；按钮是唯一入口，不参与表单提交。
- onSelect: (accepted: readonly File[], details: { rejected, event }) => void. 选择完成即调用。有文件被接受或被拒绝时都调用，全部被拒绝时 accepted 为空；用户取消（没有文件）不调用。rejected 与 FileUpload 的 onReject 同形：reason 为 type/size/count，或带 message 的 custom。
- accept / maxSize / maxFiles: string / number / number. 扩展名/MIME 规则、每文件字节数、单次选择的文件数。accept 同时交给原生选择框并用于判定实际选中的文件；maxFiles 只限单次选择。
- multiple: boolean; default false. 一次可选多个。默认单个：导入这类入口通常一次处理一个文件，与 FileUpload（默认多个）不同。
- validate: (file: File) => string | undefined. 返回文案即拒绝，在类型与大小之后、数量之前判断，文案在 rejected 里原样交回。
- disabled / ref / render / Button props: ButtonProps. 其余属性（variant、size、tone、disabled、aria-* 等）和 ref 交给按钮。disabled 时按钮与原生 input 都禁用。不接受 name/form/value：它不参与表单提交。render 换成别的按钮元素时同样可用。

## Keyboard
- Tab / Enter / Space: 到按钮并打开系统文件选择框；原生 input 不在 Tab 序列里。

## Source examples
### 导入
Source: apps/docs/src/content/file-trigger/demos/01-import.tsx
```tsx
import { useEffect, useId } from "react";
import { FileTrigger } from "@qingye_lab/ui/components/file-trigger";
import { toastManager } from "@qingye_lab/ui/components/toast";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "导入", titleEn: "Import" };

export default function Demo() {
  const { messages, code } = useUILocale();
  const id = useId();
  useEffect(() => () => toastManager.close(id), [id]);
  return <FileTrigger
    variant="bordered"
    accept=".csv"
    maxSize={64 * 1024}
    onSelect={(accepted, { rejected }) => {
      const reasons = rejected.map(item => item.reason === "custom" ? messages.fileRejectedWith(item.file.name, item.message) : messages.fileError(item.file.name, item.reason));
      if (reasons.length) toastManager.add({ id, type: "error", title: reasons.join("；"), timeout: 5000 });
      else toastManager.add({ id, type: "success", title: accepted.map(file => file.name).join("、"), timeout: 5000 });
    }}
  >{code.startsWith("en") ? "Import CSV" : "导入 CSV"}</FileTrigger>;
}
```

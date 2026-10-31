# FileTrigger

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/file-trigger
Source: packages/ui/src/components/file-trigger.tsx
Source SHA-256: 23cb93caa181ab49f3b19b3e3a030c60f68aa9624afa400f625ccde4e9c190c4

Press a button to choose files and hand them to the application at once, retaining no selection.

## Decision
It only hands the selection to the application as soon as it is made: no retained selection, no list, no rejection display. Rejected files and their reasons come back in details.rejected and the application must present them, otherwise the user cannot see why nothing was imported. Use FileUpload for a list, removal, or form submission.

## Notes
- The native input is cleared after every selection, so the same file can be chosen again; that is why there is no reset method.
- The component has nowhere to show rejections, so the application must present details.rejected in onSelect (Toast, Alert, or FieldError).
- Reading, parsing and uploading file contents belong to the application; accept checks only the file name and MIME type.

## Use and ownership
- Press a button to choose files and hand them to the application at once, retaining no selection.
- Avoid: Do not use a placeholder as the only label; keep input after a failure unless there is a reason to clear it.
- Library: Opening the chooser, splitting accepted from rejected by the rules, clearing the native input.
- Application: Parsing and uploading the files, presenting rejection reasons.

## Composition
- FileTrigger in a toolbar or PageHeader actions, with a Toast raised from onSelect

## Responsive behavior
- Same geometry as Button, following size and density.

## Customization
- Button variant/size/tone/render/ref/ARIA/events.

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
A Button plus an invisible native file input. The button is the only entry; it takes no part in form submission.
- onSelect: (accepted: readonly File[], details: { rejected, event }) => void. Called as soon as a selection is made, whether files were accepted or rejected; accepted is empty when all are rejected. Not called when the user cancels (no files). rejected has the same shape as FileUpload's onReject: reason is type/size/count, or custom with a message.
- accept / maxSize / maxFiles: string / number / number. Extension/MIME rules, bytes per file, and files per selection. accept is given to the native chooser and also checked against the files actually chosen; maxFiles limits a single selection only.
- multiple: boolean; default false. Allow several files per selection. Defaults to one: an import entry usually handles one file, unlike FileUpload which defaults to a set.
- validate: (file: File) => string | undefined. Return a message to reject. Evaluated after type and size and before count; the message comes back unchanged in rejected.
- disabled / ref / render / Button props: ButtonProps. Other props (variant, size, tone, disabled, aria-*, ...) and ref go to the button. disabled disables both the button and the native input. name, form and value are not accepted: it takes no part in form submission. render swaps the button element.

## Keyboard
- Tab / Enter / Space: Reach the button and open the system file chooser; the native input is outside the tab order.

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

# FileUpload

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/file-upload
Source: packages/ui/src/components/file-upload.tsx
Source SHA-256: 8401f44ad4592a64c2fcb9d8bb6399a8409aa2c439f04c08783aefa8fcd5741e

Choose or drop local files, retaining accepted files and real rejection reasons.

## Decision
The component manages local selection only. The application supplies upload states, progress denominators, failure, unknown results, and recovery. It sends no requests, invents no progress, and infers no result from a Promise.

## Notes
- Object identity determines membership; equal names/sizes do not imply equal content. Removed files can be reselected. Removing a focused row returns to a neighboring action or chooser; controlled refusal preserves focus.
- Field retains label/error/disabled links. The actual chooser isolates name, value, and required to avoid draft submission or permanent invalidity.
- Requires browser formdata support. A jsdom event bridge does not verify native FormData construction.
- Rules are application constraints; list/drop layout is a choice. Styles use existing roles without new numeric tokens.
- The chooser displays its action name and clears for reselection. The separate list expresses accepted files. Its decorative span creates no second interaction entry.

## Use and ownership
- Choose or drop local files, retaining accepted files and real rejection reasons.
- Avoid: Do not use a placeholder as the only label; keep input after a failure unless there is a reason to clear it.
- Library: Selection, drop, uncontrolled local collection, and actual rejection.
- Application: Controlled collection, acceptance rules, upload state/progress, recovery, and outcomes.

## Composition
- Field + FieldLabel + FileUpload + actual rule explanation/FieldError

## Responsive behavior
- Native Input/Button use five matching text profiles; filenames wrap within actual capacity.

## Customization
- Input/root render/refs/ARIA/events, getStatus, recovery entries, and existing theme.

## Current exports
- FileUpload: function; owner file-upload; PASS; props: FileUploadProps
- FileUploadChangeDetails: type; owner file-upload; PASS
- FileUploadPrimitive: reexport; owner file-upload; UNVERIFIED
- FileUploadProps: type; owner file-upload; PASS
- FileUploadRejection: type; owner file-upload; PASS
- FileUploadStatus: type; owner file-upload; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### FileUpload
A native file input composed with dropping, accepted files, and real rule validation.
- value / defaultValue / onValueChange: readonly File[] / readonly File[] / (files, details) => void; default defaultValue: []. Controlled or uncontrolled accepted files, retaining File references. details includes select/drop/remove, added, removed, event, and cancel(). Refusal or cancellation preserves submitted files.
- accept / maxSize / maxFiles: string / number / number. Extension/MIME rules, bytes per file, and collection count. Size and count are nonnegative safe integers; omitted means unlimited. Reject with the first actual type/size/count failure; external sets are not silently repaired.
- multiple: boolean; default true. Defaults to collection selection. false limits capacity to one; remove an existing file before adding another, with no implicit replacement.
- onReject: (rejections: {file, reason}[], event) => void. Actual type/size/count rejections. Dismissing feedback does not make rejected files accepted.
- name / form: string. The chooser has no final name. Field may supply it; the public formdata event appends accepted Files without replacing other same-name fields. form supports external forms.
- disabled / readOnly: boolean; default false. Block selecting, dropping, and removing, including Field/native fieldset disabled. Read-only submits; disabled is excluded. Uncanceled native reset restores initial uncontrolled defaultValue and retains controlled values.
- getStatus: (file) => {state, label, progress?} | undefined. Caller-provided waiting/in-progress/failed/unknown/success and a visible label. Only in-progress accepts {value,min?,max}; max is a known denominator and null is indeterminate.
- renderFileActions: (file, status) => ReactNode. Real application recovery/check actions, never executed automatically. Local removal does not imply canceling an upload or deleting a server object.
- inputProps / render / ref / ARIA / events: current Input props / div composition. The chooser shares one geometry with the editing boundary (density axis). Input supports render, refs, and events. required is not exposed because the chooser clears; validate the current set in the application with FieldError.

### FileUploadPrimitive
The installed Input primitive namespace.

## Keyboard
- Tab / Enter / Space: Reach and activate the real native file chooser; read-only blocks changes.
- Tab / Enter: Remove accepted local files or dismiss rejections; recovery actions follow application facts.

## Source examples
### 本地文件
Source: apps/docs/src/content/file-upload/demos/01-files.tsx
```tsx
import { useState } from "react";
import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { FileUpload } from "@qingye/ui/components/file-upload";
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
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { FileUpload } from "@qingye/ui/components/file-upload";

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

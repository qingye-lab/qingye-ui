# 确认动作 ConfirmAction

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/confirm-action
Source: packages/ui/src/components/confirm-action.tsx
Source SHA-256: 6003731bc618e0b8fc86e80a9f526e4acc7bfb3bd045095cfa395f32d8822283

确认具体对象、版本与变更，内容改变后重新阅读。

## Decision
确认针对打开时的可读快照。任何对象、版本、变更或后果改变都使旧认可失效；重新阅读会清除旧确认文字。onConfirm 只是请求，Promise 完成不会推断成功或自动关闭。

## Notes
- 内容恢复成旧值也不会自动复活旧认可；必须重新阅读。
- 确认次数与结果事实归应用；没有自建超时、假成功或自动重试。
- 浮层、尺寸、焦点与后果关联直接消费当前公共组件及集中预设。

## Use and ownership
- 确认具体对象、版本与变更，内容改变后重新阅读。
- Avoid: 不要让样式替代语义；空值、未知与零分别表达。
- Library: 展开、已读快照、失效提示、可选确认输入
- Application: 对象、版本、变更、权限、动作状态与结果

## Composition
- ConfirmAction + 明确 snapshot/文字 + 应用 state/onConfirm

## Responsive behavior
- 一套几何，跟随密度轴，紧凑不缩小文字；模态消费共享可用空间和焦点机制

## Customization
- 各公共部件 props、children 与现有主题

## Current exports
- ConfirmAction: function; owner confirm-action; PASS; props: ConfirmActionProps
- ConfirmActionPrimitive: reexport; owner confirm-action; alias of AlertDialogPrimitive; UNVERIFIED
- ConfirmActionProps: type; owner confirm-action; PASS
- ConfirmActionSnapshot: type; owner confirm-action; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ConfirmAction
AlertDialog、ButtonProtection 与可选 Field/Input 的确认组合。
- snapshot: { objectId: string; objectLabel: string; version: string | number; change: string; consequence: string }. 所有字段必需且有意义；比较包含全部字段。打开捕获不可变副本，确认回调只收到仍对应当前事实的已读副本。
- title / triggerLabel / actionLabel: ReactNode. 调用方提供真实对象与动作文字。后果保持可见并关联实际确认按钮。
- onConfirm: (snapshot, event) => void. 仅请求动作，不发网络、不拥有结果、不自动关窗。应用通过 state/内容表达权限、等待、失败或结果未知。
- state / disabled: ButtonState / boolean; default 'idle' / false. waiting/in-progress/unknown 阻止再次请求；busy/unknown 保留原 Button 的可聚焦 ARIA 禁用，明确 disabled 用原生禁用。返回只关闭界面。
- confirmationText / confirmationLabel: string / ReactNode. 可选准确匹配文字，必须同时给出可见标签；FieldDescription 显示需要的文字。重新阅读或重新打开清旧输入。
- open / defaultOpen / onOpenChange: AlertDialog public props. 受控或非受控展开，onOpenChange details.cancel() 可拒绝；受控调用方决定是否打开/关闭。
- tone: ButtonTone; default 'danger'. 核对输入框读填值控件的一套几何（跟随密度轴）；动作按钮仍用 Button 的尺寸档，因为大小表达位置。tone 表达调用方后果，不赋予权限。
- triggerProps / confirmProps / inputProps / popupProps: Current public component props. 定制真实出口的 render/ref/ARIA/events；confirmProps.onClick 的事件取消阻止请求。危险 trigger 仍需其所在页面的可见后果关联。
- children: ReactNode. 附加真实核对内容或应用提供的状态/恢复入口，位于确认面板。

### ConfirmActionPrimitive
所用安装版 AlertDialog 原语命名空间。

## Keyboard
- Enter / Space: 打开确认或请求当前快照；失效与阻止状态不触发。
- Tab / Shift+Tab: 在真实模态与确认输入/动作间移动。
- Escape / 返回: 退出确认并返回触发入口，不表示取消后台操作。

## Source examples
### 当前快照
Source: apps/docs/src/content/confirm-action/demos/01-snapshot.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
import { ConfirmAction, type ConfirmActionSnapshot } from "@qingye_lab/ui/components/confirm-action";
export const meta = { title: "当前快照", titleEn: "Current snapshot" };
export default function Demo() {
  const [version, setVersion] = useState(1);
  const [requested, setRequested] = useState<ConfirmActionSnapshot>();
  const snapshot = { objectId: "A", objectLabel: "A", version, change: "A → B", consequence: "应用此变更后，以 B 替换 A。" };
  return <Inline><ConfirmAction snapshot={snapshot} title="核对 A → B" triggerLabel="核对 A" actionLabel="请求 A → B" confirmationText="A" confirmationLabel="输入 A" onConfirm={setRequested}>
    <div className="flex flex-wrap items-center gap-(--qy-action-gap)"><Button variant="quiet" onClick={() => setVersion(value => value + 1)}>版本 +1</Button>{requested && <output className="text-support text-muted-foreground">请求：{requested.objectLabel} · {requested.version}</output>}</div>
  </ConfirmAction></Inline>;
}
```

### 结果未知
Source: apps/docs/src/content/confirm-action/demos/02-outcome.tsx
```tsx
import { ConfirmAction } from "@qingye_lab/ui/components/confirm-action";

export const meta = { title: "结果未知", titleEn: "Unknown outcome" };

const snapshot = { objectId: "A", objectLabel: "A", version: 1, change: "A → B", consequence: "应用此变更后，以 B 替换 A。" };

// 结果未知阻止默认再次触发，控件不以超时或动画宣布成功。
export default function Demo() {
  return (
    <div className="flex flex-wrap items-center gap-(--qy-action-gap)">
      <ConfirmAction snapshot={snapshot} title="核对 A → B" triggerLabel="核对 A" actionLabel="请求 A → B" confirmationText="A" confirmationLabel="输入 A" state="unknown" onConfirm={() => {}} />
      <ConfirmAction snapshot={snapshot} title="核对 A → B" triggerLabel="等待中的核对" actionLabel="请求 A → B" state="waiting" onConfirm={() => {}} />
    </div>
  );
}
```

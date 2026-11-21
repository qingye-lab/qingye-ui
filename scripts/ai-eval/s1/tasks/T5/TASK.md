# T5 笔记工作台

笔记工作台需要三个相互独立的组件，各在自己的文件里实现并导出，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
// src/NoteSearch.tsx
export type NoteSearchProps = { onQueryChange: (query: string) => void };
// src/MentionComposer.tsx
export type Person = { id: string; name: string };
export type OutgoingMessage = { text: string; mentionIds: string[] };
export type MentionComposerProps = { people: Person[]; onSend: (message: OutgoingMessage) => void };
// src/RichNote.tsx
export type RichNoteProps = { onChange: (html: string) => void };
```

## 需求

1. **`NoteSearch` 笔记搜索**：可访问名称为“搜索笔记”的搜索框。
   - 每次输入变化调用 `onQueryChange(当前文字)`。
   - 有文字时提供名称以“清除”开头的按钮，点击后清空搜索框并调用 `onQueryChange("")`。
2. **`MentionComposer` 消息输入**：可访问名称为“消息”的输入区，可以 @ 提及成员。
   - 输入 `@` 及其后的文字时，弹出 `people` 中姓名包含该文字的候选；选中候选后，该成员以“@姓名”的形式作为一个整体插入，而不是普通文字。
   - 按 Enter 发送：调用 `onSend({ text, mentionIds })`，`text` 是整条消息的纯文本（提及写作“@姓名”），`mentionIds` 是被提及成员的 id；发送后清空输入区。
3. **`RichNote` 正文编辑**：可访问名称为“正文”的富文本编辑区，带一个名称为“加粗”的工具按钮，可以把选中的文字加粗。
   - 内容变化时调用 `onChange(当前内容的 HTML)`。

允许修改：上述三个文件（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。

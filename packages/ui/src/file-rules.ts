/*
 * 本地文件的选择规则：FileUpload（随表单提交的一组文件）与 FileTrigger（选完立即交给应用）共用。
 * 只判断 File 本身的事实——类型、大小、自定义校验、数量；上传、内容校验与查重属于应用。
 */

/** 拒绝理由：内置规则给出原因类别，`validate` 给出的是调用方自己的文案。 */
export type FileUploadRejection = { file: File; reason: "type" | "size" | "count" | "directory" } | { file: File; reason: "custom"; message: string };

export function accepts(file: File, accept: string | undefined) {
  const rules = accept?.split(",").map(rule => rule.trim().toLowerCase()).filter(Boolean) ?? [];
  if (!rules.length) return true;
  return rules.some(rule => rule.startsWith(".") ? file.name.toLowerCase().endsWith(rule) : rule.endsWith("/*") ? file.type.toLowerCase().startsWith(rule.slice(0, -1)) : file.type.toLowerCase() === rule);
}

/** 规则参数本身写错是开发期错误，直接抛出；`component` 只用于报错文字。 */
export function validateRules(component: string, accept: string | undefined, maxFiles: number | undefined, maxSize: number | undefined) {
  if (maxFiles !== undefined && (!Number.isSafeInteger(maxFiles) || maxFiles < 0)) throw new RangeError(`${component} maxFiles must be a non-negative safe integer.`);
  if (maxSize !== undefined && (!Number.isSafeInteger(maxSize) || maxSize < 0)) throw new RangeError(`${component} maxSize must be a non-negative byte count.`);
  if (accept?.split(",").map(rule => rule.trim()).filter(Boolean).some(rule => !/^\.[\w.-]+$|^[\w!#$&^.+-]+\/(?:[\w!#$&^.+-]+|\*)$/.test(rule))) throw new TypeError(`${component} accept requires comma-separated extensions or MIME types.`);
}

/** 集合容量：非 multiple 时最多 1 个；multiple 时由 maxFiles 决定，省略即不限。 */
export function fileCapacity(multiple: boolean, maxFiles: number | undefined) {
  return multiple ? maxFiles : Math.min(maxFiles ?? 1, 1);
}

export type FileRules = {
  accept?: string | undefined;
  maxSize?: number | undefined;
  validate?: ((file: File) => string | undefined) | undefined;
  /** 集合容量上限（含 `existing`）；undefined 为不限。 */
  capacity?: number | undefined;
  /** 已在集合里的文件：重复引用跳过，且占用容量。 */
  existing?: readonly File[] | undefined;
  /** 被识别为文件夹的伪 File（拖放才有）。 */
  directories?: ReadonlySet<File> | undefined;
};

/**
 * 逐个判定：按 目录 → 类型 → 大小 → validate → 数量 的顺序取首个失败理由。
 * 返回新接受的文件与被拒绝的文件；已存在于 `existing` 的文件既不接受也不拒绝。
 */
export function judgeFiles(incoming: readonly File[], { accept, maxSize, validate, capacity, existing = [], directories }: FileRules) {
  const next = [...existing];
  const accepted: File[] = [];
  const rejected: FileUploadRejection[] = [];
  for (const file of incoming) {
    if (next.includes(file)) continue;
    const reasonOf = directories?.has(file) ? "directory" : !accepts(file, accept) ? "type" : maxSize !== undefined && file.size > maxSize ? "size" : undefined;
    const message = reasonOf ? undefined : validate?.(file) || undefined;
    const rejection: FileUploadRejection | undefined = reasonOf ? { file, reason: reasonOf } : message ? { file, reason: "custom", message } : capacity !== undefined && next.length >= capacity ? { file, reason: "count" } : undefined;
    if (rejection) rejected.push(rejection);
    else { next.push(file); accepted.push(file); }
  }
  return { accepted, rejected };
}

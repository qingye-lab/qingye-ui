// Pattern decisions are authored in metadata, not inferred from fixture source.
export function renderPatternGuidance(pattern) {
  const design = pattern.designJudgement;
  const sections = [["methods", pattern.methods], ["states", pattern.states]];
  for (const [section, names] of sections) {
    const decisions = design?.[section];
    if (!decisions || Object.keys(decisions).length !== names.length || names.some((name) => typeof decisions[name] !== "string" || !decisions[name].trim())) {
      throw new Error(`Pattern ${pattern.slug}: designJudgement.${section} must explain every declared ${section === "methods" ? "method" : "state"} exactly once`);
    }
  }
  return [
    "## 设计判断", "",
    ...(design.summary ? [design.summary, ""] : []),
    "### 方法改变的决定", "",
    ...pattern.methods.map((method) => `- **${method}**：${design.methods[method]}`), "",
    "### 状态命名与边界", "",
    "以下名称索引夹具中的情境，不是一个组件的完整状态枚举。", "",
    ...pattern.states.map((state) => `- **${state}**：${design.states[state]}`), "",
    "组件各自的使用限制见：", "",
    ...pattern.components.map((component) => `- [${component}](../components/${component}.md)`), "",
    "实现前核对[风格契约](../../style.md)；方法来源见[设计理念](../../design-philosophy.md)。", "",
  ];
}

# Sentinel 字段组间距

- 改动归属：项目主题入口 `theme.css`。仅在文档级 `html[data-brand="sentinel"]` 将公共关系 token `--qy-field-group-gap` 设为 `12px`，供两个既有 `FieldGroup` 统一消费；规则不限定明暗或密度。默认品牌和其它品牌未增加覆盖，保留库默认 `20px`。`Fields.tsx` 未修改。
- 实际验证：执行 `node scripts/ai-eval/check-types.mjs --run b-t02-1`，结果 `PASS`；diagnostics 为空，invalidImports 和 invalidProps 均为 0。静态核对主题只覆盖指定 token，没有添加几何属性、`!important` 或其它 token。
- 未验证边界：未启动浏览器；各品牌、明暗和密度组合的实际 computed gap、布局外观及隐藏断言未运行。类型检查不能证明 CSS 运行时结果。

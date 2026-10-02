改动归属：项目集中主题 `theme.css`。在文档级 `html[data-brand="sentinel"]` 上将现有关系 token `--qy-field-group-gap` 设为 `12px`，统一供两个固定 FieldGroup 消费；规则不限定明暗或密度。默认品牌和其它品牌不匹配该规则，继续使用库的默认值。未修改固定消费端、其它 token 或几何属性。

实际验证：PASS — 执行 `node scripts/ai-eval/check-types.mjs --run n-t02-1`，诊断为空，非法导入和非法属性均为 0。源码核对仅有 Sentinel 品牌选择器与指定 token 声明，无 `!important`。

未验证边界：NOT_RUN — 浏览器及 computed gap 测量，未实际验证浅深色、舒适/紧凑和其它品牌的运行时组合；类型检查不能证明 CSS 最终计算值。隐藏断言由独立评估者执行。

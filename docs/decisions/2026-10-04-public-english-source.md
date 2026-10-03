# 公共英文来源与消费

2026-10-04，主任务批准源块、逐节回退和英文投影；中文方法判据仍以根design.md为唯一设计规范。翻译提供阅读入口，不建立第二套设计依据。STANDARDS.md只追加英文译段，中文正文没有改写；philosophy.en.md由网站owner从原哲学正文完整翻译，事实出处不变。

## 来源与同步

根design.md和STANDARDS.md最后一个 `qingye:translation:en` 区块保存完整English正文，start标记记录中文正文SHA256。纯parser返回中文canonical、English正文和声明hash；规范化只做trimEnd加一个换行。Node生成入口验证hash；中文变化后旧译文不能静默继续投影。网站不引入crypto。哲学独立English正文首行声明相同规范化中文源hash，生成器同样验证。

包内/网站design.md继续原样投影根源全文，catalog源hash对应真实全文。design.en.md仅投影源内英文正文；网站designEntryFor选对应语言的正文/AGENTS片段/design片段/task。中文project-adoption标记全文仍各唯一，英文使用独立en namespace，防止破坏既有提取器。旧DESIGN_GUIDE/PROJECT_AGENTS/PROJECT_DESIGN/TASK_PROMPT保持中文出口。

## 元数据与回退

localizedMeta、methodsFor、designFor、pageDecisionsFor签名保持。新增ComponentMeta.designEn、KeyboardRow.keysEn；少数ApiProp的描述型name/type/default含中文，提供nameEn/typeEn/defaultEn。真实导出名、属性标识、类型字面量和代码不翻译。关键词保留双语搜索别名，中文六方法名保持判据身份；既有English方法显示名保持。

设计的whenToUse/avoid/composition/responsive/customization与stateOwner.library/application分别按数组索引回退；缺失、空白、短数组保留同位置中文原文，禁止通用English覆盖组件自身判断。designFor只对原本没写的段落补当前语言默认；pageDecisionsFor读取已本地化作者字段。中文localizedMeta返回原对象，翻译不写回源对象。元数据逐项补83组件公共非示例说明，不翻demos与内部执行日志。

方法入口指向真实 `/docs/design-philosophy#method-1..6`；网站owner输出稳定跨语言锚点，不再链接不存在的业务patterns。

## 投影

gen-catalog读取动态package version。catalog保留原事实并添加localized.en，包含English API、键位、notes、decisions、design与对应provider说明。生成design.en.md、ai/style.en.md、ai/SKILL.en.md、ai/design-philosophy.en.md、当前版本en/llms.txt及en/components；网站另有llms.en.txt。English组件Markdown保留示例原文。guide/style/adoption/NG清单从批准源提取，不维护生成副本。不存在的patterns不另造英文对象。

包files/export与1.0.0未发布候选由基础owner整合，生成/build由主任务执行。源码、定点检查与真实网站接受分别记录。

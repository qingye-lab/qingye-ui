# 归档待重写组件（2026-10-03）

## Status

Executed。用户裁决：「我只要彻底的清理，网站打不开没有关系」。

## 一、做了什么

把**尚未按 `design.md` 重写的组件及其配套内容移出仓库**，消除持续污染源。
归档位置：`/Volumes/SUNSANG 1/Codex/qingye-ui-archive/2026-10-03-pending-rewrite/`
（仓库外，含自述 README 与恢复方法）。

| 归档 | 数量 |
|---|---|
| 组件源码 | 75 |
| 对应测试（含随 Pattern 拆出的 `pattern-contract.test.ts`） | 54 |
| 文档站组件页 | 420 |
| 文档站示例页 | 10 |
| 文档站组合模式页（Pattern 层，组合了已归档原语） | 11 |
| 一次性迁移/改编脚本及其测试对象 | 5 |
| **合计** | **575** |

## 二、为什么移出而不是留在原地

三份独立审查的共同结论：过去的主要缺陷是**把「作者选的」写成「理念要求的」**，
而相当一部分值的真实来源是**旧实现**——改名成 token 不改变来源。
审查者用 AST 逐字比对证明 `opacity-64`、`bg-primary/90`、`z-50`、
入场 `scale(.98)` 等预设与冻结基线逐字相同
（见 `2026-10-03-value-adjudication.md` 第四节）。

留在 `src/components/` 的旧实现是**持续污染源**：每做一个决定都会先看到它们，
并倾向于沿用其取值。移出是消除污染的手段，不是否认来源。

## 三、保留在仓库内的 11 个组件

| 文件 | 保留理由 |
|---|---|
| `button` `card` `input` `popover` | 已按理念重写 |
| `theme-provider` `motion-provider` `toast` `tooltip` | **站点骨架**，全站启动依赖，非被审查组件 |
| `field` `fieldset` `separator` | 审查页 `/review/design` 依赖；`field` 实际渲染时用 `Separator`，并 re-export `Fieldset` |

**依赖闭包是实测的，不是估计的**：`gen:index` 从文件系统重新生成，
typecheck 与 217 个测试通过，build 成功。

## 四、必须留在仓库内的来源文件（关键）

`packages/ui/coss-source.json` 与 `packages/ui/THIRD_PARTY_NOTICES.md`
**不得随归档一起移走**。理由：

保留的 7 个文件**仍含上游派生代码**，且每个都在文件头指向这两份声明：

```
components/field.tsx             components/toast.tsx
components/fieldset.tsx          components/tooltip.tsx
components/separator.tsx         hooks/use-copy-to-clipboard.ts
                                 hooks/use-media-query.ts
```

MIT 要求版权声明随分发保留。**只要仓库内还有一行上游派生代码，
这两份文件就必须在仓库内。** 它们在最后一个此类文件被重写完成之前不可删。

已把副本备份到 `/Volumes/SUNSANG 1/Codex/qingye-provenance-freeze/repo-copies/`，
但**仓库内的原件保留**。

## 五、后果（如实记录）

| 项 | 状态 |
|---|---|
| `@qingye/ui` typecheck | **PASS**（0 错误） |
| `@qingye/ui` test | **PASS**（15 个文件、203 个测试；归档前 68 个文件、613 个测试） |
| `@qingye/ui` build | **PASS**（`dist/ui.css` 344KB → 83.1KB；catalog 11 个组件、0 个 pattern） |
| 审查入口 `apps/docs/review.html` | **PASS**（独立于站点外壳，只依赖保留组件；无控制台错误） |
| **`docs` typecheck / 站点外壳** | **FAIL**，用户已明确接受 |

**测试数下降不是弱化**：归档的测试是**被归档对象自己的**测试，随对象一起保存，原文未改。
其中 Pattern 层的契约断言从 `style-contract.test.ts` 逐字拆出为
`pattern-contract.test.ts`，Pattern 恢复时一并移回。

### 为 Pattern 缺席所做的生成器改动

`packages/ui/scripts/gen-catalog.mjs`：`apps/docs/src/patterns/metadata.ts` 不存在时
`patterns = []` 并跳过资源夹具；陈旧的 `ai/<version>/patterns/*.md` 与陈旧组件文档
按同一规则清理。Pattern 恢复后行为不变。

### STANDARDS.md 中清理的旧实现规则

shadcn 别名保留规则、装饰性内高光、`dark:bg-input/32`、以外部产品为依据的两处表述；
`opacity-64` 改标为「继承的预设，未经推导」。

## 六、未处置

- `apps/docs/src/pages/` 与 `src/components/` 下的站点骨架仍引用已归档组件
  （240 个类型错误）。彻底清理需要把它们改造成只服务 11 个组件，
  或一并归档。**本轮未做**，因为用户接受文档站暂不可用。
- `scripts/ai-eval/` 下的评估材料与 `docs/` 下的历史报告仍引用旧组件名。
  它们是历史记录，不属于实现污染，未动。

## Consequences

- 后续开发只面对 11 个组件，不再看到上游派生实现。
- 需要某个已归档组件时，按归档 README 恢复单个文件，或直接重写它。
- 每个组件重写完成后，**不再以归档版本为参考**——归档只作来源记录与失败对照。

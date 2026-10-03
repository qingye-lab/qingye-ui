# 第六批选择输入执行证据

2026-10-03。基线 HEAD `a94e8b4`。开工时存在来源/路线文档与视觉临时文件等未提交工作；未回退、删除、清理或覆盖它们。范围与值的定位见 [selection 决定](../decisions/2026-10-03-batch6-selection.md)。本批从零编写，未读取归档、冻结或上游 Coss 实现。

## 实际交付

- `packages/ui/src/components/{checkbox-group,toggle,toggle-group,segmented-control,slider}.tsx`：集合、pressed、单/多按压数组、radio 单值与有限区间值。每个原语公共出口、render/ref、ARIA 与事件仍可组合。
- 同名 `packages/ui/test/*.test.tsx`：5 个新文件、25 项行为检查。未修改既有断言或测试基础设施。Slider 的几何 mock 与 pointer capture stub 限定在该测试文件，用于 jsdom 公开原语行为，不是浏览器几何证据。
- 同名 `apps/docs/src/content/*/meta.ts` 与 11 个 demos：只含控件状态及简单组合；ToggleGroup 单选仍是数组且允许 `[]`，不以 string 或 Tabs 描述。CheckboxGroup 的 FieldItem 组合放在 Field 内。
- `apps/docs/src/pages/review/sections/72-batch6-selection.tsx`：id=`batch6-selection`，标题 `text-chapter`，子标题 `text-heading`；复用本批 demos，供主代理串行浏览器检查。
- `packages/ui/tokens/components.css`：只追加 `--qy-slider-track-size: 4px` 和 `--qy-slider-vertical-length: 10rem` 角色区块。Track/Indicator 与纵向 Control 实际消费；数值为预设，作用与修改入口已记录。未修改现有 token；最终已向主代理明确交回该共享文件所有权。
- 本批无新增内置 UI 文案，locale 请求为无。Slider 默认读屏值仅为格式化数值，避免 Base UI 范围默认值的英语 start/end range；区分名称由各 Thumb 的 aria-label/getAriaLabel 提供。

## 关键修正

Base UI 1.7 的 SliderThumb 未将通用 aria-readonly/aria-invalid 放到实际 range input。通过公开 render/useRender 递归原语 Fragment，为真实 input 添加只读及 Field invalid 事实，保留原语隐藏输入、inputRef、键盘事件、消费者 render 与 ref。未重写原语值状态。只读在 Root 取消变化，因此保留焦点、原值与表单序列化。

Slider 配置和显式值无效时抛 RangeError，不静默改写。max 必须对齐 min 起始步进，避免 End 端点、受控值与原生 range 正规化分离；该更严格接口是本批明确选择，metadata 与决定文件已记录。缺少 value/defaultValue 时从 min 开始。归档版本的视觉/API 不在本批兼容目标内；新外观为 bordered/solid 候选及无外围焦点圈，不作为无外观变化的 refactor 宣称。

## 实际观察的验证

| 检查 | 结果 | 边界 |
|---|---|---|
| 五组件定向 Vitest，第二轮 | 非 Slider 17 项 PASS；Slider 8 项当轮 FAIL | CheckboxGroup 首轮的 FieldItem 测试组合错误已修复；Slider 当时缺 jsdom 布局等待与 pointer capture，随后定位出真实 input ARIA 缺口 |
| ARIA 桥接后的 Slider 完整定向 Vitest | **PASS：8/8，0 未处理错误** | `/tmp/qingye-batch6-selection-slider.log`，23:03:42；键盘步进/端点、受控/取消、范围/最小间距/表单、只读键盘及 native change、禁用/Field关联、模拟轨道拖动与提交、无效参数、小数、render/ref/events |
| 五个源组件的定向 TypeScript 检查 | **PASS** | 只以五文件及其依赖为 program root；不是全库 typecheck；发生在最终 max/aria-valuetext 小修前 |
| 最终 max 对齐、默认/显式读屏值及 Thumb 自定义 render 小修 | **PASS：3 项，5 项 skipped** | 只选择 range keeps、invalid supplied、root and thumb 三项，23:09:37；未为补数字重复运行已通过的其余 5 项 |
| 最终 Slider 定向 TypeScript 检查 | **PASS** | `tsc --noEmit --jsx react-jsx --lib ES2022,DOM,DOM.Iterable --target ES2022 --module ESNext --moduleResolution Bundler --skipLibCheck --strict --exactOptionalPropertyTypes --noUncheckedIndexedAccess src/components/slider.tsx` |
| tracked token diff whitespace | **PASS** | `git diff --check`；未把该检查当作未跟踪新文件或行为验收 |
| 实际差异自审 | **PASS** | 五组件/公开类型、测试与文档、自定义渲染桥接、共享 token 局部新增、scope/ownership；未提交或发布 |

完整定向命令：`pnpm --filter @qingye/ui exec vitest run test/checkbox-group.test.tsx test/toggle.test.tsx test/toggle-group.test.tsx test/segmented-control.test.tsx test/slider.test.tsx`。最终状态不宣称“最后一次同一源码全 25 项运行”；上表保留不同阶段证据。

最终小修验证命令：

```sh
pnpm --filter @qingye/ui exec vitest run test/slider.test.tsx -t 'range keeps|invalid supplied|root and thumb' --reporter=dot
```

## 未运行与未验证

- **NOT_RUN**：gen:index、gen:catalog、capabilities/token ledger 生成、全库 test/typecheck、docs typecheck、构建、发布；由主代理统一处理。
- **NOT_RUN / UNVERIFIED**：真实浏览器拖动、只读指针拖动组合、纵向/RTL 浏览器键盘、浅深 computed 对比与焦点几何、窄屏/粗指针命中与相邻覆盖、强制颜色、实体辅助技术。jsdom 模拟拖动不证明浏览器或设备通过。
- 本子任务没有启动浏览器、服务器或 E2E runner，没有待清理的任务浏览器进程；审查页已提供真实可操作部位。
# 深色抓手实面收尾

主任务实际深色截图确认透明 `surface-inset` 令选中轨道穿过 SliderThumb。去掉 Thumb 的 dark 覆盖，浅深均使用已有 `bg-card → --qy-surface` 实面；semantic.css 的 dark surface 是不透明 background/white 混合。未改变 Track、层叠或 token，未重复行为测试。深色 computed/截图复测 **NOT_RUN（主任务拥有）**。

父任务实际复测回报 **PASS**：dark SliderThumb 为不透明 `color(srgb .105651 .105679 .105681)`。此为父任务浏览器观测，本子代理未启动或扩展浏览器验证。

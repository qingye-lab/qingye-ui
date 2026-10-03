# 分发与本地 CI 交付观察

此阶段准备 **@qingye/ui 1.0.0 未发布候选**，没有 tag、push、publish 或外部部署。工具包版本/API 未改，Studio 私有版本未改。中文与英文指南都已加入包的公开入口；实际生成由主代理统一执行。

## 实际修改与契约

- `scripts/fixtures/package-consumer/full.tsx` 改当前 InputGroup 三部分、显式 Button 动作、原生 Form/NativeSelect、手动 Tabs、Tree 当前稳定 id 参数、调用方 TanStack table、同源输入 Chart。Button 子路径小夹具本来已符合当前 API，保留。四种安装模式仍各自真实安装 tarball；Table/Chart peer 只由 full 显式安装。
- `scripts/verify-packed-consumers.mjs` 保留安装隔离、Registry TSX 类型、实际品牌/CSS 尺寸、Portal 名称/草稿/关闭焦点、字段关系 token、共同边框/非提交动作、原生 FormData/取消提交、手动页签和焦点项移除恢复。数值输入空值显式 unknown，0 与数值表/图同源；不再把翻转 loading 当请求完成。范围为浅深 1100 桌面，删除旧 coarse/mobile 仿真路径，未声称物理触屏已验证。
- 当前 `--patterns` 对应真实组件简单组合，保留正常/取消/禁用、200% font-size 与独立 text-spacing、2px 几何、可达操作和真实文字对比度；旧业务路径/假权限 DTO 不再作为门禁。历史非CI `--date-range-proof` 在取预览端口前明确拒绝并给出当前日期/组合入口；搜索未发现仍需迁移的当前调用方，旧脚本、能力清单历史项目与报告不删除。
- `browser-runtime.mjs` 仅保留 light/dark 两个 1100 桌面 variant。浏览器/预览进程的拥有、单会话、finally/信号与定向清理机制保留。测试审计的 2000px 真实失败、3px 越界、有限声明与 SVG/负边距规则保留，只迁移到桌面。
- foundation helpers 与 token recipes 对齐当前 demo/部位/角色，真实 adjunct 容量来自 Input grid/Select flex，不寻找已删除的 NativeSelect 自制图标/旧绝对按钮。控件 token、关系间距、圆角/焦点、品牌与危险色仍实际覆写与测量。全组件渲染扫描承担完整截图，foundation 不重复六组件默认截图。
- 纯静态读取确实发现当前 AST 算法对 CVA/useRender 动态控制尺寸、FieldGroup、caller Stack padding 等缺乏精确路径；不改算法、不伪造 matches。runtimeStatus 与 staticPathStatus 分开，未解析记录保持 UNVERIFIED；缺目标、无效覆写、陈旧 fingerprint、实际容量/对比失败仍为失败。主代理需在脚本冻结后统一生成当前静态事实再观察。
- Studio 只迁移真实公共 API/简单草稿、输入错误、选择与浮层组合，删除模拟保存故事。项目会话、nonce、主题 read/import/export/apply、冲突、延迟响应归属与报告逻辑保留。菜单使用其独立 public Portal/Positioner，Table 显式容器，Card 标题/内距由调用方组合。两 iframe 的主题与草稿不混。
- CI/Release 指向当前组合/Foundation/Studio 门禁，保留全库正常要求与实际 pack 消费。新增 Studio 精准用例单独调用现有 UI Vitest；未降低 AST 或 2px 门禁。UI 的标准 prepack build 保留为独立打包的 freshness 保障，没有为减少重复运行而关闭生命周期。

## 本代理实际运行

| 检查 | 最后结果 | 范围与限制 |
| --- | --- | --- |
| Studio preview 精准 Vitest | PASS，2 用例 | 主题更新保留草稿/选择/显式 invalid；inspect 捕获点击不改变状态，退出 inspect 恢复操作 |
| delivery-contracts Node test | PASS，3 用例 | 当前桌面选择、未知/旧 variant 拒绝、历史 proof 取端口前拒绝；没有启动浏览器或预览 |
| facts-ledger 断言脚本 | PASS | 已删除 Card/旧别名断言迁移；真实 FieldLabel 字号/leading 路径、合成 AST 正反例、invalid/stale/unknown/NOT_RUN 保留；临时 fixture 清理 |
| Studio 两源定点严格 TS | PASS | `main.tsx`/`preview.tsx`，不代表服务端或浏览器接受 |
| 两安装夹具定点严格 TS | PASS | 本地当前公共源码类型；不代替安装 tarball 的类型检查或可选 peer 隔离 |
| 14 个受影响脚本 Node syntax | PASS | 仅语法与实际 diff 自审 |
| CI/Release YAML 解析 | PASS | 本地 PyYAML，不代表 GitHub Actions 执行 |
| owning diff whitespace | PASS | 未覆盖或回退其他作者修改 |

首次精准检查发现的是测试 harness 的本地依赖解析缺口（脚本目录无 React 类型、Studio 测试目录无 Testing Library/Vitest）与已删除 CardContent 的旧事实断言，已分别用专用类型/测试入口解析和当前目录事实修复，末次结果如上。没有将这些初始失败称作公共组件失败。

## 主代理最后集成命令与冻结

组件源码、共享 CSS/token、locale、manifest，以及本阶段 scripts/Studio 源与测试已冻结。本代理不再主动扩测试。主代理统一执行：

1. 当前 `gen:index`/UI build 及全库必要 typecheck/test；在源码与脚本冻结后 `node scripts/gen-capabilities.mjs`、`node scripts/token-ledger.mjs` 一次。
2. `pnpm --filter docs build` 与 `pnpm studio:build`。
3. 唯一浏览器串行：`node scripts/run-browser-audit.mjs --report test-results/ci-audit/report.json`（83×2）；`--patterns`；`--foundations`；`node scripts/verify-studio.mjs`。主代理若已执行任何具体条目，以最后真实报告为准，不因清单重复已过精准检查。
4. 构建候选 UI/tooling tarball，再 `node scripts/verify-packed-consumers.mjs --tgz <UI candidate>` 与已有 `verify-packed-tooling.mjs <UI> <tooling>`。四安装模式与可选 peer 事实由实际 tarball 执行证明。
5. 本代理新增临时 `apps/docs/.__layer-probe.html/.tsx` 与 `.__chart-probe.html/.tsx` 由主代理最后定点清理；用户既有 `.__vc`、`.__visual-compare` 不属于本任务。

## NOT_RUN 与限制

本代理未运行全库 suite、构建、生成器、pack/install、浏览器、CI/Release 或外部发布。最后集成运行结果由主代理记录，脚本就绪不代表这些门禁通过。触屏/移动端、真实 IME/读屏输出、原生浏览器完整 200% 缩放仍不在本轮证明范围。静态动态消费缺口仍 UNVERIFIED；已明确的 1.0 公共 API/视觉破坏变化不通过旧兼容 alias 隐藏。

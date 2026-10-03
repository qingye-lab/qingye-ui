# 批次 3 · G：Textarea / Checkbox / Switch

2026-10-03。**本批实现与定向验收 PASS；整站外壳仍有已接受的类型失败，生成与构建由主任务统一处理。**

## 边界与来源

工作目录真实路径 `/Volumes/SUNSANG 1/Codex/qingye-ui`；HEAD `275d730`，前两提交 `b93bfe4`、`9d51f7a`。工作区已有大量未提交重写和并行改动，原样保留。只写用户分配的三个新组件、三个新测试、三个内容目录、`40-form-controls.tsx`、本批决策与报告；生成 index 仅执行指定的 gen:index，没有手改。未提交、checkout、stash、build、gen:catalog 或修改 catalog/ai/registry/dist、locale、来源清单与其他组件。

先写 [语义与关系决定](../decisions/2026-10-03-form-controls-rewrite.md)，再实现。读取当前 AGENTS、design、STANDARDS、基础层、逐值裁决、表单/选择器族、上一批三份报告，已重写 Input/Field 的完整实现、utils、token声明、文档类型及测试环境，安装版 Base UI 1.7.0 的公开类型。官方公共API用于原语判断，在线为1.8.0，以安装声明与运行检查为准。未读取归档组件源码、冻结来源、旧函数体或归档测试；没有把上游外观作为设计依据。

## 行为与视觉

- Textarea 用 Base UI Field.Control 的原生 textarea render 出口，保留 Field 标签、说明、错误、原生 rows/maxLength、受控与非受控、ref/render和事件。独立使用时的焦点状态从真实事件提供。读取真实 textarea.readOnly 显示已有 locale 文案，ref cleanup 保留；disabled 不冒充 readonly。聚焦只改变1px边框颜色。
- Checkbox 用 Base UI Root/Indicator；部分选中输出 mixed 与横杠，由应用计算集合事实。未选框只变边框色；已选/混合状态用填充内侧2px反色线。可取消变化，保留只读、禁用和表单提交。
- Switch 用 Base UI Root/Thumb；即时改变当前页面设置。两态均用实心轨道和内侧焦点线，圆形滑块是身份选择，轨道没有胶囊圆角。立即设置、待提交选择、持久化结果分别说明。
- 几何复用现有控件/文字/focus/radius角色，局部变量只接线。Textarea五档同名文字与padding-bordered；Checkbox/Switch以同名文字行高为默认可见高，命中另接touch-target。宽高、圆角、留边公式及选择/预设定位全部在决策中明示；未新增全局token。
- **视觉重新定义**：Textarea的新多行边界，Checkbox的方框/填充状态，Switch的方整轨道与圆形滑块，是本轮新基线；未读或对比旧外观，不声称具体历史数值差异，也未更新旧截图。
- 本批5个demo与审查段落均消费本库公共组件。审查页含真实备注、待提交通知集合、立即生效告警、应用判定的备用联系人错误、只读上一班记录及离线设备。计数只表达字符串长度，限制由maxLength执行；本页记录不冒充服务端保存。

## 首轮失败与处置

新测试第一轮30 PASS / 2 FAIL。Textarea静态隐藏的只读文案在非只读项也产生节点；修为只在真实readOnly时输出，不把getByText改为多元素查询。独立Field.Control的原语focused回调保持false；修为用实际focus/blur事件提供状态，保留caller-focused原断言。随后32/32通过；新增Field整体禁用和render-supplied readonly/ref cleanup后36/36通过。Checkbox/Switch首轮全部通过。未放宽、删改或跳过任何既有断言。

截图发现审查页与Textarea的只读demo把`\n`写在JSX字符串属性中，页面显示了字面反斜杠。改为JS表达式字符串后真实换行成立；浅深色重新截图，实际value含换行且不含字面`\n`。浏览器采集首轮console.log没有进入CLI返回结果，改return后重采同样断言；这是采集修正，没有放宽成功条件。

## 已观察验证

| 检查 | 结果 |
|---|---|
| `pnpm --filter @qingye/ui gen:index` | PASS，当前文件系统生成14组件出口；并行后可重新收敛 |
| 库 `typecheck` | PASS，0错误 |
| 三个控件定向测试 | PASS，Textarea15 / Checkbox11 / Switch10，共36条 |
| 加Field及AST conventions的相关测试 | PASS，最终5文件62条；没有放宽既有断言 |
| 三个内容目录及审查段落独立TS编译 | PASS，9文件，0diagnostics；日志`/tmp/qy-batch3-g/content-typecheck.json` |
| 整站docs typecheck | FAIL，158个错误；本批三个内容目录与审查段落0错误。整站外壳已接受的边界，不把整体记PASS |
| 真实桌面浏览器、浅深色、Tab与computed | PASS，1280×1100，16个真实Tab焦点样本，聚焦后等600ms，无几何变化或外围非零焦点线 |
| 5个demo的浅深色真实渲染与交互 | PASS，10组，无水平溢出，全部截图已目检 |
| 本范围diff whitespace | PASS，`git diff --check`未发现问题 |
| 全库完整suite | NOT_RUN，使用控件、Field和AST规范的相关62条检查，不把它当全库验收 |
| build、catalog/ai/registry同步、正式包消费、发布 | NOT_RUN，按范围由主任务统一处理 |
| 390px、物理移动设备、完整强制颜色/RTL/放大/辅助技术矩阵 | NOT_RUN，本批只做桌面；不能外推这些验收 |

测试覆盖标签激活、说明和错误关联、invalid只由调用方传入、required与native invalid不推断状态、受控/非受控、取消变化、Space/Tab/逆序Tab、indeterminate→全选、disabled/readOnly、真实FormData、Textarea原生reset、属性/事件/render/ref/style透传。库新文案仅复用readOnly，没有新增locale键。

静态与类型日志在`/tmp/qy-batch3-g/`，本批不在其他仓库目录增加证据文件。来源清单由主agent统一：若还存在，删除textarea、checkbox、switch对应的旧来源条目；未改coss-source.json或THIRD_PARTY_NOTICES.md，剩余派生文件的MIT分发义务仍有效。

## 桌面运行证据

入口`http://localhost:5180/review.html`，只测1280×1100。浅深色串行，每个目标用真实`page.keyboard.press("Tab")`抵达并等600ms。没有用脚本focus或强加候选焦点CSS。

| 部位 | 实测 |
|---|---|
| 普通、无效、只读Textarea与未选Checkbox | focus-visible=true，1px边框不加粗，只变色；box-shadow=none、outline=none |
| 已选/部分选中Checkbox、开/关Switch | focus-visible=true，可见shadow仅2px inset，outline=none；其余shadow层扩展均为0 |
| 焦点前后 | 16/16宽高不变；Textarea最小高72px、Checkbox20×20px、Switch40×20px |
| 圆角 | Textarea8px、Checkbox4px、Switch轨道5px，分别满足所选名义档约束；滑块14×14px，是圆形身份 |
| 实时设置 | Space关闭告警，当前页面状态立即更新，名称仍为启用告警，关态内线仍可见 |
| 草稿与错误恢复 | 备用备注填入11位号码后invalid清除；空交接提交产生就地错误，修正后内容保留；空渠道拒绝提交，选择邮件后父项恢复mixed |
| 应用提交 | 全部渠道选择先保留为草稿；点击保留/应用后本页记录才更新。未发生服务端请求，不称持久化成功 |
| 自动增高 | 两主题均由72px增长到192px（9行），内容与焦点不依赖动画完成 |
| 水平溢出 | 所测审查页与10组demo均为false |

普通文字、辅助文字、错误文字按4.5:1检查；必要边界/图形按3:1检查。canvas转换计算当前真实sRGB颜色，并沿实际祖先逐层合成透明表面，不直接用token字面色代替最终背景：

| 主题 | 普通文字最低 | 必要边界最低 | 实心前景/填充最低 |
|---|---|---|---|
| 浅色 | 5.94:1 | 3.52:1 | 14.50:1 |
| 深色 | 6.86:1 | 4.67:1 | 13.88:1 |

只对这些默认主题承载面作PASS，不外推任意品牌或图片背景，不声明AAA焦点面积达标。禁用控件不纳入必要边界对比。

角色实际转发也实测PASS：局部把已有`control-md-padding-bordered`从13改18px、`text-control-md-leading`从20改24px，Textarea真实padding为18px、line-height为24px、最小高由72变80px，Checkbox外高变24px，Switch变48×24px；移除局部覆盖后全部恢复默认值。两主题一致。没有写入token声明文件，也没有用该覆盖冒充默认值。

运行期pageerror/application console.error为0。首次加载有既有`/favicon.ico`404；另有React DevTools和已有密码演示不在form中的信息提示，未越界修复或宣称整会话所有日志为0。

数字证据：`/tmp/qy-batch3-g/browser.json`、`demos.json`、`followup.json`；截图为`review-{light,dark}.png`、16张`focus-*.png`、10张`demo-*.png`。审查页与全部demo截图已目检，焦点截图结合computed核对代表样本。

## 浏览器所有权与关闭

先等待其他任务`qy-batch3-d`、`qy-batch3-f`、`qy-batch3-e`串行结束。CLI显示无会话，相关Chrome/profile及daemon进程检查为空后才启动G；没有连接、关闭或抢占其他任务会话。

G会话`qy-batch3-g`：daemon96898（父1），Chrome96899（父96898），专用profile `/var/folders/jp/tkxkqws50fsdwv0bh7_9gg8w0000gn/T/playwright_chromiumdev_profile-irm9tl`。全程一会话、一页，复用既有Vite59950（父59927）。demo在同一页临时挂载真实源码，finally卸载并恢复审查页；没有另开浏览器或新建仓库入口。

已通过现有CLI执行close。随后按确认的PID树与profile核对，daemon、Chrome及子进程残留为0；CLI无浏览器，原有Vite仍在。初次残留查询误匹配了含查询脚本文本的shell命令；改为确认的PID及真实Chrome可执行路径后结果为0，没有执行任何终止命令。所有权记录在`processes-before.json`、`processes-after.json`。

未提交或发布；未读取归档组件源码，未更改生成副本或既有测试断言。

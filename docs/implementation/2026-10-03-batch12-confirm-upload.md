# 第十二批确认与文件执行证据

2026-10-04，基线a94e8b4。主任务批准最小公共API后实施；保留并行修改，只拥有两源码/测试、两metadata/四demos、review79、本批决定/记录与必要locale；family-action只同步本批确认与状态，family-date前批能力已同步。没有读归档/冻结/Coss/旧源码，没有改共享CSS/token/index/catalog/生成物，没有build/fulltest/browser/Git。

## 真实关系与出口

ConfirmAction以objectId/objectLabel/version/change/consequence全字段和confirmationText条件比较。打开捕获冻结副本，变化令旧认可失效，即使随后恢复旧内容仍须重新阅读；可见提示与动作更新副本并清旧输入。可选Field/Input确认文本保持可见标签与准确匹配。onConfirm只请求仍匹配当前事实的已读副本；事件取消/受控拒绝不宣布成功、Promise结束不改变状态、不自动关窗。应用给state/disabled，waiting/in-progress/unknown阻止重复动作；返回只关当前界面，AlertDialog承担真实模态与触发焦点，ButtonProtection保持后果在场。

FileUpload保留真实File引用、对象身份集合、公开chooser与drop、扩展名/MIME/字节/数量验证，报告实际首个type/size/count拒绝；拒绝/受控拒绝/cancel不进入提交值。最终chooser name/value/required在public render隔离，Field Label/error/disabled/ref/render仍连接一次；真实input.form的formdata事件append确认File，不删除同名其它合法字段。readonly保留提交，disabled/Field/原生fieldset禁用排除并禁止本地变化；显式外部form归属。reset默认动作未取消时非受控恢复初始defaultValue，受控继续归应用，chooser可重新选同File。无required虚承诺，必填按应用的当前集合校验。

聚焦行真实移除后回到相邻仍存移除按钮，空集合回chooser；受控拒绝保留原焦点，原焦点移到别处时不夺取。连续删除的焦点记录先清旧记录再允许新focus捕获，避免恢复后再丢失。上传状态、可见label、真实progress分母与恢复actions由应用提供；本地remove不代表取消后台上传。没有请求、服务、假进度或超时。

五档同名control/text与焦点读取当前Input/Button；层级消费AlertDialog共享入口；无新token或散落尺寸/paint/z-index。default multiple=true与列表/拖放布局是选择，原有颜色/轮廓/几何是预设。示例的3文件、64KiB是明确消费约束，修改demo的maxFiles/maxBytes；A.txt是本地构造的真实File，没有上传故事。新增locale两键confirmContentChanged/confirmReviewLatest；版本复用bulkVersion。

## 实际检查

两新文件首次 `pnpm --filter @qingye/ui exec vitest run test/confirm-action.test.tsx test/file-upload.test.tsx`：**8 PASS、6 FAIL（00:57:05）**。六失败是测试问题：Button busy/unknown使用可聚焦ARIA禁用，错误断言native disabled；FileUpload三状态each漏写参数。更正成实际ARIA+激活守卫断言与参数后只执行失败匹配：**6 PASS、8 SKIPPED（00:57:29）**。没有重复全14。

主任务要求的真实移除焦点缺口先补精准复现：`vitest run test/file-upload.test.tsx -t 'local remove/reselect|focused removal'` **2 FAIL、6 SKIPPED（01:06:21）**，确认为已卸载按钮落body；owning恢复后 **2 PASS、6 SKIPPED（01:07:10）**。扩充同一现有用例为连续相邻删除+受控拒绝+空集合，修复焦点记录清理顺序后仅该用例 **1 PASS、7 SKIPPED（01:08:22）**。当前总计15逻辑用例分批有证据，不宣称最终一遍全15。

关键覆盖：全部快照字段、旧值恢复仍失效、重新阅读清旧文本、仅请求/Promise不自称结果、confirm事件取消、受控open拒绝、原生ref/render、busy/unknown/disabled、返回焦点；真实拒绝/不提交、同名合法字段保留、受控拒绝/cancel、同File重新选择、移除/相邻焦点/空集合、原生reset/canceledreset、外部form、readonly/disabled/Fielddisabled与caller unknown/recovery不自动执行。

两源码 strict/exactOptionalPropertyTypes/noUncheckedIndexedAccess定点tsc：**PASS**。两metadata/四demos/review79继承docs配置，`pnpm --filter docs exec tsc -p /tmp/qingye-batch12-confirm-upload-docs-tsconfig.json`：**PASS（7个docs文件）**。后来仅确认标签非空约束、隔离chooser required和drag relatedTarget非Node防护，未重复既有行为；最终docs检查包含实际源码。

## 交接与未验证

本批主体15文件：2src、2test、2meta、4demos、2文档、review/sections/79-batch12-confirm-upload.tsx、locale.tsx/en-US.ts；另family-action本批事实同步，family-date前批当前契约同步。review id=batch12-confirm-upload，标题text-chapter/子标题text-heading，直接复用demos。locale准备交回主任务；共享token所有权已在先前批次交回，未再写。

formdata测试明确是jsdom公共事件桥接，它没有由FormData构造器自动派发原生事件；**本代理未执行真实new FormData构造，主任务随后Browser实测PASS，见下方独立证据层**。真实drop/readonly/disabled、确认模态/浮层浅深、文件原生入口五档computed、焦点可见/对比、窄屏/200%文字/粗指针/辅助技术：**UNVERIFIED**。gen/index/catalog/build/fulltests/browser/service/Git：**NOT_RUN（主任务统一）**。没有把手动事件或定点TS冒称真实浏览器验收。

## 主任务浏览器与入口表达收尾

主任务2026-10-04实测并目视浅深截图：旧确认A→版本+1后确认disabled；重新阅读清空A，再输入请求snapshot v2，界面不关闭、不推断成功；返回焦点回trigger。setInputFiles真实接受txt、拒绝bin；原生new FormData保留原同名string并追加实际File（accepted.txt，12字节），chooser无name；键盘移除末项焦点回chooser，同文件再选成功。浅深可用宽832/832，无pageerror，截图已查看。以上是主任务已观察的范围，未据此补全drop/readonly/disabled、窄屏、粗指针或辅助技术矩阵。

主任务指出chooser清空后的“未选择任何文件”与已接受列表冲突，批准最小表达：公共buttonVariants装饰aria-hidden span显示locale.chooseFiles；同一个实际Input透明覆盖入口，保留Field/ref/render/events/form，唯一键盘入口不变；Input已有边框承担盒内焦点。没有增加name/required/token/状态机，现有control内可用关系不让装饰span额外撑高。ConfirmAction当前快照demo外包Inline，保留trigger固有宽度。

仅精准选择入口/焦点回归：`vitest run test/file-upload.test.tsx -t 'controlled refusal|focused removal'` **2 PASS、6 SKIPPED（01:32:10）**，覆盖唯一可聚焦chooser、装饰无按钮角色、受控拒绝同File重选与连续移除焦点回退；定点docs tsc（含实际两源码、metadata/demos/review）**PASS**。新入口真实computed/截图由主任务接管，**UNVERIFIED**；不重复已通过表单矩阵。

主任务随后确认新入口真实Browser：Space打开原生filechooser，实际选择成功、焦点保留，FormData包含21字节实际File，外高32px；无导航或错误，**PASS**。这只关闭上述入口表达的实际运行缺口，不补未运行矩阵。

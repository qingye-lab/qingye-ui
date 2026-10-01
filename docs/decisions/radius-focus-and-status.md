# 圆角、焦点与状态文字角色

## Status

Applied；默认几何保持；危险实心按钮填充变深，以修正实测不达标的白字对比度。Live 全量单元 297/297、类型检查 PASS，结果存于任务 receipt，登记部位的最终浏览器验收通过。基线实测正常态 light 3.8075:1 / dark 3.5254:1；填充修复后 normal/hover/pressed 的真实合成文字对比度已由 A 测得 light 5.848–6.421:1、dark 6.421–7.295:1，全部达到4.5:1；最终实心边框对外围背景 light3.808:1、dark4.886:1，达到3:1。

## Context

根圆角原来只接管 md/lg；Button 的焦点环 2px/offset 1px 与输入类的 3px/offset 0px 直接写在类中。页面可读危险文字与危险填充上的文字使用场景不同，不能共用 destructive-foreground；原 fill 的白字不满足14px正文4.5:1。

## Evidence

基线 `components.css` 的 xs/sm/xl/2xl 独立，md=根−0.5px、lg=根。`button.tsx` 实心危险文字为 white，outline 为 `destructive-foreground`。输入焦点环的透明度为 ring/24，按钮焦点环为不透明 ring。A 的实际浏览器 affected-final.json 测得 destructive 正常态 white/红填充：light 3.8075、dark 3.5254，字号14px、字重500。填充改为 red-700 后 A 测得两主题全部 normal/hover/pressed 文字达到4.5:1，但深色实心外边框对 Card 外围 rgb(27 27 27) 只有2.683:1；因此只将边框恢复到原危险边界角色，填充与文字修复保持。

## Decision

圆角保持混合族：xs=4px、sm=6px、xl=10px、2xl=12px 和 full 独立；md=max(0,根−0.5px)、lg=根联动。新增 `--qy-radius-control` 默认接 lg、`--qy-radius-panel` 默认接 2xl；明确控制控件外层与 Card/Dialog/AlertDialog 面板外层。小号 Button 的 md 继续从根联动。内高光和 NumberField 边缘使用对应外层角色减 1px，并钳制到 0，避免锐角覆盖得到负半径。

`--qy-focus-button-width/offset` 默认接既有 `--qy-focus-ring-width/offset`（2px/1px）；输入类通过 `--qy-focus-input-width/offset`（3px/0px）独立控制。沿用已有 focus-visible/has-focus-visible/focus-within 条件、颜色和 invalid 状态。未新增鼠标 focus: 环。

`--qy-danger` 继续代表状态 mark/边界色，不全局改深；`--qy-danger-foreground` 继续代表页面上的可读危险文字。新增 `--qy-danger-fill` 表示实心危险动作填充，两个主题默认 red-700，Button 的 bg/hover/pressed 消费它；外边框继续消费 `--qy-danger`（`border-destructive`），保持与外围深色 surface 的可区分性；新增 `--qy-danger-on-fill` 代表危险实心底上的文字，Tailwind 名为 `text-destructive-on-fill`，由 Button 的实心文字及 loading Spinner 消费。outline 危险文字仍使用页面文字角色。warning/success/info 的文字角色不变。

## Alternatives

未把所有圆角等比例缩放：会让原有独立的卡片/徽章细节无端联动。未让按钮与输入共享宽度：二者已有不同焦点处理。未把危险实心白字直接改成 danger-foreground：那个值原本针对页面背景，不能用于实心危险底。

## Consequences

默认外层半径、焦点宽度/偏移不变。危险实心 Button 填充由 red-500（深色为其90%+white混色）改为 red-700，白字保持；hover/pressed继续同角色 /90。此为明确的可访问性视觉修复。实心边框保留原语义危险色，不随填充变深；页面状态 mark、outline危险文字、其它状态颜色不变。改变 control radius 不改变 panel radius，改变 input focus 不改变 button focus。根圆角仍不控制 xs/sm/xl/2xl。自动派生的根变量只在声明元素解析，首版项目入口设在 html。

保留组件自带例外：Accordion/Slider/Resizable/Calendar day 的既有 3px 环，以及 Steps 的 2px offset，不强制归入按钮/输入角色。没有原本 offset 的少量按钮类部位继续是 0；有 offset-1 的部位才消费 button-offset。此清单明确边界，不声称一颗 token 接管所有焦点参数。

品牌覆盖的行为有变化：仅覆盖 `--qy-danger` 现在影响状态标记和实心按钮边框；若项目同时需要自定义实心危险按钮底色，应覆盖 `--qy-danger-fill`，并用 `--qy-danger-on-fill` 配置其文字，重新测量 normal/hover/pressed 的实际对比度。这项迁移要求需要在交付说明中保留。

## Verification

边框分离前 Live 全量单元 297/297 与类型检查 PASS；真实 `cn` 的 radius role 与 `rounded-none`/任意值/variant 覆写回归测试通过。

浏览器需比较默认值与 token 注入值：Button/Input/Select 及 Card/Dialog 半径；键盘聚焦 Button/Input 后读取 box-shadow，单独修改 input width，确认 button 不变；light/dark 的危险 filled/outline 前景和背景分别记录。实心危险 normal/hover/pressed 必须基于真实 alpha 合成背景分别达到4.5:1，不用仅对token数学计算当作PASS。disabled/invalid 条件及键盘语义继续使用受影响单元测试验证。未运行检查写 NOT_RUN，CSS 编译不能代替实际焦点渲染。

最终实测 Button/Input 圆角8→根2→control3→control0px；Card保持12px，不随根2改变，panel角色改17px后也不随control0改变。键盘 focus-visible 为true，Input环3→6px而Button保持2px；随后Button环改5px而Input保持6px，Button原1px offset独立保留。危险填充文字六个 light/dark normal/hover/pressed组合最低5.848:1；outline文字最低5.558:1，页面危险文字也通过文字对比度要求。这里仅实心按钮边界单独验证3:1，不把所有outline边框宣称为3:1。

收据：`docs/baseline/task10-token-wiring/receipt.json`；边框分离检查见 `docs/baseline/task10-token-wiring/border-followup-receipt.json`；最终原始观测见 `test-results/ui-foundations-accepted/runtime.json`。

## Revisit

实测危险填充文字对比度不足 4.5:1 时，需要明确记录配色调整的视觉变化；新交互部位出现 raw focus geometry 时先判断它属于哪个角色，不能机械统一成 2px 或 3px。

# 焦点信号重推与圆角判据修正

日期：2026-10-03。HEAD：`275d730`；实际源码为开工时已有重写工作区加本次改动。基线67文件、603测试通过；完成后68文件、613测试通过。

## 实现关系与范围

依据 `design.md` 的相成相制、名实相符、视觉基调及作者本次裁决，焦点加强已有边界或填充。边界仍为1px，内侧增加1px描边，总厚度2px；无边界对象用2px贴边环。实心反色环向内覆盖原填充，透明入口按局部表面取色；全部offset为0。

基础层§4、§5、§15已修改，§11旧「焦点统一画环」引用同步。STANDARDS §4/§5及官网tokens页同步，build重生成公开规范副本。§5 G9包含项目局部承载面/边界声明、透明层合成及未知承载面的处理；Button同底色demo使用该公共组合。

相对开工快照修改44个组件文件。开工时 `qy-focus-*` 实际命中38个组件；Slider、Resizable及公开SegmentedControl没有该引用，却仍有弱环/外outline。Autocomplete、Skeleton、Stat的非控件圆角也须保留，不能只改命中清单。没有新增组件文件、公开props、locale key或内置文案。

已有未提交工作保留，upstream的已有删除状态未恢复。冻结目录、upstream现存文件及评估快照的164个开工文件哈希无变化。coss-source保留来源和upstream哈希，给28个实际修改的派生条目追加记录并刷新当前源码哈希。

## 逐组件决策

| 组件 | 改动 | 原因 |
|---|---|---|
| Accordion | 触发器局部贴边环 | 无独立可见边界，按低强调填充比较 |
| Autocomplete | 菜单角保留6px；Trigger补贴边信号 | inputInsidePopup的Trigger可接收键盘焦点；输入复用Input |
| Badge | 实心反色向内；outline/pending/unknown加强边界 | 按变体区分承担者，透明border不算可见边界 |
| Breadcrumb | 链接贴边环；圆角迁item6 | 保留行内几何，颜色按局部承载面 |
| Button | neutral/danger各配反色向内；quiet贴边；xs6/sm7 | 填充不同，反色分别配对；短边约束小档 |
| Calendar | 日期、翻页补信号；选中端点反色向内；下拉加强边界 | range-middle为软填充，选中端点为实心；翻页原无信号 |
| Card | border变色加内侧描边 | 可聚焦卡片已有对象边界，保留panel12 |
| Carousel | track与dot动作贴边 | 实际宿主透明，内部选中圆不代替宿主填充 |
| Chart | Recharts键盘surface信号投影到容器 | 无边界图形工作面，不夹入offset表面 |
| Checkbox | 填充移Root；加强外边界/内侧；marker4 | Indicator不盖信号；选中内侧对primary，外侧对承载面 |
| CodeBlock | pre的ring/50改不透明内侧贴边环 | pre无自身边界；内侧避免外层裁切 |
| Combobox | 编辑宿主加强边界；Trigger/Clear/Chip/Remove各自贴边 | 标签焦点不同时强调编辑框；去除鼠标也触发的focus-within |
| ContextMenu | Trigger/各类Item补信号；Popup加强边界 | 真实Item承担焦点，内侧避免列表裁切，行角保留6 |
| DataTable | 排序入口贴边，圆角7 | 28px高的无边界入口，7/28=25% |
| DatePicker | 清空入口贴边，xs圆角6 | 宿主复用Input/Button；24px清空入口取6 |
| Disclosure | 触发器贴边，plain圆角6 | 实测plain高24/28px，6px不越界 |
| Drawer | 菜单真实行Root补信号；删除Indicator旧环 | Indicator不可聚焦，行是唯一承担者；行角保留6 |
| FileUpload | dropzone加强边界；invalid使用不透明错误色 | 范围已有描边；上传/重试/删除继承Button |
| Input | 共同边界加粗；附属动作贴边；接xs/sm圆角 | hover不覆盖焦点/错误；md+保留项目control入口 |
| InputGroup | 编辑输入加强共同边界；附属动作各自贴边 | 不重复强调；xs/sm由子输入档位决定 |
| Item | default/muted贴边，outline加强边界 | 按变体实际边界决定承担者 |
| Menu | Trigger/各类Item补信号；Popup加强边界 | 键盘菜单项使用不透明信号，行角保留6 |
| Menubar | quiet触发器贴边，sm圆角7 | 透明border只占位，28px短边取7 |
| NativeSelect | 外框加强边界，sm圆角7 | 原生select保留焦点，包装层呈现范围 |
| NavigationMenu | 顶层trigger/面板link贴边 | 无边界入口按填充加强，目录链接角保留6 |
| NumberField | 编辑输入加强共同边界；增减按钮各自贴边 | 共同边界仅响应input:focus-visible |
| OTPField | 每个输入加强边界，删除旧halo padding | 内侧信号不需要整个容器预留外环空间 |
| Popover | Trigger/Close贴边，Popup加强边界 | 入口与临时对象边界分属不同承担者 |
| RadioGroup | 选中填充移Root；外/内边界分别比较 | Indicator只留圆点，不盖边界；保留圆形 |
| Resizable | 删除遗漏的3px/24%环；聚焦填充配反色 | 聚焦时已有bg-ring，两主题分别与该填充比较 |
| ScrollArea | viewport不透明贴边环 | 无边界工作面，保留滚动语义 |
| SegmentedControl | 未选中贴边；checked/current/pressed加强边界 | 公开共享类也漏出清单；sm内角按真实1px内缩取6 |
| Select | Trigger加强边界；真实Option补内侧环 | 键盘打开后焦点进入Option；菜单行角保留6 |
| Sidebar | quiet贴边；outline加强shadow边界；20px动作角4 | shadow承担已有边界；4/20=20% |
| Skeleton | 仅迁圆角角色到item6 | 占位内容不是xs/sm独立控件，保留原6 |
| Slider | Thumb加强边界；填充用card/dark surface-inset | 原深色白Thumb与浅色信号近同色；两主题接语义表面 |
| Stat | 仅趋势标记迁item6 | 标记身份独立于控件尺寸，保留原6 |
| Steps | 步骤宿主贴边，无offset | 内部状态圆不是可聚焦入口 |
| Switch | checked反色向内；unchecked配strong；invalid危险填充配反色 | 轨道合成色不同于primary；thumb位置保留开关状态 |
| Tabs | 默认选中项加强Indicator对应边界，其它及underline贴边 | 已选面已有边界；sm内角按List真实2px内缩取5 |
| TagInput | 编辑边界加粗；标签/删除各自贴边 | 标签焦点不重复强调输入；标签按item6 |
| Textarea | 编辑宿主加强边界，sm圆角7 | 保留原生编辑/只读语义，边框1px不变 |
| Toggle | default贴边，outline加强边界；sm7及内高光同步 | 区分透明border与可见border |
| Typography | TextLink及正文原生链接贴边 | 链接无可见边界，按局部承载面取色 |

## 圆角与非控件影响

| 独立控件档 | 桌面外高 | 圆角 | 占比 | 窄屏外高 | 占比 |
|---|---|---|---|---|---|
| xs | 24px | 6px | 25.00% | 28px | 21.43% |
| sm | 28px | 7px | 25.00% | 32px | 21.88% |
| md | 32px | 8px | 25.00% | 36px | 22.22% |
| lg | 36px | 8px | 22.22% | 40px | 20.00% |
| xl | 40px | 8px | 20.00% | 44px | 18.18% |

Button/Input五档两主题两视口的实际computed值均符合表格，`r/min(w,h) ≤25%`。小档取上限，大档保持8px；来源见基础层§4。md直接8px，lg仍读 `--qy-radius`，当前同值，没有内外偏移关系。

| 原场景 | 处理 | 外观影响 |
|---|---|---|
| Badge默认/lg、sm标记 | item6 / marker4 | 保留原6/4 |
| Autocomplete、Select、Combobox、Menu、ContextMenu、Drawer菜单项 | item6 | 保留原6 |
| NavigationMenu、Breadcrumb链接 | item6 | 保留原6 |
| Skeleton、Stat趋势标记 | item6 | 保留原6，均非独立控件 |
| Checkbox图形 | marker4 | 保留原4，16px短边下为25% |
| ComboboxChip、TagInputTag | 标签身份item6 | 原md−1px所得6.5px变6，不为hack新增token |
| ItemMedia小缩略图、FileUpload类型图块及其它未迁角色的rounded-md | 直接md8 | 原7.5px变8px，单列0.5px变化 |
| Tabs / Segmented内部选中项 | 按实际内缩换算 | sm分别5/6px，桌面实测外高26px |
| Sidebar两个20px图标入口 | marker4 | 原8变4，4/20=20% |
| Disclosure plain | xs6 | 原7.5变6，实测24/28px，占25%/21.43% |

marker/item已接theme及 `cn()` radius合并表；调用方rounded-none/xl/任意圆角可覆盖。Input md+继续读取项目control入口；浏览器注入现有marker4后，Input/Button实际均为4px。

其它可见变化：Slider深色Thumb由白色改语义内嵌面；Checkbox/Radio填充移Root；Switch invalid以危险填充表达错误，thumb保留状态；OTP删除每侧3px旧halo padding，自动包裹场景总占位可能减少6px。这是去除外环留白的布局变化，未声称无影响。

## 八条完成判据与实际输出

完整stdout见 [commands.txt](2026-10-03-focus-probes/commands.txt)；逐例computed值、色对、宽高、半径、进程见 [results.json](2026-10-03-focus-probes/results.json)。

### 1. 库类型检查：PASS，exit 0

```text
$ pnpm --filter @qingye/ui typecheck
> @qingye/ui@0.4.0 typecheck /Volumes/SUNSANG 1/Codex/qingye-ui/packages/ui
> tsc -p tsconfig.json --noEmit
```

无错误输出。

### 2. 库测试：PASS，613/613

```text
$ pnpm --filter @qingye/ui test
Test Files  68 passed (68)
     Tests  613 passed (613)
  Start at  15:56:48
  Duration  15.92s (transform 3.01s, setup 10.20s, import 32.54s, tests 55.39s, environment 31.85s)
```

基线603个测试全部保留。新增focus-contract 8例：AST残留检查、两主题色对与旧弱信号/未知承载面反例、五档调用方覆盖；radius-role-merging新增marker/item 2例，原3例保留。

已有断言仅改1条：Breadcrumb的宽度名从 `--qy-focus-button-width` 改为 `--qy-focus-ring-width`，原2px宽度与可聚焦/装饰性语义断言不变。旧组件名分类token被新承担者判据替换。没有删除测试或降低对比阈值。

新增AST测试首次运行时，目录URL非file，报 `TypeError: The URL must be of scheme file`，1 failed / 612 passed。改用node:path与__dirname读目录，断言不变；上面是修复后的完整重跑。这是本次新增测试的路径问题。

### 3. 文档类型检查：PASS，exit 0

```text
$ pnpm --filter docs typecheck
> docs@ typecheck /Volumes/SUNSANG 1/Codex/qingye-ui/apps/docs
> tsc --noEmit
```

无错误输出。

### 4. 库构建：PASS，exit 0

```text
$ pnpm --filter @qingye/ui build
> pnpm gen:catalog && tsc -p tsconfig.json && node scripts/build.mjs
catalog.json: 86 components; 6 patterns; AI and Registry generated
≈ tailwindcss v4.3.3
Done in 121ms
dist/ui.css 344.1 KB
```

86是当前生成清单数量，不把任务描述中的83当构建输出。

### 5. offset残留：PASS

```text
$ grep -ro 'ring-offset' packages/ui/src | wc -l
0
```

### 6. ring/24残留：PASS

```text
$ grep -ro 'ring-ring/24' packages/ui/src | wc -l
0
```

### 7. Playwright：PASS，180项

```text
$ node scripts/probe-focus.mjs --matrix docs/implementation/2026-10-03-focus-probes 6
focus-probe: {"PASS":180,"FAIL":0,"UNVERIFIED":0,"NOT_RUN":0}; errors=0; cleanup=PASS
```

单browser/context/tab串行浅深色×900/390px，deviceScaleFactor=6。使用构建的dist/ui.css，React组件通过docs源码alias消费；证明本次源码与预编译CSS组合，不等于发布包消费者或生产站验收。

| 主题 / 视口 | solid环合成色 / 填充 | 实测对比 | Input边界 / 相邻卡片 | 实测对比 | Button聚焦前→后 |
|---|---|---|---|---|---|
| light / 900 | #fafafa / #262626 | 14.498978:1 | #262626 / #ffffff | 15.133529:1 | 804×32→804×32px |
| dark / 900 | #262626 / #f5f5f5 | 13.881030:1 | #d4d4d4 / #1b1b1b | 11.620304:1 | 804×32→804×32px |
| light / 390 | #fafafa / #262626 | 14.498978:1 | #262626 / #ffffff | 15.133529:1 | 326×36→326×36px |
| dark / 390 | #262626 / #f5f5f5 | 13.881030:1 | #d4d4d4 / #1b1b1b | 11.620304:1 | 326×36→326×36px |

四组五档Button及全部测到的边界宿主聚焦前后宽高逐值相等，不用容差。180项含176项色对/几何、4项项目圆角入口转发。最低色对为深色unchecked Switch **3.996331:1**，实际轨道#7f7f7f、信号#ffffff。

附加实测：Input及invalid Input的hover边界不变；危险填充、checked/unchecked/invalid Switch、Checkbox/Radio选中边界、InputGroup、Textarea、NativeSelect、Select触发与真实Option、Slider、outline Toggle/Badge、Menu+solid Button、Tabs选中/未选中/underline、公开Segmented组合、同色承载面补边界均通过。

浏览器把computed颜色经canvas解析为sRGB，并按实际祖先背景合成；不会假设相邻面为页面。图片、渐变、未知底面或组opacity会返回UNVERIFIED并令脚本失败。

6x截图中线的实际像素读数，每6像素=1 CSS px：

```text
light-desktop-solid-md: #fafafa 2.000000px | #262626 14.000000px
light-desktop-input-md: #262626 2.000000px | #ffffff 12.000000px
dark-desktop-solid-md:  #262626 2.000000px | #f5f5f5 14.000000px
dark-desktop-input-md:  #d4d4d4 2.000000px | #242424 12.000000px
```

信号与填充直接相接，无offset缝。Input比较外侧卡片；深色内填充#242424与外卡片#1b1b1b分别记录。浅深色solid/Input截图已目视检查；12张截图保存在探针目录。

最后一轮Node PID52045、browser PID52062，子进程52069/52071/52089。context/browser/server在finally关闭，remainingPids=[]，结束后ps复核均退出。任务前已有docs Vite PID59950保持运行。

### 8. 事实目录与台账：执行PASS，旧观察仍NOT_RUN

```text
$ node scripts/gen-capabilities.mjs
current-capabilities: 86 components, 347 tokens; 629b3c66ae76010553767a6cec078be493d01025f881c5ba7420f26328fc5065
$ node scripts/token-ledger.mjs
token-ledger: 7721 static paths; {"PASS":0,"FAIL":0,"UNVERIFIED":0,"NOT_RUN":78}; stale=true
```

两命令exit 0。7721条是静态路径；旧78项注入探针因指纹变化为NOT_RUN，stale=true。新焦点computed证据独立在results.json，没有伪装成旧台账注入矩阵的PASS。

## 发现但任务未列出的问题

1. **白反色环在白面外不可辨。** 环/填充达3:1仍不足以保证焦点前后有可见变化。实心改向内贴边，截图实际量到2px覆盖原填充。
2. **清单漏出Slider、Resizable、公开分段类。** 已按真实承担者接线，旧搜索归零；Resizable色对有单元覆盖，拖动中的聚焦视觉NOT_RUN。
3. **Indicator覆盖边界或不可聚焦。** Checkbox/Radio填充移Root；Drawer信号放真实行，不给Indicator第二处强调。
4. **Input hover优先级高于聚焦边界。** hover排除focus-visible/invalid；有效和无效输入两主题实测边界不变。
5. **Select Option持有真实DOM焦点。** Trigger不能代替它，Option已补信号；未把这一写法机械套到aria-activedescendant输入模式。
6. **编辑框与子动作会重复强调。** NumberField、TagInput、ComboboxChips限定共同边界只响应编辑输入，标签/附属动作各自承担。
7. **Switch轨道不是primary。** 半透明轨道需独立配色；删除invalid弱环时保留错误事实，危险填充配反色，thumb位置不丢失。
8. **Tabs已有选中边界。** 默认选中项与公开Segmented类加强原边界；fixture分别实测，不把源码引用当运行时接通。
9. **Input全档绑md会绕开项目control入口。** xs/sm只在必要时重绑，md+继承control；4px注入实际在Input/Button生效。
10. **小图标与非控件不能机械换档。** Sidebar20px入口用xs6仍占30%，改marker4；徽章/菜单/占位保留4/6，Chip旧6.5不追认为新token。
11. **原探针只截图且缺少finally。** 现保留位置参数接口，加入颜色/几何矩阵、失败状态、进程记录与finally关闭。
12. **官网token说明仍引用旧入口与md偏移。** 已同步为当前承担者、圆角角色及主题入口；没有保留会失效的input-width/offset示例。

## 未验证部分

- **UNVERIFIED**：静态对比诊断两主题各869个动态/继承源码上下文；190个默认库色对通过不等于全部源码上下文通过。本次180项仅覆盖列出的fixture状态。
- **UNVERIFIED**：CommandInput既有className仍试图控制Input边界，而Input已有独立controlClassName入口；旧has-focus-visible:ring-0不等于抑制新inset。这是任务前组合缺口，未改Command、未作运行时结论。
- **NOT_RUN**：全组件全交互矩阵、Calendar日期/范围全状态、Drawer各菜单状态、Sidebar outline真实hover组合、Autocomplete inputInsidePopup端到端开关、Resizable真实拖动、Badge全部色调、OTP窄屏滚动、真实触摸、Firefox/WebKit、forced-colors。均不计入180项通过。
- **NOT_RUN**：生产发布与发布包消费者验证；build和docs源码消费证据分别记录。
- **UNVERIFIED**：任意品牌、图片/渐变承载面和调用方自定义填充。调用方按§5声明实际面，同步焦点色，再测真实合成。

`git diff --check`无输出，exit 0。保护范围哈希无变化；视觉变化、OTP留白变化及未测状态均单列。

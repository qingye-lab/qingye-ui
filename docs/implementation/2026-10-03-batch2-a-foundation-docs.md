# Batch 2 A：基础层文档逐值裁决报告

## 范围与基线

完成日期：2026-10-03。工作区实路径 `/Volumes/SUNSANG 1/Codex/qingye-ui`。本任务只写入以下七份 Markdown：

- docs/decisions/2026-10-03-foundation.md
- docs/decisions/2026-10-03-family-action.md
- docs/decisions/2026-10-03-family-form.md
- docs/decisions/2026-10-03-family-display.md
- docs/decisions/2026-10-03-family-overlay.md
- STANDARDS.md
- 本报告

开工运行 `pwd -P`、`git log --oneline -3`、`git status --short`。实路径如上；log 原始输出：

```text
275d730 chore: release Qingye UI v0.4.0
b93bfe4 feat: apply design guidance across components and docs
9d51f7a fix: await browser descendant exit before cleanup verdict
```

status 为非干净：已有大量修改、删除、未跟踪文件，含这次被授权的文档与并行代码。保留既有工作，只按本任务边界编辑；没有提交、回退或清理工作区。七份文档的改写不代表此次更改了任何视觉值。

已读 AGENTS.md、根 design.md、逐值裁决与归档决定。没有读取仓库外归档组件源码或 provenance freeze。当前实现核对覆盖三个 token CSS、theme.css、styles.css、utilities.css，并为动效来源补读 motion.css。

## 逐文件核对的实现事实

| 当前源文件 | 核对结果 |
|---|---|
| button.tsx | solid/bordered/quiet 三档、独立 tone 与 size、同名五档文字、状态联合；quiet 自盒内 1px，solid 2px；后果关联新契约由 B 负责 |
| input.tsx | 共同外框只变色，invalid 聚焦保留危险文字色；五档同名文字；搜索/密码附属按钮当前为 2px 自盒内线 |
| card.tsx | 无默认 padding/标题槽，默认仍有线、面、shadow-panel；真实焦点入口只变边框色 |
| popover.tsx | 固定非阻断，面板 focus-visible 只变边框色；裸入口命中层依赖自建定位的 touch-target；z-50 为预设 |
| field.tsx | 现有 vertical/horizontal、FieldTitle、说明/错误出口；仍有空间阶梯与局部动效，未宣称全部已重写 |
| fieldset.tsx | 分组关系仍读空间阶梯，legend 两种 variant 当前读同一文字档 |
| separator.tsx | 1px 分节线与原语方向；保留实现，不拿旧行数替代现状 |
| toast.tsx | loading 默认 30000ms 后持续 unknown，仍有局部堆叠/阴影/高光/动效预设；Toast 已有 anchored 能力 |
| tooltip.tsx | 入退由 motion.css 接管，但局部阴影/高光仍保留，z-50 是预设 |
| theme-provider.tsx | 明暗轴写 class 或 data-theme，system 由环境解析；不写品牌轴 |
| motion-provider.tsx | 文档根记录键盘/指针方式，清理监听与恢复原标记 |

上述是源码核对。Popover 打开后面板获得焦点来自用户给定事实及逐值裁决的独立审查，**本任务未重新浏览器实测**。末次源码核对已看到 B 在 Button 中接入挂载后 DOM 说明检查、production 分支与排除内部状态说明；仍不据此把 B 的运行验收记为 PASS。

当前浅色输入/neutral bordered 边框为黑色 alpha 50%，深色源码为白色 alpha 44%。文档同时记录用户选定的输入线强度和真实明暗绑定，未擅自改 token。

## 基础层逐节改写

| 节 | 改写内容与定位变化 |
|---|---|
| 1 留白 | 列当前 10/12/14/16/16px；40–44% 降为预设，删除外高一半的唯一硬约束。容量看真实宽度与内容，边框扣除仅是对齐换算 |
| 2 尺寸 | 尺寸与强调独立可选，允许有任务理由的尺寸表达。列五档同名文字、桌面 4/5/6/6/7px 余量及 lg/xl 借低一档文字的教训；外高/+4px 是预设 |
| 3 间距 | 补当前数值、compact/窄屏差别与未消费角色。动作间距不冒充动作组到字段的距离，允许角色碰巧同值 |
| 4 圆角 | r≤名义外高25% 为选定约束，6/7/8 为选择；同心限于同一轮廓等距内缩，负值退化，独立子对象不适用 |
| 5 边界 | 必要识别机制须存在，描边可选；写用户同底色才保留边框及 bordered 来由。去掉虚构 G9 接线示例，协议未定记 UNVERIFIED |
| 6 表面 | 写 Card 当前线+面+默认阴影，独立阴影用途未证。列当前五类阴影的浅深参数，均为预设，指出保留 Tooltip/Toast 差异 |
| 7 颜色 | 语义与具体配色分开；删除「每种语义只能有一个角色 token」的绝对化，弱文字仍需普通文字对比。primary 不限于主动作 |
| 8 文字 | 写当前内容档字号/行高/字重与五档控件文字；字距、窄屏增字是预设。去掉已不存在的 typography 组件与旧文字副本待办 |
| 9 状态 | boolean loading 不违反事实归属；当前联合状态是接口选择。补当前 Button 与 Toast 的事实边界 |
| 10 强调 | 三档按范围机制分工，solid 可承载有任务理由的保护入口；不固定外观与重要性关系 |
| 11 反馈 | opacity-64、/90、按压 .97 均标预设，透明度不代替真实禁用；命中层与可见几何分开 |
| 12 动效 | 时长、曲线与 .98/opacity(0) 标预设；写当前 Popover/Tooltip 所有权，保留 Toast 局部策略不冒充已收敛 |
| 13 三轴 | 写实际 ThemeProvider 与 compact 边界，区分控件 640px 与根布局 ≤767px；Portal 按真实祖先核对 |
| 14 方向 | 截断/换行是任务选择，删除单行必截断；补当前标签换行与语言策略 |
| 15 焦点 | 全节按当前部位重写，每个值逐行定性；边框只变色，solid 2px、quiet 1px。区分 AA 可见/相邻色对比与 AAA 面积；列系统回退、自建命中定位与待验矩阵 |
| 16 对比 | 普通文字含辅助文字 4.5:1、必要非文本相邻色3:1，合成后测；装饰线不自动等同必要边界 |
| 17 容量 | 空/零/未知/不适用分别表达，容量由真实内容决定；截断不藏唯一后果 |
| 18 组合 | 同心范围与独立子对象对齐；危险后果在场、可见且可关联。写 ButtonProtection/外部非空说明任一合法，以及仅开发缺失抛错 |

现有 token 处置、Alternatives、Consequences 同步去除旧组件数、旧副本待迁移、旧行号和旧强制布尔规则；未消费和未验证分别写明，不将历史计划充作当前实现。

## 从推导降为选择或预设的值

| 项 | 本次真实定位 |
|---|---|
| 水平留白比例与10/12/14/16/16px | 预设；没有外高比例唯一解 |
| 外高24/28/32/36/40px、窄屏+4px | 继承/项目预设 |
| 五档同名文字配对 | 选择；具体字号/行高/字重为预设，垂直余量才是换算结果 |
| 圆角6/7/8px、面板/浮层12px | 约束内选择，取上限并非唯一解 |
| 固定描边机制与三档按钮 | 选择；必要识别是约束 |
| 2px solid内线、1px quiet内线 | 选择；AA不强制2px |
| 系统回退2px、默认向内2px、系统色 | 选择；当前层序必须覆盖utilities才恢复信号属于推导 |
| 44px命中目标、居中扩展机制 | 库内选择；命中须归属控件，自建定位修复视口误命中 |
| opacity-64、/90、z-50、入场.98/opacity(0) | 继承预设 |
| 五类阴影参数、时长与曲线 | 预设；Card阴影独立用途另记UNVERIFIED |
| 字距、窄屏增字、单行截断默认 | 预设或情境选择，不作为理念硬禁令 |
| Button状态联合 | 接口选择；应用传入boolean也能持有事实 |
| 危险后果可见且可关联 | 约束；专用包装仅为合法实现之一 |

## 四份族文档与 STANDARDS

| 文件 | 同步内容 |
|---|---|
| family-action | 重写 Button 当前三档、bordered 来由与实际深浅绑定；加入两种后果关联示例和仅开发诊断；删除禁止boolean、solid只许主动作及旧变体描述 |
| family-form | 写 Input 当前搜索/密码入口、五档文字、外层焦点只变色；附属按钮另读2px。修正动作间距和同心范围；归档目标不写成已导出 |
| family-display | 写 Card 当前面、线、默认阴影；独立阴影用途未证UNVERIFIED，参数为预设；可聚焦Card只变色，独立子按钮不套同心 |
| family-overlay | 写 Popup 实际获得焦点及只变色；裸入口自建命中定位；z-50和.98标预设。非阻断外观不误判为阻断，后果契约同步 |
| STANDARDS 0–1 | 分清硬要求、选择、预设、保留源码差异；API事实归属与新后果契约对齐 |
| STANDARDS 2–4 | 五档文字与余量，真实水平留白、三档边界、实际圆角角色和同心范围 |
| STANDARDS 5–8 | 焦点逐部位与系统回退，继承透明度/动效预设，当前排版值与WCAG级别 |
| STANDARDS 9–11 | 国际化入口、三轴、Portal和来源；验收按事实层报告，生成副本留待统一重建 |

## 自检：命令与真实输出

以下最终文档自检覆盖七份文件。rg 是本轮要求的 grep 校验；仅验证文档 token 定义存在，不将源码引用数当作运行时生效。

### Token 定义存在

```bash
python3 - <<'PY'
from pathlib import Path
import re, subprocess
paths = ['docs/decisions/2026-10-03-foundation.md',
         *[f'docs/decisions/2026-10-03-family-{s}.md'
           for s in ['action','form','display','overlay']],
         'STANDARDS.md',
         'docs/implementation/2026-10-03-batch2-a-foundation-docs.md']
def_paths = sorted(str(p) for p in Path('packages/ui/tokens').glob('*.css')) + ['packages/ui/theme.css']
refs = subprocess.run(['rg','--no-filename','-o','--',r'--qy-[a-z0-9-]+',*paths], capture_output=True,text=True,check=True)
defs = subprocess.run(['rg','--no-filename','-o','--',r'^\s*--qy-[a-z0-9-]+\s*:',*def_paths], capture_output=True,text=True,check=True)
ref_names = set(refs.stdout.split())
def_names = set(re.findall(r'--qy-[a-z0-9-]+', defs.stdout))
missing = sorted(ref_names-def_names)
print(f'rg token declarations: {len(def_names)}')
print(f'rg document token names: {len(ref_names)}')
print(f'undefined document tokens: {len(missing)}')
for name in missing: print(name)
print('PASS' if not missing else 'FAIL')
raise SystemExit(bool(missing))
PY
```

```text
rg token declarations: 357
rg document token names: 102
undefined document tokens: 0
PASS
```

### 节号、文件链接与表格

```bash
python3 - <<'PY'
from pathlib import Path
import re
paths = [Path('docs/decisions/2026-10-03-foundation.md'),
         *[Path(f'docs/decisions/2026-10-03-family-{s}.md')
           for s in ['action','form','display','overlay']],
         Path('STANDARDS.md'),
         Path('docs/implementation/2026-10-03-batch2-a-foundation-docs.md')]
sections = set(map(int,re.findall(r'^## (\d+)\.', paths[0].read_text(), re.M)))
errors=[]
ref_count=link_count=0
for path in paths:
    lines=path.read_text().splitlines()
    text='\n'.join(lines)
    refs=re.findall(r'§(\d+)',text)
    ref_count+=len(refs)
    for ref in refs:
        if int(ref) not in sections: errors.append(f'{path}: missing foundation section {ref}')
    for link in re.findall(r'\]\(([^)]+)\)',text):
        if link.startswith(('https://','http://','#')): continue
        link_count+=1
        if not (path.parent/link.split('#')[0]).exists(): errors.append(f'{path}: missing local link {link}')
    for index,line in enumerate(lines):
        if line.startswith('|') and index and lines[index-1].startswith('|'):
            cells=len(re.split(r'(?<!\\)\|',line))-2
            previous=len(re.split(r'(?<!\\)\|',lines[index-1]))-2
            if cells!=previous: errors.append(f'{path}:{index+1}: table cells {cells} vs {previous}')
print('foundation sections: '+','.join(map(str,sorted(sections))))
print(f'numeric section references: {ref_count}')
print(f'local links checked: {link_count}')
for error in errors: print(error)
print('PASS' if not errors else 'FAIL')
raise SystemExit(bool(errors))
PY
```

```text
foundation sections: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18
numeric section references: 81
local links checked: 24
PASS
```

### 已删除名称与变体

本校验检查删除 token、旧按钮变体和旧焦点间隔用法，保留强制颜色所需的 CSS outline 属性。首轮检查把表格中该属性误当按钮变体，得到1条误报、FAIL；随后只修正临时检查的匹配条件，未改任何仓库测试或断言。

```bash
python3 - <<'PY'
import subprocess
paths=['docs/decisions/2026-10-03-foundation.md',
       *[f'docs/decisions/2026-10-03-family-{s}.md'
         for s in ['action','form','display','overlay']],
       'STANDARDS.md',
       'docs/implementation/2026-10-03-batch2-a-foundation-docs.md']
prefix=chr(45)*2+'qy-'
parts=[prefix+'focus-boundary-'+'inset',prefix+'button-'+'outline-',
       'ring-'+'offset',r'variant=["\x27]'+'outline'+r'["\x27]',
       r'`'+'outline'+r'`\s*变体',r'(outline|destructive-outline)\s*变体']
result=subprocess.run(['rg','-n','--','|'.join(parts),*paths],capture_output=True,text=True)
print(result.stdout,end='')
print(f'deleted-name matches: {len(result.stdout.splitlines())}')
print('PASS' if result.returncode==1 else 'FAIL')
raise SystemExit(0 if result.returncode==1 else 1)
PY
```

```text
deleted-name matches: 0
PASS
```

### 空白检查

```bash
git diff --check -- STANDARDS.md docs/decisions/2026-10-03-foundation.md docs/decisions/2026-10-03-family-action.md docs/decisions/2026-10-03-family-form.md docs/decisions/2026-10-03-family-display.md docs/decisions/2026-10-03-family-overlay.md docs/implementation/2026-10-03-batch2-a-foundation-docs.md
```

输出为空，exit 0，PASS。未跟踪文档另由上面的全文件检查覆盖，git diff 本身不检查其历史差异。

## 验证边界

| 项 | 状态 | 证据或原因 |
|---|---|---|
| 11个当前组件与基础CSS逐节核对 | PASS | 只读当前源码，已将现值、未消费入口与保留实现差异写入文档 |
| token存在、节号落点、链接/表格、删除名称校验 | PASS | 上述真实输出；仅静态文档检查 |
| WCAG要求级别核对 | PASS | 读取W3C官方2.4.7、1.4.11、2.4.13、2.5.8说明；链接写入基础层 |
| 本轮浏览器/Tab/computed/对比度实测 | NOT_RUN | 只改文档，未启动浏览器；Popover焦点引用既有审查事实，不冒充本轮实测 |
| Card阴影独立用途 | UNVERIFIED | 尚无有/无阴影真实组合比较 |
| 完整强制颜色组合矩阵、G9项目声明协议 | UNVERIFIED | 已有三入口观察不足以证明完整矩阵；G9具体协议未定 |
| B的新ButtonProtection运行验收 | NOT_RUN | 本轮仅写契约；末次看到源码接线，不替代B的测试/浏览器证据 |
| typecheck、测试、build、生成投影 | NOT_RUN | 无代码改动；统一重建由主任务在并行结束后执行 |
| 修改既有断言 | NOT_RUN | 没有修改测试或断言；唯一修正的是本报告临时grep误报条件 |

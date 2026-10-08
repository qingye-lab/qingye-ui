# npm 命名空间选择

状态：用户已接受，2026-10-08。

## Context

组件库此前以 `@qingye/ui` 通过 GitHub tarball 分发；1.0.0 正准备首次 npm 公开发布。

## Evidence

当前 npm 账号为 `qingye_lab`；`npm org ls qingye qingye_lab --json` 返回空成员结果。用户明确选择改为账号自己的 `@qingye_lab/ui`，并要求同步包名和导入路径。

## Decision

1.0.0 的公开包名、当前导入路径、工作区依赖、指南、生成器、消费检查和发布文件名统一为 `@qingye_lab/ui`。Qingye 品牌、CSS token、组件 API、GitHub 仓库及文档域名保持原有身份。

Tooling 的当前配置与初始化协议同步到新包名，版本由 0.4.0 调整为 0.5.0；私有 Studio 版本仍为 0.4.0。本任务发布 UI，不发布 tooling。

## Alternatives considered

保留 `@qingye/ui` 并改用有权限的账号；用户未选择该方案。

## Consequences

新消费项目使用新包名。既有 GitHub 版本、历史指南、冻结评估、基线及执行证据保留原有身份；已有旧包消费者继续使用其匹配的旧版本。本仓库不改写其他项目的依赖或指导文件，不新增没有实际消费者需求的兼容别名。

## Verification

按新名称重新生成公共资料，检查类型、测试、构建、实际 tarball 四种消费方式和 Studio；发布后必须核对 registry 版本、文件校验与匿名安装。未发布前不把准备结果标为 npm 发布成功。

## Revisit when

未来获得其他命名空间权限或更换发布身份时，重新核对真实消费者及 package/导入/工具配置边界，不能仅修改清单。

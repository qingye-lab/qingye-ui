# 第十二批确认与文件关系

2026-10-04，基线a94e8b4。按design.md、STANDARDS、基础层与当前AlertDialog/ButtonProtection/Input/Field公共组合从零建立。主任务已审核最小API；不读取归档/冻结/Coss/旧实现，不改共享CSS或新增机械token。

- ConfirmAction确认的是objectId/objectLabel/version/change/consequence组成的具体快照。打开捕获不可变副本，当前任一字段变化使已读快照失效；可见变更提示与重新阅读动作更新快照并清除旧确认文字。确认只请求onConfirm(snapshot,event)，不发送请求、不等待Promise推断成功、不自动关闭。应用提供state与disabled；waiting/in-progress/unknown阻止重复动作，返回只是关闭本界面。可选confirmationText来自应用，与Field/Input组成真实确认输入。AlertDialog承担模态/返回焦点，ButtonProtection保持可见后果。
- FileUpload负责本地File集合、原生选择与拖放；文件保持原引用，集合用对象身份，不用同名/同大小推断相同内容。accept/maxSize/maxFiles是应用约束，验证返回实际type/size/count原因，拒绝文件不进入集合。受控回调可拒绝，取消不改变已接受集合；clear chooser让重新选择同文件仍触发入口。上传状态、真实进度分母、失败/未知与恢复动作来自应用，不运行服务、计时器或假上传。
- File chooser是临时选择出口，最终native name隔离；Field公开注册保留Label/error/disabled，最终名称经公共render读取。formdata事件append已接受File，不删除/覆盖同名其它合法字段；读取真实form归属与disabled，readOnly保留提交。原生reset未取消时恢复非受控defaultValue，受控值继续归应用；不声称chooser清空后仍有原生required校验，不暴露required。

控件五档与同名文字、盒内焦点、后果/错误/上传进度表达消费现有公共组件。文件集合/快照比较、验证与容量换算属于真实数据关系；默认multiple与布局是选择；现有颜色/圆角/几何是主题预设。无额外尺寸/色彩/z-index。jsdom只验证formdata公共事件桥接，真实new FormData与浮层浅深由主任务浏览器验证。

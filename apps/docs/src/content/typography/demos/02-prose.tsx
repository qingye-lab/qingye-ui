import { CodeBlock, Prose } from "@yanqing/ui";

export const meta = { title: "长文 Prose", description: "段落、列表、链接、引用、行内代码、表格、分隔线；内部的组件保持自身样式。" };

export default function Demo() {
  return (
    <Prose className="w-full max-w-2xl">
      <h1>门店设备接入指南</h1>
      <p>
        新门店开业前，需要把收银机、厨房打印机和自助点餐屏接入管理后台。接入完成后，设备状态、订单与告警会实时同步，运营人员可以在
        <a href="#devices">设备列表</a>中远程查看和重启。
      </p>
      <h2>准备工作</h2>
      <ul>
        <li>确认门店网络可以访问 <code>api.yanqing.cn</code> 的 443 端口。</li>
        <li>
          在后台创建门店并记下门店编号，例如 <code>XH-001</code>。
        </li>
        <li>
          每台设备准备好序列号，通常贴在机身底部。
          <ul>
            <li>收银机：以 T2S 开头</li>
            <li>打印机：以 GP 开头</li>
          </ul>
        </li>
      </ul>
      <h2>接入步骤</h2>
      <ol>
        <li>设备开机后进入「设置 → 管理平台」，填写门店编号。</li>
        <li>在后台点击「添加设备」，输入序列号完成绑定。</li>
        <li>
          绑定后约 <strong>30 秒</strong> 内状态变为「在线」。
        </li>
      </ol>
      <CodeBlock code={`curl -s https://api.yanqing.cn/v2/stores/XH-001/devices \\\n  -H "Authorization: Bearer $TOKEN"`} filename="查询设备" />
      <blockquote>
        <p>如果 5 分钟后仍显示离线，请先检查门店路由器是否拦截了出站连接，再联系技术支持。</p>
      </blockquote>
      <h3>常见设备型号</h3>
      <table>
        <thead>
          <tr>
            <th>类型</th>
            <th>型号</th>
            <th>接入方式</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>收银机</td>
            <td>SUNMI T2s</td>
            <td>后台绑定序列号</td>
          </tr>
          <tr>
            <td>厨房打印机</td>
            <td>佳博 GP-L80</td>
            <td>通过收银机局域网发现</td>
          </tr>
          <tr>
            <td>自助点餐屏</td>
            <td>SUNMI K2</td>
            <td>扫码绑定</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <p>
        更新于 2026 年 9 月 30 日。发现文档有误？请在<a href="#feedback">反馈页</a>告诉我们。
      </p>
    </Prose>
  );
}

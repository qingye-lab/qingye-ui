import { Button, buttonVariants } from "@qingye/ui/components/button";
import { Badge } from "@qingye/ui/components/badge";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { resources } from "./state";
import { FixtureSettings, Notice } from "./shared";

export default function DetailPattern() {
  const { objectId = "r1" } = useParams();
  const location = useLocation();
  const heading = useRef<HTMLHeadingElement>(null);
  const [removedId, setRemovedId] = useState<string | null>(null);
  const removed = removedId === objectId;
  const row = resources.find((item) => item.id === objectId);
  const source = typeof location.state?.from === "string" && /^\/docs\/patterns\/collection(?:\?|$)/.test(location.state.from) ? location.state.from : "/docs/patterns/collection";
  useEffect(() => { if (removed) heading.current?.focus(); }, [removed]);
  return <section className="qy-task" data-pattern="detail" aria-label="资料详情"><header><div><p className="qy-task-kicker">田野资料 / 详情</p><h2 ref={heading} tabIndex={-1}>{row && !removed ? row.title : "资料已不可用"}</h2></div><Link className={buttonVariants({ variant: "outline" })} to={source}>{location.state?.from ? "返回原集合" : "前往资料集合"}</Link></header>
    {!row || removed ? <Notice title="这个对象已不可用" tone="warning">可以返回集合继续工作。已不存在的对象不会被重建成旧详情。</Notice> : <div className="qy-task-columns"><article className="qy-task-fields"><Badge variant="outline">{row.type}</Badge><p>资料记下了一次日常观察。内容的价值来自所见、比较与判断，也来自暂时未作出的决定。把对象和必要背景放在同一处，可以减少来回寻找。</p><p>这份记录的作者是{row.author}。如果准备修改，应先核对正在操作的对象和版本；保留未保存的输入，再决定保存、放弃或返回。</p><div className="qy-task-actions"><Link className={buttonVariants()} to="/docs/patterns/edit">新建关联笔记</Link><Link className={buttonVariants({ variant: "outline" })} to="/docs/patterns/read?chapter=observation">阅读方法札记</Link></div></article><aside className="qy-task-aside"><h3>资料信息</h3><dl className="qy-task-dl"><dt>对象</dt><dd>{row.id}</dd><dt>作者</dt><dd>{row.author}</dd><dt>更新日期</dt><dd className="numeric">{row.date}</dd><dt>大小</dt><dd className="numeric">{row.size}</dd></dl></aside></div>}
    <FixtureSettings><p>从集合进入时，返回链接保留查询和页码；选择在会话内保存。直接打开此地址时提供稳定上级，不猜测浏览器历史。此处只包含公开合成字段，没有权限接口。</p><Button disabled={!row || removed} onClick={() => setRemovedId(objectId)} size="sm" variant="outline">重放对象消失</Button></FixtureSettings>
  </section>;
}

import { Button } from "@qingye/ui/components/button";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FixtureSettings, Notice, readSession, writeSession } from "./shared";

const chapters = [
  { id: "observation", title: "从观察开始", paragraphs: ["一份记录通常开始于很小的东西：一段路、一件日常使用的器物、一个尚未说清的变化。先把注意力放在对象上，暂时不急着为它寻找一个宏大的解释。名称清楚，后来的人才知道自己读到的是什么。", "观察不是把所有信息填进固定的格子。必要的线索要能找到，同时也要给新的表达留下位置。刚开始的空白有自己的用处；示例可以指引方向，却不应未经选择成为作者的内容。", "记录地点、时间与条件，是让内容可以被比较的起点。同一片河岸，在不同季节、不同天气、不同使用方式下有不同的意义。把这些条件放在相邻位置，比给每句话增加一个围框更有帮助。"] },
  { id: "relation", title: "在关系中理解", paragraphs: ["器物很少独立存在。它与手、材料、位置和使用的节奏共同形成经验。界面中的文字、输入、说明和操作也一样：单看一枚按钮，很难判断它是否合适。要看它怎样帮助人理解对象，怎样保护正在发生的工作。", "一项重要的保护操作，可能比推进操作更需要被看见。阅读时，正文应成为主轴；比较时，关键字段应同时在场；失败时，问题应该出现在能够修正的地方。显著程度来自当前任务，而不是一套固定的强弱等级。", "关系既需要相近，也需要间隔。相关字段靠近，不同任务分节，信息密集处对齐，长阅读保留合适的行长。空白不是装饰，也不意味着所有页面必须疏朗。其作用是让内容与行动得到适当的位置。"] },
  { id: "return", title: "给返回留位置", paragraphs: ["进入详情可以帮助人深入，也可能使人暂时离开原来的工作面。返回之后，原来的查询、选中对象和阅读位置仍然有价值。一个合理的返回入口，应当说明去向，不要求人重新猜测自己从哪里来。", "直接抵达同样是一种正常路径。熟悉的人不必每次经过所有层级，分享的章节也应当能够打开。缺少历史时，就提供稳定的上级入口；不能把浏览器后退当作唯一的返回方式。", "阅读可以暂停。标记一处位置，稍后继续，和一次读完同样有效。保存位置不意味着系统替人完成阅读；它只是保留继续所需的依据。界面还应该允许取消这个决定，而不把停下描述为失败。"] },
  { id: "change", title: "让变化有来处", paragraphs: ["保存之后的等待、失败之后的修正，以及结果尚不明确时的核实，都应围绕同一个对象。一次超时并不能告诉我们服务端是否已经执行。准确表达当前事实，才能决定下一步是重试、核实还是退出。", "批量处理也需要逐个看待结果。完成、失败与未知不是三个可以混用的词。已经完成的对象不应该再次处理；明确失败的对象可以进入安全重试；未知对象要先得到核实的依据。", "动效能够交代变化，但业务完成不能依赖它结束。即使关闭动画，输入、范围、状态和返回仍应成立。逻辑与位置保持连续，才使界面既容易向前，也允许体面地停下。"] },
];
export default function ReadPattern({ compact = false }: { compact?: boolean }) {
  const [params, setParams] = useSearchParams();
  const reader = useRef<HTMLDivElement>(null);
  const [savedPosition, setSavedPosition] = useState<number>(() => readSession("reading-position", 0));
  const [notice, setNotice] = useState("");
  const chapter = params.get("chapter");
  useEffect(() => {
    const container = reader.current;
    if (!container) return;
    const target = chapter ? container.querySelector<HTMLElement>(`[data-chapter="${chapters.some((item) => item.id === chapter) ? chapter : "observation"}"]`) : null;
    if (target) container.scrollTop = target.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
    else container.scrollTop = readSession("reading-position", 0);
  }, [chapter]);
  function remember() { const position = reader.current?.scrollTop ?? 0; writeSession("reading-position", position); setSavedPosition(position); setNotice("阅读位置已保留，可以稍后继续。"); }
  return <section className="qy-task" data-pattern="read" aria-label="方法札记阅读"><header><div><p className="qy-task-kicker">方法札记 · 约 6 分钟</p><h2>给使用留下一点余地</h2></div><Button onClick={remember} variant="outline">记下阅读位置</Button></header>
    <nav aria-label="章节" className="qy-reading-nav">{chapters.map((item) => <Button aria-current={chapter === item.id ? "location" : undefined} key={item.id} onClick={() => setParams({ chapter: item.id }, { replace: true })} size="sm" variant="ghost">{item.title}</Button>)}</nav>
    <div aria-label="文章正文，可滚动阅读" className="qy-reading-scroll focus-ring" ref={reader} style={{ maxBlockSize: compact ? "26rem" : "36rem" }} tabIndex={0}><article className="qy-reading"><p>从器用出发，在关系中建立秩序，为使用留下余地。</p>{chapters.map((item) => <section data-chapter={item.id} key={item.id}><h2>{item.title}</h2>{item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}<p className="qy-task-kicker">本文为 Qingye UI 的合成阅读示例，以正文与章节构成阅读主轴。</p></article></div>
    <div className="qy-task-actions"><Button disabled={!savedPosition} onClick={() => { if (reader.current) reader.current.scrollTop = savedPosition; setNotice("已回到保留的位置。"); }} variant="outline">继续上次阅读</Button><Button onClick={() => { remember(); if (reader.current) reader.current.scrollTop = 0; setParams({ chapter: "observation" }, { replace: true }); }} variant="ghost">返回文章开头</Button></div>
    {notice && <Notice title={notice} />}
    <FixtureSettings><p>阅读位置只在此浏览器会话保存，章节地址可直接进入。本文不使用远程媒体，也不请求内容权限。分享或持久保存位置需要应用进一步接入。</p><Button onClick={() => { writeSession("reading-position", 0); setSavedPosition(0); setNotice("已清除保留位置。"); }} size="sm" variant="outline">清除保留位置</Button></FixtureSettings>
  </section>;
}

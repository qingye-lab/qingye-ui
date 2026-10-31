import { createContext, useContext } from "react";

/*
 * 示例应用在哪里运行：
 * - 裸框（/frame/examples/…，首页窗口与总览缩略）：应用就是整个文档，它自己的 <main> 与顶栏 <header> 就是页面的主体与 banner。
 * - 站点里的查看页（/examples/…）：站点有自己的页头（banner），查看页用一个 <main> 装下查看栏与应用；
 *   应用的内容区改用 div（main 只能有一个、且须在顶层），顶栏在 main 里不再成为第二个 banner。
 * 与文档里「采集记录」演示的 embedded 同一规则。
 */
const ExampleEmbedded = createContext(false);
export const ExampleEmbeddedProvider = ExampleEmbedded.Provider;
export const useExampleEmbedded = () => useContext(ExampleEmbedded);

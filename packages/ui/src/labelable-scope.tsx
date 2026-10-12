"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import * as React from "react";

/**
 * Field 只建立一个共享的标签作用域：作用域里的每个控件拿到同一个 controlId，也拿到同一个 labelId。
 * 一个字段对应一个控件时这正是想要的；但单选组与分段控件的**每一项**是各自的 radio，
 * 项放进 Field 却不经 FieldItem，就会出现两件事：每项渲染同一个 id；每项的 aria-labelledby 都指向
 * 整组的标签，把项自己的文字名称盖掉。
 *
 * 所以「候选项」自己开一个作用域：只用 Base UI 公开的 Field.Item，让它不渲染元素（render 返回子节点本身），
 * 因此不增加 DOM，也不改变轨道、换行等布局。整组的标签、描述、错误仍落在 Field 的作用域上，
 * 由组（radiogroup）读取；描述的 id 在嵌套作用域里会并入外层，项继续能读到整组的描述与错误。
 *
 * 调用方已经用 FieldItem 包住这一项时（项旁有自己的 FieldLabel），作用域已经存在，不再叠第二层——
 * 叠了会让项读不到那个标签。判断靠本库的 FieldItem 写入 InFieldItem；直接使用 FieldPrimitive.Item 的
 * 调用方不经过它，须自己不再叠加（见 field 文档）。
 */
export const InFieldItem = React.createContext(false);
/** 由本库的 Field 写入。Field.Item 在 Field 之外会抛错，所以没有 Field 时候选项不需要、也不能开作用域。 */
export const InField = React.createContext(false);

export function OptionScope({ children }: { children: React.ReactNode }) {
  const inField = React.useContext(InField);
  const inItem = React.useContext(InFieldItem);
  if (!inField || inItem) return <>{children}</>;
  return <FieldPrimitive.Item render={() => <InFieldItem.Provider value={true}>{children}</InFieldItem.Provider>} />;
}

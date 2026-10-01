import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@yanqing/ui";

export const meta = { title: "桌面应用", description: "点击打开一个菜单后，左右方向键或悬停即可切换到相邻菜单。" };

export default function Demo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>文件</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            新建文档 <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            打开… <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>最近打开</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>季度复盘.md</MenubarItem>
              <MenubarItem>品牌规范.pdf</MenubarItem>
              <MenubarItem>首页改版.fig</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>清除记录</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            保存 <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            另存为… <MenubarShortcut>⇧⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            打印… <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>编辑</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            撤销 <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            重做 <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            剪切 <MenubarShortcut>⌘X</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            复制 <MenubarShortcut>⌘C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            粘贴 <MenubarShortcut>⌘V</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            查找与替换 <MenubarShortcut>⌘F</MenubarShortcut>
          </MenubarItem>
          <MenubarItem variant="destructive">删除选中内容</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>视图</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            放大 <MenubarShortcut>⌘+</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            缩小 <MenubarShortcut>⌘−</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            实际大小 <MenubarShortcut>⌘0</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            进入全屏 <MenubarShortcut>⌃⌘F</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>帮助</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>使用指南</MenubarItem>
          <MenubarItem>
            键盘快捷键 <MenubarShortcut>⌘/</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>反馈问题</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

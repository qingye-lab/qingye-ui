import { useEffect, useRef, useState } from "react";
import { AspectRatio } from "@qingye/ui/components/aspect-ratio";
import { Badge } from "@qingye/ui/components/badge";
import { Button, buttonVariants } from "@qingye/ui/components/button";
import { Card, CardFooter, CardPanel } from "@qingye/ui/components/card";
import { Carousel, CarouselContent, CarouselDots, CarouselItem, CarouselNext, CarouselPrevious } from "@qingye/ui/components/carousel";
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle } from "@qingye/ui/components/dialog";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { FileUpload, formatFileSize } from "@qingye/ui/components/file-upload";
import { Input } from "@qingye/ui/components/input";
import { SearchInput } from "@qingye/ui/components/search-input";
import { Tabs, TabsList, TabsTab } from "@qingye/ui/components/tabs";
import { Toggle } from "@qingye/ui/components/toggle";
import { ToggleGroup, ToggleGroupItem } from "@qingye/ui/components/toggle-group";
import { Heading as UIHeading } from "@qingye/ui/components/typography";
import { toastManager } from "@qingye/ui/components/toast";
import { FolderOpen, Grid2X2, Heart, List, Plus } from "lucide-react";
import { AppFrame, EmptyResult, ExampleSelect, type DemoProps } from "./shared";

type StudioWork = { id: string; title: string; category: "architecture" | "nature" | "objects"; image: string; size: string; format: string; favorite: boolean };
const works: StudioWork[] = [
  { id: "s1", title: "建筑空间.jpg", category: "architecture", image: "/examples/architecture.jpg", size: "432 KB", format: "JPG", favorite: false },
  { id: "s2", title: "室内自然光.jpg", category: "architecture", image: "/examples/interior.jpg", size: "420 KB", format: "JPG", favorite: true },
  { id: "s3", title: "山野风景.jpg", category: "nature", image: "/examples/mountain.jpg", size: "448 KB", format: "JPG", favorite: false },
  { id: "s4", title: "灯具参考.jpg", category: "objects", image: "/examples/desk.jpg", size: "292 KB", format: "JPG", favorite: true },
  { id: "s5", title: "森林光线.jpg", category: "nature", image: "/examples/forest.jpg", size: "560 KB", format: "JPG", favorite: false },
  { id: "s6", title: "咖啡日常.jpg", category: "objects", image: "/examples/coffee.jpg", size: "240 KB", format: "JPG", favorite: false },
];
const categoryLabel = { architecture: "空间", nature: "自然", objects: "物件" };

export function StudioDemo({ embedded = false }: DemoProps) {
  const [items, setItems] = useState(works);
  const [section, setSection] = useState("library");
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [view, setView] = useState("grid");
  const [previewIds, setPreviewIds] = useState<string[]>([]);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadCategory, setUploadCategory] = useState("architecture");
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const localImageUrls = useRef<string[]>([]);
  useEffect(() => () => localImageUrls.current.forEach((url) => URL.revokeObjectURL(url)), []);
  const visible = items.filter((item) => (section !== "favorites" || item.favorite) && (category === "all" || category === item.category) && `${item.title} ${categoryLabel[item.category]}`.includes(query));
  const previewItems = previewIds.map((id) => items.find((item) => item.id === id)).filter((item): item is StudioWork => item !== undefined);
  const preview = previewItems[previewIndex];
  const favoriteCount = items.filter((item) => item.favorite).length;
  const toggleFavorite = (id: string) => setItems((current) => current.map((item) => item.id === id ? { ...item, favorite: !item.favorite } : item));
  const openPreview = (id: string) => { setPreviewIds(visible.map((item) => item.id)); setPreviewIndex(visible.findIndex((item) => item.id === id)); setPreviewOpen(true); };
  const nav = [{ id: "library", label: "全部资源", icon: FolderOpen, count: items.length }, { id: "favorites", label: "收藏", icon: Heart, count: favoriteCount }];

  return <AppFrame embedded={embedded} active={section} onNavigate={(next) => { setSection(next); setCategory("all"); setQuery(""); }} nav={nav} kind="studio" workspace="青野媒体资源">
    <div className="studio-content">
      <header className="studio-heading"><div><UIHeading className="example-screen-title" level={embedded ? 2 : 1} size="display">{section === "favorites" ? "已收藏资源" : "媒体资源"}</UIHeading><p className="text-caption text-muted-foreground">{visible.length} 个文件 · 分类、预览与上传</p></div><Button onClick={() => setUploadOpen(true)}><Plus aria-hidden />上传文件</Button></header>
      <div className="studio-toolbar"><Tabs value={category} onValueChange={(value) => setCategory(String(value))}><TabsList variant="underline"><TabsTab value="all">全部</TabsTab><TabsTab value="architecture">空间</TabsTab><TabsTab value="nature">自然</TabsTab><TabsTab value="objects">物件</TabsTab></TabsList></Tabs><div className="studio-tools"><SearchInput className="studio-search" aria-label="搜索资源" placeholder="搜索文件…" value={query} onValueChange={setQuery} /><ToggleGroup aria-label="资源视图" value={[view]} onValueChange={(values) => { if (values[0]) setView(values[0]); }} size="sm" variant="outline"><ToggleGroupItem value="grid" aria-label="网格视图"><Grid2X2 aria-hidden /></ToggleGroupItem><ToggleGroupItem value="list" aria-label="列表视图"><List aria-hidden /></ToggleGroupItem></ToggleGroup></div></div>
      {visible.length === 0 ? <EmptyResult title="没有资源" description={section === "favorites" ? "收藏文件后会显示在这里。" : "试试其他关键词或分类。"} action={<Button variant="outline" onClick={() => { setCategory("all"); setQuery(""); setSection("library"); }}>查看全部资源</Button>} /> : <div className={`studio-gallery studio-gallery--${view}`}>{visible.map((item, index) => <Card key={item.id} size="sm" className="studio-work"><CardPanel className="studio-media-panel"><Button variant="ghost" className="studio-image-trigger h-auto sm:h-auto w-full p-0" onClick={() => openPreview(item.id)} aria-label={`预览${item.title}`}><AspectRatio ratio={4 / 3}><img className="object-cover" src={item.image} alt={item.title} loading={index > 2 ? "lazy" : "eager"} /></AspectRatio></Button></CardPanel><CardFooter className="studio-work-footer"><div><strong>{item.title}</strong><p className="text-caption text-muted-foreground">{categoryLabel[item.category]} · {item.size}</p></div><Badge variant="secondary" size="sm">{item.format}</Badge><Toggle size="sm" pressed={item.favorite} aria-label={`${item.favorite ? "取消收藏" : "收藏"}${item.title}`} onPressedChange={() => toggleFavorite(item.id)}><Heart aria-hidden /></Toggle></CardFooter></Card>)}</div>}
    </div>
    <Dialog open={previewOpen} onOpenChange={setPreviewOpen}><DialogPopup className="studio-preview-dialog" bottomStickOnMobile={false}><DialogHeader><DialogTitle>{preview?.title ?? "资源预览"}</DialogTitle><DialogDescription>{preview ? `${categoryLabel[preview.category]} · ${preview.size}` : ""}</DialogDescription></DialogHeader><DialogPanel><Carousel aria-label="资源预览轮播" index={previewIndex} onIndexChange={setPreviewIndex}><CarouselContent>{previewItems.map((item) => <CarouselItem key={item.id}><AspectRatio ratio={16 / 10}><img className="object-contain" src={item.image} alt={item.title} /></AspectRatio></CarouselItem>)}</CarouselContent><div className="studio-carousel-controls"><CarouselDots /><div><CarouselPrevious aria-label="上一张资源" /><CarouselNext aria-label="下一张资源" /></div></div></Carousel></DialogPanel>{preview && <DialogFooter><Toggle pressed={preview.favorite} onPressedChange={() => toggleFavorite(preview.id)}><Heart aria-hidden />{preview.favorite ? "已收藏" : "收藏资源"}</Toggle><a className={buttonVariants({ variant: "outline" })} href={preview.image} download={preview.title}>下载文件</a></DialogFooter>}</DialogPopup></Dialog>
    <Dialog open={uploadOpen} onOpenChange={setUploadOpen}><DialogPopup className="sm:max-w-md"><DialogHeader><DialogTitle>上传文件</DialogTitle><DialogDescription>选择或拖入图片。文件仅保存在当前演示中。</DialogDescription></DialogHeader><form className="contents" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const file = uploadFiles[0]; const title = String(data.get("title") ?? "").trim(); if (!file || !title) return; const url = URL.createObjectURL(file); localImageUrls.current.push(url); setItems((current) => [{ id: `local-${Date.now()}`, title, category: uploadCategory as StudioWork["category"], image: url, size: formatFileSize(file.size), format: file.name.split(".").pop()?.toUpperCase() ?? "IMG", favorite: false }, ...current]); setSection("library"); setCategory("all"); setQuery(""); setUploadFiles([]); setUploadOpen(false); toastManager.add({ title: "文件已加入演示", type: "success" }); }}><DialogPanel className="grid gap-4"><Field><FieldLabel>文件名称</FieldLabel><Input name="title" required placeholder="输入文件名称" /></Field><Field><FieldLabel>分类</FieldLabel><ExampleSelect label="资源分类" value={uploadCategory} onChange={setUploadCategory} options={[{ value: "architecture", label: "空间" }, { value: "nature", label: "自然" }, { value: "objects", label: "物件" }]} /></Field><FileUpload files={uploadFiles} onFilesChange={setUploadFiles} accept="image/jpeg,image/png,image/webp" maxFiles={1} maxSize={10 * 1024 * 1024} thumbnails label="选择图片" description="JPG、PNG 或 WebP，最大 10 MB。支持拖放、预览与移除。" /></DialogPanel><DialogFooter><DialogClose render={<Button variant="ghost" />}>取消</DialogClose><Button type="submit" disabled={uploadFiles.length === 0}>添加文件</Button></DialogFooter></form></DialogPopup></Dialog>
  </AppFrame>;
}

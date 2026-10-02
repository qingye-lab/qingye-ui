/** Node-only synthetic service data. This module must never be imported by the browser. */
const originals = [
  { id: "r1", title: "秋日田野笔记", type: "笔记", size: "2.4 MB", author: "林川", date: "2026-09-28", privateReview: "NODE_ONLY_RESTRICTED_NOTE_R1" },
  { id: "r2", title: "城南步行观察", type: "记录", size: "1.2 MB", author: "陈禾", date: "2026-09-29", privateReview: "NODE_ONLY_RESTRICTED_NOTE_R2" },
  { id: "r3", title: "河岸植物目录", type: "目录", size: "4.8 MB", author: "林川", date: "2026-09-30", privateReview: "NODE_ONLY_RESTRICTED_NOTE_R3" },
  { id: "r4", title: "木器使用与修复", type: "笔记", size: "3.1 MB", author: "周宁", date: "2026-10-01", privateReview: "NODE_ONLY_RESTRICTED_NOTE_R4" },
  { id: "r5", title: "巷口的声音", type: "记录", size: "0.8 MB", author: "陈禾", date: "2026-10-02", privateReview: "NODE_ONLY_RESTRICTED_NOTE_R5" },
];
export function projectResources(scope = "public") {
  if (scope === "none") return [];
  // One DTO whitelist serves summary, preview and detail. No private field enters it.
  return originals.map(({ id, title, type, size, author, date }) => ({ id, title, type, size, author, date }));
}
export function fixtureSecretMarkers() { return originals.map((item) => item.privateReview); }

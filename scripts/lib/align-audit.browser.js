// 对齐审计（基础层 §19）：在页面里执行，返回半像素、同行控件高度、字号、行高与名称列对齐的偏差。由 scripts/align-audit.mjs 注入。
window.__align = () => {
  const out = { page: location.hash, rows: [], halfPx: [], controls: [], fontSize: [], leading: [] };
  const sizes = new Set([11,12,13,14,15,16,17,18,19,20,22,24,28,32,40]); // 22、28：长文的节与篇（text-prose-h2 / -h1）
  const center = r => (r.top + r.bottom) / 2;
  const firstText = el => { const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { if (n.textContent.trim() && n.parentElement.getBoundingClientRect().height) { const rg = document.createRange(); rg.selectNodeContents(n); const rr = rg.getClientRects()[0]; if (rr) return { rect: rr, el: n.parentElement }; } } };
  // 文字行盒的中心：行高与字面的中心一致（中文字面居中于行）。
  // 行盒中心：字形框上下不对称，不能用它的中心。取文字所在的块级行容器：
  // 若它在行内居中排布（flex/grid 且 align-items:center），中心就是容器中心；否则 = 内容顶 + 行高 / 2。
  const lineCenter = (ft) => {
    let box = ft.el; while (box && getComputedStyle(box).display.startsWith("inline") && box.parentElement) box = box.parentElement;
    const cs = getComputedStyle(box), r = box.getBoundingClientRect();
    if (/flex|grid/.test(cs.display) && cs.alignItems === "center" && cs.flexDirection !== "column") return (r.top + r.bottom) / 2;
    const lh = parseFloat(getComputedStyle(ft.el).lineHeight) || parseFloat(cs.lineHeight);
    return r.top + parseFloat(cs.borderTopWidth) + parseFloat(cs.paddingTop) + lh / 2;
  };
  for (const row of document.querySelectorAll("main div.grid")) {
    if (!row.className.includes("6rem")) continue;
    const name = row.firstElementChild.querySelector("p"); const content = row.children[1]; if (!name || !content) continue;
    const nc = center(name.getBoundingClientRect());
    const inline = content.className.includes("items-center");
    if (!inline) {
      // 第一行 = 内容里位置最靠上的那一行：文字行，或没有文字的有形轨道（进度、构成）。
      const candidates = [];
      const w = document.createTreeWalker(content, NodeFilter.SHOW_TEXT); let n;
      while ((n = w.nextNode())) { if (!n.textContent.trim() || !n.parentElement.getBoundingClientRect().height || n.parentElement.closest(".sr-only")) continue; /* 只给读屏的文字在视觉上不成行 */ const rg = document.createRange(); rg.selectNodeContents(n); const rr = rg.getClientRects()[0]; if (rr) { const ft = { rect: rr, el: n.parentElement }; candidates.push({ top: rr.top, center: lineCenter(ft), what: ft.el.dataset.slot || ft.el.tagName }); } }
      // 没有文字的控件（图标按钮）也是一行。
      for (const el of content.querySelectorAll("button, [data-slot$=track]")) { if (el.textContent.trim() && !el.querySelector(".sr-only")) continue; const r = el.getBoundingClientRect(); if (r.height) candidates.push({ top: r.top, center: (r.top + r.bottom) / 2, what: el.dataset.slot }); }
      const box = content.getBoundingClientRect();
      const inside = candidates.filter(c => c.top >= box.top - 0.5 && c.top <= box.bottom);
      candidates.length = 0; candidates.push(...inside);
      if (!candidates.length) continue;
      const first = candidates.reduce((a, c) => c.top < a.top - 0.5 ? c : a);
      const d = +(first.center - nc).toFixed(2); if (Math.abs(d) > 1) out.rows.push([name.textContent, "block", d, first.what]);
    }
    else for (const k of content.children) { const kr = k.getBoundingClientRect(); if (!kr.height) continue; const d = +(center(kr) - nc).toFixed(2); if (Math.abs(d) > 0.5) out.rows.push([name.textContent, k.dataset.slot || k.tagName, d, Math.round(kr.height)]); }
  }
  for (const el of document.querySelectorAll("main *")) {
    if (el.closest("svg")) continue; const cs = getComputedStyle(el); const r = el.getBoundingClientRect(); if (!r.height || cs.visibility === "hidden") continue;
    const painted = parseFloat(cs.borderTopWidth) > 0 || !/rgba\(0, 0, 0, 0\)|transparent/.test(cs.backgroundColor);
    const frac = v => Math.abs(v - Math.round(v)) > 0.05;
    if (painted && (frac(r.height) || frac(r.top + scrollY))) out.halfPx.push([el.dataset.slot || el.tagName, +r.height.toFixed(2), +(r.top + scrollY).toFixed(2)]);
    if ([...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) {
      const fs = parseFloat(cs.fontSize); if (!sizes.has(fs)) out.fontSize.push([el.dataset.slot || el.tagName, fs]);
      const lh = parseFloat(cs.lineHeight); if (!isNaN(lh) && lh % 4 && el.dataset.slot !== "kbd") out.leading.push([el.dataset.slot || el.tagName, fs, lh, el.textContent.trim().slice(0, 8)]);
    }
    if (cs.display.includes("flex") && cs.flexDirection === "row" && cs.alignItems === "center") {
      const kids = [...el.children].filter(k => /^(button|toggle|toggle-group|segmented-control|input-control|input-group|select-trigger|native-select|number-field-group|combobox-control|autocomplete-control)$/.test(k.dataset.slot || "") && k.getBoundingClientRect().height);
      const sized = kids.filter(k => !k.dataset.size || k.dataset.size === "md");
      if (sized.length > 1) { const hs = sized.map(k => Math.round(k.getBoundingClientRect().height)); if (new Set(hs).size > 1) out.controls.push(sized.map((k, i) => `${k.dataset.slot}:${hs[i]}`).join(" ")); }
    }
  }
  const uniq = a => [...new Map(a.map(x => [JSON.stringify(x), x])).values()].slice(0, 20);
  for (const k of ["halfPx", "fontSize", "leading", "controls"]) out[k] = uniq(out[k]);
  return out;
};

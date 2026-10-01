// Serialized by page.evaluate: keep this function independent of module scope.
export function measurePlayground() {
  // This is a stable layout measurement. Freeze only an isolated infinite
  // full-turn rotation at its identity start; do not claim cycle-wide paint
  // containment. Translation, scale, mixed effects and static transforms stay.
  const rotations = [];
  const animations = document.getAnimations();
  const angle = (value, property) => {
    if (value === "none") return 0;
    const pattern = property === "transform"
      ? /^rotate\(\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+))(deg|rad|grad|turn)\s*\)$/
      : /^([+-]?(?:\d+(?:\.\d*)?|\.\d+))(deg|rad|grad|turn)$/;
    const match = value?.match(pattern);
    if (!match) return null;
    return Number(match[1]) * ({ deg: 1, rad: 180 / Math.PI, grad: 0.9, turn: 360 }[match[2]]);
  };
  const frameMetadata = new Set(["offset", "computedOffset", "easing", "composite"]);
  for (const animation of animations) {
    const effect = animation.effect;
    const target = effect?.target;
    if (!target || typeof effect.getKeyframes !== "function" || animation.playState !== "running") continue;
    const timing = effect.getTiming(), frames = effect.getKeyframes();
    if (timing.iterations !== Infinity || timing.iterationStart !== 0 || timing.delay !== 0 || !(Number(timing.duration) > 0) || effect.composite !== "replace") continue;
    if (animations.filter(a => a.effect?.target === target).length !== 1 || frames.length < 2) continue;
    const properties = new Set(frames.flatMap(frame => Object.keys(frame).filter(key => !frameMetadata.has(key))));
    if (properties.size !== 1 || !["transform", "rotate"].includes([...properties][0])) continue;
    const property = [...properties][0];
    const angles = frames.map(frame => angle(frame[property], property));
    if (angles.some(value => value === null) || frames.some(frame => !["auto", "replace"].includes(frame.composite))) continue;
    const last = angles.at(-1);
    if (Math.abs(angles[0]) > 0.00001 || Math.abs(last) < 0.00001 || Math.abs(last / 360 - Math.round(last / 360)) > 0.00001) continue;
    const style = getComputedStyle(target);
    const record = {
      element: target.tagName.toLowerCase(), slot: target.getAttribute("data-slot"),
      animationName: animation.animationName, currentTime: animation.currentTime,
      timing: { ...timing, iterations: "Infinity" }, keyframes: frames,
      transformBefore: style.transform, rotateBefore: style.rotate,
    };
    const state = { animation, currentTime: animation.currentTime, record };
    rotations.push(state);
    animation.pause(); animation.currentTime = 0;
    record.transformMeasured = getComputedStyle(target).transform;
    record.rotateMeasured = getComputedStyle(target).rotate;
    const matrix = new DOMMatrixReadOnly(record.transformMeasured === "none" ? undefined : record.transformMeasured);
    const identity = matrix.is2D && [matrix.a - 1, matrix.b, matrix.c, matrix.d - 1, matrix.e, matrix.f].every(value => Math.abs(value) < 0.00001);
    const measuredRotate = angle(record.rotateMeasured, "rotate");
    if (!identity || measuredRotate === null || Math.abs(measuredRotate) > 0.00001) {
      rotations.pop(); animation.currentTime = state.currentTime; animation.play();
    }
  }
  try {
    const overflow = document.documentElement.scrollWidth - window.innerWidth;
    const demos = [...document.querySelectorAll("[data-demo]")];
    const empty = demos.filter((section) => {
      const frame = section.lastElementChild;
      return frame && frame.getBoundingClientRect().height < 40 && !frame.textContent.trim();
    }).map((section) => section.getAttribute("data-demo"));
    const scrolls = (el) => {
      for (let node = el.parentElement; node; node = node.parentElement) {
        const style = getComputedStyle(node);
        if (["auto", "scroll", "hidden"].includes(style.overflowX)) return true;
      }
      return false;
    };
    const px = (value) => Number.parseFloat(value) || 0;
    const dpr = window.devicePixelRatio || 1;
    const snap = (value) => Math.round(value * dpr) / dpr;
    // Keep the existing 2 CSS px allowance for small visual intrusions (e.g. a
    // rotated separator), but quantize edges first so subpixel jitter near the
    // cutoff cannot flip a result. Negative margins are measured, not exempted.
    const tolerance = Math.max(2, 1 / dpr);
    const normalized = { displayContents: 0, zeroSizeVisible: 0 };
    const invalidDeclarations = [];
    const declaredAllowances = [];
    const over = [];
    for (const el of document.querySelectorAll("[data-demo] *")) {
      let parent = el.parentElement;
      if (!parent) continue;
      const self = getComputedStyle(el);
      const declaration = el.getAttribute("data-audit-overflow-inline");
      let allowance = 0;
      if (declaration !== null) {
        // Only the reviewed 1em text-label case is supported. This allowance is
        // local to that leaf's edges; it never exempts page or excess overflow.
        const anchor = getComputedStyle(parent);
        if (declaration === "1em" && el.children.length === 0 && el.textContent.trim() &&
            parent.getBoundingClientRect().width === 0 && anchor.width === "0px" &&
            anchor.display === "flex" && anchor.flexDirection === "column" && anchor.alignItems === "center") {
          allowance = px(self.fontSize);
          declaredAllowances.push({ demo: el.closest("[data-demo]")?.getAttribute("data-demo"), text: el.textContent.trim(), allowance });
        } else {
          invalidDeclarations.push({ demo: el.closest("[data-demo]")?.getAttribute("data-demo"), value: declaration });
        }
      }
      if (["absolute", "fixed"].includes(self.position)) continue;
      let cs = getComputedStyle(parent);
      // display:contents produces no box. A zero-size overflow-visible sizing
      // wrapper (e.g. ResponsiveContainer) also does not constrain its children.
      // Compare against their nearest real container, rather than skipping the
      // child: an oversized chart/input must still be reported there.
      while (parent.parentElement &&
        (cs.display === "contents" ||
         (parent.getBoundingClientRect().width === 0 && parent.getBoundingClientRect().height === 0 &&
          cs.width === "0px" && cs.height === "0px" && cs.overflowX === "visible"))) {
        normalized[cs.display === "contents" ? "displayContents" : "zeroSizeVisible"]++;
        parent = parent.parentElement;
        cs = getComputedStyle(parent);
      }
      if (cs.position === "fixed") continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || scrolls(el)) continue;
      const box = parent.getBoundingClientRect();
      const right = box.right - px(cs.borderRightWidth) - px(cs.paddingRight);
      const left = box.left + px(cs.borderLeftWidth) + px(cs.paddingLeft);
      // Compare the border box after accounting for its intentional negative
      // margin intrusion into parent padding; positive margins add no allowance.
      const adjustedRight = rect.right + Math.min(0, px(self.marginRight)) - allowance;
      const adjustedLeft = rect.left - Math.min(0, px(self.marginLeft)) + allowance;
      const excess = Math.max(snap(adjustedRight) - snap(right), snap(left) - snap(adjustedLeft));
      if (excess > tolerance) {
        over.push({
          demo: el.closest("[data-demo]")?.getAttribute("data-demo"),
          element: `${el.tagName.toLowerCase()}${el.getAttribute("data-slot") ? `[${el.getAttribute("data-slot")}]` : ""}`,
          excess,
          allowance,
          text: el.textContent.trim().slice(0, 80),
          marginLeft: px(self.marginLeft), marginRight: px(self.marginRight),
          rect: { left: rect.left, right: rect.right, width: rect.width },
          container: { left, right, width: right - left },
        });
      }
    }
    return { demos: demos.length, overflow, empty, over, tolerance, dpr, normalized, normalizedAnimations: rotations.map(state => state.record), invalidDeclarations, declaredAllowances };
  } finally {
    for (const { animation, currentTime } of rotations) {
      animation.currentTime = currentTime; animation.play();
    }
  }
}

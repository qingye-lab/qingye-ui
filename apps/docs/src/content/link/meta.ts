import type { ComponentMeta } from "@/lib/types";

export default {
  "title": "链接 Link",
  "titleEn": "Link",
  "description": "去往一个地址的文字入口；全库文字链接共用这一种画法。",
  "descriptionEn": "A text entry that goes to an address; every text link in the library shares this one treatment.",
  "category": "导航",
  "layer": "primitive",
  "source": "local",
  "exports": [
    "Link",
    "linkClassName"
  ],
  "keywords": [
    "link",
    "anchor",
    "链接"
  ],
  "decisions": "链接去往一个地方，按钮执行一个动作。下划线常在，平时是重墨，悬停与焦点时加深为文字本色；不加粗，不外扩焦点。行内链接不扩展命中区。", decisionsEn: "A link goes somewhere; a button performs an action. The underline is always present, heavy ink at rest and full text color on hover or focus, without thickening or an outer focus ring. Inline links do not expand their hit area.",
  "design": {
    "methods": [
      "名实相符",
      "骨法用笔"
    ],
    "whenToUse": [
      "正文或说明中去往另一页、另一处的入口。"
    ],
    "avoid": [
      "执行动作（保存、删除、提交）用 Button，不用链接。",
      "成列的同等导航入口（导航菜单、侧栏、分页）由位置表明是导航，使用各自组件，不逐项加下划线。"
    ],
    "composition": [
      "路由链接通过 render 接入；Breadcrumb、Item、Toolbar、HoverCard 读取 linkClassName。"
    ],
    "stateOwner": {
      "library": [
        "下划线、悬停、焦点与可访问名称的画法。"
      ],
      "application": [
        "地址、路由、当前位置与权限。"
      ]
    },
    "responsive": [
      "长链接文字随正文换行；独立成行的入口由调用方加 touch-target。"
    ],
    "customization": [
      "颜色读墨阶；品牌可通过主题改文字色，不改下划线常在的规则。"
    ]
  }, designEn: {"whenToUse":["An entry within body text or descriptions that goes to another page or place."],"avoid":["Use Button for actions such as save, delete, or submit.","Rows or columns of equivalent navigation entries such as navigation menus, sidebars, or pagination are identified by position; use their components without per-item underlines."],"composition":["Route links connect through render; Breadcrumb, Item, Toolbar, and HoverCard read linkClassName."],"stateOwner":{"library":["Underline, hover, focus, and accessible-name treatment."],"application":["Addresses, routing, current location, and permissions."]},"responsive":["Long link text wraps with body text; standalone entries add touch-target at the call site."],"customization":["Colors come from the ink ladder; a brand may change text color but not the always-present underline."]},
  "api": [
    {
      "name": "Link",
      "description": "原生 a 元素；href、target、rel 等原生属性与 render/ref 透传。", descriptionEn: "A native a element; native attributes such as href, target, and rel plus render/ref are forwarded.",
      "props": [
        {
          "name": "render / ref / 原生属性", nameEn: "render / ref / native props",
          "type": "useRender.ComponentProps<\"a\">",
          "description": "路由库的链接组件通过 render 接入。", descriptionEn: "Connect a router's link component through render."
        }
      ]
    },
    {
      "name": "linkClassName",
      "description": "同一画法的类名，供需要渲染原语自身链接部位的组件使用。", descriptionEn: "The same treatment as a class name, for components that render a primitive's own link part.",
      "props": []
    }
  ]
} satisfies ComponentMeta;

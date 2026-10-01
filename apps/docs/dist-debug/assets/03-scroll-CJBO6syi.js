import{j as e}from"./vendor-react-DkPWdm9N.js";import{C as r}from"./code-block-BtPGJbWw.js";import"./index-Bp3wbe0b.js";import"./vendor-CtnXKZlY.js";import"./vendor-date-j_bVFt3w.js";import"./vendor-base-ui-NEp_fldd.js";import"./copy-button-CBhvgVqD.js";const c={title:"横向滚动、最大高度与换行",description:"长行默认横向滚动；maxHeight 限制高度后纵向滚动；wrap 改为自动换行。"},t=`{
  "orderId": "SO-20260930-004817",
  "store": { "id": "XH-001", "name": "徐汇漕溪北路店", "address": "上海市徐汇区漕溪北路 398 号汇智大厦 12 层" },
  "items": [
    { "sku": "LT-0021", "name": "生椰拿铁（大杯 / 少冰 / 少糖）", "qty": 2, "price": 18.0 },
    { "sku": "BG-1180", "name": "芝士牛肉堡", "qty": 1, "price": 32.0 },
    { "sku": "SN-0402", "name": "薯条（中）", "qty": 1, "price": 12.0 }
  ],
  "payment": { "channel": "wechat", "amount": 80.0, "paidAt": "2026-09-30T14:26:08+08:00" },
  "delivery": { "type": "pickup", "code": "A0417" },
  "remark": ""
}`,o=`[14:26:08.412] INFO  order.created id=SO-20260930-004817 store=XH-001 channel=miniapp amount=80.00
[14:26:08.533] INFO  payment.confirmed id=SO-20260930-004817 provider=wechat trade_no=4200002281202609301486532917`;function l(){return e.jsxs("div",{className:"flex w-full flex-col gap-4",children:[e.jsx(r,{code:t,filename:"order.json",language:"JSON",lineNumbers:!0,maxHeight:240}),e.jsx(r,{code:o,filename:"server.log",wrap:!0})]})}export{l as default,c as meta};

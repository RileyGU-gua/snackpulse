import type { ModuleKey } from "@/lib/content";

export type BrandMeta = { id: string; label: string; aliases: string[]; entityFile?: string; kind?: "other" };
export type CompanyMeta = { id: string; label: string; aliases: string[]; entityFile?: string; brands: BrandMeta[]; kind?: "other" };

export const brandIndex: Record<"01｜亿滋动态" | "02｜竞品动态", CompanyMeta[]> = {
  "01｜亿滋动态": [{
    id: "mondelez", label: "亿滋国际", aliases: ["亿滋国际", "Mondelēz", "Mondelez"], entityFile: "亿滋国际",
    brands: [
      { id:"all", label:"全部品牌", aliases:[] },
      { id:"oreo", label:"Oreo（奥利奥）", aliases:["Oreo","奥利奥"], entityFile:"Oreo" },
      { id:"stride", label:"炫迈（Stride）", aliases:["炫迈","Stride"], entityFile:"炫迈" },
      { id:"chips-ahoy", label:"趣多多（Chips Ahoy!）", aliases:["趣多多","Chips Ahoy"], entityFile:"趣多多" },
      { id:"pacific", label:"太平（Pacific）", aliases:["太平","Pacific"] },
      { id:"ritz", label:"乐之（Ritz）", aliases:["乐之","Ritz"] },
      { id:"lu", label:"露怡（LU）", aliases:["露怡","LU"] },
      { id:"other", label:"其他", aliases:[], kind:"other" }
    ]
  }],
  "02｜竞品动态": [
    { id:"all", label:"全部", aliases:[], brands:[{id:"all",label:"全部品牌",aliases:[]}] },
    { id:"mars", label:"玛氏 Mars", aliases:["玛氏","Mars"], entityFile:"玛氏中国休闲食品", brands:[
      {id:"all",label:"全部品牌",aliases:[]}, {id:"snickers",label:"士力架 Snickers",aliases:["士力架","Snickers"],entityFile:"士力架（Snickers）"}, {id:"mms",label:"M&M's",aliases:["M&M's","M&M’S","M豆"],entityFile:"M&M’s"}, {id:"doublemint",label:"绿箭 Doublemint",aliases:["绿箭","Doublemint"],entityFile:"绿箭（Doublemint）"}, {id:"extra",label:"益达 Extra",aliases:["益达","Extra"],entityFile:"益达（Extra）"}
    ]},
    { id:"glico", label:"格力高 Glico", aliases:["格力高","Glico"], entityFile:"格力高中国", brands:[
      {id:"all",label:"全部品牌",aliases:[]}, {id:"pocky",label:"百奇 Pocky",aliases:["百奇","Pocky"],entityFile:"百奇（Pocky）"}, {id:"pretz",label:"百力滋 Pretz",aliases:["百力滋","Pretz"],entityFile:"百力滋（Pretz）"}, {id:"pejoy",label:"百醇 Pejoy",aliases:["百醇","Pejoy"],entityFile:"百醇（Pejoy）"}
    ]},
    { id:"nestle", label:"雀巢 Nestlé", aliases:["雀巢","Nestlé","Nestle"], brands:[{id:"all",label:"全部品牌",aliases:[]}] },
    { id:"orion", label:"好丽友 Orion", aliases:["好丽友","Orion"], brands:[{id:"all",label:"全部品牌",aliases:[]}] },
    { id:"other", label:"其他", aliases:[], brands:[{id:"all",label:"全部品牌",aliases:[]}], kind:"other" }
  ]
};

export function indexedCompanies(module: ModuleKey) { return module==="01｜亿滋动态" || module==="02｜竞品动态" ? brandIndex[module] : []; }

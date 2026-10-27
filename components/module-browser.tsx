"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArticleCard } from "@/components/cards";
import { BrandProfile } from "@/components/brand-profile";
import { byEventDate, eventsForAliases, getByModule, getEntityByFile, moduleInfo, type Article, type ModuleKey } from "@/lib/content";
import { indexedCompanies } from "@/lib/brand-metadata";

function href(module:string,company?:string,brand?:string){const q=new URLSearchParams();if(company)q.set("company",company);if(brand)q.set("brand",brand);return `/module/${encodeURIComponent(module)}${q.size?`?${q}`:""}`;}

export function ModuleBrowser({module}:{module:ModuleKey}){
  const query=useSearchParams(),meta=moduleInfo(module);
  if(module!=="01｜亿滋动态"&&module!=="02｜竞品动态")return <><section className="module-hero"><span className="eyebrow">{meta.english}</span><h1>{meta.title}</h1><p>{meta.description}</p></section><section className="section"><div className="article-grid">{getByModule(module).filter(a=>a.type!=="entity").map(a=><ArticleCard key={a.id} article={a}/>)}</div></section></>;
  const companies=indexedCompanies(module),isMondelez=module==="01｜亿滋动态",company=isMondelez?companies[0]:companies.find(item=>item.id===query.get("company"))||companies[0],brand=company.brands.find(item=>item.id===query.get("brand"))||company.brands.find(item=>item.id==="all");
  const allKnown=isMondelez?company.brands.filter(i=>i.id!=="all"&&i.id!=="other").flatMap(i=>i.aliases):companies.filter(i=>i.id!=="all"&&i.id!=="other").flatMap(i=>i.brands.filter(b=>b.id!=="all").flatMap(b=>b.aliases));
  let updates:Article[];
  if(brand?.kind==="other")updates=eventsForAliases(module,[],allKnown);else if(brand&&brand.id!=="all")updates=eventsForAliases(module,brand.aliases);else if(!isMondelez&&company.id!=="all"&&company.id!=="other")updates=eventsForAliases(module,company.brands.filter(i=>i.id!=="all").flatMap(i=>i.aliases));else if(!isMondelez&&company.id==="other")updates=eventsForAliases(module,[],allKnown);else updates=eventsForAliases(module,[]);
  updates=byEventDate(updates);const profile=brand?.entityFile?getEntityByFile(brand.entityFile):undefined,returnTo=href(module,company.id,brand?.id);
  return <><section className="module-hero"><span className="eyebrow">{meta.english}</span><h1>{meta.title}</h1><p>{meta.description}</p><div className="filter-label">{isMondelez?"COMPANY":"PARENT COMPANY"}</div><div className="filter-row">{isMondelez?<Link className="active" href={href(module,company.id)}>{company.label}</Link>:companies.map(item=><Link key={item.id} className={item.id===company.id?"active":""} href={href(module,item.id)}>{item.label}</Link>)}</div><div className="filter-label">BRAND</div><div className="filter-row">{company.brands.map(item=><Link key={item.id} className={item.id===brand?.id?"active":""} href={href(module,company.id,item.id)}>{item.label}</Link>)}</div></section>{profile&&<section className="section profile-section"><BrandProfile entity={profile}/></section>}{brand&&brand.id!=="all"&&!brand.kind&&!profile&&<section className="section"><div className="empty">该品牌已在筛选器中保留，但现有 Wiki 暂无独立 Brand Profile；下方仅展示可追溯的相关动态。</div></section>}{brand?.kind==="other"&&<section className="section"><div className="empty">“其他”用于收录尚未归入既有品牌的内容；当前没有可展示的独立品牌简介。</div></section>}<section className="section"><div className="section-title"><div><span className="eyebrow">Event timeline</span><h2>{brand&&brand.id!=="all"?`${brand.label} Brand Updates`:`${meta.title} Updates`}</h2><p>按活动日期、报道日期、日期待确认的优先级排序。</p></div></div>{updates.length?<div className="article-grid">{updates.map(article=><ArticleCard key={article.id} article={article} returnTo={returnTo}/>)}</div>:<div className="empty">当前筛选下没有可显示的独立动态。</div>}</section></>;
}

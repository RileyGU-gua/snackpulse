import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/cards";
import { BrandProfile } from "@/components/brand-profile";
import { byEventDate, eventsForAliases, getByModule, getEntityByFile, getModules, moduleInfo, type Article, type ModuleKey } from "@/lib/content";
import { indexedCompanies } from "@/lib/brand-metadata";

function href(module: string, company?: string, brand?: string) { const q=new URLSearchParams(); if(company)q.set("company",company); if(brand)q.set("brand",brand); return `/module/${encodeURIComponent(module)}${q.size?`?${q}`:""}`; }

export default async function ModulePage({params,searchParams}:{params:Promise<{module:string}>;searchParams:Promise<{company?:string;brand?:string}>}) {
  const value=decodeURIComponent((await params).module) as ModuleKey; if(!getModules().some(([key])=>key===value)) notFound(); const query=await searchParams, meta=moduleInfo(value);
  if(value!=="01｜亿滋动态" && value!=="02｜竞品动态") return <><section className="module-hero"><span className="eyebrow">{meta.english}</span><h1>{meta.title}</h1><p>{meta.description}</p></section><section className="section"><div className="article-grid">{getByModule(value).filter(a=>a.type!=="entity").map(a=><ArticleCard key={a.id} article={a}/>)}</div></section></>;
  const companies=indexedCompanies(value); const isMondelez=value==="01｜亿滋动态"; const company=isMondelez?companies[0]:companies.find(item=>item.id===query.company)||companies[0]; const brand=company.brands.find(item=>item.id===query.brand)||company.brands.find(item=>item.id==="all");
  const allKnownBrands=isMondelez?company.brands.filter(item=>item.id!=="all"&&item.id!=="other").flatMap(item=>item.aliases):companies.filter(item=>item.id!=="all"&&item.id!=="other").flatMap(item=>item.brands.filter(brand=>brand.id!=="all").flatMap(brand=>brand.aliases));
  let updates:Article[];
  if(brand?.kind==="other") updates=eventsForAliases(value,[],allKnownBrands);
  else if(brand && brand.id!=="all") updates=eventsForAliases(value,brand.aliases);
  else if(!isMondelez && company.id!=="all" && company.id!=="other") updates=eventsForAliases(value,company.brands.filter(item=>item.id!=="all").flatMap(item=>item.aliases));
  else if(!isMondelez && company.id==="other") updates=eventsForAliases(value,[],allKnownBrands);
  else updates=eventsForAliases(value,[]);
  updates=byEventDate(updates); const profile=brand?.entityFile?getEntityByFile(brand.entityFile):undefined; const returnTo=href(value,isMondelez?company.id:company.id,brand?.id);
  return <><section className="module-hero"><span className="eyebrow">{meta.english}</span><h1>{meta.title}</h1><p>{meta.description}</p><div className="filter-label">{isMondelez?"COMPANY":"PARENT COMPANY"}</div><div className="filter-row">{isMondelez?<Link className="active" href={href(value,company.id)}>{company.label}</Link>:companies.map(item=><Link key={item.id} className={item.id===company.id?"active":""} href={href(value,item.id)}>{item.label}</Link>)}</div><div className="filter-label">BRAND</div><div className="filter-row">{company.brands.map(item=><Link key={item.id} className={item.id===brand?.id?"active":""} href={href(value,company.id,item.id)}>{item.label}</Link>)}</div></section>{profile&&<section className="section profile-section"><BrandProfile entity={profile}/></section>}{brand&&brand.id!=="all"&&!brand.kind&&!profile&&<section className="section"><div className="empty">该品牌已在筛选器中保留，但现有 Wiki 暂无独立 Brand Profile；下方仅展示可追溯的相关动态。</div></section>}{brand?.kind==="other"&&<section className="section"><div className="empty">“其他”用于收录尚未归入既有品牌的内容；当前没有可展示的独立品牌简介。</div></section>}<section className="section"><div className="section-title"><div><span className="eyebrow">Event timeline</span><h2>{brand&&brand.id!=="all"?`${brand.label} Brand Updates`:`${meta.title} Updates`}</h2><p>按活动日期、报道日期、日期待确认的优先级排序。</p></div></div>{updates.length?<div className="article-grid">{updates.map(article=><ArticleCard key={article.id} article={article} returnTo={returnTo}/>)}</div>:<div className="empty">当前筛选下没有可显示的独立动态。</div>}</section></>;
}

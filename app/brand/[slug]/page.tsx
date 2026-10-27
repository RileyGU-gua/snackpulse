import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ArticleCard } from "@/components/cards";
import { BrandProfile } from "@/components/brand-profile";
import { getArticle, getEntities, relatedToEntity, moduleInfo } from "@/lib/content";

export function generateStaticParams(){return getEntities().map(entity=>({slug:entity.id}));}
export const dynamicParams=false;
export default async function BrandPage({params}:{params:Promise<{slug:string}>}) { const entity=getArticle((await params).slug); if(!entity || entity.type!=="entity") notFound(); const related=relatedToEntity(entity), meta=moduleInfo(entity.module); return <><div className="breadcrumb"><Link href="/">Home</Link><span> / </span><Link href={`/module/${encodeURIComponent(entity.module)}`}>{meta.title}</Link><span> / </span>{entity.title}</div><section className="detail"><header className="detail-head brand-head"><div className="detail-meta"><span className="pill">{meta.title}</span><span>Brand Intelligence</span></div><h1>{entity.title}</h1><p>{entity.summary}</p><Link className="read-link" href={`/module/${encodeURIComponent(entity.module)}`}><ArrowLeft size={16}/> 返回 {meta.title}</Link></header><div className="brand-profile"><BrandProfile entity={entity}/></div><section className="related"><span className="eyebrow">Event timeline</span><h2>Brand Updates</h2><p>按活动日期、报道日期、日期待确认的优先级排序。</p>{related.length?<div className="article-grid">{related.map(article=><ArticleCard key={article.id} article={article}/>)}</div>:<div className="empty">知识库中尚未找到与该实体建立内链的独立动态。</div>}</section></section></> }

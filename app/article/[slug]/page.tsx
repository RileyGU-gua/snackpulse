import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getArticle, moduleInfo } from "@/lib/content";
import { Markdown } from "@/components/markdown";

export default async function ArticlePage({params,searchParams}:{params:Promise<{slug:string}>;searchParams:Promise<{from?:string}>}) { const article=getArticle((await params).slug); if(!article) notFound(); const from=(await searchParams).from; const mod=moduleInfo(article.module); const back=from?.startsWith("/module/")?from:`/module/${encodeURIComponent(article.module)}`; return <><div className="breadcrumb"><Link href="/">Home</Link> <span> / </span><Link href={back}>{mod.title}</Link><span> / </span>{article.title}</div><section className="detail"><header className="detail-head"><div className="detail-meta"><span className="pill">{article.activityType}</span><span>{article.date.label}：{article.date.value}</span>{article.sourceCount? <span>{article.sourceCount} 份来源</span>:null}</div><h1>{article.title}</h1><p>{article.summary}</p><Link className="read-link" href={back}><ArrowLeft size={16}/> 返回 {mod.title}</Link></header><Markdown body={article.body}/></section></> }

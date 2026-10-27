import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getArticle, getArticles, moduleInfo } from "@/lib/content";
import { Markdown } from "@/components/markdown";
import { ArticleBackLink } from "@/components/article-back-link";

export function generateStaticParams(){return getArticles().map(article=>({slug:article.id}));}
export const dynamicParams=false;
export default async function ArticlePage({params}:{params:Promise<{slug:string}>}) { const article=getArticle((await params).slug); if(!article) notFound(); const mod=moduleInfo(article.module); const back=`/module/${encodeURIComponent(article.module)}`; return <><div className="breadcrumb"><Link href="/">Home</Link> <span> / </span><Link href={back}>{mod.title}</Link><span> / </span>{article.title}</div><section className="detail"><header className="detail-head"><div className="detail-meta"><span className="pill">{article.activityType}</span><span>{article.date.label}：{article.date.value}</span>{article.sourceCount? <span>{article.sourceCount} 份来源</span>:null}</div><h1>{article.title}</h1><p>{article.summary}</p><Suspense fallback={null}><ArticleBackLink fallback={back} label={mod.title}/></Suspense></header><Markdown body={article.body}/></section></> }

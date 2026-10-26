import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import type { Article, ModuleKey } from "@/lib/content";
import { moduleInfo } from "@/lib/content";

export function ArticleCard({article, returnTo}:{article:Article;returnTo?:string}) { const meta=moduleInfo(article.module); const href=`/article/${article.id}${returnTo?`?from=${encodeURIComponent(returnTo)}`:""}`; return <Link href={href} className="article-card"><div className="card-meta"><span className="pill">{article.activityType}</span><time>{article.date.value}</time></div><h3>{article.title}</h3><p>{article.summary || "该页面尚待补充摘要。"}</p><span className="card-link">{article.date.label} · 阅读分析 <ArrowUpRight size={15}/></span></Link>; }
export function ModuleCard({module, count}:{module:ModuleKey;count:number}) { const meta=moduleInfo(module); return <Link href={`/module/${encodeURIComponent(module)}`} className={`module-card module-${module.slice(0,2)}`}><span className="module-number">{module.startsWith("综合")?"05":module.slice(0,2)}</span><FileText size={22}/><p>{meta.english}</p><h3>{meta.title}</h3><span>{meta.description}</span><footer>{count} 篇知识页面 <ArrowUpRight size={16}/></footer></Link>; }

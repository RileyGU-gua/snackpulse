"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { getArticles, moduleInfo } from "@/lib/content";

export function SearchBrowser(){const params=useSearchParams(),q=params.get("q")?.trim()||"",results=q?getArticles().filter(a=>(a.title+a.summary+a.body+a.tags.join(" ")).toLowerCase().includes(q.toLowerCase())).slice(0,30):[];return <section className="search-wrap"><span className="eyebrow">Knowledge search</span><h1>Search the signal.</h1><form className="search-form"><input name="q" defaultValue={q} placeholder="品牌、Campaign、行业主题或正文关键词" autoFocus/><button><Search size={18}/></button></form>{q&&<p className="muted">“{q}” 找到 {results.length} 篇知识页面</p>}<div className="article-grid">{results.map(a=><Link href={`/article/${a.id}`} className="article-card" key={a.id}><div className="card-meta"><span className="pill">{moduleInfo(a.module).title}</span><time>{a.date.value}</time></div><h3>{a.title}</h3><p>{a.summary}</p></Link>)}</div>{q&&!results.length?<div className="empty">未找到匹配页面。请尝试品牌、方法或更短的关键词。</div>:null}</section>}

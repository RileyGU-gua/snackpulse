import Link from "next/link";
import { Search, Cookie, ArrowUpRight } from "lucide-react";
import { getModules } from "@/lib/content";

export function Mark() { return <span className="mark"><Cookie size={19}/></span>; }
export function Header() { return <header className="site-header"><Link href="/" className="wordmark"><Mark/><span>SnackPulse<small>FMCG Marketing Intelligence</small></span></Link><nav>{getModules().slice(0,4).map(([key, meta])=><Link key={key} href={`/module/${encodeURIComponent(key)}`}>{meta.title}</Link>)}</nav><Link href="/search" className="search-button"><Search size={17}/> Search</Link></header>; }
export function Footer() { return <footer><div><Mark/><strong>SnackPulse</strong><span>Personal FMCG research, compiled from a private Obsidian knowledge base.</span></div><p>Content is evidence-aware. Original sources are linked, not republished.</p></footer>; }
export function SectionTitle({eyebrow, title, copy, action}:{eyebrow:string;title:string;copy?:string;action?:React.ReactNode}){return <div className="section-title"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy&&<p>{copy}</p>}</div>{action}</div>}
export function ReadLink({href}:{href:string}) { return <Link className="read-link" href={href}>Explore <ArrowUpRight size={16}/></Link>; }

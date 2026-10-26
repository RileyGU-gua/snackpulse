import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { findLinked, slug, sourceUrl } from "@/lib/content";

function inline(text: string) {
  const pieces = text.split(/(\[\[[^\]]+\]\]|\[[^\]]+\]\([^)]*\)|`[^`]+`|\*\*[^*]+\*\*)/g);
  return pieces.map((part, i) => {
    const wiki = part.match(/^\[\[([^\]|#]+)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]$/);
    if (wiki) {
      const label = wiki[3] || wiki[1];
      if (wiki[1].startsWith("Raw sources/")) { const url = sourceUrl(wiki[1]); return url ? <a key={i} href={url} target="_blank" rel="noreferrer" className="source-link">{label}<ExternalLink size={12}/></a> : <span key={i} className="muted">{label}</span>; }
      const target = findLinked(wiki[1]);
      return target ? <Link key={i} href={`/article/${target.id}${wiki[2] ? `#${encodeURIComponent(wiki[2])}` : ""}`} className="wiki-link">{label}</Link> : <span key={i} className="muted">{label}</span>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]*)\)$/);
    if (link) return <a key={i} href={link[2]} target="_blank" rel="noreferrer" className="source-link">{link[1]}<ExternalLink size={12}/></a>;
    if (part.startsWith("**")) return <strong key={i}>{part.slice(2,-2)}</strong>;
    if (part.startsWith("`")) return <code key={i}>{part.slice(1,-1)}</code>;
    return part;
  });
}

function table(rows: string[], key: number) {
  const cells = (line: string) => line.split("|").slice(1,-1).map(x => x.trim());
  const header = cells(rows[0]); const body = rows.slice(2).map(cells);
  return <div className="table-wrap" key={key}><table><thead><tr>{header.map((c,i)=><th key={i}>{inline(c)}</th>)}</tr></thead><tbody>{body.map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j}>{inline(c)}</td>)}</tr>)}</tbody></table></div>;
}

export function Markdown({ body }: { body: string }) {
  const lines = body.split("\n"); const output: React.ReactNode[] = [];
  for (let i=0; i<lines.length;) {
    const line=lines[i];
    if (!line.trim()) { i++; continue; }
    if (line.startsWith("|")) { const rows=[]; while(i<lines.length && lines[i].startsWith("|")) rows.push(lines[i++]); output.push(table(rows, i)); continue; }
    const heading=line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) { const text=heading[2]; const id=text.replace(/[*`]/g,"").replace(/\s+/g,"-"); const level=heading[1].length; const content=inline(text); output.push(level===1?<h1 id={id} key={i}>{content}</h1>:level===2?<h2 id={id} key={i}>{content}</h2>:level===3?<h3 id={id} key={i}>{content}</h3>:<h4 id={id} key={i}>{content}</h4>); i++; continue; }
    if (line.startsWith("> ")) { output.push(<blockquote key={i}>{inline(line.slice(2))}</blockquote>); i++; continue; }
    if (/^[-*]\s+/.test(line)) { const items=[]; while(i<lines.length && /^[-*]\s+/.test(lines[i])) items.push(<li key={i}>{inline(lines[i++].replace(/^[-*]\s+/,""))}</li>); output.push(<ul key={i}>{items}</ul>); continue; }
    if (/^\d+\.\s+/.test(line)) { const items=[]; while(i<lines.length && /^\d+\.\s+/.test(lines[i])) items.push(<li key={i}>{inline(lines[i++].replace(/^\d+\.\s+/,""))}</li>); output.push(<ol key={i}>{items}</ol>); continue; }
    output.push(<p key={i}>{inline(line)}</p>); i++;
  }
  return <article className="markdown">{output}</article>;
}

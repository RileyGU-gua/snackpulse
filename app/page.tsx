import Link from "next/link";
import { Compass } from "lucide-react";
import { getByModule, getModules } from "@/lib/content";
import { ModuleCard } from "@/components/cards";

export default function Home() {
  const modules=getModules();
  const strategic=modules.find(([key])=>key==="综合与决策");
  return <section className="home-modules"><div className="module-grid home-grid">{modules.slice(0,4).map(([key])=><ModuleCard key={key} module={key} count={getByModule(key).length}/>)}</div>{strategic&&<Link href={`/module/${encodeURIComponent(strategic[0])}`} className="strategic-link"><Compass size={18}/><span>综合与决策</span><small>Strategic Insights</small></Link>}</section>;
}

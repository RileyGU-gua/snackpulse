import snapshot from "@/data/content-snapshot.json";

export type ModuleKey = "01｜亿滋动态" | "02｜竞品动态" | "03｜行业动态" | "04｜营销热点" | "综合与决策";
export type PrecisionDate = { value: string; label: "活动日期" | "报道日期" | "日期待确认"; sort: number | null };
export type Article = { id:string; title:string; relativePath:string; body:string; summary:string; module:ModuleKey; tags:string[]; updated?:string; created?:string; type?:string; sourceCount?:number; date:PrecisionDate; activityType:string; sourceUrls:Record<string,string> };
export type BrandOption = { name:string; entity?:Article };
export type CompanyOption = { name:string; entity:Article; brands:BrandOption[] };

const modules:Record<ModuleKey,{title:string;english:string;description:string}>={
  "01｜亿滋动态":{title:"亿滋动态",english:"Mondelēz Brand Intelligence",description:"追踪亿滋及旗下品牌的产品、渠道、场景与增长判断。"},
  "02｜竞品动态":{title:"竞品动态",english:"Competitor Intelligence",description:"从竞品动作中识别品牌、品类与渠道的竞争信号。"},
  "03｜行业动态":{title:"行业动态",english:"Industry Intelligence",description:"理解中国零食市场的消费者、品类、渠道与竞争变化。"},
  "04｜营销热点":{title:"营销热点",english:"Marketing Playbook",description:"从真实案例中提炼可迁移的营销策略与衡量方法。"},
  "综合与决策":{title:"综合与决策",english:"Strategic Insights",description:"跨品牌比较、战略判断与面试决策框架。"}
};
const articles=snapshot.articles as Article[];
export const slug=(v:string)=>Buffer.from(v).toString("base64url");
export const unslug=(v:string)=>Buffer.from(v,"base64url").toString();
export const moduleInfo=(key:ModuleKey)=>modules[key];
export const getModules=()=>Object.entries(modules) as [ModuleKey,typeof modules[ModuleKey]][];
export const getArticles=()=>articles;
export const getArticle=(id:string)=>articles.find(item=>item.id===id);
export const byEventDate=<T extends Article>(items:T[])=>[...items].sort((a,b)=>(b.date.sort??-Infinity)-(a.date.sort??-Infinity)||a.title.localeCompare(b.title,"zh-CN"));
export const getByModule=(module:ModuleKey)=>byEventDate(articles.filter(item=>item.module===module));
export const getEntities=()=>articles.filter(item=>item.relativePath.startsWith("人物与组织/"));
export const getEntityByFile=(filename?:string)=>filename?getEntities().find(item=>item.relativePath.split("/").pop()?.replace(/\.md$/,"")===filename):undefined;
export const findLinked=(title:string)=>articles.find(a=>a.title===title||a.relativePath.split("/").pop()?.replace(/\.md$/,"")===title);
export const profileSummary=(body:string)=>{const m=body.match(/##\s+摘要\s*\n+([\s\S]*?)(?=\n##\s|$)/);return (m?.[1]||body).replace(/\s*\[\[[^\]]+\]\]/g,"").replace(/\*\*/g,"").replace(/\s+/g," ").trim().slice(0,320)};
export const relatedToEntity=(entity:Article)=>{const filename=entity.relativePath.split("/").pop()?.replace(/\.md$/,"")||"";const short=entity.title.split("（")[0].trim();return byEventDate(articles.filter(a=>a.id!==entity.id&&a.type!=="entity"&&a.relativePath.startsWith("主题/")&&(a.body.includes(`[[${filename}]]`)||a.body.includes(`[[${short}]]`)||a.title.includes(short))));};
export const sourceUrl=(rawLink:string)=>articles.flatMap(article=>Object.entries(article.sourceUrls)).find(([key])=>key===rawLink||key===`${rawLink}.md`)?.[1];
export function eventsForAliases(module:"01｜亿滋动态"|"02｜竞品动态",aliases:string[],excluded:string[]=[]){const events=getByModule(module).filter(a=>a.type!=="entity"&&a.relativePath.startsWith("主题/"));const match=(a:Article,keys:string[])=>keys.some(key=>a.title.includes(key)||a.body.includes(`[[${key}]]`)||a.body.includes(key));return !aliases.length?(excluded.length?events.filter(a=>!match(a,excluded)):events):events.filter(a=>match(a,aliases));}
export function companiesFor(module:"01｜亿滋动态"|"02｜竞品动态"){const entities=getEntities().filter(a=>a.module===module);return entities.filter(a=>a.tags.includes("公司")||/中国|国际|休闲食品/.test(a.title)).map(entity=>({name:entity.title.split("（")[0],entity,brands:[]}));}
export function eventsFor(module:"01｜亿滋动态"|"02｜竞品动态",brand?:string){const events=getByModule(module).filter(a=>a.type!=="entity"&&a.relativePath.startsWith("主题/"));return brand?events.filter(a=>a.title.includes(brand)||a.body.includes(`[[${brand}]]`)):events;}

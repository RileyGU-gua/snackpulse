import { Suspense } from "react";
import { getModules, type ModuleKey } from "@/lib/content";
import { ModuleBrowser } from "@/components/module-browser";

export function generateStaticParams(){return getModules().map(([module])=>({module}));}
export const dynamicParams=false;
export default async function ModulePage({params}:{params:Promise<{module:string}>}){return <Suspense fallback={<section className="module-hero"/>}><ModuleBrowser module={decodeURIComponent((await params).module) as ModuleKey}/></Suspense>;}

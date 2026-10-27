import { Suspense } from "react";
import { SearchBrowser } from "@/components/search-browser";

export default function SearchPage(){return <Suspense fallback={<section className="search-wrap"/>}><SearchBrowser/></Suspense>}

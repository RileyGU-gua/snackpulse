"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function ArticleBackLink({fallback,label}:{fallback:string;label:string}){const from=useSearchParams().get("from");const href=from?.startsWith("/module/")?from:fallback;return <Link className="read-link" href={href}><ArrowLeft size={16}/> 返回 {label}</Link>}

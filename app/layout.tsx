import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "@/components/site-shell";

export const metadata: Metadata = { title: "SnackPulse | FMCG Marketing Intelligence", description: "Explore the strategy behind every snack." };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="zh-CN"><body><Header/><main>{children}</main><Footer/></body></html>; }

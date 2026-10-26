#!/usr/bin/env node
import fs from "node:fs";
const text=fs.readFileSync("data/content-snapshot.json","utf8");
const prohibited=[/\/Users\/[^\s"']+/i,/Raw sources\//i,/\.codex\//i,/sk-[A-Za-z0-9_-]{12,}/,/AKIA[0-9A-Z]{16}/,/BEGIN (?:RSA |EC )?PRIVATE KEY/];
const hits=prohibited.filter(pattern=>pattern.test(text)).map(String);
if(hits.length){console.error("Public-content audit failed:",hits.join(", "));process.exit(1)}
console.log("Public-content audit passed: no local paths, Raw Sources bodies, or common secrets found.");

# SnackPulse deployment

## Public-content boundary

`data/content-snapshot.json` is the only Wiki-derived content committed for deployment. It contains published Wiki analysis, metadata, event dates and external source URLs. It never copies `Raw sources/`, attachments, local file paths or the Vault processing state.

Before a release, run:

```bash
npm run content:export
npm run content:audit
npm run build
```

`content:audit` fails if the snapshot contains absolute macOS paths, Raw Sources body content, common secret patterns, or internal Vault paths.

## GitHub and Vercel

1. Create a **private** GitHub repository without adding a README.
2. In this folder run `git init`, `git add .`, `git commit -m "Prepare SnackPulse for Vercel"`, add the private repository remote, then push.
3. In Vercel: **Add New → Project → Import** the private GitHub repository.
4. Keep Framework Preset as **Next.js** and Build Command as `npm run build`; do not add `SNACKPULSE_VAULT`.
5. Click **Deploy**. Vercel supplies the public HTTPS URL.

## Cloudflare Pages

Cloudflare builds from the committed public snapshot; it must **not** run `content:export`, because the private Obsidian Vault is not available in Cloudflare.

- Framework preset: **Next.js (Static HTML Export)** or **None**
- Build command: `npm run content:audit && npm run build:pages`
- Build output directory: `out`
- Node version: 20 or newer

The static export pre-generates all current article, brand and module pages. Brand filters and search read URL parameters in the browser, so direct links, refresh, and browser history continue to work without a server.

## Updating content

1. Update and review `The wiki/` in Obsidian.
2. Run `npm run content:export` from this project.
3. Run `npm run content:audit && npm run build`.
4. Commit and push the updated `data/content-snapshot.json`; Vercel redeploys automatically.

# Ahmed Jaffar

Custom personal website for https://ahmedjaffar.ca.

## Stack

Semantic HTML, CSS, and native HTML details/summary for the interactive career timeline. A small vanilla script adds optional scroll animation; content remains visible if JavaScript fails. No framework, npm dependencies, or build step.

## Run locally

```sh
python3 -m http.server 8000
```

Open http://localhost:8000.

## Files

- `index.html`: public profile, career timeline, selected projects, and contact links.
- `styles.css`: responsive dark theme and interactions.
- `script.js`: scroll-reveal animation for sections (skipped entirely if reduced motion is on).
- `ahmed-portrait.png`: GPT-generated portrait based on Ahmed's supplied public photo (source file, not served directly).
- `ahmed-portrait.jpg` / `ahmed-portrait.webp`: compressed versions of the portrait actually loaded by the site (98% smaller than the PNG).
- `og-image.jpg`: social share preview image (Open Graph / Twitter card).
- `robots.txt` / `sitemap.xml`: search engine crawl hints.
- `CNAME`: custom domain for GitHub Pages.
- `.nojekyll`: serve static files without Jekyll processing.

## Deploy with GitHub Pages

In repository Settings > Pages, choose **Deploy from a branch**, select **main** and **/(root)**, then save. Set the custom domain to `ahmedjaffar.ca`.

At GoDaddy, replace the website A records for `@` with the four GitHub Pages addresses listed in GitHub's current documentation. Set `www` to `ajaffar1.github.io`. Preserve unrelated mail, verification, and nameserver records. Enable Enforce HTTPS in GitHub Pages once the certificate is ready.

After Pages is connected, commits to `main` automatically publish the website. GoDaddy manages DNS; GitHub Pages serves the files.

Documentation: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Content guidelines

Keep client details, financial figures, internal work metrics, private contact information, and resume PDFs out of this public repository. Manager promotion: July 2026. Older resumes do not override the current role. No location mentions or em dashes in website copy.

## Current migration state

The existing website remains hosted on Sites until GitHub Pages is configured, verified, and the domain is switched. Merely adding CNAME to this repository does not update GoDaddy DNS.

## September 30, 2026 refresh

Typography-led dark design, lime accents, clearer project names, larger small text, mobile layouts, keyboard focus, and a custom 404 page. AI portrait assets are retained as source files but no longer referenced by the site or social metadata. Social cards use text summaries.

SEO: descriptive title and description, canonical URL, matching social metadata, linked WebSite/ProfilePage/Person structured data, sitemap and robots.txt. Existing public profile claims are preserved. These changes do not guarantee rankings or establish Google indexing.

Publishing blocker: the connected Sites project still reports https://ahmedjaffar.ca as its live URL. This environment cannot reach git.chatgpt-team.site (proxy returns HTTP 403), and the Sites workflow scripts are unavailable here. This branch is a reviewed migration-source update, not a deployed Sites revision. Allow the Sites source host in the cloud environment and restore the Sites workflow runtime before publishing to that existing project. Do not switch DNS just to publish this refresh.

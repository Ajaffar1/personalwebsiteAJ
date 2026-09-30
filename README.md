# Ahmed Jaffar

Custom personal website for https://ahmedjaffar.ca.

## Stack

Semantic HTML, CSS, and native HTML details/summary for the interactive career timeline. A small vanilla script handles the scroll-reveal animation. No framework, npm dependencies, or build step.

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

## Interactive profile refresh

Keeps the existing single portrait and section layout, with a more cohesive dark, blue, and lime design. No new generated images are used. Adds sticky section navigation, career year shortcuts, expand/collapse controls, and project filters with accessible status feedback. Native career chapters and all project content still work without JavaScript. Motion respects reduced-motion preferences; portrait sizing and enlarged text remain within the mobile viewport.

SEO improvements include descriptive metadata, canonical URL, social image alt text, linked WebSite/ProfilePage/Person structured data, a source-code project ItemList, meaningful headings, repository-grounded project descriptions, robots.txt, sitemap.xml, and a noindex 404 page. These improvements cannot guarantee rankings, and Google Search Console indexing has not been verified.

Validation: Chromium at 320, 375, 768, and 1440px verified the existing photo, horizontal overflow, timeline year navigation and expand/collapse, project filtering, active navigation, anchor targets, structured-data parsing, and script errors. Native content and chapters work with JavaScript disabled. Reduced motion and 200% text enlargement checks passed.

Publishing remains blocked: the live domain is on the connected Sites project, not this GitHub migration repository. This environment's enforced network policy denies git.chatgpt-team.site and api.github.com with HTTP 403, and the bundled Sites publishing workflow is unavailable. GitHub branch pushes work. Available GoDaddy tools only search domain names; they cannot manage DNS or publish websites. Restore Sites publishing runtime and access to its source host to publish to the existing Site. Do not change DNS to work around this restriction.

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

Published successfully to the existing Sites project on October 1, 2026. The latest deployed source commit is 182cd6dffb318c9800f9fd29d329b0ba368e613a, saved as Site version 15. Both ahmedjaffar.ca and www.ahmedjaffar.ca report active custom domains and active TLS. No DNS change was needed. This GitHub repository remains a migration copy; merging its PR does not itself deploy the Sites project.

## Project notes and navigation refinements

Adds three repository-grounded project pages under /projects/, with unique titles and descriptions, canonical URLs, breadcrumb structured data, and sitemap entries. Homepage cards now link to project notes; each page links to its repository and the other projects. Career chapters have shareable fragment links that open the matching chapter and work with browser history. A reading-progress bar and subtle desktop hover lighting refine the existing design.

Project routes, deep links, browser history, internal links, metadata, sitemap, mobile rendering, and 200% text checks passed alongside the existing interaction tests. The current photo remains unchanged.

## Career explorer update

Removed visible chapter permalink links. The chronological year rail now includes role labels; earlier/later controls navigate a focused work panel, and View all roles restores the complete timeline. Selected roles have short work-focused descriptions grounded in the existing career copy. Existing career URL fragments and browser history remain supported. Native summary controls continue working without JavaScript. Role selection, navigation boundaries, view modes, keyboard input, history, mobile layouts, and 200% text checks passed.

## Search title and favicon

Homepage title: Ahmed Jaffar | Manager at Deloitte. Matching description and profile structured data highlight the current role; the hero displays it prominently. Historical career chapters carry data-nosnippet so Google does not use their text for a current-role snippet. Crawlable AJ monogram favicon files replace the embedded data-URI icon across all pages. Google must recrawl before search results can reflect these changes, and may independently rewrite titles/snippets.

## Simplified company timeline

Current homepage title: Ahmed Jaffar | Technology Advisory & Software Development. Description and profile structured data match the broader technology positioning; actual employment facts still identify Manager at Deloitte. Replaces the career rail, stepper, status text, and nested work panels with four company-wordmark rows showing roles and dates. One concise description expands at a time, with native details/summary fallback. Company markers use typographic labels rather than additional photos. Deep links, mobile layouts, keyboard controls, and enlarged text passed validation.

## Horizontal glass timeline

Chronological horizontal cards use translucent surfaces, backdrop blur, layered highlights, and pointer-driven lighting. Supports native horizontal scrolling and mobile swipe, Previous/Next controls, arrow keys and Home/End on summaries, existing career fragments, and native details without JavaScript. Reduced-motion preferences disable animated transitions; a solid-surface fallback supports browsers without backdrop blur. Navigation boundaries, deep links, native behavior, 320–1440px layouts, and enlarged text passed checks.

## Editorial redesign

A cohesive light editorial theme replaces the accumulated neon, tilted-photo, coloured-panel, and heavy-glass styles. Serif identity and section headings pair with restrained sans-serif body text, consistent spacing, fine borders, and muted green accents. The existing portrait is displayed straight; repetitive slogans are removed. The horizontal timeline retains subtle translucent cards and accessible navigation. Homepage, project notes, and 404 page share the same theme. Unused pointer-effect code is removed.

320–1440px timeline checks, keyboard navigation, deep links, reduced-motion/native behavior, 200% text, project filters, project routes, portrait loading, and structured-data checks passed.

## Refined dark theme and advisory copy

Restores the distinctive charcoal and lime palette with clean typography, straight portrait presentation, consistent spacing, and dark glass timeline surfaces. Homepage copy and search/social descriptions connect technology advisory with R&D investment, CapEx/OpEx planning, and non-dilutive funding opportunities, without adding financial outcomes. The existing photo and accessible horizontal timeline remain. Mobile/desktop layouts, timeline controls, keyboard navigation, native behavior, enlarged text, project pages, portrait loading, structured data, and script syntax passed checks.

## Expressive visual identity

Adds oversized lime-gradient identity typography, a layered portrait frame, a fine hero grid, blue/lime ambient lighting, luminous glass timeline cards, and refined investment/project/contact surfaces. Responsive layouts keep enlarged text and timeline controls usable; reduced-motion preferences are preserved. Timeline interaction, keyboard/deep-link/native behavior, 320–1440px layouts, 200% text, script syntax, and diff checks passed.

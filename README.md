# Ahmed Jaffar

Custom personal website for https://ahmedjaffar.ca.

## Stack

Semantic HTML, CSS, and native HTML details/summary for the interactive career timeline. No framework, npm dependencies, or build step.

## Run locally

```sh
python3 -m http.server 8000
```

Open http://localhost:8000.

## Files

- `index.html`: public profile, career timeline, selected projects, and contact links.
- `styles.css`: responsive dark theme and interactions.
- `ahmed-portrait.png`: GPT-generated portrait based on Ahmed's supplied public photo.
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

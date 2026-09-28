# hdpublishing.org

The public website of H.D. Publishing. Static HTML and CSS, no build step. Every page is a
folder with an `index.html` so addresses end in a slash and never in `.html`.

```
index.html                       Home
books/index.html                 The list (available, forthcoming, paper goods)
books/the-mirror-clause/         Product page (one folder per title)
writer/index.html                The Writer: the app and the ninety-day program
about/index.html                 The house, standards, seal + press kit, contact
authors/phoenix-t-bird/          Author page (one folder per author)
privacy/index.html               Privacy notice for the static site
404.html                         Not-found page (GitHub Pages serves it automatically)
assets/site.css                  The one stylesheet; palette and type at the top
assets/site.js                   Shop/accounts link base, mobile nav, theme toggle
assets/brand/                    Seal, lockup, favicons (copied from ../brand/logo)
assets/covers/                   Web-size cover JPEGs, 600 and 1200 px wide
CNAME, robots.txt, sitemap.xml   Hosting and search files
```

## Preview locally

Paths are root-relative (`/assets/...`), so open the site through a local server, not as files:

```bash
python3 -m http.server 8790 --directory ~/HD_Publishing/site
```

then visit http://localhost:8790/.

## Where the shop address lives

Buy buttons carry `data-shop="products/<handle>"`. `assets/site.js` rewrites them to
`SHOP_BASE + path`, so the storefront address is set in one line at the top of that file.
Same for `data-accounts` (author sign-in at accounts.hdpublishing.org). Change the constant,
not the pages.

## Adding a book

1. Put a web-size cover in `assets/covers/` (`sips -Z 1200 ... --out <handle>-1200.jpg`, and a 600).
2. Copy `books/the-mirror-clause/` to `books/<handle>/` and replace title, subtitle, author,
   prices, description, details table, ISBNs, and the JSON-LD block at the top of the file.
3. Add the tile to `books/index.html` (move it from Forthcoming to Available when it ships)
   and, if it is the lead title, swap the feature band on `index.html`.
4. Add the URL to `sitemap.xml`.

Forthcoming titles without final art use the `cover-type` placeholder (a typographic tile), so
nothing on the site pretends to be a cover that does not exist yet.

## Hosting plan

Recommended: this folder is its own GitHub repository published with GitHub Pages at the apex
`hdpublishing.org`, and the Shopify storefront moves to `shop.hdpublishing.org`. Order of
operations, so the store never goes dark:

1. Create the repository (private is fine for Pages on a paid plan; public otherwise), push
   this folder, enable Pages from `main` / root. Pages reads `CNAME` for the custom domain.
2. In Shopify: Settings → Domains → add `shop.hdpublishing.org` and make it the primary
   domain. Shopify gives a CNAME target (`shops.myshopify.com`). Keep
   `accounts.hdpublishing.org` as it is.
3. At Squarespace Domains (DNS for hdpublishing.org):
   - `shop`  CNAME → `shops.myshopify.com`
   - apex `@` A records → GitHub Pages: 185.199.108.153, 185.199.109.153,
     185.199.110.153, 185.199.111.153 (remove Shopify's apex A record 23.227.38.65)
   - `www` CNAME → `<github-user>.github.io` and turn on "Enforce HTTPS" in Pages.
   Do not touch the MX, `resend._domainkey`, or `send` records; email depends on them.
4. Set `SHOP_BASE` in `assets/site.js` to `https://shop.hdpublishing.org/` (already the
   default) and push.
5. Wait for the Pages certificate (minutes to an hour), then check https://hdpublishing.org,
   https://shop.hdpublishing.org, and an ebook checkout end to end.

Alternative if the store must stay at the apex: publish this site at `www.hdpublishing.org`
instead (Pages CNAME `www.hdpublishing.org`; Shopify keeps `@`), and point every "Shop"
link at `https://hdpublishing.org/`. Less tidy, but no DNS risk to the store.

## Brand rules used here

Ink #1C1A17, ivory #F4EFE6, claret #7B2D26. PT Sans for the interface, PT Serif for book copy,
headings in Trebuchet MS where the visitor has it (the seal's face), falling back to PT Sans.
The full seal is never shown below 120 px; the header uses the standard cut. In dark mode the
reversed seal is used. Logo source and rules: `../brand/logo/README.md`.

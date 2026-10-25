# The Speaking Factory — website

A multi-page site for The Speaking Factory, built as static HTML/CSS/JS with no build step, ready for GitHub Pages.

## Files

```
index.html          — Home (hub page)
keynotes.html        — Keynotes & Lunch and Learns
workshops.html        — Workshops & Training
methodology.html      — Why Theatre Improv as Methodology + A.C.T. approach
about.html             — About Hazriq Idrus
books.html              — Books by The Speaking Factory
rave-reviews.html        — Client logos, media logos & testimonials
contact.html               — Let's Talk (enquiry form)
partials/header.html — shared nav, loaded into every page via js/main.js
partials/footer.html  — shared footer, loaded into every page via js/main.js
css/style.css           — all styling (one shared file across every page)
js/main.js                — partial include logic, mobile nav toggle, enquiry form (mailto-based)
images/                     — logo, hero photo, bio photo, book covers, client & media logos
sitemap.xml                  — for search engines
robots.txt                     — for search engines
CNAME                           — custom domain (thespeakingfactory.com) for GitHub Pages
```

## How the shared header/footer works

Every page has an empty `<div data-include="partials/header.html"></div>` and `<div data-include="partials/footer.html"></div>`. On load, `js/main.js` fetches those two files and swaps them in, so the nav and footer only need to be edited in one place (`partials/header.html` / `partials/footer.html`) rather than in all 8 pages.

This means **the site must be served over http(s)**, not opened directly as a local file (`file://`) — `fetch()` is blocked on the `file://` protocol by browsers. GitHub Pages serves everything over https, so this is not a problem once deployed. To preview locally before pushing, run a simple local server from the project folder, e.g.:
```bash
python3 -m http.server 8000
```
then open `http://localhost:8000/` in a browser.

The active nav/footer link for the current page is highlighted automatically (via each page's `<body data-page="...">` attribute) — no manual edit needed per page.

## Deploying to GitHub Pages

1. Create a new repository on GitHub (e.g. `thespeakingfactory-site`), or use an existing one.
2. Push these files to the repository root.
   ```bash
   cd tsf-site
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch", choose the `main` branch and the `/ (root)` folder, then **Save**.
5. GitHub will publish the site at `https://<your-username>.github.io/<your-repo>/` within a minute or two.

### Using the custom domain (thespeakingfactory.com)

A `CNAME` file containing `thespeakingfactory.com` is already included at the repository root, so GitHub Pages will pick it up automatically once Pages is enabled.

1. At your domain registrar, point the domain to GitHub Pages:
   - Add an `A` record for the root domain to GitHub's IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Add a `CNAME` record for `www` pointing to `<your-username>.github.io`
2. Back in **Settings → Pages**, confirm `thespeakingfactory.com` appears as the custom domain and enable "Enforce HTTPS" once it's available (this can take a few hours after DNS propagates).

## The enquiry form

The contact form (on `contact.html`) has no backend — it opens the visitor's email client with a pre-filled message addressed to `info@thespeakingfactory.com`. If you'd rather capture submissions directly (e.g. into an inbox or spreadsheet without relying on the visitor's mail client), swap the form's submit handler in `js/main.js` for a service like Formspree or Getform — both work with a static site and need no server.

## Images

Photography, book covers and client/media logos are sized and compressed for the web. To swap any of them out later, replace the file in `images/` with the same filename, or update the `src` path in the relevant page(s).

## Content source

Copy is drawn from the original single-page site's content, reorganised into 8 pages per the agreed site architecture (Home, Keynotes, Workshops, Methodology, About, Books, Rave Reviews, Let's Talk). Update copy directly in each page's `.html` file — sections are clearly commented. Shared nav/footer copy lives only in `partials/header.html` and `partials/footer.html`.

## SEO

Each page has its own `<title>`, meta description and canonical URL. `sitemap.xml` and `robots.txt` are included for search engines. Basic schema.org structured data (Organization on Home, Person on About) is embedded for richer search results.

# Muhammad Saleem Awan: portfolio site

A simple, fast one-page website: plain HTML, CSS and a little JavaScript. No build step.

## Files

| File | What it is |
|---|---|
| `index.html` | All the text on the site, split into commented sections |
| `styles.css` | Colours and layout (colours are at the top, under `:root`) |
| `script.js` | Mobile menu, scroll fade-in, footer year |
| `images/saleem.webp`, `images/saleem.jpg` | Profile photo (portrait, 4:5) |
| `resume/Muhammad-Saleem-Awan-Resume.pdf` | The résumé behind the "View résumé" buttons (hero and contact sections) |
| `robots.txt`, `sitemap.xml` | Help search engines find and index the site |
| `fonts/` | Inter font files (SIL Open Font License) |

## Updating

**Résumé:** open the `resume/` folder and use **Add file → Upload files** to upload the
new PDF with exactly the name `Muhammad-Saleem-Awan-Resume.pdf`; GitHub replaces the old
one. Don't delete the old file first: deleting the only file in a folder removes the
folder, and creating a file called `resume` in its place breaks the links.
Nothing else to change: the buttons always load the newest copy.

**Consulting services:** in `index.html`, find the `CONSULTING` section. Each service
is one `<article class="card svc">` block; copy, edit or delete blocks as needed.

**Photo:** replace both files in `images/` with the same names.

**Text:** edit `index.html` on GitHub (pencil icon) and commit.

## Publishing (GitHub Pages)

1. The repository must be **public** (Pages on a free account only works for public repositories).
2. **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch **main**, folder **/ (root)**, **Save**.
3. The site goes live at `https://shadabkhansir.github.io/saleemawanhr/` within a minute or two.

To use a custom domain later, enter it under **Settings → Pages → Custom domain**
and point the domain's DNS to GitHub Pages.

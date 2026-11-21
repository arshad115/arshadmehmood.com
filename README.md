# Arshad Mehmood — personal site

Plain [Astro](https://astro.build) static site for [arshadmehmood.com](https://arshadmehmood.com).

I write about Go, Kubernetes, self-hosting, and the tools I build.

## Develop

Node 22 (see `.nvmrc`).

```sh
git submodule update --init --recursive
npm ci
npm run dev
```

Search is indexed during `npm run build`.

```sh
npm run verify   # unit tests + build + Pagefind + site tests
npm run lighthouse:ci # Lighthouse CI against the production build
```

## Content

Posts are `content/posts/YYYY-MM-DD-slug.md`. The slug after the date **is** the public URL (`/{category}/{slug}/`). Use lowercase kebab-case. YAML `category:` is a lowercase slug (`development`, `devops`); the UI shows Title Case (`DevOps`). Old Jekyll URLs with `$` or parentheses redirect to the cleaned slug.

TIL notes live in the `today-i-learned` submodule as `category/note.md` with YAML `title:`. The site layout prints the H1; the note body should not repeat it. To publish a note, commit it on a branch in the TIL repository and push it to its default branch. In the blog, run `npm run update:til -- --remote`, review the new revision, and commit the `today-i-learned` pointer. Plain `npm run update:til` restores the revision the blog already pins.

```sh
./scripts/new-post.sh "Post title" --category development --tags "go,cli"
./scripts/new-post.sh "Draft title" --draft
./scripts/new-til.sh "Note title" git
./scripts/new-til.sh "Note title" git --template --readme
```

Same commands work as `npm run new:post` / `npm run new:til`. With no arguments they prompt interactively. Do not install shell-profile aliases.

| Path | What |
| --- | --- |
| `content/posts/` | Essays. URL `/{category}/{filename-slug}/` |
| `content/pages/` | Prose pages |
| `content/portfolio/` | Portfolio write-ups |
| `content/drafts/` | Unpublished |
| `today-i-learned/` | Git submodule |
| `public/` | CNAME, images, files |

Live Jekyll URLs are frozen in `tests/fixtures/jekyll-sitemap.xml`. After following redirects they must land on real HTML.

## Comments

Giscus uses the Announcements discussion category in this repository on **posts only**. Grant the Giscus GitHub App access to this repository. The build includes the public repository and category IDs. Override them through the environment if needed, or set `COMMENTS_DISABLED=true` to disable comments.

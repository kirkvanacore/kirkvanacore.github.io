# kirkvanacore.com

The personal academic website of Kirk Vanacore, Ph.D. It's a static site built with
[SvelteKit](https://svelte.dev/docs/kit), published to GitHub Pages, and its design is based on
[Amy J. Ko's faculty site](https://github.com/amyjko/faculty) (CC0).

**All content lives in five YAML files in [`content/`](content/).** Edit a file, commit and push to
`main`, and the site rebuilds and goes live in about two minutes. You never need to touch the code
to update the site.

| File | What it controls |
|---|---|
| `content/profile.yaml` | Name, titles, email, bio, areas of interest, education, profile links, CV link |
| `content/featured.yaml` | The four selected papers (home page and Publications) |
| `content/events.yaml` | The Events timeline and "Recent & upcoming" on the home page |
| `content/nto.yaml` | The Projects page (NTO, Sandpiper, MTM) |
| `content/service.yaml` | The Service list on the Events page |

You can edit these on github.com (open the file, click the pencil icon, then **Commit changes**),
or locally (see [Preview locally](#preview-locally)). If a file has a mistake, such as a missing
title or a badly written date, the build fails with a message saying which entry to fix, and the
live site stays as it was. Check the **Actions** tab on GitHub to see it.

## Add an event

Open `content/events.yaml` and add an entry. Order doesn't matter (the site sorts newest first),
but keeping the file newest-first makes it easier to read:

```yaml
- date: 2027-04-12            # required, written YYYY-MM-DD
  end_date: 2027-04-14        # optional, for multi-day events
  role: panelist              # required; shown right under the title
  kind: panel                 # required; shown as a small tag above the title
  title: "Title of the panel or session"
  event: Name of the conference or convening
  location: City, State
  with: [Collaborator One, Collaborator Two]   # optional
  links:                      # optional; any names work, e.g. program, slides, recording
    program: https://example.org/program
```

`role` must be one of: organizer, lead organizer, co-organizer, PI and organizer, panelist,
instructor, presenter, invited speaker, invited participant. `kind` must be one of: workshop,
tutorial, training, panel, talk, paper, convening. The build stops with a message if either is
missing or not on its list. To allow a new one, add it to `eventRoles` or `eventKinds` in
`src/lib/server/content.ts` and to the list at the top of `events.yaml`.

Other optional fields: `type` (e.g. `half-day workshop`), `description`, `moderator`, `speakers`,
`time` (e.g. `"1:00–5:00 PM"`, shown after the date), `nto: true` (adds a small "NTO" marker for
National Tutoring Observatory work), `date_display` (to show a fuzzy date such as `"Aug 2026"`
instead of the exact day), and `group` (entries with the same group text appear together under one
heading). Under "Past", entries sit under a heading for each year, and everything before 2025 under
"2024 and earlier". A group sits under the year of its newest entry.

- **Upcoming vs. past** is worked out from the dates. The site also rebuilds every Monday, so
  events move to "Past" on their own.
- **Photos:** put the image in `static/assets/events/` (about 1600px wide is plenty) and add it to
  the entry, always with alt text describing the photo:
  ```yaml
    photos:
      - {src: assets/events/2027-04-panel.jpg, alt: "Kirk speaking on the panel"}
  ```
- **Feature it on the home page:** add `highlight: true`. "Recent & upcoming events" lists every
  highlighted event, newest first, or the four newest events if none are highlighted. Each shows
  a slideshow of the entry's photos (arrows, or swipe on a phone). `image: {src: …, alt: …}` adds a
  picture shown first, on the home page only. Events without a picture get a plain tile with the
  month and year.
- **Hide an entry** without deleting it: add `publish: false`.
- **Flag a detail to check:** add `verify: "what to check"`. It doesn't show on the site.

Run `npm run content` to list every hidden entry and every entry still marked `verify`. Note that
the repository is public, so hidden entries and `verify` notes can be read on GitHub even though
they're never shown on the site.

## Change the featured papers

Edit `content/featured.yaml`. Each paper needs a `title`, `authors`, `year`, `venue` and `summary`.
`doi`, `author_note` and `links` (e.g. `preprint`, `paper`, `scholar`) are optional. The short
venue on the home page cards, such as "EDM 2026", is taken from the parentheses in `venue`. The
site shows however many papers are in the file. Four fit the home page best.

## Update the CV

The CV page links to a Google Doc, so updating the doc updates the site. There's nothing to
redeploy.

1. In the Google Doc, click **Share**. Under General access, choose **Anyone with the link** and
   **Viewer**.
2. In `content/profile.yaml`, set `cv_url:` to the doc's link (remove the `#` in front of it).

The CV page then shows **View CV** and **Download PDF** buttons. The PDF is Google's export of the
doc's current version. Until `cv_url` is set, the page asks visitors to email you for a copy.

The page also lists **Appointments** (`positions` in `content/profile.yaml`) and **Education**
(`education`). Either can name an advisor with `advisor: {name: …, url: …}`, and the name links to
the URL.

## Edit the bio

`long_bio` in `content/profile.yaml` is the bio on the home page. Each `- >-` item is one
paragraph. The first `bio_shown` paragraphs show (default 1), and the rest sit behind a "Read
more" link. Advisors' names in the bio link to the pages given for them under `education` and
`positions`; to link other phrases, add them under `bio_links` (`"phrase": url`). Lines inside a paragraph can wrap wherever you like, as long as they stay indented.
`short_bio` is used for search engines and link previews. Titles, areas of interest, education
and profile links are in the same file.

## Change the look

The site has three themes: `academic` (the default), `editorial` and `modern`. To switch, change
`theme` in [`src/lib/config.ts`](src/lib/config.ts). Colors and fonts for each theme are at the top
of [`src/lib/styles/global.css`](src/lib/styles/global.css). Every theme has a dark mode that follows
the visitor's system setting.

## Preview locally

You need [Node.js](https://nodejs.org) 22.17 or newer.

```sh
npm install        # once
npm run dev        # then open http://localhost:5173. Pages reload as you edit content files.
SITE_THEME=modern npm run dev   # try a different theme without changing config.ts
npm run build      # build the finished site into build/, as GitHub does
```

## How it's put together

- `src/lib/server/content.ts` reads the YAML at build time, drops hidden events and internal
  notes, and checks for missing fields.
- `src/routes/+layout.server.ts` hands the content to every page; pages are in
  `src/routes/(app)/`.
- Every page is prerendered to plain HTML (`@sveltejs/adapter-static`).
  `.github/workflows/deploy.yml` builds and publishes it on every push to `main`, every Monday,
  and on demand from the Actions tab.
- Fonts are bundled with the site, and icons are inline SVG (Simple Icons, CC0; Lucide, ISC). The
  site loads nothing from other servers and sets no cookies. There are no analytics.
- `static/CNAME` holds the custom domain, `kirkvanacore.com`.

## License

The site's code is dedicated to the public domain under [CC0](LICENSE), as Amy J. Ko's original
is. That covers the code only. The text, photos and papers are not covered.

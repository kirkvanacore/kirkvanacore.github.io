# Website backlog

Open items for kirkvanacore.com that need Kirk's input. These are not yet done. Changes that are already
made are not listed. Last reviewed 2026-11-25.

| Priority | Task | Why it matters | Input needed from Kirk | Suggested next step |
|---|---|---|---|---|
| High | Confirm the Million Tutor Moves release schedule | The Projects page says full releases are planned to begin in December 2026. The NTO Hugging Face page lists the next releases (`mtm-001`, text from partner providers; `mtm-002`, audio-video sessions) as "planned", with no dates. Nothing official online supports December. | Is December 2026 still the plan, and for which release? | If confirmed, keep the wording in `content/nto.yaml`. If not, drop "beginning in December 2026" so the blurb just says full releases are planned, then delete the note above the blurb. |
| High | Make a current CV viewable and downloadable | The CV page asks visitors to email for a copy. There is no CV file in the repository. An older PDF exists in the setup kit outside the repo, but it includes a phone number, so it wasn't published. | A current CV with personal contact details removed, as a Google Doc shared "Anyone with the link: Viewer". | Set `cv_url` in `content/profile.yaml`. The CV page then shows **View CV** and **Download PDF** buttons, with no code change. |
| High | Confirm photo ownership and any missing credits | The footer no longer claims the photos are yours, but none of them is credited. Several were probably taken by others: the Thought Summit image comes from Cornell's summit page and is stock imagery, and the conference photos are probably the organizers'. | For each photo: who took it or holds the rights, and any credit line they require. The photos are the headshot (`static/assets/headshot.jpg`), the Thought Summit image, the FoL 2026 panel photos (3 shown), the FoL 2026 workshop photos (4 shown) and the UB ASR panel photo. Also: does Cornell's stock license allow the summit image on a personal site? | Add credits where required. A short credit line per photo needs a small `credit` field and caption. Replace or remove any photo you can't confirm permission for. |
| Medium | Make the homepage opening more concrete | The first paragraph is accurate but abstract. Visitors don't learn from it that the work is about human and AI tutoring, measured with causal and computational methods. | Choose one of the drafts below, or edit one. | Replace the first paragraph of `long_bio` in `content/profile.yaml`, and update `short_bio` (used by search engines and link previews) to match. |
| Medium | Add a concise teaching and mentoring section | The site has no teaching or mentoring record. The only trace is the hidden 2024 WPI guest lecture in `content/events.yaml`, plus one line in the bio about mentoring graduate students at Penn. | Courses taught or assisted (title, institution, term, role), guest lectures, and students or research assistants you mentored (names only with their consent). Also: should the section go on the CV page or the home page? | Add a short list (e.g. `content/teaching.yaml`) shown as "Teaching & mentoring" on the CV page, in the same row layout as Service. |
| Medium | Settle the remaining unconfirmed event details | 6 entries shown on the Events page still carry `verify` notes, and 4 entries are hidden until you confirm them. | Answers to the notes listed by `npm run content`. These are: the Sandpiper webinar role and panel; the AIME-Con 2025 session title and day; the CausalEDM 2025 and 2024 workshop days; the UCLA date and format; the Penn date; and the hidden AIMS, ICQE25 booth, L@S 2025 and WPI lecture entries. Also: the AIME-Con 2026 entry says "Josh Marland", while the ICQE26 page says "Joshua Marland". Which do you prefer? | Delete each `verify` line once its detail is confirmed. To show a hidden entry, give it a `kind` (and AIMS an allowed `role`) and delete `publish: false`. |
| Low | Choose a title for the NSSA 2026 workshop | The site keeps "From Insight to Action: Closing the Loop on Tutoring Data", which matches the slide deck. The official agenda lists the same session (Wed May 6, with Justin Reich and Rachel Slama) as "Learning from Tutoring Dialogue: An Introduction to Sandpiper, an Annotation Tool from the National Tutoring Observatory". | Which title to show. | Keep it as is, switch to the agenda title, or add a line such as "Listed in the program as …". |
| Low | Confirm the SREE 2026 paper session | The site now dates the paper Sat Sep 26, from SREE's detailed program (updated 9/22, p. 38: 10:15 AM EDT session, Harbor D); the program summary agrees. SREE says later changes appear only in its online program, which needs an organizer passphrase, so it couldn't be checked. | Confirm you presented on Sep 26, or give the actual day. | None if confirmed; otherwise change the date in `content/events.yaml`. |

## Proposed homepage opening

Both drafts use only facts already on the site. Each would replace the first paragraph of `long_bio`. The
later paragraphs, which sit behind "Read more", stay as they are.

**Option A: leads with tutoring**

> I am a learning scientist who studies human and AI tutoring: what tutors do, when it helps students
> learn, and for whom. I combine causal inference with computational methods, from randomized experiments
> and causal forests to AI-assisted annotation of tutoring dialogue, to estimate the effects of
> educational technologies and to guide how AI in education is developed, evaluated, and governed. As
> Research Director of the National Tutoring Observatory at Cornell, I lead work on the open data,
> annotation tools, and partnerships needed to connect tutoring interactions to evidence of learning.

**Option B: closer to the current text**

> I am a learning scientist who studies how human and AI tutoring affect learning. I use causal
> inference and computational methods (experimental and quasi-experimental designs, machine learning,
> and AI annotation of tutoring dialogue) to estimate when, for whom, and why tutoring and educational
> technologies work, and to guide how AI in education is developed, evaluated, and governed. I am
> especially interested in the conditions under which these technologies narrow, rather than widen, gaps
> between students with greater and fewer educational resources.

Note: this repository is public, so anything written here can be read on GitHub.

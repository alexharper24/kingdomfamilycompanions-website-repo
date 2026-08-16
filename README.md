# Kingdom Family Companions — website

Static rebuild of [kingdomfamilycompanions.com](https://www.kingdomfamilycompanions.com/)
(currently a Wix site) for a family Golden Retriever and Doberman Pinscher breeder in
Milford, Indiana. Plain HTML/CSS/JS, no build step, targets GitHub Pages with the
existing custom domain cut over at launch.

**Character:** an heirloom family album from the Indiana countryside. Cream paper,
espresso ink, one gold thread, unhurried editorial type.

- **Palette:** cream `#fdf8ef` / espresso `#513833` (sampled from the client's live
  site) / gold accent `#a3742b` (text-safe variant `#7d5715`).
- **Type:** Newsreader (display serif) + Karla (body).
- **Archetype:** narrative-scroll home, index/ledger rows for puppies and parent dogs.
  Deliberately no card grids, no stats strip, no CTA ribbon, no alternating tinted
  sections. One dark espresso block per page at most.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home: typographic hero, raising story, verse band, litter ledger, health teaser, testimonial, contact |
| `puppies.html` | Available puppies as ledger rows with status/price |
| `our-dogs.html` | Parent dogs with genetic/OFA results linked (real URLs) |
| `process.html` | Inquiry-to-go-home steps + FAQ. Replaces the Wix cart flow |
| `about.html` | The family's real story (from the live site, boilerplate removed) |
| `contact.html` | Inquiry form (Formspree, un-configured guard active) |
| `404.html` | Not-found page |

## Run locally

```bash
python -m http.server 8153 --directory kingdomfamilycompanions-website-repo
```

Or `preview_start({name: "kingdomfamily"})` from the root launch.json.

Before committing: `python check_site.py kingdomfamilycompanions-website-repo` from the
`site-checks` repo.

## Deliberate decisions (do not "fix" these back)

- **No shopping cart.** The live Wix site sells puppies as store products with
  Add-to-Cart. This rebuild intentionally replaces that with an inquiry-first flow
  (application → conversation → deposit). Deposits are handled off-site (invoice or
  payment link) after the family has screened the buyer.
- **No street address anywhere.** Home-based family business. Service area only;
  "location shared once your visit is scheduled."
- **Draft mode:** every page carries `noindex` and `robots.txt` is closed. The live Wix
  site (accidentally) has `noindex` too, so there is no SEO to lose. At launch: remove
  the noindex meta from all pages, flip `robots.txt` to `Allow: /`, and keep canonicals
  pointed at `www.kingdomfamilycompanions.com`.
- **Testimonial typo fixed:** the live site's Courtney quote is used verbatim; the other
  live-site testimonial says "hells" for "heels" and is held out until attribution is
  confirmed (see pending list).

## Pending (the project tracker — keep current)

**Content from the family:**
- [x] Photos: all 26 originals pulled from the live Wix site (2026-08-16) into
      `source-photos/originals/` (gitignored) and optimized into `img/`. Every page
      placeholder is now a real photo.
- [ ] **CONFIRM the porch family photo** (`img/family-porch.jpg`, used on `about.html`)
      actually shows the breeder family. It appears on the Wix homepage but is not
      captioned there. Neutral alt text until confirmed.
- [ ] **CONFIRM `img/adult-dog-1.jpg` / `img/adult-dog-2.jpg`** (a black-and-tan adult
      and a red adult, shown on every Wix puppy listing). Probably the litter's parents;
      staged in `img/` but deliberately not placed until the family says who they are.
- [x] Logo: full 2000px original pulled. `img/logo-white.png` (verse band, OG card) and
      `img/logo-espresso.png` (recolored to palette, available for header if preferred
      over the crown mark). Header keeps the crown SVG for legibility at 34px.
- [ ] Hero photo: currently the basket-puppy photo. Alternates in `img/` if a different
      hero is preferred (boy-with-puppy, elowen-2, family-porch).
- [ ] Per-puppy facts on `puppies.html` and `index.html`: **breed** (not stated on the
      live listings!), sex, date of birth, go-home date. Marked `REPLACE THIS`.
- [ ] Family member names + intro sentences (`about.html`). Confirm what they will publish.
- [ ] One sentence on what the name/verse means to them (`index.html` verse band).
- [ ] Verse-band line on `process.html` ("Our puppies leave here knowing what a family
      sounds like") is my draft; the family approves or replaces it.
- [ ] Deposit amount + refund terms, update cadence, go-home package contents, health
      guarantee terms (`process.html`, marked `REPLACE THIS`). Never guess these.
- [ ] Price confirmation: $2,200 shown for all three current puppies (from live site).
      Confirm whether it varies by breed/litter.
- [ ] Attribution for the long school-visit testimonial (currently unused; has the
      "hells"→"heels" typo).
- [ ] OFA listing links on ofa.org for each dog. The Wix QR-code filenames carry the
      OFA numbers: Mira **2720473**, Diamond **2702496**, Scarlet **2702953**. Wire
      these to their ofa.org result pages (HTML comments mark the spots in
      `our-dogs.html`).
- [ ] Social links, if any.

**Technical:**
- [ ] Formspree form ID in `contact.html` (guard message active until then). First real
      submission triggers a one-time confirmation email to the owner.
- [ ] Create GitHub repo under `github.com/alexharper24` and push.
- [ ] Launch checklist: remove noindex metas, open robots.txt, set custom domain in
      Pages settings **before** moving DNS, apex A records + www CNAME, Enforce HTTPS
      after cert. Localize any hot-linked images before cancelling Wix (the GenSol PDF
      is hosted on GenSol's Azure blob, which is theirs, fine to keep hot).
- [ ] Google Business Profile + Search Console after launch (the current Wix site is
      noindexed, so this will be the first time the business is findable at all).
- [ ] Privacy policy page if they want to keep one (Wix auto-generated theirs).

## Notes for future sessions

- The live Wix site has `robots: noindex` on every page, a truncated site name
  ("Kingdom Family Comp."), a Contact nav item that links to the homepage, and a puppy
  whose product URL is `/product-page/agility-jump-bar`. Full review in the session that
  created this repo (2026-08-16).
- Real health-testing data carried over from the live site: Mira (Doberman,
  "Kingdom's Miraculous Grace", GenSol clear/carrier-DCM3, OFA heart+eyes, hips/elbows
  pending), Diamond (Golden, "Ella's Diamond", Wisdom Panel clear, OFA
  heart/eyes/hips/elbows), Scarlet (Golden, Wisdom Panel clear, OFA heart+eyes).

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
| `puppy-elowen.html` etc. | Per-puppy pages: gallery, facts, reserve (Deposit/Balance/Full via PayPal links), share buttons |
| `blog.html` + `post-*.html` | Blog index and the four posts carried over from Wix |
| `blog-feed.xml` | RSS feed (same filename the Wix site used, so subscribers survive) |
| `privacy-policy.html` | Their real policy, carried over verbatim |
| `accessibility-statement.html` | Rewritten honestly (see below) |
| `404.html` | Not-found page |

Every page also gets a floating "Let's Chat" launcher (injected by `main.js`) with
call/text/email/inquiry links. If the family wants true live chat, drop in a free
Tawk.to embed and remove the launcher.

## Run locally

```bash
python -m http.server 8153 --directory kingdomfamilycompanions-website-repo
```

Or `preview_start({name: "kingdomfamily"})` from the root launch.json.

Before committing: `python check_site.py kingdomfamilycompanions-website-repo` from the
`site-checks` repo.

## Deliberate decisions (do not "fix" these back)

- **No shopping cart, but reserve buttons carried over.** Each puppy page has
  Deposit / Balance / Full Payment buttons (matching the Wix flow) wired for PayPal
  payment links, with a friendly guard until the real links are configured. The
  inquiry path stays primary. PayPal "Pay Later" financing messaging (shown on the
  Wix site) can be added later with the PayPal JS SDK + their client ID.
- **No street address anywhere.** Home-based family business. Service area only;
  "location shared once your visit is scheduled."
- **Draft mode:** every page carries `noindex` and `robots.txt` is closed. The live Wix
  site (accidentally) has `noindex` too, so there is no SEO to lose. At launch: remove
  the noindex meta from all pages, flip `robots.txt` to `Allow: /`, and keep canonicals
  pointed at `www.kingdomfamilycompanions.com`.
- **Testimonial typo fixed:** the live site's Courtney quote is used verbatim; the other
  live-site testimonial says "hells" for "heels" and is held out until attribution is
  confirmed (see pending list).

## Findings from the full audit of the live Wix site (2026-08-16)

Crawled every page. Carried forward or deliberately dropped:

| Live page / feature | Status in this build |
|---|---|
| Home, About, Available Puppies, Our Dogs, Blog + 4 posts | Carried, restructured |
| 3 product pages | Now `puppy-*.html` with reserve + share |
| `/privacy-policy` | Carried **verbatim** |
| `/accessibility-statement` | Rewritten, see below |
| `/blog-feed.xml` | Regenerated at the same path |
| `/cart-page`, `/category/all-products` ("Shop") | Dropped: duplicate storefront, replaced by the inquiry flow |
| Wix chat widget | Replaced by the "Let's Chat" launcher |
| PayPal Pay Later messaging | Not carried; needs their PayPal client ID (see pending) |

**Problems found on the live site that the family should know about:**

1. **Every page is `noindex`** while `robots.txt` says `Allow: /`, and the `sitemap.xml`
   referenced by robots.txt returns **404**. The site cannot be found on Google at all.
2. **A former business name, "Soli Deo Gloria Family Companion Dogs," is still embedded
   site-wide** — in the blog RSS channel title and three times in the accessibility
   statement. Worth cleaning up in Wix even if the rebuild replaces it.
3. **The accessibility statement has unfilled Wix placeholders live in public**:
   "[enter relevant date]", "[Name of the accessibility coordinator]",
   "[Telephone number]", "[Email address]". It also claims things that are not true of
   that site (alt text on images, accessible video). **Not copied.** The rebuild ships an
   honest statement describing what this site actually does. Needs family review.
4. **The privacy policy is written for a puppy marketplace**, not a single-family
   breeder: it repeatedly references breeder accounts, breeder profiles, managing
   breeder listings, and connecting families with breeders. It is real and dated
   (Aug 11 2026), so it is carried **verbatim and unedited** here. Flag it to the family
   and their attorney rather than rewriting it.
5. **Griffin's product URL is `/product-page/agility-jump-bar`** (a renamed demo
   product). Fixed here as `puppy-griffin.html`.
6. **The "Contact" nav item links to the homepage** with no anchor. Fixed.
7. **Site name truncated to "Kingdom Family Comp."** in every title tag. Fixed.
8. **Available Puppies has an empty "Available Golden Retriever Puppies" section.**
   Rebuilt as an explicit "between litters" waiting-list state.
9. Testimonial typo "hells" for "heels". Fixed.

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
- [x] Breed confirmed by Alex 2026-08-16: current puppies (Elowen, Malcolm, Griffin)
      are **Doberman Pinschers**. Set everywhere.
- [ ] Per-puppy date of birth + go-home date (`puppy-*.html`, ledgers). Marked
      `REPLACE THIS`.
- [ ] PayPal payment links for Deposit / Balance / Full Payment on the three
      `puppy-*.html` pages (search `YOUR_PAYPAL`). Guard message shows until then.
      Ask the family for their PayPal payment-link URLs (they already take PayPal).
- [ ] Family member names + intro sentences (`about.html`). Confirm what they will publish.
- [ ] One sentence on what the name/verse means to them (`index.html` verse band).
- [ ] Verse-band line on `process.html` ("Our puppies leave here knowing what a family
      sounds like") is my draft; the family approves or replaces it.
- [ ] Deposit amount + refund terms, update cadence, go-home package contents, health
      guarantee terms (`process.html`, marked `REPLACE THIS`). Never guess these.
- [ ] Price confirmation: $2,200 shown for all three current puppies (from live site).
      Confirm whether it varies by breed/litter.
- [ ] Attribution for the long school-visit testimonial (unattributed on the live
      site; the "hells"→"heels" typo is fixed here).
- [ ] The homepage now carries four testimonials. Two (Mckinzie, Letteer) were
      transcribed from screenshots because they are not on the live site yet.
      Verify the wording against the originals.
- [x] OFA record links wired on `our-dogs.html` (2026-08-16). Decoded from the QR code
      images on the live site and each verified in-browser to resolve to a real record.
      Note the URL has **no trailing slash** before `?appnum=`, or OFA serves a blank
      search form. Records confirm: Mira = KINGDOM'S MIRACULOUS GRACE (WS85545303,
      born Oct 21 2024, Advanced Cardiac normal), Diamond = ELLA'S DIAMOND (SS41251409,
      born May 3 2023, hips GOOD / elbows normal / cardiac normal), Scarlet =
      KING'S SCARLET (SS30809501, born Oct 20 2021, cardiac normal).
- [x] Scarlet's registered name (**King's Scarlet**) added; the live site omits it.
- [ ] The OFA records show fewer evaluations than the site's prose claims (the prose
      says "heart and eyes" for Mira and Scarlet, and "heart, eyes, hips, elbows" for
      Diamond; OFA lists cardiac for all three, plus hips and elbows for Diamond). Eye
      exams (CAER) are often not published to OFA. **Ask the family to confirm the
      wording** rather than changing their claims.
- [ ] **More Golden Retriever photos.** The library from the Wix site is Doberman-heavy:
      13 of the puppy photos are the current Doberman litter (Elowen, Malcolm, Griffin)
      and only 5 show Goldens (two Golden puppies, Diamond, Scarlet, and the boy holding
      a puppy). Pages that should feel like both breeds have to reuse the same few Golden
      shots. Golden litter photos would fix this properly.
- [ ] Social links, if any. The live site has none in the footer.
- [ ] Ask about the former name "Soli Deo Gloria Family Companion Dogs" (see findings).
- [ ] Family/attorney review of the carried-over privacy policy and the rewritten
      accessibility statement, plus a last-updated date for the latter.

**Technical:**
- [ ] Formspree form ID in `contact.html` (guard message active until then). First real
      submission triggers a one-time confirmation email to the owner.
- [x] Published 2026-08-16 to
      https://github.com/alexharper24/kingdomfamilycompanions-website-repo
      Live preview: https://alexharper24.github.io/kingdomfamilycompanions-website-repo/
      Pages serves from main / root, HTTPS enforced. Still in **draft mode**
      (noindex on every page + closed robots.txt), so the link is shareable but
      not indexable.
- [ ] Launch checklist: remove noindex metas, open robots.txt, set custom domain in
      Pages settings **before** moving DNS, apex A records + www CNAME, Enforce HTTPS
      after cert. Localize any hot-linked images before cancelling Wix (the GenSol PDF
      is hosted on GenSol's Azure blob, which is theirs, fine to keep hot).
- [ ] Google Business Profile + Search Console after launch (the current Wix site is
      noindexed, so this will be the first time the business is findable at all).
- [x] Privacy policy and accessibility statement pages built and linked in the footer
      on every page.
- [ ] PayPal Pay Later / "Pay Monthly" messaging that the Wix product pages show. Needs
      their PayPal client ID and the PayPal JS SDK if they want it carried over.
- [ ] Blog posts carry no dates (Wix showed relative dates). Add real dates if wanted.
      The two March posts are generic filler; recommend replacing them over time.

## Layout gotchas specific to this build

- **Compound selectors beat the shared mobile rule.** The mobile block collapses
  layouts with a single-class list (`.contact-grid, .pgrid, ...`). Any base rule like
  `.contact-grid.photo-right` or `.hero-split.narrow-copy` has higher specificity and
  keeps its desktop columns on a phone, squeezing content to unusable widths. When you
  add a modifier that sets `grid-template-columns`, add a matching mobile override.
- **Never `object-fit: cover` a photo of people to force a height match.** It cropped
  into a child's face on the About page. Match widths and let heights differ.
- **`100vw` includes the scrollbar.** Full-bleed bands sit outside `.wrap`, so use
  `width:100%`, not `100vw`, or the page scrolls horizontally.
- **The nav overlay is injected into `.nav .wrap`.** It needs `position:fixed` at every
  width, not just mobile, or it becomes a flex item and eats the header's right side.
- Photos are sourced from Wix's *delivered* rendition, not the raw original: Wix applies
  tone and unsharp-mask on delivery, so the originals are noticeably darker and softer.

## Notes for future sessions

- The live Wix site has `robots: noindex` on every page, a truncated site name
  ("Kingdom Family Comp."), a Contact nav item that links to the homepage, and a puppy
  whose product URL is `/product-page/agility-jump-bar`. Full review in the session that
  created this repo (2026-08-16).
- Real health-testing data carried over from the live site: Mira (Doberman,
  "Kingdom's Miraculous Grace", GenSol clear/carrier-DCM3, OFA heart+eyes, hips/elbows
  pending), Diamond (Golden, "Ella's Diamond", Wisdom Panel clear, OFA
  heart/eyes/hips/elbows), Scarlet (Golden, Wisdom Panel clear, OFA heart+eyes).

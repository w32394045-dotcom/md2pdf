# Booklet Printer

Companion page in this repository: impose any PDF for saddle stitching (骑马钉) and print it **directly from the browser**.

- Online: <https://md2pdf.xszx.cc.cd/booklet> · Pages: <https://w32394045-dotcom.github.io/md2pdf/booklet/>
- Single file, fully offline: download `index.html` and open it — the PDF never leaves the machine.
- Rendering: PDF.js 3.11.174 and pdf-lib 1.17.1 inlined (no CDN, no network requests).
- Printing: three passes from the browser — front sides, flip the whole stack and print back sides, then print the
  separate jacket sheet last (blank, or your custom cover). **Printed output has no watermark.**

## Print engines (switch on the page)

- **Vector PDF** (default) — pdf-lib copies the original page objects onto the imposed sheet pages, so text, fonts
  and vectors stay sharp and generation is fast. The button opens the finished PDF in a new tab; press Ctrl+P there.
  Rotated-page or unusual PDFs automatically fall back to the rendered engine for that pass.
- **Rendered print** — the direct `window.print()` route: pdf.js renders each page at the chosen DPI (200/300/400)
  and prints the composed sheets from this page. Kept as a fallback if the PDF viewer print path misbehaves.

## Layout controls

- **Page range** — impose only part of a large PDF (e.g. 400 pages, print 100).
- **Paper** — A4 → A5, A3 → A4, Letter → Half Letter; the sheet is always folded along the long side.
- **Center gutter** — 0–30 mm slider reserved around the fold, so a slightly off fold does not eat content.
- **Duplex flip** — mirror / reverse toggles for the back pass; test on 2 scrap sheets and switch if needed.
- **Auto split** — max sheets per booklet; thick documents become several booklets automatically.
- **Custom cover** — optional cover PDF: page 1 = front cover, page 2 = back cover, printed on the jacket sheet
  in the last pass; inside covers stay blank.
- **Sheet thumbnails** — see exactly which page lands on which half, for both passes and the jacket.

## Print settings

Margins **None**, scale **Actual size / 100 %** (not "Fit"), single-sided, paper = the chosen sheet size, landscape.

## Checks

- `node check.cjs` — validates the built file (structure, CSP, both inlined engines, 7 locales, promo links).
- Development copy also runs unit tests for the imposition math and a headless-Chrome end-to-end test that
  generates the vector PDF and prints the rendered DOM to a real PDF, verifying page counts and page sizes.

MIT, like the rest of this repository. Built 2026-11-06 — sha256 `cb28ee3f43d806f0…`.

# Booklet Printer

Companion page in this repository: impose any PDF for saddle stitching (楠戦┈閽? and print it **directly from the browser**.

- Online: <https://md2pdf.xszx.cc.cd/booklet> 路 Pages: <https://w32394045-dotcom.github.io/md2pdf/booklet/>
- Single file, fully offline: download `index.html` and open it 鈥?the PDF never leaves the machine.
- Rendering: PDF.js 3.11.174 inlined (no CDN, no network requests).
- Printing: three passes from the browser print dialog 鈥?front sides, flip the whole stack and print back sides,
  then print the separate jacket sheet last (blank, or your custom cover). **Printed output has no watermark.**

## Layout controls

- **Page range** 鈥?impose only part of a large PDF (e.g. 400 pages, print 100).
- **Paper** 鈥?A4 鈫?A5, A3 鈫?A4, Letter 鈫?Half Letter; the sheet is always folded along the long side.
- **Center gutter** 鈥?0鈥?0 mm slider reserved around the fold, so a slightly off fold does not eat content.
- **Duplex flip** 鈥?mirror / reverse toggles for the back pass; test on 2 scrap sheets and switch if needed.
- **Auto split** 鈥?max sheets per booklet; thick documents become several booklets automatically.
- **Custom cover** 鈥?optional cover PDF: page 1 = front cover, page 2 = back cover, printed on the jacket sheet
  in the last pass; inside covers stay blank.
- **Quality** 鈥?200 / 300 / 400 DPI canvas rendering.
- **Sheet thumbnails** 鈥?see exactly which page lands on which half, for both passes and the jacket.

## Print settings

Margins **None**, scale **Actual size / 100 %** (not 鈥淔it鈥?, single-sided, paper = the chosen sheet size, landscape.

## Checks

- `node check.cjs` 鈥?validates the built file (structure, CSP, inlined PDF.js, 7 locales, promo links).
- Development copy also runs unit tests for the imposition math and a headless-Chrome end-to-end test that
  prints the imposed DOM to a real PDF and verifies page count and page size.

MIT, like the rest of this repository. Built 2026-11-06 鈥?sha256 `0b59c0c90df9e333鈥.


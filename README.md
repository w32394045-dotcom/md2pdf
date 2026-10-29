# md2pdf — a single-file, offline Markdown → PDF typesetter

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![i18n](https://img.shields.io/badge/UI-7%20languages-9cf)](index.html)

**English** · [简体中文](README.zh-CN.md)

One HTML file. No build step, no dependencies, no network. Open `index.html` in Chrome or Edge and turn
Markdown into a **vector-text PDF** — selectable, searchable, sharp at any zoom, not a screenshot.

## Try it

**Primary: https://md2pdf.xszx.cc.cd** — this is the one to bookmark.

| Entry | URL | When to use it |
|---|---|---|
| **Primary** | **https://md2pdf.xszx.cc.cd** | Default (custom domain, Cloudflare) |
| Mirror 1 | https://md2pdf.w32394045.workers.dev | Same Cloudflare Worker, native address — if DNS misbehaves |
| Mirror 2 | https://w32394045-dotcom.github.io/md2pdf/ | GitHub Pages — if Cloudflare is down entirely |

All three serve the same `index.html`, byte for byte. Settings and history live **in your browser**, so they do
not follow you between entries — pick one and stick with it.

## Features

- **Markdown rendering** — headings, lists, tables, quotes, footnotes, task lists, strikethrough, `==highlight==`,
  code blocks with syntax highlighting, and CJK soft wrapping.
- **Print typesetting** — A4 / Letter / A5, three margin presets. **Print / Save PDF** → system dialog → *Save as PDF*.
- **Math** — the inlined [Temml](https://temml.org) 0.14 engine (MIT) converts LaTeX to MathML:
  - covers most of amsmath / amssymb: `\lesssim` `\geqslant` `\boxed` `\cancel` `\overrightarrow` `\operatorname` `\color` `\begin{aligned}` …
  - renders through native browser MathML, so **no font binaries** are shipped; print and export stay vector
  - anything Temml rejects falls back to a small built-in parser, which shows the command literally instead of dropping it
- **Chemistry** — `\ce{…}` and `\pu{…}` without mhchem:
  `\ce{2H2 + O2 -> 2H2O}`, `\ce{N2(g) + 3H2(g) <=> 2NH3(g)}`, `\ce{2H2O2 ->[MnO2] 2H2O + O2}`,
  `\ce{CuSO4.5H2O}`, `\ce{SO4^2-}`, `\pu{1.0e-3 mol/L}`.
- **Table of contents** — optional, depth H1 … all levels.
- **Accent colour** — seven presets, a wheel you can drag anywhere, a typed hex value or the brightness slider.
  It drives links, the quote bar and tint, table header tint, heading rules, table borders, `==highlight==`, task
  boxes and the UI's own buttons / focus rings. Printing converts it to a print-safe shade automatically.
- **Page background** — upload an image or pick one from the thumbnail history, then crop it in the built-in
  frosted-glass cropper: A4 / A5 / Letter / square / circle (A4 and A5 share the ratio; only the output resolution
  differs), drag to move, wheel or pinch to zoom, rendered at device pixel ratio, plus **Keep original** to skip
  cropping. Two sliders set the opacity of the image itself and of the tinted content surfaces on top of it
  (tables, code blocks, quotes, TOC). Printing paints the background as a fixed overlay (Chromium repeats
  fixed-position elements on each page) — tick **Background graphics** in the print dialog. The image never leaves
  the browser.
- **Colour from an image** — sample an accent straight out of the current page background, or from any image chosen
  for the session: a crosshair and a 13×13 pixel magnifier follow the pointer, and on Chromium the system EyeDropper
  can pick from anywhere on screen (the button is greyed out elsewhere). The last 24 colours are kept in a swatch
  strip — click to reuse, ✕ to remove — and survive a reload.
- **Render fences** — content inside a `svg` / `css` / `html` / `render` fence is **rendered**, not shown as code.
  Tag a fence `text` to show the code instead.
- **Inline SVG** — an `<svg>` written straight into the Markdown stays vector in the PDF; scripts, event attributes
  and external URLs are stripped.
- **Author card and footer bar** — an optional avatar plus one line of text, placed above or below the document, or
  **repeated at the top / bottom of every printed page**. The avatar can be uploaded or picked from the avatar
  history; the footer info bar with the tool name and repository link can be switched off, or shown **once per page**
  with its own switch (off = a single bar at the end). The styles live in the document stylesheet, so preview, print
  and export match.
- **Footnote placement** — three modes: all notes at the end (default), each note right after the paragraph that
  cites it, or both at once.
- **Local images stay attached** — images picked together with a `.md` are copied into the browser database on open,
  so reloading the page or reopening the document from History no longer leaves broken images.
- **Spacing directives** — put a marker on its own line to control vertical space exactly:
  `[[gap:3]]` leaves three blank lines (follows the font size), `[[gap:20mm]]` leaves a fixed 20 mm
  (printer-accurate), `[[rules:3]]` draws three answer rules for filling in by hand, and `[[pagebreak]]`
  starts a new page when printed. Works in preview, print and exported HTML; invalid markers stay as plain text,
  and the count is capped (200 lines / 500 mm) so a document cannot balloon into dozens of blank pages.
- **JSON extensions** — one JSON file can rewrite the text before parsing (`preProcess`), add inline syntax and new
  fences (`customSyntax`), add toolbar buttons that insert a fixed snippet (`uiInjection`), and add CSS for the
  document only (`cssInjection`). The output passes the same sanitiser as render fences; a malformed file disables
  the whole extension with an error instead of half-applying it; the extension is stored locally and survives a reload.
- **Settings** — five tabs: Appearance / Background & images / Smart extensions / Print & export / Data & fonts.
  Settings are saved to the browser database and restored on reload, with a one-click reset to defaults; the Data &
  fonts tab also holds font import and the font library. If the database is unavailable (private browsing), the UI
  says so instead of pretending to save.
- **Settings export / import** — packs the settings and the extension JSON into one file for moving to another
  machine. Background, avatar, document images and fonts are deliberately left out.
- **Export** — a self-contained HTML file (fonts, images and the page background embedded), or just the `.md`.
- **History** — the **🗂 History** button lists documents written here (title, last edit, word count, size).
  Open, delete one entry, or clear all. Autosaves ~2.6 s after you stop typing, keeps the newest 50.
  Everything sits in the browser's IndexedDB; nothing is uploaded.
- **Seven UI languages** — 简体中文 · 繁體中文 · 日本語 · 한국어 · Deutsch · Français · English.
  Detected from your browser on first load, switchable from the 🌐 dropdown in the toolbar, and the built-in
  sample document follows the language as well (each language has its own hand-written sample, not machine output).
  Switching language **reloads the page** by default so every label, menu and sample is rebuilt cleanly, and swaps
  the sample to the new language; both behaviours can be switched off in Settings, and the seven accent-colour
  presets are translated too.

## Usage

1. Open `index.html` in Chrome or Edge (double-clicking the file works — no server needed).
2. Click **Open** and pick a `.md`. If the document references local images, select the `.md` **and** the images
   together; they are matched by file name and copied into the browser database, so a reload will not break them.
3. Check the preview, then click **Print / Save PDF** and choose *Save as PDF* in the system dialog.
   - A web page cannot write a PDF file by itself; this route is the only one, and it is what yields vector text.
   - Want page numbers? Turn on *Headers and footers* in the print dialog.

## Safety

Raw HTML and render fences are sanitised: `<script>`, event attributes (`onclick` …), `javascript:` / `data:text/html`
protocols, external `url()` and `@import` are stripped. JSON extensions go through the same filters: generated HTML is
sanitised, placeholders are inserted as data (escaped) rather than raw HTML, and extension CSS reaches the document
stylesheet only, with `@import`, `javascript:` and external `url()` removed. The tool itself fetches nothing at
runtime — the math engine is inlined, not pulled from a CDN — but a document that embeds **remote images** will still
make the browser load them, so keep untrusted documents offline. Intended for documents you trust.

## Third-party

- [Temml](https://temml.org) 0.14.0 — LaTeX → MathML, MIT, inlined together with its full licence text.
  See [THIRD-PARTY.md](THIRD-PARTY.md) for the notice, why KaTeX / MathJax / mhchem were not used, and what
  changed (only the `@font-face` rule was dropped, since the single-file build ships no font binaries).

## Related projects

- **[md2pdf-authoring](https://github.com/w32394045-dotcom/md2pdf-authoring)** — a companion AI skill (generic).
  It teaches an agent how to drive this tool and how to write Markdown whose maths, chemistry, figures and tables
  survive rendering and printing, and ships a `check_md.py` linter to run before delivery.
  Installing is one copy-paste: the skill repo's README has a ready-made prompt for Claude Code / Codex / DSH / Cursor,
  plus a file-drop route for chat-only assistants (ChatGPT, Kimi, Doubao …).
- **[md2pdf-ext-rules](https://github.com/w32394045-dotcom/md2pdf-ext-rules)** — the second companion AI skill,
  for the **JSON extension system** (Settings → Smart extensions). It teaches an agent to write `preProcess`,
  `customSyntax` (inline + block), `cssInjection` and `uiInjection` correctly: `$content` only outside tags,
  namespaced fences and CSS, the `$` traps in replacement strings, and what gets silently skipped.
  It ships a `check_ext.py` linter and sixteen counter-examples of mistakes that either disable the whole
  extension or fail quietly. Same install routes as above.
- **[imgprint](https://github.com/w32394045-dotcom/imgprint)** — [imgprint.xszx.cc.cd](https://imgprint.xszx.cc.cd/) ·
  the single-file image printer for the same ecosystem: drop in several photos, choose paper size, margins
  and 1-2-4 images per page, print. It warns about effective DPI and non-sRGB colour spaces, runs fully
  offline in 7 languages, and carries the same switchable footer watermark. Use it when the thing to print
  is images rather than Markdown.

## Licence

[MIT](LICENSE) © 2026 w32394045-dotcom

Use it, change it, redistribute it — keep the copyright notice. No warranty.

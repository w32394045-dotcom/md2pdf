#!/usr/bin/env node
/* Validate the built booklet single-file page (runs in CI). */
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'index.html');
const html = fs.readFileSync(file);
const s = html.toString('utf8');
const size = html.length;
let pass = 0;
const fails = [];
const ok = (c, n, x) => { if (c) pass++; else fails.push(n + (x === undefined ? '' : ' :: ' + x)); };
ok(size > 1.1e6, 'size > 1.1MB', size);
ok(size < 4.5e6, 'size < 4.5MB', size);
ok(s.startsWith('<!doctype html>'), 'doctype');
ok(s.indexOf("default-src 'none'") >= 0, 'CSP default-src none');
ok(s.indexOf('worker-src blob:') >= 0, 'CSP worker-src blob');
ok(s.indexOf('PDF.js v3.11.174') >= 0, 'pdf.js licence notice');
ok(s.indexOf('pdf-lib v1.17.1') >= 0, 'pdf-lib licence notice');
const w = s.match(/<script id="pdfWorkerSrc" type="text\/plain">([\s\S]*?)<\/script>/);
ok(w && w[1].length > 900000, 'pdf.js worker inlined');
ok(s.indexOf('PDFLib') >= 0, 'pdf-lib inlined');
const m = s.match(/window\.__I18N=(\{[\s\S]*?\});window\.__LANG_NAMES=(\{[\s\S]*?\});<\/script>/);
ok(!!m, 'i18n payload found');
if (m) {
  const locales = JSON.parse(m[1]);
  const names = JSON.parse(m[2]);
  const codes = Object.keys(locales);
  ok(codes.length === 7, '7 locales', codes.length);
  ok(Object.keys(names).length === 7, '7 language names');
  const en = Object.keys(locales.en || {}).sort();
  ok(en.length >= 70, 'at least 70 keys', en.length);
  codes.forEach((c) => {
    const k = Object.keys(locales[c] || {}).sort();
    ok(JSON.stringify(k) === JSON.stringify(en), 'key parity ' + c);
  });
  ok((locales.en || {})['app.title'] === 'Booklet Printer', 'en title');
  ok((locales['zh-CN'] || {})['app.title'] === '骑马钉打印器', 'zh-CN title');
}
ok(s.indexOf('id="modeBar"') >= 0, 'print mode switch');
ok(s.indexOf('id="pdfLinks"') >= 0, 'vector pdf links');
ok(s.indexOf('"print.modeVector"') >= 0, 'vector mode i18n');
ok(s.indexOf('window.print()') >= 0, 'direct print channel');
ok(s.indexOf('@page{size:') >= 0, 'dynamic @page size');
ok(s.indexOf('.print-sheet') >= 0, 'print sheet CSS');
ok(s.indexOf('https://md2pdf.xszx.cc.cd/') >= 0, 'promo link md2pdf');
ok(s.indexOf('https://imgprint.xszx.cc.cd/') >= 0, 'promo link imgprint');
ok(!/<script[^>]+src=/.test(s), 'no external script src');
ok(!/<link[^>]+rel="stylesheet"/.test(s), 'no external stylesheet');
if (fails.length) { console.error('booklet check FAILED: ' + fails.length); fails.forEach((f) => console.error(' - ' + f)); process.exit(1); }
console.log('booklet check PASS ' + pass + '/' + pass + '  (' + size + ' B)');

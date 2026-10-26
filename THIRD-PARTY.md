# 第三方组件

本项目的 `index.html` 是单文件应用，下列组件**已内联进该文件**（不是运行时从 CDN 加载），
所以离线打开也不会发出任何网络请求。

---

## Temml 0.14.0

- 用途：把 LaTeX 公式转换成 MathML
- 主页：https://temml.org
- 来源：https://www.npmjs.com/package/temml （`dist/temml.min.js`）
- 许可证：MIT
- 内联位置：`index.html` 里 `<script id="temmlLib">` 块；同块开头附有完整 MIT 许可证全文
- 对源码的改动：**无**（压缩后的原文照搬）
- 另外内联了它的 `dist/Temml-Local.css` 中的结构样式（去掉 `@font-face`，因为单文件版不带 woff2 字体），
  位于文档样式表内 `/*==temmlCss==*/` 标记处

```
MIT License

Copyright (c) 2021-2024 Ron Kok and contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 未使用的库（说明一下为什么没选）

| 库 | 结论 | 原因 |
|---|---|---|
| KaTeX | 未引入 | 要正确显示必须带自己的 CSS 和 ~60 个字体文件（约 1MB），单文件离线工具塞不进去；只取它的 MathML 输出则体积翻倍但效果不更好 |
| MathJax | 未引入 | 完整包 1.3MB 以上，对一个单文件小工具过重 |
| mhchem | 未引入 | 它是 KaTeX 扩展；本项目用一个几十行的 `\ce{}` 轻量转换覆盖中学常见写法 |

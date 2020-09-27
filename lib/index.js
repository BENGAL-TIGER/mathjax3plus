"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const rendermime_1 = require("@jupyterlab/rendermime");
// MathJax core
const mathjax_1 = require("mathjax-full/js/mathjax");
// TeX input
const tex_1 = require("mathjax-full/js/input/tex");
// HTML output
const chtml_1 = require("mathjax-full/js/output/chtml");
const browserAdaptor_1 = require("mathjax-full/js/adaptors/browserAdaptor");
const tex_2 = require("mathjax-full/js/output/chtml/fonts/tex");
const html_1 = require("mathjax-full/js/handlers/html");
const AllPackages_1 = require("mathjax-full/js/input/tex/AllPackages");
html_1.RegisterHTMLHandler(browserAdaptor_1.browserAdaptor());
// Override dynamically generated fonts in favor
// of our font css that is picked up by webpack.
class emptyFont extends tex_2.TeXFont {
}
emptyFont.defaultFonts = {};
/**
 * The MathJax 3 Typesetter.
 */
class MathJax3Typesetter {
    constructor() {
        const chtml = new chtml_1.CHTML({
            font: new emptyFont()
        });
        const tex = new tex_1.TeX({
            packages: AllPackages_1.AllPackages,
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            tags: 'ams',
            processEscapes: true,
            processEnvironments: true
        });
        this._html = mathjax_1.mathjax.document(window.document, {
            InputJax: tex,
            OutputJax: chtml
        });
    }
    /**
     * Typeset the math in a node.
     */
    typeset(node) {
        this._html
            .clear()
            .findMath({ elements: [node] })
            .compile()
            .getMetrics()
            .typeset()
            .updateDocument();
    }
}
exports.MathJax3Typesetter = MathJax3Typesetter;
/**
 * The MathJax 3 extension.
 */
const mathJax3Plugin = {
    id: '@jupyterlab/mathjax3-extension:plugin',
    requires: [],
    provides: rendermime_1.ILatexTypesetter,
    activate: () => new MathJax3Typesetter(),
    autoStart: true
};
exports.default = mathJax3Plugin;

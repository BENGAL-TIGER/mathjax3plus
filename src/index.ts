// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { JupyterFrontEndPlugin } from '@jupyterlab/application';

import { ILatexTypesetter } from '@jupyterlab/rendermime';

// MathJax core
import { mathjax } from 'mathjax-full/js/mathjax';

// TeX input
import { TeX } from 'mathjax-full/js/input/tex';

// HTML output
import { CHTML } from 'mathjax-full/js/output/chtml';

import { browserAdaptor } from 'mathjax-full/js/adaptors/browserAdaptor';

import { TeXFont } from 'mathjax-full/js/output/chtml/fonts/tex';

import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html';

import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages';

RegisterHTMLHandler(browserAdaptor());

// Override dynamically generated fonts in favor
// of our font css that is picked up by webpack.
class emptyFont extends TeXFont {}
(emptyFont as any).defaultFonts = {};

/**
 * The MathJax 3 Typesetter.
 */
export class MathJax3Typesetter implements ILatexTypesetter {
  constructor() {
    const chtml = new CHTML({
      font: new emptyFont()
    });
    const tex = new TeX({
      packages: AllPackages,
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']],
      tags: 'ams',
      processEscapes: true,
      processEnvironments: true
    });
    this._html = mathjax.document(window.document, {
      InputJax: tex,
      OutputJax: chtml
    });
  }

  /**
   * Typeset the math in a node.
   */
  typeset(node: HTMLElement): void {
    this._html
      .clear()
      .findMath({ elements: [node] })
      .compile()
      .getMetrics()
      .typeset()
      .updateDocument();
  }
  private _html: any;
}

/**
 * The MathJax 3 extension.
 */
const mathJax3Plugin: JupyterFrontEndPlugin<ILatexTypesetter> = {
  id: '@jupyterlab/mathjax3-extension:plugin',
  requires: [],
  provides: ILatexTypesetter,
  activate: () => new MathJax3Typesetter(),
  autoStart: true
};

export default mathJax3Plugin;

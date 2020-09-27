import { JupyterFrontEndPlugin } from '@jupyterlab/application';
import { ILatexTypesetter } from '@jupyterlab/rendermime';
/**
 * The MathJax 3 Typesetter.
 */
export declare class MathJax3Typesetter implements ILatexTypesetter {
    constructor();
    /**
     * Typeset the math in a node.
     */
    typeset(node: HTMLElement): void;
    private _html;
}
/**
 * The MathJax 3 extension.
 */
declare const mathJax3Plugin: JupyterFrontEndPlugin<ILatexTypesetter>;
export default mathJax3Plugin;

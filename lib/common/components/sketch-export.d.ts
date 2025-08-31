import { SketchPluginElement } from "./sketch-plugin";
import { ISketchPluginParams } from "../types";
export declare class SketchExportElement extends SketchPluginElement {
    protected hiddenInput_: HTMLInputElement | null;
    UpdateFieldProperty(value: string): void;
    constructor();
    HandleEndDraw(params: ISketchPluginParams): void;
    protected HandlePostAttributesProcessPostfix_(): void;
}
export declare function SketchExportElementCompact(): void;

import { SketchToolElement } from "./sketch-tool";
import { ISketchPluginParams } from "../types";
export declare class SketchLineToolElement extends SketchToolElement {
    color: string;
    mode: string;
    lineWidth: number;
    lineCap: CanvasLineCap;
    constructor(name?: string);
    HandleBeginDraw(params: ISketchPluginParams): void;
}

import { SketchToolElement } from "./sketch-tool";
import { ISketchPluginParams, SketchPaintModeType } from "../types";
export declare abstract class SketchLineToolElement extends SketchToolElement {
    color: string;
    fillColor: string;
    strokeColor: string;
    mode: SketchPaintModeType;
    lineWidth: number;
    lineCap: CanvasLineCap;
    constructor(name?: string);
    HandleBeginDraw(params: ISketchPluginParams): void;
    protected HandleDraw_(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void;
    protected abstract HandleShapeDraw_(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void;
}

import { SketchLineToolElement } from "./sketch-line-tool";
export declare class SketchCircleElement extends SketchLineToolElement {
    constructor();
    protected HandleShapeDraw_(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void;
}
export declare function SketchCircleElementCompact(): void;

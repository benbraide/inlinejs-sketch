import { SketchLineToolElement } from "./sketch-line-tool";
export declare class SketchRectangleElement extends SketchLineToolElement {
    constructor();
    protected HandleDraw_(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void;
}
export declare function SketchRectangleElementCompact(): void;

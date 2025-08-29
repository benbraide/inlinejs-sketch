import { SketchPluginElement } from "./sketch-plugin";
import { ISketchPluginParams } from "../types";
export declare class SketchToolElement extends SketchPluginElement {
    protected offscreenCanvas_: HTMLCanvasElement | null;
    protected offscreenCtx_: CanvasRenderingContext2D | null;
    protected saved_: {
        x: number;
        y: number;
    };
    constructor(name?: string);
    HandleBeginDraw({ offsetX, offsetY }: ISketchPluginParams): boolean | void;
    HandleEndDraw({ offsetX, offsetY }: ISketchPluginParams): void;
    HandleDraw({ offsetX, offsetY }: ISketchPluginParams): void;
    protected HandleDraw_(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void;
}

import { SketchPluginElement } from "./sketch-plugin";
import { ISketchPluginParams } from "../types";
export declare class SketchToolElement extends SketchPluginElement {
    protected saved_: {
        image: string | null;
        x: number;
        y: number;
    };
    protected checkpoint_: number;
    constructor(name?: string);
    HandleBeginDraw({ offsetX, offsetY }: ISketchPluginParams): boolean | void;
    HandleEndDraw(): void;
    HandleDraw({ offsetX, offsetY }: ISketchPluginParams): void;
    protected HandleDraw_(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void;
}

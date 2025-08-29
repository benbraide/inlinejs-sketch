import { ISketchPluginParams } from "../types";
import { SketchLinePluginElement } from "./sketch-line-plugin";
export declare class SketchFreehandElement extends SketchLinePluginElement {
    protected lastPoint_: {
        x: number;
        y: number;
    };
    constructor();
    HandleBeginDraw(params: ISketchPluginParams): void;
    HandleDraw({ offsetX, offsetY }: ISketchPluginParams): void;
}
export declare function SketchFreehandElementCompact(): void;

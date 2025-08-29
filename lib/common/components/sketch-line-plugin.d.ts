import { SketchPluginElement } from "./sketch-plugin";
import { ISketchPluginParams } from "../types";
export declare class SketchLinePluginElement extends SketchPluginElement {
    color: string;
    lineWidth: number;
    lineCap: CanvasLineCap;
    constructor(name?: string);
    HandleBeginDraw({ offsetX, offsetY }: ISketchPluginParams): void;
}

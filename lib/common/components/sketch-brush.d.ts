import { SketchPluginElement } from "./sketch-plugin";
import { ISketchPluginParams } from "../types";
export declare class SketchBrushElement extends SketchPluginElement {
    color: string;
    radius: number;
    constructor();
    HandleDraw({ offsetX, offsetY }: ISketchPluginParams): void;
}
export declare function SketchBrushElementCompact(): void;

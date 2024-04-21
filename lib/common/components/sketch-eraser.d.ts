import { SketchPluginElement } from "./sketch-plugin";
import { ISketchPluginParams } from "../types";
export declare class SketchEraserElement extends SketchPluginElement {
    radius: number;
    constructor();
    HandleDraw({ offsetX, offsetY }: ISketchPluginParams): void;
}
export declare function SketchEraserElementCompact(): void;

import { ISketchPluginParams } from "../types";
import { SketchLinePluginElement } from "./sketch-line-plugin";
export declare class SketchFreehandElement extends SketchLinePluginElement {
    constructor();
    HandleDraw({ offsetX, offsetY }: ISketchPluginParams): void;
}
export declare function SketchFreehandElementCompact(): void;

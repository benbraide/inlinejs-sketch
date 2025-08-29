import { IElementScopeCreatedCallbackParams } from "@benbraide/inlinejs";
import { SketchPluginElement } from "./sketch-plugin";
export declare class SketchHistoryElement extends SketchPluginElement {
    protected index_: number;
    protected entries_: string[];
    size: number;
    constructor();
    GetPriority(): number;
    SetCanvas(canvas: HTMLCanvasElement | null): void;
    HandleStartDraw(): void;
    HandleEndDraw(): void;
    Undo(): void;
    Redo(): void;
    Reset(): void;
    Has(): boolean;
    CanUndo(): boolean;
    CanRedo(): boolean;
    LoadImage(url: any): void;
    protected HandleElementScopeCreated_(params: IElementScopeCreatedCallbackParams, postAttributesCallback?: (() => void) | undefined): void;
    protected Restore_(src: string): void;
    protected Snapshot_(): void;
}
export declare function SketchHistoryElementCompact(): void;

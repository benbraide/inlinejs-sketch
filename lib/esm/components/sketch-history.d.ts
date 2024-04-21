import { SketchPluginElement } from "./sketch-plugin";
export declare class SketchHistoryElement extends SketchPluginElement {
    protected index_: number;
    protected entries_: string[];
    protected isSaved_: boolean;
    protected savedBeforeUndo_: boolean;
    size: number;
    constructor();
    HandleBeginDraw(): void;
    HandleEndDraw(): void;
    Undo(): void;
    Redo(): void;
    Reset(): void;
    protected Save_(): void;
}
export declare function SketchHistoryElementCompact(): void;

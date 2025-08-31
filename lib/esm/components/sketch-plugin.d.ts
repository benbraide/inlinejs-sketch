import { CustomElement } from "@benbraide/inlinejs-element";
import { ISketchPlugin, ISketchPluginParams } from "../types";
import { IElementScope } from "@benbraide/inlinejs";
interface ISketchHost extends HTMLElement {
    AddPlugin(plugin: ISketchPlugin): void;
    RemovePlugin(plugin: ISketchPlugin): void;
}
export declare class SketchPluginElement extends CustomElement implements ISketchPlugin {
    protected canvas_: HTMLCanvasElement | null;
    protected sketchHost_: ISketchHost | null;
    name: string;
    disabled: boolean;
    constructor(name?: string);
    GetName(): string;
    GetPriority(): number;
    SetCanvas(canvas: HTMLCanvasElement | null): void;
    Handle({ stage, ...rest }: ISketchPluginParams): void | boolean;
    HandleBeginDraw(params: ISketchPluginParams): void | boolean;
    HandleEndDraw(params: ISketchPluginParams): void;
    HandleDraw(params: ISketchPluginParams): void;
    protected HandleElementScopeDestroyed_(scope: IElementScope): void;
    protected HandlePostAttributesProcessPostfix_(): void;
}
export {};

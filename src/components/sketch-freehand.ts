import { RegisterCustomElement } from "@benbraide/inlinejs-element";
import { ISketchPluginParams } from "../types";
import { SketchLinePluginElement } from "./sketch-line-plugin";

export class SketchFreehandElement extends SketchLinePluginElement{
    protected lastPoint_ = { x: 0, y: 0 };

    public constructor(){
        super('freehand');
    }

    public HandleBeginDraw(params: ISketchPluginParams){
        super.HandleBeginDraw(params);
        this.lastPoint_ = { x: params.offsetX, y: params.offsetY };
    }

    public HandleDraw({ offsetX, offsetY }: ISketchPluginParams){
        const ctx = this.canvas_?.getContext('2d');
        if (ctx){
            ctx.beginPath();
            ctx.moveTo(this.lastPoint_.x, this.lastPoint_.y);
            ctx.lineTo(offsetX, offsetY);
            ctx.stroke();
            this.lastPoint_ = { x: offsetX, y: offsetY };
        }
    }
}

export function SketchFreehandElementCompact(){
    RegisterCustomElement(SketchFreehandElement, 'sketch-freehand');
}

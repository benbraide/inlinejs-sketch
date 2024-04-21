import { RegisterCustomElement } from "@benbraide/inlinejs-element";
import { ISketchPluginParams } from "../types";
import { SketchLinePluginElement } from "./sketch-line-plugin";

export class SketchFreehandElement extends SketchLinePluginElement{
    public constructor(){
        super('freehand');
    }

    public HandleDraw({ offsetX, offsetY }: ISketchPluginParams){
        const ctx = this.canvas_?.getContext('2d');
        if (ctx){
            ctx.lineTo(offsetX, offsetY);
            ctx.stroke();
        }
    }
}

export function SketchFreehandElementCompact(){
    RegisterCustomElement(SketchFreehandElement, 'sketch-freehand');
}

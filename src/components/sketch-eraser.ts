import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { SketchPluginElement } from "./sketch-plugin";
import { ISketchPluginParams } from "../types";

export class SketchEraserElement extends SketchPluginElement{
    @Property({  type: 'number' })
    public radius = 5;

    public constructor(){
        super('eraser');
    }

    public HandleDraw({ offsetX, offsetY }: ISketchPluginParams){
        const ctx = this.canvas_?.getContext('2d');
        if (ctx){
            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(offsetX, offsetY, this.radius, 0, (2 * Math.PI));
            ctx.fill();
            ctx.restore();
        }
    }
}

export function SketchEraserElementCompact(){
    RegisterCustomElement(SketchEraserElement, 'sketch-eraser');
}

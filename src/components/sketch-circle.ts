import { RegisterCustomElement } from "@benbraide/inlinejs-element";
import { SketchLineToolElement } from "./sketch-line-tool";

export class SketchCircleElement extends SketchLineToolElement{
    public constructor(){
        super('circle');
    }
    
    protected HandleDraw_(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number){
        const radius = Math.max(Math.abs(offsetX - this.saved_.x), Math.abs(offsetY - this.saved_.y));
        ctx.arc(this.saved_.x, this.saved_.y, radius, 0, (2 * Math.PI));
        (this.mode === 'fill') ? ctx.fill() : ctx.stroke();
    }
}

export function SketchCircleElementCompact(){
    RegisterCustomElement(SketchCircleElement, 'sketch-circle');
}

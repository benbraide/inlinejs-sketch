import { RegisterCustomElement } from "@benbraide/inlinejs-element";
import { SketchLineToolElement } from "./sketch-line-tool";

export class SketchLineElement extends SketchLineToolElement{
    public constructor(){
        super('line');
    }
    
    protected HandleDraw_(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number){
        ctx.moveTo(this.saved_.x, this.saved_.y);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    }
}

export function SketchLineElementCompact(){
    RegisterCustomElement(SketchLineElement, 'sketch-line');
}

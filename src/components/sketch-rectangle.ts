import { RegisterCustomElement } from "@benbraide/inlinejs-element";
import { SketchLineToolElement } from "./sketch-line-tool";

export class SketchRectangleElement extends SketchLineToolElement{
    public constructor(){
        super('rectangle');
    }
    
    protected HandleShapeDraw_(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number){
        const width = offsetX - this.saved_.x;
        const height = offsetY - this.saved_.y;
        
        if (this.mode === 'fill' || this.mode === 'both'){
            ctx.fillRect(this.saved_.x, this.saved_.y, width, height);
        }

        if (this.mode === 'stroke' || this.mode === 'both' || !this.mode){
            ctx.strokeRect(this.saved_.x, this.saved_.y, width, height);
        }
    }
}

export function SketchRectangleElementCompact(){
    RegisterCustomElement(SketchRectangleElement, 'sketch-rectangle');
}

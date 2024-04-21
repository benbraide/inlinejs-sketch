import { Property } from "@benbraide/inlinejs-element";
import { SketchToolElement } from "./sketch-tool";
import { ISketchPluginParams } from "../types";

export class SketchLineToolElement extends SketchToolElement{
    @Property({ type: 'string' })
    public color = 'black';

    @Property({ type: 'string' })
    public mode = 'stroke';

    @Property({ type: 'number' })
    public lineWidth = 1;
    
    @Property({ type: 'string' })
    public lineCap: CanvasLineCap = 'round';

    public constructor(name?: string){
        super(name);
    }

    public HandleBeginDraw(params: ISketchPluginParams){
        super.HandleBeginDraw(params);
        
        const ctx = this.canvas_?.getContext('2d');
        if (ctx){
            ctx.lineCap = this.lineCap;
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.color;
            ctx.fillStyle = this.color;
        }
    }
}

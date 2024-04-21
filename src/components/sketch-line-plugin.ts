import { Property } from "@benbraide/inlinejs-element";
import { SketchPluginElement } from "./sketch-plugin";
import { ISketchPluginParams } from "../types";

export class SketchLinePluginElement extends SketchPluginElement{
    @Property({ type: 'string' })
    public color = 'black';

    @Property({ type: 'number' })
    public lineWidth = 1;
    
    @Property({ type: 'string' })
    public lineCap: CanvasLineCap = 'round';

    public constructor(name?: string){
        super(name);
    }

    public HandleBeginDraw({ offsetX, offsetY }: ISketchPluginParams){
        const ctx = this.canvas_?.getContext('2d');
        if (ctx){
            ctx.lineCap = this.lineCap;
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.color;
            ctx.moveTo(offsetX, offsetY);
        }
    }

    public HandleEndDraw(params: ISketchPluginParams){
        this.canvas_?.getContext('2d')?.closePath();
    }
}

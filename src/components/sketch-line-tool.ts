import { Property } from "@benbraide/inlinejs-element";
import { SketchToolElement } from "./sketch-tool";
import { ISketchPluginParams, SketchPaintModeType } from "../types";

export abstract class SketchLineToolElement extends SketchToolElement{
    @Property({ type: 'string' })
    public color = '';

    @Property({ type: 'string' })
    public fillColor = '';

    @Property({ type: 'string' })
    public strokeColor = '';

    @Property({ type: 'string' })
    public mode: SketchPaintModeType = 'stroke';

    @Property({ type: 'number' })
    public lineWidth = 1;
    
    @Property({ type: 'string' })
    public lineCap: CanvasLineCap = 'round';

    public constructor(name?: string){
        super(name);
    }

    public HandleBeginDraw(params: ISketchPluginParams){
        super.HandleBeginDraw(params);
    }

    protected HandleDraw_(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number){
        ctx.lineCap = this.lineCap;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeColor || this.color || 'black';
        ctx.fillStyle = this.fillColor || this.color || 'black';
        this.HandleShapeDraw_(ctx, offsetX, offsetY);
    }

    protected abstract HandleShapeDraw_(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void;
}

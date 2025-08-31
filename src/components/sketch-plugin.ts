import { CustomElement, Property } from "@benbraide/inlinejs-element";
import { ISketchPlugin, ISketchPluginParams } from "../types";
import { FindAncestor, IElementScope } from "@benbraide/inlinejs";

interface ISketchHost extends HTMLElement{
    AddPlugin(plugin: ISketchPlugin): void;
    RemovePlugin(plugin: ISketchPlugin): void;
}

export class SketchPluginElement extends CustomElement implements ISketchPlugin{
    protected canvas_: HTMLCanvasElement | null = null;
    protected sketchHost_: ISketchHost | null = null;

    @Property({  type: 'string' })
    public name = '';

    @Property({  type: 'boolean' })
    public disabled = false;
    
    public constructor(name?: string){
        super({
            isTemplate: true,
            isHidden: true,
        });

        this.name = (name || '');
    }

    public GetName(){
        return this.name;
    }

    public GetPriority(): number {
        return 0; // Neutral priority
    }

    public SetCanvas(canvas: HTMLCanvasElement | null): void{
        this.canvas_ = canvas;
    }
    
    public Handle({ stage, ...rest }: ISketchPluginParams): void | boolean{
        if (this.disabled){
            return;
        }
        
        switch (stage){
            case 'begin': return this.HandleBeginDraw({ stage, ...rest });
            case 'end': return this.HandleEndDraw({ stage, ...rest });
            case 'draw': return this.HandleDraw({ stage, ...rest });
        }
    }

    public HandleBeginDraw(params: ISketchPluginParams): void | boolean{}

    public HandleEndDraw(params: ISketchPluginParams){}

    public HandleDraw(params: ISketchPluginParams){}

    protected HandleElementScopeDestroyed_(scope: IElementScope): void {
        super.HandleElementScopeDestroyed_(scope);
        
        this.canvas_ = null;
        this.sketchHost_?.RemovePlugin(this);
        this.sketchHost_ = null;
    }

    protected HandlePostAttributesProcessPostfix_(): void {
        super.HandlePostAttributesProcessPostfix_();

        this.sketchHost_ = FindAncestor(this, ancestor => ('AddPlugin' in ancestor && 'RemovePlugin' in ancestor)) as ISketchHost | null;
        this.sketchHost_?.AddPlugin(this);
    }
}

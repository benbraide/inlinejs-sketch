import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { IElementScopeCreatedCallbackParams } from "@benbraide/inlinejs";
import { SketchPluginElement } from "./sketch-plugin";

export class SketchHistoryElement extends SketchPluginElement{
    protected index_ = 0;
    protected entries_ = new Array<string>();
    
    @Property({  type: 'number' })
    public size = -1;

    public constructor(){
        super('history');
    }

    public GetPriority(): number {
        return -1000; // Run after other plugins
    }

    public SetCanvas(canvas: HTMLCanvasElement | null): void{
        super.SetCanvas(canvas);
        if (this.entries_.length > 0){
            this.Reset();
        }
        else{
            this.canvas_ && (this.entries_ = [this.canvas_.toDataURL('image/png')]);
        }
    }

    public HandleStartDraw(){
        this.Snapshot_();
    }
    
    public HandleEndDraw(){
        this.Snapshot_();
    }

    public Undo(){
        if (this.CanUndo()){
            this.Restore_(this.entries_[--this.index_]);
        }
    }

    public Redo(){
        if (this.CanRedo()){
            this.Restore_(this.entries_[++this.index_]);
        }
    }

    public Reset(){
        const ctx = this.canvas_?.getContext('2d');
        if (ctx && this.canvas_){
            if (this.entries_.length > 0){
                this.Restore_(this.entries_[0]);
                this.entries_.splice(1);
            }
            
            this.index_ = 0;
        }
    }

    public Has(){
        return this.entries_.length > 0;
    }
    
    public CanUndo(){
        return (this.index_ > 0);
    }

    public CanRedo(){
        return (this.index_ < (this.entries_.length - 1));
    }

    public LoadImage(url: any){
        if (!this.canvas_){
            return;
        }
        
        const native = this.canvas_, image = new Image();
        image.onload = () => {
            const ctx = native.getContext('2d');
            
            ctx?.clearRect(0, 0, native.width, native.height);
            ctx?.drawImage(image, 0, 0);

            this.Snapshot_();
        };

        image.src = url;
    }

    protected HandleElementScopeCreated_(params: IElementScopeCreatedCallbackParams, postAttributesCallback?: (() => void) | undefined): void {
        super.HandleElementScopeCreated_(params, postAttributesCallback);
        params.scope.AddPostProcessCallback(() => this.canvas_ && this.Reset());
    }

    protected Restore_(src: string){
        const canvas = this.canvas_;
        if (!canvas || !src){
            return;
        }
        
        const ctx = canvas.getContext('2d');
        if (!ctx){// Context missing
            return;
        }
        
        const image = new Image();
        image.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0);
        };
        
        image.src = src;
    }

    protected Snapshot_(){
        if (!this.canvas_ || !this.size){
            return;
        }

        if (this.index_ < (this.entries_.length - 1)){//Remove redo entries
            this.entries_.splice(this.index_ + 1);
        }

        if (this.size > 0 && this.entries_.length >= this.size){
            this.entries_.shift();
            this.index_ -= 1;
        }

        this.entries_.push(this.canvas_.toDataURL('image/png'));
        this.index_ = this.entries_.length - 1;
    }
}

export function SketchHistoryElementCompact(){
    RegisterCustomElement(SketchHistoryElement, 'sketch-history');
}

import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { SketchPluginElement } from "./sketch-plugin";

export class SketchHistoryElement extends SketchPluginElement{
    protected index_ = 0;
    protected entries_ = new Array<string>();

    protected isSaved_ = false;
    protected savedBeforeUndo_ = false;
    
    @Property({  type: 'number' })
    public size = -1;

    public constructor(){
        super('history');
    }

    public HandleBeginDraw(){
        this.Save_();
    }

    public HandleEndDraw(){
        this.isSaved_ = false;
    }

    public Undo(){
        this.Restore_(() => this.index_ > 0 && this.entries_.length > 0, () => {
            if (this.isSaved_){
                return this.entries_[this.index_ -= ((this.savedBeforeUndo_ && this.index_ >= this.entries_.length) ? 2 : 1)];
            }

            this.Save_();
            this.savedBeforeUndo_ = true;

            return this.entries_[this.index_ -= 2];
        });
    }

    public Redo(){
        this.Restore_(() => this.index_ < this.entries_.length, () => this.entries_[++this.index_], () => {
            this.index_ = ((this.savedBeforeUndo_ && this.index_ >= (this.entries_.length - 1)) ? this.entries_.length : this.index_);
        });
    }

    public Reset(){
        this.Restore_(() => true, () => null, (ctx) => {
            ctx.clearRect(0, 0, this.canvas_!.width, this.canvas_!.height);
            this.index_ = 0;
            this.entries_ = new Array<string>();
        });
    }

    public Has(){
        return this.entries_.length > 0;
    }
    
    public CanUndo(){
        return this.index_ > 0 && this.entries_.length > 0;
    }

    public CanRedo(){
        return this.index_ >= 0 && this.index_ < this.entries_.length;
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

            this.Save_();
        };

        image.src = url;
    }

    protected Restore_(pred: () => boolean, before: () => string | null, after?: (ctx: CanvasRenderingContext2D) => void){
        const canvas = this.canvas_;
        if (!canvas || !pred()){
            return;
        }
        
        const ctx = canvas.getContext('2d');
        if (!ctx){// Context missing
            return;
        }

        const src = before();
        if (src){// Draw image
            const image = new Image();

            image.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, 0, 0);
            };
            
            image.src = src;
        }

        after?.(ctx);
    }

    protected Save_(){
        if (!this.canvas_ || this.isSaved_ || !this.size){
            return;
        }

        const image = this.canvas_.toDataURL('image/png');
        (this.size > 0 && this.entries_.length >= this.size) && this.entries_.shift();
        (this.index_ < this.entries_.length) ? this.entries_.splice(this.index_, (this.entries_.length - this.index_), image) : this.entries_.push(image);

        this.index_ = this.entries_.length;
        this.isSaved_ = true;
        this.savedBeforeUndo_ = false;
    }
}

export function SketchHistoryElementCompact(){
    RegisterCustomElement(SketchHistoryElement, 'sketch-history');
}

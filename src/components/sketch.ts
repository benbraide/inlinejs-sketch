import { JournalTry, ToString, ResizeObserver, IElementScope } from "@benbraide/inlinejs";
import { CustomElement, Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { ISketchPlugin, SketchDrawStageType } from "../types";

export class SketchElement extends CustomElement{
    protected shadow_: HTMLCanvasElement | null = null;
    protected ctx_: CanvasRenderingContext2D | null = null;

    protected isDrawing_ = false;

    protected windowMouseUpHandler_: ((event: MouseEvent) => void) | null = null;
    protected windowTouchEndHandler_: ((event: TouchEvent) => void) | null = null;
    protected windowTouchCancelHandler_: ((event: TouchEvent) => void) | null = null;

    protected plugins_: Record<string, Array<ISketchPlugin>> = {};

    protected resizeObserver_: ResizeObserver | null = null;
    protected fit_ = false;

    @Property({ type: 'object', checkStoredObject: true })
    public plugin: Array<string> | string = '';

    @Property({ type: 'boolean' })
    public disabled = false;

    @Property({ type: 'number', spread: 'size' })
    public UpdateWidthProperty(value: number){
        this.style.width = `${value}px`;
        this.shadow_?.setAttribute('width', ToString(value));
    }
    
    @Property({ type: 'number', spread: 'size' })
    public UpdateHeightProperty(value: number){
        this.style.height = `${value}px`;
        this.shadow_?.setAttribute('height', ToString(value));
    }

    @Property({ type: 'boolean' })
    public UpdateFitProperty(value: boolean){
        if (this.fit_ !== value){
            this.fit_ = value;
            this.UpdateFit_();
        }
    }

    public constructor(){
        super();
        this.style.display = 'flex';
    }

    public GetContext(){
        return this.ctx_;
    }

    public GetNative(){
        return this.shadow_;
    }

    public GetBlob(type = 'image/png'){
        return (this.shadow_ ? new Promise<Blob | null>(resolve => this.shadow_!.toBlob(blob => resolve(blob), type)) : null);
    }

    public GetDataUrl(type = 'image/png'){
        return (this.shadow_ ? this.shadow_.toDataURL(type) : '');
    }

    public AddPlugin(plugin: ISketchPlugin){
        const name = plugin.GetName();
        this.plugins_[name] || (this.plugins_[name] = []);
        this.plugins_[name].push(plugin);
        plugin.SetCanvas(this.shadow_);
    }

    public RemovePlugin(plugin: ISketchPlugin){
        Object.entries(this.plugins_).forEach(([name, plugins]) => {
            this.plugins_[name] = plugins.filter(p => (p !== plugin));
        });
    }

    protected HandleElementScopeDestroyed_(scope: IElementScope): void {
        super.HandleElementScopeDestroyed_(scope);

        this.windowMouseUpHandler_ && window.removeEventListener('mouseup', this.windowMouseUpHandler_);
        this.windowTouchEndHandler_ && window.removeEventListener('touchend', this.windowTouchEndHandler_);
        this.windowTouchCancelHandler_ && window.removeEventListener('touchcancel', this.windowTouchCancelHandler_);
        this.windowMouseUpHandler_ = this.windowTouchEndHandler_ = this.windowTouchCancelHandler_ = null;
        
        this.resizeObserver_?.Unobserve(this.parentElement || this);
        this.resizeObserver_ = null;
        this.shadow_ = null;
    }

    protected HandlePostAttributesProcessPostfix_(): void {
        super.HandlePostAttributesProcessPostfix_();
        this.resizeObserver_ = new ResizeObserver();
        this.resizeObserver_.Observe(this.parentElement || this, () => this.UpdateFit_());
    }

    protected HandlePostProcess_(): void {
        super.HandlePostProcess_();
        this.InitializeShadow_();
    }

    protected InitializeShadow_(){
        if (this.shadow_){
            return;
        }
        
        this.shadow_ = document.createElement('canvas');

        this.shadow_.setAttribute('width', (this.getAttribute('width') || '0'));
        this.shadow_.setAttribute('height', (this.getAttribute('height') || '0'));
        
        this.attachShadow({
            mode: 'open',
        });

        this.shadowRoot?.append(this.shadow_);
        
        this.ctx_ = (this.shadow_.getContext('2d') || null);
        this.ctx_ && (this.ctx_.imageSmoothingQuality = 'high');

        this.windowMouseUpHandler_ = (event) => {
            if (event.button === 0 && this.shadow_){
                const rect = this.shadow_.getBoundingClientRect();
                this.EndDraw_(event.clientX - rect.left, event.clientY - rect.top);
            }
        };
        window.addEventListener('mouseup', this.windowMouseUpHandler_);

        this.windowTouchEndHandler_ = (event) => {
            if (this.shadow_){
                const touch = event.changedTouches[0];
                if (touch){
                    const rect = this.shadow_.getBoundingClientRect();
                    this.EndDraw_(touch.clientX - rect.left, touch.clientY - rect.top);
                }
            }
        };
        window.addEventListener('touchend', this.windowTouchEndHandler_);

        this.windowTouchCancelHandler_ = (event) => {
            if (this.shadow_){
                const touch = event.changedTouches[0];
                if (touch){
                    const rect = this.shadow_.getBoundingClientRect();
                    this.EndDraw_(touch.clientX - rect.left, touch.clientY - rect.top);
                }
            }
        };
        window.addEventListener('touchcancel', this.windowTouchCancelHandler_);

        this.shadow_.addEventListener('mousedown', (event) => {
            (event.button === 0) && this.BeginDraw_(event.offsetX, event.offsetY);
        });

        this.shadow_.addEventListener('touchstart', (event) => {
            event.preventDefault();
            const touch = event.touches[0], boundingRect = (touch.target as HTMLElement).getBoundingClientRect();
            const offsetX = touch.clientX - boundingRect.left;
            const offsetY = touch.clientY - boundingRect.top;
            this.BeginDraw_(offsetX, offsetY);
        });

        this.shadow_.addEventListener('mousemove', event => this.Draw_(event.offsetX, event.offsetY));

        this.shadow_.addEventListener('touchmove', (event) => {
            const touch = event.touches[0], boundingRect = (touch.target as HTMLElement).getBoundingClientRect();
            const offsetX = touch.clientX - boundingRect.left;
            const offsetY = touch.clientY - boundingRect.top;
            this.Draw_(offsetX, offsetY);
        });

        Object.values(this.plugins_).forEach(plugins => plugins.forEach(plugin => plugin.SetCanvas(this.shadow_)));

        this.UpdateFit_();
    }

    protected BeginDraw_(offsetX: number, offsetY: number){
        if (!this.disabled && !this.isDrawing_){
            this.isDrawing_ = true;

            this.ctx_?.save();
            this.ctx_?.beginPath();

            this.CallPlugins_('begin', offsetX, offsetY);
        }
    }

    protected EndDraw_(offsetX: number, offsetY: number){
        if (this.isDrawing_){
            this.CallPlugins_('end', offsetX, offsetY);
            this.ctx_?.restore();
            this.isDrawing_ = false;
        }
    }

    protected Draw_(offsetX: number, offsetY: number){
        this.isDrawing_ && this.CallPlugins_('draw', offsetX, offsetY);
    }

    protected CallPlugins_(stage: SketchDrawStageType, offsetX: number, offsetY: number){
        const pluginsToCall: Array<ISketchPlugin> = [];
        if (this.plugin) { // Call only specified plugins
            (Array.isArray(this.plugin) ? this.plugin : [this.plugin]).forEach((name) => {
                (name in this.plugins_) && pluginsToCall.push(...this.plugins_[name]);
            });
        }
        else { // Call all plugins
            Object.values(this.plugins_).forEach((plugins) => pluginsToCall.push(...plugins));
        }

        //Sort by priority, higher values run first. This ensures history (low priority) runs last.
        pluginsToCall.sort((a, b) => (b.GetPriority() - a.GetPriority()));
        
        pluginsToCall.forEach(plugin => JournalTry(() => plugin.Handle({ stage, offsetX, offsetY })));
    }

    protected UpdateFit_(){
        if (this.fit_){
            this.UpdateWidthProperty(this.parentElement?.clientWidth || 0);
            this.UpdateHeightProperty(this.parentElement?.clientHeight || 0);
        }
    }
}

export function SketchElementCompact(){
    RegisterCustomElement(SketchElement, 'sketch');
}

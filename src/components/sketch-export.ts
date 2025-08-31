import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { SketchPluginElement } from "./sketch-plugin";
import { ISketchPluginParams } from "../types";

export class SketchExportElement extends SketchPluginElement{
    protected hiddenInput_: HTMLInputElement | null = null;
    
    @Property({ type: 'string' })
    public UpdateFieldProperty(value: string){
        this.hiddenInput_?.setAttribute('name', value);
    }

    public constructor(){
        super('export');
    }

    public HandleEndDraw(params: ISketchPluginParams){
        this.hiddenInput_ && this.canvas_ && (this.hiddenInput_.value = this.canvas_.toDataURL());
    }

    protected HandlePostAttributesProcessPostfix_(): void {
        super.HandlePostAttributesProcessPostfix_();
        
        this.hiddenInput_ = document.createElement('input');
        this.hiddenInput_.type = 'hidden';
        this.hiddenInput_.name = (this.getAttribute('field') || '');
        this.hiddenInput_.value = '';
        this.appendChild(this.hiddenInput_);
    }
}

export function SketchExportElementCompact(){
    RegisterCustomElement(SketchExportElement, 'sketch-export');
}

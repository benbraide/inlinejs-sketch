var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { SketchPluginElement } from "./sketch-plugin";
export class SketchExportElement extends SketchPluginElement {
    constructor() {
        super('export');
        this.hiddenInput_ = null;
    }
    UpdateFieldProperty(value) {
        var _a;
        (_a = this.hiddenInput_) === null || _a === void 0 ? void 0 : _a.setAttribute('name', value);
    }
    HandleEndDraw(params) {
        this.hiddenInput_ && this.canvas_ && (this.hiddenInput_.value = this.canvas_.toDataURL());
    }
    HandlePostAttributesProcessPostfix_() {
        super.HandlePostAttributesProcessPostfix_();
        this.hiddenInput_ = document.createElement('input');
        this.hiddenInput_.type = 'hidden';
        this.hiddenInput_.name = (this.getAttribute('field') || '');
        this.hiddenInput_.value = '';
        this.appendChild(this.hiddenInput_);
    }
}
__decorate([
    Property({ type: 'string' })
], SketchExportElement.prototype, "UpdateFieldProperty", null);
export function SketchExportElementCompact() {
    RegisterCustomElement(SketchExportElement, 'sketch-export');
}

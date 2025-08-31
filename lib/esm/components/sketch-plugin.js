var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { CustomElement, Property } from "@benbraide/inlinejs-element";
import { FindAncestor } from "@benbraide/inlinejs";
export class SketchPluginElement extends CustomElement {
    constructor(name) {
        super({
            isTemplate: true,
            isHidden: true,
        });
        this.canvas_ = null;
        this.sketchHost_ = null;
        this.name = '';
        this.disabled = false;
        this.name = (name || '');
    }
    GetName() {
        return this.name;
    }
    GetPriority() {
        return 0; // Neutral priority
    }
    SetCanvas(canvas) {
        this.canvas_ = canvas;
    }
    Handle(_a) {
        var { stage } = _a, rest = __rest(_a, ["stage"]);
        if (this.disabled) {
            return;
        }
        switch (stage) {
            case 'begin': return this.HandleBeginDraw(Object.assign({ stage }, rest));
            case 'end': return this.HandleEndDraw(Object.assign({ stage }, rest));
            case 'draw': return this.HandleDraw(Object.assign({ stage }, rest));
        }
    }
    HandleBeginDraw(params) { }
    HandleEndDraw(params) { }
    HandleDraw(params) { }
    HandleElementScopeDestroyed_(scope) {
        var _a;
        super.HandleElementScopeDestroyed_(scope);
        this.canvas_ = null;
        (_a = this.sketchHost_) === null || _a === void 0 ? void 0 : _a.RemovePlugin(this);
        this.sketchHost_ = null;
    }
    HandlePostAttributesProcessPostfix_() {
        var _a;
        super.HandlePostAttributesProcessPostfix_();
        this.sketchHost_ = FindAncestor(this, ancestor => ('AddPlugin' in ancestor && 'RemovePlugin' in ancestor));
        (_a = this.sketchHost_) === null || _a === void 0 ? void 0 : _a.AddPlugin(this);
    }
}
__decorate([
    Property({ type: 'string' })
], SketchPluginElement.prototype, "name", void 0);
__decorate([
    Property({ type: 'boolean' })
], SketchPluginElement.prototype, "disabled", void 0);

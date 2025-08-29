var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { SketchPluginElement } from "./sketch-plugin";
export class SketchHistoryElement extends SketchPluginElement {
    constructor() {
        super('history');
        this.index_ = 0;
        this.entries_ = new Array();
        this.size = -1;
    }
    GetPriority() {
        return -1000; // Run after other plugins
    }
    SetCanvas(canvas) {
        super.SetCanvas(canvas);
        if (this.entries_.length > 0) {
            this.Reset();
        }
        else {
            this.canvas_ && (this.entries_ = [this.canvas_.toDataURL('image/png')]);
        }
    }
    HandleStartDraw() {
        this.Snapshot_();
    }
    HandleEndDraw() {
        this.Snapshot_();
    }
    Undo() {
        if (this.CanUndo()) {
            this.Restore_(this.entries_[--this.index_]);
        }
    }
    Redo() {
        if (this.CanRedo()) {
            this.Restore_(this.entries_[++this.index_]);
        }
    }
    Reset() {
        var _a;
        const ctx = (_a = this.canvas_) === null || _a === void 0 ? void 0 : _a.getContext('2d');
        if (ctx && this.canvas_) {
            if (this.entries_.length > 0) {
                this.Restore_(this.entries_[0]);
                this.entries_.splice(1);
            }
            this.index_ = 0;
        }
    }
    Has() {
        return this.entries_.length > 0;
    }
    CanUndo() {
        return (this.index_ > 0);
    }
    CanRedo() {
        return (this.index_ < (this.entries_.length - 1));
    }
    LoadImage(url) {
        if (!this.canvas_) {
            return;
        }
        const native = this.canvas_, image = new Image();
        image.onload = () => {
            const ctx = native.getContext('2d');
            ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, native.width, native.height);
            ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(image, 0, 0);
            this.Snapshot_();
        };
        image.src = url;
    }
    HandleElementScopeCreated_(params, postAttributesCallback) {
        super.HandleElementScopeCreated_(params, postAttributesCallback);
        params.scope.AddPostProcessCallback(() => this.canvas_ && this.Reset());
    }
    Restore_(src) {
        const canvas = this.canvas_;
        if (!canvas || !src) {
            return;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) { // Context missing
            return;
        }
        const image = new Image();
        image.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0);
        };
        image.src = src;
    }
    Snapshot_() {
        if (!this.canvas_ || !this.size) {
            return;
        }
        if (this.index_ < (this.entries_.length - 1)) { //Remove redo entries
            this.entries_.splice(this.index_ + 1);
        }
        if (this.size > 0 && this.entries_.length >= this.size) {
            this.entries_.shift();
            this.index_ -= 1;
        }
        this.entries_.push(this.canvas_.toDataURL('image/png'));
        this.index_ = this.entries_.length - 1;
    }
}
__decorate([
    Property({ type: 'number' })
], SketchHistoryElement.prototype, "size", void 0);
export function SketchHistoryElementCompact() {
    RegisterCustomElement(SketchHistoryElement, 'sketch-history');
}

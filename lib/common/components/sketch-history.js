"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SketchHistoryElementCompact = exports.SketchHistoryElement = void 0;
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const sketch_plugin_1 = require("./sketch-plugin");
class SketchHistoryElement extends sketch_plugin_1.SketchPluginElement {
    constructor() {
        super('history');
        this.index_ = 0;
        this.entries_ = new Array();
        this.isSaved_ = false;
        this.savedBeforeUndo_ = false;
        this.size = -1;
    }
    HandleBeginDraw() {
        this.Save_();
    }
    HandleEndDraw() {
        this.isSaved_ = false;
    }
    Undo() {
        this.Restore_(() => this.index_ > 0 && this.entries_.length > 0, () => {
            if (this.isSaved_) {
                return this.entries_[this.index_ -= ((this.savedBeforeUndo_ && this.index_ >= this.entries_.length) ? 2 : 1)];
            }
            this.Save_();
            this.savedBeforeUndo_ = true;
            return this.entries_[this.index_ -= 2];
        });
    }
    Redo() {
        this.Restore_(() => this.index_ < this.entries_.length, () => this.entries_[++this.index_], () => {
            this.index_ = ((this.savedBeforeUndo_ && this.index_ >= (this.entries_.length - 1)) ? this.entries_.length : this.index_);
        });
    }
    Reset() {
        this.Restore_(() => true, () => null, (ctx) => {
            ctx.clearRect(0, 0, this.canvas_.width, this.canvas_.height);
            this.index_ = 0;
            this.entries_ = new Array();
        });
    }
    Has() {
        return this.entries_.length > 0;
    }
    CanUndo() {
        return this.index_ > 0 && this.entries_.length > 0;
    }
    CanRedo() {
        return this.index_ >= 0 && this.index_ < this.entries_.length;
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
            this.Save_();
        };
        image.src = url;
    }
    Restore_(pred, before, after) {
        const canvas = this.canvas_;
        if (!canvas || !pred()) {
            return;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) { // Context missing
            return;
        }
        const src = before();
        if (src) { // Draw image
            const image = new Image();
            image.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, 0, 0);
            };
            image.src = src;
        }
        after === null || after === void 0 ? void 0 : after(ctx);
    }
    Save_() {
        if (!this.canvas_ || this.isSaved_ || !this.size) {
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
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'number' })
], SketchHistoryElement.prototype, "size", void 0);
exports.SketchHistoryElement = SketchHistoryElement;
function SketchHistoryElementCompact() {
    (0, inlinejs_element_1.RegisterCustomElement)(SketchHistoryElement, 'sketch-history');
}
exports.SketchHistoryElementCompact = SketchHistoryElementCompact;

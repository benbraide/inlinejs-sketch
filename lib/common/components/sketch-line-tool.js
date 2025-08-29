"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SketchLineToolElement = void 0;
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const sketch_tool_1 = require("./sketch-tool");
class SketchLineToolElement extends sketch_tool_1.SketchToolElement {
    constructor(name) {
        super(name);
        this.color = '';
        this.fillColor = '';
        this.strokeColor = '';
        this.mode = 'stroke';
        this.lineWidth = 1;
        this.lineCap = 'round';
    }
    HandleBeginDraw(params) {
        super.HandleBeginDraw(params);
    }
    HandleDraw_(ctx, offsetX, offsetY) {
        ctx.lineCap = this.lineCap;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeColor || this.color || 'black';
        ctx.fillStyle = this.fillColor || this.color || 'black';
        this.HandleShapeDraw_(ctx, offsetX, offsetY);
    }
}
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string' })
], SketchLineToolElement.prototype, "color", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string' })
], SketchLineToolElement.prototype, "fillColor", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string' })
], SketchLineToolElement.prototype, "strokeColor", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string' })
], SketchLineToolElement.prototype, "mode", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'number' })
], SketchLineToolElement.prototype, "lineWidth", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string' })
], SketchLineToolElement.prototype, "lineCap", void 0);
exports.SketchLineToolElement = SketchLineToolElement;

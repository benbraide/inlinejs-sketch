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
        this.color = 'black';
        this.mode = 'stroke';
        this.lineWidth = 1;
        this.lineCap = 'round';
    }
    HandleBeginDraw(params) {
        var _a;
        super.HandleBeginDraw(params);
        const ctx = (_a = this.canvas_) === null || _a === void 0 ? void 0 : _a.getContext('2d');
        if (ctx) {
            ctx.lineCap = this.lineCap;
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.color;
            ctx.fillStyle = this.color;
        }
    }
}
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string' })
], SketchLineToolElement.prototype, "color", void 0);
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

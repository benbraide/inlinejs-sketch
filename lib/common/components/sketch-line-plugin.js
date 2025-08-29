"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SketchLinePluginElement = void 0;
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const sketch_plugin_1 = require("./sketch-plugin");
class SketchLinePluginElement extends sketch_plugin_1.SketchPluginElement {
    constructor(name) {
        super(name);
        this.color = '';
        this.lineWidth = 1;
        this.lineCap = 'round';
    }
    HandleBeginDraw({ offsetX, offsetY }) {
        var _a;
        const ctx = (_a = this.canvas_) === null || _a === void 0 ? void 0 : _a.getContext('2d');
        if (ctx) {
            ctx.lineCap = this.lineCap;
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.color || 'black';
            ctx.moveTo(offsetX, offsetY);
        }
    }
}
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string' })
], SketchLinePluginElement.prototype, "color", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'number' })
], SketchLinePluginElement.prototype, "lineWidth", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string' })
], SketchLinePluginElement.prototype, "lineCap", void 0);
exports.SketchLinePluginElement = SketchLinePluginElement;

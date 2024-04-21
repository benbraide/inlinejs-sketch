"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SketchCircleElementCompact = exports.SketchCircleElement = void 0;
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const sketch_line_tool_1 = require("./sketch-line-tool");
class SketchCircleElement extends sketch_line_tool_1.SketchLineToolElement {
    constructor() {
        super('circle');
    }
    HandleDraw_(ctx, offsetX, offsetY) {
        const radius = Math.max(Math.abs(offsetX - this.saved_.x), Math.abs(offsetY - this.saved_.y));
        ctx.arc(this.saved_.x, this.saved_.y, radius, 0, (2 * Math.PI));
        (this.mode === 'fill') ? ctx.fill() : ctx.stroke();
    }
}
exports.SketchCircleElement = SketchCircleElement;
function SketchCircleElementCompact() {
    (0, inlinejs_element_1.RegisterCustomElement)(SketchCircleElement, 'sketch-circle');
}
exports.SketchCircleElementCompact = SketchCircleElementCompact;

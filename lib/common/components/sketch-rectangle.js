"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SketchRectangleElementCompact = exports.SketchRectangleElement = void 0;
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const sketch_line_tool_1 = require("./sketch-line-tool");
class SketchRectangleElement extends sketch_line_tool_1.SketchLineToolElement {
    constructor() {
        super('rectangle');
    }
    HandleShapeDraw_(ctx, offsetX, offsetY) {
        const width = offsetX - this.saved_.x;
        const height = offsetY - this.saved_.y;
        if (this.mode === 'fill' || this.mode === 'both') {
            ctx.fillRect(this.saved_.x, this.saved_.y, width, height);
        }
        if (this.mode === 'stroke' || this.mode === 'both' || !this.mode) {
            ctx.strokeRect(this.saved_.x, this.saved_.y, width, height);
        }
    }
}
exports.SketchRectangleElement = SketchRectangleElement;
function SketchRectangleElementCompact() {
    (0, inlinejs_element_1.RegisterCustomElement)(SketchRectangleElement, 'sketch-rectangle');
}
exports.SketchRectangleElementCompact = SketchRectangleElementCompact;

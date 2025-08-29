"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SketchLineElementCompact = exports.SketchLineElement = void 0;
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const sketch_line_tool_1 = require("./sketch-line-tool");
class SketchLineElement extends sketch_line_tool_1.SketchLineToolElement {
    constructor() {
        super('line');
    }
    HandleShapeDraw_(ctx, offsetX, offsetY) {
        ctx.moveTo(this.saved_.x, this.saved_.y);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    }
}
exports.SketchLineElement = SketchLineElement;
function SketchLineElementCompact() {
    (0, inlinejs_element_1.RegisterCustomElement)(SketchLineElement, 'sketch-line');
}
exports.SketchLineElementCompact = SketchLineElementCompact;

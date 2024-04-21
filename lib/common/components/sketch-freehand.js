"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SketchFreehandElementCompact = exports.SketchFreehandElement = void 0;
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const sketch_line_plugin_1 = require("./sketch-line-plugin");
class SketchFreehandElement extends sketch_line_plugin_1.SketchLinePluginElement {
    constructor() {
        super('freehand');
    }
    HandleDraw({ offsetX, offsetY }) {
        var _a;
        const ctx = (_a = this.canvas_) === null || _a === void 0 ? void 0 : _a.getContext('2d');
        if (ctx) {
            ctx.lineTo(offsetX, offsetY);
            ctx.stroke();
        }
    }
}
exports.SketchFreehandElement = SketchFreehandElement;
function SketchFreehandElementCompact() {
    (0, inlinejs_element_1.RegisterCustomElement)(SketchFreehandElement, 'sketch-freehand');
}
exports.SketchFreehandElementCompact = SketchFreehandElementCompact;

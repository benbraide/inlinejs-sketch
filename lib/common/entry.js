"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineJSComponents = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const sketch_1 = require("./components/sketch");
const sketch_history_1 = require("./components/sketch-history");
const sketch_freehand_1 = require("./components/sketch-freehand");
const sketch_line_1 = require("./components/sketch-line");
const sketch_rectangle_1 = require("./components/sketch-rectangle");
const sketch_circle_1 = require("./components/sketch-circle");
const sketch_brush_1 = require("./components/sketch-brush");
const sketch_eraser_1 = require("./components/sketch-eraser");
const sketch_export_1 = require("./components/sketch-export");
function InlineJSComponents() {
    (0, inlinejs_1.WaitForGlobal)().then(() => {
        (0, sketch_1.SketchElementCompact)();
        (0, sketch_history_1.SketchHistoryElementCompact)();
        (0, sketch_freehand_1.SketchFreehandElementCompact)();
        (0, sketch_line_1.SketchLineElementCompact)();
        (0, sketch_rectangle_1.SketchRectangleElementCompact)();
        (0, sketch_circle_1.SketchCircleElementCompact)();
        (0, sketch_brush_1.SketchBrushElementCompact)();
        (0, sketch_eraser_1.SketchEraserElementCompact)();
        (0, sketch_export_1.SketchExportElementCompact)();
    });
}
exports.InlineJSComponents = InlineJSComponents;

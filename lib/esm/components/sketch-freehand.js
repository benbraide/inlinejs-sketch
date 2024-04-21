import { RegisterCustomElement } from "@benbraide/inlinejs-element";
import { SketchLinePluginElement } from "./sketch-line-plugin";
export class SketchFreehandElement extends SketchLinePluginElement {
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
export function SketchFreehandElementCompact() {
    RegisterCustomElement(SketchFreehandElement, 'sketch-freehand');
}

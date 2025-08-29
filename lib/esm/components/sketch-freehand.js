import { RegisterCustomElement } from "@benbraide/inlinejs-element";
import { SketchLinePluginElement } from "./sketch-line-plugin";
export class SketchFreehandElement extends SketchLinePluginElement {
    constructor() {
        super('freehand');
        this.lastPoint_ = { x: 0, y: 0 };
    }
    HandleBeginDraw(params) {
        super.HandleBeginDraw(params);
        this.lastPoint_ = { x: params.offsetX, y: params.offsetY };
    }
    HandleDraw({ offsetX, offsetY }) {
        var _a;
        const ctx = (_a = this.canvas_) === null || _a === void 0 ? void 0 : _a.getContext('2d');
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo(this.lastPoint_.x, this.lastPoint_.y);
            ctx.lineTo(offsetX, offsetY);
            ctx.stroke();
            this.lastPoint_ = { x: offsetX, y: offsetY };
        }
    }
}
export function SketchFreehandElementCompact() {
    RegisterCustomElement(SketchFreehandElement, 'sketch-freehand');
}

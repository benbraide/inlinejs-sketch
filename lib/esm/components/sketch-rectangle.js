import { RegisterCustomElement } from "@benbraide/inlinejs-element";
import { SketchLineToolElement } from "./sketch-line-tool";
export class SketchRectangleElement extends SketchLineToolElement {
    constructor() {
        super('rectangle');
    }
    HandleDraw_(ctx, offsetX, offsetY) {
        if (this.mode === 'fill') {
            ctx.fillRect(this.saved_.x, this.saved_.y, (offsetX - this.saved_.x), (offsetY - this.saved_.y));
        }
        else {
            ctx.strokeRect(this.saved_.x, this.saved_.y, (offsetX - this.saved_.x), (offsetY - this.saved_.y));
        }
    }
}
export function SketchRectangleElementCompact() {
    RegisterCustomElement(SketchRectangleElement, 'sketch-rectangle');
}

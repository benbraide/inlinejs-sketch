import { RegisterCustomElement } from "@benbraide/inlinejs-element";
import { SketchLineToolElement } from "./sketch-line-tool";
export class SketchLineElement extends SketchLineToolElement {
    constructor() {
        super('line');
    }
    HandleDraw_(ctx, offsetX, offsetY) {
        ctx.moveTo(this.saved_.x, this.saved_.y);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    }
}
export function SketchLineElementCompact() {
    RegisterCustomElement(SketchLineElement, 'sketch-line');
}

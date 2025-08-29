import { SketchPluginElement } from "./sketch-plugin";
export class SketchToolElement extends SketchPluginElement {
    constructor(name) {
        super(name);
        // Off-screen canvas to hold the state before drawing starts
        this.offscreenCanvas_ = null;
        this.offscreenCtx_ = null;
        this.saved_ = {
            x: 0,
            y: 0,
        };
    }
    HandleBeginDraw({ offsetX, offsetY }) {
        var _a;
        if (!this.canvas_) {
            return;
        }
        // Create or resize the off-screen canvas
        if (!this.offscreenCanvas_ || this.offscreenCanvas_.width !== this.canvas_.width || this.offscreenCanvas_.height !== this.canvas_.height) {
            this.offscreenCanvas_ = document.createElement('canvas');
            this.offscreenCanvas_.width = this.canvas_.width;
            this.offscreenCanvas_.height = this.canvas_.height;
            this.offscreenCtx_ = this.offscreenCanvas_.getContext('2d');
        }
        // Save the current canvas state to the off-screen canvas
        (_a = this.offscreenCtx_) === null || _a === void 0 ? void 0 : _a.drawImage(this.canvas_, 0, 0);
        this.saved_ = {
            x: offsetX,
            y: offsetY,
        };
    }
    HandleEndDraw({ offsetX, offsetY }) {
        var _a;
        const ctx = (_a = this.canvas_) === null || _a === void 0 ? void 0 : _a.getContext('2d');
        if (ctx && this.offscreenCanvas_) {
            // Restore the original state from the off-screen canvas to the main canvas
            ctx.clearRect(0, 0, this.canvas_.width, this.canvas_.height);
            ctx.drawImage(this.offscreenCanvas_, 0, 0);
            // Draw the final shape onto the main canvas
            ctx.save();
            ctx.beginPath();
            this.HandleDraw_(ctx, offsetX, offsetY);
            ctx.restore();
        }
        // Clean up
        if (this.offscreenCtx_ && this.offscreenCanvas_) {
            this.offscreenCtx_.clearRect(0, 0, this.offscreenCanvas_.width, this.offscreenCanvas_.height);
        }
        this.offscreenCanvas_ = null;
        this.offscreenCtx_ = null;
        this.saved_ = {
            x: 0,
            y: 0,
        };
    }
    HandleDraw({ offsetX, offsetY }) {
        var _a;
        const ctx = (_a = this.canvas_) === null || _a === void 0 ? void 0 : _a.getContext('2d');
        if (!ctx || !this.offscreenCanvas_) {
            return;
        }
        // Restore the original state from the off-screen canvas
        ctx.clearRect(0, 0, this.canvas_.width, this.canvas_.height);
        ctx.drawImage(this.offscreenCanvas_, 0, 0);
        // Draw the current shape on top
        ctx.save();
        ctx.beginPath();
        this.HandleDraw_(ctx, offsetX, offsetY);
        ctx.restore();
    }
    HandleDraw_(ctx, offsetX, offsetY) { }
}

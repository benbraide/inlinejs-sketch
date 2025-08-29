import { SketchPluginElement } from "./sketch-plugin";
import { ISketchPluginParams } from "../types";

export class SketchToolElement extends SketchPluginElement {
    // Off-screen canvas to hold the state before drawing starts
    protected offscreenCanvas_: HTMLCanvasElement | null = null;
    protected offscreenCtx_: CanvasRenderingContext2D | null = null;

    protected saved_ = {
        x: 0,
        y: 0,
    };

    public constructor(name?: string) {
        super(name);
    }

    public HandleBeginDraw({ offsetX, offsetY }: ISketchPluginParams): boolean | void {
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
        this.offscreenCtx_?.drawImage(this.canvas_, 0, 0);

        this.saved_ = {
            x: offsetX,
            y: offsetY,
        };
    }

    public HandleEndDraw({ offsetX, offsetY }: ISketchPluginParams) {
        const ctx = this.canvas_?.getContext('2d');
        if (ctx && this.offscreenCanvas_) {
            // Restore the original state from the off-screen canvas to the main canvas
            ctx.clearRect(0, 0, this.canvas_!.width, this.canvas_!.height);
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

    public HandleDraw({ offsetX, offsetY }: ISketchPluginParams) {
        const ctx = this.canvas_?.getContext('2d');
        if (!ctx || !this.offscreenCanvas_) {
            return;
        }

        // Restore the original state from the off-screen canvas
        ctx.clearRect(0, 0, this.canvas_!.width, this.canvas_!.height);
        ctx.drawImage(this.offscreenCanvas_, 0, 0);

        // Draw the current shape on top
        ctx.save();
        ctx.beginPath();
        this.HandleDraw_(ctx, offsetX, offsetY);
        ctx.restore();
    }

    protected HandleDraw_(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number) { }
}

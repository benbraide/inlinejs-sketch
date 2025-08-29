export type SketchPaintModeType = 'fill' | 'stroke' | 'both';

export type SketchDrawStageType = 'begin' | 'end' | 'draw';

export interface ISketchPluginParams{
    stage: SketchDrawStageType;
    offsetX: number;
    offsetY: number;
}

export interface ISketchPlugin{
    GetName(): string;
    GetPriority(): number;
    SetCanvas(canvas: HTMLCanvasElement | null): void;
    Handle(params: ISketchPluginParams): void;
}

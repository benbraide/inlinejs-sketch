import { WaitForGlobal } from '@benbraide/inlinejs';
import { SketchElementCompact } from './components/sketch';
import { SketchHistoryElementCompact } from './components/sketch-history';
import { SketchFreehandElementCompact } from './components/sketch-freehand';
import { SketchLineElementCompact } from './components/sketch-line';
import { SketchRectangleElementCompact } from './components/sketch-rectangle';
import { SketchCircleElementCompact } from './components/sketch-circle';
import { SketchBrushElementCompact } from './components/sketch-brush';
import { SketchEraserElementCompact } from './components/sketch-eraser';
import { SketchExportElementCompact } from './components/sketch-export';
export function InlineJSComponents() {
    WaitForGlobal().then(() => {
        SketchElementCompact();
        SketchHistoryElementCompact();
        SketchFreehandElementCompact();
        SketchLineElementCompact();
        SketchRectangleElementCompact();
        SketchCircleElementCompact();
        SketchBrushElementCompact();
        SketchEraserElementCompact();
        SketchExportElementCompact();
    });
}

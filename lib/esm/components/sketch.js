var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { JournalTry, ToString, ResizeObserver } from "@benbraide/inlinejs";
import { CustomElement, Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
export class SketchElement extends CustomElement {
    constructor() {
        super();
        this.shadow_ = null;
        this.ctx_ = null;
        this.isDrawing_ = false;
        this.windowMouseUpHandler_ = null;
        this.windowTouchEndHandler_ = null;
        this.windowTouchCancelHandler_ = null;
        this.plugins_ = {};
        this.resizeObserver_ = null;
        this.fit_ = false;
        this.plugin = '';
        this.disabled = false;
        this.style.display = 'flex';
    }
    UpdateWidthProperty(value) {
        var _a;
        this.style.width = `${value}px`;
        (_a = this.shadow_) === null || _a === void 0 ? void 0 : _a.setAttribute('width', ToString(value));
    }
    UpdateHeightProperty(value) {
        var _a;
        this.style.height = `${value}px`;
        (_a = this.shadow_) === null || _a === void 0 ? void 0 : _a.setAttribute('height', ToString(value));
    }
    UpdateFitProperty(value) {
        if (this.fit_ !== value) {
            this.fit_ = value;
            this.UpdateFit_();
        }
    }
    GetContext() {
        return this.ctx_;
    }
    GetNative() {
        return this.shadow_;
    }
    GetBlob(type = 'image/png') {
        return (this.shadow_ ? new Promise(resolve => this.shadow_.toBlob(blob => resolve(blob), type)) : null);
    }
    GetDataUrl(type = 'image/png') {
        return (this.shadow_ ? this.shadow_.toDataURL(type) : '');
    }
    AddPlugin(plugin) {
        const name = plugin.GetName();
        this.plugins_[name] || (this.plugins_[name] = []);
        this.plugins_[name].push(plugin);
        plugin.SetCanvas(this.shadow_);
    }
    RemovePlugin(plugin) {
        Object.entries(this.plugins_).forEach(([name, plugins]) => {
            this.plugins_[name] = plugins.filter(p => (p !== plugin));
        });
    }
    HandleElementScopeDestroyed_(scope) {
        var _a;
        super.HandleElementScopeDestroyed_(scope);
        this.windowMouseUpHandler_ && window.removeEventListener('mouseup', this.windowMouseUpHandler_);
        this.windowTouchEndHandler_ && window.removeEventListener('touchend', this.windowTouchEndHandler_);
        this.windowTouchCancelHandler_ && window.removeEventListener('touchcancel', this.windowTouchCancelHandler_);
        this.windowMouseUpHandler_ = this.windowTouchEndHandler_ = this.windowTouchCancelHandler_ = null;
        (_a = this.resizeObserver_) === null || _a === void 0 ? void 0 : _a.Unobserve(this.parentElement || this);
        this.resizeObserver_ = null;
        this.shadow_ = null;
    }
    HandlePostAttributesProcessPostfix_() {
        super.HandlePostAttributesProcessPostfix_();
        this.resizeObserver_ = new ResizeObserver();
        this.resizeObserver_.Observe(this.parentElement || this, () => this.UpdateFit_());
    }
    HandlePostProcess_() {
        super.HandlePostProcess_();
        this.InitializeShadow_();
    }
    InitializeShadow_() {
        var _a;
        if (this.shadow_) {
            return;
        }
        this.shadow_ = document.createElement('canvas');
        this.shadow_.setAttribute('width', (this.getAttribute('width') || '0'));
        this.shadow_.setAttribute('height', (this.getAttribute('height') || '0'));
        this.attachShadow({
            mode: 'open',
        });
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.append(this.shadow_);
        this.ctx_ = (this.shadow_.getContext('2d') || null);
        this.ctx_ && (this.ctx_.imageSmoothingQuality = 'high');
        this.windowMouseUpHandler_ = (event) => {
            if (event.button === 0 && this.shadow_) {
                const rect = this.shadow_.getBoundingClientRect();
                this.EndDraw_(event.clientX - rect.left, event.clientY - rect.top);
            }
        };
        window.addEventListener('mouseup', this.windowMouseUpHandler_);
        this.windowTouchEndHandler_ = (event) => {
            if (this.shadow_) {
                const touch = event.changedTouches[0];
                if (touch) {
                    const rect = this.shadow_.getBoundingClientRect();
                    this.EndDraw_(touch.clientX - rect.left, touch.clientY - rect.top);
                }
            }
        };
        window.addEventListener('touchend', this.windowTouchEndHandler_);
        this.windowTouchCancelHandler_ = (event) => {
            if (this.shadow_) {
                const touch = event.changedTouches[0];
                if (touch) {
                    const rect = this.shadow_.getBoundingClientRect();
                    this.EndDraw_(touch.clientX - rect.left, touch.clientY - rect.top);
                }
            }
        };
        window.addEventListener('touchcancel', this.windowTouchCancelHandler_);
        this.shadow_.addEventListener('mousedown', (event) => {
            (event.button === 0) && this.BeginDraw_(event.offsetX, event.offsetY);
        });
        this.shadow_.addEventListener('touchstart', (event) => {
            event.preventDefault();
            const touch = event.touches[0], boundingRect = touch.target.getBoundingClientRect();
            const offsetX = touch.clientX - boundingRect.left;
            const offsetY = touch.clientY - boundingRect.top;
            this.BeginDraw_(offsetX, offsetY);
        });
        this.shadow_.addEventListener('mousemove', event => this.Draw_(event.offsetX, event.offsetY));
        this.shadow_.addEventListener('touchmove', (event) => {
            const touch = event.touches[0], boundingRect = touch.target.getBoundingClientRect();
            const offsetX = touch.clientX - boundingRect.left;
            const offsetY = touch.clientY - boundingRect.top;
            this.Draw_(offsetX, offsetY);
        });
        Object.values(this.plugins_).forEach(plugins => plugins.forEach(plugin => plugin.SetCanvas(this.shadow_)));
        this.UpdateFit_();
    }
    BeginDraw_(offsetX, offsetY) {
        var _a, _b;
        if (!this.disabled && !this.isDrawing_) {
            this.isDrawing_ = true;
            (_a = this.ctx_) === null || _a === void 0 ? void 0 : _a.save();
            (_b = this.ctx_) === null || _b === void 0 ? void 0 : _b.beginPath();
            this.CallPlugins_('begin', offsetX, offsetY);
        }
    }
    EndDraw_(offsetX, offsetY) {
        var _a;
        if (this.isDrawing_) {
            this.CallPlugins_('end', offsetX, offsetY);
            (_a = this.ctx_) === null || _a === void 0 ? void 0 : _a.restore();
            this.isDrawing_ = false;
        }
    }
    Draw_(offsetX, offsetY) {
        this.isDrawing_ && this.CallPlugins_('draw', offsetX, offsetY);
    }
    CallPlugins_(stage, offsetX, offsetY) {
        const pluginsToCall = [];
        if (this.plugin) { // Call only specified plugins
            (Array.isArray(this.plugin) ? this.plugin : [this.plugin]).forEach((name) => {
                (name in this.plugins_) && pluginsToCall.push(...this.plugins_[name]);
            });
        }
        else { // Call all plugins
            Object.values(this.plugins_).forEach((plugins) => pluginsToCall.push(...plugins));
        }
        //Sort by priority, higher values run first. This ensures history (low priority) runs last.
        pluginsToCall.sort((a, b) => (b.GetPriority() - a.GetPriority()));
        pluginsToCall.forEach(plugin => JournalTry(() => plugin.Handle({ stage, offsetX, offsetY })));
    }
    UpdateFit_() {
        var _a, _b;
        if (this.fit_) {
            this.UpdateWidthProperty(((_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.clientWidth) || 0);
            this.UpdateHeightProperty(((_b = this.parentElement) === null || _b === void 0 ? void 0 : _b.clientHeight) || 0);
        }
    }
}
__decorate([
    Property({ type: 'object', checkStoredObject: true })
], SketchElement.prototype, "plugin", void 0);
__decorate([
    Property({ type: 'boolean' })
], SketchElement.prototype, "disabled", void 0);
__decorate([
    Property({ type: 'number', spread: 'size' })
], SketchElement.prototype, "UpdateWidthProperty", null);
__decorate([
    Property({ type: 'number', spread: 'size' })
], SketchElement.prototype, "UpdateHeightProperty", null);
__decorate([
    Property({ type: 'boolean' })
], SketchElement.prototype, "UpdateFitProperty", null);
export function SketchElementCompact() {
    RegisterCustomElement(SketchElement, 'sketch');
}

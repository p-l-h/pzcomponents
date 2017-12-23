/**
 * @file 监听
 * @author peilonghui
 */

export class EventObserver {
    constructor() {
        this.handlers = {};
    }
    on(eventType, handler) {
        const handlers = this.handlers || {};
        handlers[eventType] = handlers[eventType] || [];
        handlers[eventType].push(handler);
    }
    fire() {
        const args = Array.prototype.slice.call(arguments, 1);
        const eo = this;
        const currentHandlers = eo['handlers'][arguments[0]];
        if (currentHandlers && currentHandlers.length) {
            currentHandlers.forEach((item) => {
                item.apply(eo, args);
            });
        }
    }
}


/**
 * @file 监听
 * @author peilonghui
 */

export class EventObserver {

    constructor() {
        this.handlers = {};
    }

    on(eventType, handler) {
        let handlers = this.handlers;
        handlers[eventType] = handlers[eventType] || [];
        handlers[eventType].push(handler);
    }

    fire() {

        let args = Array.prototype.slice.call(arguments, 1);
        let eo = this;

        let currentHandlers = eo['handlers'][arguments[0]];

        if (currentHandlers && currentHandlers.length) {
            currentHandlers.forEach((item) => {
                item.apply(eo, args);
            });
        }


    }

}

